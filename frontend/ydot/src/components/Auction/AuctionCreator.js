import React, { useState, useReducer } from 'react'
import Header, { BuyInput, CreatorProfile, vh, vw, Calculator } from '../Style'

function reducer(state, action) {
    switch (action.type) {
        case "25":
            return 25
        case "50":
            return 50
        case "75":
            return 75
        case "max":
            return 100
        default:
            return 0
    }
}

export default function AuctionCreator() {
    const [number, dispatch] = useReducer(reducer, 0)
    const onTwentyfive = () => {
        dispatch({ type: "25" })
    }
    const onFifty = () => {
        dispatch({ type: "50" })
    }
    const onSeventyFive = () => {
        dispatch({ type: "75" })
    }
    const onMax = () => {
        dispatch({ type: "max" })
    }
    const Creator = {
        img: "",
        name: "지순’s 일상",
        start: 1000,
        predict: "1,900 (+90%)",
        sell: "2,000",
        state: "plus"
    }
    const data = [
        {
            price: 1700,
            amount: 1040,
            total: 1100000
        },
        {
            price: 1600,
            amount: 200,
            total: 1100000
        },
        {
            price: 1500,
            amount: 500,
            total: 1100000
        },
        {
            price: 1400,
            amount: 1200,
            total: 1100000
        },
        {
            price: 1300,
            amount: 800,
            total: 1100000
        },
        {
            price: 1200,
            amount: 900,
            total: 1100000
        },
        {
            price: 1100,
            amount: 0,
            total: 1100000
        },
        {
            price: 1000,
            amount: 100,
            total: 1100000
        },
    ]
    const BuyData = [
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },
        {
            time: "19:21:22",
            name: "JST",
            amount: 2000,
            price: 1900,
            total: 1900000,
            cancel: false
        },

    ]
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [total, setTotal] = useState("")
    const [buyamount, setBuyamount] = useState("")
    const [buyprice, setBuyprice] = useState("")
    const [buytotal, setBuytotal] = useState("")
    return (
        <>
            <Header bold="Auction" />
            <div style={{
                width: "68vw",
                paddingLeft: "16vw",
                paddingRight: "16vw",
                backgroundColor: "#efefef",
                paddingBottom: "5vh",
            }}>
                <CreatorProfile
                    img={Creator.img}
                    name={Creator.name}
                    start={Creator.start}
                    predict={Creator.predict}
                    sell={Creator.sell}
                    state={Creator.state}
                />
                <div style={{
                    width: "68vw",
                    paddingTop: 10,
                    paddingBottom: 16,
                    backgroundColor: "#202426",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#ffffff",
                    fontWeight: "bold"
                }}>
                    <div style={{ fontSize: 21, marginBottom: 10 }}>경매 시작까지</div>
                    <div style={{ fontSize: 36 }}>00:00:00</div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "22.9vw",
                    }}>
                        <div style={{
                            width: "100%",
                            height: 21,
                            backgroundColor: "#ffffff",
                            borderBottom: "2px solid #212426",
                            fontSize: 21,
                            fontWeight: "bold",
                            color: "#202426",
                            textAlign: "center",
                            paddingTop: 12,
                            paddingBottom: 12,
                        }}>호가</div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            width: "100%"
                        }}>
                            <div style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: "#ffffff",
                                fontSize: 18,
                                color: "#202426",
                                width: "33.3%",
                                textAlign: "center",
                                borderBottom: "1px solid #797B7C"
                            }}>가격</div>
                            <div style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: "#ffffff",
                                fontSize: 18,
                                color: "#202426",
                                width: "33.3%",
                                textAlign: "center",
                                borderBottom: "1px solid #797B7C"
                            }}>수량</div>
                            <div style={{
                                paddingTop: 10,
                                paddingBottom: 10,
                                backgroundColor: "#ffffff",
                                fontSize: 18,
                                color: "#202426",
                                width: "33.4%",
                                textAlign: "center",
                                borderBottom: "1px solid #797B7C"
                            }}>총액</div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-end",
                            width: "100%",
                            height: 575,
                            paddingTop: 20,
                            backgroundColor: "#ffffff",
                            overflowY: "auto"
                        }}>
                            {data.map(element => <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                                <div style={{
                                    fontSize: 14,
                                    color: "#78e185",
                                    width: "33.3%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    marginBottom: 20
                                }}>{element.price}</div>
                                <div style={{
                                    fontSize: 14,
                                    color: "#161513",
                                    width: "33.3%",
                                    textAlign: "center",
                                    marginBottom: 20
                                }}>{element.amount}</div>
                                <div style={{
                                    fontSize: 14,
                                    color: "#161513",
                                    width: "33.4%",
                                    textAlign: "center",
                                    marginBottom: 20,
                                    position: "relative"
                                }}>
                                    <div style={{ zIndex: 2 }}>{element.total}</div>
                                    <div style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        width: element.amount / 10,
                                        height: 20,
                                        backgroundColor: "#92de8e",
                                        opacity: 0.4,
                                        zIndex: 1
                                    }} />
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "29.1vw",
                        minHeight: 700
                    }}>
                        <div style={{ width: "100%", backgroundColor: "#ffffff", borderBottom: "1px solid #D2D3D3" }}>
                            <div style={{
                                width: "25%",
                                height: 21,
                                backgroundColor: "#ffffff",
                                borderBottom: "2px solid #212426",
                                fontSize: 21,
                                fontWeight: "bold",
                                color: "#202426",
                                paddingTop: 12,
                                paddingBottom: 12,
                                textAlign: "center"
                            }}>입찰</div>
                        </div>
                        <div style={{
                            width: "92%",
                            paddingRight: "4%",
                            paddingLeft: "4%",
                            backgroundColor: "#ffffff",
                            height: 329,
                            paddingBottom: 40,
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <BuyInput
                                title="가격"
                                unit="원"
                                value={price}
                                setValue={setPrice}
                            />
                            <BuyInput
                                title="수량"
                                unit="JST"
                                value={amount}
                                setValue={setAmount}
                            />
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                alignSelf: "flex-end",
                                justifyContent: "flex-end",
                                marginTop: 10
                            }}>
                                <input onClick={onTwentyfive} style={{
                                    height: 32,
                                    verticalAlign: "center",
                                    outline: 0,
                                    cursor: "pointer",
                                    borderRadius: 6,
                                    border: "1px solid #202426",
                                    textAlign: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: number === 25 ? "#ffffff" : "#202426",
                                    backgroundColor: number === 25 ? "#202426" : "#ffffff",
                                    marginLeft: 10
                                }} type="button" value="25%" />
                                <input onClick={onFifty} style={{
                                    height: 32,
                                    verticalAlign: "center",
                                    outline: 0,
                                    cursor: "pointer",
                                    borderRadius: 6,
                                    border: "1px solid #202426",
                                    textAlign: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: number === 50 ? "#ffffff" : "#202426",
                                    backgroundColor: number === 50 ? "#202426" : "#ffffff",
                                    marginLeft: 10
                                }} type="button" value="50%" />
                                <input onClick={onSeventyFive} style={{
                                    height: 32,
                                    verticalAlign: "center",
                                    outline: 0,
                                    cursor: "pointer",
                                    borderRadius: 6,
                                    border: "1px solid #202426",
                                    textAlign: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: number === 75 ? "#ffffff" : "#202426",
                                    backgroundColor: number === 75 ? "#202426" : "#ffffff",
                                    marginLeft: 10
                                }} type="button" value="75%" />
                                <input onClick={onMax} style={{
                                    height: 32,
                                    verticalAlign: "center",
                                    outline: 0,
                                    cursor: "pointer",
                                    borderRadius: 6,
                                    border: "1px solid #202426",
                                    textAlign: "center",
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: number === 100 ? "#ffffff" : "#202426",
                                    backgroundColor: number === 100 ? "#202426" : "#ffffff",
                                    marginLeft: 10
                                }} type="button" value="MAX" />
                            </div>
                            <BuyInput
                                title="총액"
                                unit="원"
                                value={total}
                                setValue={setTotal}
                            />
                            <div style={{
                                fontSize: 16,
                                color: "#e78276",
                                alignSelf: "flex-end",
                                marginTop: 10,
                            }}>주문가능 : 1,000,000 원</div>
                            <input style={{
                                outline: 0,
                                cursor: "pointer",
                                width: "53%",
                                borderRadius: 5,
                                marginTop: 20,
                                border: 0,
                                height: 48,
                                backgroundColor: "#202426",
                                alignSelf: "center",
                                fontSize: 16,
                                fontWeight: "bold",
                                color: "#ffffff"
                            }} type="button" value="입찰" />
                        </div>
                        <div style={{ width: "100%", backgroundColor: "#ffffff", marginTop: 10, borderBottom: "1px solid #D2D3D3" }}>
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div style={{
                                    width: "25%",
                                    minWidth: 120,
                                    height: 21,
                                    backgroundColor: "#ffffff",
                                    borderBottom: "2px solid #212426",
                                    fontSize: 21,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                    textAlign: "center"
                                }}>주문내역(0)</div>
                                <input style={{
                                    outline: 0,
                                    cursor: "pointer",
                                    border: 0,
                                    fontSize: 14,
                                    color: "#202426",
                                    paddingBottom: 12,
                                    textDecorationLine: "underline",
                                    marginRight: "4%",
                                    backgroundColor: "#ffffff",
                                    minWidth: 50,
                                }} type="button" value="전체 취소" />
                            </div>
                        </div>
                        <div style={{ width: "94%", paddingLeft: "2.5%", paddingRight: "3.5%", backgroundColor: "#ffffff", height: 180, paddingTop: 10, paddingBottom: 20, overflow: "auto" }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                fontSize: 14,
                                opacity: 0.6,
                                color: "#161513",
                                textAlign: "left",
                                marginBottom: 10,
                            }}>
                                <div style={{
                                    width: "19%",
                                    minWidth: 65,
                                    height: 20
                                }}>시간</div>
                                <div style={{
                                    width: "15%",
                                    height: 20,
                                    minWidth: 30
                                }}>이름</div>
                                <div style={{
                                    width: "19%",
                                    height: 20,
                                    minWidth: 65
                                }}>수량</div>
                                <div style={{
                                    width: "19%",
                                    height: 20,
                                    minWidth: 65
                                }}>가격</div>
                                <div style={{
                                    width: "19%",
                                    height: 20,
                                    minWidth: 65
                                }}>총액</div>
                            </div>
                            {BuyData.map(element =>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    width: "100%",
                                    fontSize: 14,
                                    color: "#161513",
                                    textAlign: "left",
                                    marginBottom: 10,
                                }}>
                                    <div style={{
                                        width: "19%",
                                        minWidth: 65,
                                        height: 20,
                                        overflowX: "auto"
                                    }}>{element.time}</div>
                                    <div style={{
                                        width: "15%",
                                        height: 20,
                                        minWidth: 30,
                                        overflowX: "auto"
                                    }}>{element.name}</div>
                                    <div style={{
                                        width: "19%",
                                        height: 20,
                                        minWidth: 65,
                                        overflowX: "auto"
                                    }}>{element.amount}</div>
                                    <div style={{
                                        width: "19%",
                                        height: 20,
                                        minWidth: 65,
                                        overflowX: "auto",
                                        fontWeight: "bold",
                                        color: "#78e185"
                                    }}>{element.price}</div>
                                    <div style={{
                                        width: "19%",
                                        height: 20,
                                        minWidth: 65,
                                        overflowX: "auto"
                                    }}>{element.total}</div>
                                    <input onClick={() => !element.cancel} style={{
                                        height: 20,
                                        minWidth: 30,
                                        overflowX: "auto",
                                        outline: 0,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        verticalAlign: "center",
                                        backgroundColor: "#ffffff",
                                        border: 0
                                    }} type="button" value="취소" />
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "15vw",
                        minHeight: 700
                    }}>
                        <div style={{
                            width: "100%",
                            backgroundColor: "#ffffff",
                            borderBottom: "2px solid #212426",
                            paddingTop: 12,
                            paddingBottom: 12,
                            height: 21,
                            color: "#202426",
                            paddingTop: 12,
                            paddingBottom: 12,
                            textAlign: "center",
                            fontSize: 21,
                            fontWeight: "bold"
                        }}>배당 계산기</div>
                        <div style={{
                            height: 585,
                            paddingLeft: "7.5%",
                            paddingRight: "7.5%",
                            paddingTop: 20,
                            paddingBottom: 33,
                            width: "85%",
                            backgroundColor: "#ffffff"
                        }}>
                            <div style={{
                                fontSize: 18,
                                opacity: 0.6,
                                color: "#202426",
                                marginLeft: 10,
                                marginBottom: 10
                            }}>구매 개수</div>
                            <Calculator value={buyamount} setValue={setBuyamount} unit="개" />
                            <div style={{
                                fontSize: 18,
                                opacity: 0.6,
                                color: "#202426",
                                marginLeft: 10,
                                marginBottom: 10
                            }}>구매 가격</div>
                            <Calculator value={buyprice} setValue={setBuyprice} unit="원" />
                            <div style={{
                                fontSize: 18,
                                opacity: 0.6,
                                color: "#202426",
                                marginLeft: 10,
                                marginBottom: 10
                            }}>예상 성장률</div>
                            <Calculator value={buytotal} setValue={setBuytotal} unit="%" />
                            <input style={{
                                width: "100%",
                                backgroundColor: "#e78276",
                                border: 0,
                                outline: 0,
                                cursor: "pointer",
                                textAlign: "center",
                                verticalAlign: "center",
                                fontSize: 18,
                                color: "#ffffff",
                                height: 40,
                                borderRadius: 50,
                                marginTop: 30,
                                marginBottom: 20,
                            }} type="button" value="계산" />
                            <div style={{
                                fontSize: 18,
                                opacity: 0.6,
                                color: "#202426",
                                marginLeft: 10,
                                marginBottom: 10
                            }}>총 배당</div>
                            <div style={{
                                width: "74%",
                                backgroundColor: "#ffffff",
                                borderRadius: 50,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingLeft: "13%",
                                paddingRight: "13%",
                                marginBottom: 20,
                                border: "2px solid #212426",
                                height: 40,
                            }}>
                                <div style={{
                                    width: "81%",
                                    height: 26,
                                    textAlign: "right",
                                    verticalAlign: "center",
                                    fontSize: 18,
                                    color: "#737576",
                                    backgroundColor: "#ffffff",
                                    border: 0,
                                    outline: 0,
                                }}></div>
                                <div style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    marginLeft: "3%"
                                }}>원</div>
                            </div>
                            <div style={{
                                fontSize: 18,
                                opacity: 0.6,
                                color: "#202426",
                                marginLeft: 10,
                                marginBottom: 10
                            }}>예상 수익률</div>
                            <div style={{
                                width: "74%",
                                backgroundColor: "#ffffff",
                                borderRadius: 50,
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                paddingLeft: "13%",
                                paddingRight: "13%",
                                marginBottom: 20,
                                border: "2px solid #212426",
                                height: 40,
                            }}>
                                <div style={{
                                    width: "81%",
                                    height: 26,
                                    textAlign: "right",
                                    verticalAlign: "center",
                                    fontSize: 18,
                                    color: "#737576",
                                    backgroundColor: "#ffffff",
                                    border: 0,
                                    outline: 0,
                                }}></div>
                                <div style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#202426",
                                    marginLeft: "3%"
                                }}>%</div>
                            </div>
                            <div style={{
                                fontSize: 14,
                                lineHeight: 2.14,
                                color: "#e78276",
                                textAlign: "center",
                                maxWidth: 195,
                            }}>* 해당 배당 계산기는 투자 참고 자료로 활용하시기 바랍니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}