import React, { useState, useEffect, useRef } from "react"
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa"
//모바일 대응
import { useMediaQuery } from 'react-responsive'
import MLoginHeader from "../Mobile";
import { useFirebase, useFirestore, firestoreConnect } from "react-redux-firebase"
import { useHistory } from "react-router-dom"
import CaverExtKAS from "caver-js-ext-kas"
import { Login } from "../Style";

export default function LoginScreen() {
    const chainId = 1001
    const accessKeyId = "KASK8QUCLZUJ1K1YZ9GB2VJ2"
    const secretAccessKey = "BkbIcfQfJuD9IrEZawH3+0ML7uARiyw910cEHiOH"

    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

    //비밀번호 같은지 다른지 확인
    const [differ, setDiffer] = useState(false)

    // Default ID, PASSWORD 값
    // document.getElementById("DID").value
    // document.getElementById("DPASS").value

    // Mobile ID, PASSWORD 값
    // document.getElementById("MID").value
    // document.getElementById("MPASS").value
    const firebase = useFirebase()
    const history = useHistory()
    const firestore = useFirestore()
    async function login() {
        await firebase.login({
            email: document.getElementById("DID").value,
            password: document.getElementById("DPASS").value
        }).then(() => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                firebase.auth().onAuthStateChanged((user) => {

                    history.push("/")
                })
            })
        }).catch(() => {
            setDiffer(true)
        })
    }
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
                            <input id="DID" type="text" style={{
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
                            }} placeholder="아이디" />
                            <input id="DPASS" type="password" style={{
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
                            }} placeholder="비밀번호" />
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
                            <input onClick={login} type="button" style={{
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
                            {/* <div style={{ width: 300, border: "1px solid #d2d3d3", marginBottom: 20 }} />
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
                            }} value="Google" /> */}
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
                            <input id="DID" style={{
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
                            }} placeholder="아이디" />
                            <input id="DPASS" type="password" style={{
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
                            }} placeholder="비밀번호" />
                            <input className="safari-design" type="button" style={{
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
                            {/* <div style={{ width: 300, border: "1px solid #d2d3d3", marginBottom: 20 }} />
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
                            }} value="Google" /> */}
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    )
}