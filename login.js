
function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  //
  promise.catch(e => alert(e.message));
  alert("SignUp Successfully");
}

//signIN function
function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const promise = auth.signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var email = user.email;
      alert("Active user " + email);
      window.location.replace("ListResume.html");


    } else {
      alert("No Active user Found")
    }
  })

}


//signOut

function signOut() {
  auth.signOut();
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var email = user.email;
      // alert("Active user "+email);
      // location.href="ListResume.html"
    } else {
      window.location.replace("Login.html");
    }
  })
}

//active user to homepage
