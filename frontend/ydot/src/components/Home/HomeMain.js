import React,{useEffect} from 'react'
import Header, { CreatorInfo, vh, vw } from '../Style'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import {useFirebase,useFirestore} from "react-redux-firebase"
import { useSelector } from "react-redux";
export default function HomeMain() {
    const firebase=useFirebase()
    const firestore=useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>
        console.log(user))
 
    
    },[])
    // function add(){
    //     firestore.collection("User").doc(uid).set({
    //         uid:uid,
    //         hi:"hi"
    //     })
    // }
    const jison = {
        ongoing: false,
        img: "",
        name: "지순’s 일상",
        introduction: ["브이로거 지순이의 일상을 만나보세요!", <br />, "대학교부터 알바까지 일상을 공유하고 있습니다."],
        start: "2020/12/20 오전 11시"
    }
    const dang = {
        ongoing: false,
        img: "",
        name: "청춘 댕댕",
        introduction: ["귀여운 청춘 댕댕이와 함께하는 랜선 애견!", <br />, "청춘이의 댕댕미 넘치는 영상을 만나보세요."],
        start: "2020/12/20 오전 11시"
    }
    const tire = {
        ongoing: false,
        img: "",
        name: "타이어 아저씨 TV",
        introduction: ["고급부터 가성비까지 폭넓게 다루는", <br />, "타이어 아저씨의 미식로그"],
        start: "2020/12/20 오전 11시"
    }
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
                <CreatorInfo
                    ongoing={jison.ongoing}
                    img={jison.img}
                    name={jison.name}
                    introduction={jison.introduction}
                    start={jison.start}
                />
                <CreatorInfo
                    ongoing={dang.ongoing}
                    img={dang.img}
                    name={dang.name}
                    introduction={dang.introduction}
                    start={dang.start}
                />
                <CreatorInfo
                    ongoing={tire.ongoing}
                    img={tire.img}
                    name={tire.name}
                    introduction={tire.introduction}
                    start={tire.start}
                />
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