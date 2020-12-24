const apiKey = "9ab16a81a5cd5de8a5920395";
let currencyOne = document.getElementById("currency-one");
let currencyTwo = document.getElementById("currency-two");
const swapButton = document.getElementById("swap-button");
let rate = document.getElementById("rate");

let amountOne = document.getElementById("amount-one");
let amountTwo = document.getElementById("amount-two");
let currencyArr =[currencyOne , currencyTwo];
let valueArr = [ amountOne, amountTwo];


calculate();


function updateUi( mulFactor ){
    mulFactor = mulFactor.toFixed(2);
    amountTwo.value = mulFactor * amountOne.value ;
    rate.innerText = `1 ${currencyOne.value} is equal to ${mulFactor} ${currencyTwo.value}`;
}

function calculate(){
    let tar = document.getElementById("currency-one").value;
    let link = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${tar}`;

    fetch(link)
    .then((res) => res = res.json())
    .then((data)=>{
        updateUi( data.conversion_rates[currencyTwo.value] );
    });
      
}

////////event listners

swapButton.addEventListener("click",()=>{
    let temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});


currencyArr.forEach( el=> el.addEventListener("change" ,calculate));

valueArr.forEach( el=> el.addEventListener("input" ,calculate));



