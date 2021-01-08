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
import firebase from "firebase/app";

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
        // uploadTwo()
        //유저정보 입력
        // userUpload()
        // ex()
        
    }, [])
    async function ex (){
    //    firebase.auth().createUserWithEmailAndPassword("email@email.com","aaaaaa").then((user)=>{
    //        console.log(user)
    //    })
const list=[
["강지연","tjdcjs4691@naver.com",	"01040574691"	,"0x2C313F9088FdBF7FD2C0D3595d4F14e6f722D8c5"],
["강효진","turtle772@gmail.com",	"01031502311"	,"0xc08495e91FADdf02190F3a1bFBC58B111CbF1138"],
["고남욱","nathan5377@gmail.com",	"01051825377"	,"0x840c78b55F2786608b87870671F41b49A3B77605"],
["고재량","woalszja1@naver.com",	"01088580075"	,"0x87c8216FeFEC6ac3D8E51455aE730dBdA49DF299"],
["김도은","ehh1999@naver.com",	"01022177260"	,"0x25fa7f4AfbE78200C7Ddb5AA2627C1160D39fb21"],
["김동훈","3pneverlose@naver.com",	"01024403741"	,"0x51a6BBd65aFe4419acf70706900B3F459D0c5E60"],
["김명곤","myungon0907@naver.com",	"01098603088"	,"0xd9b43a456052b6a454548505F53d05d5b3db2bE5"],
["김민형","kmh6314@nate.com",	"01026330122"	,"0x9d48cfcd970625C6094f0A26e507815ecfE769a1"],
["김병철","k7b7c7@gmail.com",	"01053440608"	,"0xBF2517af75B71f1692A9f6cB7112b5059EE44E37"],
["김상철","jjhggt333@naver.com",	"01066793932"	,"0x5c05156783b1Bf06B0a6e8F2EfcC0dd183598033"],
["김성현","sunghyun97@naver.com",	"01063989274"	,"0xFFA87DBB3b1Def8de7D30ED8875eE4A9741f548b"],
["김소라","sorakim77@naver.com",	"01032646320"	,"0x2224D48f76b03962fdcC66304Cc9fd965d22be59"],
["김아현","ahyeun97@naver.com",	"01051319808"	,"0xbCed8f81651DbC96E1Df9fF18554cAd865F73209"],
["김언화","rladjsghk1@gmail.com",	"01076177065"	,"0x3518241C8228efc4A4b45DAbc160b36cdcd60eA3"],
["김지현","tktj7288@gmail.com",	"01085667288"	,"0xB9327d650ac998c4624B561aE504Ec4d8A1Db24B"],
["김진현","yh97jack@gmail.com",	"01068188787"	,"0x3539772eb7824F73C177fFb76F0d293E60894e49"],
["김창우","kcw1365@naver.com",	"01062099741"	,"0x26C820048Ee5e98f564f9c90808dcc8AfA9C15a4"],
["김하늘","hi_neul@naver.com",	"01072366193"	,"0xB8De2B5D1540d7CDE960f7741b22aA17D1dAdf64"],
["김현성","goghot1108@naver.com",	"01066674539"	,"0xe2c6A5022188Fab5966aaa35F7f025FD9b285425"],
["김현진","dxc3311@naver.com",	"01086303532"	,"0x9928ba84777F882B56e91a0f9dB7F86aaeA4BD92"],
["김형용","guddyd1215@naver.com",	"01096580020"	,"0xe19Ef8af7d958112506d3d88998B586aC638e1B3"],
["김호정","hojeongkim0584@gmail.com",	"01024020584"	,"0xaA1c6bc6FCBA967C53Db287e216f30354fe77324"],
["나하나","macierjewelry@gmail.com",	"01056982562"	,"0xDCe4aD32a36a26aE3aBfc821717AA4f334C6FD65"],
["류형근","hyungkeun95@naver.com",	"01092065640"	,"0x647b978688D66A02F3F646790c85F8bbe64bF6D6"],
["명세윤","syoon314@naver.com",	"01093376838"	,"0xf97045b69a35A2A4604F8A8Cb6a202D3FDf7b125"],
["문희	","hwlqn@naver.com",	"01033189309"	,"0x5bD2108086657C54aFD46e50612922A82bb05b0d"],
["박민나","helloplace@naver.com",	"01030127781"	,"0xdC4491b261b512471827932EB1f3288527C4Ac4c"],
["박성해","kaipark17@gmail.com",	"01064217167"	,"0xE7cB546FFE7d0F12B64582E91C13fa3Ef2025cF7"],
["박찬욱","nobinson2012@naver.com",	"01034752780"	,"0x7fc2AA5798C037b0B755f057E69bC802ab567063"],
["배종욱","bjonguk@gmail.com",	"01090319242"	,"0x391463C8faA244D172C08c565A886B3500c086A9"],
["배효진","bhj798@naver.com",	"01066356518"	,"0x601932E6ec336376b7662c745A3989a77AefBaC9"],
["서희동","kmcpic@naver.com",	"01026405959"	,"0x696305646975623E4401CF80F2FdCeb2C4C830E6"],
["석주연","juyeon0326@naver.com",	"01042710091"	,"0xfAae0567f9de6588F8e935E06D522C41b8d36a76"],
["송건혁","keonhyuksong@gmail.com",	"01092419625"	,"0x2E364B587377670238057deDd06De09168BEB29C"],
["신지영","compdiva@naver.com",	"01056769201"	,"0x473BfeA86420070e94b187598d0dA284dEEBf60B"],
["신형준","moses712@hanmail.net",	"01024851803"	,"0x7d675550E5CfA235426545F887829aB933753489"],
["유진혁","jinryu01@gmail.com",	"01088658190"	,"0x9df4B32F6AFe8a745C2Ad14877521e61af45fAbf"],
["유채원","uchae1@kakao.com",	"01062982748"	,"0xcA46e509d7162C9EE349EbAcE0549a42B568c328"],
["윤화룡","yunhwaly@gmail.com",	"01066602001"	,"0xaDDf0588523C6881259313fcf0619DDf304BF0Fc"],
["이성운","hps0708@naver.com",	"01031566594"	,"0xde86D39385069A031fcD7c72e74F8fA897695312"],
["이재영","ljy960925@naver.com",	"01085033708"	,"0x33D644eeEdBE29C534230D3FEb15eC1b1d5C5DB8"],
["이정윤","jane3042@snu.ac.kr",	"01047608575"	,"0x339aC3ff131e5EEd4ffAE82FcAF7c186f6922699"],
["이주용","lju4153@naver.com",	"01023314153"	,"0xF81509df986B2411853b351C2a31fb9007a911b5"],
["이지행","jh.lee@gettoo.co.kr",	"01088757737"	,"0xf07D68A2fD5E9601c24D24Eab9f8394e73260c3A"],
["이학승","0212peter@naver.com",	"01049355289"	,"0x1D53B212F9fc0433fBc8be83551B4A110b096FB5"],
["이현진","cyndi99@naver.com",	"01082802237"	,"0xE5df6E9DE8DF74958C52Ea8D17d34769BC18FB81"],
["이현탁","11aw1iet@naver.com",	"01067760905"	,"0x7126321051a516Bcaf89f492d1720a1C6Da9Cd10"],
["임예지","yeji5404@gmail.com",	"01076845249"	,"0x6c0b980Df31562d3f843237D55b1612859F5311D"],
["장미리","aruiarui@naver.com",	"01031630323"	,"0x74fbc57a765665C2c8eAc95dD8cC8B4572F3eD03"],
["정준아","alliswellbut@naver.com",	"01071569428"	,"0xed417Ef27831145108F68F6a6901FEd87386895A"],
["진세화","saehwa1006@naver.com",	"01039044095"	,"0xD66dACC3dc6f55b006aC1D7758B584d3a76f9768"],
["진윤선","arwenjin2@naver.com",	"01029752625"	,"0xf26Fe1EB7588D944421BdA12CE8533a1A09A0A40"],
["채송화","csh1379@nate.com",	"01072749591"	,"0x092866D340A959ae984c2DBdc215ebDC2bDd762C"],
["최경호","gohosoho77@gmail.com",	"01028739202"	,"0xa019443bb65bf77CB348a355930A6D960044e581"],
["최해식","hschoi4470@hanmail.net",	"01080074470"	,"0xbc2762496B70439D6BA9FFa41C3CfE86535802ef"],
["한성유","hhdysh1004@naver.com",	"01041492726"	,"0x99FBd7D7fCa518FE1C1DFc533fe1Cf1fd5fD0e36"],
["허가현","rkguscjswo1@naver.com",	"01045243652"	,"0x61e8baeb8050394f5249390C7375C927f5b2Fe23"],
["허재준","wowns109@gmail.com",	"01082299430"	,"0x32C52F15b732A26885a8DD4dD88E528D6d032219"]
]
for(const i of list){
    var uid
    
    await firebase.auth().signInWithEmailAndPassword(i[1],i[2]).then((user)=>{
        uid=user.user.uid
    })
    uploadUser(uid,i[1],i[3],i[0])
    
}
// firebase.auth().signInWithEmailAndPassword("csh1379@nate.com","01072749591").then((user)=>{
//     console.log(user)
// })
    
    


    }   

    async function uploadUser(a,b,c,d){
        await firestore.collection("User").doc(a).set({
            creator:[],
            email:b,
            uid:a,
            totalMoney:1500000,
            wallet:c,
            name:d
        })
        for(var i=1;i<13;i++){
            firestore.collection("User").doc(a).collection("Allocate").doc(String(i)).set({
                month:i,
                total:[]
            })
        }
    }
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
        uploadCreatorIncome("신지우" ,[1502676 ,1211962 ,2174882 ,2000844 ,1971442 ,1761110 ,1693776 ,1481048 ,1970384 ,1845416 ,0,1209520] )
        uploadCreatorIncome("JEICHI 42" ,[45800 ,46774 ,44856 ,66458 ,32496 ,47624 ,46220 ,37546 ,33952 ,27898 ,34812 ,38686] )
        uploadCreatorIncome("햇살한스푼" ,[417156 ,574242 ,527202 ,577642 ,460004 ,425620 ,406476 ,398506 ,436938 ,361448 ,281944 ,322710] )
        uploadCreatorIncome("믕디의 반란" ,[159322 ,67250 ,74328 ,172012 ,238044 ,143412 ,111282 ,53434 ,88154 ,69320 ,88246 ,109058] )
    }
   
    function userUpload(){
        uploadUser("yWpZjAseaoNepPM7HPQd3ErthQB2","a@a.com","0x75FB2ca50C08570D7FFEE9A86A7Bc643a352936D","정선웅")
        uploadUser("at4g7OHt5GS4JKOB4rbDOuafuB72","wise@ydot.xyz","0xB66AA013EdBAF7B7C1e2de69aC2Cc9eA5d41F599","김현명")
        uploadUser("RPHIygmYnUhW8bjrO7zkA5P4Pxw1","jake@ydot.xyz","0x661F9475360CBbAD77D496300D935E9f24014cE8","박주규")
        uploadUser("1sdPy2XK1XeUghVEJtfTnzPccnF2","user1@ydot.xyz","0x691Fd6ac480d994589D57582F798c04dB4111145","김진성")
        uploadUser("PYZ9nDdkSJXTcMCdLJexR6gxTvu2","master@ydot.xyz","0x1fD79ff6CB1654b8aeEeb1584e356c9A699BDC69","?")
        uploadUser("lPQ1PSfylXf2v0NwdkojZyIkDDz2","jihun@ydot.xyz","0x1fD79ff6CB1654b8aeEeb1584e356c9A699BDC69","박지훈")
    }

    function userwallet(){
        "0x2C313F9088FdBF7FD2C0D3595d4F14e6f722D8c5"
        "0xc08495e91FADdf02190F3a1bFBC58B111CbF1138"
        "0x840c78b55F2786608b87870671F41b49A3B77605"
        "0x87c8216FeFEC6ac3D8E51455aE730dBdA49DF299"
        "0x25fa7f4AfbE78200C7Ddb5AA2627C1160D39fb21"
        "0x51a6BBd65aFe4419acf70706900B3F459D0c5E60"
        "0xd9b43a456052b6a454548505F53d05d5b3db2bE5"
        "0x9d48cfcd970625C6094f0A26e507815ecfE769a1"
        "0xBF2517af75B71f1692A9f6cB7112b5059EE44E37"
        "0x5c05156783b1Bf06B0a6e8F2EfcC0dd183598033"
        "0xFFA87DBB3b1Def8de7D30ED8875eE4A9741f548b"
        "0x2224D48f76b03962fdcC66304Cc9fd965d22be59"
        "0xbCed8f81651DbC96E1Df9fF18554cAd865F73209"
        "0x3518241C8228efc4A4b45DAbc160b36cdcd60eA3"
        "0xB9327d650ac998c4624B561aE504Ec4d8A1Db24B"
        "0x3539772eb7824F73C177fFb76F0d293E60894e49"
        "0x26C820048Ee5e98f564f9c90808dcc8AfA9C15a4"
        "0xB8De2B5D1540d7CDE960f7741b22aA17D1dAdf64"
        "0xe2c6A5022188Fab5966aaa35F7f025FD9b285425"
        "0x9928ba84777F882B56e91a0f9dB7F86aaeA4BD92"
        "0xe19Ef8af7d958112506d3d88998B586aC638e1B3"
        "0xaA1c6bc6FCBA967C53Db287e216f30354fe77324"
        "0xDCe4aD32a36a26aE3aBfc821717AA4f334C6FD65"
        "0x647b978688D66A02F3F646790c85F8bbe64bF6D6"
        "0xf97045b69a35A2A4604F8A8Cb6a202D3FDf7b125"
        "0x5bD2108086657C54aFD46e50612922A82bb05b0d"
        "0xdC4491b261b512471827932EB1f3288527C4Ac4c"
        "0xE7cB546FFE7d0F12B64582E91C13fa3Ef2025cF7"
        "0x7fc2AA5798C037b0B755f057E69bC802ab567063"
        "0x391463C8faA244D172C08c565A886B3500c086A9"
        "0x601932E6ec336376b7662c745A3989a77AefBaC9"
        "0x696305646975623E4401CF80F2FdCeb2C4C830E6"
        "0xfAae0567f9de6588F8e935E06D522C41b8d36a76"
        "0x2E364B587377670238057deDd06De09168BEB29C"
        "0x473BfeA86420070e94b187598d0dA284dEEBf60B"
        "0x7d675550E5CfA235426545F887829aB933753489"
        "0x9df4B32F6AFe8a745C2Ad14877521e61af45fAbf"
        "0xcA46e509d7162C9EE349EbAcE0549a42B568c328"
        "0xaDDf0588523C6881259313fcf0619DDf304BF0Fc"
        "0xde86D39385069A031fcD7c72e74F8fA897695312"
        "0x33D644eeEdBE29C534230D3FEb15eC1b1d5C5DB8"
        "0x339aC3ff131e5EEd4ffAE82FcAF7c186f6922699"
        "0xF81509df986B2411853b351C2a31fb9007a911b5"
        "0xf07D68A2fD5E9601c24D24Eab9f8394e73260c3A"
        "0x1D53B212F9fc0433fBc8be83551B4A110b096FB5"
        "0xE5df6E9DE8DF74958C52Ea8D17d34769BC18FB81"
        "0x7126321051a516Bcaf89f492d1720a1C6Da9Cd10"
        "0x6c0b980Df31562d3f843237D55b1612859F5311D"
        "0x74fbc57a765665C2c8eAc95dD8cC8B4572F3eD03"
        "0xed417Ef27831145108F68F6a6901FEd87386895A"
        "0xD66dACC3dc6f55b006aC1D7758B584d3a76f9768"
        "0xf26Fe1EB7588D944421BdA12CE8533a1A09A0A40"
        "0x092866D340A959ae984c2DBdc215ebDC2bDd762C"
        "0xa019443bb65bf77CB348a355930A6D960044e581"
        "0xbc2762496B70439D6BA9FFa41C3CfE86535802ef"
        "0x99FBd7D7fCa518FE1C1DFc533fe1Cf1fd5fD0e36"
        "0x61e8baeb8050394f5249390C7375C927f5b2Fe23"
        "0x32C52F15b732A26885a8DD4dD88E528D6d032219"
        "0xe3DBb825fd90bf1b2E43fAd63c91307b0d5DBEF3"
        "0x4F181812e4e1cD3DCEaeE0a62378af326Ee7a108"
        "0xFcEFE62Ba9C2D2C2c7541b66BCFC045c7532b883"
        "0x6f307f91D53dAe5e09810618dFDd05e7A0a3703B"
        "0x8afB53E2393399cE7660C8FcF805e6be4Bc1C0dd"
        "0x7494CD9826B44BEb50347E27151D8B04f638d162"
        "0xd7801fD17454abB7E5520008DfbCdA1C1C4E6277"
        "0x3156C51ECF1819603c6cd4B473022DDab8074e62"
        "0x8feD3Cb6a78aeBb3F820A8aE78C1adCAf17F408C"
        "0x40173EE9B807CAE94cF607C7dBdD9659c4753157"
        "0x3209f879985cEA940D3c481b5bCCD0748B16861C"
        "0x9103e84049281eB3f67E70b1f67b9BC364c5995C"
        "0x87df2f566525cf0D88935Eeb4331539Dc2a35967"
        "0x877eeb144b124814319CFdf325F42abCa3F43245"
        "0xaf276296CC238836eA92c66Bc1Ba2709B40043A4"
        "0x94feFF22080e925585aC6c4b559e39341E28D3f7"
        "0xE9b8A5AD0809A4475d7d7A2c2259F79CE7B4BD5d"
        "0x18C3da39f39a67CF3071a10de059d2C8503911B6"
        "0xE36c7972F51Ff97C9060B05Be950A30408150741"
        "0x438072ECB64AeDc8A903Ccf280aF1151016A21Da"
        "0x2c7c8569a0F2f4CA8dAcfF1Fb6CE8271bEcA3918"
        "0x8Ae19701e5710B26588fe4160179362F305Ad798"
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