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
const applicant_db = db.collection('applicant');



ShowContract()

const accountList = document.querySelector('#tbl_account_list');
const firstName = document.getElementById('Firstname')
const gender = document.getElementById('Gender')
const birthdate = document.getElementById('birthdate')
const cid = document.getElementById('cid')
const phoneNumber = document.getElementById('phoneNumber')
const email = document.getElementById('email')
const address = document.getElementById('address')
const role_position = document.getElementById('role_position')
const interview_date = document.getElementById('interview_date')
const interview_time = document.getElementById('interview_time')

const contract_number = document.getElementById('contract_number')
const salary = document.getElementById('salary')


const datepicker = document.getElementById('datepicker')

const resume_contract_button = document.getElementById('resume_contract_button')
const contract_pass = document.getElementById('contract_pass')
const contract_cancel = document.getElementById('contract_cancel')


let doc_download = "";
let doc_pass_contract = "";
let doc_cancel_contract = "";


function renderContract(doc) {
    let tr = document.createElement('tr');
    // tr.className="tr-t";
    let td_full_name = document.createElement('td');
    let td_address = document.createElement('td');
    let td_phone_number = document.createElement('td');
    let td_role = document.createElement('td');
    td_role.style = "text-align: center;"
    let td_info = document.createElement('td');

    //btn
    let btn_info = document.createElement('input');

    //set id from firebase
    tr.setAttribute('data-id', doc.id);
    // id = doc.data().contract_id
    // console.log(doc.id);

    // let applicant_info = getFromApplicant(id).data()


    td_full_name.textContent = doc.data().name;
    td_address.textContent = doc.data().address;
    td_phone_number.textContent = doc.data().phone_number;
    td_role.textContent = doc.data().role_position




    //btn_info
    btn_info.type = "button";
    btn_info.className = "btn btn-primary";
    btn_info.value = "แสดงข้อมูล";
    btn_info.onclick = ((e) => {
        let id = tr.getAttribute('data-id', doc.id)
        doc_download = doc.data().resume_file
        doc_cancel_contract = doc.id
        doc_pass_contract = doc.id
        showInfo(doc)

    });
    td_info.appendChild(btn_info);


    tr.appendChild(td_full_name);
    tr.appendChild(td_address);
    tr.appendChild(td_phone_number);
    tr.appendChild(td_role);
    // tr.appendChild(td_resume);
    tr.appendChild(td_info)
    // tr.appendChild(td_pass);
    // tr.appendChild(td_cancel);

    accountList.appendChild(tr);
}

function ShowContract() {
    db.collection('applicant').where('check_pass', '==', true).where('interview_pass', '==', false).onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderContract(change.doc);
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
    phoneNumber.value = id.data().phone_number
    email.value = id.data().email
    address.value = id.data().address
    role_position.value = id.data().role_position
    interview_date.value = id.data().interview_date
    interview_time.value = id.data().interview_time

}

resume_contract_button.addEventListener('click', (e) => {
    if (doc_download != "") {
        window.open(
            doc_download,
            "_blank"
        );
    }
    else {
        console.log("failed")
        alert("กรุณาเลือกใบสมัคร");
    }
})

contract_pass.addEventListener('click', (e) => {
    console.log(contract_number.value)
    console.log(doc_pass_contract)

    if (doc_pass_contract == "") {
        alert("กรุณาเลือกใบสมัคร")

    }
    else if(contract_number.value == ""){
        alert("กรุณาใส่เลขสัญญา");
    }
    else if(salary.value == ""){
        alert("กรุณาใส่เงินเดือน");

    }
    else if (datepicker.value == "") {
        alert("กรุณาใส่วันเพื่อนัดสัมภาษณ์");
    } else {
        changeStateCheckContract(doc_pass_contract)
    }


})

contract_cancel.addEventListener('click', (e) => {
    console.log(doc_cancel_contract)
    if (doc_cancel_contract == "") {
        alert("กรุณาเลือกใบสมัคร")
    }
    
    else {
        deleteResumeAndContract(doc_cancel_contract)
    }
})

function changeStateCheckContract() {
    db.collection('Contract').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().contract_id == doc_pass_contract) {
                db.collection('Contract').doc(doc.id).update({
                    contract_number: contract_number.value.toString(),
                    contract_pass: true,
                    salary: salary.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    start_date: datepicker.value.toString()
                });
            }
        })
    })

     applicant_db.doc(doc_pass_contract).update({
        interview_pass: true
    })
    alert("บันทึกข้อมูลเรียบร้อย")

}


function deleteResumeAndContract(id) {
    db.collection('applicant').doc(id).delete();
    db.collection('Contract').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().contract_id == doc_pass_contract) {
                db.collection('Contract').doc(doc.id).delete()
            }
        })
    })
    alert("ยกเลิกใบสมัครเสร็จสิ้น")

}

function getOut() {
    window.location.replace("Login.html");
}
