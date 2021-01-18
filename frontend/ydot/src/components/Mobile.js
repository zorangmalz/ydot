import React, { useState, useEffect, useReducer } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryVoronoiContainer, VictoryTooltip, VictoryBrushLine, VictoryPie } from "victory"
import HSBar from "react-horizontal-stacked-bar-chart";
import firebase from "firebase"
import { useFirebase, useFirestore } from "react-redux-firebase"
//css
import "./component.css"

//icon
import { FaUserCircle, FaFacebook, FaHeart } from 'react-icons/fa';
import { AiFillCaretDown, AiFillTwitterCircle } from 'react-icons/ai';
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { BiCheckCircle, BiCheck } from 'react-icons/bi'

//이미지
import kakaotalk from "./icon/kakaotalk.png"
import rocketup from "./icon/rocketup.png"
import rocketdown from "./icon/rocketdown.png"
import leaf from "./icon/leaf.png"
import tree from "./icon/tree.png"
import unicon from "./icon/unicon.png"
import colorrocket from "./icon/colorrocket.png"
import typeexample from "./icon/typeexample.png"

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
            history.push("/asset")
        }else{
            history.push("/login")
        }
    }
    return (
        <header style={{
            position: "fixed",
            top: 0,
            zIndex: 3,
            width: "100vw",
            minWidth: 300,
            height: 80,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #d2d3d3"
        }}>
            {mine ? 
                <MMyInfo />
                :
                <></>
            }
            <div style={{
                width: "90%",
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

    function getInfo() {
        if (uid) {
            firestore.collection("User").doc(uid).get().then(doc => {
                setEmail(doc.data().email)
                setWallet(doc.data().wallet)
                setMoney(doc.data().totalMoney)
                if(doc.data().creator.length>0){
                    firestore.collection("User").doc(uid).collection("NFT").get().then(querySnapshot=>{
                        setLeng(querySnapshot.size)
                    })
                }
            })
            
            
        } else {
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
                }}>{(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}KRW</div>

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

export function MTopBanner({img, title, content, backgroundColor, link}) {
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
                <a href={link} target="_blank" style={{
                    textDecorationLine: "none",
                    WebkitAppearance: "none"
                }}>
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
                </a>
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
    
    const subscribe = 0.1
    const monthrate = 3
    return (
        <>
            <div onClick={move} style={{
                width: "80%",
                minWidth: 260,
                paddingTop: 20,
                paddingBottom: 15,
                paddingLeft: 20,
                paddingRight: 20,
                height: 80,
                borderRadius: 10,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: 20,
                boxShadow: "0px 5px 15px 2px rgba(0, 0, 0, 0.12)"
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
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <img src={img} alt="" style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            objectFit: "contain"
                        }} />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            width: 180,
                            height: 50,
                            marginLeft: 10,
                        }}>
                            <div style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: "#202426",
                            }}>{name}</div>
                            <div style={{
                                fontSize: 10,
                                color: "#202426",
                            }}><div style={{ display: "inline-block", fontWeight: "bold", fontSize: 12 }}>{(fundingAim.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</div> 원 펀딩 목표</div>
                            <div style={{
                                fontSize: 12,
                                color: "#202426",
                            }}>{percent.toFixed(0)}% | {Deadline < 0 ? "펀딩 종료" : "D-" + `${Deadline}`}</div>
                        </div>
                    </div>
                    <FaHeart size={18} color="#e78276" />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                }}>
                    <div style={{
                        width: 50,
                        marginRight: 10,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                        {subscribe < 1 ? <img src={leaf} style={{ width: 20, height: 20 }} /> : subscribe < 10 ? <img src={tree} style={{ width: 20, height: 20 }} /> : <img src={unicon} style={{ width: 20, height: 20 }} />}
                        {monthrate < 4 ? <div style={{ width: 20, height: 20 }} /> : <img src={colorrocket} style={{ width: 20, height: 20 }} />}
                    </div>
                    <MProgressBar completed={percent} />
                </div>
            </div>
        </>
    )
}

export function MProgressBar({ completed }) {

    const containerStyles = {
        height: 10,
        width: "60%",
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
                paddingBottom: 20,
                borderTop: "1px solid #D2D3D3",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{
                    fontSize: 60,
                    fontWeight: "bold",
                    color: "#202426",
                    letterSpacing: 0.89,
                    marginBottom: 10,
                }}>Y<div style={{display: "inline-block", color: "#da877a"}}>.</div></div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <input type="button" style={{
                            fontSize: 14,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                            WebkitAppearance: "none"
                        }} value="About" />
                        <input type="button" style={{
                            fontSize: 14,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                            WebkitAppearance: "none"
                        }} value="Contact" />
                        <a  target="_blank"  href={"https://sites.google.com/view/ydotpersonal/%ED%99%88"}>
                        <input type="button" style={{
                            fontSize: 14,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                            WebkitAppearance: "none"
                        }} value="Privacy Policy" />
                        </a>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10
                    }}>
                        <a  target="_blank"  href={"https://sites.google.com/view/ydotuse/%ED%99%88"}>
                        <input type="button" style={{
                            fontSize: 14,
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                            WebkitAppearance: "none"
                        }} value="Terms of Service" />
                        </a>
                        <input type="button" style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#202426",
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: "#ffffff",
                            border: 0,
                            WebkitAppearance: "none"
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
                <div style={{ width: "90vw", textAlign: "center", fontSize: 10, color: "#ffffff", marginBottom: 10 }}>주식회사 조랑말즈</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 10, color: "#ffffff", marginBottom: 10 }}>대표자 : 김현명</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 10, color: "#ffffff", marginBottom: 10 }}>서울특별시 종로구 창경궁로 1길 35-38 킹고스타트업 스페이스 306호</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 10, color: "#ffffff", marginBottom: 10 }}>사업자 등록번호 : 20310-2300-12302</div>
                <div style={{ width: "90vw", textAlign: "center", fontSize: 10, color: "#ffffff", opacity: 0.9, fontWeight: "bold" }}>© Jorangmals Co., Ltd.</div>
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
                height: 85,
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
                    growth >= 0 ?
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
                height: 85,
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
                    growth >= 0 ?
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
                zIndex: 5,
            }} />
            <div style={{
                zIndex: 7,
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
                    <div onClick={UseClick} style={{
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
                    }}>{UserIcon}</div>
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
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [money, setMoney] = useState("")

    //유저의 코인 총량. 내 자산 및 팝업에서 원 대신에 보여주면 됨
    const onChange = (e) => {
        setMoney(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
    }

    useEffect(() => {
        getInfo()
        getCreatorInfo()
    }, [])
    const [number, dispatch] = useReducer(MPopupReducer, 0)
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
        } else {
            
            if (money === 0 || money === "0" || isNaN(money ||money<0)) {
                alert("금액을 정확히 입력해 주세요")
            } else {
                firestoreUpload()
                setVisible(false)
                setNextVisible(true)
            }

        }
    }
    const [totalMoney,setTotalMoney]=useState(0)
    const [wallet,setWallet]=useState("")
    const [email,setEmail]=useState("")
    const [fundingList,setFundingList]=useState([])
    function getInfo(){
        firestore.collection("User").doc(uid).get().then(doc=>{
            setTotalMoney(doc.data().totalMoney)
            setWallet(doc.data().wallet)
            setEmail(doc.data().email)
            setFundingList(doc.data().creator)
        })
        
    }
    const [fundingMax,setFundingMax]=useState(0)
    const [fundingTotal,setFundingTotal]=useState(0)
    const [symbol,setSymbol]=useState("")
    const [fundingAim,setFundingAim]=useState(0)
    const [investList,setInvestList]=useState([])
    const [creatorColor,setCreatorColor]=useState("")
    function getCreatorInfo() {
        firestore.collection("Creator").doc(creatorName).onSnapshot(doc => {
            setFundingMax(doc.data().FundingAim-doc.data().FundingTotal)
            setFundingTotal(doc.data().FundingTotal)
            setSymbol(doc.data().symbol)
            setFundingAim(doc.data().FundingAim)
            setInvestList(doc.data().investList)
            setCreatorColor(doc.data().color)
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
        if(fundingList.includes(creatorName)){
            firestore.collection("User").doc(uid).collection("TotalFunding").doc(creatorName).get().then(doc=>{
                firestore.collection("User").doc(uid).collection("TotalFunding").doc(creatorName).update({
                    DayTime: docName,
            Money: realMoney+doc.data().Money,
            ongoing: 0,
            channel: creatorName,
            fullTime:today.getTime(),
            total:0,
            monthly:0,
            month:0,
            symbol:symbol,
            fundingAim:fundingAim,
            color:creatorColor
                })
            })
        }else{
            firestore.collection("User").doc(uid).collection("TotalFunding").doc(creatorName).set({
                DayTime: docName,
        Money: realMoney,
        ongoing: 0,
        channel: creatorName,
        fullTime:today.getTime(),
        total:0,
        monthly:0,
        month:0,
        symbol:symbol,
        fundingAim:fundingAim,
        color:creatorColor,
        
            })
            firestore.collection("User").doc(uid).update({
                creator:firebase.firestore.FieldValue.arrayUnion(creatorName)
            })
        }
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

        if(investList.includes(uid)){
            firestore.collection("Creator").doc(creatorName).collection("InvestorList").doc(uid).get().then(doc=>{

                firestore.collection("Creator").doc(creatorName).collection("InvestorList").doc(uid).update({
                    
                    wallet:wallet,
                    money:realMoney+doc.data().money,
                    email:email,
                    DayTime:docName,
                    fullTime:today.getTime(),
                    uid:uid
                })
            })
        }else{
            firestore.collection("Creator").doc(creatorName).collection("InvestorList").doc(uid).set({
                wallet:wallet,
                money:realMoney,
                email:email,
                DayTime:docName,
                fullTime:today.getTime(),
                uid:uid
        
            })
            firestore.collection("Creator").doc(creatorName).update({
                investList:firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }
        await firestore.collection("Creator").doc(creatorName).collection("Investor").add({
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
                zIndex: 5,
            }} />
            <div style={{
                zIndex: 7,
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
                        WebkitAppearance: "none"
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
                        WebkitAppearance: "none"
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
                        WebkitAppearance: "none"
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
                        WebkitAppearance: "none"
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
                zIndex: 5,
            }} />
            <div style={{
                zIndex: 7,
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

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function MGraph({data, kind}) {
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
                padding={{top: 10, left: 70, right: 20, bottom: 30,}}
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
                        `${datum.x} \n 크리에이터 ${kind} ${numberWithCommas(datum.y)}`}
                    labelComponent={
                        <VictoryTooltip constrainToVisibleArea
                            flyoutStyle={{ stroke: "#202426", strokeWidth: 2, fill: "#ffffff" }}
                            flyoutWidth={300}
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
                padding={{ top: 0, bottom: 30, right: 30, left: 70}}
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
                    offsetX={65}
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
                        `${numberWithCommas(datum.y)} 원`}
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
    const [bottom,setBottom]=useState(0)
    const [realColor,setRealColor]=useState([])
    function percent(){
        var total=0
        var colorList=[]
        for(var i=0;i<data.length;i++){
            total=data[i].y+total
            colorList.push(data[i].color)
        }
setRealColor(colorList)
setBottom(total)
    }
    useEffect(()=>{
        percent()
    },[])
    return (
        <div style={{
            width: 150,
            height: 150,
            alignSelf: "center",
        }}>
            <VictoryPie
                  colorScale={realColor}
                  events={[{
                      target: "data",
                      eventHandlers: {
                          onMouseOver: () => {
                              return [
                                  {
                                      target: "labels",
                                      mutation: ({ text, datum }) => {
                                          return text === `${datum.name}` ? { text: `${datum.y}` } : { text: `${datum.name}` }
                                      }
                                  }
                              ];
                          },
                          onMouseOut: () => {
                              return [
                                  {
                                      target: "labels",
                                      mutation: ({text, datum}) => {
                                          return {text: `${(datum.y/bottom*100).toFixed(2)}%`}
                                      }
                                  },
                              ];
                          }
                      }
                  }]}
                width={150}
                height={150}
                padding={{ top: 0, left: 0, right: 0, bottom: 0 }}
                data={data}
                labels={({ datum }) => `${(datum.y/bottom*100).toFixed(2)}%`}
                labelPosition="centroid"
                labelRadius={({ innerRadius }) => innerRadius + 30}
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


export function MInvestDashboard({ rank, name, total, accumulate,uid }) {
    const [detail, setDetail] = useState(false)
    const [item,setitem]=useState([])
    const firestore=useFirestore()
    useEffect(()=>{
        firestore.collection("User").doc(uid).collection("TotalFunding").orderBy("Money","desc").onSnapshot(querySnapshot=>{
            const list=[]
            querySnapshot.forEach(doc=>{
                if(doc.data().ongoing==1){
                list.push({
                    name:doc.data().channel,
                    value:doc.data().Money,
                    color:doc.data().color
                })
            }
            })
            setitem(list)
        })
    })
    useEffect(() => {
        if (rank === 1) {
            setDetail(true)
        }
    }, [rank])
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
                minWidth: 300,
                width: "90vw",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                fontSize: 10,
            }}>
                <div style={{
                    width: 25,
                    marginLeft: 5,
                    fontWeight: rank < 5 ? "bold" : "normal",
                    color: rank < 5 ? "#e78276" : "#202426",
                    fontSize: 8,
                }}>{rank}</div>
                <div style={{
                    width: 60,
                    marginLeft: 5,
                    fontWeight: "bold",
                    color: "#202426",
                    fontSize: 8,
                }}>{name}</div>
                <div style={{
                    width: 80,
                    marginLeft: 5,
                    color: "#202426",
                    fontSize: 8,
                }}>{accumulate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div style={{
                    width: 80,
                    marginLeft: 5,
                    fontWeight: "bold",
                    color: "#e78276",
                    fontSize: 8,
                }}>{total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                <div onClick={() => setDetail(!detail)} style={{
                    width: 50,
                    marginLeft: 5,
                    textDecorationLine: "underline",
                    cursor: "pointer",
                    fontSize: 8,
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
                            data={item}
                        />
                    </div>
                    <div className="mobile-ranking-grid-container">
                            {item.map(ele => 
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: 3,
                                        marginRight: 4,
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

export function MSignupModule() {
    const history = useHistory()

    const [inputs, setInputs] = useState({
        name: '',
        password: ''
    });

    const { name, password } = inputs;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const [passCheck, setPassCheck] = useState("")

    const onPassCheck = (e) => {
        setPassCheck(e.target.value)
    }

    //이메일과 비밀번호 유효
    const [valid, setValid] = useState(false)
    const [passValid, setPassValid] = useState(false)

    //대문자, 숫자, 특수 문자를 조합한 8자리 이상
    const [largeChar, setLargeChar] = useState(false)
    const [number, setNumber] = useState(false)
    const [uniqueChar, setUniqueChar] = useState(false)
    const [lengthChar, setLengthChar] = useState(false)

    useEffect(() => {
        var num = passCheck.search(/[0-9]/g);
        var large = passCheck.search(/[A-Z]/g)
        var spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/;
        if (passCheck.length > 7 || passCheck.length < 20) {
            setLengthChar(true)
        }
        if (passCheck.length < 8 || passCheck.length > 20) {
            setLengthChar(false)
        }
        if (passCheck.search(/₩s/) != -1) {
            alert("비밀번호는 공백업이 입력해주세요.");
            setPassCheck("")
        }
        if (num >= 1) {
            setNumber(true)
        }
        if (large >= 1) {
            setLargeChar(true)
        }
        if (spe.test(passCheck)) {
            setUniqueChar(true)
        }
        if (num < 0) {
            setNumber(false)
        }
        if (large < 0) {
            setLargeChar(false)
        }
        if (!spe.test(passCheck)) {
            setUniqueChar(false)
        }
        console.log(passCheck)
        if (inputs.password === passCheck) {
            setPassValid(true)
        }
        if (inputs.password != passCheck) {
            setPassValid(false)
        }
    }, [inputs, passCheck])

    //이용약관 동의
    const [totalAgree, setTotalAgree] = useState(false)
    const [serviceAgree, setServiceAgree] = useState(false)
    const [personalAgree, setPersonalAgree] = useState(false)
    const [marketingAgree, setMarketingAgree] = useState(false)
    const total = () => {
        setTotalAgree(!totalAgree)
        setServiceAgree(!serviceAgree)
        setPersonalAgree(!personalAgree)
        if (totalAgree) {
            setMarketingAgree(false)
        } else {
            setMarketingAgree(true)
        }
    }
    const [fold, setFold] = useState(false)
    return (
        <>
            <div style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#202426",
                marginBottom: 10,
            }}>이메일 주소</div>
            <input id="DID" name="name" style={{
                width: 270,
                paddingLeft: 15,
                paddingRight: 15,
                height: 48,
                borderRadius: 10,
                fontSize: 18,
                color: "#202426",
                fontWeight: "normal",
                backgroundColor: "#ffffff",
                border: "1px solid #202426",
                outlineColor: "#e78276",
                marginBottom: valid ? 20 : 10,
                WebkitAppearance: "none"
            }} placeholder="이메일 주소 입력" value={name} onChange={onChange} />
            {valid ?
                <></>
                :
                <div style={{
                    fontSize: 14,
                    color: "#da1414",
                    fontWeight: "normal",
                    marginBottom: 10,
                }}>유효한 이메일을 입력해주세요</div>
            }
            <div style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#202426",
                marginBottom: 10,
            }}>비밀번호</div>
            <input id="DPASS" type="password" name="password" style={{
                width: 270,
                paddingLeft: 15,
                paddingRight: 15,
                height: 48,
                borderRadius: 10,
                fontSize: 18,
                color: "#202426",
                fontWeight: "normal",
                backgroundColor: "#ffffff",
                border: "1px solid #202426",
                outlineColor: "#e78276",
                marginBottom: 20,
                WebkitAppearance: "none",
            }} placeholder="비밀번호 입력" value={password} onChange={onChange} />
            <div style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#202426",
                marginBottom: 10,
            }}>비밀번호 확인</div>
            <input id="DPASS" type="password" style={{
                width: 270,
                paddingLeft: 15,
                paddingRight: 15,
                height: 48,
                borderRadius: 10,
                fontSize: 18,
                color: "#202426",
                fontWeight: "normal",
                backgroundColor: "#ffffff",
                border: "1px solid #202426",
                outlineColor: "#e78276",
                marginBottom: passValid ? 20 : 10,
                WebkitAppearance: "none",
            }} placeholder="비밀번호 확인" value={passCheck} onChange={onPassCheck} />
            {passValid ?
                <></>
                :
                <div style={{
                    fontSize: 14,
                    color: "#da1414",
                    fontWeight: "normal",
                    marginBottom: 10,
                }}>유효한 이메일을 입력해주세요</div>
            }
            <div style={{
                fontSize: 14,
                color: "#202426",
                marginLeft: 10,
                marginBottom: 10,
            }}>영문 대문자, 숫자, 특수문자를 조합한 8자리 이상</div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 10,
                height: 20,
                marginBottom: 35,
            }}>
                {largeChar ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" />}
                <div style={{ fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5 }}>대문자</div>
                {number ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" />}
                <div style={{ fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5 }}>숫자</div>
                {uniqueChar ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" />}
                <div style={{ fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5 }}>특수분자</div>
                {lengthChar ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" />}
                <div style={{ fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5 }}>8자리 이상</div>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: 20,
                width: 280,
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <div onClick={total} style={{
                        border: "1px solid #A5A6A7",
                        backgroundColor: "#ffffff",
                        width: 15,
                        height: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer"
                    }}>
                        {marketingAgree ? <BsCheck color="#202426" size={15} /> : <></>}
                    </div>
                    <div style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#202426",
                        marginLeft: 10,
                    }}>이용약관 전체 동의</div>
                </div>
                <BsChevronDown onClick={() => setFold(!fold)} style={{
                    cursor: "pointer",
                }} size={15} color="#202426" />
            </div>
            {fold ?
                <></>
                :
                <div style={{
                    width: 270,
                    paddingLeft: 30,
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                }}>
                    <div style={{
                        fontSize: 10,
                        color: "#4c4f51",
                        width: "100%",
                        marginBottom: 20,
                    }}>이용약관 동의(필수), 개인정보 수집 및 이용 동의(필수), 마케팅, 이벤트 등 혜택 / 정보 수신 동의(선택)에 대해 모두 동의합니다.</div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 8,
                    }}>
                        <div onClick={() => setServiceAgree(!serviceAgree)} style={{
                            border: "1px solid #A5A6A7",
                            backgroundColor: "#ffffff",
                            width: 15,
                            height: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer"
                        }}>
                            {serviceAgree ? <BsCheck color="#202426" size={15} /> : <></>}
                        </div>
                        <div style={{
                            fontSize: 14,
                            color: "#4c4f51",
                            marginLeft: 10,
                        }}><div style={{ textDecorationLine: "underline", display: "inline-block" }}>와이닷 서비스 이용약관</div> (필수)</div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 8,
                    }}>
                        <div onClick={() => setPersonalAgree(!personalAgree)} style={{
                            border: "1px solid #A5A6A7",
                            backgroundColor: "#ffffff",
                            width: 15,
                            height: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer"
                        }}>
                            {personalAgree ? <BsCheck color="#202426" size={15} /> : <></>}
                        </div>
                        <div style={{
                            fontSize: 14,
                            color: "#4c4f51",
                            marginLeft: 10,
                        }}><div style={{ textDecorationLine: "underline", display: "inline-block" }}>개인정보 수집 이용</div> 동의 (필수)</div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}>
                        <div onClick={() => setMarketingAgree(!marketingAgree)} style={{
                            border: "1px solid #A5A6A7",
                            backgroundColor: "#ffffff",
                            width: 15,
                            height: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer"
                        }}>
                            {marketingAgree ? <BsCheck color="#202426" size={15} /> : <></>}
                        </div>
                        <div style={{
                            fontSize: 14,
                            color: "#4c4f51",
                            marginLeft: 10,
                        }}>마케팅 정보 수신 (선택)</div>
                    </div>
                    <div style={{
                        fontSize: 10,
                        color: "#4c4f51",
                        width: 240,
                        marginBottom: 20,
                        marginLeft: 30,
                    }}>와이닷의 모든 서비스(투자 정보, 이벤트, 할인 혜택 등)에 대한 정보를 받아볼 수 있습니다. (동의 철회 시까지)</div>
                </div>
            }
            <input onClick={() => history.push("/login")} type="button" style={{
                border: 0,
                width: 300,
                height: 48,
                fontSize: 18,
                borderRadius: 10,
                cursor: "pointer",
                outline: 0,
                color: "#ffffff",
                backgroundColor: "#e78276",
                marginTop: 20,
                WebkitAppearance: "none",
            }} value="다음" />
        </>
    )
}

export function MYdotCard({ title, content, img, backgroundColor }) {
    return (
        <div className="information" style={{
            width: "80%",
            minWidth: 260,
            height: 85,
            padding: 20,
            backgroundColor: backgroundColor,
            borderRadius: 15,
            marginBottom: 20,

            cursor: "pointer",

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-evenly",

                width: 180,
                height: "100%"
            }}>
                <div style={{
                    fontSize: 14,
                    color: "#ffffff",
                }}>{title}</div>
                <div style={{
                    fontSize: 16,
                    color: "#ffffff",
                    fontWeight: "bold"
                }}>{content}</div>
            </div>
            <img style={{ width: 60, height: 93 }} src={img} />
        </div>
    )
}

export function MNowCard({ thumbnail, title, icon, name }) {
    return (
        <div style={{
            width: 170,

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            backgroundColor: "#ffffff"
        }}>
            <img src={thumbnail} alt="썸네일" style={{ width: 170, height: 110, objectFit: "contain" }} />
            <div style={{
                width: 170,
                marginTop: 10,

                fontSize: 12,
                fontWeight: "bold",
                color: "#202426"
            }}>{title}</div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
            }}>
                <img src={icon} alt="채널 아이콘" style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                }} />
                <div style={{
                    height: 30,
                    marginLeft: 8,

                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-evenly"
                }}>
                    <div style={{
                        fontSize: 12,
                        color: "#202426"
                    }}>{name}</div>
                    <div style={{
                        fontSize: 10,
                        color: "#4c4f51"
                    }}>10분전</div>
                </div>
            </div>
        </div>
    )
}

export function MTypeCard({type}) {
    return (
        <div style={{
            minWidth: 120,
            height: 80,
            marginRight: 20,
            borderRadius: 10,

            position: "relative",
            cursor: "pointer",
            backgroundColor: "#000000"
        }}>
            <div style={{
                position: "absolute",
                zIndex: 1,

                width: 120,
                height: 80,
                borderRadius: 10,
                opacity: 0.4,
                backgroundColor: "#000000"
            }} />
            <img src={typeexample} style={{
                position: "absolute",
                zIndex: 0,

                width: 120,
                height: 80,
                borderRadius: 10,
                objectFit: "contain"
            }} />
            <div style={{
                position: "relative",
                zIndex: 3,
                width: "100%",
                height: "100%",
                
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                fontSize: 16,
                fontWeight: "bold",
                color: "#ffffff",
                textAlign: "center",
            }}># {type}</div>
        </div>
    )
}