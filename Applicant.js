
const firebaseConfig = {
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
const storage = firebase.storage();

let userList = document.querySelector('#userList');
let form = document.querySelector('#addUser');

var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var fileName = document.getElementById('fileName');
var uploadFile = document.getElementById('uploadFile');
var file;
let downloadUrl;


fileButton.addEventListener('change', function (e) {
    file = e.target.files[0];
    console.log(file);
    fileName.textContent = file.name;
    console.log(file.name);

});

// uploadFile.addEventListener('click', function (e) {
//     console.log("Put File");
//     var storageRef = firebase.storage().ref(`img/${file.name}`);
//     var task = storageRef.put(file);

//     task.on('state_changed', function progress(snapshot) {
//         var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         uploader.value = percentage;
//         document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', percentage);
//         document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(percentage) + '%');

//     }, function error(err) {


//     }, function complete() {
//         storage.ref('img').child(file.name).getDownloadURL().then(url => {
//             console.log('File available at', url);
//             downloadUrl = url;})
//     })


// });


// function handleUpload() {
//     const uploadTask = storage.ref(`testImg/${file.name}`).put(file).then(
//         ()=>{ storage.ref("testImg/"+file.name).getDownloadURL().then((url)=>{
//         console.log(url)
//     }) } );  
// }


// function renderUser(doc) {
//     let li = document.createElement('li');
//     let name = document.createElement('span');
//     let city = document.createElement('span');
//     let del = document.createElement('div');

//     del.className = 'del'

//     li.setAttribute('data-id', doc.id);
//     name.textContent = doc.data().name;
//     city.textContent = doc.data().city;
//     del.textContent = "X";


//     li.appendChild(name);
//     li.appendChild(city);
//     li.appendChild(del);

//     userList.appendChild(li)

//     del.addEventListener('click', (e) => {
//         let id = e.target.parentElement.getAttribute('data-id');
//         db.collection('users').doc(id).delete();
//     })
// }

// db.collection('users').where('city', '==', 'เมือง').get().then(user => {
//     user.docs.forEach(doc => {
//         console.log(doc.data())
//         renderUser(doc)
//     });
// });


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let checkName = new RegExp('^[ก-๏a-zA-Z]*$')
    let checkPhone = new RegExp('(^(?:[+0]9)?[0-9]{10,12}$)');
    let checkEmail = new RegExp('^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$')
    // let cid = form.cid.value.toString()+"_resume"+file.name;
    // console.log(form.name.value && checkName.test(form.name.value) == true)
    // console.log( "บัตร" + checkCid.exec(form.cid.value))
    if (form.title_name.value == "") {
        alert("กรุณาเลือกเพศ")
    }
    else if (form.name.value && checkName.test(form.name.value) == false || form.name.value == "") {
        alert("กรุณาใส่ชื่อให้ถูกต้อง")
    }
    else if (form.sname.value && checkName.test(form.sname.value) == false || form.sname.value == "") {
        alert("กรุณาใส่นามสกุลให้ถูกต้อง")
    }

    else if (form.gender.value == "") {
        alert("กรุณาเลือกเพศ")
    }
    else if (form.birthdate.value == "") {
        alert("กรุณาใส่วันเกิดให้ถูกต้อง")

    }
    else if (form.cid.value.length < 13 || form.cid.value == "") {
        alert("กรุณาใส่เลขบัตรประชาชนให้ถูกต้อง")

    }
    else if (form.cid.value.length < 10 || checkPhone.test(form.phone_number.value) == false) {
        alert("กรุณาใส่เลขเบอร์โทรศัพท์ให้ถูกต้อง")
    }
    else if (checkEmail.test(form.email.value) == false) {
        alert("กรุณาใส่ email ให้ถูกต้อง")
    }
    else if (form.address.value == "") {
        alert("กรุณาใส่ที่อยู่ให้ถูกต้อง")
    }
    else if (form.role_position.value == "") {
        alert("กรุณาใส่ตำแหน่งที่ต้องการสมัครให้ถูกต้อง")
    }
    else if (file.name == "") {
        alert("file")
    }
    else {
        let name = form.title_name.value+" "+ form.name.value + " " + form.sname.value
        console.log("Put File");
        var storageRef = firebase.storage().ref(`file/${file.name}`);
        var task = storageRef.put(file);

        task.on('state_changed', function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
            document.getElementsByClassName('progress-bar').item(0).setAttribute('aria-valuenow', percentage);
            document.getElementsByClassName('progress-bar').item(0).setAttribute('style', 'width:' + Number(percentage) + '%');

        }, function error(err) {

        }, function complete() {
            storage.ref('file').child(file.name).getDownloadURL().then(url => {
                console.log('File available at', url);
                downloadUrl = url;
            }).then(() => {
                db.collection('users').add({
                    name: name,
                    cid: form.cid.value,
                    gender: form.gender.value,
                    birthdate: form.birthdate.value.toString(),
                    phone_number: form.phone_number.value,
                    address: form.address.value,
                    email: form.email.value,
                    role_position: form.role_position.value,
                    check_pass: false,
                    intern: false,
                    resume_file: downloadUrl,
                    interview_date: "",
                    interview_time: ""

                }).then(() => {
                    form.name.value = '';
                    form.sname.value = '';
                    form.cid.value = '';
                    form.email.value = '';
                    form.birthdate.value = '';
                    form.address.value = '';
                    form.phone_number.value = '';
                    form.role_position.value = '';
                    fileName.textContent = "Choose File";
                }).then(() => { location.href = "SuccessForm.html" })
            })
        })


    }
});

function clerInfo() {
    form.name.value = '';
    form.sname.value = '';
    form.gender.value = "";
    form.cid.value = '';
    form.email.value = '';
    form.birthdate.value = '';
    form.address.value = '';
    form.phone_number.value = '';
    form.role_position.value = '';
    fileName.textContent = "Choose File";
    file = '';
}


// db.collection('users').onSnapshot(snapshot => {
//     let changes = snapshot.docChanges();
//     changes.forEach(change => {
//         if (change.type == 'added') {
//             renderUser(change.doc);
//         }
//         else if (change.type == 'removed') {
//             let li = userList.querySelector(`[data-id=${change.doc.id}]`);
//             userList.removeChild(li)
//             // renderUser(change.doc)
//         }
//     })
// });

