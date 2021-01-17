import React from "react"
import { Link, useHistory } from 'react-router-dom';

//디자인
import MLoginHeader from "../Mobile";
import { FaUserCircle } from "react-icons/fa"

//모바일 대응
import { useMediaQuery } from 'react-responsive'


export default function SignupScreen() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

    const history = useHistory()

    return (
        <div>
            <Default>
                <div style={{
                    width: "100vw",
                    height: "100vh",
                    minWidth: 1060,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <header style={{
                        zIndex: 3,
                        width: "56vw",
                        minWidth: 1060,
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
                                    fontSize: 40,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    marginRight: 72,
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
                            }}><FaUserCircle color="#202426" size={48} /></button>
                        </div>
                    </header>
                    <div style={{
                        width: "100%",
                        height: "90%",
                        backgroundColor: "#ffffff",
                        borderTop: "1px solid #D2D3D3",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div style={{
                            width: 400,
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div style={{
                                fontSize: 32,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 20
                            }}>회원가입</div>
                            <div style={{
                                fontSize: 18,
                                color: "#202426",
                                marginBottom: 20,
                            }}>Y.에 가입하고 크리에이터 투자를 시작하세요!</div>
                            <input type="button" style={{
                                border: 0,
                                width: 400,
                                height: 56,
                                fontSize: 22,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#425993",
                                marginBottom: 20,
                                WebkitAppearance: "none"
                            }} value="페이스북으로 가입" />
                            <input type="button" style={{
                                border: 0,
                                width: 400,
                                height: 56,
                                fontSize: 22,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#2b1919",
                                backgroundColor: "#f4e04b",
                                marginBottom: 20,
                                WebkitAppearance: "none"
                            }} value="Kakao talk 가입" />
                            <input type="button" style={{
                                border: 0,
                                width: 400,
                                height: 56,
                                fontSize: 22,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#cd5642",
                                marginBottom: 20,
                                WebkitAppearance: "none"
                            }} value="Google로 가입" />
                            <div style={{
                                width: 400,
                                height: 1.5,
                                backgroundColor: "#202426",
                                opacity: 0.2,
                                marginBottom: 20
                            }} />
                            <input onClick={() => history.push("/emailsignup")} type="button" style={{
                                border: "1px solid #A8A8A8",
                                width: 400,
                                height: 56,
                                fontSize: 22,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#787B7C",
                                backgroundColor: "#ffffff",
                                WebkitAppearance: "none"
                            }} value="이메일로 가입" />
                        </div>
                    </div>
                </div>
            </Default>
            <Mobile>
                <div style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <MLoginHeader />
                    <div style={{
                        width: "100%",
                        height: "90%",
                        backgroundColor: "#ffffff",
                        borderTop: "1px solid #D2D3D3",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div style={{
                            width: 300,
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <div style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 20
                            }}>회원가입</div>
                            <div style={{
                                fontSize: 16,
                                color: "#202426",
                                marginBottom: 20,
                            }}>Y.에 가입하고 크리에이터 투자를 시작하세요!</div>
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#425993",
                                marginBottom: 20,
                                WebkitAppearance: "none"
                            }} value="페이스북으로 로그인" />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#2b1919",
                                backgroundColor: "#f4e04b",
                                marginBottom: 20,
                                WebkitAppearance: "none"
                            }} value="Kakao talk 로그인" />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#cd5642",
                                marginBottom: 20,
                                WebkitAppearance: "none"
                            }} value="Google로 로그인" />
                            <div style={{
                                width: 300,
                                height: 1.5,
                                backgroundColor: "#202426",
                                opacity: 0.2,
                                marginBottom: 20
                            }} />
                            <input onClick={() => history.push("/emailsignup")} type="button" style={{
                                border: "1px solid #A8A8A8",
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#787B7C",
                                backgroundColor: "#ffffff",
                                WebkitAppearance: "none"
                            }} value="이메일로 가입" />
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    )
}