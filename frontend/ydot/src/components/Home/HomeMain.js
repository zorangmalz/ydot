import React,{useEffect,useState} from 'react'
import Header, { CreatorInfo, vh, vw } from '../Style'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import {useFirebase,useFirestore} from "react-redux-firebase"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';
import callAPI from "../../line"

//유저의 코인 총량. 내 자산 및 팝업에서 원 대신에 보여주면 됨
async function CoinAmount(){
    let UserAddress="tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
    let UserSecret="t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="
    
    let path=`/v1/wallets/${UserAddress}/base-coin`
    
    let txid=await callAPI("GET",path)
    console.log(txid)
    TokenNumber()
}
//유저의 토큰 개수. 내자산 및 팝업에서 토큰 개수 및 토큰 양 보여주는데 사용
async function TokenNumber(){
    let UserAddress="tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
    let UserSecret="t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="
    let path=`/v1/wallets/${UserAddress}/service-tokens`
    let txid=await callAPI("GET",path)
    //내자산 팝업에서 보유토큰에 쓰일 변수
    console.log(txid.length)
    
    
    //유저의 코인 총량. 내 자산에서 원 대신에 보여주면 됨
}


export default function HomeMain() {
    const history=useHistory()
    const firebase=useFirebase()
    const firestore=useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [items,setItems]=useState([]);

    useEffect(()=>{
   load()
   CoinAmount()
    },[])
    // function add(){
    //     firestore.collection("User").doc(uid).set({
    //         uid:uid,
    //         hi:"hi"
    //     })
    // }
 
    async function load(){
        var date=new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot=>{
            const list=[]
            querySnapshot.forEach(doc=>{
                list.push({
                    img:"",
                    name:doc.id,
                    FundingNum:doc.data().FundingNum,
                    FundingTotal:doc.data().FundingTotal,
                    percent:doc.data().FundingTotal/doc.data().FundingAim*100,
                    Deadline:parseInt((doc.data().Deadline-date.getTime())/86400000)
                })
            })
            setItems(list)
        })
        
    }
    // const CreatorList = [
    //     {
            
    //         img: "",
    //         name: "지순’s 일상",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     { 
            
    //         img: "",
    //         name: "청춘 댕댕",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     {
            
    //         img: "",
    //         name: "타이어 아저씨 TV",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     {
            
    //         img: "",
    //         name: "타이어 아저씨 TV",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    // ]
    

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffffff"}}>
            <Header splash={false} bold="Home" />
            <div style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "#202426",
                marginTop: 40,
                marginBottom: 20,
                alignSelf: "center"
            }}>크리에이터 정보</div>
            <div style={{
                width: 100 * vw,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>
                
               {items.map(element => 

               
                        <CreatorInfo  
                            img={element.img} 
                            name={element.name}
                            FundingNum={element.FundingNum}
                            FundingTotal={element.FundingTotal}
                            percent={element.percent}
                            Deadline={element.Deadline}
                        />
                        
                    )}
                    
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100
            }}>
                <div style={{ marginRight: 10, width: 400 }} />
                <div style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#202426",
                }}>크리에이터 정보</div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: 10
                }}>
                    <AiOutlineQuestionCircle size={22} color="#787B7C" />
                    <div style={{
                        fontSize: 16,
                        opacity: 0.6,
                        textAlign: "left",
                        color: "#212426",
                        marginLeft: 10
                    }}>전일 대비 상승률이 높은 크리에이터 순서로 보여줍니다.</div>
                </div>
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div style={{
                    marginTop: 33,
                    width: 1060,
                    borderRadius: 30,
                    backgroundColor: "#f4f5f7",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    <ul style={{
                        marginLeft: 100,
                        marginRight: 116,
                        marginTop: 30,
                        marginBottom: 30,
                    }}>
                        <li style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start"
                        }}>
                            <div style={{
                                fontSize: 16,
                                color: "#202426",
                                opacity: 0.6,
                                width: 221,
                                textAlign: "left"
                            }}>크리에이터 이름</div>
                            <div style={{
                                fontSize: 16,
                                color: "#202426",
                                opacity: 0.6,
                                width: 150,
                                textAlign: "left"
                            }}>예상 배당액</div>
                            <div style={{
                                fontSize: 16,
                                color: "#202426",
                                opacity: 0.6,
                                width: 220,
                                textAlign: "left"
                            }}>일일 조회수</div>
                            <div style={{
                                fontSize: 16,
                                color: "#202426",
                                opacity: 0.6,
                                textAlign: "left"
                            }}>일일 구독자수</div>
                        </li>
                        <li style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginTop: 20
                        }}>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                width: 221,
                                textAlign: "left"
                            }}>1 지순's 일상</div>
                            <div style={{
                                fontSize: 18,
                                color: "#78e185",
                                width: 150,
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>1,100</div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                width: 220,
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold"
                            }}>1,000,000 (<div style={{color: "#78e185"}}>+1.12%</div>)
                            </div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                marginRight: 30
                            }}>10,000 (<div style={{color: "#78e185"}}>+100</div>)
                            </div>
                            <input style={{
                                cursor: "pointer",
                                outline: 0,
                                fontSize: 16,
                                color: "#212426",
                                textDecorationLine: "underline",
                                opacity: 0.6,
                                border: 0,
                                margin: 0,
                            }} type="button" value="자세히" />
                        </li>
                        <li style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginTop: 20
                        }}>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                width: 221,
                                textAlign: "left"
                            }}>2 청춘 댕댕</div>
                            <div style={{
                                fontSize: 18,
                                color: "#78e185",
                                width: 150,
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>100,000</div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                width: 220,
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold"
                            }}>1,000,000 (<div style={{color: "#78e185"}}>+1.12%</div>)
                            </div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                marginRight: 30
                            }}>10,000 (<div style={{color: "#78e185"}}>+100</div>)
                            </div>
                            <input style={{
                                cursor: "pointer",
                                outline: 0,
                                fontSize: 16,
                                color: "#212426",
                                textDecorationLine: "underline",
                                opacity: 0.6,
                                border: 0,
                                margin: 0,
                            }} type="button" value="자세히" />
                        </li>
                        <li style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginTop: 20
                        }}>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                width: 221,
                                textAlign: "left"
                            }}>3 타이어 아저씨 TV</div>
                            <div style={{
                                fontSize: 18,
                                color: "#e78276",
                                width: 150,
                                textAlign: "left",
                                fontWeight: "bold"
                            }}>100,000</div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                width: 220,
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold"
                            }}>1,000,000 (<div style={{color: "#e78276"}}>-1.12%</div>)
                            </div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                textAlign: "left",
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "bold",
                                marginRight: 30
                            }}>10,000 (<div style={{color: "#e78276"}}>-100</div>)
                            </div>
                            <input style={{
                                cursor: "pointer",
                                outline: 0,
                                fontSize: 16,
                                color: "#212426",
                                textDecorationLine: "underline",
                                opacity: 0.6,
                                border: 0,
                                margin: 0,
                            }} type="button" value="자세히" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}