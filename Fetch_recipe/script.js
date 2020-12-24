const formSubmit = document.getElementById("form-submit");
const searchText = document.getElementById("search-item");
const divToPopulate = document.getElementById("meals");
const resultHeading  = document.getElementById("result-heading");
const randomButton = document.getElementById("random-button");




function handleSubmit(e){
    e.preventDefault();
    if(searchText.value.trim('').length == 0){
        updateHeading("Please enter name of the dish or hit Random button");
        divToPopulate.innerHTML= '';
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`)
    .then((res)=> res.json())
    .then((data)=>{
        populateUi(data.meals, false);
    });
}

function updateHeading(heading){
    resultHeading.innerHTML = `<h1>${heading}</h1>`;
}

function populateUi(meal , isRandom){
    
     if( meal === null ){
        updateHeading(`Sorry no meals found for ${searchText.value}`);
        searchText.value = '';
        return;
     }

    if(isRandom){
        updateHeading(`We suggest you to try ${meal[0].strMeal}`);
    }else{
        updateHeading(`Found ${meal.length} ${meal.length === 1 ? "meal":"meals"} for input ${searchText.value}`);
         searchText.value = '';
    }

    let inn  = ``;
    meal.forEach((m)=>{
         inn += `<div class="meal">
              <img src="${m.strMealThumb}" alt="${m.strMeal}" />
              <div class="meal-info" data-mealID="${m.idMeal}">
                <h3>${m.strMeal}</h3>
              </div>
            </div>`
    });
    divToPopulate.innerHTML = inn;
}

function handleRandom(){
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=> res.json())
    .then((data)=>{
        populateUi(data.meals , true);
    })
}


formSubmit.addEventListener("submit" , handleSubmit);
randomButton.addEventListener("click",handleRandom);