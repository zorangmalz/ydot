import React, { useState, useEffect } from "react"
import { Link, useHistory } from 'react-router-dom';

//디자인
import MLoginHeader from "../Mobile";
import { FaUserCircle } from "react-icons/fa"
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { BiCheck } from "react-icons/bi"

//모바일 대응
import { useMediaQuery } from 'react-responsive'

//firebase
import firebase from "firebase/app";

export default function EmailSignup() {
    const history = useHistory()
    
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

    //이메일 유효
    const [valid, setValid] = useState(false)
 
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

    //대문자, 숫자, 특수 문자를 조합한 8자리 이상
    const [largeChar, setLargeChar] = useState(false)
    const [number, setNumber] = useState(false)
    const [uniqueChar, setUniqueChar] = useState(false)
    const [lengthChar, setLengthChar] = useState(false)


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

useEffect(()=>{
    console.log(name,nickname)
})
async function signin(){
    
    firebase.auth().signInWithEmailAndPassword("csh1379@nate.com","01072749591").then((user)=>{
        
    })
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
                            <div style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 10,
                            }}>이메일 주소</div>
                            <input id="DID" type="text" style={{
                                width: 360,
                                paddingLeft: 20,
                                paddingRight: 20,
                                height: 56,

                                verticalAlign: "center",
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                borderRadius: 10,
                                border: "1px solid #202426",

                                outlineColor: "#e78276",
                                marginBottom: valid ? 20 : 10,
                                WebkitAppearance: "none"
                            }} placeholder="이메일 주소 입력" />
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
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 10,
                            }}>비밀번호</div>
                            <input name="name" onChange={onChange} value={name}  id="DPASS" type="password" style={{
                                width: 360,
                                paddingLeft: 20,
                                paddingRight: 20,
                                height: 56,

                                verticalAlign: "center",
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                border: "1px solid #202426",
                                borderRadius: 10,

                                outlineColor: "#e78276",
                                marginBottom: 20,
                                WebkitAppearance: "none",
                            }} placeholder="비밀번호 입력" />
                            <div style={{
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 10,
                            }}>비밀번호 확인</div>
                            <input name="nickname" onChange={onChange} value={nickname} id="DPASS" type="password" style={{
                                width: 360,
                                paddingLeft: 20,
                                paddingRight: 20,
                                height: 56,

                                verticalAlign: "center",
                                fontSize: 18,
                                color: "#202426",
                                fontWeight: "normal",
                                backgroundColor: "#ffffff",
                                border: "1px solid #202426",
                                borderRadius: 10,

                                outlineColor: "#e78276",
                                marginBottom: 20,
                                WebkitAppearance: "none",
                            }} placeholder="비밀번호 확인" />
                            <div style={{
                                fontSize: 16,
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
                                {largeChar ? <BiCheck size={16} color="#5aca75" /> : <BiCheck size={16} color="#202426" /> }
                                <div style={{fontSize: 16, color: "#202426", marginLeft: 10, marginRight: 10}}>대문자</div>
                                {number ? <BiCheck size={16} color="#5aca75" /> : <BiCheck size={16} color="#202426" /> }
                                <div style={{fontSize: 16, color: "#202426", marginLeft: 10, marginRight: 10}}>숫자</div>
                                {uniqueChar ? <BiCheck size={16} color="#5aca75" /> : <BiCheck size={16} color="#202426" /> }
                                <div style={{fontSize: 16, color: "#202426", marginLeft: 10, marginRight: 10}}>특수분자</div>
                                {lengthChar ? <BiCheck size={16} color="#5aca75" /> : <BiCheck size={16} color="#202426" /> }
                                <div style={{fontSize: 16, color: "#202426", marginLeft: 10, marginRight: 10}}>8자리 이상</div>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingRight: 20,
                                width: 380,
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <div onClick={total} style={{
                                        border: "1px solid #A5A6A7",
                                        backgroundColor: "#ffffff",
                                        width: 20,
                                        height: 20,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}>
                                        {marketingAgree ? <BsCheck color="#202426" size={20} /> : <></>}
                                    </div>
                                    <div style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginLeft: 10,
                                    }}>이용약관 전체 동의</div>
                                </div>
                                <BsChevronDown onClick={() => setFold(!fold)} style={{
                                    cursor: "pointer",
                                }} size={20} color="#202426" />
                            </div>
                            {fold ?
                                <></>
                                :
                                <div style={{
                                    width: 370,
                                    paddingLeft: 30,
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: 10,
                                }}>
                                    <div style={{
                                        fontSize: 14,
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
                                            width: 20,
                                            height: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}>
                                            {serviceAgree ? <BsCheck color="#202426" size={20} /> : <></>}
                                        </div>
                                        <div style={{
                                            fontSize: 16,
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
                                            width: 20,
                                            height: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}>
                                            {personalAgree ? <BsCheck color="#202426" size={20} /> : <></>}
                                        </div>
                                        <div style={{
                                            fontSize: 16,
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
                                            width: 20,
                                            height: 20,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}>
                                            {marketingAgree ? <BsCheck color="#202426" size={20} /> : <></>}
                                        </div>
                                        <div style={{
                                            fontSize: 16,
                                            color: "#4c4f51",
                                            marginLeft: 10,
                                        }}>마케팅 정보 수신 (선택)</div>
                                    </div>
                                    <div style={{
                                        fontSize: 14,
                                        color: "#4c4f51",
                                        width: 340,
                                        marginBottom: 20,
                                        marginLeft: 30,
                                    }}>와이닷의 모든 서비스(투자 정보, 이벤트, 할인 혜택 등)에 대한 정보를 받아볼 수 있습니다. (동의 철회 시까지)</div>
                                </div>
                            }
                            <input onClick={() => history.push("/login")} type="button" style={{
                                border: 0,
                                width: 400,
                                height: 56,
                                fontSize: 22,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#e78276",
                                marginTop: 20,
                                WebkitAppearance: "none",
                            }} value="다음" />
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
                            <div style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 10,
                            }}>이메일 주소</div>
                            <input id="DID" style={{
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
                            }} placeholder="이메일 주소 입력" />
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
                            <input name="name" onChange={onChange} value={name} id="DPASS" type="password" style={{
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
                            }} placeholder="비밀번호 입력" />
                            <div style={{
                                fontSize: 14,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 10,
                            }}>비밀번호 확인</div>
                            <input name="nickname" onChange={onChange} value={nickname} id="DPASS" type="password" style={{
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
                            }} placeholder="비밀번호 확인" />
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
                                {largeChar ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" /> }
                                <div style={{fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5}}>대문자</div>
                                {number ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" /> }
                                <div style={{fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5}}>숫자</div>
                                {uniqueChar ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" /> }
                                <div style={{fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5}}>특수분자</div>
                                {lengthChar ? <BiCheck size={14} color="#5aca75" /> : <BiCheck size={14} color="#202426" /> }
                                <div style={{fontSize: 14, color: "#202426", marginLeft: 5, marginRight: 5}}>8자리 이상</div>
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
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    )
}