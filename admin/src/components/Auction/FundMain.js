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
import { FiRss } from 'react-icons/fi'

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
    const [itemss, setItemss] = useState([]);
    const firestore = useFirestore()

    useEffect(() => {
        load()
        loadEnd()
        //크리에이터 정보 입력
        // upload()
        //크리에이터 수입 입력
        uploadTwo()
        //유저정보 입력
        // userUpload()
    }, [])

    async function load() {
        var date = new Date()
        firestore.collection("Creator").onSnapshot(querySnapshot => {
            const list = []
            var count = 1
            querySnapshot.forEach(doc => {
                if(doc.data().Deadline>date.getTime()){
                    list.push({
                        id: count,
                        img: count === 1 ? Exampleone : count === 2 ? Exampletwo : count === 3 ? Examplethree : Examplefour,
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
        })
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
                        img: count === 1 ? Exampleone : count === 2 ? Exampletwo : count === 3 ? Examplethree : Examplefour,
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

    // function uploadCreator(){
    //     firestore.collection("Creator").doc("").set({
    //         Deadline:1610180070331,
    //         EachPrice:,
    //         FundingAim:,
    //         FundingNum:,
    //         FundingTotal:,
    //         name:,
    //         ongoing:,
    //         symbol:,
    //         sector:,
    //         sort:,
    //         growth:,
    //         share:,
    //         PV,
    //         view

    //     })
    // }
    function uploadCreator(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s){
       
            firestore.collection("Creator").doc(f).set({
                Deadline:a,
                EachPrice:b,
                FundingAim:c,
                FundingNum:d,
                FundingTotal:e,
                name:f,
                ongoing:g,
                symbol:h,
                sector:i,
                sort:j,
                growth:k,
                share:l,
                PV:m,
                view:n,
                channelTitle:o,
                mainVideo:p,
                popularVideo:q,
                investList:r,
                color:s
            })

    }
    function uploadCreatorIncome(a,b){

        for (var i=1;i<13;i++){
            firestore.collection("Creator").doc(a).collection("Income").doc(String(i)).set({
                income:b[i-1]
            })
        }
        
    }
    function upload(){
        uploadCreator(1610180070331,2251,2251000,10000,0,"EO",true,"EOT","IT/과학기술","매크로",8.41,10,22510500,7912200,"eo","https://www.youtube.com/watch?v=0qfqjObM50o","https://www.youtube.com/watch?v=8zfYINYNS38",[],"#DDD3C2")
        uploadCreator(1610180070331,11480,1147000,10000,0,"이지금",true,"IUT","엔터테인먼트","메가",5.07,1,114799242,81544456,"iu","https://youtu.be/sAbU4fAqjZk","https://youtu.be/OcVmaIlHZ1o",[],"#C6A477")
        uploadCreator(1610180070331,1573,1573000,10000,0,"농잘알",true,"NJT","스포츠","매크로",10.19,10,15730160,3922820,"nong","https://www.youtube.com/watch?v=Sa7Jm4VWTq8","https://www.youtube.com/watch?v=yg99DXPTZjU",[],"#78D5F5")
        uploadCreator(1610180070331,4599,4598000,10000,0,"광마니",true,"GMT","푸드/먹방","매크로",11.82,10,45986943,9374812,"gwang","https://www.youtube.com/watch?v=o2m_7zX7s8Y","https://www.youtube.com/watch?v=ZVyvJpTgHAg",[],"#7BE495")
        uploadCreator(1610180070331,133830,13383000,10000,0,"핫도그",true,"HDT","엔터테인먼트","메가",10.34,1,1338301634,341184688,"hotdog"," https://www.youtube.com/watch?v=XHJcdYkgEbE","https://www.youtube.com/watch?v=ckTHSO6LIE4",[],"#ABD1DC")
        uploadCreator(1610180070331,53443,5344000,10000,0,"잇섭",true,"IST","IT/과학기술","메가",7.66,1,534434126,215803603,"itsub","https://www.youtube.com/watch?v=-U7a_BadTlM"," https://www.youtube.com/watch?v=XymUApkMINY",[],"#D3E7EE")
        uploadCreator(1610180070331,5091,5091000,10000,0,"1분과학",true,"OST","IT/과학기술","매크로",3.98,10,50913493,49036810,"science"," https://www.youtube.com/watch?v=2P6pbgXrAtQ","https://www.youtube.com/watch?v=h5EJZNIqN0k",[],"#F8C78D")
        uploadCreator(1610180070331,17739,1773000,10000,0,"신사임당",true,"SST","Vlog/일상","메가",11.83,1,177393388,34521183,"sin","https://www.youtube.com/watch?v=03n3U1UK4Xg","https://www.youtube.com/watch?v=e6Qa05lBdEI",[],"#1CA7EC")
        uploadCreator(1610180070331,10707,1070000,10000,0,"슈카월드",true,"SWT","엔터테인먼트","메가",9.33,1,107067986,32121015,"suka"," https://www.youtube.com/watch?v=WP4eBPwVOKA"," https://www.youtube.com/watch?v=JdRcM4fLwgE",[],"#4ADEDE")
        uploadCreator(1610180070331,545,545000,10000,0,"POOD",true,"POT","엔터테인먼트","매크로",5.36,10,5450533,3600329,'pood',"https://www.youtube.com/watch?v=kputvfe8cQU","https://www.youtube.com/watch?v=07UD1M4NpP4",[],"#205072")
        uploadCreator(1610180070331,46117,46117000,10000,0,"우왁굳",true,"WWT","게임","매크로",3.88,10,461172311,457895722,"woo","https://www.youtube.com/watch?v=o0ayvb3QYsc","https://www.youtube.com/watch?v=cCUk72lgUJU",[],"#ECD59F")
        uploadCreator(1610180070331,620,1858000,10000,0,"Pianist JayM",true,"PNT","음악","마이크로",1.56,30,6196078,20646290,"piano","https://www.youtube.com/watch?v=sJhBLJIiRDk","https://www.youtube.com/watch?v=BwTEZihOa_A",[],"#329D9C")
        uploadCreator(1610180070331,782,2345000,10000,0,"갓승희",true,"GST","엔터테인먼트","마이크로",15.78,30,7817068,936266,"gsh","https://www.youtube.com/watch?v=zf11fdvJvMY","https://www.youtube.com/watch?v=idoQTKoAhm8",[],"#56C596")
        uploadCreator(1610180070331,2585,7756000,10000,0,"신지우",true,"SJT","엔터테인먼트","마이크로",3.57,30,25853594,28446177,'sjwoo',"https://www.youtube.com/watch?v=gkySwXlUt8w","https://www.youtube.com/watch?v=PevvrA_pAXo",[],"#C6A477")
        uploadCreator(1610180070331,48,142000,10000,0,"JEICHI 42",true,"KLT","푸드/먹방","마이크로",1.27,30,476066,1675094,'cooking',"https://www.youtube.com/watch?v=oaJTDmu7Dq8","https://www.youtube.com/watch?v=hqHQRnYEpYE",[],"#93DE8C")
        uploadCreator(1610180070331,723,2169000,10000,0,"햇살한스푼",true,"SST","푸드/먹방","마이크로",1.91,30,7230289,16352313,'hatsal',"https://www.youtube.com/watch?v=QIa7abUkBP4","https://www.youtube.com/watch?v=iWlgHnJu-Mo",[],"#7097AB")
        uploadCreator(1610180070331,39,116000,10000,0,"믕디의 반란",true,"MBT","음악","마이크로",4.17,30,389947,354182,'meungdi',"https://www.youtube.com/watch?v=lsZti2j0IUc","https://www.youtube.com/watch?v=1glwnKjCTVA",[],"#797FF6")
    }
    function uploadTwo(){
        uploadCreatorIncome("EO" ,[1464486,1224888 ,2099988  ,1773766 ,2056252 ,3545602 ,2680382 ,5153630 ,5233410 ,3385148 ,6869084 ,2875054] )
        uploadCreatorIncome("이지금" ,[18179690 ,14847692 ,13486268 ,26105380 ,35787620 ,33957972 ,23271432 ,17320354 ,21545532 ,20593190 ,27306232 ,39912100] )
        uploadCreatorIncome("농잘알" ,[2570814 ,2533506 ,1593846 ,696698 ,404166 ,1518190 ,845384 ,875298 ,966882 ,256808 ,772650 ,1096890] )
        uploadCreatorIncome("광마니" ,[2681678 ,3619688 ,4088356 ,7188904 ,6075294 ,7626456 ,11270060 ,10124358 ,6156796 ,11543266 ,15514780 ,11424626] )
        uploadCreatorIncome("핫도그" ,[39144322 ,46036986 ,51527218 ,33998950 ,46413026 ,40413028 ,36880192 ,42497472 ,58821680 ,48488304 ,47043834 ,88138966] )
        uploadCreatorIncome("잇섭" ,[34705088 ,36533378 ,36367950 ,38647070 ,35306374 ,31777172 ,25908308 ,32502262 ,43165658 ,39728546 ,35691418 ,35947884] )
        uploadCreatorIncome("1분과학" ,[2831882 ,2647114 ,1791906 ,1648250 ,2726508 ,4953512 ,2366536 ,1497832 ,5444202 ,1567322 ,5117534 ,4779420] )
        uploadCreatorIncome("신사임당" ,[12611662 ,12292948 ,14071188 ,27071518 ,26476938 ,26581580 ,26210474 ,36768762 ,59168808 ,60285794 ,61848398 ,66822918] )
        uploadCreatorIncome("슈카월드" ,[12876400 ,17465782 ,12603504 ,15675620 ,13538668 ,12996914 ,14825184 ,16550602 ,16954706 ,13141516 ,12829450 ,16657254] )
        uploadCreatorIncome("POOD" ,[1770424 ,1287160 ,428908 ,373452 ,761752 ,643432 ,147256 ,132772 ,2423696 ,2424450 ,3018320 ,1511406] )
        uploadCreatorIncome("우왁굳" ,[48054006 ,47223124 ,54366772 ,65523804 ,54203196 ,47089966 ,38973378 ,46541746 ,61004376 ,52630100 ,49989716 ,46878944] )
        uploadCreatorIncome("Pianist JayM" ,[377388 ,384596 ,385204 ,438442 ,359832 ,362818 ,357622 ,357422 ,405444 ,345772 ,327798 ,371052] )
        uploadCreatorIncome("갓승희" ,[481588 ,393042 ,309210 ,275878 ,254704 ,265076 ,230648 ,200550 ,181500 ,101068 ,117060 ,156396] )
        uploadCreatorIncome("신지우" ,[1502676 ,1211962 ,2174882 ,2000844 ,1971442 ,1761110 ,1693776 ,1481048 ,1970384 ,1845416 ,1214972,1209520] )
        uploadCreatorIncome("JEICHI 42" ,[45800 ,46774 ,44856 ,66458 ,32496 ,47624 ,46220 ,37546 ,33952 ,27898 ,34812 ,38686] )
        uploadCreatorIncome("햇살한스푼" ,[417156 ,574242 ,527202 ,577642 ,460004 ,425620 ,406476 ,398506 ,436938 ,361448 ,281944 ,322710] )
        uploadCreatorIncome("믕디의 반란" ,[159322 ,67250 ,74328 ,172012 ,238044 ,143412 ,111282 ,53434 ,88154 ,69320 ,88246 ,109058] )
    }
    async function uploadUser(a,b,c){
        firestore.collection("User").doc(a).set({
            creator:[],
            email:b,
            uid:a,
            totalMoney:1500000,
            wallet:c
        })
        for(var i=1;i<13;i++){
            firestore.collection("User").doc(a).collection("Allocate").doc(String(i)).set({
                month:i,
                total:[]
            })
        }
    }
    function userUpload(){
        uploadUser("yWpZjAseaoNepPM7HPQd3ErthQB2","a@a.com","0x75FB2ca50C08570D7FFEE9A86A7Bc643a352936D")
        uploadUser("at4g7OHt5GS4JKOB4rbDOuafuB72","wise@ydot.xyz","0xB66AA013EdBAF7B7C1e2de69aC2Cc9eA5d41F599")
        uploadUser("RPHIygmYnUhW8bjrO7zkA5P4Pxw1","jake@ydot.xyz","0x661F9475360CBbAD77D496300D935E9f24014cE8")
        uploadUser("1sdPy2XK1XeUghVEJtfTnzPccnF2","user1@ydot.xyz","0x691Fd6ac480d994589D57582F798c04dB4111145")
    }
    const contents = 2
    return (
        <div>
            <Default>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff"
                }}>
                    <Header bold="Fund" />
                    <div style={{
                        width: "100vw",
                        minWidth: 1060,
                        borderTop: "1px solid #D2D3D3",
                    }} />
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
                        <div style={{
                            width: "56vw",
                            minWidth: 1060,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
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
                        marginTop: 40,
                        marginBottom: 40
                    }}>종료된 펀딩</div>
                    <div style={{
                        width: "56vw",
                        minWidth: 1060,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 40,
                    }}>
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
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#ffffff"
                }}>
                    <MHeader bold="Fund" />
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
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                            {items.filter(ele => ele.id < 3).map(element =>
                                <MCreatorInfo
                                    img={element.img}
                                    name={element.name}
                                    FundingNum={element.FundingNum}
                                    percent={element.percent}
                                    Deadline={element.Deadline}
                                />
                            )}
                        </div>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                            {items.filter(ele => ele.id > 2).map(element =>
                                <MCreatorInfo
                                    img={element.img}
                                    name={element.name}
                                    FundingNum={element.FundingNum}
                                    percent={element.percent}
                                    Deadline={element.Deadline}
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
                    }}>종료된 펀딩</div>
                    <div style={{
                        width: "100vw",
                        minWidth: 300,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: 40,
                    }}>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                            {items.filter(ele => ele.id < 3).map(element =>
                                <MCreatorInfo
                                    img={element.img}
                                    name={element.name}
                                    FundingNum={element.FundingNum}
                                    percent={element.percent}
                                    Deadline={element.Deadline}
                                />
                            )}
                        </div>
                        <div style={{
                            width: "90vw",
                            minWidth: 300,
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly"
                        }}>
                            {items.filter(ele => ele.id > 2).map(element =>
                                <MCreatorInfo
                                    img={element.img}
                                    name={element.name}
                                    FundingNum={element.FundingNum}
                                    percent={element.percent}
                                    Deadline={element.Deadline}
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