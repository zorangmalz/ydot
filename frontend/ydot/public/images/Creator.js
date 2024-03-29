import React, { Suspense, useState, useEffect, useReducer } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useFirestore } from "react-redux-firebase"
import { useSelector } from "react-redux";
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

//디자인
import Header, { CreatorIntro, QAList, CloseBeta, HashTag, ChannelAnalysisBox, PopupOne, PopupTwo, PopupThree, MyInfo, Graph } from '../Style'
import { MHeader, MHashTag, MFunding, MQAList, MChannelAnalysisBox, MChannelAnalysisBoxTwo, MCreatorIntro, MPopupOne, MPopupTwo, MPopupThree, MGraph } from '../Mobile'

//아이콘
import { BiHeart } from 'react-icons/bi'
import { IoMdShare, IoIosCalculator } from 'react-icons/io'

//모바일 대응
import { useMediaQuery } from 'react-responsive'

//image
//펀딩 핵심 포인트
import analytics from '../icon/analytics.png'
import risk from '../icon/risk.png'
import barchart from '../icon/bar-chart.png'

//섹터 이미지
import vlog from '../icon/vlog.png'
import it from "../icon/it.png"
import entertainment from "../icon/entertainment.png"
import sports from "../icon/sports.png"
import food from "../icon/food.png"
import game from "../icon/game.png"
import music from "../icon/music.png"

//나머지
import thumbup from '../icon/thumb-up.png'
import solitude from '../icon/solitude.png'
import jisun from '../icon/jisun.png'
import campusone from '../icon/campusone.png'
import month from '../icon/month.png'
import monthsub from '../icon/monthsub.png'
import noojeok from '../icon/noojeok.png'
import thumbnailone from '../icon/thumbnailone.png'

import ReactPlayer from "react-player"

function reducer(state, action) {
    switch (action.type) {
        case "fund":
            return 0
        case "channel":
            return 1
        default:
            return 0
    }
}

export default function Creator() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

    //Default
    const [modalOne, setModalOne] = useState(false)
    const [modalTwo, setModalTwo] = useState(false)
    const [modalThree, setModalThree] = useState(false)

    //Mobile
    const [MmodalOne, setMModalOne] = useState(false)
    const [MmodalTwo, setMModalTwo] = useState(false)
    const [MmodalThree, setMModalThree] = useState(false)

    //펀딩정보, 채널 정보, 리워드 계산기
    const [infor, dispatch] = useReducer(reducer, 0)

    const onFund = () => {
        dispatch({ type: "fund" })
    }
    const onChannel = () => {
        dispatch({ type: "channel" })
    }

    //팝업부분을 여기다 구현해놓음. 나중에 input값을 coinAmount변수로 넣어서 주면 됨
    const firestore = useFirestore()
    const history = useHistory()
    const location = useLocation()
    const myparam = location.state.creatorName
    const { uid } = useSelector((state) => state.firebase.auth);

    function modal() {
        if (uid) {
            setModalOne(true)

        } else {
            
            history.push("/login")
        }

    }
    function Mmodal() {
        if (uid) {
            setMModalOne(true)

        } else {
            
            history.push("/login")
        }

    }

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

    const [reward, setReward] = useState("")
    const [roi, setRoi] = useState("")
    const [percentage, setPercentage] = useState(0)

    const [sectorImage, setSectorImage] = useState("")
    useEffect(() => {
        getInfo()
    }, [])

    const [fundingAim, setFundingAim] = useState(0)
    const [fundingTotal, setFundingTotal] = useState(0)
    const [fundingDead, setFundingDead] = useState(0)
    const [ongoing, setOngoing] = useState(false)
    const [pv, setPv] = useState(0)
    const [view, setView] = useState(0)
    const [grow, setGrow] = useState(0)
    const [share, setShare] = useState(0)
    const [channelTitle, setChannelTitle] = useState("")
    const [sort, setSort] = useState("")
    const [name, setName] = useState("")
    const [sector, setSector] = useState("")
    const [popular, setPopular] = useState("")
    const [main, setMain] = useState("")
    const [mainImg,setMainImg]=useState("")
    const [popularImg,setPopularImg]=useState("")
    const [profileImg,setProfileImg]=useState("")
    function getInfo() {
        
        firestore.collection("Creator").doc(myparam).onSnapshot(doc => {
            setPopularImg("/images/Profile/"+doc.data().channelTitle+"/"+doc.data().channelTitle+"Popular.jpg")
            setMainImg("/images/Profile/"+doc.data().channelTitle+"/"+doc.data().channelTitle+"Main.jpg")
            setProfileImg("/images/Profile/"+doc.data().channelTitle+"/"+doc.data().channelTitle+"Profile.jpg")
            setFundingAim(doc.data().FundingAim)
            setFundingTotal(doc.data().FundingTotal)
            setFundingDead(doc.data().Deadline)
            setPercentage((doc.data().FundingTotal / doc.data().FundingAim * 100).toFixed(2))
           
            if (doc.data().Deadline < today.getTime()) {
                setOngoing(false)
            } else {
                setOngoing(true)
            }
        })
        const today = new Date()
        firestore.collection("Creator").doc(myparam).get().then(doc=>{
            setPv(doc.data().PV)
            setView(doc.data().view)
            setGrow(doc.data().growth)
            setShare(doc.data().share)
            setSort(doc.data().sort)
            setChannelTitle(doc.data().channelTitle)
            setName(doc.data().name)
            setSector(doc.data().sector)
            setMain(doc.data().mainVideo)
            setPopular(doc.data().popularVideo)
            if (sector === "IT/과학기술") {
                setSectorImage(it)
            } else if (sector === "엔터테인먼트") {
                setSectorImage("../icon/entertainment.png")
            } else if (sector === "스포츠") {
                setSectorImage("../icon/sports.png")
            } else if (sector === "푸드/먹방") {
                setSectorImage("../icon/food.png")
            } else if (sector === "Vlog/일상") {
                setSectorImage("../icon/vlog.png")
            } else if (sector === "게임") {
                setSectorImage("../icon/game.png")
            } else if (sector === "음악") {
                setSectorImage("../icon/music.png")
            }
        }
        )
    }
    
    function calculate() {
        var a = ((Math.pow(1 + Number(document.getElementById("RATE").value) / 100, 12) - 1) * Number(view) * 2 - Number(pv)) / Number(pv)
        
        setRoi((a * 100).toFixed(2))
        var b = Number(document.getElementById("PRICE").value) * a + Number(document.getElementById("PRICE").value)
        setReward(b.toFixed(2))
    }


    //그래프
    const [views, setViews] = useState([])
    const [subs, setSubs] = useState([])
    const [monViews, setMonViews] = useState([])
    const [monSubs, setMonSubs] = useState([])
    const [index, setIndex] = useState()
    async function CreatorData() {
        const url = 'http://15.165.240.32:8000/v0/beta/';

        await fetch(url).then(res => {
            return res.json()
        }).then(data => {
            setIndex(data)
        })
        firestore.collection("Creator").doc(myparam).get().then(doc => {
            setChannelTitle(doc.data().channelTitle)
        })
        
        
        var count = 0;
        var objtype;
        for (var k in index) {
            
            if (index[k]["channelTitle"] === channelTitle) {
                
                
                objtype = index[count]["logData"]
                break;
            }
            count = count + 1;
        }
        let VIEWS = new Array()
        let viewsDiff = new Array()
        let monthView = new Array()
        let SUBS = new Array()
        let subsDiff = new Array()
        let monthSubs = new Array()
        
        for (var k in objtype) {
            VIEWS.push({x: k, y: objtype[k].views})
            viewsDiff.push(objtype[k].views)
            SUBS.push({x: k, y: objtype[k].subs})
            subsDiff.push(objtype[k].subs)
        }

        function diff(arr) {
            var month = new Array()
            month.push(0)
            arr.forEach(function (item, index, arr2) {
                month.push(arr2[index+1] - item)
            });
            return month
        }

        var a = diff(viewsDiff)
        var b = diff(subsDiff)
        var count = 0
        for (var k in objtype) {
            monthView.push({x: k, y: a[count]})
            monthSubs.push({x: k, y: b[count]})
            count = count + 1
        }

        var now = new Date().getDate()
        var time = new Date().getHours()
        
        
        if (now === 9) {
            setViews(VIEWS.slice(0, -12))
            setMonViews(monthView.slice(0, -12))
            setSubs(SUBS.slice(0, -12))
            setMonSubs(monthSubs.slice(0, -12))
        } else if (now === 10) {
            if (time < 11) {
                setViews(VIEWS.slice(0, -12))
                setMonViews(monthView.slice(0, -12))
                setSubs(SUBS.slice(0, -12))
                setMonSubs(monthSubs.slice(0, -12))
            } else if (time >= 11 && time < 17) {
                setViews(VIEWS.slice(0, -11))
                setMonViews(monthView.slice(0, -11))
                setSubs(SUBS.slice(0, -11))
                setMonSubs(monthSubs.slice(0, -11))
            } else {
                setViews(VIEWS.slice(0, -10))
                setMonViews(monthView.slice(0, -10))
                setSubs(SUBS.slice(0, -10))
                setMonSubs(monthSubs.slice(0, -10))
            }
        } else if (now === 11) {
            if (time < 11) {
                setViews(VIEWS.slice(0, -10))
                setMonViews(monthView.slice(0, -10))
                setSubs(SUBS.slice(0, -10))
                setMonSubs(monthSubs.slice(0, -10))
            } else if (time >= 11 && time < 17) {
                setViews(VIEWS.slice(0, -9))
                setMonViews(monthView.slice(0, -9))
                setSubs(SUBS.slice(0, -9))
                setMonSubs(monthSubs.slice(0, -9))
            } else {
                setViews(VIEWS.slice(0, -8))
                setMonViews(monthView.slice(0, -8))
                setSubs(SUBS.slice(0, -8))
                setMonSubs(monthSubs.slice(0, -8))
            }
        } else if (now === 12) {
            if (time < 11) {
                setViews(VIEWS.slice(0, -8))
                setMonViews(monthView.slice(0, -8))
                setSubs(SUBS.slice(0, -8))
                setMonSubs(monthSubs.slice(0, -8))
            } else if (time >= 11 && time < 17) {
                setViews(VIEWS.slice(0, -7))
                setMonViews(monthView.slice(0, -7))
                setSubs(SUBS.slice(0, -7))
                setMonSubs(monthSubs.slice(0, -7))
            } else {
                setViews(VIEWS.slice(0, -6))
                setMonViews(monthView.slice(0, -6))
                setSubs(SUBS.slice(0, -6))
                setMonSubs(monthSubs.slice(0, -6))
            }
        } else if (now === 13) {
            if (time < 11) {
                setViews(VIEWS.slice(0, -6))
                setMonViews(monthView.slice(0, -6))
                setSubs(SUBS.slice(0, -6))
                setMonSubs(monthSubs.slice(0, -6))
            } else if (time >= 11 && time < 17) {
                setViews(VIEWS.slice(0, -5))
                setMonViews(monthView.slice(0, -5))
                setSubs(SUBS.slice(0, -5))
                setMonSubs(monthSubs.slice(0, -5))
            } else {
                setViews(VIEWS.slice(0, -4))
                setMonViews(monthView.slice(0, -4))
                setSubs(SUBS.slice(0, -4))
                setMonSubs(monthSubs.slice(0, -4))
            }
        } else if (now === 14) {
            if (time < 11) {
                setViews(VIEWS.slice(0, -4))
                setMonViews(monthView.slice(0, -4))
                setSubs(SUBS.slice(0, -4))
                setMonSubs(monthSubs.slice(0, -4))
            } else if (time >= 11 && time < 17) {
                setViews(VIEWS.slice(0, -3))
                setMonViews(monthView.slice(0, -3))
                setSubs(SUBS.slice(0, -3))
                setMonSubs(monthSubs.slice(0, -3))
            } else {
                setViews(VIEWS.slice(0, -2))
                setMonViews(monthView.slice(0, -2))
                setSubs(SUBS.slice(0, -2))
                setMonSubs(monthSubs.slice(0, -2))
            }
        }  else {
            setViews(VIEWS)
            setMonViews(monthView)
            setSubs(SUBS)
            setMonSubs(monthSubs)
        }
    }

    useEffect(() => {
        CreatorData()
    }, [channelTitle])

    return (
        <div>
            <Default>
                {modalOne ?
                    <PopupOne setVisible={setModalOne} setNextVisible={setModalTwo} />
                    :
                    modalTwo ?
                        <PopupTwo setVisible={setModalTwo} setNextVisible={setModalThree} creatorName={myparam} />
                        :
                        modalThree ?
                            <PopupThree setVisible={setModalThree} />
                            :
                            <></>
                }
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#efefef",
                    maxHeight: modalOne ? "100vh" : modalTwo ? "100vh" : modalThree ? "100vh" : 3000,
                    overflowY: modalOne ? "hidden" : modalTwo ? "hidden" : modalThree ? "hidden" : "scroll"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        width: "100vw",
                        minWidth: 1280,
                        height: 80,
                        zIndex: 0,
                    }}>
                        <Header bold="Fund" />
                    </div>
                    <div style={{
                        backgroundColor: "#efefef",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100vw",
                        minWidth: 1280,
                        zIndex: 0,
                    }}>
                        {ongoing ?
                            <div onClick={modal} style={{
                                outline: 0,
                                position: "fixed",
                                zIndex: 5,
                                bottom: 0,
                                height: 80,
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#e78276",
                                fontSize: 24,
                                color: "#ffffff",
                                fontWeight: "bold",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                            }}>펀딩하기</div>
                            :
                            <div style={{
                                outline: 0,
                                position: "fixed",
                                zIndex: 5,
                                bottom: 0,
                                height: 80,
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#929594",
                                fontSize: 24,
                                color: "#ffffff",
                                fontWeight: "bold",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>펀딩 준비중입니다</div>
                        }

                        {/* 계산기 디자인 */}
                        {modalOne || modalThree ? <></> : <div onClick={() => {
                            onFund()
                            setTimeout(() => {
                                document.getElementById('calculator').scrollIntoView()
                            }, 500)
                        }} style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 100,
                            height: 100,
                            border: "2px solid #e78276",
                            borderRadius: 50,
                            backgroundColor: "#ffffff",
                            position: "fixed",
                            zIndex: 7,
                            cursor: "pointer",
                            bottom: 132,
                            right: 300,
                        }}><IoIosCalculator size={60} color="#e78276" /></div>}
                        <div style={{
                            width: "56vw",
                            minWidth: 1060,
                            paddingLeft: 110,
                            paddingRight: 110,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#ffffff",
                            paddingTop: 40,
                            paddingBottom: 20,
                        }}>
                            <div style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                justifyContent: "space-between"
                            }}>
                                <div style={{
                                    fontSize: 24,
                                    fontWeight: "bold",
                                    color: "#202426"
                                }}>{name}</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                }}>
                                    <HashTag content={sort} />
                                    <HashTag content={sector} />
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: 20,
                            }}>
                                {/* 썸네일 */}
                                <ReactPlayer url={main} controls></ReactPlayer>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    height: 320,
                                }}>
                                    <div style={{
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: "#e78276",
                                    }}>{(fundingTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))} <div style={{
                                        display: "inline-block",
                                        fontSize: 16,
                                        color: "#202426",
                                        fontWeight: "normal"
                                    }}>원 펀딩 완료</div></div>
                                    <div style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                    }}>D-9 <div style={{
                                        display: "inline-block",
                                        fontSize: 16,
                                        fontWeight: "normal"
                                    }}>2021/1/9 종료</div></div>
                                    <div style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                    }}>{percentage}% <div style={{
                                        display: "inline-block",
                                        fontSize: 16,
                                        fontWeight: "normal"
                                    }}>달성</div></div>
                                    <div style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                    }}>{(fundingAim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))} <div style={{
                                        display: "inline-block",
                                        fontSize: 16,
                                        fontWeight: "normal"
                                    }}>목표</div></div>
                                    {/* 하트 및 공유 */}
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>
                                        <div style={{
                                            width: 80,
                                            height: 36,
                                            border: "1px solid #D1D2D2",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <BiHeart color="#000000" size={20} />
                                        </div>
                                        <div style={{
                                            width: 80,
                                            height: 36,
                                            border: "1px solid #D1D2D2",
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <IoMdShare color="#000000" size={20} />
                                        </div>
                                    </div>
                                </div>
                                {/* 원형 진행 바 */}
                                <div style={{
                                    width: 180,
                                    height: 180,
                                }}>
                                    <CircularProgressbarWithChildren
                                        value={percentage}
                                        styles={buildStyles({
                                            pathColor: "#e78276",
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
                        {/* 상단 바 */}
                        <div style={{
                            width: "56vw",
                            minWidth: 1060,
                            paddingRight: 110,
                            paddingLeft: 110,
                            paddingTop: 20,
                            backgroundColor: "#ffffff",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderBottom: "1px solid #d2d3d3"
                        }}>
                            <input onClick={onFund} style={{
                                cursor: "pointer",
                                outline: 0,
                                backgroundColor: "#ffffff",
                                width: 200,
                                height: 24,
                                paddingBottom: 10,
                                fontSize: 18,
                                opacity: infor === 0 ? 1 : 0.6,
                                fontWeight: infor === 0 ? "bold" : "normal",
                                color: infor === 0 ? "#e78276" : "#797B7C",
                                border: 0,
                                borderBottom: infor === 0 ? "2px solid #e78276" : 0,
                            }} type="button" value="펀딩 정보" />
                            <input onClick={onChannel} style={{
                                cursor: "pointer",
                                outline: 0,
                                backgroundColor: "#ffffff",
                                width: 200,
                                height: 24,
                                paddingBottom: 10,
                                fontSize: 18,
                                opacity: infor === 1 ? 1 : 0.6,
                                fontWeight: infor === 1 ? "bold" : "normal",
                                color: infor === 1 ? "#e78276" : "#797B7C",
                                border: 0,
                                borderBottom: infor === 1 ? "2px solid #e78276" : 0
                            }} type="button" value="채널 분석" />
                        </div>
                        {infor === 0 ?
                            <>
                                <div style={{
                                    marginBottom: 10,
                                    width: "56vw",
                                    minWidth: 1060,
                                    paddingLeft: 110,
                                    paddingRight: 110,
                                    paddingTop: 40,
                                    paddingBottom: 40,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <div style={{
                                        marginBottom: 20,
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        width: 180,
                                        alignSelf: "flex-start",
                                    }}>펀딩 핵심 포인트</div>
                                    <div style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: 20,
                                    }}>
                                        <CloseBeta
                                            img={analytics}
                                            title={"채널 수익의 "+share+"% 분배"}
                                            content={"6개월간 채널수익의 "+share+"%를 리워드로 수령하는 조건으로 진행되는 펀딩입니다. (2021/03/20일 ~ 2021/09/20)"}
                                        />
                                        <CloseBeta
                                            img={barchart}
                                            title={"월 "+grow+"%의 평균 성장률"}
                                            content={"해당 펀딩 금액은 월 "+grow+"%의 성장을 가정해 산정되었습니다. 성장률에 따른 예상 리워드를 확인해 보세요"}
                                        />
                                    </div>
                                    <div style={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                        <CloseBeta
                                            img={sectorImage}
                                            title={sector}
                                            content="해당 섹터의 평균 조회수 성장률은 5%, 구독자 성장률은 3% 입니다. 채널 분석에서 상세한 비교를 확인하세요!"
                                        />
                                        <CloseBeta
                                            img={risk}
                                            title="리워드는 유동적입니다."
                                            content="크리에이터 채널에 대한 투자는 원금손실 가능성이 있습니다.
                                투자 위험 안내를 꼼꼼히 읽어보세요."
                                        />
                                    </div>
                                    <div id="calculator" style={{
                                        marginTop: 40,
                                        marginBottom: 20,
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        width: 180,
                                        alignSelf: "flex-start",
                                    }}>리워드 계산기</div>
                                    <div style={{
                                        backgroundColor: "#ffffff",
                                        width: "56vw",
                                        minWidth: 1060,
                                        paddingLeft: 110,
                                        paddingRight: 110,
                                        paddingBottom: 50,
                                        display: "flex",
                                        flexDirection: "column",
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
                                                    justifyContent: "flex-end",
                                                    width: 230,
                                                    paddingLeft: 30,
                                                    paddingRight: 30,
                                                    paddingTop: 17,
                                                    paddingBottom: 17,
                                                    borderRadius: 50,
                                                    backgroundColor: "#F2F2F2",
                                                    marginBottom: 20
                                                }}>
                                                    <input type="text" placeholder="펀딩 금액을 입력해주세요" id="PRICE" style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        border: 0,
                                                        backgroundColor: "#F2F2F2",
                                                        textAlign: "right",
                                                        outline: 0,
                                                        width: 200,
                                                    }} />
                                                    <div style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                        marginLeft: 10
                                                    }}>원</div>
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
                                                    justifyContent: "flex-end",
                                                    width: 230,
                                                    paddingLeft: 30,
                                                    paddingRight: 30,
                                                    paddingTop: 17,
                                                    paddingBottom: 17,
                                                    borderRadius: 50,
                                                    backgroundColor: "#F2F2F2",
                                                    marginBottom: 20
                                                }}>
                                                    <input type="text" placeholder={grow} id="RATE" style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        border: 0,
                                                        backgroundColor: "#F2F2F2",
                                                        textAlign: "right",
                                                        outline: 0,
                                                        width: 200,
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
                                                }}>예상 리워드</div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "flex-end",
                                                    width: 228,
                                                    paddingLeft: 30,
                                                    paddingRight: 30,
                                                    paddingTop: 17,
                                                    paddingBottom: 17,
                                                    borderRadius: 50,
                                                    backgroundColor: "#ffffff",
                                                    marginBottom: 20,
                                                    border: "2px solid #212426"
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        fontWeight: "bold",
                                                        textAlign: "right",
                                                        width: 200,
                                                        height: 24,
                                                    }}>{reward}</div>
                                                    <div style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                        textAlign: "end",
                                                        height: 24,
                                                        marginLeft: 10,
                                                        textAlign: "right"
                                                    }}>원</div>
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
                                                    justifyContent: "flex-end",
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
                                                        color: "#202426",
                                                        fontWeight: "bold",
                                                        textAlign: "right",
                                                        height: 24,
                                                        width: 200,
                                                    }}>{roi}</div>
                                                    <div style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                        marginLeft: 10,
                                                        textAlign: "right"
                                                    }}>%</div>
                                                </div>
                                            </div>
                                            <div style={{
                                                width: 290,
                                                backgroundColor: "#ffffff",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
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
                                                    marginBottom: 10,
                                                    opacity: 0.8,
                                                }}>1. 펀딩금액, 예상 성장률 입력</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    marginBottom: 10,
                                                    opacity: 0.8,
                                                }}>2. 계산 버튼 클릭</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    marginBottom: 10,
                                                    opacity: 0.8,
                                                }}>3. 리워드, 수익률 확인</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            alignSelf: "flex-start",
                                            display: "flex",
                                            flexDirection: "column",
                                            marginTop: 30,
                                        }}>
                                            <input onClick={calculate} style={{
                                                cursor: "pointer",
                                                outline: 0,
                                                width: 290,
                                                height: 60,
                                                borderRadius: 50,
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                color: "#e78276",
                                                backgroundColor: "#ffffff",
                                                border: "2px solid #e78276",
                                            }} type="button" value="계산" />
                                            <div style={{
                                                fontSize: 16,
                                                color: "#ff2b2b",
                                                marginTop: 10,
                                                marginLeft: 10
                                            }}>펀딩 금액과 예상 성장률을 정확히 입력해주세요.</div>
                                        </div>
                                    </div>
                                </div>
                                {/* QA 질문 */}
                                {/* <div style={{
                                    width: "56vw",
                                    minWidth: 1060,
                                    paddingLeft: 110,
                                    paddingRight: 110,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    backgroundColor: "#ffffff",
                                    paddingBottom: 200,
                                }}>
                                    <div style={{
                                        width: 840,
                                        fontSize: 24,
                                        fontWeight: "bold",
                                        color: "#161513",
                                        marginTop: 40,
                                    }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</div>
                                    <img src={solitude} alt="나중에" style={{ width: "100%", minWidth: 1280, height: 200, marginTop: 20, marginBottom: 20 }} />
                                    {QA.map(element => <QAList title={element.title} content={element.content} />)}
                                </div> */}
                            </>
                            :
                            <>
                                <div style={{
                                    width: "56vw",
                                    minWidth: 1060,
                                    paddingTop: 40,
                                    paddingLeft: 110,
                                    paddingRight: 110,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        fontSize: 24,
                                        alignSelf: "flex-start",
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginBottom: 20,
                                    }}>채널 요약</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                    }}>
                                        <img src={profileImg} style={{ width: 180, height: 156, borderRadius: 20, marginRight: 40 }} />
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: 180,
                                            height: 156,
                                            marginRight: 40,
                                        }}>
                                            <CreatorIntro title="채널 이름" content={name} other={false} />
                                            <CreatorIntro title="섹터 구분" content={sector} other={false} />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: 180,
                                            height: 156,
                                            marginRight: 150,
                                        }}>
                                            <CreatorIntro title="구독자" content="100,000명" other={false} />
                                            <CreatorIntro title="누적 조회수" content="10,000,000회" other={false} />
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            width: 290,
                                            height: 156,
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                color: "#202426",
                                                fontSize: 18,
                                                height: 26,
                                                marginBottom: 10
                                            }}>인기 동영상</div>
                                            <a href ={popular} target="_blank">
                                            <img src={popularImg} style={{ height: 120, objectFit: "contain" }} />
                                            </a>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        marginTop: 40,
                                    }}>
                                        <ChannelAnalysisBox title="일일 조회수  획득" content="123,123,123" img={true} growth={true} />
                                        <ChannelAnalysisBox title="일일 구독자 획득" content="1,000" img={true} growth={false} />
                                        <ChannelAnalysisBox title="월 평균 조회수 성장률" content="5%" img={true} growth={true} />
                                        <ChannelAnalysisBox title="월 평균 구독자 성장률" content="5%" />
                                        <ChannelAnalysisBox title="좋아요/싫어요 비율" content="15.2" />
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: "#ffffff",
                                    width: "56vw",
                                    minWidth: 1060,
                                    paddingLeft: 110,
                                    paddingRight: 110,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    paddingTop: 40,
                                    paddingBottom: 200
                                }}>
                                    <div style={{
                                        fontSize: 24,
                                        alignSelf: "flex-start",
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginBottom: 40,
                                    }}>채널 상세 데이터</div>
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                    }}>누적 조회수</div>
                                    <Graph data={views} />
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                    }}>누적 구독자</div>
                                    <Graph data={subs} />
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                    }}>월별 조회수 획득</div>
                                    <Graph data={monViews} />
                                    <div style={{
                                        fontSize: 21,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 20,
                                    }}>월별 구독자 획득</div>
                                    <Graph data={monSubs} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Default>
            <Mobile>
                {MmodalOne ?
                    <MPopupOne setVisible={setMModalOne} setNextVisible={setMModalTwo} />
                    :
                    MmodalTwo ?
                        <MPopupTwo setVisible={setMModalTwo} setNextVisible={setMModalThree} creatorName={myparam} />
                        :
                        MmodalThree ?
                            <MPopupThree setVisible={setMModalThree} />
                            :
                            <></>
                }
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#efefef",
                    maxHeight: MmodalOne ? "100vh" : MmodalTwo ? "100vh" : MmodalThree ? "100vh" : 3000,
                    overflowY: MmodalOne ? "hidden" : MmodalTwo ? "hidden" : MmodalThree ? "hidden" : "scroll"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        width: "100vw",
                        zIndex: 0,
                    }}>
                        <MHeader bold="Fund" />
                        <div style={{
                            backgroundColor: "#ffffff",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            width: "100vw",
                        }}>
                            {ongoing ?
                                <div onClick={Mmodal} style={{
                                    outline: 0,
                                    position: "fixed",
                                    zIndex: 5,
                                    bottom: 0,
                                    height: 60,
                                    width: "100vw",


                                    backgroundColor: "#e78276",
                                    fontSize: 20,
                                    color: "#ffffff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                }}>펀딩하기</div>
                                :
                                <div style={{
                                    outline: 0,
                                    position: "fixed",
                                    zIndex: 5,
                                    bottom: 0,
                                    height: 60,
                                    width: "100vw",


                                    backgroundColor: "#929594",
                                    fontSize: 20,
                                    color: "#ffffff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>펀딩 준비중입니다</div>
                            }
                            {MmodalOne || MmodalThree ? <></> : <div onClick={() => {
                                onFund()
                                setTimeout(() => {
                                    document.getElementById('Mcalculator').scrollIntoView()
                                }, 500)
                            }} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 60,
                                height: 60,
                                border: "2px solid #e78276",
                                borderRadius: 30,
                                backgroundColor: "#ffffff",
                                position: "fixed",
                                zIndex: 5,
                                cursor: "pointer",
                                bottom: 112,
                                right: 30,
                            }}><IoIosCalculator size={30} color="#e78276" /></div>}
                            <div style={{
                                width: "90vw",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                                paddingTop: 20,
                                paddingBottom: 10,
                            }}>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <div style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginBottom: 20,
                                    }}>[Vlog] 공부의 달인 두번째 펀딩을 모집합니다.</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "flex-start",
                                    }}>
                                        <MHashTag content="마이크로" />
                                        <MHashTag content="고속 성장" />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    marginTop: 20,
                                }}>
                                    {/* 썸네일 */}
                                    <a href={main} target="_blank">
                                    <img src={mainImg} style={{
                                        width: "90vw",
                                        minWidth: 300,
                                        height: 180,
                                        objectFit: "cover"
                                    }} /></a>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        marginTop: 20,
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width: "80%",
                                        }}>
                                            {/* 펀딩정보 */}
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "50%",
                                                marginTop: 10,
                                            }}>
                                                <div style={{
                                                    width: "90%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start"
                                                }}>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color: "#e78276",
                                                    }}>{fundingTotal} </div>
                                                    <div style={{
                                                        fontSize: 12,
                                                        color: "#202426",
                                                        marginTop: 5
                                                    }}>원 펀딩 완료</div>
                                                </div>
                                                <div style={{
                                                    width: "90%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    marginTop: 10
                                                }}>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                    }}>D-9 </div>
                                                    <div style={{
                                                        fontSize: 12,
                                                        color: "#202426",
                                                        marginTop: 5
                                                    }}>2021/1/9 종료</div>
                                                </div>
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "50%",
                                                marginTop: 10,
                                            }}>
                                                <div style={{
                                                    width: "90%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start"
                                                }}>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                    }}>{percentage}% </div>
                                                    <div style={{
                                                        fontSize: 12,
                                                        color: "#202426",
                                                        marginTop: 5
                                                    }}>달성</div>
                                                </div>
                                                <div style={{
                                                    width: "90%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    marginTop: 10
                                                }}>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                    }}>{fundingAim} </div>
                                                    <div style={{
                                                        fontSize: 12,
                                                        color: "#202426",
                                                        marginTop: 5
                                                    }}>목표</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}>
                                            {/* 원형 진행 바 */}
                                            <div style={{
                                                width: 70,
                                                height: 70,
                                            }}>
                                                <CircularProgressbarWithChildren
                                                    value={percentage}
                                                    styles={buildStyles({
                                                        pathColor: "#e78276",
                                                        trailColor: "#EFEFEF"
                                                    })}
                                                ><div style={{
                                                    fontSize: 12,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginTop: -11
                                                }}>{percentage}%</div></CircularProgressbarWithChildren>
                                            </div>
                                            {/* 하트 및 공유 */}
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignSelf: "flex-end",
                                                marginTop: 10,
                                            }}>
                                                <div style={{
                                                    width: 50,
                                                    height: 20,
                                                    border: "1px solid #D1D2D2",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <BiHeart color="#000000" size={15} />
                                                </div>
                                                <div style={{
                                                    width: 50,
                                                    height: 20,
                                                    border: "1px solid #D1D2D2",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}>
                                                    <IoMdShare color="#000000" size={15} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 상단 바 */}
                            <div style={{
                                backgroundColor: "#ffffff",
                            }}>
                                <div style={{
                                    width: "100vw",
                                    paddingTop: 20,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    borderBottom: "1px solid #d2d3d3"
                                }}>
                                    <input className="safari-design" onClick={onFund} style={{
                                        cursor: "pointer",
                                        outline: 0,
                                        backgroundColor: "#ffffff",
                                        width: 150,
                                        paddingBottom: 10,
                                        fontSize: 16,
                                        opacity: infor === 0 ? 1 : 0.6,
                                        fontWeight: infor === 0 ? "bold" : "normal",
                                        color: infor === 0 ? "#e78276" : "#797B7C",
                                        border: 0,
                                        borderBottom: infor === 0 ? "2px solid #e78276" : 0,
                                    }} type="button" value="펀딩 정보" />
                                    <input className="safari-design" onClick={onChannel} style={{
                                        cursor: "pointer",
                                        outline: 0,
                                        backgroundColor: "#ffffff",
                                        width: 150,
                                        paddingBottom: 10,
                                        fontSize: 16,
                                        opacity: infor === 1 ? 1 : 0.6,
                                        fontWeight: infor === 1 ? "bold" : "normal",
                                        color: infor === 1 ? "#e78276" : "#797B7C",
                                        border: 0,
                                        borderBottom: infor === 1 ? "2px solid #e78276" : 0
                                    }} type="button" value="채널 분석" />
                                </div>
                            </div>
                        </div>
                        {infor === 0 ?
                            <>
                                <div style={{
                                    marginBottom: 10,
                                    width: "100vw",
                                    paddingTop: 40,
                                    paddingBottom: 40,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <div style={{
                                        marginBottom: 20,
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                    }}>펀딩 핵심 포인트</div>
                                    <div style={{
                                        width: "100vw",
                                        minWidth: 300,
                                        backgroundColor: "#ffffff",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}>
                                        <MFunding
                                            img={analytics}
                                            title={"채널 수익의 "+share+"% 분배"}
                                            content={"6개월간 채널수익의 "+share+"%를 리워드로 수령하는 조건으로 진행되는 펀딩입니다. (2021/03/20일 ~ 2021/09/20)"}
                                        />
                                        <MFunding
                                            img={barchart}
                                            title={"월 "+grow+"%의 평균 성장률"}
                                            content={"해당 펀딩 금액은 월 "+grow+"%의 성장을 가정해 산정되었습니다. 성장률에 따른 예상 리워드를 확인해 보세요"}
                                        />
                                        <MFunding
                                            img={vlog}
                                            title={sector}
                                            content="해당 섹터의 평균 조회수 성장률은 5%, 구독자 성장률은 3% 입니다. 채널 분석에서 상세한 비교를 확인하세요!"
                                        />
                                        <MFunding
                                            img={risk}
                                            title="리워드는 유동적입니다."
                                            content="크리에이터 채널에 대한 투자는 원금손실 가능성이 있습니다.
                                투자 위험 안내를 꼼꼼히 읽어보세요."
                                        />
                                    </div>
                                    <div id="Mcalculator" style={{
                                        marginTop: 20,
                                        marginBottom: 20,
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                    }}>리워드 계산기</div>
                                    <div style={{
                                        backgroundColor: "#ffffff",
                                        width: "90vw",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        paddingBottom: 100,
                                    }}>
                                        <div style={{
                                            width: 290,
                                            backgroundColor: "#ffffff",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            marginBottom: 30,
                                        }}>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                fontWeight: "bold",
                                                marginBottom: 20,
                                            }}>사용방법</div>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                opacity: 0.8,
                                            }}>1. 펀딩금액, 예상 성장률 입력</div>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                opacity: 0.8,
                                            }}>2. 계산 버튼 클릭</div>
                                            <div style={{
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                opacity: 0.8,
                                            }}>3. 리워드, 수익률 확인</div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            marginBottom: 30,
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10,
                                                alignSelf: "flex-start"
                                            }}>펀딩 금액</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                                width: 230,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                paddingTop: 17,
                                                paddingBottom: 17,
                                                borderRadius: 50,
                                                backgroundColor: "#F2F2F2",
                                                marginBottom: 20
                                            }}>
                                                <input type="text" placeholder="금액을 입력해주세요" id="PRICE" style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    border: 0,
                                                    backgroundColor: "#F2F2F2",
                                                    textAlign: "right",
                                                    outline: 0,
                                                    width: 200,
                                                    height: 24,
                                                }} />
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginLeft: 10,
                                                    height: 24
                                                }}>원</div>
                                            </div>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10,
                                                alignSelf: "flex-start"
                                            }}>예상 성장률</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
                                                width: 230,
                                                paddingLeft: 30,
                                                paddingRight: 30,
                                                paddingTop: 17,
                                                paddingBottom: 17,
                                                borderRadius: 50,
                                                backgroundColor: "#F2F2F2",
                                                marginBottom: 20
                                            }}>
                                                <input type="text" placeholder={grow} id="RATE" style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    border: 0,
                                                    backgroundColor: "#F2F2F2",
                                                    textAlign: "right",
                                                    outline: 0,
                                                    width: 200,
                                                    height: 24,
                                                }} />
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginLeft: 10,
                                                    height: 24,
                                                }}>%</div>
                                            </div>
                                            <input onClick={calculate} style={{
                                                cursor: "pointer",
                                                marginTop: 20,
                                                outline: 0,
                                                width: 288,
                                                height: 60,
                                                borderRadius: 50,
                                                fontSize: 18,
                                                fontWeight: "bold",
                                                color: "#e78276",
                                                backgroundColor: "#ffffff",
                                                border: "2px solid #e78276",
                                            }} type="button" value="계산" />
                                            <div style={{
                                                fontSize: 14,
                                                color: "#ff2b2b",
                                                marginTop: 10,
                                            }}>펀딩 금액과 예상 성장률을 정확히 입력해주세요.</div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10,
                                                alignSelf: "flex-start"
                                            }}>예상 리워드</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
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
                                                    textAlign: "right",
                                                    width: 200,
                                                    height: 24,
                                                    textAlign: "right"
                                                }}>{reward}</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    height: 24,
                                                    textAlign: "right"
                                                }}>원</div>
                                            </div>
                                            <div style={{
                                                opacity: 0.6,
                                                fontSize: 18,
                                                color: "#202426",
                                                marginBottom: 10,
                                                marginLeft: 10,
                                                alignSelf: "flex-start"
                                            }}>예상 수익률</div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "flex-end",
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
                                                    textAlign: "right",
                                                    width: 200,
                                                    height: 24,
                                                    textAlign: "right"
                                                }}>{roi}</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginLeft: 10,
                                                    height: 24,
                                                    textAlign: "right"
                                                }}>%</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* QA 질문 */}
                                {/* <div style={{
                                    width: "90vw",
                                    minWidth: 300,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    backgroundColor: "#ffffff",
                                    paddingBottom: 100,
                                }}>
                                    <div style={{
                                        width: 300,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        color: "#161513",
                                        marginTop: 10,
                                    }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.</div>
                                    <img src={solitude} alt="나중에" style={{ width: "100%", minWidth: "100vw", height: 80, marginTop: 20, marginBottom: 20 }} />
                                    {QA.map(element => <MQAList title={element.title} content={element.content} />)}
                                </div> */}
                            </>
                            :
                            <>
                                <div style={{
                                    width: "100vw",
                                    paddingTop: 40,
                                    backgroundColor: "#ffffff",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginBottom: 20,
                                    }}>채널 요약</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}>
                                        <div style={{
                                            width: "90vw",
                                            maxWidth: 375,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <img src={profileImg} style={{ width: 80, height: 80, borderRadius: 20, marginRight: 10 }} />
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: 100,
                                                height: 80,
                                            }}>
                                                <MCreatorIntro title="채널 이름" content="지순's 일상" other={false} />
                                                <MCreatorIntro title="섹터 구분" content={sector} other={false} />
                                            </div>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: 100,
                                                height: 80,
                                            }}>
                                                <MCreatorIntro title="구독자" content="100,000명" other={false} />
                                                <MCreatorIntro title="누적 조회수" content="10,000,000회" other={false} />
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            maxWidth: 375,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 20,
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                width: "85vw",
                                                maxWidth: 375,
                                            }}>
                                                <div style={{
                                                    opacity: 0.6,
                                                    color: "#202426",
                                                    fontSize: 14,
                                                    marginBottom: 5
                                                }}>인기 동영상</div>
                                                <a href={popular} target="_blank">
                                                <img src={popularImg} style={{ objectFit: "contain", width: "85vw" }} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        width: "100%",
                                        marginTop: 20,
                                    }}>
                                        <div style={{
                                            width: "90vw",
                                            minWidth: 300,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 10,
                                            marginBottom: 10,
                                        }}>
                                            <MChannelAnalysisBox title="일일 조회수  획득" content="123,123,123" img={true} growth={true} />
                                            <MChannelAnalysisBox title="일일 구독자 획득" content="1,000" img={true} growth={false} />
                                            <MChannelAnalysisBox title="월 평균 조회수 성장률" content="5%" img={true} growth={true} />
                                        </div>
                                        <div style={{
                                            width: "90vw",
                                            minWidth: 300,
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}>
                                            <MChannelAnalysisBoxTwo title="월 평균 구독자 성장률" content="5%" />
                                            <MChannelAnalysisBoxTwo title="좋아요/싫어요 비율" content="15.2" />
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    backgroundColor: "#ffffff",
                                    width: "90vw",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    paddingTop: 40,
                                    paddingBottom: 80
                                }}>
                                    <div style={{
                                        fontSize: 21,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginBottom: 20,
                                    }}>채널 상세 데이터</div>
                                    <div style={{
                                        fontSize: 18,
                                        alignSelf: "flex-start",
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                    }}>누적 조회수</div>
                                    <MGraph data={views} />
                                    <div style={{
                                        fontSize: 18,
                                        alignSelf: "flex-start",
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                    }}>누적 구독자</div>
                                    <MGraph data={subs} />
                                    <div style={{
                                        fontSize: 18,
                                        alignSelf: "flex-start",
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                    }}>월별 조회수 획득</div>
                                    <MGraph data={monViews} />
                                    <div style={{
                                        fontSize: 18,
                                        alignSelf: "flex-start",
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 10,
                                    }}>월별 구독자 획득</div>
                                    <MGraph data={monSubs} />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Mobile>
        </div>
    )
}