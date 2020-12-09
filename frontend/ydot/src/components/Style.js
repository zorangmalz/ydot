import React from 'react';
import styled, { css } from 'styled-components';
import { FaUserCircle, FaArrowRight } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { FiArrowRightCircle } from 'react-icons/fi';

export const vw = window.innerWidth / 100
export const vh = window.innerHeight / 100

export default function Header({ splash, bold }) {
    return (
        <header style={{
            width: 68 * vw,
            height: 80,
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
                    <div style={{
                        fontSize: 40,
                        fontWeight: "bold",
                        color: "#202426",
                    }}>Y.</div>
                    {splash ?
                        <></>
                        :
                        <>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: bold === "Home" || bold === "Creator" ? "bold" : "normal",
                                marginRight: 40,
                                marginLeft: 72,
                            }}>{bold === "Home" ? "Home" : bold === "Creator" ? "크리에이터" : "Home"}</div>
                            <div style={{
                                fontSize: 21,
                                fontWeight: bold === "Auction" ? "bold" : "normal",
                                color: "#202426",
                                marginRight: 40
                            }}>배당권 경매</div>
                            <div style={{
                                fontSize: 21,
                                fontWeight: bold === "Money" ? "bold" : "normal",
                                color: "#202426"
                            }}>내 자산</div>
                        </>
                    }
                </div>
                {splash ? <></> : <FaUserCircle color="#202426" size={48} />}
            </div>
        </header>
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
                alignItems:"center",
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
            backgroundColor: "#ffffff",
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
                    backgroundColor: "#ffffff"
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
export function CreatorInfo({ ongoing, img, name, introduction, start }) {
    return (
        <>
            <div style={{
                width: 400,
                paddingTop: 20,
                paddingBottom: ongoing ? 0 : 20,
                backgroundColor: "#efefef",
                borderRadius: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: 20,
                marginRight: 20,
            }}>
                <img src={img} alt="나중에" style={{ width: 120, height: 120, borderRadius: 60 }} />
                <div style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#161513",
                    marginTop: 20
                }}>{name}</div>
                <div style={{
                    fontSize: 16,
                    lineHeight: 1.88,
                    textAlign: "center",
                    color: "#202426",
                    opacity: 0.8,
                    marginTop: 10
                }}>{introduction}</div>
                <div style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#202426",
                    marginTop: 10,
                    marginBottom: 10,
                }}>경매 시작일 : {start}</div>
                {ongoing ?
                    <input style={{
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
                    }} type="button" value="공모 참여하기" />
                    :
                    <button style={{
                        cursor: "pointer",
                        outline: 0,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        border: 0,
                        height: 25,
                        marginTop: 10,
                    }}>
                        <p style={{
                            fontSize: 16,
                            color: "#202426",
                            marginRight: 12,
                            lineHeight: 1.38
                        }}>상세정보</p>
                        <FiArrowRightCircle size={22} color="#202426" />
                    </button>
                }
            </div>
        </>
    )
}


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
                fontSize: 21,
                fontWeight: "bold",
                color: "#161513",
                marginBottom: 20
            }}>{title}</div>
            <div style={{
                fontSize: 18,
                opacity: 0.8,
                color: "#161513",
                lineHeight: 1.39,
                marginBottom: 40
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