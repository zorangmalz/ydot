import React from "react"
import { Link } from 'react-router-dom';

//디자인
import MLoginHeader, { MSignupModule } from "../Mobile";
import { FaUserCircle } from "react-icons/fa"

//모바일 대응
import { useMediaQuery } from 'react-responsive'
import { SignupModule } from "../Style";

export default function EmailSignup() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

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
                                marginBottom: 40
                            }}>회원가입</div>
                            <SignupModule />
                        </div>
                    </div>
                </div>
            </Default>
            <Mobile>
                <div style={{
                    width: "100vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    <MLoginHeader />
                    <div style={{
                        width: "100%",
                        paddingTop: 40,
                        paddingBottom: 40,
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
                            <MSignupModule />
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    )
}