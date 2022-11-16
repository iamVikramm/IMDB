// Api and Key

var key = '1f7c6ff6'
var url = 'https://www.omdbapi.com/?apikey='+key+'&i='

// Checking if fav movies list is empty

if(localStorage.length == 1 || localStorage.length == 0 ){
    var container = document.querySelector(".container");
    var h1 = document.createElement("h1");
    h1.innerHTML = "No Favourite Movies"
    container.appendChild(h1)
}

// --------For each fav movie in local storage getting the info

for(let i =0 ; i<localStorage.length;i++){
    var id = (localStorage.key(i));
    if(localStorage.key(i)!="movie"){

// ------------Fetching data of each movie in local storage---------

    fetch(url+id).then((res)=> {return res.json()}).then((data)=>{
        console.log(data)
        var container = document.querySelector(".container");
        var favCard = document.createElement("div");
        favCard.classList.add("card-fav");
        container.appendChild(favCard)

// -------------------Adding image of fav movie --------------

        var favImg = document.createElement("img");
        favImg.src = data.Poster;
        favImg.classList.add("fav-img");
        favCard.appendChild(favImg)
        var p1 = document.createElement('p');
        p1.innerText = "Title : " + data.Title;
        p1.classList.add("movie-card-p-heading");
        favCard.appendChild(p1);

//---------------- Adding remove from fav button -------------

        var btn = document.createElement("button");
        favCard.appendChild(btn);
        btn.classList.add("btn");
        btn.name = data.imdbID;
        btn.classList.add("btn-danger");
        btn.innerHTML = "Remove Favourite"

//---------------- Adding click events to remove fav button -------------

        btn.addEventListener('click',(e)=>{
            e.preventDefault();
            localStorage.removeItem(e.path[0].name, e.path[0].name)         
            location.reload();           
        })
        
    })
}
}