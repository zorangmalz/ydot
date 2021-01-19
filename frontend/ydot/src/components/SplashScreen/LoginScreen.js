import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom';
import { useFirebase, useFirestore } from "react-redux-firebase"
import NaverLogin from "react-login-by-naver"

//아이콘 및 디자인
import { FaUserCircle } from "react-icons/fa"
import { BsCheck } from 'react-icons/bs'
import { Login } from "../Style";
import MLoginHeader from "../Mobile";


//모바일 대응
import { useMediaQuery } from 'react-responsive'

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

    //이메일 유효
    const [valid, setValid] = useState(false)

    //아이디 저장
    const [idSave, setIdSave] = useState(false)
    const saveCheck = idSave ? <BsCheck size={18} color="#202426" /> : <></>

    //비밀번호 같은지 다른지 확인
    const [differ, setDiffer] = useState(false)
    
    const firebase = useFirebase()
    const history = useHistory()
    const firestore = useFirestore()
    async function login() {
        await firebase.login({
            email: document.getElementById("DID").value,
            password: document.getElementById("DPASS").value
        }).then(() => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                firebase.auth().onAuthStateChanged((user) => {

                    history.push("/")
                })
            })
        }).catch(() => {
            setDiffer(true)
        })
    }
    // async function googleLogin(){
    //     await firebase.login({
    //         provider:"google",
    //         type:"popup"
    //     }).then(()=>{
    //         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    //             firebase.auth().onAuthStateChanged((user) => {

    //                 history.push("/")
    //             })
    //         })
    //     }).catch(() => {
    //         setDiffer(true)
    //     })
    // }
    // const {Kakao}=window
    // var kakaoAuth = firebase.functions().httpsCallable("kakaoCustomAuth");
    // function kakaoLogin(){
 
    //         Kakao.Auth.login({
    //             success:function(authObj){
    //                 console.log(authObj)
    //                 kakaoAuth({ token: authObj.access_token }).then(function (res) {
    //                     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
    //                         firebase.auth().onAuthStateChanged((user) => {
            
    //                             history.push("/")
    //                         })
    //                     })
    //                   }).catch(err => {
    //                console.log(err)   
    //                   })
                   
    //             }
    //         })
        
    // }


    // async function getWallet(user){
    //     var wallet


    //     await firestore.collection("User").doc(user.uid).get().then(doc=>{
    //         if(doc.data().wallet){
    //             wallet=false
    //         }else{
    //             wallet=true
    //         }
    //     }).catch(
    //         wallet=true
    //     )  

    //     if(wallet){
    //         console.log("no wallet , make wallet")
    //         var account = await kas()

    //         firestore.collection("User").doc(user.uid).set({
    //             wallet:account.address,
    //             email:document.getElementById("DID").value,
    //         uid:user.uid,
    //         totalMoney:1000000
    //         })
    //         }else{
    //             console.log("?")
    //         }
    //     }


    // async function kas(){
    //     const caver = new CaverExtKAS()
    //     caver.initKASAPI(chainId, accessKeyId, secretAccessKey)
    //     const account = await caver.kas.wallet.createAccount()
    //     console.log(account)
    //     return account
    // }

    // const [userData, setUserData] = useState()
    // const NaverLogin = () => {
    //     Naver()
    //     UserProfile()
    // }
    // const { naver } = window;
    // const Naver = () => {
    //     const naverLogin = new naver.LoginWithNaverId({
    //         clientId: "niz7fq7bMSOMVInWyV3w",
    //         callbackUrl: "http://localhost:3000",
    //         isPopup: false,
    //         loginButton: { color: "green", type: 1, height: 30 },
    //         callbackHandle: true
    //     });
    //     naverLogin.init();
    // }
    // const UserProfile = () => {
    //     window.location.href.includes('access_token') && GetUser();
    //     function GetUser() {
    //       const location = window.location.href.split('=')[1];
    //       const token = location.split('&')[0];
    //       console.log("token: ", token);
    //       fetch(`${API}/account/sign-in` , {
    //         method: "GET",
    //         headers : {
    //           "Content-type" : "application/json",
    //           "Authorization": token
    //         },
    //       })
    //       .then(res => res.json())
    //       .then(res => {
    //         localStorage.setItem("access_token", res.token);
    //         setUserData({
    //           nickname : res.nickname,
    //           image : res.image
    //         })
    //       })
    //       .catch(err => console.log("err : ", err));
    //     }
    //   };

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
                    {differ ? <Login setVisible={setDiffer} /> : <></>}
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
                            }}>로그인</div>
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
                            <input id="DPASS" type="password" style={{
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
                                width: 400,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 20,
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <div onClick={() => setIdSave(!idSave)} style={{
                                        width: 18,
                                        height: 18,
                                        border: "1px solid #4c4f51",
                                        cursor: "pointer",
                                        backgroundColor: "#ffffff",
                                        marginRight: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>{saveCheck}</div>
                                    <div style={{
                                        fontSize: 14,
                                        color: "#4c4f51"
                                    }}>아이디 저장</div>
                                </div>
                                <input type="button" style={{
                                    border: 0,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    outline: 0,
                                    color: "#4c4f51",
                                    backgroundColor: "#ffffff",
                                    textDecorationLine: "underline",
                                    textAlign: "right",
                                    WebkitAppearance: "none",
                                }} value="아이디/비밀번호를 잊으셨나요?" />
                            </div>
                            <input onClick={login} type="button" style={{
                                border: 0,
                                width: 400,
                                height: 56,
                                fontSize: 22,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#e78276",
                                marginBottom: differ ? 10 : 20,
                                WebkitAppearance: "none",
                            }} value="로그인" />
                            <div style={{
                                width: 400,
                                height: 1.5,
                                backgroundColor: "#202426",
                                opacity: 0.2,
                                marginTop: 20,
                                marginBottom: 20
                            }} />
                            <NaverLogin 
                                clientId="niz7fq7bMSOMVInWyV3w"
                                callbackUrl="http://localhost:3000"
                                render={(props) => <input onClick={props.onClick} type="button" style={{
                                    border: 0,
                                    width: 400,
                                    height: 56,
                                    fontSize: 22,
                                    borderRadius: 10,
                                    cursor: "pointer",
                                    outline: 0,
                                    color: "#ffffff",
                                    backgroundColor: "#1ec800",
                                    marginBottom: 20,
                                    fontWeight: "normal",
                                    WebkitAppearance: "none"
                                }} value="네이버로 로그인" />}
                                onSuccess={(naverUser) => console.log(naverUser + "나 여기 잇어요 이게 뜨는지 모르겠다")}
                                onFailure={() => console.error("오류")}
                            />
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
                                fontWeight: "normal",
                                WebkitAppearance: "none"
                            }} value="페이스북으로 로그인" />
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
                                fontWeight: "normal",
                                WebkitAppearance: "none"
                            }} value="Kakao talk 로그인" />
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
                                fontWeight: "normal",
                                WebkitAppearance: "none"
                            }} value="Google로 로그인" />
                            <div style={{
                                fontSize: 14,
                                color: "#4c4f51",
                                textAlign: "center",
                                width: 400,
                            }}>아직 회원이 아니신가요? <div onClick={() => history.push("/signup")} style={{display: "inline-block", color: "#e78276", textDecorationLine: "underline", cursor: "pointer"}}>회원가입</div></div>
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
                    {differ ? <Login setVisible={setDiffer} /> : <></>}
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
                                marginBottom: 40
                            }}>로그인</div>
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
                                marginBottom: 20,
                                WebkitAppearance: "none",
                            }} placeholder="비밀번호 입력" />
                            <div style={{
                                width: 300,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: 20,
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <div onClick={() => setIdSave(!idSave)} style={{
                                        width: 18,
                                        height: 18,
                                        border: "1px solid #4c4f51",
                                        cursor: "pointer",
                                        backgroundColor: "#ffffff",
                                        marginRight: 10,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}>{saveCheck}</div>
                                    <div style={{
                                        fontSize: 14,
                                        color: "#4c4f51"
                                    }}>아이디 저장</div>
                                </div>
                                <input type="button" style={{
                                    border: 0,
                                    fontSize: 14,
                                    cursor: "pointer",
                                    outline: 0,
                                    color: "#4c4f51",
                                    backgroundColor: "#ffffff",
                                    textDecorationLine: "underline",
                                    textAlign: "right",
                                    WebkitAppearance: "none",
                                }} value="아이디/비밀번호를 잊으셨나요?" />
                            </div>
                            <input className="safari-design" onClick={login} type="button" style={{
                                border: 0,
                                width: 300,
                                height: 48,
                                fontSize: 14,
                                borderRadius: 10,
                                cursor: "pointer",
                                outline: 0,
                                color: "#ffffff",
                                backgroundColor: "#e78276",
                            }} value="로그인" />
                            <div style={{
                                width: 300,
                                height: 1.5,
                                backgroundColor: "#202426",
                                opacity: 0.2,
                                marginTop: 20,
                                marginBottom: 20
                            }} />
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
                                fontSize: 14,
                                color: "#4c4f51",
                                textAlign: "center",
                                width: 300,
                            }}>아직 회원이 아니신가요? <div onClick={() => history.push("/signup")} style={{display: "inline-block", color: "#e78276", textDecorationLine: "underline", cursor: "pointer"}}>회원가입</div></div>
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    )
}