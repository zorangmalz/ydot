import React, { useState, useEffect } from 'react'
import Header, { DesktopMinWidthNotPadding, vh, vw } from '../Style'
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
import { MHeader } from '../Mobile';

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
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Fund").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                list.push({
                    hash: "https://explorer.blockchain.line.me/cashew/transaction/" + doc.data().NftTx.txHash,
                })
            })
            setItemss(list)
        })
    }, [])
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Fund").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                list.push({
                    date: doc.data().DayTime,
                    name: doc.data().channel,
                    unit: doc.data().unit,
                    state: doc.data().ongoing,
                    hash: "https://explorer.blockchain.line.me/cashew/transaction/" + doc.data().TransactionHash.txHash,
                    amount: doc.data().Number,
                    total: Number(doc.data().Money) / 1000000,
                    price: doc.data().per,

                })
                console.log(doc.data().channel)
            })
            setItems(list)
        })
    }, [])
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Fund").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                list.push({
                    img: "#4c4c4c",
                    name: "Pood의 먹방",
                    unit: "Pood",
                    chain: "LINK",
                    price: doc.data().per,
                    amount: (doc.data().Number).toFixed(2),
                    total: Number(doc.data().Money) / 1000000,
                    number: "0/12",
                    next: "1/20",
                    actual: "-",
                    accumulate: "-"

                })
                console.log(doc.data().channel)
            })
            setItemsss(list)
        })
    }, [])
    const [section, setSection] = useState(true)
    const data = [
        {
            img: "#E78276",
            name: "지순’s 일상",
            unit: "JSC",
            chain: "KRW",
            amount: 1000,
            price: 1,
            total: 1000,
            number: "6/6",
            next: "10/20",
            actual: "+ 5400",
            accumulate: 1000000,
        },
        {
            img: "#9DDADB",
            name: "청춘 댕댕",
            unit: "CDD",
            chain: "KRW",
            amount: 200,
            price: 24,
            total: 4800,
            number: "3/20",
            next: "12/20",
            actual: "+ 20000",
            accumulate: 24000,
        },
        {
            img: "#78E185",
            name: "타이어 아저씨",
            unit: "TAT",
            chain: "KRW",
            amount: 400,
            price: 10,
            total: 4000,
            number: "6/20",
            next: "1/20",
            actual: "+ 20000",
            accumulate: 10000,
        }
    ]
    const baedang = [
        {
            date: "10/20",
            unit: "JST",
            getmoney: 2000,
        },
        {
            date: "9/20",
            unit: "JST",
            getmoney: 2000,
        },
        {
            date: "8/20",
            unit: "JST",
            getmoney: 2000,
        },
        {
            date: "7/20",
            unit: "JST",
            getmoney: 2000,
        },
        {
            date: "6/20",
            unit: "JST",
            getmoney: 2000,
        },
    ]
    const baedangposition = 1
    const fundingposition = 1
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
                                    marginTop: 20,
                                    marginBottom: 40,
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        minWidth: 180,
                                        marginRight: 40,
                                    }}>
                                        <div className="assetTitle">총 펀딩 금액</div>
                                        <div className="startColumn">
                                            <div style={{
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                color: "#202426",
                                                marginRight: 8,
                                            }}>300000</div>
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
                                                color: "#202426",
                                                marginRight: 8,
                                            }}>300000</div>
                                            <div style={{
                                                fontSize: 18,
                                                fontWeight: "normal",
                                                color: "#202426",
                                            }}>원</div>
                                        </div>
                                        <div className="assetTitle">이번달 배당</div>
                                        <div className="startColumn">
                                            <div style={{
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                color: "#e78276",
                                                marginRight: 8,
                                            }}>45400</div>
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
                                    }}>
                                        <div className="assetTitle">월별 배당 그래프</div>
                                        <img src={assetgraph} style={{
                                            width: 566,
                                            height: 212,
                                        }} />
                                    </div>
                                </div>
                                <div className="spaceRow">
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "20%",
                                        minWidth: 180,
                                    }}>크리에이터</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "10%",
                                        minWidth: 70,
                                    }}>보유수량</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "9%",
                                        minWidth: 70,
                                    }}>개당 가격</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "13%",
                                        minWidth: 110,
                                    }}>펀딩 금액</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "10%",
                                        minWidth: 70,
                                    }}>배당 횟수</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "11%",
                                        minWidth: 90,
                                    }}>다음 배당일</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "12%",
                                        minWidth: 110,
                                    }}>실제 배당</div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        maxWidth: "14%",
                                        minWidth: 110,
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
                                                    maxWidth: "20%",
                                                    minWidth: 180
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
                                                            opacity: 0.6,
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
                                                    maxWidth: "10%",
                                                    minWidth: 70,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.amount}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.per}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "9%",
                                                    minWidth: 70,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.price}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "13%",
                                                    minWidth: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.total}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    maxWidth: "10%",
                                                    minWidth: 70
                                                }}>{element.number}</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    maxWidth: "11%",
                                                    minWidth: 90
                                                }}>{element.next}</div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "12%",
                                                    minWidth: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#e78276",
                                                        marginBottom: 8,
                                                    }}>{element.actual}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "14%",
                                                    minWidth: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.accumulate}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {data.map(element =>
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
                                                    maxWidth: "20%",
                                                    minWidth: 180
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
                                                            opacity: 0.6,
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
                                                    maxWidth: "10%",
                                                    minWidth: 70,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.amount}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.per}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "9%",
                                                    minWidth: 70,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.price}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "13%",
                                                    minWidth: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.total}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    maxWidth: "10%",
                                                    minWidth: 70
                                                }}>{element.number}</div>
                                                <div style={{
                                                    fontSize: 18,
                                                    color: "#202426",
                                                    maxWidth: "11%",
                                                    minWidth: 90
                                                }}>{element.next}</div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "12%",
                                                    minWidth: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#e78276",
                                                        marginBottom: 8,
                                                    }}>{element.actual}</div>
                                                    <div style={{
                                                        opacity: 0.6,
                                                        fontSize: 14,
                                                        color: "#202426"
                                                    }}>{element.chain}</div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "flex-start",
                                                    maxWidth: "14%",
                                                    minWidth: 110,
                                                }}>
                                                    <div style={{
                                                        fontSize: 18,
                                                        color: "#202426",
                                                        marginBottom: 8,
                                                    }}>{element.accumulate}</div>
                                                    <div style={{
                                                        opacity: 0.6,
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
                                    justifyContent: "space-between"
                                }}>
                                    {itemss.map(element =>
                                        <a href={element.hash} target="_blank">
                                            <img src={jisuncard} style={{ width: 120, height: 120, borderRadius: 20 }} />
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
                                    <div style={{ width: 70 }}>날짜</div>
                                    <div style={{ width: 70, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 70 }}>배당</div>
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
                                {baedang.map(element =>
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
                                        <div style={{ width: 70 }}>{element.date}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.unit}</div>
                                        <div style={{ width: 70, fontWeight: "bold" }}>{element.getmoney}</div>
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
                                    <div style={{ width: 70 }}>날짜</div>
                                    <div style={{ width: 100 }}>이름</div>
                                    <div style={{ width: 70 }}>수량</div>
                                    <div style={{ width: 100 }}>개당 가격</div>
                                    <div style={{ width: 100 }}>펀딩 금액</div>
                                    <div style={{ width: 60 }}>상태</div>
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
                                        <div style={{ width: 70 }}>{element.date}</div>
                                        <div style={{ width: 100 }}>{element.name}</div>
                                        <div style={{ width: 70 }}>{element.amount}</div>
                                        <div style={{ width: 100 }}>{element.price} 원</div>
                                        <div style={{ width: 100 }}>{element.total} 원</div>
                                        <a href={element.hash} target="_blank">
                                            <div style={{ width: 60 }}>{element.state == 0 ? "성공" : (element.state == 1 ? "실패" : "성공")}</div>
                                        </a>
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
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    marginTop: 20,
                                    marginBottom: 40,
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            minWidth: 120,
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                color: "#202426",
                                                fontSize: 14,
                                                paddingBottom: 5,
                                                marginTop: 10
                                            }} >총 펀딩 금액</div>
                                            <div className="startColumn">
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginRight: 8,
                                                }}>300000</div>
                                                <div style={{
                                                    fontSize: 16,
                                                    fontWeight: "normal",
                                                    color: "#202426",
                                                }}>원</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            minWidth: 120,
                                        }}>
                                            <div style={{
                                                opacity: 0.6,
                                                color: "#202426",
                                                fontSize: 14,
                                                paddingBottom: 5,
                                                marginTop: 10
                                            }} >누적 배당</div>
                                            <div className="startColumn">
                                                <div style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#202426",
                                                    marginRight: 8,
                                                }}>300000</div>
                                                <div style={{
                                                    fontSize: 16,
                                                    fontWeight: "normal",
                                                    color: "#202426",
                                                }}>원</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            minWidth: 120,
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-start",
                                                minWidth: 120,
                                            }}>
                                                <div style={{
                                                    opacity: 0.6,
                                                    color: "#202426",
                                                    fontSize: 14,
                                                    paddingBottom: 5,
                                                    marginTop: 10
                                                }} >이번달 배당</div>
                                                <div className="startColumn">
                                                    <div style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#e78276",
                                                        marginRight: 8,
                                                    }}>45400</div>
                                                    <div style={{
                                                        fontSize: 16,
                                                        fontWeight: "normal",
                                                        color: "#e78276",
                                                    }}>원</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                    }}>
                                        <div style={{
                                            opacity: 0.6,
                                            color: "#202426",
                                            fontSize: 14,
                                            paddingBottom: 5,
                                            marginTop: 20
                                        }}>월별 배당 그래프</div>
                                        <img src={assetgraph} style={{
                                            width: "90vw",
                                            minWidth: 300,
                                        }} />
                                    </div>
                                </div>
                                {/* <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 130,
                                        }}>크리에이터</div>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 60,
                                        }}>보유수량</div>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 60,
                                        }}>개당 가격</div>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 90,
                                        }}>펀딩 금액</div>
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 50,
                                        }}>배당 횟수</div>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 70,
                                        }}>다음 배당일</div>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 90,
                                        }}>실제 배당</div>
                                        <div style={{
                                            opacity: 0.6,
                                            fontSize: 14,
                                            color: "#202426",
                                            width: 90,
                                        }}>누적 배당</div>
                                    </div>
                                </div> */}
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    marginTop: 10
                                }}>
                                    {data.map(element =>
                                        <>
                                            <div style={{
                                                display: "flex",
                                                flexDirection: "column",
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
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "center",
                                                        width: 130,
                                                    }}>
                                                        <div style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: element.img, marginRight: 5 }} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "flex-start",
                                                            justifyContent: "flex-start"
                                                        }}>
                                                            <div style={{
                                                                fontWeight: "bold",
                                                                fontSize: 14,
                                                                color: "#202426",
                                                                marginBottom: 8,
                                                                width: 90
                                                            }}>{element.name}</div>
                                                            <div style={{
                                                                opacity: 0.6,
                                                                fontWeight: "bold",
                                                                fontSize: 10,
                                                                color: "#202426",
                                                                width: 90
                                                            }}>{element.unit}</div>
                                                        </div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        maxWidth: "10%",
                                                        minWidth: 70,
                                                    }}>
                                                        <div style={{
                                                            fontSize: 14,
                                                            color: "#202426",
                                                            marginBottom: 8,
                                                        }}>{element.amount}</div>
                                                        <div style={{
                                                            opacity: 0.6,
                                                            fontSize: 10,
                                                            color: "#202426"
                                                        }}>{element.per}</div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        maxWidth: "9%",
                                                        minWidth: 70,
                                                    }}>
                                                        <div style={{
                                                            fontSize: 14,
                                                            color: "#202426",
                                                            marginBottom: 8,
                                                        }}>{element.price}</div>
                                                        <div style={{
                                                            opacity: 0.6,
                                                            fontSize: 10,
                                                            color: "#202426"
                                                        }}>{element.chain}</div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        maxWidth: "13%",
                                                        minWidth: 110,
                                                    }}>
                                                        <div style={{
                                                            fontSize: 14,
                                                            color: "#202426",
                                                            marginBottom: 8,
                                                        }}>{element.total}</div>
                                                        <div style={{
                                                            opacity: 0.6,
                                                            fontSize: 10,
                                                            color: "#202426"
                                                        }}>{element.chain}</div>
                                                    </div>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                }}>
                                                    <div style={{
                                                        fontSize: 14,
                                                        color: "#202426",
                                                        maxWidth: "10%",
                                                        minWidth: 70
                                                    }}>{element.number}</div>
                                                    <div style={{
                                                        fontSize: 14,
                                                        color: "#202426",
                                                        maxWidth: "11%",
                                                        minWidth: 90
                                                    }}>{element.next}</div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        maxWidth: "12%",
                                                        minWidth: 110,
                                                    }}>
                                                        <div style={{
                                                            fontSize: 14,
                                                            color: "#e78276",
                                                            marginBottom: 8,
                                                        }}>{element.actual}</div>
                                                        <div style={{
                                                            opacity: 0.6,
                                                            fontSize: 10,
                                                            color: "#202426"
                                                        }}>{element.chain}</div>
                                                    </div>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "flex-start",
                                                        maxWidth: "14%",
                                                        minWidth: 110,
                                                    }}>
                                                        <div style={{
                                                            fontSize: 14,
                                                            color: "#202426",
                                                            marginBottom: 8,
                                                        }}>{element.accumulate}</div>
                                                        <div style={{
                                                            opacity: 0.6,
                                                            fontSize: 10,
                                                            color: "#202426"
                                                        }}>{element.chain}</div>
                                                    </div>
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
                                    justifyContent: "space-between"
                                }}>
                                    {itemss.map(element =>
                                        <a href={element.hash} target="_blank">
                                            <img src={jisuncard} style={{ width: 120, height: 120, borderRadius: 20 }} />
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
                                    marginTop: 40,
                                    width: "100%"
                                }}>배당 내역</div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "90%",
                                    opacity: 0.6,
                                    fontSize: 14,
                                    color: "#161513",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}>
                                    <div style={{ width: 70, textAlign: "center" }}>날짜</div>
                                    <div style={{ width: 70, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 70, textAlign: "center" }}>배당</div>
                                </div>
                            </div>
                            <div style={{
                                width: "90vw",
                                backgroundColor: "#ffffff",
                                paddingTop: 20,
                            }}>
                                {baedang.map(element =>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                        fontSize: 14,
                                        color: "#161513",
                                        marginBottom: 5,
                                    }}>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.date}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.unit}</div>
                                        <div style={{ width: 70, fontWeight: "bold", textAlign: "center" }}>{element.getmoney}</div>
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
                                    fontSize: 14,
                                    color: "#161513",
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}>
                                    <div style={{ width: 50, textAlign: "center" }}>날짜</div>
                                    <div style={{ width: 70, textAlign: "center" }}>이름</div>
                                    <div style={{ width: 50, textAlign: "center" }}>수량</div>
                                    <div style={{ width: 70, textAlign: "center" }}>개당 가격</div>
                                    <div style={{ width: 70, textAlign: "center" }}>펀딩 금액</div>
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
                                paddingTop: 20,
                            }}>
                                {items.map(element =>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        fontSize: 14,
                                        width: "100%",
                                        color: "#161513",
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }}>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.date}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.name}</div>
                                        <div style={{ width: 50, textAlign: "center" }}>{element.amount}</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.price} 원</div>
                                        <div style={{ width: 70, textAlign: "center" }}>{element.total} 원</div>
                                        <a href={element.hash} target="_blank">
                                            <div style={{ width: 40, textAlign: "center" }}>{element.state == 0 ? "성공" : (element.state == 1 ? "실패" : "성공")}</div>
                                        </a>
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