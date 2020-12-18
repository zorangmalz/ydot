import React, { useState, useEffect } from 'react'
import Header, { FAQ, GuideBox, vh, vw } from '../Style'
import { useFirebase } from "react-redux-firebase"
// import fire from '../../fbase'
import { useHistory } from "react-router-dom"
import splash from '../icon/splash.png'
export default function SplashScreen() {
    const history = useHistory()
    const firebase = useFirebase()
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    })
    const { name, nickname } = inputs
    const onChange = (e) => {
        const { name, value } = e.target
        const nextInputs = {
            ...inputs,
            [name]: value,
        }
        setInputs(nextInputs)
    }

    const firstguide = {
        title: "크리에이터 정보 확인",
        content: ["크리에이터 소개와 성장률, 예상 배당에 대한 정보를 꼼꼼히", <br />, "읽어보세요. 각 분야의 크리에이터들은 각기 다른 성장률을", <br />, "가지고 있습니다. 경쟁 크리에이터들과 비교해 투자할", <br />, "크리에이터를 선정해 보세요"],
        button: "크리에이터 정보",
        center: false
    }
    const twoguide = {
        title: "배당권 입찰",
        content: ["모든 모의 투자자에게는 10만원이 지급됩니다.", <br />, "구매하려는 배당권의 개수와 가격을 적어 경매에", <br />, "참여합니다. 제일 높은 입찰가부터 낙찰이 진행되며,", <br />, "다른 참여자의 입찰가는 호가창에 표시됩니다."],
        button: "역경매 가이드",
        center: true
    }
    const threeguide = {
        title: "배당권 낙찰 & 배당 수령",
        content: ["배당권에 낙찰되면 경매가 끝난 후 배당권을 수령합니다.", <br />, "3개월간 타 투자자와 배당권을 거래할 수 있습니다.", <br />, "배당권을 보유한 유저는 배당을 받을 수 있으며,", <br />, "배당은 조회수 기반으로 산출됩니다. (월별 조회수 *2 ₩)"],
        button: "배당권 거래 가이드",
        center: false
    }

    const [one, setOne] = useState(true)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)
    const [test, setTest] = useState("")
    // useEffect(()=>{
    //     fire.firestore().collection("User").doc("userA").get().then(doc=>{
    //         setTest(doc.data().name)
    //         console.log(doc.data().name)
    //     })
    // })
    useEffect(() => {
        console.log(nickname)
    }, [nickname])
    const login = () => {
        firebase.login({
            email: name,
            password: nickname
        }).then(() => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    history.push("/home")
                })
            })
        })


    }
    return (
        <>
            <Header splash={true} />
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                backgroundColor: "#F5F5F5",
                width: 100 * vw,
                height: 470,
                paddingTop: 40
            }}>
                <img src={splash} style={{
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
                        }}>처음 가지는 <br />나만의 크리에이터</p>
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
                            verticalAlign: "center",
                            backgroundColor: "#F5F5F5",
                            outline: 0
                        }} type="text" name="name" placeholder="이메일 주소" onChange={onChange} value={name} />
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
                            verticalAlign: "center",
                            backgroundColor: "#F5F5F5",
                            outline: 0
                        }} type="password" name="nickname" placeholder="비밀번호" onChange={onChange} value={nickname} />
                        <input type="button" style={{
                            outline: 0,
                            cursor: "pointer",
                            alignSelf: "flex-end",
                            fontSize: 18,
                            opacity: 0.6,
                            color: "#202426",
                            borderWidth: 0,
                            backgroundColor: "#ffffff",
                            textDecorationLine: "underline",
                            margin: 0,
                            marginTop: 10
                        }} value="비밀번호를 잊으셨나요?" />
                        <input onClick={login} style={{
                            cursor: "pointer",
                            outline: 0,
                            width: 300,
                            height: 48,
                            borderRadius: 5,
                            backgroundColor: "#202426",
                            marginTop: 20,
                            fontSize: 16,
                            color: "#ffffff",
                            borderWidth: 0,
                            fontWeight: "bold",
                            textDecorationLine: "none"
                        }} type="button" value="참여하기" />
                    </div>
                    <input style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 200,
                        height: 26,
                        alignSelf: "center",
                        backgroundColor: "#ffffff",
                        marginTop: 20,
                        fontSize: 16,
                        color: "#e78276",
                        borderWidth: 0,
                        backgroundColor: "#F5F5F5"
                    }} type="button" value="비밀번호를 확인해주세요" />
                </div>
            </div>
            <div style={{
                width: 100 * vw,
                backgroundColor: "#ffffff",
                paddingTop: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                {/* <p style={{
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
                    <GuideBox
                        icon={<img src="../icon/personal-information.jpg" width={100} height={100} style={{ alignSelf: "center" }} />}
                        title={firstguide.title}
                        content={firstguide.content}
                        button={firstguide.button}
                        center={firstguide.content}
                    />
                    <GuideBox
                        icon={<img src="../icon/auction.jpg" width={100} height={100} style={{ alignSelf: "center" }} />}
                        title={twoguide.title}
                        content={twoguide.content}
                        button={twoguide.button}
                        center={twoguide.content}
                    />
                    <GuideBox
                        icon={<img src="../icon/money-bag.jpg" width={100} height={100} style={{ alignSelf: "center" }} />}
                        title={threeguide.title}
                        content={threeguide.content}
                        button={threeguide.button}
                        center={threeguide.content}
                    />
                </div> */}
                <p style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 40,
                }}>FAQ</p>
                <FAQ value={one} title="Q1. 어떤 크리에이터가 참여하나요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", <br />,
                    "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                    onClick={() => setOne(!one)}
                />
                <FAQ value={two} title="Q2. 참여 혜택은 무엇인가요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", <br />,
                    "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                    onClick={() => setTwo(!two)}
                />
                <FAQ value={three} title="Q3. 배당권 가격은 어떻게 책정되나요?(CPM=2)" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", <br />,
                    "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                    onClick={() => setThree(!three)}
                />
                <FAQ value={four} title="Q4. 투자 손실은 언제 일어나나요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", <br />,
                    "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                    onClick={() => setFour(!four)}
                />
                <FAQ value={five} title="Q5. 경매에서 배당권을 낙찰받지 못하면 어떻게 되나요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", <br />,
                    "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                    onClick={() => setFive(!five)}
                />
                <input type="button" style={{
                    alignSelf: "flex-end",
                    fontSize: 18,
                    color: "#202426",
                    textDecorationLine: "underline",
                    marginBottom: 12.5 * vh,
                    outline: 0,
                    cursor: "pointer",
                    backgroundColor: "#ffffff",
                    border: 0,
                }} value="더 궁금한 질문이 있으신가요?" />
            </div>
            <div style={{
                width: 56 * vw,
                height: 150,
                paddingLeft: 22 * vw,
                paddingRight: 22 * vw,
                backgroundColor: "#202426",
                paddingTop: 27,
                paddingBottom: 26,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
            }}>
                <div style={{
                    fontSize: 60,
                    fontWeight: "bold",
                    lineHeight: 1.37,
                    color: "#f5f4f4",
                    lineHeight: 1.37,
                    marginRight: 55
                }}>Y.</div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}>
                    <div style={{ fontSize: 14, color: "#ffffff", marginBottom: 7 }}>주식회사 조랑말즈</div>
                    <div style={{ fontSize: 14, color: "#ffffff", marginBottom: 7 }}>대표자 : 김현명</div>
                    <div style={{ fontSize: 14, color: "#ffffff", marginBottom: 7 }}>주소 : 서울특별시 종로구 창경궁로 1길 35-38 킹고스타트업 스페이스 306호</div>
                    <div style={{ fontSize: 14, color: "#ffffff" }}>연락처 : 010-4337-6607</div>
                </div>
            </div>
        </>
    )
}