import React, { useState, useEffect } from 'react'
import Header, { vh, vw } from '../Style'
import "../component.css"
import { useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase"
import { Link } from 'react-router-dom';

//이미지
import assetgraph from '../icon/assetgraph.png'
import jisuncard from '../icon/jisuncard.png'

export default function Asset() {
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [items, setItems] = useState([])
    useEffect(() => {
        firestore.collection("User").doc(uid).collection("Fund").onSnapshot(querySnapshot => {
            const list = []
            querySnapshot.forEach(doc => {
                list.push({
                    date: doc.data().DayTime,
                    name: doc.id,
                    unit: doc.data().unit,
                    state: doc.data().ongoing,
                    hash: "https://explorer.blockchain.line.me/cashew/transaction/" + doc.data().TransactionHash.txHash,
                    amount: doc.data().Number,
                    total: Number(doc.data().Money)/1000000,
                    price: doc.data().per,
                    
                })
            })
            setItems(list)
        })
    }, [])
    const [section, setSection] = useState(true)
    const data = [
        {
            img: "#E78276",
            name: "지순’s 일상",
            unit: "JSC",
            chain: "LINK",
            amount: 1000,
            price: 1,
            total: 1000,
            number: "6/6",
            next: "10/20",
            actual: "+ 5.4",
            accumulate: 1000,
        },
        {
            img: "#9DDADB",
            name: "청춘 댕댕",
            unit: "CDD",
            chain: "LINK",
            amount: 200,
            price: 24,
            total: 4800,
            number: "3/20",
            next: "12/20",
            actual: "+ 20",
            accumulate: 24,
        },
        {
            img: "#78E185",
            name: "타이어 아저씨",
            unit: "TAT",
            chain: "LINK",
            amount: 400,
            price: 10,
            total: 4000,
            number: "6/20",
            next: "1/20",
            actual: "+ 20",
            accumulate: 10,
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
    const participate = [
        {
            date: "10/20",
            name: "지순's 일상",
            unit: "JST",
            amount: 2000,
            price: 1,
            total: 2000,
            state: "진행중"
        },
        {
            date: "9/10",
            name: "지순's 일상",
            unit: "JST",
            amount: 2000,
            price: 1,
            total: 2000,
            state: "성공"
        },
        {
            date: "1/20",
            name: "지순's 일상",
            unit: "JST",
            amount: 2000,
            price: 1,
            total: 2000,
            state: "실패"
        },
        {
            date: "12/20",
            name: "지순's 일상",
            unit: "JST",
            amount: 2000,
            price: 1,
            total: 2000,
            state: "성공"
        },
        {
            date: "12/9",
            name: "지순's 일상",
            unit: "JST",
            amount: 2000,
            price: 1,
            total: 2000,
            state: "성공"
        },
    ]
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#efefef" }}>
            <Header splash={false} bold="Asset" />
            <div style={{
                width: 68 * vw,
                height: 36,
                paddingTop: 20,
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #797B7C",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <input type="button" onClick={() => setSection(true)} style={{
                    width: "15%",
                    fontSize: 18,
                    color: "#161513",
                    textAlign: "center",
                    opacity: section ? 1 : 0.6,
                    backgroundColor: "#ffffff",
                    outline: 0,
                    cursor: "pointer",
                    border: 0,
                    borderBottom: section ? "2px solid #212426" : "0px",
                    paddingBottom: 10,
                    height: section ? "100%" - 2 : "100%"
                }} value="보유자산" />
                <input type="button" onClick={() => setSection(false)} style={{
                    width: "15%",
                    fontSize: 18,
                    color: "#161513",
                    textAlign: "center",
                    opacity: section ? 0.6 : 1,
                    backgroundColor: "#ffffff",
                    outline: 0,
                    cursor: "pointer",
                    border: 0,
                    borderBottom: section ? "0px" : "2px solid #212426",
                    paddingBottom: 10,
                    height: section ? "100%" : "100%" - 2
                }} value="펀딩, 배당내역" />
            </div>
            {section ?
                <>
                    <div style={{
                        width: 52 * vw,
                        paddingLeft: 8 * vw,
                        paddingRight: 8 * vw,
                        backgroundColor: "#ffffff",
                        height: 90 * vh,
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
                                        color: "#78e185",
                                        marginRight: 8,
                                    }}>45400</div>
                                    <div style={{
                                        fontSize: 18,
                                        fontWeight: "normal",
                                        color: "#78e185",
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
                                                color: "#78e185",
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
                            <img src={jisuncard} style={{width: "23%", height: 120, borderRadius: 20}}/>
                            <img src={jisuncard} style={{width: "23%", height: 120, borderRadius: 20}}/>
                            <img src={jisuncard} style={{width: "23%", height: 120, borderRadius: 20}}/>
                            <img src={jisuncard} style={{width: "23%", height: 120, borderRadius: 20}}/>
                        </div>
                    </div>
                </>
                :
                <>
                    <div style={{
                        width: 68 * vw,
                        backgroundColor: "#ffffff",
                        height: 90 * vh,
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
                            width: "84%",
                            paddingLeft: "8%",
                            paddingRight: "8%",
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
                        <div style={{ width: "100%", height: 1, backgroundColor: "#D2D3D3", marginBottom: 20 }} />
                        {baedang.map(element =>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "84%",
                                paddingLeft: "8%",
                                paddingRight: "8%",
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
                            width: "84%",
                            paddingLeft: "8%",
                            paddingRight: "8%",
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
                        <div style={{ width: "100%", height: 1, backgroundColor: "#D2D3D3", marginBottom: 20 }} />
                        {items.map(element =>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "84%",
                                paddingLeft: "8%",
                                paddingRight: "8%",
                                fontSize: 18,
                                color: "#161513",
                                marginTop: 20,
                                marginBottom: 20,
                            }}>
                                <div style={{ width: 70 }}>{element.date}</div>
                                <div style={{ width: 100 }}>{element.name}</div>
                                <div style={{ width: 70 }}>{element.amount}</div>
                                <div style={{ width: 100 }}>{element.price}     LINK</div>
                                <div style={{ width: 100 }}>{element.total}     LINK</div>
                                <a href={element.hash} target="_blank">
                                    <div style={{ width: 60 }}>{element.state == 0 ? "진행중" : (element.state == 1 ? "실패" : "성공")}</div>
                                </a>
                            </div>
                        )}
                    </div>
                </>
            }
        </div>
    )
}