/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let result = {}
    for (let i = 0; i<this.words.length; i++){
      if (result[this.words[i]]){
        result[this.words[i]].push(this.words[i+1])
      }
      else
        result[this.words[i]] = [this.words[i+1]]
    }
    this.result = result
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let wordGen = []
    function random(max){
      return Math.floor(Math.random() * (max + 1))
    }
    let resultLength = Object.keys(this.result).length-1
    let resultKeys = Object.keys(this.result)
    wordGen.push(resultKeys[random(resultLength)])
    for (let i = 0; i<numWords-1; i++){
      let lastWord = this.result[wordGen[i]]
      let ran = random(lastWord.length-1)
      if (lastWord[ran] === undefined){
        wordGen.push('.')
        break
      }
      wordGen.push(lastWord[ran])
    }
    return wordGen.join(' ')
  }
}

module.exports = {
  MarkovMachine
}