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
function renderResume(doc) {
    let tr = document.createElement('tr');
    let td_full_name = document.createElement('td');
    let td_address = document.createElement('td');
    let td_phone_number = document.createElement('td');
    let td_resume = document.createElement('td');



    tr.setAttribute('data-id', doc.id);
    td_full_name.textContent = doc.data().name;
    td_address.textContent = doc.data().address;
    td_phone_number.textContent = doc.data().phone_number;
    
    // btn_resume.textContent = "Download";
    // btn_pass.textContent = "Pass";
    // btn_cancel.textContent = "Decline";

    //btn_resume
    let btn_resume = document.createElement('input');
    btn_resume.type = "button";
    btn_resume.className = "btn btn-primary";
    btn_resume.value="Download";
    // btn_resume.onclick = (e)=>{
    //     let id = e.target.parentElement.getAttribute('data-id'); 
    //     console.log(id);
    // };
    btn_resume.onclick = ((e)=> {
        let id = tr.getAttribute('data-id', doc.id)
        console.log(doc.data().resume_file)
        // return function() {
        //     let id = e.target.parentElement.getAttribute('data-id');
        //     console.log(id)
        // }
        });
    td_resume.appendChild(btn_resume);
    

    //btn download
    // btn_resume.className = "btn btn-primary";
    // btn_resume.type = "button";
    // btn_resume.addEventListener('click', (e) => {
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     console.log(id)
    //     //  changeStateCheckResume(id)
    // });

    //btn pass
    // btn_pass.className = "btn btn-success";
    // btn_pass.type = "button";
    // btn_pass.addEventListener('click', (e) => {
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     changeStateCheckResume(id)
    // });
    // //btn cancel
    // btn_cancel.className = "btn btn-danger";
    // btn_cancel.type = "button";
    // btn_cancel.addEventListener('click', (e) => {
    //     let id = e.target.parentElement.getAttribute('data-id');
    //     deleteResume(id)

    // });

    tr.appendChild(td_full_name);
    tr.appendChild(td_address);
    tr.appendChild(td_phone_number);
    tr.appendChild(td_resume);
    // tr.appendChild(btn_pass);
    // tr.appendChild(btn_cancel);
    // tr.appendChild(btn_resume)


    accountList.appendChild(tr);
}

function ShowResume() {
    db.collection('users').onSnapshot(snapshot => {
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

function changeStateCheckResume(id) {
    db.collection('users').doc(id).update({
        check_pass: true
    })
    console.log("Edited")
}


function deleteResume(id) {
    db.collection('users').doc(id).delete();
}




