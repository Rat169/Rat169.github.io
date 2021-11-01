const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';

const timerElement = document.getElementById('timer')

const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startBtn = document.getElementById("start-game")
let startTime = null
let time = null

async function startGame() {
    startTime = null
    timer.innerText = '0'
    startBtn.classList.add("hidden")
    typingDiv.innerHTML = ""
    statsDiv.innerHTML = ""

    const text = await getRandomQuote()

    const characters = text.split("").map((char) => {
        const span = document.createElement("span")
        span.innerText = char
        typingDiv.appendChild(span)
        return span
    });

    let cursorIndex =0;
    let cursorCharacter = characters[cursorIndex]
    cursorCharacter.classList.add("cursor")

    const keydown = ({ key }) => {
        if (startTime === null) {
            startTime = new Date();
            startTimer()
        }
        if(key === cursorCharacter.innerText){
            cursorCharacter.classList.remove("cursor");
            cursorCharacter.classList.add("done");
            cursorCharacter = characters[++cursorIndex];
        }
        if (cursorIndex >= characters.length) {
            // game ended
            clearInterval(time);
            const seconds = getTimerTime();
            const numberOfWords = text.split(" ").length;
            const wps = numberOfWords / seconds;
            const wpm = wps * 60.0;
            document.getElementById("stats").innerText = `wpm = ${parseInt(wpm)}`;
            document.removeEventListener("keydown", keydown);
            startBtn.classList.remove("hidden");
            return;
          }
      
          cursorCharacter.classList.add("cursor");
    }
    document.addEventListener("keydown", keydown);
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
      .then(response => response.json())
      .then(data => data.content)
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



