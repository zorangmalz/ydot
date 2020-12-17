import React, { Suspense, useState } from 'react'
import Header, { CreatorIntro, Information, Line, vh, vw, QAList } from '../Style'
import { GoHeart } from 'react-icons/go'
import { IoMdShare } from 'react-icons/io'
import { AiFillYoutube } from 'react-icons/ai'
import { ImTwitch } from 'react-icons/im'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { useHistory } from 'react-router-dom'
import callAPI from "../../line"


//팝업부분을 여기다 구현해놓음. 나중에 input값을 coinAmount변수로 넣어서 주면 됨
async function transaction(){
//여기에 나중에 얼마 코인 보내고 얼마 받고 설정, 팝업에서
let AdminAddress="tlink1uvv95a2rgw24px7xz92wk8qnuxz9parkz5aw3a"
let AdminSecret="msboBN80fozDAvWOiyqsaOd7Fy6NNMxGc3VLHt3hcM8="
let UserAddress="tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
let UserSecret="t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="

let path=`/v1/wallets/${UserAddress}/base-coin/transfer`
let coinAmount="100"
let txid=await callAPI("POST",path,{
    "walletSecret":UserSecret,
    "toAddress":AdminAddress,
    "amount":coinAmount
})
//amount 부분을 조정하면됨. 그거에 비례해서 토큰 트랜잭션 띄워주기
//callapi 는 line.js에 만들어둠
console.log(txid)
//txid=transaction hash. 이걸 파베에 저장~
transactionToken(coinAmount)
}
async function transactionToken(coinAmount){

    //요건 코인의 양에 따라 다시 토큰을 재분배해주는것

    let AdminAddress="tlink1uvv95a2rgw24px7xz92wk8qnuxz9parkz5aw3a"
    let AdminSecret="msboBN80fozDAvWOiyqsaOd7Fy6NNMxGc3VLHt3hcM8="
    let UserAddress="tlink1hmnzxlcmu75mk5a5j62e5ksvswwhs866d57e42"
    let UserSecret="t0YlRhABg6G+faYzL4BB8afAIiEe94qjtYjmBoCy9uU="
    let ContractID="b2e77278"
    let path=`/v1/wallets/${AdminAddress}/service-tokens/${ContractID}/transfer`
    
    let txid=await callAPI("POST",path,{
        "walletSecret":AdminSecret,
        "toAddress":UserAddress,
        "amount":coinAmount
    })
    console.log(txid)
}
export default function Creator() {
    const history = useHistory()
    const [infor, setInfor] = useState(true)
    const name = "지순’s 일상"
    const auctiondirect = "/auction/" + String(name)
    const QA = [
        {
            title: 'Q1. 자기 소개 부탁드립니다!',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q2. 제주먹자 TV는 어떤 채널인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q3. 펀딩을 진행하게된 동기는 무엇인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q4. 내가 가지는 차별성은? 다른채널과 차이점은 무엇인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q5.  모집한 자금은 어떻게 사용할것인가요?',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
        {
            title: 'Q6.  상환계획에 대해서 이야기해주세요',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.'
        },
    ]

    const Invest = [
        {
            img: "",
            title: "일상/Vlog",
            content: ["해당 섹터의 평균 조회수 성장률은", <br />, <div style={{ fontWeight: "bold", display: "inline-block" }}>5%</div>, "이며, 구독자 성장률은", <div style={{ fontWeight: "bold", display: "inline-block" }}>3%</div>, "입니다."]
        },
        {
            img: "",
            title: "고속성장",
            content: ["섹터 조회수 성장률 보다", <div style={{ fontWeight: "bold", display: "inline-block" }}>5%</div>, "높습니다!", <br />, "섹터 구독자 성장률보다", <div style={{ fontWeight: "bold", display: "inline-block" }}>5%</div>, "높습니다."]
        },
        {
            img: "",
            title: "사랑받는 크리에이터",
            content: ["좋아요/싫어요 비율, 댓글 수가", <br />, "섹터 평균보다 높습니다!"]
        },
    ]

    const [amount, setAmount] = useState("1000")
    const [price, setPrice] = useState("1000")
    const [rate, setRate] = useState("5")
    const [profit, setProfit] = useState("1000")
    const [goodrate, setGoodRate] = useState("5")
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#efefef" }}>
            <Header splash={false} bold="Creator" />
            <div style={{
                backgroundColor: "#efefef",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
            }}>
                <Line width={1280} />
                <div style={{
                    backgroundColor: "#ffffff",
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <input onClick={() => setInfor(true)} style={{
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: infor ? "#212426" : "#ffffff",
                            width: 640,
                            height: 58,
                            fontSize: 18,
                            fontWeight: infor ? "bold" : "normal",
                            color: infor ? "#ffffff" : "#797B7C",
                            borderWidth: 0,
                            borderColor: "#D2D3D3",
                        }} type="button" value="채널 소개" />
                        <input onClick={() => setInfor(false)} style={{
                            cursor: "pointer",
                            outline: 0,
                            backgroundColor: infor ? "#ffffff" : "#212426",
                            width: 640,
                            height: 58,
                            fontSize: 18,
                            fontWeight: infor ? "normal" : "bold",
                            color: infor ? "#797B7C" : "#ffffff",
                            borderWidth: 0,
                            borderColor: "#D2D3D3",
                        }} type="button" value="투자 정보" />
                    </div>
                </div>
                <Line width={1280} />
                {infor ?
                    <>
                        <input onClick={transaction} style={{
                            cursor: "pointer",
                            outline: 0,
                            position: "fixed",
                            height: 90,
                            top: 100 * vh - 90,
                            width: 1280,
                            backgroundColor: "#202426",
                            fontSize: 24,
                            color: "#ffffff",
                            fontWeight: "bold",
                            alignSelf: "center",
                            textDecorationLine: "none"
                        }} type="button" value="공모 참여하기" />
                        <div style={{
                            width: 1060,
                            paddingTop: 40,
                            paddingBottom: 40,
                            paddingLeft: 110,
                            paddingRight: 110,
                            borderTopWidth: 1,
                            borderTopColor: "#D2D3D3",
                            borderBottomWidth: 1,
                            borderBottomColor: "#D2D3D3",
                            backgroundColor: "#ffffff",
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    height: 278
                                }}>
                                    <img src="" alt="나중에" style={{ width: 180, height: 180, borderRadius: 90 }} />
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-evenly",
                                        width: 180,
                                        height: 30
                                    }}>
                                        <GoHeart color="#212426" size={30} />
                                        <IoMdShare color="#212426" size={30} />
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: 278
                                }}>
                                    <CreatorIntro title="채널" content="지순’s 일상" other={false} />
                                    <CreatorIntro title="섹터 구분" content="일상/Vlog" other={false} />
                                    <CreatorIntro title="YDOT Rating" content={
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}>
                                            <div style={{
                                                fontSize: 21,
                                                fontWeight: "bold",
                                                color: "#202426", 
                                                marginRight: 10
                                            }}>3.5</div>
                                            <BsStarFill style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                            <BsStarFill style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                            <BsStarFill style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                            <BsStarHalf style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                            <BsStar style={{ marginRight: 8 }} color="#ffde00" size={18} />
                                        </div>
                                    } other={true} />
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: 278
                                }}>
                                    <CreatorIntro title="구독자" content="100,000명" other={false} />
                                    <CreatorIntro title="누적 조회수" content="10,000,000회" other={false} />
                                    <CreatorIntro title="채널" content={
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            width: 180
                                        }}>
                                            <AiFillYoutube color="#212426" style={{ marginRight: 30, marginLeft: 10 }} size={30} />
                                            <ImTwitch color="#212426" size={30} />
                                        </div>
                                    } other={true} />
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    width: 400,
                                    height: 278,
                                }}>
                                    <div style={{
                                        opacity: 0.6,
                                        color: "#202426",
                                        fontSize: 18,
                                        height: 26,
                                        marginBottom: 10
                                    }}>최근 동영상</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}>
                                        <img src="" alt="나중에" style={{ width: 190, height: 120 }} />
                                        <img src="" alt="나중에" style={{ width: 190, height: 120 }} />
                                    </div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginTop: 10
                                    }}>
                                        <img src="" alt="나중에" style={{ width: 190, height: 120 }} />
                                        <img src="" alt="나중에" style={{ width: 190, height: 120 }} />
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 60,
                            }}>
                                <Information
                                    width={235}
                                    paddingTop={30}
                                    paddingBottom={30}
                                    border={30}
                                    title="배당권 판매 개수"
                                    content="1,000"
                                    unit="개"
                                />
                                <Information
                                    width={235}
                                    paddingTop={30}
                                    paddingBottom={30}
                                    border={30}
                                    title="시작 가격"
                                    content="1,000"
                                    unit="원"
                                />
                                <Information
                                    width={235}
                                    paddingTop={30}
                                    paddingBottom={30}
                                    border={30}
                                    title="수익 분배 비율"
                                    content="20 %"
                                />
                                <Information
                                    width={235}
                                    paddingTop={30}
                                    paddingBottom={30}
                                    border={30}
                                    title="배당 주기/횟수"
                                    content="3개월/4회"
                                />
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginTop: 20,
                            }}>
                                <Information
                                    width={520}
                                    paddingTop={20}
                                    paddingBottom={28}
                                    border={30}
                                    title="월 예상 수입"
                                    content="2,000,000"
                                    unit="원"
                                    detail="크리에이터 CPM을 기반으로한 월 수입 예측"
                                />
                                <Information
                                    width={520}
                                    paddingTop={20}
                                    paddingBottom={28}
                                    border={30}
                                    title="연간 예상 수익"
                                    content="24,000,000"
                                    unit="원"
                                    detail="크리에이터 CPM을 기반으로한 연 수입 예측"
                                />
                            </div>
                        </div>
                        <Line width={1280} />
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#ffffff",
                            paddingBottom: 200
                        }}>
                            <img src="" alt="나중에" style={{ width: 1280, height: 400, marginTop: 40, marginBottom: 20 }} />
                            <div style={{
                                fontSize: 24,
                                fontWeight: "bold",
                                color: "#161513",
                                marginBottom: 40,
                            }}>- 브이로거 지순이의 일상을 만나보세요! 대학교부터 알바까지 일상을 공유하고 있습니다. -</div>
                            {QA.map(element => <QAList title={element.title} content={element.content} />)}
                        </div>
                    </>
                    :
                    <>
                        <div style={{ backgroundColor: "#ffffff", width: 1060, paddingLeft: 110, paddingRight: 110, paddingBottom: 40, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                                marginTop: 40
                            }}>지순’s 일상 투자 정보</div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 20
                            }}>
                                {Invest.map(element => <div style={{
                                    width: 310,
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    paddingTop: 40,
                                    paddingBottom: 40,
                                    backgroundColor: "#efefef",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    borderRadius: 30,
                                    marginLeft: 17.5,
                                    marginRight: 17.5
                                }}>
                                    <img src={element.img} alt="나중에" style={{ width: 100, height: 100 }} />
                                    <div style={{
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        color: "#202426",
                                        marginTop: 20
                                    }}>{element.title}</div>
                                    <div style={{
                                        fontSize: 18,
                                        color: "#202426",
                                        marginTop: 20,
                                        lineHeight: 1.67
                                    }}>{element.content}</div>
                                </div>)}
                            </div>
                        </div>
                        <Line width={1280} />
                        <div style={{
                            backgroundColor: "#ffffff",
                            width: 1060,
                            paddingLeft: 110,
                            paddingRight: 110,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            paddingTop: 20,
                            paddingBottom: 40
                        }}>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                            }}>배당 계산기</div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                marginTop: 20,
                                width: 1060,
                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10,
                                        marginLeft: 10
                                    }}>구매 개수</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: 230,
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                        paddingTop: 17,
                                        paddingBottom: 17,
                                        borderRadius: 50,
                                        backgroundColor: "#F2F2F2",
                                        marginBottom: 20
                                    }}>
                                        <input type="text" onChange={({ text }) => setAmount(text)} value={amount} style={{
                                            fontSize: 18,
                                            color: "#202426",
                                            border: 0,
                                            backgroundColor: "#F2F2F2",
                                            textAlign: "right"
                                        }} />
                                        <div style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginLeft: 10
                                        }}>개</div>
                                    </div>
                                    
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10,
                                        marginLeft: 10
                                    }}>예상 성장률</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: 230,
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                        paddingTop: 17,
                                        paddingBottom: 17,
                                        borderRadius: 50,
                                        backgroundColor: "#F2F2F2",
                                        marginBottom: 20
                                    }}>
                                        <input type="text" onChange={({ text }) => setRate(text)} value={rate} style={{
                                            fontSize: 18,
                                            color: "#202426",
                                            border: 0,
                                            backgroundColor: "#F2F2F2",
                                            textAlign: "right"
                                        }} />
                                        <div style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginLeft: 10
                                        }}>%</div>
                                    </div>
                                    <input style={{
                                        cursor: "pointer",
                                        outline: 0,
                                        width: 290,
                                        height: 60,
                                        marginTop: 40,
                                        borderRadius: 50,
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        color: "#ffffff",
                                        backgroundColor: "#e78276",
                                        border: 0
                                    }} type="button" value="계산" />
                                </div>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                }}>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10,
                                        marginLeft: 10
                                    }}>총 배당</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: 228,
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                        paddingTop: 17,
                                        paddingBottom: 17,
                                        borderRadius: 50,
                                        backgroundColor: "#ffffff",
                                        marginBottom: 20,
                                        border: "2px solid #212426"
                                    }}>
                                        <input type="text" onChange={({ text }) => setProfit(text)} value={profit} style={{
                                            fontSize: 18,
                                            color: "#202426",
                                            border: 0,
                                            backgroundColor: "#ffffff",
                                            textAlign: "right"
                                        }} />
                                        <div style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginLeft: 10
                                        }}>원</div>
                                    </div>
                                    <div style={{
                                        opacity: 0.6,
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10,
                                        marginLeft: 10
                                    }}>예상 수익률</div>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        width: 228,
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                        paddingTop: 17,
                                        paddingBottom: 17,
                                        borderRadius: 50,
                                        backgroundColor: "#ffffff",
                                        border: "2px solid #212426"
                                    }}>
                                        <input type="text" onChange={({ text }) => setGoodRate(text)} value={goodrate} style={{
                                            fontSize: 18,
                                            color: "#202426",
                                            border: 0,
                                            backgroundColor: "#ffffff",
                                            textAlign: "right"
                                        }} />
                                        <div style={{
                                            fontSize: 18,
                                            fontWeight: "bold",
                                            color: "#202426",
                                            marginLeft: 10
                                        }}>%</div>
                                    </div>
                                  
                                </div>
                                <div style={{
                                    width: 290,
                                    height: 300,
                                    paddingTop: 20,
                                    backgroundColor: "#efefef",
                                    borderRadius: 30,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                    <div style={{
                                        fontSize: 18,
                                        color: "#202426",
                                        fontWeight: "bold",
                                        marginBottom: 20
                                    }}>사용방법</div>
                                    <div style={{
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10
                                    }}>1. 구매 개수, 가격, 예상 성장률 입력</div>
                                    <div style={{
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10
                                    }}>2. 계산 버튼 클릭</div>
                                    <div style={{
                                        fontSize: 18,
                                        color: "#202426",
                                        marginBottom: 10
                                    }}>3. 총배당과 예상수익률 확인</div>
                                </div>
                            </div>
                        </div>
                        <Line width={1280} />
                        <div style={{
                            backgroundColor: "#ffffff",
                            width: 1060,
                            paddingLeft: 110,
                            paddingRight: 110,
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: 20,
                            paddingBottom: 40
                        }}>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                                alignSelf: "center",
                                marginBottom: 40
                            }}>배당 계산기</div>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                                marginBottom: 30,
                                textAlign: "left"
                            }}>누적 조회수</div>
                            <div style={{
                                border: "2px solid #212426",
                                width: 1060,
                                height: 273,
                                marginBottom: 40,
                                borderRadius: 30,
                            }}>보류</div>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                                marginBottom: 30,
                                textAlign: "left"
                            }}>누적 구독자</div>
                            <div style={{
                                border: "2px solid #212426",
                                width: 1060,
                                height: 273,
                                marginBottom: 40,
                                borderRadius: 30,
                            }}>보류</div>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                                marginBottom: 30,
                                textAlign: "left"
                            }}>월별 조회수 획득</div>
                            <div style={{
                                border: "2px solid #212426",
                                width: 1060,
                                height: 273,
                                marginBottom: 40,
                                borderRadius: 30,
                            }}>보류</div>
                            <div style={{
                                fontSize: 21,
                                color: "#202426",
                                fontWeight: "bold",
                                marginBottom: 30,
                                textAlign: "left"
                            }}>월별 구독자 획득</div>
                            <div style={{
                                border: "2px solid #212426",
                                width: 1060,
                                height: 273,
                                marginBottom: 40,
                                borderRadius: 30,
                            }}>보류</div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}