const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'

const timerElement = document.getElementById('timer')

const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startBtn = document.getElementById("start-game")
let startTime = null
let time = null
let selector = false

let top100 = ['the', 'at', 'there', 'some',	 'my', 'of', 'be', 'use', 'her', 'than', 'and', 'this', 'an', 'would', 'first', 'a', 'have', 'each',
 'make', 'water', 'to', 'from', 'which', 'like', 'been', 'in', 'or', 'she'	, 'him', 'call' , 'is'	, 'one'	,'do'	, 'into'	, 'who',
  'you'	, 'had'	, 'how'	, 'time', 'oil', 'that', 'by', 'their', 'has', 'its', 'it', 'word', 'if', 'look', 'now', 'he', 'but', 'will', 'two', 'find', 
  'was', 'not', 'up', 'more', 'long', 'for', 'what', 'other', 'write', 'down', 'on', 'all', 'about', 'go', 'day', 'are', 'were', 'out', 'see', 'did', 
  'as', 'we', 'many', 'number', 'get', 'with', 'when', 'then', 'no', 'come', 'his', 'your', 'them', 'way', 'made', 'they', 'can', 'these', 'could', 'may',
   'I'	, 'said', 'so'	, 'people'	, 'part']

async function startGame() {
    startTime = null
    timer.innerText = '0'
    startBtn.classList.add("hidden")
    typingDiv.innerHTML = ""
    statsDiv.innerHTML = ""
    changeCursorColor()

    let text = await getRandomQuote()
    const characters = text.split("").map((char) => {
        const span = document.createElement("span")
        if(char.charCodeAt(0) === 8217){
            char = '\''
        }
        span.innerText = char
        typingDiv.appendChild(span)
        return span
    });

    let cursorIndex = 0;
    let cursorCharacter = characters[cursorIndex]
    cursorCharacter.classList.add("cursor")

    const keydown = ({ key }) => {
        console.log(key)
        if (startTime === null) {
            startTime = new Date()
            startTimer()
        }
        console.log('Inner Text: '+ cursorCharacter.innerText.charCodeAt(0))
        if(key === cursorCharacter.innerText){
            cursorCharacter.classList.remove("cursor")
            cursorCharacter.classList.remove("error")
            cursorCharacter.classList.add("done")
            cursorCharacter = characters[++cursorIndex]
        }else{
            cursorCharacter.classList.remove("cursor")
            characters[cursorIndex].classList.add("error")
        }
        if (cursorIndex >= characters.length) {
            // game ended
            clearInterval(time);
            const seconds = getTimerTime();
            const numberOfCharacters = text.split("").length
            const wps = (numberOfCharacters/ seconds)/5
            const wpm = wps * 60.0
            document.getElementById("stats").innerText = `wpm = ${parseInt(wpm)}`
            document.removeEventListener("keydown", keydown)
            startBtn.classList.remove("hidden")
            return
          }
      
          cursorCharacter.classList.add("cursor")
    }
    document.addEventListener("keydown", keydown)
}

function getRandomQuote() {
    if (selector === false){
        return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
    }else{
        
        getRandomInt(top100.length)
        for (let i = 0; i < 30; i++){
            if (i ===0)
                word = top100[getRandomInt(top100.length)]
            word = word + ' ' + top100[getRandomInt(top100.length)]
        }
        return word
    }
}


function startTimer(){
    timerElement.innerText = 0
    time = setInterval(()=>{
        timer.innerText = getTimerTime()
    },1000)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime)/1000)
}


function switchMode(){
    selector = !selector
    console.log(selector)
    return selector
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function changeCursorColor(){
    setInterval(()=>{
        var x = document.getElementsByClassName('cursor');
        console.log(x)
        if (x[0].style.borderLeftColor != "rgb(116, 125, 140)")
          x[0].style.borderLeftColor = "#747d8c";
        else {
          x[0].style.borderLeftColor = "#2f3542"; // forecolor
        }
    },200)
}