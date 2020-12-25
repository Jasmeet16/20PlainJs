const formSubmit = document.getElementById("form-submit");
const searchText = document.getElementById("search-item");
const divToPopulate = document.getElementById("meals");
const resultHeading  = document.getElementById("result-heading");
const randomButton = document.getElementById("random-button");

const divToPopulateSingleMeal  = document.getElementById("single-meal")




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
    divToPopulateSingleMeal.innerHTML = '';
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

function getIngredientsArray(meal){
    let ingredients = [];
    for( let i = 1 ; i <= 20 ; i++ ){
        let toPush;
        let str1 = "strIngredient"+i;
        let str2 = "strMeasure"+i;
        toPush ={ 
            ingredient : meal[str1],
            quantity :meal[str2]
        }
        if(meal[str1].length === 0){ 
             break;
        } 
         ingredients.push(toPush);
    }
    return ingredients;
} 

function populateSingleMeal(meal){
    divToPopulate.innerHTML = '';
    resultHeading.innerHTML = '';
    let ingredients = getIngredientsArray(meal);
    let htmlToInject = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing.ingredient + " : " + ing.quantity}</li>`).join('')}
        </ul>
      <div class="main">
      <h2>Follow the recipe below</h2>
        <p>${meal.strInstructions}</p>
        
      </div>
    </div>
  `;
    //         <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            
    //         <h3>${meal.strMeal}</h3>
            
    //         <ul>
    // `;
    // ingredients.forEach((ing)=>{
    //     htmlToInject += `<li>${ing.ingredient + "  " + ing.quantity}</li>`
    // });
    // htmlToInject += `
    // </ul>
    // <p class="single-meal-info">${meal.strInstructions}</p>
    // `

    divToPopulateSingleMeal.innerHTML = htmlToInject;
}


function handleRandom(){
    divToPopulateSingleMeal.innerHTML = '';
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res)=> res.json())
    .then((data)=>{
        populateUi(data.meals , true);
    })
}


function handleSingleMeal( ele ){
    let mealId = ele.getAttribute("data-mealID");
    console.log(mealId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res)=> res.json() )
    .then((data)=>{
        populateSingleMeal( data.meals[0]);
    })
}

//

formSubmit.addEventListener("submit" , handleSubmit);
randomButton.addEventListener("click",handleRandom);
divToPopulate.addEventListener("click" , (e)=>{
    if(  e.target.parentElement.classList.contains("meal-info") ){
        handleSingleMeal(e.target.parentElement);
    }else if(e.target.classList.contains("meal-info") ){
        handleSingleMeal(e.target);
    }

})