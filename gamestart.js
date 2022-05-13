const wordState = document.querySelector("#word-state")
const attemptList = document.querySelector("#attempt-list")

console.log(generateWord())

function generateWord() {
    let wordset, word = ""
    fetch("https://raw.githubusercontent.com/marzelop/forca/main/wordbase.json")
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            wordset = data
            console.log(typeof(wordset))
            console.log(wordset)
        })
    
    while (word.length < 5) {
        word = wordset[Math.floor(Math.random() * (Object.values(wordset.length).length + 1))]
    }
    return word
}