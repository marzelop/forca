function addError() {
    errorCounter += 1
    if (errorCounter >= 6) {
        document.querySelector("#display-lives").src = `./img/game/hangman_dead.png`
        endGame(0)
        return
    }
    document.querySelector("#display-lives").src = `./img/game/hangman${errorCounter}.png`
}

function addAttempt(key) {
    attempts.push(key)
    attemptList.innerHTML += `<li>${key}</li>`
}

function checkWin() {
    let i
    for (i = 0; i < revealIndex.length; i++) {
        if (!revealIndex[i]) { return false }
    }
    return true
}

function sendInput(key) {
    let i, keyInWord = false  
    key = key.toUpperCase()
    for (i = 0; i < attempts.length; i++)
        if (key == attempts[i]) {
            alert("Key already pressed. Try another key.")
            return false
        }
    for (i = 0; i < word.length; i++) {
        if (key === word[i]) {
            revealIndex[i] = 1
            keyInWord = true
        }
    }
    updateWordState()
    addAttempt(key)
    if (checkWin()) {
        endGame(1)
    }
    if (!keyInWord) {
        addError()
    }
}

function endGame(result) {
    let i
    document.querySelector("#keyboard").style.display = "none"
    if (result) {
        document.querySelector("#game-result").innerHTML = `<h1 style="background-color: #49ff29;">You Won!</h1>
        <input type="button" value="Restart Game" onclick="startGame()">`
    }
    else {
        document.querySelector("#game-result").innerHTML = `<h1 style="background-color: #FF2D29;">You Lost!</h1>
        <input type="button" value="Restart Game" onclick="startGame()">`
    }
    for (i = 0; i < revealIndex.length; i++) {
        revealIndex[i] = 1
    }
    updateWordState()
}