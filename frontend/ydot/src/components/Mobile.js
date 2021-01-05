import React, { useState, useEffect, useReducer } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip, VictoryBrushLine, VictoryPie } from "victory"
import HSBar from "react-horizontal-stacked-bar-chart";

//css
import "./component.css"

//icon
import { IoIosCalculator } from 'react-icons/io'
import { FaUserCircle, FaArrowRight, FaArrowDown, FaFacebook } from 'react-icons/fa';
import { AiFillCaretDown, AiFillTwitterCircle } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs'
import { FiArrowRightCircle } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi'
import { useFirebase, useFirestore } from "react-redux-firebase"



//Style.js에서 가져옴
import { ProgressBar } from "./Style"

//이미지
import kakaotalk from "./icon/kakaotalk.png"
import rocketup from "./icon/rocketup.png"
import rocketdown from "./icon/rocketdown.png"

export default function MLoginHeader() {
    return (
        <header style={{
            zIndex: 3,
            width: "90vw",
            minWidth: 300,
            height: 80,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            alignSelf: "center",
        }}>
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
                        fontSize: 35,
                        fontWeight: "bold",
                        color: "#202426",
                        textDecorationLine: "none",
                    }}>Y<div style={{
                        display: "inline-block",
                        color: "#da877a"
                    }}>.</div></Link>
                </div>
                <button style={{
                    backgroundColor: "#ffffff",
                    border: 0,
                    outline: 0,
                    cursor: "pointer"
                }}><FaUserCircle color="#202426" size={35} /></button>
            </div>
        </header>
    )
}

export function MHeader({ bold }) {
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
            width: "90vw",
            minWidth: 300,
            height: 80,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {mine ? 
                <MMyInfo />
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
                        fontSize: 35,
                        fontWeight: "bold",
                        color: "#202426",
                        marginRight: 20,
                        textDecorationLine: "none",
                    }}>Y<div style={{
                        display: "inline-block",
                        color: "#da877a"
                    }}>.</div></Link>
                    <>
                        <Link to={"/"} style={{
                            fontSize: 16,
                            color: "#202426",
                            fontWeight: bold === "Home" ? "bold" : "normal",
                            marginRight: 10,
                            textDecorationLine: "none",
                        }}>Home</Link>
                        <Link to={'/fund'} style={{
                            fontSize: 16,
                            color: "#202426",
                            fontWeight: bold === "Fund" ? "bold" : "normal",
                            marginRight: 10,
                            textDecorationLine: "none",
                        }}>펀딩하기</Link>
                        <div onClick={getInfo} style={{
                            cursor:"pointer",
                            fontSize: 16,
                            color: "#202426",
                            fontWeight: bold === "Asset" ? "bold" : "normal",
                            textDecorationLine: "none",
                        }}>내 자산</div>
                    </>
                </div>
                <button onClick={() => setMine(!mine)} style={{
                    backgroundColor: "#ffffff",
                    border: 0,
                    outline: 0,
                    cursor: "pointer"
                }}><FaUserCircle color="#202426" size={35} /></button>
            </div>
        </header>
    )
}

export function MMyInfo() {
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
                top: 60,
                right: "3vw",
                width: 280,
                height: 150,
                paddingTop: 10,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
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
                        fontSize: 8,
                        opacity: 0.6,
                        color: "#202426",
                    }}>내 계정</div>
                    <input onClick={logout} type="button" style={{
                        outline: 0,
                        cursor: "pointer",
                        border: 0,
                        backgroundColor: "#ffffff",
                        fontSize: 8,
                        opacity: 0.6,
                        color: "#202426",
                        textDecorationLine: "underline"
                    }} value="로그아웃" />
                </div>
                <div style={{
                    fontSize: 8,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 10
                }}>{email}</div>

                <div style={{
                    fontSize: 8,
                    opacity: 0.6,
                    color: "#202426",
                }}>지갑 주소</div>
                <div style={{
                    fontSize: 6,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 10,
                    width: 250,
                }}>{wallet}</div>
                <div style={{
                    fontSize: 8,
                    opacity: 0.6,
                    color: "#202426",
                }}>지갑 잔액</div>
                <div style={{
                    fontSize: 8,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 10
                }}>{money}KRW</div>

                <div style={{
                    fontSize: 8,
                    opacity: 0.6,
                    color: "#202426",
                }}>보유 토큰</div>
                <div onClick={() => history.push("/asset")} style={{
                    fontSize: 8,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 10,
                    textDecorationLine: "underline",
                    cursor: "pointer",
                }}>
                    {leng}<div style={{ display: "inline-block", fontWeight: "normal", textDecorationLine: "underline", fontSize: 8 }}>개</div>
                </div>
            </div>
        </>
    )
}

export function MTopBanner({img, title, content, backgroundColor}) {
    return (
        <>
            <div style={{
                width: "100vw",
                minWidth: 300,
                height: 250,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                backgroundColor: backgroundColor
            }}>
                {/* <img src={topbanner} height="250" style={{ objectFit: "cover", minWidth: 300 }} />
                <div style={{ position: "absolute", zIndex: 1, top: 0, width: "100vw", minWidth: 300, height: 250, background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))" }} /> */}
                <div style={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    width: "95vw",
                    height: 230,
                    paddingBottom: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                }}>
                    <img src={img} style={{
                        height: 180,
                        objectFit: "contain",
                    }} />
                </div>
                <div style={{
                    position: "absolute",
                    zIndex: 2,
                    bottom: 20,
                    left: 15,
                    width: "100vw",
                    minWidth: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    <div style={{
                        fontSize: 14,
                        color: "#ffffff",
                        marginBottom: 10,
                        maxWidth: 200,
                    }}>{title}</div>
                    <div style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#ffffff",
                        marginBottom: 10,
                        width: "60vw",
                    }}>{content}</div>
                </div>
            </div>
        </>
    )
}


//HomeMain.js와 AuctionMain.js 요소
export function MCreatorInfo({ img, name, FundingNum, percent, Deadline,sort,sector,fundingAim }) {
    const history = useHistory()

    function move() {
        history.push("/fund/" + String(name),{creatorName:String(name)})
    }
    return (
        <>
            <div onClick={move} style={{
                width: 150,
                height: 200,
                borderRadius: 10,
                border: "1px solid #D2D3D3",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
            }}>
                <img src={img} style={{
                    width: 150,
                    height: 80,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    objectFit: "cover"
                }} />
                <div style={{
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "#161513",
                    marginTop: 10,
                    width: 120,
                }}>{name}</div>
                <div style={{
                    fontSize: 10,
                    color: "#161513",
                    marginTop: 7,
                    width: 120,
                }}><div style={{ display: "inline-block", fontWeight: "bold", fontSize: 12 }}>{fundingAim}</div> 원 펀딩 완료</div>
                <div style={{
                    fontSize: 10,
                    color: "#202426",
                    marginTop: 7,
                    marginBottom: 7,
                    width: 120,
                    fontWeight: "bold",
                }}>{percent.toFixed(0)}% | D-{Deadline}</div>
                <MProgressBar completed={percent} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 7,
                    fontSize: 8,
                    fontWeight: "normal",
                    color: "#161513",
                    width: 130,
                }}>
                    <div style={{
                        border: "1px solid #202426",
                        padding: "1.5px 3px",
                        fontSize: 8,
                        borderRadius: 20,
                        marginRight: 4,
                    }}># {sector}</div>
                    <div style={{
                        fontSize: 8,
                        border: "1px solid #202426",
                        padding: "1.5px 3px",
                        borderRadius: 20,
                    }}># {sort}</div>
                </div>
            </div>
        </>
    )
}

export function MProgressBar({ completed }) {

    const containerStyles = {
        height: 10,
        width: 120,
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
        fontSize: 10,
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

//HomeMain.js랑 Creator.js에서 많이 사용
export function MFunding({ img, title, content }) {
    return (
        <>
            <div style={{
                width: "90vw",
                minWidth: 300,
                display: 'flex',
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 40,
            }}>
                <img src={img} style={{ width: 80, height: 80, objectFit: "contain" }} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                }}>
                    <div style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 5,
                        width: "60vw",
                        minWidth: 200
                    }}>{title}</div>
                    <div style={{
                        opacity: 0.8,
                        fontSize: 12,
                        color: "#202426",
                        lineHeight: 1.88,
                        letterSpacing: 0.19,
                        width: "60vw",
                        minWidth: 200
                    }}>{content}</div>
                </div>
            </div>
        </>
    )
}

export function MCloseBeta({ img, title, content }) {
    return (
        <>
            <div style={{
                width: "90vw",
                minWidth: 300,
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 40,
            }}>
                <img src={img} style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 20, }} />
                <div style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 5,
                    width: "90vw",
                    minWidth: 300
                }}>{title}</div>
                <div style={{
                    opacity: 0.8,
                    fontSize: 14,
                    color: "#202426",
                    lineHeight: 1.88,
                    letterSpacing: 0.19,
                    width: "90vw",
                    minWidth: 300
                }}>{content}</div>
            </div>
        </>
    )
}

export function MFAQ({ title, content, value, onClick }) {
    return (
        <div style={{
            display: "flex",
            width: "90vw",
            minWidth: 300,
            borderRadius: 20,
            backgroundColor: "#efefef",
            paddingBottom: value ? 20 : 0,
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 20
        }}>
            <div style={{
                paddingLeft: 20,
                paddingRight: 20,
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
                    marginLeft: 20,
                    marginRight: 20,
                }}>{content}</div>
                :
                <></>
            }
        </div>
    )
}

export function MBottomTag() {
    return (
        <>
            <div style={{
                width: "100vw",
                minWidth: 300,
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
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 40,
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <input type="button" style={{
                            fontSize: 18,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                        }} value="About" />
                        <input type="button" style={{
                            fontSize: 18,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                        }} value="Contact" />
                        <input type="button" style={{
                            fontSize: 18,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                        }} value="Privacy Policy" />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10
                    }}>
                        <input type="button" style={{
                            fontSize: 18,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
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
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <img style={{width: 48, height: 48, marginRight: 40}} src={kakaotalk} />
                    <AiFillTwitterCircle style={{ width: 54, height: 54, marginRight: 40 }} color="#202426" />
                    <FaFacebook style={{ width: 48, height: 48 }} color="#202426" />
                </div>
            </div>
            <div style={{
                width: "100vw",
                minWidth: 300,
                backgroundColor: "#202426",
                paddingTop: 20,
                paddingBottom: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 14, color: "#ffffff", marginBottom: 10 }}>주식회사 조랑말즈</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 14, color: "#ffffff", marginBottom: 10 }}>대표자 : 김현명</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 14, color: "#ffffff", marginBottom: 10 }}>서울특별시 종로구 창경궁로 1길 35-38 킹고스타트업 스페이스 306호</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 14, color: "#ffffff", marginBottom: 10 }}>사업자 등록번호 : 20310-2300-12302</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 14, color: "#ffffff", opacity: 0.9, fontWeight: "bold" }}>© Jorangmals Co., Ltd.</div>
            </div>
        </>
    )
}

export function MHashTag({content}) {
    return (
        <div style={{
            border: "1px solid #939596",
            borderRadius: 10,
            opacity: 0.8,
            fontSize: 10,
            color: "#161513",
            padding: "2px 4px",
            marginLeft: 2,
        }}># {content}</div>
    )
}

export function MQAList({ title, content }) {
    return (
        <div style={{
            width: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }}>
            <div style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#161513",
                letterSpacing: 0.22,
                marginBottom: 20
            }}>{title}</div>
            <div style={{
                fontSize: 14,
                opacity: 0.8,
                color: "#202426",
                lineHeight: 1.88,
                marginBottom: 20
            }}>{content}</div>
        </div>
    )
}

export function MChannelAnalysisBox({title, content, img, growth}) {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "28vw",
                minWidth: 85,
                minHeight: 85,
                height: "28vw",
                border: "2px solid #e78276",
                borderRadius: 20,
                paddingTop: 10
            }}>
                <div style={{
                    width: 70,
                    fontSize: 10,
                    opacity: 0.6,
                    fontWeight: "normal",
                    color: "#202426",
                    marginBottom: 5,
                    textAlign: "center"
                }}>{title}</div>
                <div style={{
                    width: 80,
                    fontSize: 13,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 5,
                    textAlign: "center"
                }}>{content}</div>
                {img ?
                    growth ?
                        <img src={rocketup} style={{ width: 25, height: 25 }} />
                        :
                        <img src={rocketdown} style={{ width: 25, height: 25 }} />

                    :
                    <></>}
            </div>
        </>
    )
}

export function MChannelAnalysisBoxTwo({title, content, img, growth}) {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "43vw",
                minWidth: 140,
                minHeight: 85,
                height: "28vw",
                border: "2px solid #e78276",
                borderRadius: 20,
                paddingTop: 10
            }}>
                <div style={{
                    width: 100,
                    fontSize: 10,
                    opacity: 0.6,
                    fontWeight: "normal",
                    color: "#202426",
                    marginBottom: 5,
                    textAlign: "center"
                }}>{title}</div>
                <div style={{
                    width: 140,
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 5,
                    textAlign: "center"
                }}>{content}</div>
                {img ?
                    growth ?
                        <img src={rocketup} style={{ width: 25, height: 25 }} />
                        :
                        <img src={rocketdown} style={{ width: 25, height: 25 }} />

                    :
                    <></>}
            </div>
        </>
    )
}

export function MCreatorIntro({ title, content, other }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: 100
        }}>
            <div style={{
                opacity: 0.6,
                color: "#202426",
                fontSize: 10,
                marginBottom: 5
            }}>{title}</div>
            {other ?
                content
                :
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                }}>{content}</div>
            }
        </div>
    )
}

//Popup 디자인
export function MPopupOne({ setVisible, setNextVisible }) {
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
                width: 270,
                height: 340,
                paddingTop: 20,
                paddingBottom: 20,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>이용 약관 동의</div>
                <div style={{
                    width: 250,
                    height: 48,
                    paddingLeft: 10,
                    paddingRight: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#efefef",
                    marginBottom: 20,
                    borderRadius: 10,
                }}>
                    <div style={{
                        fontSize: 12,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>이용약관 전체 동의</div>
                    <button onClick={UseClick} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 14,
                        height: 14,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{UserIcon}</button>
                </div>
                <div style={{
                    width: 250,
                    height: 20,
                    paddingLeft: 10,
                    paddingRight: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 12,
                        color: "#161513",
                    }}>개인정보 처리 약관(필수)</div>
                    <div onClick={() => setOne(!one)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 14,
                        height: 14,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{OneIcon}</div>
                </div>
                <div style={{
                    width: 250,
                    height: 20,
                    paddingLeft: 10,
                    paddingRight: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 12,
                        color: "#161513",
                    }}>이용약관 동의(필수)</div>
                    <div onClick={() => setTwo(!two)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 14,
                        height: 14,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{TwoIcon}</div>
                </div>
                <div style={{
                    width: 250,
                    height: 20,
                    paddingLeft: 10,
                    paddingRight: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 12,
                        color: "#161513",
                    }}>자산손실의 위험을 인지했습니다(필수)</div>
                    <div onClick={() => setThree(!three)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 14,
                        height: 14,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{ThreeIcon}</div>
                </div>
                <div style={{
                    width: 250,
                    height: 20,
                    paddingLeft: 10,
                    paddingRight: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 12,
                        color: "#161513",
                    }}>펀딩완료시 SNS, Email 알람 수신(선택)</div>
                    <div onClick={() => setFour(!four)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 14,
                        height: 14,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{FourIcon}</div>
                </div>
                <div style={{
                    width: 250,
                    height: 48,
                    paddingLeft: 10,
                    paddingRight: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#efefef",
                    borderRadius: 10,
                    marginBottom: 10,
                }}>
                    <div style={{
                        fontSize: 12,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>투자조건을 확인했습니다.</div>
                    <div onClick={() => setInvest(!invest)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 14,
                        height: 14,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{InvestIcon}</div>
                </div>
                <input onClick={one&&two&&three&&invest ? onNext : console.log("동의해주세요")} type="button" style={{
                    cursor: "pointer",
                    width: 270,
                    height: 40,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: one&&two&&three&&invest ? "#e78276" : "#d2d2d2",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                    WebkitAppearance: "none"
                }} value="다음" />
            </div>
        </div>
    )
}

function MPopupReducer(state, action) {
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

export function MPopupTwo({ setVisible, setNextVisible ,creatorName}) {
    const [money, setMoney] = useState("")
    const [number, dispatch] = useReducer(MPopupReducer, 0)
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const onTwentyfive = () => {
        dispatch({ type: "25" })
        setMoney((totalMoney/4).toFixed(0))
    }
    const onFifty = () => {
        dispatch({ type: "50" })
        setMoney((totalMoney/2).toFixed(0))
    }
    const onSeventyFive = () => {
        dispatch({ type: "75" })
        setMoney((totalMoney/4*3).toFixed(0))
    }
    const onMax = () => {
        dispatch({ type: "max" })
        setMoney((totalMoney).toFixed(0))
    }

    useEffect(() => {
        getInfo()
        getCreatorInfo()
    }, [])
    const onChange = (e) => {
        console.log(e.target)		//이벤트가 발생한 타겟의 요소를 출력
        console.log(e.target.value)	//이벤트가 발생한 타겟의 Value를 출력
        setMoney(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
    }
    const[warn,setWarn]=useState("")
    const onNext = () => {
        if(totalMoney<money ||fundingMax<money){
            if(totalMoney>fundingMax){
                setWarn("최대 "+fundingMax+" ₩")
            }else{
                setWarn("최대 "+totalMoney+" ₩")
            }
        }else{
            firestoreUpload()
            setVisible(false)
            setNextVisible(true)
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
            Money: Number(money),
            ongoing: 0,
            channel: creatorName,
            fullTime:today.getTime(),
            total:0,
            monthly:0,
            month:0,
            symbol:symbol
        })
        firestore.collection("User").doc(uid).update({
            totalMoney:Number(totalMoney)-Number(money)
        })
        await firestore.collection("Creator").doc(creatorName).update({
            FundingTotal: Number(fundingTotal)+Number(money)
        })
        await firestore.collection("Creator").doc(creatorName).collection("Investor").doc(wallet).set({
            wallet:wallet,
            money:Number(money),
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
                width: 270,
                height: 200,
                paddingTop: 20,
                paddingBottom: 20,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
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
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        maxWidth: 200,
                        marginRight: 4,
                        outline: 0,
                        border: 0,
                        textAlign: "right"
                    }}value={money} onChange={onChange} />
                    <div style={{
                        fontSize: 16,
                        fontWeight: "normal",
                        color: "#202426"
                    }}>원</div>
                </div>
                <div style={{
                    width: 240,
                    border: "1px solid #202426",
                    marginBottom: 5,
                    marginTop: 5
                }} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: 242,
                    marginBottom: 5
                }}>
                    <input onClick={onTwentyfive} type="button" style={{
                        width: 40,
                        height: 26,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 12,
                        color: number === 25 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 25 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 25 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                    }} value="25%" />
                    <input onClick={onFifty} type="button" style={{
                        width: 40,
                        height: 26,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 12,
                        color: number === 50 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 50 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 50 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="50%" />
                    <input onClick={onSeventyFive} type="button" style={{
                        width: 40,
                        height: 26,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 12,
                        color: number === 75 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 75 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 75 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="75%" />
                    <input onClick={onMax} type="button" style={{
                        width: 40,
                        height: 26,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 12,
                        color: number === 100 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 100 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 100 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="MAX" />
                </div>
                <div style={{
                    fontSize: 14,
                    opacity: 0.8,
                    color: "#e61800",
                    marginTop: 10,
                    width: "90%",
                    textAlign: "right",
                    marginBottom: 20,
                }}>{warn}</div>
                <input onClick={money.length > 0 ? onNext : console.log("입력해주세요")} type="button" style={{
                    cursor: "pointer",
                    width: 270,
                    height: 40,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: money.length > 0 ? "#e78276" : "#d2d2d2",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                    WebkitAppearance: "none"
                }} value="펀딩하기" />
            </div>
        </div>
    )
}

export function MPopupThree({ setVisible }) {
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
                width: 270,
                height: 270,
                paddingTop: 20,
                paddingBottom: 20,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>펀딩 완료</div>
                <BiCheckCircle color="#202426" size={120} style={{ width: 120, height: 120, marginBottom: 40 }} />
                <div style={{
                    fontSize: 12,
                    
                    color: "#161513",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 10,
                }}>내 자산에서 투자내역을 확인하실 수 있습니다</div>
                <div style={{
                    fontSize: 10,
                    color: "#202426",
                    lineHeight: 1.33,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    
                </div>
                <input onClick={() => setVisible(false)} type="button" style={{
                    cursor: "pointer",
                    width: 270,
                    height: 40,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#e78276",
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                    WebkitAppearance: "none"
                }} value="완료" />
            </div>
        </div>
    )
}

export function MGraph({data}) {
    return (
        <div style={{
            width: "100%",
            height: 180,
            marginBottom: 40,
        }}>
            <VictoryChart
                style={{
                    parent: {
                        border: "1px solid #202426",
                        borderRadius: 10,
                    }
                }}
                padding={{top: 10, left: 30, right: 20, bottom: 30,}}
                height={180}
                containerComponent={<VictoryVoronoiContainer />}
            >
                <VictoryAxis scale="time"
                    style={{
                        axis: {
                            stroke: "#202426",
                            strokeOpacity: 0.4,
                        },
                        tickLabels: {
                            fontSize: 8,
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
                    size={3}
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

export function MAssetGraph({data}) {
    return (
        <div style={{
            width: "100%",
            height: 200,
        }}>
            <VictoryChart
                height={200}
                padding={{ top: 0, bottom: 30, right: 30, left: 30}}
                containerComponent={<VictoryVoronoiContainer />}
            >
                <VictoryAxis scale="time"
                    gridComponent={
                        <VictoryBrushLine 
                            width={20}
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
                            fontSize: 10,
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
                            fontSize: 10,
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

export function MAssetPie({ data }) {
    return (
        <div style={{
            width: 200,
            height: 200,
            alignSelf: "center",
        }}>
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
                                    mutation: ({ text, datum }) => {
                                        return { text: `${datum.y}%` }
                                    }
                                },
                            ];
                        }
                    }
                }]}
                width={200}
                height={200}
                padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
                data={data}
                labels={({ datum }) => `${datum.y}%`}
                labelPosition="centroid"
                labelRadius={({ innerRadius }) => innerRadius + 70}
                style={{
                    labels: {
                        fill: "#ffffff",
                        fontSize: 10,
                        fontWeight: "bold",
                    }
                }}
            />
        </div>
    )
}


export function MInvestDashboard({ rank, name, total, accumulate }) {
    const [detail, setDetail] = useState(false)
    const data = [
        {
            name: "iu",
            value: 80,
            color: "#205072"
        },
        {
            name: "Paid",
            value: 200,
            color: "#F8C78D"
        }
    ]
    useEffect(() => {
        if (rank === 1) {
            setDetail(true)
        }
    }, [])
    return (
        <div style={{
            borderBottom: "1px solid #D2D3D3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 10,
        }}>
            <div style={{
                width: 300,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: 20,
                fontSize: 10,
            }}>
                <div style={{
                    width: 30,
                    marginLeft: 5,
                    fontWeight: rank < 5 ? "bold" : "normal",
                    color: rank < 5 ? "#e78276" : "#202426",
                }}>{rank}</div>
                <div style={{
                    width: 60,
                    marginLeft: 5,
                    fontWeight: "bold",
                    color: "#202426"
                }}>{name}</div>
                <div style={{
                    width: 60,
                    marginLeft: 5,
                    color: "#202426"
                }}>{total}</div>
                <div style={{
                    width: 50,
                    marginLeft: 5,
                    fontWeight: "bold",
                    color: "#e78276"
                }}>{accumulate}</div>
                <div onClick={() => setDetail(!detail)} style={{
                    width: 50,
                    marginLeft: 5,
                    textDecorationLine: "underline",
                    cursor: "pointer"
                }}>{detail ? "접기" : "자세히"}</div>
            </div>
            {detail ?
                <>
                    <div style={{
                        width: 260,
                        height: 15,
                        borderRadius: 14,
                        marginTop: 10,
                        marginBottom: 5,
                    }}>
                        <HSBar 
                            height={15}
                            data={data}
                        />
                    </div>
                    <div className="mobile-ranking-grid-container">
                            {data.map(ele => 
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 4,
                                        marginRight: 8,
                                        backgroundColor: ele.color,
                                    }} />
                                    <div style={{
                                        fontSize: 10,
                                        color: "#161513"
                                    }}>{ele.name} {ele.value}</div>
                                </div>
                            )}
                    </div>
                </>
                :
                <></>
            }
        </div>
    )
}