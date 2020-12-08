import React, { useState } from 'react'
import Header, { vm } from '../Style'

export default function SplashScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <>
            <Header splash={true} />
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                backgroundColor: "#ffffff",
                width: 100 * vm,
                height: 540
            }}>
                <img src="src/components/icon/splash.png" alt="" style={{
                    width: 264,
                    height: 400
                }} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: 300,
                    marginLeft: 176
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 300,
                        height: 400
                    }}>
                        <p style={{
                            fontSize: 36,
                            fontWeight: "bold",
                            color: "#202426",
                            textAlign: "left"
                        }}>처음 가지는{'\n'}나만의 크리에이터</p>
                        <p style={{
                            fontSize: 24,
                            color: "#202426",
                            marginTop: 10,
                            textAlign: "left",
                            marginBottom: 30
                        }}>클로즈 베타 테스트 진행중!</p>
                        <input style={{
                            fontSize: 18,
                            opacity: 0.8,
                            color: "#202426",
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            width: 295,
                            borderBottomColor: "#202426",
                            paddingBottom: 10,
                            verticalAlign: "center"
                        }} type="text" name="email" value={email} placeholder="이메일 주소" onChange={({ text }) => setEmail(text)} />
                        <input style={{
                            fontSize: 18,
                            opacity: 0.8,
                            color: "#202426",
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            width: 295,
                            borderBottomColor: "#202426",
                            paddingBottom: 10,
                            marginTop: 10,
                            verticalAlign: "center"
                        }} type="password" name="password" value={password} placeholder="비밀번호" onChange={({ text }) => setPassword(text)} />
                        <div style={{
                            alignSelf: "flex-end",
                            fontSize: 18,
                            opacity: 0.6,
                            color: "#202426",
                            borderWidth: 0,
                            backgroundColor: "#ffffff",
                            textDecorationLine: "underline",
                            margin: 0,
                            marginTop: 10
                        }}>비밀번호를 잊으셨나요?</div>
                        <input style={{
                            width: 300,
                            height: 48,
                            borderRadius: 5,
                            backgroundColor: "#202426",
                            marginTop: 20,
                            fontSize: 16,
                            color: "#ffffff",
                            borderWidth: 0,
                            fontWeight: "bold"
                        }} type="button" value="참여하기" />
                    </div>
                    <input style={{
                        width: 300,
                        height: 26,
                        backgroundColor: "#ffffff",
                        marginTop: 20,
                        fontSize: 16,
                        color: "#e78276",
                        borderWidth: 0,
                    }} type="button" value="비밀번호를 확인해주세요" />
                </div>
            </div>
            <div style={{
                width: 100 * vm,
                backgroundColor: "#efefef",
                paddingTop: 80,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <p style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 40
                }}>클로즈 베타는 다음과 같이 진행됩니다.</p>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                </div>
                <p style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 40
                }}>FAQ</p>
            </div>
        </>
    )
}