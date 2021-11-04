var firebaseConfig = {
    apiKey: "AIzaSyBqYbL7Zi6Gi8DMBVNZSrYc-ZkM5-g27JE",
    authDomain: "applicant-9d5ca.firebaseapp.com",
    projectId: "applicant-9d5ca",
    storageBucket: "applicant-9d5ca.appspot.com",
    messagingSenderId: "105254578536",
    appId: "1:105254578536:web:34eb281d8c4abcb9244edd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const accountList = document.querySelector('#recruited_list');

ShowResume()

function ShowResume() {
    db.collection('applicant').where('check_pass', '==', true).where('interview_pass', '==', false).get().then(user => {
        user.docs.forEach(doc => {
            console.log(doc.data())
            renderRescruit(doc)
        });
    });

}

function renderRescruit(doc) {
    let tr = document.createElement('tr');
    // let td_cid = document.createElement('td');
    let td_full_name = document.createElement('td');
    let td_role = document.createElement('td');
    let td_date = document.createElement('td');



    //set id from firebase
    tr.setAttribute('data-id', doc.id);
    td_full_name.textContent = doc.data().name;
    // td_address.textContent = doc.data().cid;
    td_role.textContent = doc.data().role_position
    td_date.textContent = doc.data().interview_date +"  "+ doc.data().interview_time

    tr.appendChild(td_full_name);
    // tr.appendChild(td_cid);
    tr.appendChild(td_role);
    tr.appendChild(td_date);




    accountList.appendChild(tr);
}


