const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello, ninjas!");
});

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc))
})

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data()

    if (project.publish) {
      const notification = {
        content: 'Added a new project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)

    } else { return null }

})


exports.projectUpdated = functions.firestore
  .document('projects/{projectId}')
  .onUpdate(doc => {

    const beforeProject = doc.before.data()
    const afterProject = doc.after.data()

    if (beforeProject.publish && afterProject.publish) {
      const notification = {
        content: 'Updated a project',
        user: `${afterProject.authorFirstName} ${afterProject.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification)
    } else if (afterProject.publish) {
      const notification = {
        content: 'Added a new project',
        user: `${afterProject.authorFirstName} ${afterProject.authorLastName}`,
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
          content: 'Joined the party',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification)

      })

})


