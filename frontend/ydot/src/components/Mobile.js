import React, { useState, useEffect, useReducer } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useSelector } from "react-redux";
//icon
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
import topbanner from "./icon/topbanner.png"
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
                    <Link to={'/home'} style={{
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
                    <Link to={'/home'} style={{
                        fontSize: 35,
                        fontWeight: "bold",
                        color: "#202426",
                        marginRight: 30,
                        textDecorationLine: "none",
                    }}>Y<div style={{
                        display: "inline-block",
                        color: "#da877a"
                    }}>.</div></Link>
                    <>
                        <Link to={'/home'} style={{
                            fontSize: 18,
                            color: "#202426",
                            fontWeight: bold === "Home" ? "bold" : "normal",
                            marginRight: 10,
                            textDecorationLine: "none",
                        }}>Home</Link>
                        <Link to={'/fund'} style={{
                            fontSize: 18,
                            color: "#202426",
                            fontWeight: bold === "Fund" ? "bold" : "normal",
                            marginRight: 10,
                            textDecorationLine: "none",
                        }}>펀딩하기</Link>
                        <div onClick={getInfo} style={{
                            cursor:"pointer",
                            fontSize: 21,
                            color: "#202426",
                            fontWeight: bold === "Asset" ? "bold" : "normal",
                            marginRight: 40,
                            textDecorationLine: "none",
                        }}>내 자산</div>
                    </>
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

export function MTopBanner() {
    return (
        <>
            <div style={{
                width: "100vw",
                minWidth: 300,
                height: 250,
                position: "relative",
                display: "flex",
                flexDirection: "column",
            }}>
                <img src={topbanner} height="250" style={{ objectFit: "cover", minWidth: 300 }} />
                <div style={{ position: "absolute", zIndex: 1, top: 0, width: "100vw", minWidth: 300, height: 250, background: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))" }} />
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
                    }}>이달의 크리에이터</div>
                    <div style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        color: "#ffffff",
                        marginBottom: 10,
                    }}>브이로거 리영자</div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <div style={{
                            width: 20,
                            textAlign: "center",
                            color: "#ffffff",
                            cursor: "pointer",
                            fontSize: 16,
                            marginRight: 4,
                            fontWeight: "bold",
                            opacity: 0.6,
                        }}>{"<"}</div>
                        <div style={{
                            width: 20,
                            textAlign: "center",
                            color: "#ffffff",
                            fontSize: 14,
                            marginRight: 4,
                            opacity: 0.6,
                        }}>5/6</div>
                        <div style={{
                            width: 20,
                            textAlign: "center",
                            color: "#ffffff",
                            cursor: "pointer",
                            fontSize: 16,
                            marginRight: 4,
                            fontWeight: "bold",
                            opacity: 0.6,
                        }}>{">"}</div>
                    </div>
                </div>
            </div>
        </>
    )
}


//HomeMain.js와 AuctionMain.js 요소
export function MCreatorInfo({ img, name, FundingNum, percent, Deadline }) {
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
                    borderTopRightRadius: 10
                }} />
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#161513",
                    marginTop: 10,
                    width: 120,
                }}>{name}</div>
                <div style={{
                    fontSize: 12,
                    color: "#161513",
                    marginTop: 5,
                    width: 120,
                }}><div style={{ display: "inline-block", fontWeight: "bold", fontSize: 14 }}>{FundingNum}</div> 원 펀딩</div>
                <div style={{
                    fontSize: 12,
                    color: "#202426",
                    marginTop: 5,
                    marginBottom: 5,
                    width: 120,
                    fontWeight: "bold",
                }}>{percent.toFixed(0)}% | D-{Deadline}</div>
                <MProgressBar completed={percent} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                    fontSize: 10,
                    fontWeight: "normal",
                    color: "#161513",
                    width: 120,
                }}>
                    <div style={{
                        border: "1px solid #202426",
                        padding: "2px 4px",
                        borderRadius: 20,
                        marginRight: 4,
                    }}># 먹방</div>
                    <div style={{
                        border: "1px solid #202426",
                        padding: "2px 4px",
                        borderRadius: 20,
                    }}># 고속 성장</div>
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
export function MCloseBeta({ img, title, content }) {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                marginBottom: 20,
            }}>
                <img src={img} style={{ width: 80, height: 80, marginBottom: 20 }} />
                <div style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 10,
                    width: "90vw",
                    textAlign: "center",
                    minWidth: 300
                }}>{title}</div>
                <div style={{
                    opacity: 0.8,
                    fontSize: 16,
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
                width: 85,
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
                width: 140,
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
                height: 300,
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
                    <button onClick={() => setOne(!one)} style={{
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
                    }}>{OneIcon}</button>
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
                    <button onClick={() => setTwo(!two)} style={{
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
                    }}>{TwoIcon}</button>
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
                    <button onClick={() => setThree(!three)} style={{
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
                    }}>{ThreeIcon}</button>
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
                    <button onClick={() => setFour(!four)} style={{
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
                    }}>{FourIcon}</button>
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
                    marginBottom: 36,
                    borderRadius: 10,
                }}>
                    <div style={{
                        fontSize: 12,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>투자조건을 확인했습니다.</div>
                    <button onClick={() => setInvest(!invest)} style={{
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
                    }}>{InvestIcon}</button>
                </div>
                <input onClick={onNext} type="button" style={{
                    cursor: "pointer",
                    width: 270,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#e78276",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
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
export function MPopupTwo({ setVisible, setNextVisible ,creatorName}) {
    const [money, setMoney] = useState("")
    const [number, dispatch] = useReducer(PopupReducer, 0)
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const onTwentyfive = () => {
        dispatch({ type: "25" })
        setMoney(totalMoney/4)
    }
    const onFifty = () => {
        dispatch({ type: "50" })
        setMoney(totalMoney/2)
    }
    const onSeventyFive = () => {
        dispatch({ type: "75" })
        setMoney(totalMoney/4*3)
    }
    const onMax = () => {
        dispatch({ type: "max" })
        setMoney(totalMoney)
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
                setWarn("최대"+fundingMax+"₩")
            }else{
                setWarn("최대"+totalMoney+"₩")
            }
        }else{
            firestoreUpload()
            setVisible(false)
            setNextVisible(true)
        }
        
    }
    const [totalMoney,setTotalMoney]=useState(0)
    const [wallet,setWallet]=useState("")
    function getInfo(){
        firestore.collection("User").doc(uid).get().then(doc=>{
            setTotalMoney(doc.data().totalMoney)
            setWallet(doc.data().wallet)
        })
        
    }
    const [fundingMax,setFundingMax]=useState(0)
    const [fundingTotal,setFundingTotal]=useState(0)
    function getCreatorInfo() {
        firestore.collection("Creator").doc(creatorName).onSnapshot(doc => {
            setFundingMax(doc.data().FundingAim-doc.data().FundingTotal)
            setFundingTotal(doc.data().FundingTotal)
        })
    }

    async function firestoreUpload() {
        const today = new Date()
        const year = today.getFullYear();
        const month = today.getMonth() + 1
        const day = today.getDate()
        firestore.collection("User").doc(uid).collection("Fund").doc(creatorName).set({
            DayTime: year + "/" + month + "/" + day,
            Money: money,
            ongoing: 0,
            channel: creatorName
        })
        firestore.collection("User").doc(uid).update({
            totalMoney:Number(totalMoney)-Number(money)
        })
        await firestore.collection("Creator").doc(creatorName).update({
            FundingTotal: Number(fundingTotal)+Number(money)
        })
        await firestore.collection("Creator").doc(creatorName).collection("Investor").doc(wallet).set({
            wallet:wallet,
            money:money
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
                height: 300,
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
                    fontSize: 16,
                    opacity: 0.8,
                    color: "#e61800",
                    width: 222,
                    textAlign: "right",
                    marginBottom: 20,
                }}>{warn}</div>

                <input onClick={onNext} type="button" style={{
                    cursor: "pointer",
                    width: 270,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#e78276",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
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
                height: 300,
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
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#e78276",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                }} value="완료" />
            </div>
        </div>
    )
}