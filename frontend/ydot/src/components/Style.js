import React, { useReducer, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useSelector } from "react-redux";
import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip, VictoryBrushLine, VictoryPie, VictorySharedEvents, VictoryLabel } from "victory"

//css
import "./component.css"

//아이콘
import { IoIosCalculator } from 'react-icons/io'
import { FaUserCircle, FaArrowRight, FaArrowDown, FaFacebook } from 'react-icons/fa';
import { AiFillCaretDown, AiFillTwitterCircle } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs'
import { FiArrowRightCircle } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi'

//이미지
import kakaotalk from "./icon/kakaotalk.png"
import rocketup from "./icon/rocketup.png"
import rocketdown from "./icon/rocketdown.png"

export const vw = window.innerWidth / 100
export const vh = window.innerHeight / 100
export const DesktopMinWidthNotPadding = 1224 * 58 / 68 + 7.4 * vw

export default function Header({ bold }) {
    const [mine, setMine] = useState(false)
    const firestore = useFirestore()
    const history =useHistory()
    const { uid } = useSelector((state) => state.firebase.auth);
  
    function getInfo() {
        if(uid){
            console.log(uid)
            history.push("/asset")
        }else{
            console.log("없음")
            history.push("/login")
        }
        
    }
    return (
        <header style={{
            zIndex: 3,
            width: "56vw",
            minWidth: 1060,
            height: 80,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {mine ?
                <MyInfo />
                :
                <></>
            }
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Link to={"/"} style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "#202426",
                        marginRight: 72,
                        textDecorationLine: "none",
                    }}>Y<div style={{
                        display: "inline-block",
                        color: "#da877a"
                    }}>.</div></Link>
                    <>
                        <Link to={"/"} style={{
                            fontSize: 21,
                            color: "#202426",
                            fontWeight: bold === "Home" ? "bold" : "normal",
                            marginRight: 40,
                            opacity: bold === "Home" ? 1 : 0.6,
                            textDecorationLine: "none",
                        }}>Home</Link>
                        <Link to={'/fund'} style={{
                            fontSize: 21,
                            color: "#202426",
                            fontWeight: bold === "Fund" ? "bold" : "normal",
                            marginRight: 40,
                            opacity: bold === "Fund" ? 1 : 0.6,
                            textDecorationLine: "none",
                        }}>펀딩하기</Link>
                        <div onClick={getInfo} style={{
                            cursor:"pointer",
                            fontSize: 21,
                            color: "#202426",
                            fontWeight: bold === "Asset" ? "bold" : "normal",
                            marginRight: 40,
                            opacity: bold === "Asset" ? 1 : 0.6,
                            textDecorationLine: "none",
                        }}>내 자산</div>
                    </>
                </div>
                <button style={{
                    backgroundColor: "#ffffff",
                    border: 0,
                    outline: 0,
                    cursor: "pointer"
                }} onClick={() => setMine(!mine)}><FaUserCircle color="#202426" size={48} /></button>
            </div>
        </header>
    )
}

export function TopBanner({img, title, content, backgroundColor}) {
    return (
        <>
            <div style={{
                width: "100vw",
                minWidth: 1060,
                height: 418,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: backgroundColor
            }}>
                {/* vlog 리영자 디자인 */}
                {/* <img src={topbanner} height="418" style={{objectFit: "cover", minWidth: 1060}} />
                <div style={{position: "absolute", zIndex: 1, top: 0, width: "100vw", minWidth: 1060, height: 418, background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))"}} /> */}
                <div style={{
                    width: 1060,
                    height: 352,
                    paddingBottom: 62,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                }}>
                    <img src={img} style={{
                        width: 400,
                        objectFit: "contain",
                    }} />
                </div>
                <div style={{
                   position: "absolute",
                   zIndex: 2,
                   top: 144,
                   width: "56vw",
                   minWidth: 1060,
                   display: "flex",
                   flexDirection: "column",
                   alignItems: "flex-start",
                }}>
                    <div style={{
                        width: 445,
                        fontWeight: "bold",
                        fontSize: 24,
                        color: "#ffffff",
                        marginBottom: 20,
                    }}>{title}</div>
                    <div style={{
                        width: 510,
                        fontSize: 36,
                        fontWeight: "bold",
                        color: "#ffffff",
                    }}>{content}</div>
                </div>
            </div>
        </>
    )
}

export function MyInfo() {
    const firestore = useFirestore()
    const firebase = useFirebase()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [leng, setLeng] = useState("")
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [wallet, setWallet] = useState("")
    const [money,setMoney]=useState(0)
    const history = useHistory()
    //유저의 코인 총량. 내 자산 및 팝업에서 원 대신에 보여주면 됨
  
    useEffect(()=>{
        console.log("here")
    })
    function getInfo() {
        if (uid) {
            console.log(uid)
            firestore.collection("User").doc(uid).get().then(doc => {
                setEmail(doc.data().email)
                setWallet(doc.data().wallet)
                setMoney(doc.data().totalMoney)
            })
        } else {
            console.log("없음")
            history.push("/login")
        }
    }
    function logout() {
        firebase.logout()
    }
    useEffect(() => {
        getInfo()
        if (wallet.length === 0) {
            setWallet("지갑을 등록해주세요")
        }
        if (leng.length === 0) {
            setLeng("0")
        }
    }, [])

    return (
        <>
            <div style={{
                position: "absolute",
                zIndex: 3,
                top: 90,
                right: 16 * vw + 10,
                width: 330,
                height: 230,
                paddingTop: 30,
                paddingLeft: 30,
                paddingRight: 20,
                paddingBottom: 20,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: "solid 2px rgba(33, 36, 38, 0.8)"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 10,
                }}>
                    <div style={{
                        fontSize: 12,
                        opacity: 0.6,
                        color: "#202426",
                    }}>내 계정</div>
                    <input onClick={logout} type="button" style={{
                        outline: 0,
                        cursor: "pointer",
                        border: 0,
                        backgroundColor: "#ffffff",
                        fontSize: 12,
                        opacity: 0.6,
                        color: "#202426",
                        textDecorationLine: "underline"
                    }} value="로그아웃" />
                </div>
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20
                }}>{email}</div>

                <div style={{
                    fontSize: 12,
                    opacity: 0.6,
                    color: "#202426",
                }}>지갑 주소</div>
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20
                }}>{wallet}</div>
                <div style={{
                    fontSize: 12,
                    opacity: 0.6,
                    color: "#202426",
                }}>지갑 잔액</div>
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20
                }}>{money}KRW</div>

                <div style={{
                    fontSize: 12,
                    opacity: 0.6,
                    color: "#202426",
                }}>보유 토큰</div>
                <div onClick={() => history.push("/asset")} style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20,
                    textDecorationLine: "underline",
                    cursor: "pointer",
                }}>
                    {leng}<div style={{ display: "inline-block", fontWeight: "normal", textDecorationLine: "underline", fontSize: 12 }}>개</div>
                </div>
            </div>
        </>
    )
}

//SplashScreen.js 요소
export function GuideBox({ navigation, icon, title, content, button, center }) {
    return (
        <>
            <div style={{
                width: 400,
                backgroundColor: "#ffffff",
                borderRadius: 30,
                paddingTop: 30,
                paddingBottom: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 20,
                marginRight: 20,
            }}>
                {icon}
                <p style={{
                    display: "inline-block",
                    fontSize: 18,
                    color: "#202426",
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 0,
                }}>{title}</p>
                <p style={{
                    display: "inline-block",
                    fontSize: 16,
                    opacity: 0.8,
                    color: "#202426",
                    height: 116,
                    lineHeight: 1.88
                }}>{content}</p>
                <button style={{
                    cursor: "pointer",
                    outline: 0,
                    display: "flex",
                    flexDirection: "row",
                    width: 200,
                    height: 48,
                    marginTop: 20,
                    backgroundColor: "#ffffff",
                    borderWidth: 2,
                    borderColor: "#202426",
                    borderRadius: 7,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <p style={{
                        textAlign: "center",
                        fontSize: 15,
                        color: "#202426",
                        lineHeight: 1.33,
                        marginRight: 5
                    }}>{button}</p>
                    <FaArrowRight color="#212426" size={15} />
                </button>
            </div>
        </>
    )
}

export function FAQ({ title, content, value, onClick }) {
    return (
        <div style={{
            display: "flex",
            width: "56vw",
            minWidth: 1060,
            height: value ? 132 : 64,
            borderRadius: 30,
            backgroundColor: "#efefef",
            paddingBottom: value ? 20 : 0,
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 20
        }}>
            <div style={{
                paddingLeft: 40,
                paddingRight: 40,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <p style={{
                    fontSize: 18,
                    color: "#o202426",
                    fontWeight: "bold"
                }}>{title}</p>
                <button onClick={onClick} style={{
                    cursor: "pointer",
                    outline: 0,
                    border: 0,
                    backgroundColor: "#efefef"
                }}><AiFillCaretDown size={24} color="#202426" /></button>
            </div>
            {value ?
                <div style={{
                    fontSize: 16,
                    lineHeight: 1.88,
                    color: "#202426",
                    textAlign: "left",
                    marginLeft: 40,
                    marginRight: 40,
                }}>{content}</div>
                :
                <></>
            }
        </div>
    )
}

//HomeMain.js와 AuctionMain.js 요소
export function CreatorInfo({ img, name, FundingNum, percent, Deadline,sort,sector,fundingAim }) {
    const history = useHistory()

    const direct = "/home/" + String(name)
    const auctiondirect = "/auction/" + String(name)
    //link 쓰려다가 화면이 이상해져서 history 로 대체. 뭔차인지는 모르겠음ㅇ
    function move() {
        history.push("/fund/" + String(name),{creatorName:String(name)})
    }
    return (
        <>
            <div onClick={move} className="creator-info">
                <img src={img} style={{
                    width: 100,
                    height: 100,
                    borderRadius:100,
                    marginTop:20
                }} />
                <div style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#161513",
                    marginTop: 20,
                    width: 195,
                }}>{name}</div>
                <div style={{
                    fontSize: 16,
                    color: "#161513",
                    marginTop: 10,
                    width: 195,
                }}><div style={{ display: "inline-block", fontWeight: "bold", fontSize: 18 }}>{fundingAim}</div> 원 펀딩</div>
                <div style={{
                    fontSize: 16,
                    color: "#202426",
                    marginTop: 10,
                    marginBottom: 10,
                    width: 195,
                    fontWeight: "bold",
                }}>{percent.toFixed(0)}% | D-{Deadline}</div>
                <ProgressBar completed={percent} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    fontSize: 12,
                    fontWeight: "normal",
                    color: "#161513",
                    width: 195,
                }}>
                    <div style={{
                        border: "1px solid #202426",
                        padding: "4px 8px",
                        borderRadius: 20,
                        marginRight: 4,
                    }}># {sector}</div>
                    <div style={{
                        border: "1px solid #202426",
                        padding: "4px 8px",
                        borderRadius: 20,
                    }}># {sort}</div>
                </div>
            </div>
        </>
    )
}

//HomeMain.js랑 Creator.js에서 많이 사용
export function CloseBeta({ img, title, content }) {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
            }}>
                <img src={img} style={{ width: 80, height: 80, marginTop: 7, marginRight: 40, objectFit: "contain" }} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                }}>
                    <div style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 10,
                        width: 390,
                    }}>{title}</div>
                    <div style={{
                        opacity: 0.8,
                        fontSize: 16,
                        color: "#202426",
                        lineHeight: 1.88,
                        letterSpacing: 0.19,
                        width: 390,
                    }}>{content}</div>
                </div>
            </div>
        </>
    )
}

export function ProgressBar({ completed }) {

    const containerStyles = {
        height: 10,
        width: 195,
        backgroundColor: "#efefef",
        borderRadius: 10,
    }

    const fillerStyles = {
        height: '100%',
        width: completed.toFixed(1) < 5 ? "5%" : `${completed}%`,
        backgroundColor: "#e78276",
        borderRadius: 'inherit',
        textAlign: "center",
        borderRadius: 10,
    }

    const labelStyles = {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                {/* <span style={labelStyles}>{`${completed.toFixed(1)}%`}</span> */}
            </div>
        </div>
    );
};


//Creator.js 요소
export function CreatorIntro({ title, content, other }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: 180
        }}>
            <div style={{
                opacity: 0.6,
                color: "#202426",
                fontSize: 18,
                height: 26,
                marginBottom: 10
            }}>{title}</div>
            {other ?
                content
                :
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                }}>{content}</div>
            }
        </div>
    )
}

export function ChannelAnalysisBox({title, content, img, growth}) {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 180,
                height: 158,
                border: "2px solid #e78276",
                borderRadius: 20,
                paddingTop: 20
            }}>
                <div style={{
                    fontSize: 18,
                    opacity: 0.6,
                    fontWeight: "normal",
                    color: "#202426",
                    marginBottom: 10,
                }}>{title}</div>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 10,
                }}>{content}</div>
                {img ?
                    growth ?
                        <img src={rocketup} style={{ width: 60, height: 60 }} />
                        :
                        <img src={rocketdown} style={{ width: 60, height: 60 }} />

                    :
                    <></>}
            </div>
        </>
    )
}

export function Information({ width, paddingTop, paddingBottom, border, title, content, unit, detail }) {
    return (
        <div style={{
            width: width,
            borderRadius: border,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            backgroundColor: "#efefef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
        }}>
            <div style={{
                opacity: 0.6,
                fontSize: 18,
                color: "#202426",
                marginBottom: 10,
            }}>{title}</div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
                marginBottom: 10,
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    marginRight: 4,
                    height: 26
                }}>{content}</div>
                <div style={{
                    fontSize: 18,
                    color: "#202426",
                    height: 26
                }}>{unit}</div>
            </div>
            <div style={{
                opacity: 0.6,
                fontSize: 16,
                color: "#212426"
            }}>{detail}</div>
        </div>
    )
}

export function Line({ width }) {
    return (
        <div style={{ width: width, height: 1, backgroundColor: "#212426", opacity: 0.2 }} />
    )
}

export function QAList({ title, content }) {
    return (
        <div style={{
            width: 840,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }}>
            <div style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#161513",
                letterSpacing: 0.22,
                marginBottom: 20
            }}>{title}</div>
            <div style={{
                fontSize: 16,
                opacity: 0.8,
                color: "#202426",
                lineHeight: 1.88,
                marginBottom: 20
            }}>{content}</div>
        </div>
    )
}

//AuctionCreator.js 사용
export function CreatorProfile({ img, name, start, predict, sell, state }) {
    return (
        <div style={{
            width: "68vw" - 40,
            height: 70,
            paddingLeft: 40,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <img src={img} alt="나중에" style={{ width: 70, height: 70, borderRadius: 35 }} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 120,
                marginLeft: 40
            }}>
                <RegularAuction>채널 이름</RegularAuction>
                <BoldAuction>{name}</BoldAuction>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 120,
                marginLeft: 20
            }}>
                <RegularAuction>시작가</RegularAuction>
                <BoldAuction>{start}</BoldAuction>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 180,
                marginLeft: 20
            }}>
                <RegularAuction>예상가</RegularAuction>
                <BoldAuction state >{predict}</BoldAuction>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 120,
                marginLeft: 20
            }}>
                <RegularAuction>판매량</RegularAuction>
                <BoldAuction>{sell}</BoldAuction>
            </div>
        </div>
    )
}

const RegularAuction = styled.div`
    font-size: 18;
    opacity: 0.6;
    color: #202426;
    text-align: left;
    margin-bottom: 10px;
`

const BoldAuction = styled.div`
    font-size: 21;
    color: #202426;
    font-weight: bold;
    text-align: left;
`

//단순히 다른곳에 붙이면 넓이가 %로 되어있어 안됨
export function BuyInput({ title, unit, value, setValue }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "94%",
            paddingLeft: "3%",
            paddingRight: "3%",
            backgroundColor: "#efefef",
            height: 50,
            alignSelf: "center",
            borderRadius: 10,
            marginTop: 20,
        }}>
            <div style={{
                fontSize: 18,
                opacity: 0.6,
                color: "#202426",
                minWidth: 40,
                marginRight: "8%"
            }}>{title}</div>
            <input
                style={{
                    width: "70%",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#202426",
                    outline: 0,
                    border: 0,
                    backgroundColor: "#efefef",
                    textAlign: "right"
                }}
                type="text" value={value} onChange={({ text }) => setValue(text)}
            />
            <div style={{
                fontSize: 18,
                opacity: 0.6,
                color: "#202426",
                minWidth: 40,
                fontWeight: "bold",
                textAlign: "right"
            }}>{unit}</div>
        </div>
    )
}

export function Calculator({ value, setValue, unit }) {
    return (
        <div style={{
            width: "74%",
            backgroundColor: "#F2F2F2",
            borderRadius: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingLeft: "13%",
            paddingRight: "13%",
            marginBottom: 10,
            height: 40,
        }}>
            <input onChange={({ text }) => setValue(text)} style={{
                width: "81%",
                height: 26,
                textAlign: "right",
                verticalAlign: "center",
                fontSize: 18,
                color: "#737576",
                backgroundColor: "#F2F2F2",
                border: 0,
                outline: 0,
            }} type="text" value={value} />
            <div style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#202426",
                marginLeft: "3%"
            }}>{unit}</div>
        </div>
    )
}

//Popup 디자인
export function PopupOne({ setVisible, setNextVisible }) {
    const [use, setUse] = useState(false)
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)
    const [invest, setInvest] = useState(false)
    const UserIcon = use ? <BsCheck color="#161513" size={16} /> : <></>
    const UseClick = () => {
        setUse(!use)
        setOne(true)
        setTwo(true)
        setThree(true)
        setFour(true)
    }
    const OneIcon = one ? <BsCheck color="#161513" size={16} /> : <></>
    const TwoIcon = two ? <BsCheck color="#161513" size={16} /> : <></>
    const ThreeIcon = three ? <BsCheck color="#161513" size={16} /> : <></>
    const FourIcon = four ? <BsCheck color="#161513" size={16} /> : <></>
    const InvestIcon = invest ? <BsCheck color="#161513" size={16} /> : <></>

    const onNext = () => {
        setVisible(false)
        setNextVisible(true)
    }

    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 1,
            }} />
            <div style={{
                zIndex: 2,
                width: 340,
                height: 376,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>이용 약관 동의</div>
                <div style={{
                    width: 287,
                    height: 48,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#efefef",
                    marginBottom: 20,
                    borderRadius: 10,
                }}>
                    <div style={{
                        fontSize: 14,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>이용약관 전체 동의</div>
                    <button onClick={UseClick} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{UserIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>개인정보 처리 약관(필수)</div>
                    <button onClick={() => setOne(!one)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{OneIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>이용약관 동의(필수)</div>
                    <button onClick={() => setTwo(!two)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{TwoIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>자산손실의 위험을 인지했습니다(필수)</div>
                    <button onClick={() => setThree(!three)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{ThreeIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>펀딩완료시 SNS, Email 알람 수신(선택)</div>
                    <button onClick={() => setFour(!four)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{FourIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 48,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#efefef",
                    marginBottom: 36,
                    borderRadius: 10,
                }}>
                    <div style={{
                        fontSize: 14,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>투자조건을 확인했습니다.</div>
                    <button onClick={() => setInvest(!invest)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{InvestIcon}</button>
                </div>
                <input onClick={one&&two&&three&&invest ? onNext : console.log("동의를 완료해주세요")} type="button" style={{
                    cursor: "pointer",
                    width: 300,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: one&&two&&three&&invest ? "#e78276" : "#d2d2d2",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                    WebkitAppearance: "none"
                }} value="다음" />
            </div>
        </div>
    )
}

function PopupReducer(state, action) {
    switch (action.type) {
        case "25":
            return 25
        case "50":
            return 50
        case "75":
            return 75
        case "max":
            return 100
        default:
            return 0
    }
}

export function PopupTwo({ setVisible, setNextVisible ,creatorName}) {

    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [money, setMoney] = useState("")
    const [amount, setAmount] = useState("")
    const [tok, setTok] = useState("")
    //유저의 코인 총량. 내 자산 및 팝업에서 원 대신에 보여주면 됨
   
    const onChange = (e) => {
        console.log(e.target)		//이벤트가 발생한 타겟의 요소를 출력
        console.log(e.target.value)	//이벤트가 발생한 타겟의 Value를 출력
        setMoney(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
    }

    useEffect(() => {
        getInfo()
        getCreatorInfo()
    }, [])
    const [number, dispatch] = useReducer(PopupReducer, 0)
    const onTwentyfive = () => {
        dispatch({ type: "25" })
        setMoney((Number(totalMoney)/4).toFixed(0))
    }
    const onFifty = () => {
        dispatch({ type: "50" })
        setMoney((Number(totalMoney)/2).toFixed(0))
    }
    const onSeventyFive = () => {
        dispatch({ type: "75" })
        setMoney((Number(totalMoney)/4*3).toFixed(0))
    }
    const onMax = () => {
        dispatch({ type: "max" })
        setMoney((Number(totalMoney)).toFixed(0))
    }
    const[warn,setWarn]=useState("")
    const onNext = () => {
        if(Number(totalMoney)<Number(money) ||Number(fundingMax)<Number(money)){
            if(Number(totalMoney)>Number(fundingMax)){
                setWarn("최대"+Number(fundingMax)+"₩")
            }else{
                setWarn("최대"+Number(totalMoney)+"₩")
            }
        }else{
            console.log("here")
            if(money==0 || money=="0"){
                alert("금액을 정확히 입력해 주세요")
            }else{
                firestoreUpload()
                setVisible(false)
                setNextVisible(true)
            }
            
        }
        
    }
    const [totalMoney,setTotalMoney]=useState(0)
    const [wallet,setWallet]=useState("")
    const [email,setEmail]=useState("")
    
    function getInfo(){
        firestore.collection("User").doc(uid).get().then(doc=>{
            setTotalMoney(doc.data().totalMoney)
            setWallet(doc.data().wallet)
            setEmail(doc.data().email)
        })
        
    }
    const [fundingMax,setFundingMax]=useState(0)
    const [fundingTotal,setFundingTotal]=useState(0)
    const [symbol,setSymbol]=useState("")
    function getCreatorInfo() {
        firestore.collection("Creator").doc(creatorName).onSnapshot(doc => {
            setFundingMax(doc.data().FundingAim-doc.data().FundingTotal)
            setFundingTotal(doc.data().FundingTotal)
            setSymbol(doc.data().symbol)
        })
    }

    async function firestoreUpload() {
        const realMoney=Number(money)
        const today = new Date()
        const year = today.getFullYear();
        const month = today.getMonth() + 1
        const day = today.getDate()
        const hours= today.getHours()
        const minutes=today.getMinutes()
        const seconds=today.getSeconds()
        const docName=String(year + "-" + month + "-" + day+"-"+hours+":"+minutes+":"+seconds)
        firestore.collection("User").doc(uid).collection("Fund").doc(docName).set({
            DayTime: docName,
            Money: realMoney,
            ongoing: 0,
            channel: creatorName,
            fullTime:today.getTime(),
            total:0,
            monthly:0,
            month:0,
            symbol:symbol
        })
        firestore.collection("User").doc(uid).update({
            totalMoney:Number(totalMoney)-realMoney
        })
        await firestore.collection("Creator").doc(creatorName).update({
            FundingTotal: Number(fundingTotal)+realMoney
        })
        await firestore.collection("Creator").doc(creatorName).collection("Investor").doc(wallet).set({
            wallet:wallet,
            money:realMoney,
            email:email,
            DayTime:docName,
            fullTime:today.getTime(),
            uid:uid
        })
        await firestore.collection("Creator").doc(creatorName).collection("NFT").doc(wallet).set({
            wallet:wallet,
            email:email,
            uid:uid,
            dayTime:docName,
        })
    }
    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 1,
            }} />
            <div style={{
                zIndex: 2,
                width: 340,
                height: 250,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 40,
                }}>펀딩 금액 입력</div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 28,
                    maxWidth: 240,
                }}>
                    <input type="text" style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        maxWidth: 200,
                        marginRight: 4,
                        outline: 0,
                        border: 0,
                        textAlign: "right"
                    }} value={money} onChange={onChange} />
                    <div style={{
                        fontSize: 18,
                        fontWeight: "normal",
                        color: "#202426"
                    }}>원</div>
                </div>
                <div style={{
                    width: 240,
                    border: "1px solid #202426",
                    marginBottom: 10,
                    marginTop: 10
                }} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: 242,
                    marginBottom: 10
                }}>
                    <input onClick={onTwentyfive} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 25 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 25 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 25 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                    }} value="25%" />
                    <input onClick={onFifty} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 50 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 50 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 50 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="50%" />
                    <input onClick={onSeventyFive} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 75 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 75 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 75 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="75%" />
                    <input onClick={onMax} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 100 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 100 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 100 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="MAX" />
                </div>
                <div style={{
                    fontSize: 16,
                    opacity: 0.8,
                    color: "#e61800",
                    width: 222,
                    textAlign: "right",
                    marginBottom: 20,
                }}>{warn}</div>

                <input className="safari-design" onClick={money.length > 0 ? onNext : console.log("입력해주세요")} type="button" style={{
                    cursor: "pointer",
                    width: 300,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: money.length > 0 ? "#e78276" : "#d2d2d2",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                    WebkitAppearance: "none"
                }} value="펀딩하기" />
            </div>
        </div>
    )
}

export function PopupThree({ setVisible }) {
    
    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 1,
            }} />
            <div style={{
                zIndex: 2,
                width: 340,
                height: 300,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 40,
                }}>펀딩 완료</div>
                <BiCheckCircle color="#202426" size={120} style={{ width: 120, height: 120, marginBottom: 40 }} />
                <div style={{
                    fontSize: 14,
                    
                    color: "#161513",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>내 자산에서 투자내역을 확인하실 수 있습니다</div>
                <div style={{
                    fontSize: 12,
                    color: "#202426",
                    lineHeight: 1.33,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{ textAlign: "center", marginBottom: 10 }}></div>
                  
                </div>
                <input className="safari-design" onClick={() => setVisible(false)} type="button" style={{
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
                    WebkitAppearance: "none"
                }} value="완료" />
            </div>
        </div>
    )
}

//기타 디자인 요소
export function BottomTag() {
    return (
        <>
            <div style={{
                width: "100vw",
                minWidth: 1060,
                backgroundColor: "#ffffff",
                paddingTop: 20,
                paddingBottom: 40,
                borderTop: "1px solid #D2D3D3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{
                    fontSize: 74,
                    fontWeight: "bold",
                    color: "#202426",
                    letterSpacing: 0.89,
                    marginBottom: 20,
                }}>Y<div style={{display: "inline-block", color: "#da877a"}}>.</div></div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 40,
                }}>
                    <input type="button" style={{
                        fontSize: 18,
                        color: "#202426",
                        cursor: "pointer",
                        outline: 0,
                        backgroundColor: "#ffffff",
                        border: 0,
                        marginRight: 40,
                    }} value="About" />
                    <input type="button" style={{
                        fontSize: 18,
                        color: "#202426",
                        cursor: "pointer",
                        outline: 0,
                        backgroundColor: "#ffffff",
                        border: 0,
                        marginRight: 40,
                    }} value="Contact" />
                    <input type="button" style={{
                        fontSize: 18,
                        color: "#202426",
                        cursor: "pointer",
                        outline: 0,
                        backgroundColor: "#ffffff",
                        border: 0,
                        marginRight: 40,
                    }} value="Privacy Policy" />
                    <input type="button" style={{
                        fontSize: 18,
                        color: "#202426",
                        cursor: "pointer",
                        outline: 0,
                        backgroundColor: "#ffffff",
                        border: 0,
                        marginRight: 40,
                    }} value="Terms of Service" />
                    <input type="button" style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        cursor: "pointer",
                        outline: 0,
                        backgroundColor: "#ffffff",
                        border: 0,
                    }} value="Risk Disclosure" />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <img style={{width: 48, height: 48, marginRight: 40}} src={kakaotalk} />
                    <AiFillTwitterCircle style={{width: 54, height: 54, marginRight: 40}} color="#202426" />
                    <FaFacebook style={{width: 48, height: 48}} color="#202426" />
                </div>
            </div>
            <div style={{
                width: "100vw",
                minWidth: 1060,
                backgroundColor: "#202426",
                paddingTop: 20,
                paddingBottom: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                }}>
                    <div style={{ fontSize: 14, color: "#ffffff", marginRight: 20 }}>주식회사 조랑말즈</div>
                    <div style={{ fontSize: 14, color: "#ffffff", marginRight: 20 }}>대표자 : 김현명</div>
                    <div style={{ fontSize: 14, color: "#ffffff", marginRight: 20 }}>서울특별시 종로구 창경궁로 1길 35-38 킹고스타트업 스페이스 306호</div>
                    <div style={{ fontSize: 14, color: "#ffffff" }}>사업자 등록번호 : 20310-2300-12302</div>
                </div>
                <div style={{ fontSize: 14, color: "#ffffff", opacity: 0.9, fontWeight: "bold" }}>© Jorangmals Co., Ltd.</div>
            </div>
        </>
    )
}

export function HashTag({content}) {
    return (
        <div style={{
            border: "1px solid #939596",
            borderRadius: 20,
            opacity: 0.8,
            fontSize: 12,
            color: "#161513",
            padding: "4px 8px",
            marginLeft: 4,
        }}># {content}</div>
    )
}

export function Graph({data}) {
    return (
        <div style={{
            width: "100%",
            height: 273,
            marginBottom: 40,
        }}>
            <VictoryChart
                style={{
                    parent: {
                        border: "2px solid #202426",
                        borderRadius: 20,
                    }
                }}
                width={1060}
                height={273}
                containerComponent={<VictoryVoronoiContainer />}
            >
                <VictoryAxis scale="time"
                    style={{
                        axis: {
                            stroke: "#202426",
                            strokeOpacity: 0.4,
                        },
                        tickLabels: {
                            fontSize: 14,
                            fill: "#202426",
                            fillOpacity: 0.4,
                            fontWeight: "bold"
                        }
                    }}
                    tickFormat={
                        (x) => {
                            const date = new Date(x)
                            if (date.getMonth() === 1) {
                                return "Jan"
                            } else if (date.getMonth() === 2) {
                                return null
                            } else if (date.getMonth() === 3) {
                                return "Mar"
                            } else if (date.getMonth() === 4) {
                                return null
                            } else if (date.getMonth() === 5) {
                                return "May"
                            } else if (date.getMonth() === 6) {
                                return null
                            } else if (date.getMonth() === 7) {
                                return "Jul"
                            } else if (date.getMonth() === 8) {
                                return null
                            } else if (date.getMonth() === 9) {
                                return "Sep"
                            } else if (date.getMonth() === 10) {
                                return null
                            } else if (date.getMonth() === 11) {
                                return "Nov"
                            } else if (date.getMonth() === 12) {
                                return null
                            }
                        }
                    }
                />
                <VictoryAxis dependentAxis={true} style={{
                    axis: {
                        stroke: "#202426",
                        strokeOpacity: 0.4,
                    },
                    tickLabels: {
                        fontSize: 10,
                        fill: "#202426",
                        fillOpacity: 0.4,
                        fontWeight: "bold"
                    }
                }} />
                <VictoryLine style={{
                    data: {
                        stroke: "#e78276",
                        strokeWidth: 3,
                    },
                }} data={data} />
                <VictoryScatter
                    style={{ data: { fill: "#e78276" } }}
                    size={5}
                    data={data}
                    labels={({ datum }) =>
                        `${datum.x} \n 크리에이터 누적 조회수 ${datum.y}`}
                    labelComponent={
                        <VictoryTooltip constrainToVisibleArea
                            flyoutStyle={{ stroke: "#202426", strokeWidth: 2, fill: "#ffffff" }}
                            flyoutWidth={200}
                        />
                    }
                />
            </VictoryChart>
        </div>
    )
}

export function AssetGraph({data}) {
    return (
        <div style={{
            width: 566,
            height: 212,
        }}>
            <VictoryChart
                width={566}
                height={212}
                padding={{ top: 20, bottom: 30, right: 30, left: 50}}
                containerComponent={<VictoryVoronoiContainer />}
            >
                <VictoryAxis scale="time"
                    gridComponent={
                        <VictoryBrushLine 
                            width={35}
                            allowDrag={false}
                            allowDraw={false}
                            handleStyle={{
                                pointerEvents: "none",
                            }}
                            brushAreaStyle={{
                                fill: "#E78276"
                            }}
                            brushStyle={{
                                fill: "linear-gradient(#F2BFB9, #9198e5);"
                            }}
                        />
                    }
                    style={{
                        axis: {
                            stroke: "#202426",
                            strokeOpacity: 0.4,
                            strokeWidth: 0
                        },
                        tickLabels: {
                            fontSize: 14,
                            fill: "#202426",
                            fillOpacity: 0.4,
                            fontWeight: "bold"
                        }
                    }}
                    tickFormat={
                        (x) => {
                            const date = new Date(x)
                            if (date.getMonth() === 1) {
                                return "Jan"
                            } else if (date.getMonth() === 2) {
                                return "Feb"
                            } else if (date.getMonth() === 3) {
                                return "Mar"
                            } else if (date.getMonth() === 4) {
                                return "Apr"
                            } else if (date.getMonth() === 5) {
                                return "May"
                            } else if (date.getMonth() === 6) {
                                return "Jun"
                            } else if (date.getMonth() === 7) {
                                return "Jul"
                            } else if (date.getMonth() === 8) {
                                return "Aug"
                            } else if (date.getMonth() === 9) {
                                return "Sep"
                            } else if (date.getMonth() === 10) {
                                return "Oct"
                            } else if (date.getMonth() === 11) {
                                return "Nov"
                            } else if (date.getMonth() === 12) {
                                return "Dec"
                            }
                        }
                    }
                />
                <VictoryAxis dependentAxis={true}
                    offsetX={30}
                    style={{
                        axis: {
                            stroke: "#202426",
                            strokeOpacity: 0.4,
                            strokeWidth: 0
                        },
                        tickLabels: {
                            fontSize: 14,
                            fill: "#202426",
                            fillOpacity: 0.4,
                            fontWeight: "bold"
                        }
                    }} 
                />
                <VictoryLine style={{
                    data: {
                        stroke: "#e78276",
                        strokeWidth: 3,
                    },
                }} data={data} />
                <VictoryScatter
                    style={{ data: { fill: "#e78276" } }}
                    size={5}
                    data={data}
                    labels={({ datum }) =>
                        `${datum.x} 원`}
                    labelComponent={
                        <VictoryTooltip constrainToVisibleArea
                            flyoutStyle={{ stroke: "#202426", strokeWidth: 2, fill: "#ffffff" }}
                            flyoutWidth={200}
                        />
                    }
                />
            </VictoryChart>
        </div>
    )
}

export function AssetPie({ data }) {
    return (
        <VictoryPie
            events={[{
                target: "data",
                eventHandlers: {
                    onMouseOver: () => {
                        return [
                            {
                                target: "labels",
                                mutation: ({ text, datum }) => {
                                    return text === `${datum.x}` ? { text: `${datum.y}%` } : { text: `${datum.x}` }
                                }
                            }
                        ];
                    },
                    onMouseOut: () => {
                        return [
                            {
                                target: "labels",
                                mutation: ({text, datum}) => {
                                    return {text: `${datum.y}%`}
                                }
                            },
                        ];
                    }
                }
            }]}
            padding={{ top: 0, left: 20, right: 20, }}
            width={350}
            height={350}
            data={data}
            labels={({ datum }) => `${datum.y}%`}
            labelPosition="centroid"
            labelRadius={({ innerRadius }) => innerRadius + 100}
            style={{
                labels: {
                    fill: "#ffffff",
                    fontSize: 14,
                    fontWeight: "bold",
                }
            }}
        />
    )
}

export function Login({ setVisible }) {
    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 4,
            }} />
            <div style={{
                zIndex: 5,
                width: 240,
                height: 150,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 40,
                }}>로그인</div>
                <div style={{
                    fontSize: 14,
                    color: "#161513",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>아이디, 비밀번호 정보가 일치하지 않습니다</div>
                <input className="safari-design" onClick={() => setVisible(false)} type="button" style={{
                    cursor: "pointer",
                    width: 240,
                    height: 40,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#e78276",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                }} value="확인" />
            </div>
        </div>
    )
}