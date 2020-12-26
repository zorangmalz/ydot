import React, { useEffect, useState } from 'react'
import Header, { CloseBeta, CreatorInfo, vh, vw } from '../Style'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useFirebase, useFirestore } from "react-redux-firebase"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom';

//임시 이미지
import Creatorone from '../icon/Creatorone.png'
import Creatortwo from '../icon/Creatortwo.png'
import Creatorthree from '../icon/Creatorthree.png'
import Creatorfour from '../icon/Creatorfour.png'

import CaverExtKAS from "caver-js-ext-kas"



export default function HomeMain() {
    require('dotenv').config();
    const history = useHistory()
    const firebase = useFirebase()
    const firestore = useFirestore()
    const { uid } = useSelector((state) => state.firebase.auth);
    const [items, setItems] = useState([]);

    const chainId = 1001
    const accessKeyId = "KASK8QUCLZUJ1K1YZ9GB2VJ2"
    const secretAccessKey = "BkbIcfQfJuD9IrEZawH3+0ML7uARiyw910cEHiOH"

    async function kasTest() {
        var wallet
        await firestore.collection("User").doc(uid).get().then(doc => {
            wallet = doc.data().wallet
        })
        if (wallet) {
            console.log("Not new")
        } else {
            const caver = new CaverExtKAS()
            caver.initKASAPI(chainId, accessKeyId, secretAccessKey)

            const account = await caver.kas.wallet.createAccount()
            console.log(account)
            firestore.collection("User").doc(uid).update({
                wallet: account.address
            }

            )
        }
    }
    useEffect(() => {
        load()
    }, [])

    async function load() {
        var date = new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                list.push({
                    img: count === 1 ? Creatorone : count === 2 ? Creatortwo : count === 3 ? Creatorthree : Creatorfour,
                    name: doc.id==="[Vlog] 지순's 일상" ? "Pood" : doc.id,
                    FundingNum: doc.data().FundingNum,
                    FundingTotal: doc.data().FundingAim,
                    percent: doc.data().FundingTotal / doc.data().FundingAim * 100,
                    Deadline: parseInt((doc.data().Deadline - date.getTime()) / 86400000)
                })
                count = count + 1
            })
            setItems(list)
        })

    }
    // const CreatorList = [
    //     {

    //         img: "",
    //         name: "지순’s 일상",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     { 

    //         img: "",
    //         name: "청춘 댕댕",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     {

    //         img: "",
    //         name: "타이어 아저씨 TV",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    //     {

    //         img: "",
    //         name: "타이어 아저씨 TV",
    //         FundingNum: 10000,
    //         FundingTotal: 900000,
    //     },
    // ]


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#ffffff" }}>
            <Header bold="Home" />
            <div style={{
                fontSize: 21,
                fontWeight: "bold",
                color: "#202426",
                marginTop: 40,
                marginBottom: 20,
                alignSelf: "center"
            }}>크리에이터 정보</div>
            <div style={{
                width: "100vw",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
            }}>

                {items.map(element =>
                    <CreatorInfo
                        img={element.img}
                        name={element.name}
                        FundingNum={element.FundingNum}
                        percent={element.percent}
                        Deadline={element.Deadline}
                    />
                )}
            </div>
            
        </div>
    )
}