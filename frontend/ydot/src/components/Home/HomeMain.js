import React, { useEffect, useState } from 'react'
import Header, { CloseBeta, CreatorInfo, vh, vw } from '../Style'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';


//클로즈 베타 이미지
import fan from '../icon/fan.png'
import auction from '../icon/auction.jpg'
import moneyBag from '../icon/money-bag.jpg'
import personalInfo from '../icon/personal-information.jpg'

//임시 이미지
import Creatorone from '../icon/Creatorone.png'
import Creatortwo from '../icon/Creatortwo.png'
import Creatorthree from '../icon/Creatorthree.png'
import Creatorfour from '../icon/Creatorfour.png'



export default function HomeMain() {
    const history = useHistory()
    const firebase = useFirebase()
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [items, setItems] = useState([]);

    useEffect(() => {
        load()
        
    }, [])
    // function add(){
    //     firestore.collection("User").doc(uid).set({
    //         uid:uid,
    //         hi:"hi"
    //     })
    // }

    async function load() {
        var date = new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                list.push({
                    img: count === 1 ? Creatorone : count === 2 ? Creatortwo : count === 3 ? Creatorthree : Creatorfour,
                    name: doc.id,
                    FundingNum: doc.data().FundingNum,
                    FundingTotal: doc.data().FundingTotal,
                    percent: doc.data().FundingTotal / doc.data().FundingAim * 100,
                    Deadline: parseInt((doc.data().Deadline - date.getTime()) / 86400000)
                })
                count = count + 1
            })
            setItems(list)
        })

    }
    // const CreatorList = [
    //     {

    //         img: "",
    //         name: "지순’s 일상",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     { 

    //         img: "",
    //         name: "청춘 댕댕",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     {

    //         img: "",
    //         name: "타이어 아저씨 TV",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     {

    //         img: "",
    //         name: "타이어 아저씨 TV",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    // ]


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffffff" }}>
            <Header splash={false} bold="Home" />
            <div style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "#202426",
                marginTop: 40,
                marginBottom: 20,
                alignSelf: "center"
            }}>크리에이터 정보</div>
            <div style={{
                width: 100 * vw,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>

                {items.map(element =>
                    <CreatorInfo
                        img={element.img}
                        name={element.name}
                        FundingNum={element.FundingNum}
                        FundingTotal={element.FundingTotal}
                        percent={element.percent}
                        Deadline={element.Deadline}
                    />
                )}
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 60,
                fontSize: 21,
                fontWeight: "bold",
                color: "#202426",
            }}>클로즈 베타는 다음과 같이 진행됩니다.</div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
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
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 44,
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
    )
}