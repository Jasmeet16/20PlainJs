let movies = [document.getElementById("movie1"), document.getElementById("movie2") , document.getElementById("movie3")];
let container  = document.querySelector(".container");
let textInParaTag  = document.getElementById("seats-selected");
let priceInParaTag  = document.getElementById("price");
let selectedSeats = document.getElementsByClassName("selected");
console.log(container);
//enter name of  the movie and its price
let movieArray = [
    {
        name: "Loki",
        price:400
        
    },
    {
        name: "Avengers",
        price:300
    },
    {
        name: "Wonder_Woman",
        price:200
    }
];
//updating movies
movies.forEach( (movieElement , index) =>{
    movieElement.value = movieArray[index].price;
    movieElement.innerText= `${movieArray[index].name} (${movieArray[index].price} Rupees)` ;
} );

container.addEventListener( "click" , (e)=>{
    if( e.target.classList.contains("seats") && !e.target.classList.contains("not-available") ){
        let priceOfSelected = document.getElementById("movie-selector").value;
        updateClasslist( e );
        updateValue( priceOfSelected );
    } else if( e.target.classList.contains("seats") &&  e.target.classList.contains("selected") ){
        updateClasslist(e);
    }
    
} );


/// adding class

function updateClasslist( e ){
    console.log( e.target.className );
    e.target.classList.toggle("selected");
}

//updating text 

function updateValue( p ){
    textInParaTag.innerText =  selectedSeats.length;
    priceInParaTag.innerText = parseInt(selectedSeats.length * p);
}
