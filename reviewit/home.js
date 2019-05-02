firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("si esta registrado")
      console.log(user.displayName)
    } else {
      // No user is signed in.
      console.log("no esta registrado")
    }
  });


  function logOut()
  {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("yase fue")
        window.location.href = "login.html"
      }, function(error) {
        // An error happened.
      });
  }