import React from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

//icon
import { FaUserCircle, FaArrowRight, FaArrowDown, FaFacebook } from 'react-icons/fa';
import { AiFillCaretDown, AiFillTwitterCircle } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs'
import { FiArrowRightCircle } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi'

//Style.js에서 가져옴
import { ProgressBar } from "./Style"

//이미지
import kakaotalk from "./icon/kakaotalk.png"
import topbanner from "./icon/topbanner.png"

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
                        <Link to={'/asset'} style={{
                            fontSize: 18,
                            color: "#202426",
                            fontWeight: bold === "Asset" ? "bold" : "normal",
                            textDecorationLine: "none",
                        }}>내 자산</Link>
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
                            color: "#ffffff",
                            cursor: "pointer",
                            fontSize: 16,
                            marginRight: 4,
                            fontWeight: "bold",
                            opacity: 0.6,
                        }}>{"<"}</div>
                        <div style={{
                            color: "#ffffff",
                            fontSize: 14,
                            marginRight: 4,
                            opacity: 0.6,
                        }}>5/6</div>
                        <div style={{
                            width: 20,
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
        history.push("/fund/" + String(name))
    }
    return (
        <>
            <div onClick={move} style={{
                width: 235,
                height: 302,
                borderRadius: 20,
                border: "1px solid #D2D3D3",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 20,
            }}>
                <img src={img} style={{
                    width: 235,
                    height: 120,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
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
                }}><div style={{ display: "inline-block", fontWeight: "bold", fontSize: 18 }}>{FundingNum}</div> 원 펀딩</div>
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
                    }}># 먹방</div>
                    <div style={{
                        border: "1px solid #202426",
                        padding: "4px 8px",
                        borderRadius: 20,
                    }}># 고속 성장</div>
                </div>
            </div>
        </>
    )
}

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