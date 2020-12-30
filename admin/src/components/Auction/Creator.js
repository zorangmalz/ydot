import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useMediaQuery } from 'react-responsive'
import Header, { BottomTag, CreatorInfo, vw } from '../Style'
import { useHistory,useLocation } from 'react-router-dom'

//임시 이미지

export default function FundMain() {
    const location=useLocation()
    const firestore=useFirestore()

    const myparam=location.state.creatorName

    const [success,setSuccess]=useState(false)
    useEffect(()=>{
        getInfo()
        getInvestorInfo()
    },[])
    const [complete,setComplete]=useState(false)
    async function getInfo(){
        const today=new Date()
        firestore.collection("Creator").doc(myparam).get().then(doc=>{
            if(doc.data().FundingTotal/doc.data().FundingAim*100>=80){
                setSuccess(true)
            }else{
                setSuccess(false)
            }
            if(doc.data().Deadline<today.getTime()){
                setComplete(false)
            }else{
                setComplete(true)
            }
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