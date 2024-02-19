const searchForm = document.querySelector("form")
const movieInfoBox = document.querySelector(".movieInfo");
const movieDetails = document.querySelector(".movie-details");
const inputValue = document.querySelector(".inputValue");


//-----------function to fetch movie details using OMDB API---------
const getMovieInfo = async (movie) => {
    
    try {

        const response = await fetch(`http://www.omdbapi.com/?apikey=40dd68ae&t=${movie}`);
        console.log(response);
        if(!response.ok){
            throw new Error("Unable to fetch movie data");
        }
        const data = await response.json();
        

        showMovieData(data);


    } catch (error) {
        showErrorMessege("Movie Not Found!!!")
    }
}

//----------Function to show movie data in web browser-------------

const showMovieData = (data) => {
    movieInfoBox.innerHTML = "";
    movieInfoBox.classList.remove("noBackground");
    // using Destructuring obeject to get values from data 
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, Country, Language } = data;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-information")
    movieElement.innerHTML = `<h2>${Title}</h2>
                             <p><strong>Rating: &#11088</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movie-genre");
    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released: </strong>${Released}</p>
                               <p><strong>Actors:   </strong>${Actors}</p> 
                               <p><strong>Duration: </strong>${Runtime}</p> 
                               <p><strong>Country: </strong>${Country}</p> 
                               <p><strong>Langauge: </strong>${Language}</p> 
                               <p><strong>Plot: </strong>${Plot}</p> 
    `;

    // creating div for movie poster
    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src=${Poster} alt="this is an image"/>`

    movieInfoBox.appendChild(moviePosterElement)
    movieInfoBox.appendChild(movieElement);

}


// /---------function for error messege handling-------
const showErrorMessege = (messege)=>{
    movieInfoBox.innerHTML = `<h2> ${messege}</h2>`;
    movieInfoBox.classList.add("noBackground");
}

//---------function for handle form submit------
const formSubmit = (e)=>{
    e.preventDefault()
    showErrorMessege(`<i class="fa-solid fa-spinner fa-spin"></i>`)
    const movieName = inputValue.value.trim();
    if (movieName !== "") {
        getMovieInfo(movieName)
    } else {
       showErrorMessege("Enter movie name to get movie information")}
}

//---------- adding eventlistner to search button with form ---------
searchForm.addEventListener("submit", formSubmit)

