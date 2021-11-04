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



ShowIntern()

const accountList = document.querySelector('#tbl_intern_list');
function renderIntern(doc) {
    let tr = document.createElement('tr');
    let td_full_name = document.createElement('td');
    let td_phone_number = document.createElement('td');
    let td_role = document.createElement('td');
    let td_pass = document.createElement('td');
    let td_cancel = document.createElement('td');

    //btn
    let btn_pass = document.createElement('input');
    let btn_cancel = document.createElement('input');

    //set id from firebase
    tr.setAttribute('data-id', doc.id);
    td_full_name.textContent = doc.data().name;
    td_phone_number.textContent = doc.data().phone_number;
    td_role.textContent = doc.data().role_position


    //btn_pass
    btn_pass.type = "button";
    btn_pass.className = "btn btn-success";
    btn_pass.value = "Check";
    btn_pass.onclick = ((e) => {
        let id = tr.getAttribute('data-id', doc.id)
        console.log(doc.data().resume_file)
        changeStateCheckIntern(id)
    });
    td_pass.appendChild(btn_pass);


    //btn_cancel
    btn_cancel.type = "button";
    btn_cancel.className = "btn btn-danger";
    btn_cancel.value = "Decline";
    btn_cancel.onclick = ((e) => {
        let id = tr.getAttribute('data-id', doc.id)
        console.log(doc.data().resume_file)
        deleteResume(id)
    });
    td_cancel.appendChild(btn_cancel);

    tr.appendChild(td_full_name);
    tr.appendChild(td_phone_number);
    tr.appendChild(td_role);
    tr.appendChild(td_pass);
    tr.appendChild(td_cancel);


    accountList.appendChild(tr);
}

function ShowIntern() {
    db.collection('applicant').where('check_pass', '==', true).where('interview_pass', '==', true).where('intern', '==', false).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderIntern(change.doc);
            }
            else if (change.type == 'modified') {
                let td = accountList.querySelector(`[data-id=${change.doc.id}]`);
                accountList.removeChild(td)
            }
            else if (change.type == 'removed') {
                let td = accountList.querySelector(`[data-id=${change.doc.id}]`);
                accountList.removeChild(td)
            }
        })
    });

}

function changeStateCheckIntern(id) {
    db.collection('applicant').doc(id).update({
        intern: true
    })
    console.log("Edited")
    alert("บันทึกข้อมูลเสร็จสิ้น")

}

function deleteResume(id) {
    console.log(id)
    db.collection('Contract').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().contract_id == id) {
                db.collection('Contract').doc(doc.id).delete()
            }
        })
    })
    db.collection('applicant').doc(id).delete();
    alert("ยกเลิกเสร็จสิ้น")
}

function getOut(){

    window.location.replace("Login.html");
}





