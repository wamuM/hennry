import jokes from "./jokes.js"

const p = document.getElementById("hennry_puns")
function sayRandomJoke(category,meta ={}){
  
  let joke = jokes[category][randomInt(0,jokes[category].length)]
  joke = joke.replaceAll("[", "<b>")
  joke = joke.replaceAll("]", "</b>")
  joke = joke.replaceAll("$hp$",meta?.hp) 
  joke = joke.replaceAll("$name$",localStorage.getItem("name")) 
  console.log(`karen.js :: ${category} type joke summoned as:\n${joke}`)
  p.innerHTML = joke
  p.style.display = "block"
  setTimeout(()=>{p.style.display = "none"},joke.split(" ")*200)
}

/**
 * This function gives back a random int
 * @param {Number} min The minimal number (included)
 * @param {*} max The maximal number (excluded)
 * @returns the random int
 */
function randomInt(min,max){
  let dznts =Math.floor(Math.random()*(max-min))+min;
  return dznts
}

export {sayRandomJoke as sayRandomJoke, randomInt as randomInt}


// "string".replaceAll([])

//   p.innerHtml = ""
//   jokes[category]
//   randomInt(0,jokes[category].length)


//TODO:
// - replace [ with <b>
// - replace ] with </b>
// - replace $hp$ with meta.hp 
// - replace ... with ... 