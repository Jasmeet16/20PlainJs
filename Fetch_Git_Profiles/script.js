const cardToFill = document.getElementById("main");
const searchForm = document.getElementById("forms");
const searchKey = document.getElementById("search-text");

const url = `https://api.github.com/users/`;

async function fetchUser(){
   try{
        let res = await axios.get(url + searchKey.value);
        await updateUi(res.data);
        fillRepos();
    }catch(err){
         console.log(err)
        if( err.response.status == 404  ){
            createErrorCard(`No profile found with username ${searchKey.value}`)
        }
        
    }
}

function updateUi( res ){
    let htmlToReplace = ` 
    <div class="image-container">
        <img src="${res.avatar_url}" alt="${res.avatar_url}">
    </div>
    <div class="content">
        <a class="username" href="${res.html_url}"> ${res.name} </a>
        <p>${res.bio}</p>
        <ul>
            <li>${res.followers} Followers</li>
            <li>${res.following} Following</li>
            <li> ${res.public_repos} Repos</li>
        </ul>
        <div class="repos" id="repos">
        </div>
    </div>`;
    cardToFill.classList = "main";
    cardToFill.innerHTML = htmlToReplace;
}

async function fillRepos(){
    let { data } = await axios.get(`https://api.github.com/users/${searchKey.value}/repos`);
    repos.innerHTML = "";
    putReposToUi( data );
    
}

function putReposToUi( reposArray ){
    let repos = document.getElementById("repos");
    reposArray
    .slice(0,10)
    .forEach((rep)=>{
        const anchorEl = document.createElement("a");
        anchorEl.classList.add("repo")
        anchorEl.innerText = rep.name;
        anchorEl.href = rep.html_url;

        repos.appendChild(anchorEl);
    })
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    cardToFill.innerHTML = cardHTML
}

searchForm.addEventListener("submit" , (e)=>{
    e.preventDefault();
    if( searchKey.value.trim().length === 0 ) return;
    fetchUser();
} )
