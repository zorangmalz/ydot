import React, { useReducer, useState,useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs'
import { FiArrowRightCircle } from 'react-icons/fi';
import { BiCheckCircle } from 'react-icons/bi'
import { useHistory } from "react-router-dom"
import callAPI from "../line"
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useSelector } from "react-redux";

export const vw = window.innerWidth / 100
export const vh = window.innerHeight / 100


export default function Header({ splash, bold }) {
    const [mine, setMine] = useState(false)
    return (
        <header style={{
            zIndex: 3,
            width: 68 * vw,
            height: 90,
            backgroundColor: "#ffffff",
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 16 * vw,
            paddingRight: 16 * vw,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {mine ? 
                <MyInfo />
                :
                <></>
            }
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <div to={'/'} style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "#202426",
                        marginRight: 72,
                    }}>Y.</div>
                    {splash ?
                        <></>
                        :
                        <>
                            <Link to={'/home'} style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: bold ===  "Home" ? "bold" : "normal",
                                marginRight: 40,
                                textDecorationLine: "none",
                            }}>펀딩하기</Link>
                            <Link to={'/asset'} style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: bold ===  "Asset" ? "bold" : "normal",
                                marginRight: 40,
                                textDecorationLine: "none",
                            }}>내 자산</Link>
                        </>
                    }
                </div>
                {splash ? <></> : <button style={{
                    backgroundColor: "#ffffff",
                    border: 0,
                    outline: 0,
                    cursor: "pointer"
                }} onClick={() => setMine(!mine)}><FaUserCircle color="#202426" size={48} /></button>}
            </div>
        </header>
    )
}

export function MyInfo() {
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [leng,setLeng]=useState("")
    const [email,setEmail]=useState("")
    const [amount,setAmount]=useState("")
    const [wallet,setWallet]=useState("")
    //유저의 코인 총량. 내 자산 및 팝업에서 원 대신에 보여주면 됨
async function CoinAmount() {
    let UserAddress = "tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
    let UserSecret = "t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="

    let path = `/v1/wallets/${UserAddress}/base-coin`

    let txid = await callAPI("GET", path)
    console.log(txid.amount)
    var a=Number(txid.amount)/1000000
    setAmount(a)
    TokenNumber()
}
//유저의 토큰 개수. 내자산 및 팝업에서 토큰 개수 및 토큰 양 보여주는데 사용
async function TokenNumber() {
    let UserAddress = "tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
    let UserSecret = "t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="
    let path = `/v1/wallets/${UserAddress}/service-tokens`
    let txid = await callAPI("GET", path)
    //내자산 팝업에서 보유토큰에 쓰일 변수
    console.log(txid.length)
    setLeng(txid.length)

    //유저의 코인 총량. 내 자산에서 원 대신에 보여주면 됨
}

function getInfo(){
    firestore.collection("User").doc(uid).get().then(doc=>{
        setEmail(doc.data().email)
        setWallet(doc.data().wallet)
    })
}
useEffect(()=>{
    CoinAmount()
    getInfo()
},[])
    const data = [
        {
            title: "지갑주소",
            content: "0xE50…336BC"
        },
        {
            title: "지갑 잔액",
            content: [700, <div style={{ fontWeight: "normal", display: "inline-block", fontSize: 12 }}>LINK</div>]
        },
    ]
    return (
        <>
            <div style={{
                position: "absolute",
                zIndex: 3,
                top: 90,
                right: 16 * vw + 10,
                width: 330,
                height: 230,
                paddingTop: 30,
                paddingLeft: 30,
                paddingRight: 20,
                paddingBottom: 20,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: "solid 2px rgba(33, 36, 38, 0.8)"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: 10,
                }}>
                    <div style={{
                        fontSize: 12,
                        opacity: 0.6,
                        color: "#202426",
                    }}>내 계정</div>
                    <input type="button" style={{
                        outline: 0,
                        cursor: "pointer",
                        border: 0,
                        backgroundColor: "#ffffff",
                        fontSize: 12,
                        opacity: 0.6,
                        color: "#202426",
                        textDecorationLine: "underline"
                    }} value="로그아웃" />
                </div>
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20
                }}>{email}</div>
          
                        <div style={{
                            fontSize: 12,
                            opacity: 0.6,
                            color: "#202426",
                        }}>지갑 주소</div>
                        <div style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "#202426",
                            marginBottom: 20
                        }}>{wallet}</div>
          
          <div style={{
                            fontSize: 12,
                            opacity: 0.6,
                            color: "#202426",
                        }}>지갑 잔액</div>
                        <div style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: "#202426",
                            marginBottom: 20
                        }}>{amount}LINK</div>
          
                <div style={{
                    fontSize: 12,
                    opacity: 0.6,
                    color: "#202426",
                }}>보유 토큰</div>
                <div style={{
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20,
                    textDecorationLine: "underline"
                }}>
                    {leng}<div style={{display: "inline-block", fontWeight: "normal", textDecorationLine: "underline", fontSize: 12}}>개</div>
                </div>
            </div>
        </>
    )
}

//SplashScreen.js 요소
export function GuideBox({ navigation, icon, title, content, button, center }) {
    return (
        <>
            <div style={{
                width: 400,
                backgroundColor: "#ffffff",
                borderRadius: 30,
                paddingTop: 30,
                paddingBottom: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 20,
                marginRight: 20,
            }}>
                {icon}
                <p style={{
                    display: "inline-block",
                    fontSize: 18,
                    color: "#202426",
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 0,
                }}>{title}</p>
                <p style={{
                    display: "inline-block",
                    fontSize: 16,
                    opacity: 0.8,
                    color: "#202426",
                    height: 116,
                    lineHeight: 1.88
                }}>{content}</p>
                <button style={{
                    cursor: "pointer",
                    outline: 0,
                    display: "flex",
                    flexDirection: "row",
                    width: 200,
                    height: 48,
                    marginTop: 20,
                    backgroundColor: "#ffffff",
                    borderWidth: 2,
                    borderColor: "#202426",
                    borderRadius: 7,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <p style={{
                        textAlign: "center",
                        fontSize: 15,
                        color: "#202426",
                        lineHeight: 1.33,
                        marginRight: 5
                    }}>{button}</p>
                    <FaArrowRight color="#212426" size={15} />
                </button>
            </div>
        </>
    )
}

export function FAQ({ title, content, value, onClick }) {
    return (
        <div style={{
            display: "flex",
            width: 840,
            height: value ? 160 : 80,
            borderRadius: 30,
            backgroundColor: "#efefef",
            paddingBottom: value ? 40 : 0,
            paddingLeft: 40,
            paddingRight: 40,
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: 20
        }}>
            <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <p style={{
                    fontSize: 18,
                    color: "#o202426",
                    lineHeight: 3.33,
                    fontWeight: "bold"
                }}>{title}</p>
                <button onClick={onClick} style={{
                    cursor: "pointer",
                    outline: 0,
                    border: 0,
                    backgroundColor: "#efefef"
                }}><AiFillCaretDown size={24} color="#202426" /></button>
            </div>
            {value ?
                <div style={{
                    fontSize: 16,
                    lineHeight: 1.88,
                    color: "#202426",
                    textAlign: "left"
                }}>{content}</div>
                :
                <></>
            }
        </div>
    )
}

//HomeMain.js와 AuctionMain.js 요소
export function CreatorInfo({ img, name, FundingNum, FundingTotal, percent, Deadline }) {
    const history = useHistory()

    const direct = "/home/" + String(name)
    const auctiondirect = "/auction/" + String(name)
    //link 쓰려다가 화면이 이상해져서 history 로 대체. 뭔차인지는 모르겠음ㅇ
    function move() {
        history.push("/home/" + String(name))
    }
    return (
        <>
            <div onClick={move} style={{
                width: 235,
                height: 266,
                borderRadius: 20,
                border: "1px solid #202426",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                marginLeft: 20,
                marginRight: 20,
            }}>
                <div style={{
                    position: "relative",
                    width: 235,
                    height: 120,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "flex-end"
                }}>
                    <img src={img} style={{
                        zIndex: 0,
                        position: "absolute",
                        top: 0,
                        width: 235,
                        height: 120,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }} />
                    <div style={{
                        zIndex: 1,
                        width: 30,
                        paddingLeft: 10,
                        paddingRight: 10,
                        height: 18,
                        paddingTop: 4,
                        paddingBottom: 4,
                        backgroundColor: "#202426",
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#ffffff",
                        textAlign: "center",
                        verticalAlign: "center"
                    }}>D-{Deadline == 0 ? 0 : Deadline}</div>
                </div>
                <div style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#161513",
                    marginTop: 10,
                    marginLeft: 20,
                    alignSelf: "flex-start"
                }}>{name}</div>
                <div style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "#202426",
                    marginTop: 10,
                    marginLeft: 20,
                    alignSelf: "flex-start"
                }}><div style={{ display: "inline-block", fontWeight: "bold" }}>{FundingNum}</div> 개 판매</div>
                <div style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "#202426",
                    marginTop: 10,
                    marginLeft: 20,
                    marginBottom: 10,
                    alignSelf: "flex-start"
                }}><div style={{ display: "inline-block", fontWeight: "bold" }}>{FundingTotal}</div> LINK 펀딩</div>
                <ProgressBar completed={percent} />
                {/* {ongoing ?
                    <Link to={auctiondirect}><input style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 400,
                        height: 50,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                        borderWidth: 0,
                        backgroundColor: "#202426",
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#ffffff",
                        textDecorationLine: "none"
                    }} type="button" value="공모 참여하기" /></Link>
                    :
                    <Link to={direct}><button style={{
                        cursor: "pointer",
                        outline: 0,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        border: 0,
                        height: 25,
                        marginTop: 10,
                        textDecorationLine: "none"
                    }}>
                        <div style={{
                            fontSize: 16,
                            color: "#202426",
                            marginRight: 12,
                            lineHeight: 1.38,
                            textDecorationLine: "none"
                        }}>상세정보</div>
                        <FiArrowRightCircle size={22} color="#202426" />
                    </button></Link>
                } */}
            </div>

        </>
    )
}

//HomeMain.js랑 Creator.js에서 많이 사용
export function CloseBeta({img, title, content}) {
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                marginLeft: 20,
                marginRight: 20
            }}>
                <img src={img} style={{width: 80, height: 80, marginTop: 7, marginRight: 40}} />
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start"
                }}>
                    <div style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#202426",
                        marginBottom: 10
                    }}>{title}</div>
                    <div style={{
                        opacity: 0.8,
                        fontSize: 16,
                        color: "#202426",
                        lineHeight: 1.88,
                        letterSpacing: 0.19,
                        width: 390,
                    }}>{content}</div>
                </div>
            </div>
        </>
    )
}

export function ProgressBar({ completed }) {

    const containerStyles = {
        height: 20,
        width: 195,
        backgroundColor: "#dbdbdb",
        borderRadius: 10,
        marginLeft: 20
    }

    const fillerStyles = {
        height: '100%',
        width: completed.toFixed(1) < 5 ? "5%" : `${completed}%`,
        backgroundColor: "#202426",
        borderRadius: 'inherit',
        textAlign: "center",
        borderRadius: 10,
    }

    const labelStyles = {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed.toFixed(1)}%`}</span>
            </div>
        </div>
    );
};


//Creator.js 요소
export function CreatorIntro({ title, content, other }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: 180
        }}>
            <div style={{
                opacity: 0.6,
                color: "#202426",
                fontSize: 18,
                height: 26,
                marginBottom: 10
            }}>{title}</div>
            {other ?
                content
                :
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    marginBottom: 20,
                }}>{content}</div>
            }
        </div>
    )
}

export function Information({ width, paddingTop, paddingBottom, border, title, content, unit, detail }) {
    return (
        <div style={{
            width: width,
            borderRadius: border,
            paddingTop: paddingTop,
            paddingBottom: paddingBottom,
            backgroundColor: "#efefef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
        }}>
            <div style={{
                opacity: 0.6,
                fontSize: 18,
                color: "#202426",
                marginBottom: 10,
            }}>{title}</div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "center",
                marginBottom: 10,
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    marginRight: 4,
                    height: 26
                }}>{content}</div>
                <div style={{
                    fontSize: 18,
                    color: "#202426",
                    height: 26
                }}>{unit}</div>
            </div>
            <div style={{
                opacity: 0.6,
                fontSize: 16,
                color: "#212426"
            }}>{detail}</div>
        </div>
    )
}

export function Line({ width }) {
    return (
        <div style={{ width: width, height: 1, backgroundColor: "#212426", opacity: 0.2 }} />
    )
}

export function QAList({ title, content }) {
    return (
        <div style={{
            width: 1060,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }}>
            <div style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#161513",
                letterSpacing: 0.22,
                marginBottom: 20
            }}>{title}</div>
            <div style={{
                fontSize: 16,
                opacity: 0.8,
                color: "#202426",
                lineHeight: 1.88,
                marginBottom: 20
            }}>{content}</div>
        </div>
    )
}

//AuctionCreator.js 사용
export function CreatorProfile({ img, name, start, predict, sell, state }) {
    return (
        <div style={{
            width: 68 * vw - 40,
            height: 70,
            paddingLeft: 40,
            paddingTop: 16,
            paddingBottom: 16,
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        }}>
            <img src={img} alt="나중에" style={{ width: 70, height: 70, borderRadius: 35 }} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 120,
                marginLeft: 40
            }}>
                <RegularAuction>채널 이름</RegularAuction>
                <BoldAuction>{name}</BoldAuction>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 120,
                marginLeft: 20
            }}>
                <RegularAuction>시작가</RegularAuction>
                <BoldAuction>{start}</BoldAuction>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 180,
                marginLeft: 20
            }}>
                <RegularAuction>예상가</RegularAuction>
                <BoldAuction state >{predict}</BoldAuction>
            </div>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: 120,
                marginLeft: 20
            }}>
                <RegularAuction>판매량</RegularAuction>
                <BoldAuction>{sell}</BoldAuction>
            </div>
        </div>
    )
}

const RegularAuction = styled.div`
    font-size: 18;
    opacity: 0.6;
    color: #202426;
    text-align: left;
    margin-bottom: 10px;
`

const BoldAuction = styled.div`
    font-size: 21;
    color: #202426;
    font-weight: bold;
    text-align: left;
`

//단순히 다른곳에 붙이면 넓이가 %로 되어있어 안됨
export function BuyInput({ title, unit, value, setValue }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "94%",
            paddingLeft: "3%",
            paddingRight: "3%",
            backgroundColor: "#efefef",
            height: 50,
            alignSelf: "center",
            borderRadius: 10,
            marginTop: 20,
        }}>
            <div style={{
                fontSize: 18,
                opacity: 0.6,
                color: "#202426",
                minWidth: 40,
                marginRight: "8%"
            }}>{title}</div>
            <input
                style={{
                    width: "70%",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#202426",
                    outline: 0,
                    border: 0,
                    backgroundColor: "#efefef",
                    textAlign: "right"
                }}
                type="text" value={value} onChange={({ text }) => setValue(text)}
            />
            <div style={{
                fontSize: 18,
                opacity: 0.6,
                color: "#202426",
                minWidth: 40,
                fontWeight: "bold",
                textAlign: "right"
            }}>{unit}</div>
        </div>
    )
}

export function Calculator({ value, setValue, unit }) {
    return (
        <div style={{
            width: "74%",
            backgroundColor: "#F2F2F2",
            borderRadius: 50,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingLeft: "13%",
            paddingRight: "13%",
            marginBottom: 10,
            height: 40,
        }}>
            <input onChange={({ text }) => setValue(text)} style={{
                width: "81%",
                height: 26,
                textAlign: "right",
                verticalAlign: "center",
                fontSize: 18,
                color: "#737576",
                backgroundColor: "#F2F2F2",
                border: 0,
                outline: 0,
            }} type="text" value={value} />
            <div style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#202426",
                marginLeft: "3%"
            }}>{unit}</div>
        </div>
    )
}

//Popup 디자인
export function PopupOne({ setVisible, setNextVisible }) {
    const [use, setUse] = useState(false)
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)
    const [invest, setInvest] = useState(false)
    const UserIcon = use ? <BsCheck color="#161513" size={16} /> : <></>
    const UseClick = () => {
        setUse(!use)
        setOne(true)
        setTwo(true)
        setThree(true)
    }
    const OneIcon = one ? <BsCheck color="#161513" size={16} /> : <></>
    const TwoIcon = two ? <BsCheck color="#161513" size={16} /> : <></>
    const ThreeIcon = three ? <BsCheck color="#161513" size={16} /> : <></>
    const FourIcon = four ? <BsCheck color="#161513" size={16} /> : <></>
    const InvestIcon = invest ? <BsCheck color="#161513" size={16} /> : <></>

    const onNext = () => {
        setVisible(false)
        setNextVisible(true)
    }

    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 100 * vw,
            height: 100 * vh,
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: 100 * vw,
                height: 100 * vh,
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 1,
            }} />
            <div style={{
                zIndex: 2,
                width: 340,
                height: 376,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>이용 약관 동의</div>
                <div style={{
                    width: 287,
                    height: 48,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#efefef",
                    marginBottom: 20,
                    borderRadius: 10,
                }}>
                    <div style={{
                        fontSize: 14,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>이용약관 전체 동의</div>
                    <button onClick={UseClick} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{UserIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>개인정보 처리 약관(필수)</div>
                    <button onClick={() => setOne(!one)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{OneIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>이용약관 동의(필수)</div>
                    <button onClick={() => setTwo(!two)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{TwoIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>자산손실의 위험을 인지했습니다(필수)</div>
                    <button onClick={() => setThree(!three)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{ThreeIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 20,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}>
                    <div style={{
                        opacity: 0.6,
                        fontSize: 14,
                        color: "#161513",
                    }}>펀딩완료시 SNS, Email 알람 수신(선택)</div>
                    <button onClick={() => setFour(!four)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{FourIcon}</button>
                </div>
                <div style={{
                    width: 287,
                    height: 48,
                    paddingLeft: 20,
                    paddingRight: 33,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#efefef",
                    marginBottom: 36,
                    borderRadius: 10,
                }}>
                    <div style={{
                        fontSize: 14,
                        color: "#161513",
                        fontWeight: "bold"
                    }}>투자조건을 확인했습니다.</div>
                    <button onClick={() => setInvest(!invest)} style={{
                        cursor: "pointer",
                        outline: 0,
                        width: 16,
                        height: 16,
                        border: "1px solid #202426",
                        backgroundColor: "#ffffff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>{InvestIcon}</button>
                </div>
                <input onClick={onNext} type="button" style={{
                    cursor: "pointer",
                    width: 300,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#202426",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                }} value="다음" />
            </div>
        </div>
    )
}

function PopupReducer(state, action) {
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

export function PopupTwo({ setVisible, setNextVisible }) {

    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [money, setMoney] = useState("")
    const [amount,setAmount]=useState("")
    const [tok,setTok]=useState("")
    //유저의 코인 총량. 내 자산 및 팝업에서 원 대신에 보여주면 됨
async function CoinAmount() {
    let UserAddress = "tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
    let UserSecret = "t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="

    let path = `/v1/wallets/${UserAddress}/base-coin`

    let txid = await callAPI("GET", path)
    console.log(txid.amount)
    var a=Number(txid.amount)/1000000
    setAmount(a)
}
const onChange = (e) => {
    console.log(e.target)		//이벤트가 발생한 타겟의 요소를 출력
    console.log(e.target.value)	//이벤트가 발생한 타겟의 Value를 출력
    setMoney(e.target.value)		//이벤트 발생한 value값으로 {text} 변경
}
useEffect(()=>{
    CoinAmount()
},[])
useEffect(()=>{
    setTok((Number(money)/1.636).toFixed(6))
},[money])
    const [number, dispatch] = useReducer(PopupReducer, 0)
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
    
    const onNext = () => {
        transaction()
        setVisible(false)
        setNextVisible(true)
    }


    async function transaction() {
        
        //여기에 나중에 얼마 코인 보내고 얼마 받고 설정, 팝업에서
        let AdminAddress = "tlink1uvv95a2rgw24px7xz92wk8qnuxz9parkz5aw3a"
        let AdminSecret = "msboBN80fozDAvWOiyqsaOd7Fy6NNMxGc3VLHt3hcM8="
        let UserAddress = "tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
        let UserSecret = "t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="

        let path = `/v1/wallets/${UserAddress}/base-coin/transfer`
        let coinAmount = String(money*1000000)
        let txid = await callAPI("POST", path, {
            "walletSecret": UserSecret,
            "toAddress": AdminAddress,
            "amount": coinAmount
        })
        //amount 부분을 조정하면됨. 그거에 비례해서 토큰 트랜잭션 띄워주기
        //callapi 는 line.js에 만들어둠
        console.log(txid)
        //txid=transaction hash. 이걸 파베에 저장~
        transactionToken(coinAmount)
    }
    async function transactionToken(coinAmount) {

        //요건 코인의 양에 따라 다시 토큰을 재분배해주는것

        let AdminAddress = "tlink1uvv95a2rgw24px7xz92wk8qnuxz9parkz5aw3a"
        let AdminSecret = "msboBN80fozDAvWOiyqsaOd7Fy6NNMxGc3VLHt3hcM8="
        let UserAddress = "tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
        let UserSecret = "t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="
        let ContractID = "138bd530"
        let path = `/v1/wallets/${AdminAddress}/service-tokens/${ContractID}/transfer`
        console.log(tok)
        let token=String(tok*1000000)
        console.log(token)
        let txid = await callAPI("POST", path, {
            "walletSecret": AdminSecret,
            "toAddress": UserAddress,
            "amount": token
        })
        console.log(txid)

        firestoreUpload(coinAmount,tok, txid)

    }
    async function mint(){
        const today = new Date()
        const year = today.getFullYear();
        const month = today.getMonth() + 1
        const day = today.getDate()
        let AdminAddress="tlink1uvv95a2rgw24px7xz92wk8qnuxz9parkz5aw3a"
        let AdminSecret="msboBN80fozDAvWOiyqsaOd7Fy6NNMxGc3VLHt3hcM8="
        let UserAddress="tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
        let contractId="7d8a9402"
        let tokenType="10000002"
        let tokenIdName="Pood"
        let info="user1@ydot.xyz 님께서 Pood님께 "+year + "/" + month + "/" + day+"에 편딩하셨습니다"
        let path = `/v1/item-tokens/${contractId}/non-fungibles/${tokenType}/mint`;
        let a=await callAPI('POST', path, {
            "ownerAddress": AdminAddress,
            "ownerSecret": AdminSecret,
            "name": tokenIdName,
            "toAddress": UserAddress,
            "meta" : info 
        });
        console.log(a)
        return a
    }
    async function firestoreUpload(coinAmount,tok, txid) {
        let nTxid=await mint()
        const names = "지순’s 일상"
        const len = coinAmount.length
        const today = new Date()
        const year = today.getFullYear();
        const month = today.getMonth() + 1
        const day = today.getDate()

        firestore.collection("User").doc(uid).collection("Fund").doc(names).set({
            DayTime: year + "/" + month + "/" + day,
            Money: Number(coinAmount),
            TransactionHash: txid,
            NftTx:nTxid,
            Number: Number(tok),
            ongoing: 0,
            per:1.636,
            channel:"Pood"

        })
        var now
        await firestore.collection("Creator").doc("[Vlog] 지순's 일상").get().then(doc => {
            now = doc.data().FundingTotal
        })
        console.log(now)
        
        
        
        await firestore.collection("Creator").doc("[Vlog] 지순's 일상").update({
            FundingTotal: Number(now) + Number(coinAmount)/1000000

        })
    }
    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 100 * vw,
            height: 100 * vh,
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: 100 * vw,
                height: 100 * vh,
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 0,
            }} />
            <div style={{
                zIndex: 1,
                width: 340,
                height: 376,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 40,
                }}>펀딩 금액 입력</div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 28,
                    maxWidth: 240,
                }}>
                    <input type="text" style={{
                        fontSize: 21,
                        fontWeight: "bold",
                        color: "#202426",
                        maxWidth: 200,
                        marginRight: 4,
                        outline: 0,
                        border: 0,
                        textAlign: "right"
                    }} value={money} onChange={onChange} />
                    <div style={{
                        fontSize: 18,
                        fontWeight: "normal",
                        color: "#202426"
                    }}>LINK</div>
                </div>
                <div style={{
                    width: 240,
                    border: "1px solid #202426",
                    marginBottom: 10,
                    marginTop: 10
                }} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: 242,
                    marginBottom: 10
                }}>
                    <input onClick={onTwentyfive} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 25 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 25 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 25 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                    }} value="25%" />
                    <input onClick={onFifty} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 50 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 50 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 50 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="50%" />
                    <input onClick={onSeventyFive} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 75 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 75 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 75 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="75%" />
                    <input onClick={onMax} type="button" style={{
                        width: 48,
                        height: 32,
                        outline: 0,
                        cursor: "pointer",
                        fontSize: 14,
                        color: number === 100 ? "#ffffff" : "#202426",
                        fontWeight: "bold",
                        border: number === 100 ? 0 : "1px solid #35363b",
                        backgroundColor: number === 100 ? "#202426" : "#ffffff",
                        borderRadius: 5,
                        marginLeft: 10,
                    }} value="MAX" />
                </div>
                <div style={{
                    fontSize: 16,
                    opacity: 0.8,
                    color: "#e61800",
                    width: 222,
                    textAlign: "right",
                    marginBottom: 20,
                }}>최대 {amount} LINK</div>
                <FaArrowDown size={32} color="#000000" style={{ marginBottom: 20, height: 40, width: 32 }} />
                <div style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#161513",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 40,
                }}>{tok} JSC</div>
                <input onClick={onNext} type="button" style={{
                    cursor: "pointer",
                    width: 300,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#202426",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                }} value="펀딩하기" />
            </div>
        </div>
    )
}

export function PopupThree({ setVisible }) {
    const address = "0x649640518e043295c86e674b4904…e6989215db2"
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [hash,setHash]=useState("")
    function getInfo(){
        firestore.collection("User").doc(uid).collection("Fund").doc("지순’s 일상").onSnapshot(doc=>{
            setHash(doc.data().TransactionHash.txHash)
        })
        console.log("g")
    }
    useEffect(()=>{
        getInfo()
    },[])
    return (
        <div style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 100 * vw,
            height: 100 * vh,
        }}>
            <div onClick={() => setVisible(false)} style={{
                position: "absolute",
                top: 0,
                width: 100 * vw,
                height: 100 * vh,
                backgroundColor: "#000000",
                opacity: 0.4,
                zIndex: 0,
            }} />
            <div style={{
                zIndex: 1,
                width: 340,
                height: 376,
                paddingTop: 30,
                paddingBottom: 40,
                paddingRight: 30,
                paddingLeft: 30,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <div style={{
                    fontSize: 21,
                    fontWeight: "bold",
                    color: "#202426",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 40,
                }}>펀딩 완료</div>
                <BiCheckCircle color="#202426" size={120} style={{ width: 120, height: 120, marginBottom: 40 }} />
                <div style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#161513",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 20,
                }}>Tx hash</div>
                <div style={{
                    fontSize: 12,
                    color: "#202426",
                    lineHeight: 1.33,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <div style={{ textAlign: "center", marginBottom: 10 }}>{hash}</div>
                    <input type="button" style={{ marginRight: 18, fontSize: 12, color: "#202426", alignSelf: "flex-end", textDecorationLine: "underline", border: 0, outline: 0, cursor: "pointer", backgroundColor: "#ffffff", marginBottom: 20 }} value="View in LINK Scope" />
                </div>
                <input onClick={() => setVisible(false)} type="button" style={{
                    cursor: "pointer",
                    width: 300,
                    height: 48,
                    border: 0,
                    outline: 0,
                    borderRadius: 10,
                    backgroundColor: "#202426",
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#ffffff",
                    alignSelf: "center",
                }} value="완료" />
            </div>
        </div>
    )
}