import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useMediaQuery } from 'react-responsive'
import Header, { BottomTag, CreatorInfo, vw } from '../Style'
import { useHistory,useLocation } from 'react-router-dom'
import CaverExtKAS from 'caver-js-ext-kas'
import { FiRefreshCw } from 'react-icons/fi'
import firebase from "firebase"
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
    const [ongoing,setOngoing]=useState(false)
    const [fundingTotal,setFundingTotal]=useState(0)
    const [channelTitle,setChannelTitle]=useState("")
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
            setOngoing(doc.data().ongoing)
            setFundingTotal(doc.data().FundingTotal)
            setChannelTitle(doc.data().channelTitle)
        })
    }

    const [items,setItems]=useState([])
    const [itemss,setItemss]=useState([])
    const [itemsss,setItemsss]=useState([])
    async function getInvestorInfo(){
        //투자자 정보 받아오기
        firestore.collection("Creator").doc(myparam).collection("InvestorList").orderBy('fullTime','desc').onSnapshot(querySnapshot => {
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

        //nft줄애들 받아오기
        firestore.collection("Creator").doc(myparam).collection("NFT").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                    list.push({
                        wallet:doc.data().wallet,
                        dayTime:doc.data().dayTime,
                        uid:doc.data().uid
                    })
            })
            setItemss(list)
        })
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
            setItemsss(list)
        })
    }
    
    
    async function shareToken(){
        const caver = new CaverExtKAS()
        caver.initKASAPI(chainId, accessKeyId, secretAccessKey)

        const kip7 = await caver.kct.kip7.deploy(
            { name: myparam, symbol: symbol, decimals: 2, initialSupply: "1000000"},
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

        

        for(const i of itemsss){
            
            const receiptFT= await kip7.transfer(i.wallets, (Number(i.money)/Number(fundingAim)).toFixed(6)*1000000, { from: "0x064523b1C945d2eAEA22549F089A92BB193Cd25A" })
            console.log(receiptFT.transactionHash)
            await firestore.collection("User").doc(i.uid).collection("Fund").doc(i.dayTime).update({
                ongoing:1,
                ftHash:receiptFT.transactionHash,
                ftAmount: (Number(i.money)/Number(fundingAim)).toFixed(6)*10000
            })
            firestore.collection("User").doc(i.uid).collection("TotalFunding").doc(myparam).update({
                ongoing:1
            })
            
        }
        var idx=0
        for(const i of itemss){
            
            await kip17.mintWithTokenURI("0x064523b1C945d2eAEA22549F089A92BB193Cd25A", idx, "test", { from: "0x064523b1C945d2eAEA22549F089A92BB193Cd25A" })
            const receiptNFT= await kip17.transferFrom("0x064523b1C945d2eAEA22549F089A92BB193Cd25A", i.wallet, idx, { from: "0x064523b1C945d2eAEA22549F089A92BB193Cd25A" })
            console.log(receiptNFT)
            idx=idx+1
            await firestore.collection("User").doc(i.uid).collection("NFT").doc(i.dayTime).set({
                NftHash:receiptNFT.transactionHash,
                NftPic:channelTitle
            })
        }
        setOngoing(false)
        await firestore.collection("Creator").doc(myparam).update({
            ongoing:false
        })
    }
    
    async function shareMoney(){
       
        for(const i of itemss){
            var money
            await firestore.collection("User").doc(i.uid).collection("Fund").doc(i.dayTime).update({
                ongoing:2
            })
            await firestore.collection("Creator").doc(myparam).update({
                ongoing:false
            })
            await firestore.collection("User").doc(i.uid).get().then(doc=>{
                money=doc.data().totalMoney
            })
            await firestore.collection("User").doc(i.uid).update({
                totalMoney:Number(money)+Number(i.money)
            })
        }
        setOngoing(false)
        
    }
    async function allocation(time){
        var totalIncome
        await firestore.collection("Creator").doc(myparam).collection("Income").doc(time).get().then(doc=>{
            totalIncome=doc.data().income
        })
        console.log(totalIncome,"total")
        
        const today = new Date()
        const year = today.getFullYear();
        const month = today.getMonth() + 1
        const day = today.getDate()
        const hours= today.getHours()
        const minutes=today.getMinutes()
        const seconds=today.getSeconds()
        const docName=String(year + "-" + month + "-" + day+"-"+hours+":"+minutes+":"+seconds)

        
        for(const i of items){
            
            console.log((Number(i.money)))
            console.log(Number(fundingAim))
            console.log((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0),"output")
            await firestore.collection("User").doc(i.uid).collection("TotalFunding").doc(myparam).collection("Allocate").doc(time).set({
                dayTime:docName,
                allocate:Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0))
            })
            var total
                await firestore.collection("User").doc(i.uid).collection("TotalFunding").doc(myparam).get().then(doc=>{
                    total=doc.data().total
            })
            await firestore.collection("User").doc(i.uid).collection("TotalFunding").doc(myparam).update({
                total:total+Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0))
            })

            await firestore.collection("User").doc(i.uid).collection("Fund").doc(i.dayTime).update({
                total:Number(total)+Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)),
                monthly:Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)),
                month:time
            })
            await firestore.collection("User").doc(i.uid).collection("Allocate").doc(time).collection("Creator").doc(myparam).set({
                total:Number(total)+Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)),
                monthly:Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)),
                month:time,
                dayTime:docName,
                fullTime:today.getDate(),
                channel:myparam
            })
                await firestore.collection("User").doc(i.uid).collection("Allocate").doc(time).update({
                    total:firebase.firestore.FieldValue.arrayUnion(Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)))
                })
            
           
            await firestore.collection("User").doc(i.uid).collection("AllocateList").add({
                total:Number(total)+Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)),
                monthly:Number((Number(i.money)/Number(fundingAim)*totalIncome).toFixed(0)),
                month:time,
                dayTime:docName,
                fullTime:today.getDate(),
                channel:myparam
            })
            
        }

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
                      <> 
                       {ongoing?
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
                            
                            width: 300,
                            height: 48,
                            border: 0,
                            outline: 0,
                            borderRadius: 10,
                            backgroundColor: "#787470",
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ffffff",
                            alignSelf: "center",
                        }} value="분배완료" />
                       }
</>
                       :
                       <>
                       {ongoing  ?
                        <input onClick={shareMoney} type="button" style={{
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
                        :
                        <input type="button" style={{
                            cursor: "pointer",
                            width: 300,
                            height: 48,
                            border: 0,
                            outline: 0,
                            borderRadius: 10,
                            backgroundColor: "#787470",
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#ffffff",
                            alignSelf: "center",
                        }} value="돈 돌려주기 완료" />
                    }
                      </>
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
                                {ongoing? 
                                <></>
                                :
                                <>
                                <input type="text" placeholder="1" id="time" style={{
                                    fontSize: 18,
                                    color: "#202426",
                                    border: 0,
                                    backgroundColor: "#F2F2F2",
                                    textAlign: "right",
                                    outline: 0,
                                }} />
                                <input onClick={()=>allocation(document.getElementById("time").value)} type="button" style={{
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
                                }} value="배당" />
                                </>
                                }
                 
                    {/* <BottomTag /> */}
                </div>
            
        </div>
    )
}