// Dummy Daaten 
let dummyFilmList = [
    {
        title: "Titanic",
        genre: "Drama",
        favorite: false,
    },
    {
        title: "Herr der Rinde",
        genre: "Action",
        favorite: false,
    },
    {
        title:"Castaway",
        genre: "Drama",
        favorite:false,

    },
    {
        title:"Amrican Pie",
        genre: "Komödie",
        favorite:false,
    },
];

// Elemente aus dem DOM abrufen
//Film ihnzufügen Elemente
const addFilmLayout = document.getElementById("addFilmLayout");
const addFilmButton = document.getElementById("addFilmButton");
const filmTitleInput = document.getElementById("filmTitle");
const filmGenreInput = document.getElementById("filmGenre");
const confirmAddFilmButton = document.getElementById("confirmAddFilmButton");

// Film suchen
const searchInput = document.getElementById("searchInput");
const searchIcon = document.getElementById("searchIcon");
const clearSearchButton = document.getElementById("clearSearchButton");


// Filmliste
const filmListElement = document.getElementById("filmList");

//Event Listene für das Hinzufügen und Suchen von Filmen
addFilmButton.addEventListener("click", toggleAddFilmElements);
confirmAddFilmButton.addEventListener("click", addFilm);
searchInput.addEventListener("input", searchFilms);
clearSearchButton.addEventListener ("click", clearSearch);

// Funktion um Einblenden/Ausblenden der Elemente des AddFilmLayouts 
function toggleAddFilmElements(){
    toggleAdFilmButton();
    toggleInputFields();
}

//Funktionen zum Aktivieren/Deaktivieren des addFilmButtons
function toggleAddFilmButton(){
    addFilmButton.classList.toggle("disabled");
}

//Funktion zum Anzeigen/Ausblenden der Eingabefelder
function toggleInputFields(){
    const layoutStyle = addFilmLayout.style.display;

    if (layoutStyle === "none" || layoutStyle === ""){
        addFilmLayout.style.display= "flex";
    } else{
        addFilmLayout.style.display = "none";
    }
}


//Funktion zum Hinzufügen vom Filmen
function addFilm(){
    const title = filmTitleInput.value.trim();
    const genre = filmGenreInput.value.trim();


//Film hinzufügen
    if(title && genre){
    const film = {
        title, genre, favorite: false,
    };

    dummyFilmList.push(film);
    displayFilm();
    
    //Formularfelder leeren
    filmTitleInput.value="";
    }

    //Layout ausblenden
    toggleAddFilmElements();

}

//Funktion zur Anzeige der Filme in der Filmliste
function displayFilm(filteredFilms) {
    // Liste leeren 
    filmListElement.innerHTML ="";


    //Filmliste -Quelle auswählen und sortieren
    const films = filteredFilms ?? dummyFilmList;
    films.sort((a,b) => a.title.localeCompare(b.title))


    //Filme anzeigen
    films.forEach((film, index) => {


        //Titel
        const title = document.createElement("span");
        title.classList.add("film-title");
        title.textContent = film.title;

        
        //Genre
        const genre = document.createElement("span");
        genre.classList.add("film-genre");
        genre.textContent = `(${film.genre})`;


        //Fav icon
        const favoriteIcon = document.createElement("i");
        const iconClass = film.favorite ? "fa-star" :  "fa-star-o";
        favoriteIcon.classList.add("film-icon", "fa", iconClass);
        favoriteIcon.addEventListener("click", () => toggleFavorite(index));


        // Löschen-Button + Icon
        const deleteButton = document.createElement("button");
        deleteButton.id = "deleteFilmButton";
        deleteButton.addEventListener("click", () => deleteFilm(index));

        const deleteButtonIcon = document.createElement("i");
        deleteButtonIcon.classList.add("fa", "fa-minus");
        deleteButton.appendChild(deleteButtonIcon);


        //ListenElement der Filmliste hinzufügen
        const li = document.createElement("li");
        li.append(title,genre,favoriteIcon, deleteButton);
        filmListElement.appendChild(li);
    });
}

//Funktion zum update des Favoriten Status

function toggleFavorite(index){
    dummyFilmList[index].favorite = !dummyFilmList[index].favorite;
    displayFilm();

}

//Function zum Löschen eines Films

function deleteFilm(index) {
    dummyFilmList.splice(index, 1);
    displayFilm();
}

//Function zur Suche von Filmen
    function searchFilms(){
        //Suchbegriff in kleinbuchstaben
        const searchTerm = searchInput.value.trim().toLowerCase();

        //gefiltere Filmliste
        let filteredFilms;

        //Abgleich Suchbegriff (=== Film suchen)
        if (searchTerm === "favoriten") {
            filteredFilms = dummyFilmList.filter((film) => film.favorite);
        } else {
            filteredFilms = dummyFilmList.filter((film) => {
                return (
                film.title.toLowerCase().includes(searchTerm) || 
                film.genre.toLowerCase().includes(searchTerm)
                );
            });
        }
        toggleSearchElements()
        displayFilm(filteredFilms);
    }

    //Funktion zum Einblenden/Ausblnenden der Komponenten der Filmsuche

    function toggleSearchElements(){
        const activeSearch = searchInput.value;
        searchIcon.classList.toggle("hidden", activeSearch);
        clearSearchButton.classList.toggle("hidden", !activeSearch);

    }

    //Funktion zum Leeren des Suchfeldes
    function clearSearch(){
    searchInput.value = "";
    toggleSearchElements();
    displayFilm();
    }

    //Initialisiere Filmliste anzeigen
    displayFilm();