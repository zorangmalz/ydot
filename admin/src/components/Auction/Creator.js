import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useMediaQuery } from 'react-responsive'
import Header, { BottomTag, CreatorInfo, vw } from '../Style'
import { useHistory,useLocation } from 'react-router-dom'
import CaverExtKAS from 'caver-js-ext-kas'
//임시 이미지

export default function FundMain() {
    const location=useLocation()
    const firestore=useFirestore()

    const myparam=location.state.creatorName


    const chainId = 1001
    const accessKeyId = "KASK8QUCLZUJ1K1YZ9GB2VJ2"
    const secretAccessKey = "BkbIcfQfJuD9IrEZawH3+0ML7uARiyw910cEHiOH"


    const [success,setSuccess]=useState(false)
    useEffect(()=>{
        getInfo()
        getInvestorInfo()
    },[])
    const [complete,setComplete]=useState(false)
    const [symbol,setSymbol]=useState("")
    const [fundingAim,setFundingAim]=useState(0)
    async function getInfo(){
        const today=new Date()
        console.log(today.getTime())
        firestore.collection("Creator").doc(myparam).get().then(doc=>{
            if(doc.data().FundingTotal/doc.data().FundingAim*100>=80){
                setSuccess(true)
            }else{
                setSuccess(false)
            }
            if(doc.data().Deadline>today.getTime()){
                setComplete(false)
            }else{
                setComplete(true)
            }
            setSymbol(doc.data().symbol)
            setFundingAim(doc.data().fundingAim)
        })
    }

    const [items,setItems]=useState([])
    async function getInvestorInfo(){
        firestore.collection("Creator").doc(myparam).collection("Investor").orderBy('fullTime','desc').onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                    list.push({
                       email:doc.data().email,
                       money:doc.data().money,
                       wallet:doc.data().wallet,
                       fullTime:doc.data().fullTime,
                       dayTime:doc.data().DayTime
                    })
            })
            setItems(list)
        })
    }

    async function shareToken(){
        const caver = new CaverExtKAS()
        caver.initKASAPI(chainId, accessKeyId, secretAccessKey)
        const deployer = caver.wallet.add(
            caver.wallet.keyring.createFromPrivateKey('0xa2a9f4bb9bb176731943b362b40564dc9275d306dccece54d83fa2c03f01d018')
        )
        const kip7 = await caver.kct.kip7.deploy(
            { name: myparam, symbol: symbol, decimals: 3, initialSupply: '100'},
            deployer.address
        )
        console.log(`Deployed KIP-7 token contract address: ${kip7.options.address}`)
        console.log(`Token name: ${await kip7.name()}`)
        console.log(`Token symbol: ${await kip7.symbol()}`)
        console.log(`Token decimals: ${await kip7.decimals()}`)
        console.log(`Token totalSupply: ${await kip7.totalSupply()}`)
        
        const kip17 = await caver.kct.kip17.deploy({
            name: myparam,
            symbol: symbol,
        }, deployer.address)

        var i
        
        for(i=0;i<items.length;i++){
            const receiptFT= await kip7.transfer(items[i].wallet, (Number(items[i].money)/Number(fundingAim)*100).toFixed(3), { from: deployer.address })
            await kip17.mintWithTokenURI(deployer.address, i, items[i].email+"님께서"+items[i].money+"만큼 후원하셨습니다", { from: deployer.address })
            const receiptNFT= await kip17.transferFrom(deployer.address, items[i].wallet, i, { from: deployer.address })
            console.log(receiptFT,receiptNFT)
        }
        
    }
    async function shareMoney(){

    }

    return (
        <div>
           
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff"
                }}>
                    <Header bold="Fund" />
                    <div style={{
                        width: "100vw",
                        minWidth: 1060,
                        borderTop: "1px solid #D2D3D3",
                    }} />
                    {complete ? 
                    <>
                    {success ?
                        <input onClick={shareToken} type="button" style={{
                            cursor: "pointer",
                            width: 300,
                            height: 48,
                            border: 0,
                            outline: 0,
                            borderRadius: 10,
                            backgroundColor: "#e78276",
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ffffff",
                            alignSelf: "center",
                        }} value="토큰 분배하기" />
                         :
                         <input type="button" style={{
                            cursor: "pointer",
                            width: 300,
                            height: 48,
                            border: 0,
                            outline: 0,
                            borderRadius: 10,
                            backgroundColor: "#e78276",
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ffffff",
                            alignSelf: "center",
                        }} value="돈 돌려주기" />
                        }
                        </>
                    :   
                     <div>펀딩 진행중입니다</div>
                    }
                    
                    {items.map(element =>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontSize: 14,
                                        width: "100%",
                                        color: "#161513",
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }}>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.dayTime}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.wallet}</div>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.email}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.money} </div>
                                        
                                       
                                    </div>
                                )}
                    
                    {/* <BottomTag /> */}
                </div>
            
        </div>
    )
}