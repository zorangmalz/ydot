import React, { useState, useEffect } from 'react'
import Header, { AssetGraph, AssetPie, BottomTag } from '../Style'
import "../component.css"
import { useSelector } from "react-redux";
import { useFirestore } from "react-redux-firebase"
import MaterialTable, { MTableToolbar } from "material-table"

//아이콘
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

//모바일 대응
import { useMediaQuery } from 'react-responsive'

//이미지
import assetgraph from '../icon/assetgraph.png'
import jisuncard from '../icon/jisuncard.png'
import { MAssetGraph, MAssetPie, MHeader } from '../Mobile';

export default function Asset() {
    //모바일 대응
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 450 })
        return isMobile ? children : null
    }
    const Default = ({ children }) => {
        const isNotMobile = useMediaQuery({ minWidth: 451 })
        return isNotMobile ? children : null
    }

    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [items, setItems] = useState([])
    const [itemss, setItemss] = useState([])
    const [itemsss, setItemsss] = useState([])
    const [itemssss,setItemssss]=useState([])
    const [itemsssss,setItemsssss]=useState([])

    //nft card
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("NFT").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                    list.push({
                        hash: "https://baobab.scope.klaytn.com/tx/"+doc.data().NftHash,
                        pic:"/images/Profile/"+doc.data().NftPic+"/"+doc.data().NftPic+"Profile.jpg"
                    })
                
            })
            setItemss(list)
        })
    }, [])

    //5개씩 끊어야하기 때문에 position과 위치를 잘 봐야함
    const [Bstart, setBstart] = useState(0)
    const [Fstart, setFstart] = useState(0)
    const [Btotal, setBtotal] = useState(0) 
    const [Bcurrent, setBcurrent] = useState(1)
    const [Ftotal, setFtotal] = useState(0)
    const [Fcurrent, setFcurrent] = useState(1)

    //참여한 펀딩
    async function FundingParticipate() {
        await firestore.collection("User").doc(uid).collection("Fund").orderBy("fullTime", "desc").onSnapshot(querySnapshot => {
            const list = []
            var count = 0;
            querySnapshot.forEach(doc => {
                if (doc.data().ftHash) {
                    list.push({
                        date: doc.data().DayTime,
                        name: doc.data().channel,
                        state: doc.data().ongoing,
                        hash: "https://baobab.scope.klaytn.com/tx/" + doc.data().ftHash,
                        total: (Number(doc.data().Money).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        amount: ((Number(doc.data().Money) / Number(doc.data().fundingAim)).toFixed(6) * 10000).toFixed(2),
                    })
                    // console.log(((Number(doc.data().Money) / Number(doc.data().fundingAim)).toFixed(6) * 10000).toFixed(2),"first")
                    // console.log(((Number(doc.data().Money) / Number(doc.data().fundingAim)).toFixed(6) * 10000),"second")
                    // console.log(((Number(doc.data().Money) / Number(doc.data().fundingAim)).toFixed(6)),"third")
                    // console.log(((Number(doc.data().Money) / Number(doc.data().fundingAim))),"fo")
                    // console.log(Number(doc.data().Money),"fi")
                    // console.log((Number(doc.data().fundingAim)),"End")
                    count = count + 1;
                } else {
                    list.push({
                        date: doc.data().DayTime,
                        name: doc.data().channel,
                        state: doc.data().ongoing,
                        hash: "",
                        total: (Number(doc.data().Money).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                    })
                    count = count + 1;
                }
            })
            var slicePosition = Fcurrent * 5 - 5;
            setFtotal(count)
            setItems(list.slice(slicePosition, slicePosition + 5))
        })
    }
    useEffect(() => {
        FundingParticipate()
    }, [Fcurrent, Ftotal])

    //보유자산
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("TotalFunding").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                if(doc.data().ongoing==1){
                list.push({
                    img: "#4c4c4c",
                    name: doc.data().channel,
                    unit: doc.data().symbol,
                    chain: "KRW",
                    total:doc.data().Money,
                    number: doc.data().month+"/12",
                    next: String(Number(doc.data().month)+1)+"/20",
                    actual: doc.data().monthly,
                    accumulate: doc.data().total,
                    dayTime:doc.data().DayTime,
                    ftAmount:(Number(doc.data().Money)/Number(doc.data().fundingAim)).toFixed(6)*10000,
                    y:doc.data().Money,
                    color:doc.data().color
                })
                }
            })
            setItemsss(list)
        })
    }, [])

    //배당내역
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("AllocateList").orderBy("fullTime", "desc").onSnapshot(querySnapshot => {
            const list = []
            var count = 0;
            querySnapshot.forEach(doc => {
                list.push({
                    dayTime: doc.data().dayTime,
                    name: doc.data().channel,
                    actual: (doc.data().monthly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                })
                count = count + 1;
            })
            var slicePosition = Bcurrent * 5 - 5;
            setBtotal(count)
            setItemssss(list.slice(slicePosition, slicePosition + 5))
        })
    }, [Bcurrent, Btotal])

    //그래프용
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Allocate").orderBy("month","asc").onSnapshot(querySnapshot => {
            const list = new Array()
            querySnapshot.forEach(doc => {
                const sum=doc.data().total.reduce((stack,el)=>{
                    return stack+el
                },0)

                list.push({
                    x:"2020-0"+doc.id,
                    y:sum
                })
                
                
            })
            setItemsssss(list)
        })
    }, [])

    //총펀딩금액용
    const [monthlyAllocation,setMonthlyAllocation]=useState(0)
    const data = [
        { x: "2020-01", y: monthlyAllocation },
        // { x: "2020-02", y: 44 },
        // { x: "2020-03", y: 47 },
        // { x: "2020-04", y: 51 },
        // { x: "2020-05", y: 57 },
        // { x: "2020-06", y: 62 },
        // { x: "2020-07", y: 67 },
        // { x: "2020-08", y: 68 },
        // { x: "2020-09", y: 63 },
        // { x: "2020-10", y: 54 },
        // { x: "2020-11", y: 47 },
        // { x: "2020-12", y: 42 }
    ];

    //보유자산 위쪽. 이번달
    const [totalFundingPrice,setTotalFundingPrice]=useState(0)
    const [accumulatedAllocation,setAccumulatedAllocation]=useState(0)

    //이건 그래프용
    useEffect(()=>{
        getPrice()
    },[itemssss,itemsss])

    async function getPrice(){
        var total=0
        var accu=0
        var mon=0
        for(const i of itemsss){
            total= Number(i.total)+Number(total)
            accu=Number(i.accumulate)+Number(accu)
            mon=Number(i.actual)+Number(mon)
        }
        setTotalFundingPrice(total)
        setAccumulatedAllocation(accu)
        setMonthlyAllocation(mon)
        await firestore.collection("User").doc(uid).update({
            totalFundingPrice:total,
            accumulatedAllocation:accu
        })
    }

    //보유자산과 펀딩, 배당내역을 나누는 곳
    const [section, setSection] = useState(true)

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
                    <Header bold="Asset" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#efefef", marginTop: 80 }}>
                    <div style={{
                        width: "56vw",
                        height: 36,
                        paddingTop: 20,
                        minWidth: 1060,
                        paddingLeft: 110,
                        paddingRight: 110,
                        backgroundColor: "#ffffff",
                        borderBottom: "1px solid #d2d3d3",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}>
                        <input type="button" onClick={() => setSection(true)} style={{
                            width: 200,
                            fontSize: 18,
                            color: section ? "#e78276" : "#797B7C",
                            fontWeight: section ? "bold" : "normal",
                            textAlign: "center",
                            opacity: section ? 1 : 0.6,
                            backgroundColor: "#ffffff",
                            outline: 0,
                            cursor: "pointer",
                            border: 0,
                            borderBottom: section ? "2px solid #e78276" : "0px",
                            paddingBottom: 10,
                            height: section ? "100%" - 2 : "100%"
                        }} value="보유자산" />
                        <input type="button" onClick={() => setSection(false)} style={{
                            width: 200,
                            fontSize: 18,
                            color: "#161513",
                            fontWeight: section ? "normal" : "bold",
                            color: section ? "#797B7C" : "#e78276",
                            textAlign: "center",
                            opacity: section ? 0.6 : 1,
                            backgroundColor: "#ffffff",
                            outline: 0,
                            cursor: "pointer",
                            border: 0,
                            borderBottom: section ? "0px" : "2px solid #e78276",
                            paddingBottom: 10,
                            height: section ? "100%" : "100%" - 2
                        }} value="펀딩, 배당내역" />
                    </div>
                    {section ?
                        <>
                            <div style={{
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#ffffff",
                                height: "90vh",
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "flex-start",
                                    justifyContent: "space-between",
                                    marginTop: 20,
                                    marginBottom: 40,
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        width: 180,
                                        marginRight: 10,
                                    }}>
                                        <div className="assetTitle">총 펀딩 금액</div>
                                        <div className="startColumn">
                                            <div style={{
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                color: "#202426",
                                                marginRight: 8,
                                            }}>{(totalFundingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</div>
                                            <div style={{
                                                fontSize: 18,
                                                fontWeight: "normal",
                                                color: "#202426",
                                            }}>원</div>
                                        </div>
                                        <div className="assetTitle">누적 리워드</div>
                                        <div className="startColumn">
                                            <div style={{
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                color: "#e78276",
                                                marginRight: 8,
                                            }}>{(accumulatedAllocation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</div>
                                            <div style={{
                                                fontSize: 18,
                                                fontWeight: "normal",
                                                color: "#e78276",
                                            }}>원</div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        marginRight: 20
                                    }}>
                                        <div style={{
                                            opacity: 0.6,
                                            color: "#202426",
                                            fontSize: 18,
                                            fontWeight: "normal",
                                            marginTop: 20,
                                        }}>월별 배당 그래프</div>
                                        <AssetGraph data={itemsssss} />
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        width: 200,
                                    }}>
                                        <div style={{
                                            opacity: 0.6,
                                            color: "#202426",
                                            fontSize: 18,
                                            fontWeight: "normal",
                                            marginTop: 20,
                                            marginBottom: 10,
                                        }}>보유자산 포트폴리오</div>
                                        <AssetPie data={itemsss} />
                                    </div>
                                </div>
                                <div className="spaceRow">
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 185,
                                    }}>크리에이터</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 100,
                                    }}>보유 수량</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 110,
                                    }}>펀딩 금액</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 70,
                                    }}>배당 횟수</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 90,
                                    }}>다음 배당일</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 110,
                                    }}>누적 리워드</div>
                                </div>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: 10,
                                    minHeight: 200,
                                }}>
                                    {itemsss.map(element =>
                                        <>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "flex-start",
                                                justifyContent: "space-between",
                                                width: "100%",
                                                paddingBottom: 20,
                                                paddingTop: 20,
                                                borderBottom: "1px solid #D2D3D3"
                                            }}>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    width: 185
                                                }}>
                                                    <div style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: element.color, marginRight: 10 }} />
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        justifyContent: "flex-start"
                                                    }}>
                                                        <div style={{
                                                            fontWeight: "bold",
                                                            fontSize: 18,
                                                            color: "#202426",
                                                            marginBottom: 8,
                                                        }}>{element.name}</div>
                                                        <div style={{
                                                            opacity: 0.4,
                                                            fontWeight: "bold",
                                                            fontSize: 14,
                                                            color: "#202426"
                                                        }}>{element.unit}</div>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    width: 100,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{(element.ftAmount).toFixed(2)}</div>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>토큰</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    width: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{(element.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</div>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    width: 70
                                                }}>{element.number}</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    width: 90
                                                }}>{element.next}</div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    width: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#e78276",
                                                        fontWeight: "bold",
                                                        marginBottom: 8,
                                                    }}>{(element.accumulate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))}</div>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                   
                                </div>
                                <div style={{
                                    opacity: 0.6,
                                    fontSize: 18,
                                    color: "#202426",
                                    maxWidth: "20%",
                                    minWidth: 180,
                                    marginTop: 20,
                                    marginBottom: 20
                                }}>보유카드</div>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    overflowX: "scroll",
                                    paddingBottom: 100,
                                }}>
                                    {itemss.map(element =>
                                        <a href={element.hash} target="_blank">
                                            <img src={element.pic} style={{ width: 120, height: 120, borderRadius: 20, marginRight: 20, objectFit: "contain" }} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div style={{
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#ffffff",
                            }}>
                                <div style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    textAlign: "center",
                                    marginTop: 40,
                                    width: "100%"
                                }}>배당 내역</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    opacity: 0.6,
                                    fontSize: 18,
                                    color: "#161513",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}>
                                    <div style={{ width: 300 }}>날짜</div>
                                    <div style={{ width: 300,  textAlign: "center" }}>이름</div>
                                    <div style={{ width: 100, marginLeft: 200 }}>배당</div>
                                </div>
                            </div>
                            <div style={{
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#ffffff",
                                borderTop: "1px solid #D2D3D3",
                                paddingTop: 20,
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: 150,
                                }}>
                                    {itemssss.map(element =>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%",
                                            fontSize: 18,
                                            color: "#161513",
                                            marginBottom: 10,
                                        }}>
                                            <div style={{ width: 300 }}>{element.dayTime}</div>
                                            <div style={{ width: 300, marginLeft: 100 }}>{element.name}</div>
                                            <div style={{ width: 130, fontWeight: "bold", marginRight: 70, textAlign: "right" }}>{element.actual}</div>
                                        </div>
                                    )}
                                </div>
                                <Pagnation current={Bcurrent} totalcount={Math.ceil(Btotal / 5)} setCurrent={setBcurrent} />
                                <div style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    textAlign: "center",
                                    marginTop: 40,
                                    width: "100%"
                                }}>참여한 펀딩</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    opacity: 0.6,
                                    fontSize: 18,
                                    color: "#161513",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}>
                                    <div style={{ width: 200, marginRight: 50 }}>날짜</div>
                                    <div style={{ width: 200 }}>이름</div>
                                    <div style={{ width: 200 }}>수량</div>
                                    <div style={{ width: 150, paddingRight: 100 }}>펀딩 금액</div>
                                    <div style={{ width: 100 }}>상태</div>
                                </div>
                            </div>
                            <div style={{
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#ffffff",
                                borderTop: "1px solid #D2D3D3",
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: 150,
                                    paddingTop: 20,
                                }}>
                                    {items.map(element =>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontSize: 18,
                                            width: "100%",
                                            color: "#161513",
                                            marginBottom: 10,
                                        }}>
                                            <div style={{ width: 200, marginRight: 50 }}>{element.date}</div>
                                            <div style={{ width: 200 }}>{element.name}</div>
                                            <div style={{ width: 200 }}>{element.amount}</div>
                                            <div style={{ width: 150, paddingRight: 100, textAlign: "right" }}>{element.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</div>
                                            {element.hash ?
                                                <a href={element.hash} style={{
                                                    textDecorationLine: "underline",
                                                    color: "#161513",
                                                }} target="_blank">
                                                    <div style={{ width: 100 }}>{element.state == 0 ? "진행중" : (element.state == 2 ? "실패" : "성공")}</div>
                                                </a>
                                                :
                                                <div style={{ width: 100 }}>{element.state == 0 ? "진행중" : (element.state == 2 ? "실패" : "성공")}</div>
                                            }

                                        </div>
                                    )}
                                </div>
                                <Pagnation current={Fcurrent} totalcount={Math.ceil(Ftotal / 5)} setCurrent={setFcurrent} />
                            </div>
                        </>
                    }
                </div>
            </Default>
            <Mobile>
                <MHeader bold="Asset" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffffff", marginTop: 80 }}>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        height: 36,
                        paddingTop: 20,
                        backgroundColor: "#ffffff",
                        borderBottom: "1px solid #d2d3d3",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}>
                        <input className="safari-design" type="button" onClick={() => setSection(true)} style={{
                            width: 150,
                            fontSize: 16,
                            fontWeight: section ? "bold" : "normal",
                            color: section ? "#e78276" : "#797B7C",
                            textAlign: "center",
                            opacity: section ? 1 : 0.6,
                            backgroundColor: "#ffffff",
                            outline: 0,
                            cursor: "pointer",
                            border: 0,
                            borderBottom: section ? "2px solid #e78276" : "0px",
                            paddingBottom: 10,
                            height:"100%"
                        }} value="보유자산" />
                        <input className="safari-design" type="button" onClick={() => setSection(false)} style={{
                            width: 150,
                            fontSize: 16,
                            fontWeight: section ? "normal" : "bold",
                            color: section ? "#797B7C" : "#e78276",
                            textAlign: "center",
                            opacity: section ? 0.6 : 1,
                            backgroundColor: "#ffffff",
                            outline: 0,
                            cursor: "pointer",
                            border: 0,
                            borderBottom: section ? "0px" : "2px solid #e78276",
                            paddingBottom: 10,
                            height:"100%"
                        }} value="펀딩, 배당내역" />
                    </div>
                    {section ?
                        <>
                            <div style={{
                                width: "90vw",
                                minWidth: 300,
                                backgroundColor: "#ffffff",
                                height: "90vh",
                            }}>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    marginTop: 20,
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}>
                                        <div style={{
                                            alignSelf: "flex-start",
                                            opacity: 0.4,
                                            color: "#202426",
                                            fontSize: 12,
                                            paddingBottom: 5,
                                            marginTop: 20
                                        }}>월별 배당 그래프</div>
                                        <MAssetGraph data={itemsssss} />
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}>
                                        <div style={{
                                            alignSelf: "flex-start",
                                            opacity: 0.4,
                                            color: "#202426",
                                            fontSize: 12,
                                            paddingBottom: 20,
                                            marginTop: 20,
                                        }}>보유자산 포트폴리오</div>
                                        <div style={{
                                            width: "100%",
                                            alignSelf: "center",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "flex-start",
                                            marginBottom: 20,
                                        }}>
                                            <MAssetPie data={itemsss} />
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                marginLeft: 20,
                                            }}>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    minWidth: 90,
                                                    marginBottom: 20,
                                                }}>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        color: "#202426",
                                                        fontSize: 12,
                                                        paddingBottom: 5,
                                                        marginTop: 10
                                                    }} >총 펀딩 금액(원)</div>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                    }}>{totalFundingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    minWidth: 90,
                                                }}>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        color: "#202426",
                                                        fontSize: 12,
                                                        paddingBottom: 5,
                                                        marginTop: 10
                                                    }} >누적배당(원)</div>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "bold",
                                                        color: "#e78276",
                                                    }}>{accumulatedAllocation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                    {itemsss.map(element =>
                                        <>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "flex-start",
                                                justifyContent: "space-between",
                                                width: "90vw",
                                                paddingBottom: 10,
                                                paddingTop: 10,
                                                borderBottom: "1px solid #D2D3D3"
                                            }}>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    minWidth: 60,
                                                    width: "20%",
                                                    height: 110,
                                                }}>
                                                    <div style={{ width: "90%", minWidth: 60, maxWidth: 65, height: 70, borderRadius: 10, backgroundColor: element.color, marginBottom: 10 }} />
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent: "flex-start"
                                                    }}>
                                                        <div style={{
                                                            height: 30,
                                                            width: "100%",
                                                            fontWeight: "bold",
                                                            fontSize: 12,
                                                            color: "#202426",
                                                            marginBottom: 8,
                                                            textAlign: "center"
                                                        }}>{element.name}</div>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-end",
                                                    minWidth: 200,
                                                    width: "70%",
                                                    height: 110,
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "flex-start",
                                                        marginBottom: 20,
                                                        width: "100%",
                                                    }}>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 100,
                                                            width: "45%",
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8
                                                            }}>펀딩 금액 ({element.chain})</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#202426"
                                                            }}>{element.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 100,
                                                            width: "35%",
                                                            marginLeft: 6,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>누적 리워드 ({element.chain})</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#e78276",
                                                                fontWeight: "bold",
                                                            }}>{element.accumulate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "flex-start",
                                                        width: "100%",
                                                    }}>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            width: "20%",
                                                            minWidth: 50,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>배당 횟수</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#202426"
                                                            }}>{element.number}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 50,
                                                            width: "25%",
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>다음 배당일</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#202426"
                                                            }}>{element.next}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            width: "35%",
                                                            minWidth: 80,
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>보유 수량</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#202426",
                                                            }}>{(element.ftAmount).toFixed(2)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                  
                                </div>
                                <div style={{
                                    opacity: 0.6,
                                    fontSize: 14,
                                    color: "#202426",
                                    maxWidth: "20%",
                                    minWidth: 180,
                                    marginTop: 20,
                                    marginBottom: 20
                                }}>보유카드</div>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    overflowX: "scroll",
                                    paddingBottom: 100,
                                }}>
                                    {itemss.map(element =>
                                        <a href={element.hash} target="_blank">
                                            <img src={element.pic} style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10, objectFit: "contain" }} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div style={{
                                width: "100vw",
                                backgroundColor: "#ffffff",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                borderBottom: "1px solid #D2D3D3",
                            }}>
                                <div style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    textAlign: "center",
                                    marginTop: 20,
                                    width: "100%"
                                }}>배당 내역</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "90%",
                                    opacity: 0.6,
                                    fontSize: 12,
                                    color: "#161513",
                                    marginTop: 20,
                                    marginBottom: 10,
                                }}>
                                    <div style={{ width: 100, textAlign: "left" }}>날짜</div>
                                    <div style={{ width: 100, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 100, textAlign: "right" }}>배당</div>
                                </div>
                            </div>
                            <div style={{
                                width: "90vw",
                                backgroundColor: "#ffffff",
                                paddingTop: 10,
                            }}>
                                <div style={{
                                    width: "100%",
                                    minHeight: 150,
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    {itemssss.map(element =>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%",
                                            fontSize: 12,
                                            color: "#161513",
                                            marginBottom: 5,
                                        }}>
                                            <div style={{ width: 100, textAlign: "left" }}>{element.dayTime}</div>
                                            <div style={{ width: 100, textAlign: "center" }}>{element.name}</div>
                                            <div style={{ width: 100, fontWeight: "bold", textAlign: "right" }}>{element.actual}</div>
                                        </div>
                                    )}
                                </div>
                                <Pagnation current={Bcurrent} totalcount={Math.ceil(Btotal / 5)} setCurrent={setBcurrent} />
                                <div style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    textAlign: "center",
                                    marginTop: 20,
                                    width: "100%"
                                }}>참여한 펀딩</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    opacity: 0.6,
                                    fontSize: 12,
                                    color: "#161513",
                                    marginTop: 20,
                                    marginBottom: 10,
                                }}>
                                    <div style={{ width: 50, textAlign: "left" }}>날짜</div>
                                    <div style={{ width: 60, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 50, textAlign: "center" }}>수량</div>
                                    <div style={{ width: 100, textAlign: "center" }}>펀딩 금액</div>
                                    <div style={{ width: 40, textAlign: "right" }}>상태</div>
                                </div>
                            </div>
                            <div style={{
                                height: 1,
                                width: "100vw",
                                backgroundColor: "#D2D3D3"
                            }} />
                            <div style={{
                                width: "90vw",
                                backgroundColor: "#ffffff",
                                marginTop: 10,
                                paddingBottom: 20,
                            }}>
                                <div style={{
                                    width: "100%",
                                    minHeight: 150,
                                    display: "flex",
                                    flexDirection: "column"
                                }}>
                                    {items.map(element =>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            fontSize: 12,
                                            width: "100%",
                                            color: "#161513",
                                            marginBottom: 10,
                                        }}>
                                            <div style={{ width: 60, textAlign: "left" }}>{element.date}</div>
                                            <div style={{ width: 60, textAlign: "center" }}>{element.name}</div>
                                            <div style={{ width: 50, textAlign: "center" }}>{element.amount}</div>
                                            <div style={{ width: 100, textAlign: "right" }}>{element.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</div>
                                            {element.hash ?
                                                <a href={element.hash} style={{
                                                    textDecorationLine: "underline",
                                                    color: "#161513"
                                                }} target="_blank">
                                                    <div style={{ width: 40, textAlign: "right" }}>{element.state == 0 ? "진행중" : (element.state == 2 ? "실패" : "성공")}</div>
                                                </a>
                                                :
                                                <div style={{ width: 40, textAlign: "right" }}>{element.state == 0 ? "진행중" : (element.state == 2 ? "실패" : "성공")}</div>
                                            }

                                        </div>
                                    )}
                                </div>
                                <Pagnation current={Fcurrent} totalcount={Math.ceil(Ftotal / 5)} setCurrent={setFcurrent} />
                            </div>
                        </>
                    }
                </div>
            </Mobile>
        </div>
    )
}

function Pagnation({totalcount, current, setCurrent}) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: "#202426",
            cursor: "pointer",
            marginTop: 20,
            marginBottom: 40,
        }}>
            {totalcount >= 3 ?
                current === 1 ?
                    <>
                        <MdKeyboardArrowLeft onClick={() =>  setCurrent(1)} style={{ marginRight: 10 }} size={20} color="#161513" />
                        <div onClick={() => setCurrent(current)} style={{ opacity: 1, marginRight: 20 }}>1</div>
                        <div onClick={() => setCurrent(current + 1)} style={{ opacity: 0.4, marginRight: 20 }}>2</div>
                        <div onClick={() => setCurrent(current + 2)} style={{ opacity: 0.4 }}>3</div>
                        <MdKeyboardArrowRight onClick={() =>  setCurrent(totalcount)} style={{ marginLeft: 10 }} size={20} color="#161513" />
                    </>
                    :
                    current === totalcount ?
                        <>
                            <MdKeyboardArrowLeft onClick={() =>  setCurrent(1)} style={{ marginRight: 10 }} size={20} color="#161513" />
                            <div onClick={() => setCurrent(current - 2)} style={{ opacity: 0.4, marginRight: 20 }}>{current - 2}</div>
                            <div onClick={() => setCurrent(current - 1)} style={{ opacity: 0.4, marginRight: 20 }}>{current - 1}</div>
                            <div onClick={() => setCurrent(current)} style={{ opacity: 1 }}>{current}</div>
                            <MdKeyboardArrowRight onClick={() =>  setCurrent(totalcount)} style={{ marginLeft: 10 }} size={20} color="#161513" />
                        </>
                        :
                        <>
                            <MdKeyboardArrowLeft onClick={() =>  setCurrent(1)} style={{ marginRight: 10 }} size={20} color="#161513" />
                            <div onClick={() => setCurrent(current - 1)} style={{ opacity: 0.4, marginRight: 20 }}>{current - 1}</div>
                            <div onClick={() => setCurrent(current)} style={{ opacity: 1, marginRight: 20 }}>{current}</div>
                            <div onClick={() => setCurrent(current + 1)} style={{ opacity: 0.4 }}>{current + 1}</div>
                            <MdKeyboardArrowRight onClick={() =>  setCurrent(totalcount)} style={{ marginLeft: 10 }} size={20} color="#161513" />
                        </>
                :
                totalcount === 1 ||totalcount===0 ?
                    <>
                        <MdKeyboardArrowLeft onClick={() =>  setCurrent(1)} style={{ marginRight: 10 }} size={20} color="#161513" />
                        <div style={{ opacity: 1 }}>{current}</div>
                        <MdKeyboardArrowRight onClick={() =>  setCurrent(totalcount)} style={{ marginLeft: 10 }} size={20} color="#161513" />
                    </>
                    :
                    current === totalcount ?
                        <>
                            <MdKeyboardArrowLeft onClick={() =>  setCurrent(1)} style={{ marginRight: 10 }} size={20} color="#161513" />
                            <div onClick={() => setCurrent(current - 1)} style={{ opacity: 0.4, marginRight: 20 }}>{current - 1}</div>
                            <div onClick={() => setCurrent(current)} style={{ opacity: 1 }}>{current}</div>
                            <MdKeyboardArrowRight onClick={() =>  setCurrent(totalcount)} style={{ marginLeft: 10 }} size={20} color="#161513" />
                        </>
                        :
                        <>
                            <MdKeyboardArrowLeft onClick={() =>  setCurrent(1)} style={{ marginRight: 10 }} size={20} color="#161513" />
                            <div onClick={() => setCurrent(current)} style={{ opacity: 1, marginRight: 20 }}>{current}</div>
                            <div onClick={() => setCurrent(current + 1)} style={{ opacity: 0.4 }}>{current + 1}</div>
                            <MdKeyboardArrowRight onClick={() =>  setCurrent(totalcount)} style={{ marginLeft: 10 }} size={20} color="#161513" />
                        </>
            }
        </div>
    )
}
