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
            setFundingAim(doc.data().FundingAim)
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
                       wallets:doc.data().wallet,
                       fullTime:doc.data().fullTime,
                       dayTime:doc.data().DayTime,
                       uid:doc.data().uid

                    })
            })
            setItems(list)
        })
    }
    
    async function shareToken(){
        const caver = new CaverExtKAS()
        caver.initKASAPI(chainId, accessKeyId, secretAccessKey)

        const kip7 = await caver.kct.kip7.deploy(
            { name: myparam, symbol: symbol, decimals: 2, initialSupply: '1000000'},
            "0x064523b1C945d2eAEA22549F089A92BB193Cd25A"
        )
        console.log(`Deployed KIP-7 token contract address: ${kip7.options.address}`)
        console.log(`Token name: ${await kip7.name()}`)
        console.log(`Token symbol: ${await kip7.symbol()}`)
        console.log(`Token decimals: ${await kip7.decimals()}`)
        console.log(`Token totalSupply: ${await kip7.totalSupply()}`)
        
        const kip17 = await caver.kct.kip17.deploy({
            name: myparam,
            symbol: symbol,
        }, "0x064523b1C945d2eAEA22549F089A92BB193Cd25A")

        var i
        // for(i=0;i<items.length;i++){
           
        //     await kip17.mintWithTokenURI("0x064523b1C945d2eAEA22549F089A92BB193Cd25A", i, items[i].email+"님께서"+items[i].money+"만큼 후원하셨습니다", { from: "0x064523b1C945d2eAEA22549F089A92BB193Cd25A" })
        //     const receiptNFT= await kip17.transferFrom("0x064523b1C945d2eAEA22549F089A92BB193Cd25A", items[i].wallet, i, { from: "0x064523b1C945d2eAEA22549F089A92BB193Cd25A" })
        //     // console.log(receiptFT,receiptNFT)
        // }

        items.forEach(async i=>{
            console.log(i.wallets,i.dayTime,i)
            var id
            const receiptFT= await kip7.transfer(i.wallets, (Number(i.money)/Number(fundingAim)).toFixed(6)*1000000, { from: "0x064523b1C945d2eAEA22549F089A92BB193Cd25A" })
           
            console.log(receiptFT.transactionHash)
            await firestore.collection("User").doc(i.uid).collection("Fund").doc(i.dayTime).update({
                ongoing:1,
                ftHash:receiptFT.transactionHash
            })
        })
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
                                        <div style={{ width: 70, textAlign: "center" }}>{element.wallets}</div>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.email}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.money} </div>
                                        
                                       
                                    </div>
                                )}
                    
                    {/* <BottomTag /> */}
                </div>
            
        </div>
    )
}