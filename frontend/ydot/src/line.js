const crypto = require('crypto');
const axios = require('axios').default;

const apikey="3ac5cdd0-419b-4aac-b413-2e0a548749b9"
const secret="cd67951a-c7a9-4375-b6d6-625109a77e84"

function jsonToQueryString(json, path) {
    if (json && Object.keys(json).length > 0) {
        return (path.indexOf('?') == -1 ? '?' : '&') +
            Object.keys(json).map(function (key) {
                // return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
                return key + '=' + json[key];
            }).join('&');
    } else {
        return '';
    }

}

async function callAPI(method, path, params) {
    const nonce = crypto.randomBytes(16).toString('hex').slice(4, 12);
    const timestamp = Date.now();

    const orderedParams = {};
    if (params) {
        Object.keys(params).sort().forEach(function(key) {
            orderedParams[key] = params[key];
        });
    }

    const signatureBase = `${nonce}${timestamp}${method}${path}${jsonToQueryString(orderedParams, path)}`;
    // console.log(signatureBase);

    const signature = crypto.createHmac('sha512', secret)
        .update(signatureBase)
        .digest('base64');

    // console.log(signature);

    const headers = {
        'service-api-key': apikey,
        'nonce': nonce,
        'timestamp': timestamp,
        'signature': signature

    };

    const config= {
        method: method,
        url: path,
        baseURL: "https://test-api.blockchain.line.me", 
        headers: headers,
        data: orderedParams
    };

    try {
        let result = await axios.request(config);
            console.log("성공",result.data.responseData)
            return result.data.responseData;
    } catch (err) {
        if (err.response) {
            console.error(err.response.status, err.response.statusText);
            console.log(err.response.data);
            console.log(err.response.headers);
            console.log(err.response.config);
        } else {
            console.log(err);
        }
    }
}
export default callAPI