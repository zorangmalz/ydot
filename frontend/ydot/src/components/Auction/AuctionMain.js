import React from 'react'
import Header, { CreatorInfo, vw } from '../Style'

export default function AuctionMain({}) {
    const CreatorList = [
        {
            ongoing: true,
            img: "",
            name: "지순’s 일상",
            introduction: ["브이로거 지순이의 일상을 만나보세요!", <br />, "대학교부터 알바까지 일상을 공유하고 있습니다."],
            start: "2020/12/20 오전 11시",
        },
        {
            ongoing: true,
            img: "",
            name: "청춘 댕댕",
            introduction: ["귀여운 청춘 댕댕이와 함께하는 랜선 애견!", <br />, "청춘이의 댕댕미 넘치는 영상을 만나보세요."],
            start: "2020/12/20 오전 11시",
        },
        {
            ongoing: true,
            img: "",
            name: "타이어 아저씨 TV",
            introduction: ["고급부터 가성비까지 폭넓게 다루는", <br />, "타이어 아저씨의 미식로그"],
            start: "2020/12/20 오전 11시",
        }
    ]
    return (
        <>
            <Header splash={false} bold="Auction" />
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#ffffff",
                width: 100 * vw,
                paddingTop: 40
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20
                }}>경매 참여 가능</div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {CreatorList.map(element => 
                        <CreatorInfo 
                            ongoing={element.ongoing}
                            img={element.img} 
                            name={element.name}
                            introduction={element.introduction}
                            start={element.start}
                        />
                    )}
                </div>
            </div>
        </>
    )
}