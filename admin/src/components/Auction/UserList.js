import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useMediaQuery } from 'react-responsive'
import Header, { BottomTag, CreatorInfo, vw } from '../Style'

//임시 이미지
import { MBottomTag, MCreatorInfo, MHeader } from '../Mobile'
import firebase from "firebase/app";

export default function UserList() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }
    //진행중인 펀딩
    const [items, setItems] = useState([]);
    const [itemss, setItemss] = useState([]);
    const firestore = useFirestore()
    
    async function getInfo(){
        firestore.collection("User").onSnapshot(querySnapshot=>{
            const list=[]
            querySnapshot.forEach(doc=>{
                list.push({
                    email:doc.data().email,
                    name:doc.data().name,
                    money:doc.data().totalMoney,
                    list:doc.data().creator,
                    uid:doc.data().uid
                })
            })
            setItems(list)
        })
    }
    useEffect(() => {
      getInfo()
    //  getPrice()
    }, [])
   const[itemsss,setItemsss]=useState([])

    async function getPrice(){
       
        for (const i of items){
            
            await firestore.collection("User").doc(i.uid).collection("TotalFunding").onSnapshot(querySnapshot => {
                const list=[]
                var total=0
            var accu=0
            
                querySnapshot.forEach(doc => {
                    if(doc.data().ongoing==1){
                    list.push({
                        img: "#4c4c4c",
                        name: doc.data().channel,
                        unit: doc.data().symbol,
                        chain: "KRW",
                        total:doc.data().Money,
                        number: doc.data().month+"/12",
                        next: String(Number(doc.data().month)+1)+"/20",
                        actual: doc.data().monthly,
                        accumulate: doc.data().total,
                        dayTime:doc.data().DayTime,
                        ftAmount:(Number(doc.data().Money)/Number(doc.data().fundingAim)).toFixed(6)*10000,
                        y:doc.data().Money,
                        color:doc.data().color
                    })
                    }
                })
                // console.log(list)
                for(const a of list){
                    
                    total= Number(a.total)+Number(total)
                    accu=Number(a.accumulate)+Number(accu)
                }       
                console.log(total,accu)
                firestore.collection("User").doc(i.uid).update({
                    totalFundingPrice:total,
                    accumulatedAllocation:accu
                })    
            })
            // console.log(total,accu)
            
           
        }
    }
    

    return (
        <div>
            <Default>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff"
                }}>
                    <Header bold="Fund" />
                  
                     
                            {items.map(element =>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontSize: 15,
                                        width: "100%",
                                        color: "#161513",
                                        marginTop: 1,
                                        marginBottom: 5,
                                    }}>
                                        <div style={{ width: 80, textAlign: "center" }}>{element.name}</div>
                                        <div style={{ width: 150, textAlign: "center" }}>{element.email}</div>
                                        <div style={{ width: 90, textAlign: "center" }}>{element.money}</div> 
                                        <div style={{ width: 90, textAlign: "center" }}>{element.creator}</div> 
                                    </div>
                                )}
                        
                    
                  
                    
                    
                    <BottomTag />
                </div>
            </Default>
            <Mobile>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff"
                }}>
                    <MHeader bold="Fund" />
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        borderTop: "1px solid #D2D3D3",
                    }} />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        width: "100vw",
                        minWidth: 300,
                        paddingTop: 40
                    }}>
                        <div style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            alignSelf: "center",
                            color: "#202426",
                            textAlign: "center",
                            marginBottom: 20
                        }}>진행중인 펀딩</div>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                       
                        </div>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                       
                        </div>
                    </div>
                    <div style={{
                        width: "90vw",
                        minWidth: 300,
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginTop: 40,
                        marginBottom: 40,
                        textAlign: "center"
                    }}>진행 예정 펀딩</div>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: 40,
                    }}>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                        
                        </div>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                           
                        </div>
                    </div>
                    <MBottomTag />
                </div>
            </Mobile>
        </div>
    )
}