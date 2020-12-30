const form = document.getElementById("form");
const submitButton = document.getElementById("btn-submit");
const searchKey = document.getElementById("search-text");
const url = `https://api.lyrics.ovh/suggest/`;
let content = document.getElementById("content");


async function fetchData(){
    let res = await fetch(`${url}${searchKey.value}`);
    let data = await res.json();
    console.log(data.data);
    await populateWithList(data.data);
}

async function populateWithList(data){
    // let lis = 
    // for( let i = 0 ; i < data.length ; i++ ){
    //     lis += `<li>${data[i].title}</li>`;
    // }
    content.innerHTML = `<ul>
    ${data.map((el)=> {
        return `
        <li>
        <img src="${el.album.cover}" class="img">
        <span>${el.title_short} by ${el.artist.name}</span>
        <button class="btn" song-name="${el.title_short}" artist-name="${el.artist.name}")>Get Lyrics</button>
        </li>
        `
    }).join('')
    }
    </ul>`
    addEventListenerOnLyricsButton();
   
}

let lyricsUrl = `https://api.lyrics.ovh/v1/artist/title`;

async function getLyrics( songName , artistName ){
    console.log(artistName, songName);
    const res = fetch(`https://api.lyrics.ovh/v1/${artistName}/${songName}`);
    let data = res.then((response)=>response.json());
    console.log(data);
}



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    fetchData();
})

function addEventListenerOnLyricsButton(){
    let lyricsButton = document.getElementsByClassName("btn");
    console.log(lyricsButton)
    for( let i = 0 ; i < lyricsButton.length ; i++ ){
        lyricsButton[i].addEventListener("click" , (e)=>{
                    let songName = e.target.getAttribute("song-name");
                    let artistName = e.target.getAttribute("artist-name")
                    getLyrics(songName , artistName);
                })
    }
    // lyricsButton.foreach(element => {
    //     element.addEventListener("click" , (e)=>{
    //         let songName = e.target.getAttribute("song-name");
    //         let artistName = e.target.getAttribute("artist-name")
    //         getLyrics(songName , artistName);
    //     })
    // });
}