const functions = require('firebase-functions')
const admin = require('firebase-admin')

require('dotenv').config();
const privateKey = (process.env.PRIVATE_KEY || "").split("\\n").join("\n");
const serviceAccount = {
    "type": process.env.TYPE,
    "project_id":process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": privateKey,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_CERT_URL
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  "https://ydot-23a93-firebaseio.com"
})

const request = require('axios')

    const kakaoRequestMeUrl = 'https://kapi.kakao.com/v2/user/me?secure_resource=true'
    
    /**
     * requestMe - Returns user profile from Kakao API
     *
     * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
     * @return {Promise<Responser>}      User profile response in a promise
     */
    function requestMe(kakaoAccessToken) {
      console.log('Requesting user profile from Kakao API server.')
      return request({
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + kakaoAccessToken},
        url: kakaoRequestMeUrl,
      })
    }

/**
   * updateOrCreateUser - Update Firebase user with the give email, create if
   * none exists.
   *
   * @param  {String} userId        user id per app
   * @param  {String} email         user's email address
   * @param  {String} displayName   user
   * @param  {String} photoURL      profile photo url
   * @return {Promise<UserRecord>} Firebase user record in a promise
   */
  async function updateOrCreateUser(userId, email, displayName, photoURL) {
    console.log('updating or creating a firebase user');
    const updateParams = {
      provider: 'Kakao',
      displayName: displayName,
    };
    if (displayName) {
      updateParams['displayName'] = displayName;
    } else {
      updateParams['displayName'] = email;
    }
    if (photoURL) {
      updateParams['photoURL'] = photoURL;
    }
    console.log(updateParams,"hhhhfhkjeoisgjpoi");
    return admin.auth().updateUser(userId, updateParams)
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        updateParams['uid'] = userId;
        if (email) {
          updateParams['email'] = email;
        }
        return admin.auth().createUser(updateParams);
      }
      throw error;
    });
  }

  /**
   * createFirebaseToken - returns Firebase token using Firebase Admin SDK
   *
   * @param  {String} kakaoAccessToken access token from Kakao Login API
   * @return {Promise<String>}                  Firebase token in a promise
   */
  async function createFirebaseToken(kakaoAccessToken) {
    return requestMe(kakaoAccessToken).then((body) => {
    //     console.log("here")
    //     console.log(response)
    //   const body = JSON.parse(response)
    //   console.log("there")
      console.log(body)
console.log("!")
      const userId = `kakao:${body.data.id}`
      if (!userId) {
        return res.status(404)
        .send({message: 'There was no user with the given access token.'})
      }
      let nickname = null
      let profileImage = null
      if (body.data.properties) {
        nickname = body.data.properties.nickname
        profileImage = body.data.properties.profile_image
      }
      return updateOrCreateUser(userId, body.data.kakao_account.email, nickname,
        profileImage)
    }).then((userRecord) => {
        console.log(userRecord)
      const userId = userRecord.uid
      console.log(`creating a custom firebase token based on uid ${userId}`)
      return admin.auth().createCustomToken(userId, {provider: 'Kakao'})
    }).catch((err)=>{
        console.log("error at here")
        console.error(err)
    })
  }

  exports.kakaoCustomAuth = functions.https
  .onRequest((req, res) => {
    
    const token = req.body.data.token
    if (!token) return res.status(400).send({error: 'There is no token.'})
    console.log(`Verifying Kakao token: ${token}`)
    return createFirebaseToken(token).then((firebaseToken) => {
      console.log(`Returning firebase token to user: ${firebaseToken}`)
        // res.status(200).send(JSON.stringify({ firebase_token : firebaseToken}));
    
        res.send({data:{ firebase_token : firebaseToken}});
        // res.status(200).send({data:"hi"})
        
        // res.send({data:"hello!!for test"})
    })

  })
  