

var idToke = 0;
var contador = 0;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("si esta registrado")
      console.log(user.displayName)
      idToke = user.uid
    } else {
      // No user is signed in.
      console.log("no esta registrado")
    }
  });

var database = firebase.database();

//funcion para meter al catalogo
var add = document.getElementById("newCategoryBtn");




add.addEventListener('click', e => {
    var nameNew = document.getElementById("nameEtre").value;
    var categoryNew = document.getElementById("category").value;
    var urlPictureNew = document.getElementById("fileAdd").value;
    console.log("bien")
    if (name == null){
        window.alert("Check the name field")
    }
    writeUserData(nameNew,categoryNew,urlPictureNew)
    window.location.href = "catalog.html"


});


function writeUserData(nameNew, categoryNew, urlPictureNew) {

    var myRef = firebase.database().ref("catalog/").push();
    var key = myRef.key
    var myRef = firebase.database().ref("catalog/"+key).set({
        id:key,
        name: nameNew,
        category: categoryNew,
        urlPicture : urlPictureNew,
        userCreator: idToke,
        comments: "prueba"
    });
    // myRef.ref("catalog/" + key + "comments/").set({

    // });

  }

loadCatalog();

//funcion para sacar todo lo que hay en catalogo
function loadCatalog(){
    var database = firebase.database().ref().child('catalog');
    database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        var column = 0;

        snapshot.forEach(function(data){
            var name = data.val().name;
            var id= data.val().id 
            var category= data.val().category;
                //content += ' <img class="card-img-top" src="..." alt="Card image cap"> <div class="card-body">';
                content += '<div class="card"> <div class="card-body"> <h5 class="card-title">' + name + '</h5>'; //Title
                content += '<p class="card-text" id="categoris">' + category + '</p>';//Category
                content += '<a href="catalog_detail.html?id='+id+'">' + 'Detalle' + '</a>';
                content += '</div> </div>';

        });

        $('#catalogList').append(content);
        
    }
});
}

// function saveLocal()
// {
//     console.log("save")
//     localStorage.clear
//     var id = document.getElementById("idLocal").value;
//     console.log(id)
//     // localStorage.setItem("key",id)

//     // window.location.href = "catalog_detail.html"
    

// }

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