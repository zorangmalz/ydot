import React, { useState, useEffect } from 'react'
import Header, { AssetGraph, AssetPie, DesktopMinWidthNotPadding, vh, vw } from '../Style'
import "../component.css"
import { useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase"
import { Link } from 'react-router-dom';

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

    //nft card
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("NFT").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                    list.push({
                        hash: "https://baobab.scope.klaytn.com/tx/"+doc.data().NftHash
                    })
                
            })
            setItemss(list)
        })
    }, [])

    //펀딩,배당내역쪽
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Fund").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                if(doc.data().ftHash){
                list.push({
                    date: doc.data().DayTime,
                    name: doc.data().channel,
                    state: doc.data().ongoing,
                    hash: "https://baobab.scope.klaytn.com/tx/" +doc.data().ftHash,
                    total: Number(doc.data().Money),
                })
            }else{

                list.push({
                    date: doc.data().DayTime,
                    name: doc.data().channel,
                    state: doc.data().ongoing,
                    hash: "",
                    total: Number(doc.data().Money),
                })
            }
                console.log(doc.data().channel)
            })
            setItems(list)
        })
    }, [])
    
    //보유자산
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Fund").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                if(doc.data().ongoing==1){
                list.push({
                    img: "#4c4c4c",
                    name: doc.data().channel,
                    unit: "Pood",
                    chain: "KRW",
                    total:doc.data().Money,
                    number: doc.data().month+"/12",
                    next: "1/20",
                    actual: doc.data().monthly,
                    accumulate: doc.data().total,
                    dayTime:doc.data().DayTime
                })
            }
                console.log(doc.data().channel)
            })
            setItemsss(list)
        })
    }, [])

    //보유자산 위쪽. 이번달
    const [totalFundingPrice,setTotalFundingPrice]=useState(0)
    const [accumulatedAllocation,setAccumulatedAllocation]=useState(0)

    //이건 그래프용
    const [monthlyAllocation,setMonthlyAllocation]=useState(0)
    useEffect(()=>{
        getPrice()
    },[itemsss])

    async function getPrice(){
        var total=0
        var accu=0
        var mon=0
        for(const i of itemsss){
            total= Number(i.total)+total
            accu=Number(i.accumulate)+accu
            mon=Number(i.actual)+mon
        }
        setTotalFundingPrice(total)
        setAccumulatedAllocation(accu)
        setMonthlyAllocation(mon)
    }

    const [section, setSection] = useState(true)
    const baedangposition = 1
    const fundingposition = 1

    //그래프
    const data = [
        { x: "2020-01", y: 43 },
        { x: "2020-02", y: 44 },
        { x: "2020-03", y: 47 },
        { x: "2020-04", y: 51 },
        { x: "2020-05", y: 57 },
        { x: "2020-06", y: 62 },
        { x: "2020-07", y: 67 },
        { x: "2020-08", y: 68 },
        { x: "2020-09", y: 63 },
        { x: "2020-10", y: 54 },
        { x: "2020-11", y: 47 },
        { x: "2020-12", y: 42 }
    ];
    return (
        <div>
            <Default>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#efefef" }}>
                    <div style={{
                        width: "100vw",
                        minWidth: 1280,
                        height: 80,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Header bold="Asset" />
                    </div>
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
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <input type="button" onClick={() => setSection(true)} style={{
                            width: 200,
                            fontSize: 18,
                            color: "#161513",
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
                                            }}>{totalFundingPrice}</div>
                                            <div style={{
                                                fontSize: 18,
                                                fontWeight: "normal",
                                                color: "#202426",
                                            }}>원</div>
                                        </div>
                                        <div className="assetTitle">누적 배당</div>
                                        <div className="startColumn">
                                            <div style={{
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                color: "#e78276",
                                                marginRight: 8,
                                            }}>{accumulatedAllocation}</div>
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
                                        <AssetGraph data={data} />
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
                                        <AssetPie data={data} />
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
                                    }}>보유수량</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        width: 100,
                                    }}>개당 가격</div>
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
                                    }}>누적 배당</div>
                                </div>
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: 10
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
                                                    <div style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: element.img, marginRight: 10 }} />
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
                                                    }}>{element.amount}</div>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.per}</div>
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
                                                    }}>{element.price}</div>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
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
                                                    }}>{element.total}</div>
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
                                                    }}>{element.accumulate}</div>
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
                                }}>
                                    {itemss.map(element =>
                                        <a href={element.hash} target="_blank">
                                            <img src={jisuncard} style={{ width: 235, height: 120, borderRadius: 20, marginRight: 20, }} />
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
                                    <div style={{ width: 300, textAlign: "center" }}>이름</div>
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
                                {itemsss.map(element =>
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
                                        <div style={{ width: 300, textAlign: "center" }}>{element.name}</div>
                                        <div style={{ width: 100, fontWeight: "bold", marginLeft: 200 }}>{element.actual}</div>
                                    </div>
                                )}
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
                                }}>
                                    <MdKeyboardArrowLeft style={{ marginRight: 10 }} size={20} color="#161513" />
                                    <div style={{ opacity: 1, marginRight: 20 }}>{baedangposition}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{baedangposition + 1}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{baedangposition + 2}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{baedangposition + 3}</div>
                                    <div style={{ opacity: 0.4, marginRight: 10 }}>{baedangposition + 4}</div>
                                    <MdKeyboardArrowRight size={20} color="#161513" />
                                </div>
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
                                    <div style={{ width: 200 }}>날짜</div>
                                    <div style={{ width: 200 }}>이름</div>
                                    <div style={{ width: 150 }}>수량</div>
                                    <div style={{ width: 150 }}>개당 가격</div>
                                    <div style={{ width: 200 }}>펀딩 금액</div>
                                    <div style={{ width: 100 }}>상태</div>
                                </div>
                            </div>
                            <div style={{
                                width: "56vw",
                                minWidth: 1060,
                                paddingLeft: 110,
                                paddingRight: 110,
                                backgroundColor: "#ffffff",
                                minHeight: "90vh",
                                borderTop: "1px solid #D2D3D3",
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
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }}>
                                        <div style={{ width: 200 }}>{element.date}</div>
                                        <div style={{ width: 200 }}>{element.name}</div>
                                        <div style={{ width: 150 }}>{element.amount}</div>
                                        <div style={{ width: 150 }}>{element.price} 원</div>
                                        <div style={{ width: 200 }}>{element.total} 원</div>
                                        {element.hash ? 
                                        <a href={element.hash} target="_blank">
                                        <div style={{ width: 100}}>{element.state == 0 ? "진행중" : (element.state == 2 ? "실패" : "성공")}</div>
                                    </a>
                                        :
                                        <div style={{ width: 100 }}>{element.state == 0 ? "진행중" : (element.state == 2 ? "실패" : "성공")}</div>
                                        }
                                        
                                    </div>
                                )}
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
                                }}>
                                    <MdKeyboardArrowLeft style={{ marginRight: 10 }} size={20} color="#161513" />
                                    <div style={{ opacity: 1, marginRight: 20 }}>{fundingposition}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{fundingposition + 1}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{fundingposition + 2}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{fundingposition + 3}</div>
                                    <div style={{ opacity: 0.4, marginRight: 10 }}>{fundingposition + 4}</div>
                                    <MdKeyboardArrowRight size={20} color="#161513" />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Default>
            <Mobile>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffffff" }}>
                    <div style={{
                        width: "100vw",
                        height: 80,
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <MHeader bold="Asset" />
                    </div>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        height: 36,
                        paddingTop: 20,
                        backgroundColor: "#ffffff",
                        borderBottom: "1px solid #d2d3d3",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <input type="button" onClick={() => setSection(true)} style={{
                            width: 150,
                            fontSize: 16,
                            color: "#161513",
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
                            width: 150,
                            fontSize: 16,
                            color: "#161513",
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
                                        <MAssetGraph data={data} />
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
                                            <MAssetPie data={data} />
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "flex-start",
                                                marginLeft: 10,
                                            }}>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    width: 90,
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
                                                        fontSize: 12,
                                                        fontWeight: "bold",
                                                        color: "#202426",
                                                    }}>{totalFundingPrice}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    width: 90,
                                                }}>
                                                    <div style={{
                                                        opacity: 0.4,
                                                        color: "#202426",
                                                        fontSize: 12,
                                                        paddingBottom: 5,
                                                        marginTop: 10
                                                    }} >누적배당(원)</div>
                                                    <div style={{
                                                        fontSize: 12,
                                                        fontWeight: "bold",
                                                        color: "#e78276",
                                                    }}>{accumulatedAllocation}</div>
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
                                                    <div style={{ width: "90%", minWidth: 60, maxWidth: 65, height: 70, borderRadius: 10, backgroundColor: element.img, marginBottom: 10 }} />
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
                                                        justifyContent: "space-between",
                                                        marginBottom: 20,
                                                    }}>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            width: "30%",
                                                            minWidth: 60,
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                                textAlign: "right",
                                                            }}>보유 수량 {element.per}</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#202426",
                                                                textAlign: "right",
                                                            }}>{element.amount}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 90,
                                                            width: "35%",
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                                textAlign: "right",
                                                            }}>개당 가격 ({element.chain})</div>
                                                            <div style={{
                                                                width: "100%",
                                                                fontSize: 14,
                                                                color: "#202426",
                                                                textAlign: "right",
                                                            }}>{element.price}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 90,
                                                            width: "35%",
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8
                                                            }}>펀딩 금액 ({element.chain})</div>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                fontSize: 14,
                                                                color: "#202426"
                                                            }}>{element.total}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        justifyContent: "flex-end"
                                                    }}>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            width: "30%",
                                                            minWidth: 60,
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>배당 횟수</div>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                fontSize: 14,
                                                                color: "#202426"
                                                            }}>{element.number}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 90,
                                                            width: "35%",
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>다음 배당일</div>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                fontSize: 14,
                                                                color: "#202426"
                                                            }}>{element.next}</div>
                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            minWidth: 90,
                                                            width: "35%",
                                                            marginLeft: 3,
                                                        }}>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                opacity: 0.4,
                                                                fontSize: 6,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                            }}>실제 배당 ({element.chain})</div>
                                                            <div style={{
                                                                width: "100%",
                                                                textAlign: "right",
                                                                fontSize: 14,
                                                                color: "#e78276",
                                                                fontWeight: "bold",
                                                            }}>{element.actual}</div>
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
                                }}>
                                    {itemss.map(element =>
                                        <a href={element.hash} target="_blank">
                                            <img src={jisuncard} style={{ width: 100, height: 60, borderRadius: 10, marginRight: 10, }} />
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
                                    <div style={{ width: 100, textAlign: "center" }}>날짜</div>
                                    <div style={{ width: 100, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 100, textAlign: "center" }}>배당</div>
                                </div>
                            </div>
                            <div style={{
                                width: "90vw",
                                backgroundColor: "#ffffff",
                                paddingTop: 10,
                            }}>
                                {itemsss.map(element =>
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
                                        <div style={{ width: 100, textAlign: "center" }}>{element.dayTime}</div>
                                        <div style={{ width: 100, textAlign: "center" }}>{element.name}</div>
                                        <div style={{ width: 100, fontWeight: "bold", textAlign: "center" }}>{element.actual}</div>
                                    </div>
                                )}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    cursor: "pointer",
                                    marginTop: 20,
                                }}>
                                    <MdKeyboardArrowLeft style={{ marginRight: 10 }} size={20} color="#161513" />
                                    <div style={{ opacity: 1, marginRight: 20 }}>{baedangposition}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{baedangposition + 1}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{baedangposition + 2}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{baedangposition + 3}</div>
                                    <div style={{ opacity: 0.4, marginRight: 10 }}>{baedangposition + 4}</div>
                                    <MdKeyboardArrowRight size={20} color="#161513" />
                                </div>
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
                                    <div style={{ width: 50, textAlign: "center" }}>날짜</div>
                                    <div style={{ width: 60, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 50, textAlign: "center" }}>수량</div>
                                    <div style={{ width: 50, textAlign: "center" }}>개당 가격</div>
                                    <div style={{ width: 60, textAlign: "center" }}>펀딩 금액</div>
                                    <div style={{ width: 40, textAlign: "center" }}>상태</div>
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
                                minHeight: "50vh",
                                marginTop: 10
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
                                        marginBottom: 20,
                                    }}>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.date}</div>
                                        <div style={{ width: 60, textAlign: "center" }}>{element.name}</div>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.amount}</div>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.price} 원</div>
                                        <div style={{ width: 60, textAlign: "center" }}>{element.total} 원</div>
                                        {element.hash ?
                                         <a href={element.hash} target="_blank">
                                         <div style={{ width: 40, textAlign: "center" }}>{element.state == 0 ? "진행중" : (element.state == 1 ? "실패" : "성공")}</div>
                                     </a>
                                        :
                                        <div style={{ width: 40, textAlign: "center" }}>{element.state == 0 ? "진행중" : (element.state == 1 ? "실패" : "성공")}</div>
                                     }
                                       
                                    </div>
                                )}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    cursor: "pointer",
                                    marginTop: 10,
                                }}>
                                    <MdKeyboardArrowLeft style={{ marginRight: 10 }} size={20} color="#161513" />
                                    <div style={{ opacity: 1, marginRight: 20 }}>{fundingposition}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{fundingposition + 1}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{fundingposition + 2}</div>
                                    <div style={{ opacity: 0.4, marginRight: 20 }}>{fundingposition + 3}</div>
                                    <div style={{ opacity: 0.4, marginRight: 10 }}>{fundingposition + 4}</div>
                                    <MdKeyboardArrowRight size={20} color="#161513" />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Mobile>
        </div>
    )
}