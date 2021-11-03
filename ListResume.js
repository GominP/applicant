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



ShowResume()

const accountList = document.querySelector('#tbl_account_list');
const firstName = document.getElementById('Firstname')
const gender = document.getElementById('Gender')
const birthdate = document.getElementById('birthdate')
const cid = document.getElementById('cid')
const phoneNumber = document.getElementById('phoneNumber')
const email = document.getElementById('email')
const address = document.getElementById('address')
const position_name = document.getElementById('role_position')


function renderResume(doc) {
    let tr = document.createElement('tr');
    let td_full_name = document.createElement('td');
    let td_address = document.createElement('td');
    let td_phone_number = document.createElement('td');
    let td_role = document.createElement('td');
    let td_resume = document.createElement('td');
    let td_info = document.createElement('td');

    let td_pass = document.createElement('td');
    let td_cancel = document.createElement('td');

    //btn
    let btn_resume = document.createElement('input');
    let btn_info = document.createElement('input');
    let btn_pass = document.createElement('input');
    let btn_cancel = document.createElement('input');

    //set id from firebase
    tr.setAttribute('data-id', doc.id);
    td_full_name.textContent = doc.data().name;
    td_address.textContent = doc.data().address;
    td_phone_number.textContent = doc.data().phone_number;
    td_role.textContent = doc.data().role_position


    //btn_resume
    btn_resume.type = "button";
    btn_resume.className = "btn btn-primary";
    btn_resume.value = "Download";
    btn_resume.onclick = ((e) => {
        let id = tr.getAttribute('data-id', doc.id)
        console.log(doc.data().resume_file)
        // location.href = doc.data().resume_file
        window.open(
            doc.data().resume_file,
            "_self" // <- This is what makes it open in a new window.
        );
    });
    td_resume.appendChild(btn_resume);

    //btn_info
    btn_info.type = "button";
    btn_info.className = "btn btn-primary";
    btn_info.value = "แสดงข้อมูล";
    btn_info.onclick = ((e) => {
        let id = tr.getAttribute('data-id', doc.id)
        // console.log(doc)
        showInfo(doc)

    });
    td_info.appendChild(btn_info);

    //btn_pass
    btn_pass.type = "button";
    btn_pass.className = "btn btn-success";
    btn_pass.value = "Check";
    btn_pass.onclick = ((e) => {
        let id = tr.getAttribute('data-id', doc.id)
        console.log(doc.data().resume_file)
        changeStateCheckResume(id)
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
    tr.appendChild(td_address);
    tr.appendChild(td_phone_number);
    tr.appendChild(td_role);
    tr.appendChild(td_resume);
    tr.appendChild(td_info)
    tr.appendChild(td_pass);
    tr.appendChild(td_cancel);


    accountList.appendChild(tr);
}

function ShowResume() {
    db.collection('users').where('check_pass', '==', false).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderResume(change.doc);
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

function showInfo(id) {
    firstName.value = id.data().name
    gender.value = id.data().gender
    birthdate.value = id.data().birthdate
    cid.value = id.data().cid
    phoneNumber.value =id.data().phone_number
    email.value = id.data().email
    address.value = id.data().address
    position_name.value = id.data().role_position
}

function changeStateCheckResume(id) {
    db.collection('users').doc(id).update({
        check_pass: true
    })
    console.log("Edited")
}


function deleteResume(id) {
    db.collection('users').doc(id).delete();
}

function getOut() {

    window.location.replace("Login.html");
}





