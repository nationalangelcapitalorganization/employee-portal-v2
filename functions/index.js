const functions = require('firebase-functions');
const admin = require('firebase-admin')
const fetch = require("isomorphic-fetch");
const cloudname = functions.config().cloudinary.cloudname
const uploadPreset = functions.config().cloudinary.uploadpreset


const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})

exports.articleCreated = functions.firestore
  .document('articles/{articleId}')
  .onCreate(doc => {

    const article = doc.data()

    if (article.publish) {
      const notification = {
        content: 'added a new article',
        user: `${article.authorFirstName} ${article.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)

    } else { return null }

  })


exports.articleUpdated = functions.firestore
  .document('articles/{articleId}')
  .onUpdate(doc => {

    const beforeArticle = doc.before.data()
    const afterArticle = doc.after.data()

    if (beforeArticle.publish && afterArticle.publish) {
      const notification = {
        content: 'updated an article',
        user: `${afterArticle.authorFirstName} ${afterArticle.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)
    } else if (afterArticle.publish) {
      const notification = {
        content: 'added a new article',
        user: `${afterArticle.authorFirstName} ${afterArticle.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)

    } else { return null }

  })


exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data()
        const notification = {
          content: 'joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification)

      })

  })


exports.imageUpload = functions.https.onRequest((request, response) => {


  postData(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, 
  { file: request.body, 
    upload_preset: uploadPreset
  }).then(data => console.log(JSON.stringify(data)))
    .catch(error => console.error(error));

  function postData(url = ``, data = {}) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json()); 
  }


  let data = {
    location: 'https://d3lut3gzcpx87s.cloudfront.net/image_encoded/aHR0cHM6Ly9zaWxrc3RhcnQuczMuYW1hem9uYXdzLmNvbS83MThkNmY1OC00NzI1LTQzNmEtYTcyZi03M2EzYzc0ZDJkM2QucG5n/540x100fPNG'
  }
    response.set('Access-Control-Allow-Origin', '*')
    response.send(JSON.stringify(data))
});