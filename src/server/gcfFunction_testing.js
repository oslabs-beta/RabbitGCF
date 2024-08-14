const rabbitFunctions = ['addCharacter', 'getSpecies', 'deleteCharacter', 'getHomeworld', 'getFilm', 'getCharacters', 'updateCharacters'];

function invoke () {
  console.log('=========== Invocations STARTED ===========')
  const invocations = Math.floor(Math.random() * 30) + 20;
  console.log(`Total invocations to fire: ${invocations}`);
  let count = 0;
  const repeat = setInterval(() => {
    if(count === invocations) {
      clearInterval(repeat);
      console.log('=========== Invocations COMPLETED ===========');
    }
    for (const gcfFunc of rabbitFunctions){
    // fetch('https://us-central1-refined-engine-424416-p7.cloudfunctions.net/getCharacters');
      fetch(`https://us-central1-refined-engine-424416-p7.cloudfunctions.net/${gcfFunc}`)
        // .then(response => console.log(gcfFunc, response.ok));
    }
      
    count++;
  }, 1000)
  
  return;
}

invoke();

// process.stdout.write("\r");
// console.log('test');
// process.stdout.write("\n");