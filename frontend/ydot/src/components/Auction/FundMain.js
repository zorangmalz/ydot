import React, { useState, useEffect } from 'react'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useMediaQuery } from 'react-responsive'
import Header, { BottomTag, CreatorInfo, vw } from '../Style'

//임시 이미지
import Exampleone from '../icon/exampleone.png'
import Exampletwo from '../icon/exampletwo.png'
import Examplethree from '../icon/examplethree.png'
import Examplefour from '../icon/examplefour.png'
import { MBottomTag, MCreatorInfo, MHeader } from '../Mobile'

export default function FundMain() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }
    //진행중인 펀딩
    const [items, setItems] = useState([]);
    const [length, setLength] = useState(0)
    const [itemss, setItemss] = useState([]);
    const firestore = useFirestore()

    useEffect(() => {
        load()
        loadEnd()
    }, []) 

    async function load() {
        var date = new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            
            querySnapshot.forEach(doc => {
                if(doc.data().Deadline>date.getTime()){
                    // console.log("/images/Profile/"+doc.data().channelTitle+"/"+doc.data().channelTitle+"Main.jpg")
                    list.push({
                        id: count,
                        img: "/images/Profile/"+doc.data().channelTitle+"/"+doc.data().channelTitle+"Profile.jpg",
                        name: doc.id,
                        FundingNum: doc.data().FundingNum,
                        FundingTotal: doc.data().FundingAim,
                        percent: doc.data().FundingTotal / doc.data().FundingAim * 100,
                        Deadline: parseInt((doc.data().Deadline - date.getTime()) / 86400000),
                        fundingAim:doc.data().FundingAim,
                        sector:doc.data().sector,
                        sort:doc.data().sort
                    })
                    count = count + 1
                }
               
            })
            setItems(list)
            setLength(items.length)
        })
    }

    async function rendering() {
        let render
        let leng;
        if (items.length % 4 === 0) {
            leng = items.length / 4;
        } else if (items.length % 4 !== 0) {
            leng = items.length / 4 + 1;
        }
        for (var i = 0; i < leng; i++) {
            
        }
        return render;
    }
    //종료된 펀딩

    async function loadEnd() {
        var date = new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                if(doc.data().Deadline<date.getTime())
                {
                    list.push({
                        id: count,
                        img: "/images/Profile/"+doc.data().channelTitle+"/"+doc.data().channelTitle+"Profile.jpg",
                        name: doc.id,
                        FundingNum: doc.data().FundingNum,
                        FundingTotal: doc.data().FundingAim,
                        percent: doc.data().FundingTotal / doc.data().FundingAim * 100,
                        Deadline: parseInt((doc.data().Deadline - date.getTime()) / 86400000),
                        fundingAim:doc.data().FundingAim,
                        sector:doc.data().sector,
                        sort:doc.data().sort
                    })
                    count = count + 1
                }
                
            })
            setItemss(list)
        })
    }
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
                    <Header bold="Fund" />
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    marginTop: 80,
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#ffffff",
                        width: "56vw",
                        minWidth: 1060,
                        paddingTop: 40
                    }}>
                        <div style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            alignSelf: "flex-start",
                            color: "#202426",
                            marginBottom: 40
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
                        </div>
                    </div>
                    <div style={{
                        width: "56vw",
                        minWidth: 1060,
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 40
                    }}>진행 예정 펀딩</div>
                    <div className="grid-container">
                        {itemss.map(element =>
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
                    <BottomTag />
                </div>
            </Default>
            <Mobile>
                <MHeader bold="Fund" />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    marginTop: 80,
                }}>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        borderTop: "1px solid #D2D3D3",
                    }} />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        width: "100vw",
                        minWidth: 300,
                        paddingTop: 40
                    }}>
                        <div style={{
                            fontSize: 21,
                            fontWeight: "bold",
                            alignSelf: "center",
                            color: "#202426",
                            textAlign: "center",
                            marginBottom: 20
                        }}>진행중인 펀딩</div>
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
                        width: "90vw",
                        minWidth: 300,
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        marginTop: 40,
                        marginBottom: 40,
                        textAlign: "center"
                    }}>진행 예정 펀딩</div>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: 40,
                    }}>
                        <div className="mobile-grid-container">
                            {itemss.map(element =>
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
                    <MBottomTag />
                </div>
            </Mobile>
        </div>
    )
}