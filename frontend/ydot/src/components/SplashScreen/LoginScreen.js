import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"
//모바일 대응
import { useMediaQuery } from 'react-responsive'
import MLoginHeader from "../Mobile";

export default function LoginScreen() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

    const [id, setID] = useState("")
    const [pass, setPass] = useState("")
    const [differ, setDiffer] = useState(true)
    



    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
      });
    
      const { name, nickname } = inputs; // 비구조화 할당을 통해 값 추출
    
      const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };


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
                                <Link to={'/home'} style={{
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
                        height: "95%",
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
                                marginBottom: 40
                            }}>로그인</div>
                            <input style={{
                                borderTop: 0,
                                borderLeft: 0,
                                borderRight: 0,
                                marginTop: 0,
                                width: 290,
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                borderBottom: "1px solid #d2d3d3",
                                outlineColor: "#e78276",
                                paddingBottom: 4,
                                marginBottom: 20
                            }} placeholder="아이디" name="name" placeholder="이름" onChange={onChange} value={name}/>
                            <input type="password" style={{
                                borderTop: 0,
                                borderLeft: 0,
                                borderRight: 0,
                                marginTop: 0,
                                width: 290,
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                borderBottom: "1px solid #d2d3d3",
                                outlineColor: "#e78276",
                                paddingBottom: 4,
                                marginBottom: 10,
                            }} placeholder="비밀번호"  name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
                            <div>
                                {name+nickname}
                            </div>
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                fontSize: 14,
                                opacity: 0.6,
                                cursor: "pointer",
                                outline: 0,
                                color: "#202426",
                                backgroundColor: "#ffffff",
                                textDecorationLine: "underline",
                                textAlign: "right",
                                alignSelf: "flex-end",
                                marginBottom: 10
                            }} value="비밀번호를 잊으셨나요?" />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#e78276",
                                marginBottom: differ ? 10 : 20,
                                fontWeight: "bold"
                            }} value="로그인" />
                            {differ ? <div style={{
                                width: 300,
                                fontSize: 14,
                                color: "#e61800",
                                backgroundColor: "#ffffff",
                                marginBottom: 20,
                                textAlign: "center",
                            }}>비밀번호를 확인해주세요</div> : <></>}
                            <div style={{ width: 300, border: "1px solid #d2d3d3", marginBottom: 20 }} />
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
                                fontWeight: "bold"
                            }} value="Facebook" />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#f4e04b",
                                marginBottom: 20,
                                fontWeight: "bold"
                            }} value="Kakaotalk" />
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
                                fontWeight: "bold"
                            }} value="Google" />
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
                        height: "95%",
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
                                marginBottom: 40
                            }}>로그인</div>
                            <input style={{
                                borderTop: 0,
                                borderLeft: 0,
                                borderRight: 0,
                                marginTop: 0,
                                width: 290,
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                borderBottom: "1px solid #d2d3d3",
                                outlineColor: "#e78276",
                                paddingBottom: 4,
                                marginBottom: 20
                            }} placeholder="아이디" value={id} onChange={({ text }) => setID(text)} />
                            <input type="password" style={{
                                borderTop: 0,
                                borderLeft: 0,
                                borderRight: 0,
                                marginTop: 0,
                                width: 290,
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                borderBottom: "1px solid #d2d3d3",
                                outlineColor: "#e78276",
                                paddingBottom: 4,
                                marginBottom: 10,
                            }} placeholder="비밀번호" value={pass} onChange={({ text }) => setPass(text)} />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                fontSize: 14,
                                opacity: 0.6,
                                cursor: "pointer",
                                outline: 0,
                                color: "#202426",
                                backgroundColor: "#ffffff",
                                textDecorationLine: "underline",
                                textAlign: "right",
                                alignSelf: "flex-end",
                                marginBottom: 10
                            }} value="비밀번호를 잊으셨나요?" />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#e78276",
                                marginBottom: differ ? 10 : 20,
                                fontWeight: "bold"
                            }} value="로그인" />
                            {differ ? <div style={{
                                width: 300,
                                fontSize: 14,
                                color: "#e61800",
                                backgroundColor: "#ffffff",
                                marginBottom: 20,
                                textAlign: "center",
                            }}>비밀번호를 확인해주세요</div> : <></>}
                            <div style={{ width: 300, border: "1px solid #d2d3d3", marginBottom: 20 }} />
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
                                fontWeight: "bold"
                            }} value="Facebook" />
                            <input type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#f4e04b",
                                marginBottom: 20,
                                fontWeight: "bold"
                            }} value="Kakaotalk" />
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
                                fontWeight: "bold"
                            }} value="Google" />
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    )
}