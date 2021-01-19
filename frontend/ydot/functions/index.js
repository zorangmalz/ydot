const functions = require('firebase-functions')
const admin = require('firebase-admin')

require('dotenv').config();

const cors=require('cors')({
  origin:true
})

const fetch=require("node-fetch")
const axios=require("axios")

    function requestMe() {
      console.log('Requesting user profile from Kakao API server.')
      // return request({
      //   method: 'POST',
      //   headers: {
      //     'x-chain-id': '$1001',
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Basic ' + '${KASK8QUCLZUJ1K1YZ9GB2VJ2}:${BkbIcfQfJuD9IrEZawH3+0ML7uARiyw910cEHiOH}'
      // },
      //   url: "https://wallet-api.klaytnapi.com/v2/account",
      // })
   return    fetch("https://wallet-api.klaytnapi.com/v2/account", {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "x-chain-id": "1001",
        "Authorization": "Basic S0FTSzc5OVZRNVZERzVPMldKOEtHV1paOjdoRTZkemthZTBqeis0VGpxRDhKdEtPbnNkWTRoMFZnL29LWTlzbDY=",
    },
  }).then(res => res.json())


    }

   

  exports.KASWallet = functions.https
  .onRequest((req, res) => {
    cors(req,res,()=>{
      return requestMe().then((json) => {
        console.log(`Returning firebase token to user: ${json}`)
          res.send({data:{ wallet : json.address}});
      })
    })
   

  })
  