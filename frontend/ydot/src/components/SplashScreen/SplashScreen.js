import React, { useState, useEffect } from 'react'
import Header, { FAQ, CreatorInfo, GuideBox, vh, vw, CloseBeta, BottomTag, TopBanner } from '../Style'
import { useFirebase, useFirestore } from "react-redux-firebase"
// import fire from '../../fbase'
import { useHistory } from "react-router-dom"

//모바일 대응
import { useMediaQuery } from 'react-responsive'

//클로즈 베타 이미지
import fan from '../icon/fan.png'
import auction from '../icon/auction.jpg'
import moneyBag from '../icon/money-bag.jpg'
import personalInfo from '../icon/personal-information.jpg'

//임시 이미지
import Exampleone from '../icon/exampleone.png'
import Exampletwo from '../icon/exampletwo.png'
import Examplethree from '../icon/examplethree.png'
import Examplefour from '../icon/examplefour.png'
import { MBottomTag, MCloseBeta, MCreatorInfo, MFAQ, MHeader, MTopBanner } from '../Mobile'

export default function SplashScreen() {
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

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

    const [one, setOne] = useState(true)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)

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

    //진행중인 펀딩
    const [items, setItems] = useState([]);
    const firestore = useFirestore()

    useEffect(() => {
        load()
    }, [])

    async function load() {
        var date = new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                list.push({
                    img: count === 1 ? Exampleone : count === 2 ? Exampletwo : count === 3 ? Examplethree : Examplefour,
                    name: doc.id === "[Vlog] 지순's 일상" ? "Pood" : doc.id,
                    FundingNum: doc.data().FundingNum,
                    FundingTotal: doc.data().FundingAim,
                    percent: doc.data().FundingTotal / doc.data().FundingAim * 100,
                    Deadline: parseInt((doc.data().Deadline - date.getTime()) / 86400000)
                })
                count = count + 1
            })
            setItems(list)
        })
    }
    return (
        <div>
            <Default>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    overflow: "auto",
                }}>
                    <Header bold="Home" />
                    <TopBanner />
                    <div style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 40,
                        marginTop: 40,
                    }}>진행중인 펀드</div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        minWidth: 1060,
                        width: "56vw",
                    }}>
                        {items.map(element =>
                            <CreatorInfo
                                img={element.img}
                                name={element.name}
                                FundingNum={element.FundingNum}
                                percent={element.percent}
                                Deadline={element.Deadline}
                            />
                        )}
                    </div>
                    <div style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 40,
                        marginTop: 40,
                    }}>클로즈 베타는 다음과 같이 진행됩니다.</div>
                    <div style={{
                        width: "56vw",
                        minWidth: 1060,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <CloseBeta
                                img={personalInfo}
                                title="크리에이터 정보 확인"
                                content="크리에이터 소개와 성장률, 예상 배당에 대한 정보를 꼼꼼히 
                    읽어보세요. 각 분야의 크리에이터들은 각기 다른 성장률을 
                    가지고 있습니다. 마음에 드는 크리에이터에게 펀딩해 보세요."
                            />
                            <CloseBeta
                                img={auction}
                                title="크라우드 펀딩 참여"
                                content="투자하고 싶은 크리에이터에 펀딩을 진행해보세요. 
                    각 크리에이터의 토큰 개수는 한정적입니다. 또한 목표액 100%에 도달하면 펀딩을 할 수 없습니다.
                    빠르게 마음에 드는 크리에이터를 선점하세요!"
                            />
                        </div>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 40,
                        }}>
                            <CloseBeta
                                img={moneyBag}
                                title="토큰 및 리워드 수령"
                                content="크라우드 펀딩이 성공하면 토큰을 수령받습니다. 일정기간이 지난이후 약속한 기간동안 크리에이터 채널 수익의 일부를 리워드로 수령할 수 있습니다. 이번 베타 테스트에서는 하루를 한달로 잡고 6일동안 리워드를 수령합니다."
                            />
                            <CloseBeta
                                img={fan}
                                title="피드백은 언제나 환영입니다!"
                                content="잘 안되는 부분이 있나요? 마음에 안드는 부분이 있나요?
                    언제든 이야기해주세요! 최대한 빠르게 고치고 좋은 서비스를 만들겠습니다."
                            />
                        </div>
                    </div>
                    <div style={{
                        width: "100vw",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <p style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "#202426",
                            marginTop: 40,
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
                            textAlign: "right",
                            fontSize: 16,
                            minWidth: 1060,
                            width: "56vw",
                            color: "#202426",
                            textDecorationLine: "underline",
                            marginTop: 20,
                            marginBottom: 40,
                            outline: 0,
                            cursor: "pointer",
                            backgroundColor: "#ffffff",
                            border: 0,
                        }} value="더 궁금한 질문이 있으신가요?" />
                    </div>
                    <BottomTag />
                </div>
            </Default>
            <Mobile>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                }}>
                    <MHeader bold="Home" />
                    <MTopBanner />
                    <div style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 20,
                        marginTop: 40,
                    }}>진행중인 펀드</div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 300,
                        width: "100vw",
                    }}>
                        {items.map(element =>
                            <MCreatorInfo
                                img={element.img}
                                name={element.name}
                                FundingNum={element.FundingNum}
                                percent={element.percent}
                                Deadline={element.Deadline}
                            />
                        )}
                    </div>
                    <div style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 40,
                        marginTop: 40,
                        width: "90vw",
                        textAlign: "center"
                    }}>클로즈 베타는 다음과 같이 진행됩니다.</div>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <MCloseBeta
                            img={personalInfo}
                            title="크리에이터 정보 확인"
                            content="크리에이터 소개와 성장률, 예상 배당에 대한 정보를 꼼꼼히 
                    읽어보세요. 각 분야의 크리에이터들은 각기 다른 성장률을 
                    가지고 있습니다. 마음에 드는 크리에이터에게 펀딩해 보세요."
                        />
                        <MCloseBeta
                            img={auction}
                            title="크라우드 펀딩 참여"
                            content="투자하고 싶은 크리에이터에 펀딩을 진행해보세요. 
                    각 크리에이터의 토큰 개수는 한정적입니다. 또한 목표액 100%에 도달하면 펀딩을 할 수 없습니다.
                    빠르게 마음에 드는 크리에이터를 선점하세요!"
                        />
                        <MCloseBeta
                            img={moneyBag}
                            title="토큰 및 리워드 수령"
                            content="크라우드 펀딩이 성공하면 토큰을 수령받습니다. 일정기간이 지난이후 약속한 기간동안 크리에이터 채널 수익의 일부를 리워드로 수령할 수 있습니다. 이번 베타 테스트에서는 하루를 한달로 잡고 6일동안 리워드를 수령합니다."
                        />
                        <MCloseBeta
                            img={fan}
                            title="피드백은 언제나 환영입니다!"
                            content="잘 안되는 부분이 있나요? 마음에 안드는 부분이 있나요?
                    언제든 이야기해주세요! 최대한 빠르게 고치고 좋은 서비스를 만들겠습니다."
                        />
                    </div>
                    <div style={{
                        width: "100vw",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <p style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "#202426",
                            marginTop: 40,
                            marginBottom: 40,
                        }}>FAQ</p>
                        <MFAQ value={one} title="Q1. 어떤 크리에이터가 참여하나요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸",
                            "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                            onClick={() => setOne(!one)}
                        />
                        <MFAQ value={two} title="Q2. 참여 혜택은 무엇인가요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", 
                            "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                            onClick={() => setTwo(!two)}
                        />
                        <MFAQ value={three} title="Q3. 배당권 가격은 어떻게 책정되나요?(CPM=2)" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", 
                            "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                            onClick={() => setThree(!three)}
                        />
                        <MFAQ value={four} title="Q4. 투자 손실은 언제 일어나나요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", 
                            "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                            onClick={() => setFour(!four)}
                        />
                        <MFAQ value={five} title="Q5. 경매에서 배당권을 낙찰받지 못하면 어떻게 되나요?" content={["투자 대상 크리에이터는 유튜브에서 활동하고 있는 다양한 크리에이터 데이터를 기반으로 만들어낸", 
                            "가상의 크리에이터 입니다. 음식, 여행/Vlog, 애견 분야의 크리에이터 3명을 대상으로 투자를 진행하게 됩니다."]}
                            onClick={() => setFive(!five)}
                        />
                        <input type="button" style={{
                            textAlign: "right",
                            fontSize: 16,
                            minWidth: 300,
                            width: "90vw",
                            color: "#202426",
                            textDecorationLine: "underline",
                            marginTop: 20,
                            marginBottom: 40,
                            outline: 0,
                            cursor: "pointer",
                            backgroundColor: "#ffffff",
                            border: 0,
                        }} value="더 궁금한 질문이 있으신가요?" />
                    </div>
                    <MBottomTag />
                </div>
            </Mobile>
        </div>
    )
}