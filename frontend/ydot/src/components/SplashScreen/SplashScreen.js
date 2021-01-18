import React, { useState, useEffect } from 'react'
import Header, { CreatorInfo, CloseBeta, BottomTag, TopBanner, InvestDashboard, NewCreatorInfo, YdotCard, NowCard } from '../Style'
import { MBottomTag, MCloseBeta, MCreatorInfo, MHeader, MTopBanner, MNowCard, MYdotCard } from '../Mobile'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useHistory } from "react-router-dom"
import CaverExtKAS from "caver-js-ext-kas"
import Slider from "react-slick"
import { useSelector } from "react-redux";

//모바일 대응
import { useMediaQuery } from 'react-responsive'

//icon
import { BsArrowRightShort } from "react-icons/bs"

//임시 이미지
import bannericon from "../icon/bannericon.png"
import bannericontwo from "../icon/bannericontwo.png"
import bannericonfour from "../icon/bannericonfour.png"
import bannericonfive from "../icon/bannericonfive.png"
import bannericonsix from "../icon/bannericonsix.png"
import ydoticon from "../icon/ydoticon.png"
import nowcardexample from "../icon/nowcardexample.png"
import nowcardicon from "../icon/nowcardicon.png"

import axios from "axios"

export default function SplashScreen() {


    async function iam() {
        try {
            let result = await axios({
                url: "https://api.iamport.kr/users/getToken",
                method: "post", // POST method
                headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
                data: {
                    imp_key: "1351325662487144", // REST API키
                    imp_secret: "sw52uUZEevQyNobtGFhnNHOuRAeuZ97sGdua8tPmYGVM46gLMx8zfX46yiBxsI08Vvj4Z8qYOlKTs0Ee" // REST API Secret
                }
            })
            console.log(result.data.response.access_token)
            let bank = await axios({
                url: "https://api.iamport.kr/vbanks/holder",
                method: "get",
                headers: {
                    "Content-Type": "application/json", // "Content-Type": "application/json"
                    "Authorization": "Bearer " + result.data.response.access_token // 발행된 액세스 토큰
                },
                params: {
                    "bank_code": "011",
                    "bank_num": "74301656029176"
                }
            })

            console.log(bank)
            let createBank = await axios({
                url: "https://api.iamport.kr/vbanks/holder",
                method: "post",
                headers: {
                    "Content-Type": "application/json", // "Content-Type": "application/json"
                    "Authorization": "Bearer " + result.data.response.access_token // 발행된 액세스 토큰
                },
                params: {
                    "merchant_uid": "imp61776496",
                    "amount": "10000",
                    "vbank_code": "011",
                    "vbank_due": "100000000000",
                    "vbank_holder": "정선웅"
                }
            })
            console.log(createBank)
        } catch (err) {
            console.log(err)
        }


    }

    const { uid } = useSelector((state) => state.firebase.auth);
    const chainId = 1001
    const accessKeyId = "KASK8QUCLZUJ1K1YZ9GB2VJ2"
    const secretAccessKey = "BkbIcfQfJuD9IrEZawH3+0ML7uARiyw910cEHiOH"

    async function kasTest() {
        const caver = new CaverExtKAS()
        caver.initKASAPI(chainId, accessKeyId, secretAccessKey)
        const account = await caver.kas.wallet.createAccount()
        // console.log(account)
        // const deployer = caver.wallet.add(
        //     caver.wallet.keyring.createFromPrivateKey('0xa2a9f4bb9bb176731943b362b40564dc9275d306dccece54d83fa2c03f01d018')
        // )
        // const kip7 = await caver.kct.kip7.deploy(
        //     { name: 'Jasmines', symbol: 'JAS', decimals: 18, initialSupply: '100000000000000000' },
        //     deployer.address
        // )
    }
    useEffect(() => {
        // kasTest()
        // iam()
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
    function logout() {
        firebase.logout()
        alert("로그아웃 되었습니다")
    }

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
    }, [])

    async function load() {
        var date = new Date()
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
    const [itemss, setItemss] = useState([])
    useEffect(() => {

        firestore.collection("User").orderBy("totalMoney", "desc").limit(30).onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                if (doc.data().totalFundingPrice) {
                    list.push({
                        totalMoney: doc.data().totalMoney,
                        totalFundingPrice: doc.data().totalFundingPrice,
                        accumulatedAllocation: doc.data().accumulatedAllocation,
                        email: doc.data().email,
                        rank: count,
                        uid: doc.data().uid,
                        name: doc.data().name
                    })
                }
                else {
                    list.push({
                        totalMoney: doc.data().totalMoney,
                        totalFundingPrice: 0,
                        accumulatedAllocation: 0,
                        email: doc.data().email,
                        rank: count,
                        uid: doc.data().uid,
                        name: doc.data().name
                    })
                }
                count = count + 1
            })
            setItemss(list)
        })
    }, [])
    // const now = new Date().getDate()
    return (
        <div>
            <Default>
                <div style={{
                    position: "fixed",
                    top: 0,
                    zIndex: 3,
                    borderBottom: "1px solid #D2D3D3",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    width: "100vw",
                    minWidth: 1280,
                    height: 80,
                }}>
                    <Header bold="Home" />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    overflowY: "scroll",
                    marginTop: 80,
                }}>
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
                                link="https://www.notion.so/Y-8c0b0039ca7d46f5ac44fba959e55ffe"
                            />
                            <TopBanner
                                img={bannericontwo}
                                title="Day 1 크라우드 펀딩"
                                content="크라우드 펀딩에 관한 모든것들을 정리해뒀어요."
                                num={2}
                                backgroundColor="#787ff6"
                                link="https://www.notion.so/945f09f4fb6a4374ac0129d6368b8ad4"
                            />
                            <TopBanner
                                img={bannericon}
                                title="Day 2~7 리워드 수령기간"
                                content="리워드는 어떻게 받는거죠?"
                                num={3}
                                backgroundColor="#329d9c"
                                link="https://www.notion.so/945f09f4fb6a4374ac0129d6368b8ad4"
                            />
                            <TopBanner
                                img={bannericonfour}
                                title="내가 투자 좀 잘한다 하시는분?"
                                content="조랑말배 수익률 대회 진행중!"
                                num={4}
                                backgroundColor="#98c773"
                                link="https://www.notion.so/34829d066ec94c1cb7fbbe7557e3afcc"
                            />
                            <TopBanner
                                img={bannericonfive}
                                title="테스터님들의 목소리를 들려주세요!"
                                content="질문과 피드백은 언제든 환영입니다."
                                num={5}
                                backgroundColor="#7097ab"
                                link="https://www.notion.so/8fd736f2fa0d48bb8d90908b74b25543"
                            />
                            <TopBanner
                                img={bannericonsix}
                                title="소개해주실 크리에이터가 있나요?"
                                content="저희와 함께할 첫번째 크리에이터님을 찾습니다."
                                num={6}
                                backgroundColor="#93de8c"
                                link="https://www.notion.so/428ceecd19474217a2a2290c6739e74b"
                            />
                        </Slider>
                    </div>
                    {/* 랭킹용 */}
                    {/* {now >= 10 ?
                        <>
                            <div onClick={logout} style={{
                                fontSize: 21,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 40,
                                marginTop: 80,
                            }}>리워드 Top 30</div>
                            <div style={{
                                width: 840,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: 100,
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
                                    <div style={{width: 180, marginLeft: 20}}>누적 리워드</div>
                                    <div style={{width: 140, marginLeft: 20}}>총 보유자산</div>
                                    <div style={{width: 160, marginLeft: 20}}>포트폴리오</div>
                                </div>
                                {itemss.map(element=>
                                <InvestDashboard
                                rank={element.rank}
                                name={element.name}
                                total={element.totalMoney}
                                accumulate={element.accumulatedAllocation}
                                uid={element.uid}
                            />
                                    )}
                            </div>
                        </>
                        :
                        <> */}
                    <div style={{
                        width: 1060,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <div style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: "#202426",
                            marginBottom: 20,
                            marginTop: 40,
                            alignSelf: "flex-start"
                        }}>진행중인 펀딩</div>
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
                            <NewCreatorInfo />
                        </div>
                        <div style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: "#202426",
                            marginBottom: 20,
                            alignSelf: "flex-start"
                        }}>와이닷 NOW</div>
                        <div style={{
                            display: "grid",
                            gridRowGap: 20,
                            gridTemplateColumns: "auto auto auto auto",
                            overflowX: "scroll",
                            width: "100%",
                            marginBottom: 10,
                        }}>
                            <NowCard 
                                thumbnail={nowcardexample}
                                title="Lorem ipsum dolor sit amet…"
                                icon={nowcardicon}
                                name="햇살한스푼"
                            />
                            <NowCard 
                                thumbnail={nowcardexample}
                                title="Lorem ipsum dolor sit amet…"
                                icon={nowcardicon}
                                name="햇살한스푼"
                            />
                            <NowCard 
                                thumbnail={nowcardexample}
                                title="Lorem ipsum dolor sit amet…"
                                icon={nowcardicon}
                                name="햇살한스푼"
                            />
                            <NowCard 
                                thumbnail={nowcardexample}
                                title="Lorem ipsum dolor sit amet…"
                                icon={nowcardicon}
                                name="햇살한스푼"
                            />
                        </div>
                        <div style={{
                            width: "100%",
                            marginBottom: 40,

                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-end"
                        }}>
                            <div style={{
                                fontSize: 16,
                                color: "#4c4f51",
                                cursor: "pointer",
                            }}>더보기</div>
                            <BsArrowRightShort 
                                size={20} color="#4c4f51" 
                                style={{
                                    cursor: "pointer"
                                }}
                            />
                        </div>
                        <div style={{
                            fontSize: 22,
                            fontWeight: "bold",
                            color: "#202426",
                            marginBottom: 20,
                            alignSelf: "flex-start"
                        }}>기획 펀딩 - 먹방</div>
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
                            <NewCreatorInfo />
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 60,
                            marginBottom: 40,
                            width: "100%"
                        }}>
                            <YdotCard 
                                title="크리에이터님인가요?"
                                content="와이닷 펀딩 오픈하고 빠르게 성장하세요!"
                                backgroundColor="#6bd69e"
                                img={ydoticon}
                            />
                            <YdotCard 
                                title="펀딩에 참여하고 싶으신가요?"
                                content="와이닷 펀딩 A - Z 총정리 !"
                                backgroundColor="#a5a7a8"
                                img={ydoticon}
                            />
                        </div>
                    </div>
                    {/* 랭킹용 */}
                    {/* </>
                    } */}
                    <BottomTag />
                </div>
            </Default>
            <Mobile>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    marginTop: 80,
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
                                link="https://www.notion.so/Y-8c0b0039ca7d46f5ac44fba959e55ffe"
                            />
                            <MTopBanner
                                img={bannericontwo}
                                title="Day 1 크라우드 펀딩"
                                content="크라우드 펀딩에 관한 모든것들을 정리해뒀어요."
                                backgroundColor="#787ff6"
                                link="https://www.notion.so/945f09f4fb6a4374ac0129d6368b8ad4"
                            />
                            <MTopBanner
                                img={bannericon}
                                title="Day 2~7 리워드 수령기간"
                                content="리워드는 어떻게 받는거죠?"
                                backgroundColor="#329d9c"
                                link="https://www.notion.so/945f09f4fb6a4374ac0129d6368b8ad4"
                            />
                            <MTopBanner
                                img={bannericonfour}
                                title="내가 투자 좀 잘한다 하시는분?"
                                content="조랑말배 수익률 대회 진행중!"
                                backgroundColor="#98c773"
                                link="https://www.notion.so/34829d066ec94c1cb7fbbe7557e3afcc"
                            />
                            <MTopBanner
                                img={bannericonfive}
                                title="테스터님들의 목소리를 들려주세요!"
                                content="질문과 피드백은 언제든 환영입니다."
                                backgroundColor="#7097ab"
                                link="https://www.notion.so/8fd736f2fa0d48bb8d90908b74b25543"
                            />
                            <MTopBanner
                                img={bannericonsix}
                                title="소개해주실 크리에이터가 있나요?"
                                content="저희와 함께할 첫번째 크리에이터님을 찾습니다."
                                backgroundColor="#93de8c"
                                link="https://www.notion.so/428ceecd19474217a2a2290c6739e74b"
                            />
                        </Slider>
                    </div>
                    {/* {now >= 10 ?
                        <>
                            <div style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#202426",
                                marginBottom: 20,
                                marginTop: 40,
                            }}>리워드 Top 30</div>
                            <div style={{
                                minWidth: 300,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: 50,
                            }}>
                                <div style={{
                                    minWidth: 300,
                                    width: "90vw",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",

                                    fontSize: 10,
                                    opacity: 0.6,
                                    color: "#202426",
                                    textAlign: "left"
                                }}>
                                    <div style={{ width: 25, marginLeft: 5 }}>순위</div>
                                    <div style={{ width: 60, marginLeft: 5 }}>이름</div>
                                    <div style={{ width: 80, marginLeft: 5 }}>누적 리워드</div>
                                    <div style={{ width: 80, marginLeft: 5 }}>총 보유자산</div>
                                    <div style={{ width: 50, marginLeft: 5 }}>포트폴리오</div>
                                </div>
                                {itemss.map(element =>
                                    <MInvestDashboard
                                        rank={element.rank}
                                        name={element.name}
                                        total={element.totalMoney}
                                        accumulate={element.accumulatedAllocation}
                                        uid={element.uid}
                                    />
                                )}
                            </div>
                        </>
                        :
                        <> */}
                    <div style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        textAlign: "left",
                        width: "90%",

                        minWidth: 300,
                        marginBottom: 20,
                        marginTop: 20,
                    }}>새로운 펀딩</div>
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
                                sort={element.sort}
                                sector={element.sector}
                                fundingAim={element.fundingAim}
                            />
                        )}
                    </div>
                    <div style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        textAlign: "left",
                        width: "90%",
                        minWidth: 300,
                        marginBottom: 20,
                        marginTop: 20,
                    }}>와이닷 NOW</div>
                    <div style={{
                        display: "flex",
                        overflowX: "scroll",
                        width: "90%",
                        minWidth: 300,
                        marginBottom: 10,
                    }}>
                        <MNowCard
                            thumbnail={nowcardexample}
                            title="Lorem ipsum dolor sit…"
                            icon={nowcardicon}
                            name="햇살한스푼"
                        />
                        <MNowCard
                            thumbnail={nowcardexample}
                            title="Lorem ipsum dolor sit…"
                            icon={nowcardicon}
                            name="햇살한스푼"
                        />
                        <MNowCard
                            thumbnail={nowcardexample}
                            title="Lorem ipsum dolor sit…"
                            icon={nowcardicon}
                            name="햇살한스푼"
                        />
                        <MNowCard
                            thumbnail={nowcardexample}
                            title="Lorem ipsum dolor sit…"
                            icon={nowcardicon}
                            name="햇살한스푼"
                        />
                    </div>
                    <div style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        textAlign: "left",
                        width: "90%",

                        minWidth: 300,
                        marginBottom: 20,
                        marginTop: 20,
                    }}>기획 펀딩 - 먹방</div>
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
                                sort={element.sort}
                                sector={element.sector}
                                fundingAim={element.fundingAim}
                            />
                        )}
                    </div>
                    <MYdotCard
                        title="크리에이터님인가요?"
                        content="와이닷 펀딩 오픈하고 빠르게 성장하세요!"
                        backgroundColor="#6bd69e"
                        img={ydoticon}
                    />
                    <MYdotCard
                        title="펀딩에 참여하고 싶으신가요?"
                        content="와이닷 펀딩 A - Z 총정리 !"
                        backgroundColor="#a5a7a8"
                        img={ydoticon}
                    />
                    {/* </>
                    } */}
                    <MBottomTag />
                </div>
            </Mobile>
        </div>
    )
}