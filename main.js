let rand = function(arg) {
  return arg[parseInt(Math.random() * arg.length)]
}
let segmets = ["blue", "blue","pink", "red"]


// Starting The Game
let startOverlay = document.querySelector(".startOverlay");

startOverlay.firstElementChild.addEventListener("click", function() {
  startOverlay.remove()
  document.querySelector(".overlay").remove()
  timer();main()
})

// The Timer Of The Game
let timerSecs = document.querySelector(".timer .secs");
let timerMints = document.querySelector(".timer .mints");
let secs = 0;
let mints = 0;

function timer(stop) {

  
  let counter = setInterval(function() {
    secs += 1
    timerSecs.innerHTML = secs
    if (secs == 60) {
      secs = 0
      timerMints.innerHTML = `${mints += 1}`

    }
    
  }, 1000)
  if (stop == true) {
    clearInterval(counter);
    return `Time was <strong>${secs}</strong> Seconds and <strong>${mints}</strong> Minutes `
  }
}



//The Main Game Func
let background;
let currSeg = document.querySelector(".currSegmet")
let catchBtn = document.querySelector(".catch")
let shyBtn = document.querySelector(".shy")
let scoreElement = document.querySelector(".score")
let segmetsContainer = document.querySelector(".segmetsContainer")
let score = 0;


function main() {
  
  background = rand(segmets);
  currSeg.style.background = background;
  if (background == "blue") {
    currSeg.style.background = background;
    catchBtn.onclick = function() {
      score += 5;
      scoreElement.innerHTML = score;
      let segmet = document.createElement("div")
      segmet.classList.add("segmet")
      segmet.style.background = background
      segmetsContainer.appendChild(segmet)
      main();
    }
  } else if (background == "red") {

    catchBtn.onclick = function() {
      document.querySelectorAll(".segmet").forEach((ele) => {
        ele.remove()
        
      })
      
      score = 0;
      scoreElement.innerHTML = score;
      main();
    }


  } else if (background == "pink") {

    catchBtn.onclick = function() {
      if (score == 0) {
        score = 0;
        currSeg.style.background = background;
        scoreElement.innerHTML = score;

      } else {
        score -= 5;
        currSeg.style.background = background;
        scoreElement.innerHTML = score
        if (segmetsContainer.children.length > 1) {
          document.querySelectorAll(".segmet")[0].remove();
        }
      }

      main();

    }

  }
  
  // Winning situation
  if(score == 100){
    document.body.innerHTML = `<h1 style="text-align:center;">You Won</h1> <div>${timer(true)}</div> <button class="playAgain btn" style="display: block;margin: auto;">Play again</button>`
    document.querySelector(".playAgain").onclick = () => location.reload();
  }
}

shyBtn.onclick = function() {
  main();
}

main();


// styling

document.querySelectorAll(".box span").forEach((e) => {
  e.style.color = `${e.textContent}`
  e.style.background = `${e.getAttribute("color")}`
})
