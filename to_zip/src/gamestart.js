const wordState = document.querySelector("#word-state")
const attemptList = document.querySelector("#attempt-list")
var word = "RAPAIZ"
var attempts = []
var revealIndex = []
var errorCounter = 0

// startGame()
// setupRevealIndex()
// updateWordState()
// setupAttemptList()

async function generateWord() {
    let wordset, newword = ""
    var wordsetLen

    newword = await fetch("https://raw.githubusercontent.com/marzelop/forca/main/wordbase.json")
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            wordset = data.words
            wordsetLen = data.words.length
            do {
                randNum = Math.floor(Math.random() * (wordsetLen + 1))
                newword = wordset[randNum]
                console.log(newword)
            } while (newword.length < 5)
            
            return newword
        })
    console.log(newword)
    return await newword
}

function updateWordState() {
    let i
    wordState.innerHTML = ""
    for (i = 0; i < word.length; i++) {
        if (revealIndex[i]) {
            wordState.innerHTML += `<div class="letter-display"><div class="letter">${word[i]}</div></div>`
            continue
        }
        wordState.innerHTML += `<div class="letter-display"><div class="letter"></div></div>`
    }
}

function setupAttemptList() {
    attempts = []
    attemptList.innerHTML = ""
}

function setupRevealIndex() {
    let i
    console.log(word)
    revealIndex = []
    for (i = 0; i < word.length; i++) {
        revealIndex.push(0)
    }
}

async function startGame() {
    word = await generateWord()
    errorCounter = 0
    document.querySelector("#display-lives").src = "./img/game/hangman0.png"
    console.log(word)
    document.querySelector("#keyboard").style.display = "flex"
    setupRevealIndex()
    setupAttemptList()
    updateWordState()
}
