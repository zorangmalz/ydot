import React, { useState, useEffect } from 'react'
import Header, { FAQ, CreatorInfo, GuideBox, vh, vw, CloseBeta, BottomTag, TopBanner, InvestDashboard } from '../Style'
import { MBottomTag, MCloseBeta, MCreatorInfo, MFAQ, MHeader, MTopBanner } from '../Mobile'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useHistory } from "react-router-dom"
import CaverExtKAS from "caver-js-ext-kas"
import Slider from "react-slick"

//모바일 대응
import { useMediaQuery } from 'react-responsive'

//클로즈 베타 이미지
import feedback from '../icon/feedback.png'
import auction from '../icon/auction.png'
import moneyBag from '../icon/money-bag.png'
import personalInfo from '../icon/personal-information.png'

//임시 이미지
import Exampleone from '../icon/exampleone.png'
import Exampletwo from '../icon/exampletwo.png'
import Examplethree from '../icon/examplethree.png'
import Examplefour from '../icon/examplefour.png'
import bannericon from "../icon/bannericon.png"
import bannericontwo from "../icon/bannericontwo.png"
import bannericonfour from "../icon/bannericonfour.png"
import bannericonfive from "../icon/bannericonfive.png"
import bannericonsix from "../icon/bannericonsix.png"


export default function SplashScreen() {


    const chainId = 1001
    const accessKeyId = "KASK8QUCLZUJ1K1YZ9GB2VJ2"
    const secretAccessKey = "BkbIcfQfJuD9IrEZawH3+0ML7uARiyw910cEHiOH"

    async function kasTest() {
        const caver = new CaverExtKAS()
        caver.initKASAPI(chainId, accessKeyId, secretAccessKey)
        const account = await caver.kas.wallet.createAccount()
        console.log(account)

        const deployer = caver.wallet.add(
            caver.wallet.keyring.createFromPrivateKey('0xa2a9f4bb9bb176731943b362b40564dc9275d306dccece54d83fa2c03f01d018')
        )
        const kip7 = await caver.kct.kip7.deploy(
            { name: 'Jasmines', symbol: 'JAS', decimals: 18, initialSupply: '100000000000000000' },
            deployer.address
        )
        console.log(`Deployed KIP-7 token contract address: ${kip7.options.address}`)

        console.log(`Token name: ${await kip7.name()}`)
        console.log(`Token symbol: ${await kip7.symbol()}`)
        console.log(`Token decimals: ${await kip7.decimals()}`)
        console.log(`Token totalSupply: ${await kip7.totalSupply()}`)
    }
    useEffect(() => {
        // kasTest()
    }, [])
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

    const login = () => {
        firebase.login({
            email: name,
            password: nickname
        }).then(() => {
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    history.push("/")
                })
            })
        })
    }

    //진행중인 펀딩
    const [items, setItems] = useState([]);
    const firestore = useFirestore()

    useEffect(() => {
        load()
        var date = new Date()
        console.log(date.getTime())
    }, [])

    async function load() {
        var date = new Date()
        console.log(date)
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                if (doc.data().Deadline > date.getTime()) {
                    list.push({
                        id: count,
                        img: "/images/Profile/" + doc.data().channelTitle + "/" + doc.data().channelTitle + "Profile.jpg",
                        name: doc.id,
                        FundingNum: doc.data().FundingNum,
                        FundingTotal: doc.data().FundingAim,
                        percent: doc.data().FundingTotal / doc.data().FundingAim * 100,
                        Deadline: parseInt((doc.data().Deadline - date.getTime()) / 86400000),
                        fundingAim: doc.data().FundingAim,
                        sector: doc.data().sector,
                        sort: doc.data().sort
                    })
                    count = count + 1
                }
            })
            setItems(list)
        })
    }

    const now = new Date().getDate()
    return (
        <div>
            <Default>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    overflowY: "scroll"
                }}>
                    <Header bold="Home" />
                    <div style={{
                        width: "100vw",
                        minWidth: 1060,
                        height: 418,
                        margin: 0,
                    }}>
                        <Slider dotsClass="desktop-slick-dots" dots={true} autoplaySpeed={5000} autoplay={true} slidesToShow={1} slidesToScroll={1} adaptiveHeight={true}>
                            <TopBanner
                                img={bannericon}
                                title="크리에이터 크라우드 펀딩 플랫폼"
                                content="Y.은 무슨 서비스인지 알아볼까요?"
                                num={1}
                                backgroundColor="#273d5a"
                            />
                            <TopBanner
                                img={bannericontwo}
                                title="Day 1 크라우드 펀딩"
                                content="크라우드 펀딩에 관한 모든것들을 정리해뒀어요."
                                num={2}
                                backgroundColor="#787ff6"
                            />
                            <TopBanner
                                img={bannericon}
                                title="Day 2~7 리워드 수령기간"
                                content="리워드는 어떻게 받는거죠?"
                                num={3}
                                backgroundColor="#329d9c"
                            />
                            <TopBanner
                                img={bannericonfour}
                                title="내가 투자 좀 잘한다 하시는분?"
                                content="조랑말배 수익률 대회 진행중!"
                                num={4}
                                backgroundColor="#98c773"
                            />
                            <TopBanner
                                img={bannericonfive}
                                title="테스터님들의 목소리를 들려주세요!"
                                content="질문과 피드백은 언제든 환영입니다."
                                num={5}
                                backgroundColor="#7097ab"
                            />
                            <TopBanner
                                img={bannericonsix}
                                title="소개해주실 크리에이터가 있나요?"
                                content="저희와 함께할 첫번째 크리에이터님을 찾습니다."
                                num={6}
                                backgroundColor="#93de8c"
                            />
                        </Slider>
                    </div>
                    {now >= 5 ?
                        <>
                            <div style={{
                                fontSize: 21,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 40,
                                marginTop: 80,
                            }}>리워드 Top 10</div>
                            <div style={{
                                width: 840,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}>
                                <div style={{
                                    width: 840,
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",

                                    fontSize: 18,
                                    opacity: 0.6,
                                    color: "#202426",
                                    textAlign: "left"
                                }}>
                                    <div style={{width: 90, marginLeft: 25}}>순위</div>
                                    <div style={{width: 140, marginLeft: 20}}>이름</div>
                                    <div style={{width: 180, marginLeft: 20}}>총 펀딩금액</div>
                                    <div style={{width: 140, marginLeft: 20}}>누적 리워드</div>
                                    <div style={{width: 160, marginLeft: 20}}>포트폴리오</div>
                                </div>
                                <InvestDashboard />
                            </div>
                        </>
                        :
                        <>
                            <div style={{
                                fontSize: 21,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 40,
                                marginTop: 40,
                            }}>진행중인 펀드</div>
                            <div className="grid-container">
                                {items.map(element =>
                                    <CreatorInfo
                                        img={element.img}
                                        name={element.name}
                                        FundingNum={element.FundingNum}
                                        percent={element.percent}
                                        Deadline={element.Deadline}
                                        sort={element.sort}
                                        sector={element.sector}
                                        fundingAim={element.fundingAim}
                                    />
                                )}
                            </div>
                            <div style={{
                                fontSize: 21,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 40,
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
                                        img={feedback}
                                        title="피드백은 언제나 환영입니다!"
                                        content="잘 안되는 부분이 있나요? 마음에 안드는 부분이 있나요?
                    언제든 이야기해주세요! 최대한 빠르게 고치고 좋은 서비스를 만들겠습니다."
                                    />
                                </div>
                            </div>
                            <div style={{
                                cursor: "pointer",
                                background: "#ffffff",
                                width: 300,
                                height: 48,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                                verticalAlign: "center",
                                marginTop: 44,
                                marginBottom: 40,
                                border: "2px solid #E78276",
                                borderRadius: 10,
                            }}>
                                <a href="https://www.notion.so/ydot/Y-7bee7114ad5847f39bdca5a3de935a8f" style={{
                                    textDecorationLine: "none",
                                    color: "#E78276",
                                }}>자세한 정보를 확인해보세요!</a>
                            </div>
                        </>
                    }
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
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        height: 250,
                        margin: 0,
                    }}>
                        <Slider dotsClass="mobile-slick-dots" dots={true} autoplaySpeed={5000} autoplay={true} slidesToShow={1} slidesToScroll={1} adaptiveHeight={true}>
                            <MTopBanner
                                img={bannericon}
                                title="크리에이터 크라우드 펀딩 플랫폼"
                                content="Y.은 무슨 서비스인지 알아볼까요?"
                                backgroundColor="#273d5a"
                            />
                            <MTopBanner
                                img={bannericontwo}
                                title="Day 1 크라우드 펀딩"
                                content="크라우드 펀딩에 관한 모든것들을 정리해뒀어요."
                                backgroundColor="#787ff6"
                            />
                            <MTopBanner
                                img={bannericon}
                                title="Day 2~7 리워드 수령기간"
                                content="리워드는 어떻게 받는거죠?"
                                backgroundColor="#329d9c"
                            />
                            <MTopBanner
                                img={bannericonfour}
                                title="내가 투자 좀 잘한다 하시는분?"
                                content="조랑말배 수익률 대회 진행중!"
                                backgroundColor="#98c773"
                            />
                            <MTopBanner
                                img={bannericonfive}
                                title="테스터님들의 목소리를 들려주세요!"
                                content="질문과 피드백은 언제든 환영입니다."
                                backgroundColor="#7097ab"
                            />
                            <MTopBanner
                                img={bannericonsix}
                                title="소개해주실 크리에이터가 있나요?"
                                content="저희와 함께할 첫번째 크리에이터님을 찾습니다."
                                backgroundColor="#93de8c"
                            />
                        </Slider>
                    </div>
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
                        <div className="mobile-grid-container">
                            {items.map(element =>
                                <MCreatorInfo
                                    img={element.img}
                                    name={element.name}
                                    FundingNum={element.FundingNum}
                                    percent={element.percent}
                                    Deadline={element.Deadline}
                                    sort={element.sort}
                                    sector={element.sector}
                                    fundingAim={element.fundingAim}
                                />
                            )}
                        </div>
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
                            img={feedback}
                            title="피드백은 언제나 환영입니다!"
                            content="잘 안되는 부분이 있나요? 마음에 안드는 부분이 있나요?
                    언제든 이야기해주세요! 최대한 빠르게 고치고 좋은 서비스를 만들겠습니다."
                        />
                    </div>
                    <div style={{
                        cursor: "pointer",
                        background: "#ffffff",
                        width: 300,
                        height: 48,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: "bold",
                        textAlign: "center",
                        verticalAlign: "center",
                        marginTop: 44,
                        marginBottom: 40,
                        border: "2px solid #E78276",
                        borderRadius: 10,
                    }}><a href="https://www.notion.so/ydot/Y-7bee7114ad5847f39bdca5a3de935a8f" style={{
                        textDecorationLine: "none",
                        color: "#E78276",
                    }}>자세한 정보를 확인해보세요!</a></div>
                    <MBottomTag />
                </div>
            </Mobile>
        </div>
    )
}