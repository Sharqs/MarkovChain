/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios')
const markov = require('./markov')

function file(path){
    let data = fs.readFileSync(path, 'utf8', function(err, data){
        if (err) {
            console.log("Error failed to read File.")
            process.exit(1)
        } else{
            console.log(`Printing contents of the ${data}`)
        }
    })
    return data
}

function url(url) {
    try {
      let data = axios.get(url)
        .then(response =>  response.data)
      return data
    } catch (err) {
      console.error(`Error fetching ${url}: ${err}`);
      process.exit(1);
    }
}
  
var path = process.argv[3]
var fn = process.argv[2]

async function splitter(max){
    let data
    if (fn === 'file') {
        data = file(path);
        let mm = new markov.MarkovMachine(data)
        console.log(mm.makeText(max))
    } else {
        data = await url(path);
        let mm = new markov.MarkovMachine(data)
        let text = mm.makeText(max)
        console.log(text +'**********'+ text.split(' ').length)
    }
}
splitter(1000)

