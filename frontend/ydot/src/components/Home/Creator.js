import React, { Suspense, useState, useEffect, useReducer } from 'react'
import Header, { CreatorIntro, Information, Line, vh, vw, QAList, CloseBeta } from '../Style'
import { GoHeart } from 'react-icons/go'
import { IoMdShare } from 'react-icons/io'
import { AiFillYoutube } from 'react-icons/ai'
import { ImTwitch } from 'react-icons/im'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import callAPI from "../../line"
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useSelector } from "react-redux";
import { PopupOne, PopupTwo, PopupThree } from "../Style"
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

//image
import vlog from '../icon/vlog.png'
import barchart from '../icon/bar-chart.png'
import thumbup from '../icon/thumb-up.png'
import solitude from '../icon/solitude.png'
import analytics from '../icon/analytics.png'
import awesomeCoins from '../icon/awesome-coins.png'
import gift from '../icon/gift.png'
import fan from '../icon/fan.png'
import jisun from '../icon/jisun.png'
import campusone from '../icon/campusone.png'
import campustwo from '../icon/campustwo.png'
import month from '../icon/month.png'
import monthsub from '../icon/monthsub.png'
import noojeok from '../icon/noojeok.png'
import noojeockview from '../icon/noojeockview.png'

function reducer(state, action) {
    switch (action.type) {
        case "fund":
            return 0
        case "channel":
            return 1
        case "reward":
            return 2
        default:
            return 0
    }
}

export default function Creator() {
    //펀딩정보, 채널 정보, 리워드 계산기
    const [infor, dispatch] = useReducer(reducer, 0)
    const [fund,setFund]=useState(0)

    const onFund = () => {
        dispatch({ type: "fund" })
    }
    const onChannel = () => {
        dispatch({ type: "channel" })
    }
    const onReward = () => {
        dispatch({ type: "reward" })
    }

    //Progress Circle 관련
    

    //팝업부분을 여기다 구현해놓음. 나중에 input값을 coinAmount변수로 넣어서 주면 됨
    function modal(){
        setModalOne(true)
    }
    
    
    const firestore = useFirestore()

    const { uid } = useSelector((state) => state.firebase.auth);
    const history = useHistory()
    const names = "지순’s 일상"
    const auctiondirect = "/auction/" + String(names)
    const QA = [
        {
            title: 'Q1. 자기 소개 부탁드립니다!',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q2. 제주먹자 TV는 어떤 채널인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q3. 펀딩을 진행하게된 동기는 무엇인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q4. 내가 가지는 차별성은? 다른채널과 차이점은 무엇인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q5.  모집한 자금은 어떻게 사용할것인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q6.  상환계획에 대해서 이야기해주세요',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
    ]

    const Invest = [
        {
            img: vlog,
            title: "일상/Vlog",
            content: ["해당 섹터의 평균 조회수 성장률은", <br />, <div style={{ fontWeight: "bold", display: "inline-block" }}>5%</div>, "이며, 구독자 성장률은", <div style={{ fontWeight: "bold", display: "inline-block" }}>3%</div>, "입니다."]
        },
        {
            img: barchart,
            title: "고속성장",
            content: ["섹터 조회수 성장률 보다", <div style={{ fontWeight: "bold", display: "inline-block" }}>5%</div>, "높습니다!", <br />, "섹터 구독자 성장률보다", <div style={{ fontWeight: "bold", display: "inline-block" }}>5%</div>, "높습니다."]
        },
        {
            img: thumbup,
            title: "사랑받는 크리에이터",
            content: ["좋아요/싫어요 비율, 댓글 수가", <br />, "섹터 평균보다 높습니다!"]
        },
    ]

    const [amount, setAmount] = useState("1000")
    const [price, setPrice] = useState("1000")
    const [rate, setRate] = useState("5")
    const [profit, setProfit] = useState("1000")
    const [goodrate, setGoodRate] = useState("")
    const [modalOne, setModalOne] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [modalThree, setModalThree] = useState(false)
    const [reward,setReward]=useState("")
    const [roi,setRoi]=useState("")
    const[percentage,setPercentage]=useState(0)
    //input
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    })
    const { name, nickname } = inputs
    const onChange = (e) => {
        const { name, value } = e.target
        const nextInputs = {
            ...inputs,
            [name]: value,
        }
        setInputs(nextInputs)
    }
    useEffect(()=>{
        getInfo()
       
    },[])
    useEffect(()=>{
        setPercentage((fund/16360*100).toFixed(2))
    },[fund])
    function getInfo(){
        firestore.collection("Creator").doc("[Vlog] 지순's 일상").onSnapshot(doc=>{
            setFund(doc.data().FundingTotal)
        })
    }
    function calculate(){
        console.log(nickname,"this")
        var a=((Math.pow(1+Number(nickname)/100,12)-1)*10296940.94-16362236)/16362236
        console.log(a)
        setRoi((a*100).toFixed(2))
        var b=Number(name)*a+Number(name)
        setReward(b.toFixed(2))
    }
    return (
        <>
            {modalOne ?
                <PopupOne setVisible={setModalOne} setNextVisible={setModalTwo} />
                :
                modalTwo ? 
                    <PopupTwo setVisible={setModalTwo} setNextVisible={setModalThree} />
                    :
                    modalThree ?
                        <PopupThree setVisible={setModalThree} />
                        :
                        <></>
            }
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#efefef", maxHeight: modalOne ? 100 * vh : modalTwo ? 100 * vh : modalThree ? 100 * vh : 3000, overflowY : modalOne ? "hidden" : modalTwo ? "hidden" : modalThree ? "hidden" : "scroll" }}>
                <Header splash={false} bold="Home" />
                <div style={{
                    backgroundColor: "#efefef",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                }}>
                    <input onClick={modal} style={{
                        cursor: "pointer",
                        outline: 0,
                        position: "fixed",
                        height: 90,
                        top: 100 * vh - 90,
                        width: 68 * vw,
                        maxWidth: 1280,
                        backgroundColor: "#202426",
                        fontSize: 24,
                        color: "#ffffff",
                        fontWeight: "bold",
                        alignSelf: "center",
                        textDecorationLine: "none"
                    }} type="button" value="공모 참여하기" />
                    <div style={{
                        width: 58 * vw,
                        paddingTop: 40,
                        paddingBottom: 40,
                        paddingLeft: 5 * vw,
                        paddingRight: 5 * vw,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <img src={jisun} style={{ width: 290, height: 238, marginRight: 40, borderRadius: 10 }} />
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                maxWidth: 550,
                                width: 42 * vw,
                                height: 238
                            }}>
                                <div style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    marginBottom: 20,
                                }}>Pood의 먹방 유튜브 펀딩</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        marginRight: 40
                                    }}>
                                        <div style={{
                                            fontSize: 21,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginBottom: 10
                                        }}>{fund}
                                        <div style={{
                                                display: "inline-block",
                                                fontSize: 16,
                                                fontWeight: "normal",
                                                marginLeft: 4,
                                            }}>LINK 펀딩</div>
                                        </div>
                                        <div style={{
                                            fontSize: 21,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginBottom: 10
                                        }}>D - 9
                                        <div style={{
                                                display: "inline-block",
                                                fontSize: 16,
                                                fontWeight: "normal",
                                                marginLeft: 4,
                                            }}>2020/12/31 종료</div>
                                        </div>
                                        <div style={{
                                            fontSize: 21,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginBottom: 10
                                        }}>900
                                        <div style={{
                                                display: "inline-block",
                                                fontSize: 16,
                                                fontWeight: "normal",
                                                marginLeft: 4,
                                            }}>명의 팬</div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start"
                                    }}>
                                        <div style={{
                                            fontSize: 21,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginBottom: 10
                                        }}>10000
                                        <div style={{
                                                display: "inline-block",
                                                fontSize: 16,
                                                fontWeight: "normal",
                                                marginLeft: 4,
                                            }}>개 분배</div>
                                        </div>
                                        <div style={{
                                            fontSize: 16,
                                            fontWeight: "normal",
                                            color: "#202426",
                                            marginBottom: 10
                                        }}>개당가격 :
                                        <div style={{
                                                display: "inline-block",
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                marginLeft: 4,
                                            }}>1.636</div> LINK
                                    </div>
                                        <div style={{
                                            fontSize: 16,
                                            fontWeight: "normal",
                                            color: "#202426",
                                            marginBottom: 10
                                        }}>목표 금액 :
                                        <div style={{
                                                display: "inline-block",
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                marginLeft: 4,
                                            }}>16,360</div> LINK
                                    </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 180,
                                    height: 46
                                }}>
                                    <div style={{
                                        width: 90,
                                        height: 46,
                                        border: "1px solid #202426",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <GoHeart color="#e78276" size={38} />
                                    </div>
                                    <div style={{
                                        width: 90,
                                        height: 46,
                                        border: "1px solid #202426",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <IoMdShare color="#212426" size={38} />
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                width: 180,
                                height: 180,
                            }}>
                                <CircularProgressbarWithChildren
                                    value={percentage}
                                    styles={buildStyles({
                                        pathColor: "#202426",
                                        trailColor: "#EFEFEF"
                                    })}
                                ><div style={{
                                    fontSize: 21,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    marginTop: -11
                                }}>{percentage}%</div></CircularProgressbarWithChildren>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        marginTop: 10,
                        marginBottom: 10,
                        width: 58 * vw,
                        paddingLeft: 5 * vw,
                        paddingRight: 5 * vw,
                        paddingTop: 48,
                        paddingBottom: 54,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <CloseBeta
                                img={analytics}
                                title="채널 수익의 100% 분배"
                                content="12개월간 채널수익의 100%를 리워드로 수령합니다. (2021/03/20일 ~ 2021/09/20)"
                            />
                            <CloseBeta
                                img={awesomeCoins}
                                title="월 평균 9.05%의 예상 성장률"
                                content="해당 크리에이터의 펀딩 금액은 월 9.05%의 성장을 가정해 산정되었습니다. 성장률은 높을수도 낮을수도 있습니다."
                            />
                        </div>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                        }}>
                            <CloseBeta
                                img={gift}
                                title="리워드는 유동적입니다."
                                content="수령하는 리워드의 양은 원금 손실의 가능성이 있습니다. 채널 성장률 & 리워드 계산기를 통해 계산해보세요."
                            />
                            <CloseBeta
                                img={fan}
                                title="크리에이터의 가장 큰 지지자가 되어주세요!"
                                content="크리에이터는 여러분의 관심과 지원을 통해  빠르게 성장하고 보답하려 노력할것입니다."
                            />
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: "#ffffff",
                    }}>
                        <div style={{
                            width: 68 * vw,
                            paddingTop: 20,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            borderBottom: "1px solid #797B7C"
                        }}>
                            <input onClick={onFund} style={{
                                cursor: "pointer",
                                outline: 0,
                                backgroundColor: "#ffffff",
                                width: 200,
                                height: 28,
                                paddingBottom: 10,
                                fontSize: 18,
                                opacity: infor === 0 ? 1 : 0.6,
                                fontWeight: infor === 0 ? "bold" : "normal",
                                color: infor === 0 ? "#161513" : "#797B7C",
                                border: 0,
                                borderBottom: infor === 0 ? "2px solid #212426" : 0,
                            }} type="button" value="펀딩 정보" />
                            <input onClick={onChannel} style={{
                                cursor: "pointer",
                                outline: 0,
                                backgroundColor: "#ffffff",
                                width: 200,
                                height: 28,
                                paddingBottom: 10,
                                fontSize: 18,
                                opacity: infor === 1 ? 1 : 0.6,
                                fontWeight: infor === 1 ? "bold" : "normal",
                                color: infor === 1 ? "#161513" : "#797B7C",
                                border: 0,
                                borderBottom: infor === 1 ? "2px solid #212426" : 0
                            }} type="button" value="채널 정보" />
                            <input onClick={onReward} style={{
                                cursor: "pointer",
                                outline: 0,
                                backgroundColor: "#ffffff",
                                width: 200,
                                height: 28,
                                paddingBottom: 10,
                                fontSize: 18,
                                opacity: infor === 2 ? 1 : 0.6,
                                fontWeight: infor === 2 ? "bold" : "normal",
                                color: infor === 2 ? "#161513" : "#797B7C",
                                border: 0,
                                borderBottom: infor === 2 ? "2px solid #212426" : 0
                            }} type="button" value="리워드 계산기" />
                        </div>
                    </div>
                    {infor === 0 ?
                        <>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                                paddingBottom: 200,
                                width: 68 * vw,
                            }}>
                                <img src={solitude} alt="나중에" style={{ width: 68 * vw, maxWidth: 1280, height: 200, marginTop: 20, marginBottom: 40 }} />
                                <div style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    color: "#161513",
                                    marginBottom: 40,
                                }}>- Pood님의 채널을 보세요! 랍스타부터 참치까지 다양한 먹방을 하고 있습니다. -</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: 40,
                                    width: 1020,
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    border: "2px solid #212426",
                                    borderRadius: 30,
                                }}>
                                    {Invest.map(element => <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: 290,
                                    }}>
                                        <img src={element.img} alt="나중에" style={{ width: 80, height: 80, marginBottom: 20 }} />
                                        <div style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginBottom: 10,
                                            textAlign: "center"
                                        }}>{element.title}</div>
                                        <div style={{
                                            opacity: 0.8,
                                            fontSize: 16,
                                            color: "#202426",
                                            lineHeight: 1.88,
                                            textAlign: "center",
                                        }}>{element.content}</div>
                                    </div>)}
                                </div>
                                {QA.map(element => <QAList title={element.title} content={element.content} />)}
                            </div>
                        </>
                        :
                        infor === 1 ?
                            <>
                                <div style={{
                                    width: 58 * vw,
                                    paddingTop: 40,
                                    paddingLeft: 5 * vw,
                                    paddingRight: 5 * vw,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between"
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                    }}>
                                        <img src={jisun} style={{ width: 180, height: 180, borderRadius: 90, marginRight: 40, marginTop: 24 }} />
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            height: 272,
                                            marginRight: 40,
                                        }}>
                                            <CreatorIntro title="채널 이름" content="Pood" other={false} />
                                            <CreatorIntro title="섹터 구분" content="먹방" other={false} />
                                            <CreatorIntro title="YDOT Rating" content={
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                }}>
                                                    <div style={{
                                                        fontSize: 21,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                        marginRight: 10
                                                    }}>3.5</div>
                                                    <BsStarFill style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                                    <BsStarFill style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                                    <BsStarFill style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                                    <BsStarHalf style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                                    <BsStar style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                                </div>
                                            } other={true} />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            height: 272,
                                            marginRight: 100,
                                        }}>
                                            <CreatorIntro title="구독자" content="100,000명" other={false} />
                                            <CreatorIntro title="누적 조회수" content="10,000,000회" other={false} />
                                            <CreatorIntro title="채널" content={
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "flex-start",
                                                }}>
                                                    <AiFillYoutube color="#212426" style={{ marginRight: 30, marginLeft: 10 }} size={30} />
                                                    <ImTwitch style={{ marginRight: 30 }} color="#212426" size={30} />
                                                    <ImTwitch style={{ marginRight: 30 }} color="#212426" size={30} />
                                                    <ImTwitch style={{ marginRight: 30 }} color="#212426" size={30} />
                                                </div>
                                            } other={true} />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            width: 400,
                                            height: 272,
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                color: "#202426",
                                                fontSize: 18,
                                                height: 26,
                                                marginBottom: 10
                                            }}>인기 동영상</div>
                                            <img src={campusone} style={{ width: 290, height: 108 }} />
                                            <img src={campustwo} style={{ width: 290, height: 108, marginTop: 20 }} />
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: "#ffffff",
                                    width: 58 * vw,
                                    paddingLeft: 5 * vw,
                                    paddingRight: 5 * vw,
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingTop: 40,
                                    paddingBottom: 40
                                }}>
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 30,
                                        textAlign: "left"
                                    }}>누적 조회수</div>
                                    <div style={{
                                        width: 58 * vw,
                                        height: 273,
                                        marginBottom: 40,
                                        borderRadius: 30,
                                    }}>
                                        <img src={noojeockview} style={{
                                            width: "100%",
                                            height: 273,
                                            borderRadius: 30
                                        }} />
                                    </div>
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 30,
                                        textAlign: "left"
                                    }}>누적 구독자</div>
                                    <div style={{
                                        width: 58 * vw,
                                        height: 273,
                                        marginBottom: 40,
                                        borderRadius: 30,
                                    }}>
                                        <img src={noojeok} style={{
                                            width: "100%",
                                            height: 273,
                                            borderRadius: 30
                                        }} />
                                    </div>
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 30,
                                        textAlign: "left"
                                    }}>월별 조회수 획득</div>
                                    <div style={{
                                        width: 58 * vw,
                                        height: 273,
                                        marginBottom: 40,
                                        borderRadius: 30,
                                    }}>
                                        <img src={month} style={{
                                            width: "100%",
                                            height: 273,
                                            borderRadius: 30
                                        }} />
                                    </div>
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 30,
                                        textAlign: "left"
                                    }}>월별 구독자 획득</div>
                                    <div style={{
                                        width: 58 * vw,
                                        height: 273,
                                        marginBottom: 130,
                                        borderRadius: 30,
                                    }}>
                                        <img src={monthsub} style={{
                                            width: "100%",
                                            height: 273,
                                            borderRadius: 30
                                        }} />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div style={{
                                    backgroundColor: "#ffffff",
                                    width: 58 * vw,
                                    paddingLeft: 5 * vw,
                                    paddingRight: 5 * vw,
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingTop: 40,
                                    paddingBottom: 40,
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        marginTop: 20,
                                        width: "100%",
                                        alignSelf: "center"
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10
                                            }}>펀딩 금액</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width: 230,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                paddingTop: 17,
                                                paddingBottom: 17,
                                                borderRadius: 50,
                                                backgroundColor: "#F2F2F2",
                                                marginBottom: 20
                                            }}>
                                                <input  type="text" name="name" placeholder="100" onChange={onChange} value={name} style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    border: 0,
                                                    backgroundColor: "#F2F2F2",
                                                    textAlign: "right",
                                                    outline: 0,
                                                }} />
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginLeft: 10
                                                }}>LINK</div>
                                            </div>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10
                                            }}>예상 성장률</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width: 230,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                paddingTop: 17,
                                                paddingBottom: 17,
                                                borderRadius: 50,
                                                backgroundColor: "#F2F2F2",
                                                marginBottom: 20
                                            }}>
                                                <input type="text" name="nickname" placeholder="5" onChange={onChange} value={nickname} style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    border: 0,
                                                    backgroundColor: "#F2F2F2",
                                                    textAlign: "right",
                                                    outline: 0,
                                                }} />
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginLeft: 10
                                                }}>%</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10
                                            }}>총 배당</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width: 228,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                paddingTop: 15,
                                                paddingBottom: 15,
                                                borderRadius: 50,
                                                backgroundColor: "#ffffff",
                                                marginBottom: 20,
                                                border: "2px solid #212426"
                                            }}>
                                        
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    textAlign:"end",
                                                    height: 24,
                                                    textAlign:"right"
                                                }}>{reward}   LINK</div>
                                            </div>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10
                                            }}>예상 수익률</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                width: 228,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                paddingTop: 17,
                                                paddingBottom: 17,
                                                borderRadius: 50,
                                                backgroundColor: "#ffffff",
                                                border: "2px solid #212426"
                                            }}>
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginLeft: 10,
                                                    textAlign:"right"
                                                }}>{roi}%</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            width: 290,
                                            backgroundColor: "#ffffff",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start"
                                        }}>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                fontWeight: "bold",
                                                marginBottom: 20
                                            }}>사용방법</div>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10
                                            }}>1. 펀딩금액, 예상 성장률 입력</div>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10
                                            }}>2. 계산 버튼 클릭</div>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10
                                            }}>3. 리워드, 수익률 확인</div>
                                        </div>
                                    </div>
                                    <div style={{
                                        alignSelf: "flex-start",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 40,
                                        marginBottom: 100,
                                    }}>
                                        <input onClick={calculate} style={{
                                            cursor: "pointer",
                                            outline: 0,
                                            width: 290,
                                            height: 60,
                                            borderRadius: 50,
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#ffffff",
                                            backgroundColor: "#e78276",
                                            border: 0,
                                            marginLeft: 0,
                                        }} type="button" value="계산" />
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 16,
                                            color: "#202426",
                                            marginLeft: 20
                                        }}>* 리워드 계산기는 성장률을 일괄 계산해  도출한 수치이며 정확하지 않습니다.</div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}