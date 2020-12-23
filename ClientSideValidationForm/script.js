const form = document.getElementById("form");
const fname = document.getElementById("fname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
let submit = document.getElementById("form-submit");
let inputs = [ fname , email , password , password2 ];

// Event Listners

inputs.forEach( (input)=>{
    input.addEventListener("click", (e)=>{
        let p = input.parentElement;
        p.className = "form-control";
    })
});

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    checkName(fname);
    checkEmail( email );
    doPasswordsMatch( password , password2 );
    
    
});

 function checkName( fullName ){
    checkLength( fullName );
 } 

// check for email

function checkEmail( emailAsString ){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(emailAsString.value.trim())) {
        updateBorders( emailAsString.parentElement , false );
    } else {
        updateLabel( emailAsString.parentElement , "Enter correct email" )
        updateBorders( emailAsString.parentElement , true );
  }
}

// check for password

function doPasswordsMatch( pass1 , pass2 ){
    if( checkLength(pass1) && checkLength(pass2)){

    if( pass1.value !== pass2.value || pass1.value.length === 0 ){
        updateBorders( pass1.parentElement , true );
        updateBorders( pass2.parentElement , true );
        updateLabel( pass1.parentElement , "Passwords don't match" );
        updateLabel( pass2.parentElement , "Passwords don't match" );
    }else{
        updateBorders( pass1.parentElement , false );
        updateBorders( pass2.parentElement , false );
    }
}else{
    updateBorders( pass1.parentElement , true );
        updateBorders( pass2.parentElement , true );
        updateLabel( pass1.parentElement , "Password should be more than 4" );
        updateLabel( pass2.parentElement , "Password should be more than 4" );
}
}

//checks for input Lengths

function checkLength( input ){
  
        let val = input.value.trim();
        let par = input.parentElement;
        if( val.length < 4 ){
            updateLabel( par , `should be more than ${val.length}` );
            updateBorders( par , true );
            return false;
        }else{
            return true
        }
}

// Updating Ui

function updateLabel( el , text ){
    let label = el.children[2];
    label.innerText = text; 
}

function updateBorders( el , red ){
    if( red ){
        el.className = "form-control"+ " "+ "error";
    }else{
        el.className = "form-control" + " " +  "success";
    } 
}
