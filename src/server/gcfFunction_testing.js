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
    fetch('https://us-central1-refined-engine-424416-p7.cloudfunctions.net/getCharacters');
      // .then(response => console.log(response.ok));
    count++;
  }, 1000)
  
  return;
}

invoke();

// process.stdout.write("\r");
// console.log('test');
// process.stdout.write("\n");