// const express = require('express')
// const cors = require('cors')
// const app = express()
// // const bodyParser = require('body-parser')
// // const port = process.env.PORT || 3001


// const corsOptions = {
//     origin: 'http://15.165.240.32:8000/v0/beta', // 허락하고자 하는 요청 주소
//     credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
// };

// // app.use(cors(corsOptions))

// import { createProxyMiddleware } from "http-proxy-middleware"

// const express = require("express");
// var cors = require('cors')

// const app = express();
// app.use(cors());

// module.exports = function (app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'http://127.0.0.1:8000/v0/beta/',
//             changeOrigin: true,
//             onProxyRes: function (proxyRes, req, res) {
//                 proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//             }
//         })
//     );
// };

// app.listen(5000);