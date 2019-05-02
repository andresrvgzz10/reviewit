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

function createnNew(){
  var comments = document.getElementById("comentariosId").value;
  document.getElementById("comentariosId").value = "";
  console.log(comments)
  var myRef = firebase.database().ref("comment/"+id).push();
    var key = myRef.key
    var myRef = firebase.database().ref("comment/"+id+"/"+key).set({
        comment: comments
    });
    document.getElementById("commentsGood").innerHTML = "";
    getComments();
}

getIdDetail();
function getIdDetail()
  {
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    id = unescape(temp[1]);
    console.log(id);
  }

getComments();
function getComments()
{
    var database = firebase.database().ref().child('comment/' + id);
    database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        snapshot.forEach(function(data){
            var comment = data.val().comment
            content += '<li class="list-group-item">' + comment + '</li>'          

        });

        $('#commentsGood').append(content);
  }
});
}

loadDetail();
//funcion para sacar todo lo que hay en catalogo
function loadDetail(){
    console.log(id)
    var database = firebase.database().ref().child('catalog/');
    database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var contentTwo = '';

        snapshot.forEach(function(data){

          if (data.val().id == id)
          {
            var name = data.val().name;
            var category= data.val().category;
            content += '<h1 class="display-4">' + name + '</h1>'
            contentTwo += '<h2>' + category + '</h2>'
             
          }                

        });

        $('#name').append(content);
        $('#infoCatalog').append(contentTwo);
    }
});
}



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