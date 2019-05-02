var idToke = 0;
var contador = 0;
var id = 0;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("si esta registrado")
      console.log(user.displayName)
      idToke = user.uid
      console.log(idToke)
    } else {
      // No user is signed in.
      console.log("no esta registrado")
    }
  });

  getIdDetail();
  function getIdDetail()
    {
      var parameters = location.search.substring(1).split("&");
      var temp = parameters[0].split("=");
      id = unescape(temp[1]);
      console.log(id);
    }
    
loadCatalog();

//funcion para sacar todo lo que hay en catalogo
function loadCatalog(){
    var database = firebase.database().ref().child('catalog/' + id);
    database.remove();
    database = firebase.database().ref().child('catalog/');
    database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var column = 0;

        snapshot.forEach(function(data){
            var name = data.val().name;
            var category= data.val().category;
            id = data.val().id;
            console.log(id)

                if(data.val().userCreator == idToke)
                {
                    //content += '<div class="card"> <img class="card-img-top" src="..." alt="Card image cap"> <div class="card-body">';
                    content += '<div class="card"> <div class="card-body"> <h5 class="card-title">' + name + '</h5>'; //Title
                    content += '<p class="card-text">' + category + '</p>';//Category
                    content += '<a href="#" class="btn btn-primary">' + 'Edit' + '</a>';
                    content += '<a class="btn btn-danger" href="each.html?id='+id+'">' + 'Delete' + '</a>';
                    content += '</div> </div>';
                }
                

        });

        $('#createList').append(content);
    }
});
}
// var deleteEn = document.getElementById("deleteBtn").value;

// deleteEn.value.addEventListener('click', e => {
//     var database = firebase.database().ref().child('catalog/' + id).remove
//     console.log("yes")
// });

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