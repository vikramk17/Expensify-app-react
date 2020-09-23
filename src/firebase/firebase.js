import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    // appId: "1:691221061915:web:125f87424363152ece33be",
    // measurementId: "G-6RD249JMV1"
  };

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export { firebase, database as default };

/* database.ref('notes')
.once('value')
.then((snapshot)=>{
    const teams = [];

    snapshot.forEach((team)=>{
        teams.push({
            id: team.key,
            ...team.val()
        })
    })
    console.log(teams)
})
.catch((e)=>{
    console.log(e)
}) */

/* database.ref('notes').on('value', (snapshot) => {
    const teams = [];

    snapshot.forEach((team)=>{
        teams.push({
            id: team.key,
            ...team.val()
        })
    })
    console.log(teams)
}) */

/* database.ref('notes').push({
    description: "chelsea",
    amount: 1313,
    createdAt: 3214
});
database.ref('notes').push({
    description: "Man Utd",
    amount: 1313,
    createdAt: 3214
});
database.ref('notes').push({
    description: "Liverpool",
    amount: 1313,
    createdAt: 3214
}); */

/* database.ref()
.once('value')
.then((snapshot)=>{
    let val = snapshot.val();
    console.log(val)
})
.catch((e)=>{
    console.log(e)
}) */

/* database.ref().set({
    name: 'Vikram kadam',
    age: 25,
    location: {
        city: 'Nashik',
        country: 'India'
    }
});

database.ref('age').remove().then(()=>{
    console.log('Removed success')
}).catch((error)=>{
    console.log("Remove failed:" + error)
}); */
