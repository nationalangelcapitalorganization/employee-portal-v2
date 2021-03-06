const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase)

const createNotification = notification => {
  return admin
    .firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("notification added", doc));
};

exports.articleCreated = functions.firestore
  .document("articles/{articleId}")
  .onCreate(doc => {
    const article = doc.data();

    if (article.publish) {
      const notification = {
        content: "added a new article",
        user: `${article.authorFirstName} ${article.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    } else {
      return null;
    }
  });

exports.articleUpdated = functions.firestore
  .document("articles/{articleId}")
  .onUpdate(doc => {
    const beforeArticle = doc.before.data();
    const afterArticle = doc.after.data();

    if (beforeArticle.publish && afterArticle.publish) {
      const notification = {
        content: "updated an article",
        user: `${afterArticle.authorFirstName} ${afterArticle.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    } else if (afterArticle.publish) {
      const notification = {
        content: "added a new article",
        user: `${afterArticle.authorFirstName} ${afterArticle.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    } else {
      return null;
    }
  });

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: "joined the party",
        user: `${newUser.firstName} ${newUser.lastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    });
});

