// Selecting items
var button = document.querySelector('#submit');
var input = document.querySelector('input');
var imgLink;
var hi_btn = document.querySelector('.hi-btn');
var imdb = document.querySelector(".imdb");

// Adding click event to logo
imdb.addEventListener("click",mReload);

// API URL and Key
var key = '1f7c6ff6'
var url = 'https://www.omdbapi.com/?apikey='+key+'&t='


input.addEventListener('input',()=>searchMovie(input.value));

// Reload function
function mReload() {
    location.reload();
    localStorage.removeItem("movie")
}
// Search button click function
button.addEventListener('click', (e) => {
    e.preventDefault();
    var value = input.value;
    localStorage.setItem("movie",value)
    location.reload();
   
});

// Rendering movie function
function renderMovie(){
    var value1 = localStorage.getItem("movie");
    if(value1 != null){
        var api = url+value1

        // Fetching API
        fetch(api).then((res)=> {return res.json()}).then((data)=>{
    
            console.log(data)
           if(data.Response == "False"){
            var movie_data = document.querySelector(".movie-data");
            var h1 = document.createElement("h1");
            h1.innerHTML = "No Such movie found"
            movie_data.appendChild(h1);
    
            setInterval(mReload,4000)
    
           }
           else{
    
            var count = 0;
            imgLink =  data.Poster
            var movie_data = document.createElement("div");
            movie_data.classList.add("movie-data");
            var card = document.querySelector('.movie-card');
           
            var image = document.createElement('img');
                
            image.src= imgLink
            image.classList.add('movie-img');
             card.appendChild(image)
            
//----------------Showing Content-------------

            var p1 = document.createElement('p');
            p1.name = data.imdbID
            p1.innerText = "Title : " + data.Title;
            p1.classList.add("movie-card-p-heading");
            card.appendChild(p1);

 //----------- Adding click to title to open Movie page -----------

            p1.addEventListener("click",(e)=>{
                e.preventDefault()
                var bigId = (e.path[0].name);
                var bkey = '1f7c6ff6'
                var burl = 'https://www.omdbapi.com/?apikey='+key+'&i='
                fetch(burl+bigId).then((res)=> {return res.json()}).then((bdata)=>{
                    var smovie_data = document.querySelector(".movie-data")
                    smovie_data.setAttribute("hidden","hidden");
                    var bmoviedata = document.querySelector(".bmovie-data")
                    bmoviedata.removeAttribute("hidden","hidden");
                    
                    var bmvimg = document.querySelector(".bigmovie-img");
                
                    var bimg = document.createElement("img");
                    bimg.src = bdata.Poster;
                    bimg.classList.add(".bimg");
                    bmvimg.appendChild(bimg);
                    bmoviedata.appendChild(bmvimg);

                    var bmovie_card = document.createElement("div");
                    bmovie_card.classList.add(".bmovie-card");
                    bmoviedata.appendChild(bmovie_card);

// --------------- Adding Title --------------------

                    var p1 = document.createElement('p');
                    p1.name = data.imdbID
                    p1.innerText = "Title : " + bdata.Title;
                    p1.classList.add("movie-card-p-bheading");
                    bmovie_card.appendChild(p1);
                    
// ----------------- Adding actors ------------------

                    var p2 = document.createElement('p');
                    p2.innerText = "Actors : " + bdata.Actors;
                    p2.classList.add("movie-card-p");
                    bmovie_card.appendChild(p2);

// ------------------adding director -----------------

                    var p8 = document.createElement('p');
                    p8.innerText = "Director : " + bdata.Director ;
                    p8.classList.add("movie-card-p");
                    bmovie_card.appendChild(p8);

//----------------------- adding movie year --------------------------

                    var p3 = document.createElement('p');
                    p3.innerText = "Year : " + bdata.Year;
                    p3.classList.add("movie-card-p");
                    bmovie_card.appendChild(p3);

//------------------------ adding imdb rating -----------------------

                    var p4 = document.createElement('p');
                    p4.innerText = "IMDb Rating : ⭐" + bdata.imdbRating ;
                    p4.classList.add("movie-card-p");
                    bmovie_card.appendChild(p4);

 // -----------------------adding movie plot to movie page---------------

                    var p5 = document.createElement('p');
                    p5.innerText = "Plot : " + bdata.Plot;
                    p5.classList.add("movie-card-p");
                    bmovie_card.appendChild(p5);

// ---------------------Adding movie languages to movie page-----------------

                    var p6 = document.createElement('p');
                    p6.innerText = "Languages : " + bdata.Language;
                    p6.classList.add("movie-card-p");
                    bmovie_card.appendChild(p6);

// --------------------- Adding genre to movie page ----------------

                    var p7 = document.createElement('p');
                    p7.innerText = "Genre : " + bdata.Genre ;
                    p7.classList.add("movie-card-p");
                    bmovie_card.appendChild(p7);

// -------------------- Home button click event function ------------------

                    var home = document.querySelector(".black");
                    home.addEventListener("click",()=>{
                        location.reload();
                    })

// ------------------------ Creating button of adding fav --------------------

                    var favbut = document.createElement("BUTTON");
                    favbut.classList.add("bfav-btn");
                    var boolean = localStorage.getItem(data.imdbID)
                    if(boolean == null){
                        favbut.innerHTML = "Add to favourites"
                        bmovie_card.appendChild(favbut);
                        favbut.name = data.imdbID
                        favbut.classList.add("btn");
                        favbut.classList.add("btn-danger")
                        favbut.setAttribute("name",data.imdbID)
                    }
                    else{
                        favbut.innerHTML = "Remove from favourites"
                        bmovie_card.appendChild(favbut);
                        favbut.name = data.imdbID
                        favbut.setAttribute("name",data.imdbID);
                        favbut.classList.add("btn");
                        favbut.classList.add("btn-danger")
                    }

//--------------------- Checking for inside text of adding to fav button -----------------

                    favbut.addEventListener('click',(e)=>{
                        e.preventDefault();
                        if(favbut.innerHTML == "Add to favourites"){
                            localStorage.setItem(e.path[0].name, e.path[0].name);
                            favbut.innerHTML="Remove from favourites";
                        }
                        else{
                            localStorage.removeItem(e.path[0].name, e.path[0].name);
                            favbut.innerHTML= "Add to favourites";
                        }
                    })


                })
            })

// ----------------- Adding actors ------------------

            var p2 = document.createElement('p');
            p2.innerText = "Actors : " + data.Actors;
            p2.classList.add("movie-card-p");
            card.appendChild(p2);
    
//----------------------- adding movie year --------------------------

            var p3 = document.createElement('p');
            p3.innerText = "Year : " + data.Year;
            p3.classList.add("movie-card-p");
            card.appendChild(p3);

//------------------------ adding imdb rating -----------------------
    
            var p4 = document.createElement('p');
            p4.innerText = "IMDb Rating : ⭐" + data.imdbRating ;
            p4.classList.add("movie-card-p");
            card.appendChild(p4);

//--------------------- Adding fav button ----------------------

            var favbut = document.createElement("BUTTON");
            favbut.classList.add("fav-btn");
            var boolean = localStorage.getItem(data.imdbID)
            if(boolean == null){
                favbut.innerHTML = "Add to favourites"
                card.appendChild(favbut);
                favbut.name = data.imdbID
                favbut.classList.add("btn");
                favbut.classList.add("btn-danger")
                favbut.setAttribute("name",data.imdbID)
            }
            else{
                favbut.innerHTML = "Remove from favourites"
                card.appendChild(favbut);
                favbut.name = data.imdbID
                favbut.setAttribute("name",data.imdbID);
                favbut.classList.add("btn");
                favbut.classList.add("btn-danger")
            }
            
// -------------------- Checking for inside text of adding to fav button --------------------

            favbut.addEventListener('click',(e)=>{
                e.preventDefault();
                if(favbut.innerHTML == "Add to favourites"){
                    localStorage.setItem(e.path[0].name, e.path[0].name);
                    favbut.innerHTML="Remove from favourites";
                }
                else{
                    localStorage.removeItem(e.path[0].name, e.path[0].name);
                    favbut.innerHTML= "Add to favourites";
                }
            })
    
           }
                
        })

    }


}

// ---------  Movie Suggestions and suggestions click function -----------

const searchMovie = async searchText =>{

    fetch(url+input.value).then((res)=> {return res.json()}).then((data)=>{
        console.log(data);

        if(data.Response != "False" && input.value!=""){
            var ul = document.querySelector("ul");
            ul.classList.add("ul");
            ul.removeAttribute("hidden")
            var li =document.querySelector("li");
            ul.appendChild(li);
            li.classList.add(".litem");
            li.innerHTML = data.Title;

            li.addEventListener("click",(e)=>{
                e.preventDefault();
                input.value = li.innerHTML;
                ul.setAttribute("hidden","hidden");
                button.click()
            })
        }
    })

}

// Calling render movies function

renderMovie();



