const domainHeader = document.querySelector(".domain");
const wordSection = document.querySelector(".word");
const wordUnderlineSection = document.querySelector(".underline");
const keys = document.querySelectorAll(".key");
const guessesHeader = document.querySelector(".header");
const modal = document.querySelector(".modal");
const modalHeader = document.querySelector(".modalText");
const modalSolution = document.querySelector(".modalSolution");
const modalButton = document.querySelector("button");
let numberOfGuesses = 5;
let completeWordCheck = false;

fetch("/js/domains.json")
  .then((response) => response.json())
  .then((data) => {
    const randomDomainNumber = Math.floor(Math.random() * data.domain.length);
    const randomNumberOfTheDomainArray = Math.floor(Math.random() * 11);
    const randomDomain = data.domain[randomDomainNumber];
    let wordToGuess =
      data.domainArrays[randomDomain][randomNumberOfTheDomainArray];
    domainHeader.innerText = `Domain: ${randomDomain}`;
    console.log(wordToGuess);

    for (let i = 0; i < wordToGuess.length; i++) {
      const div = document.createElement("div");
      div.classList.add("wordDiv", "invisible");
      div.innerText = wordToGuess[i];
      wordSection.appendChild(div);
    }

    for (let i = 0; i < wordToGuess.length; i++) {
      const span = document.createElement("span");
      span.classList.add("wordSpan");
      wordUnderlineSection.appendChild(span);
    }

    const wordDiv = Array.from(document.querySelectorAll(".wordDiv"));

    keys.forEach((item) => {
      item.addEventListener("click", (e) => {
        const pressedKeyText = e.target.innerText.toLowerCase();
        const pressedKey = e.target;
        if (wordToGuess.includes(pressedKeyText)) {
          for (const letter of wordDiv) {
            if (letter.innerHTML === pressedKeyText) {
              letter.classList.remove("invisible");
              pressedKey.classList.add("disabledKey");
              pressedKey.classList.remove("hoverKey");
            }
          }
        } else {
          numberOfGuesses -= 1;
          guessesHeader.innerText = `Guesses remaining: ${numberOfGuesses}`;
        }
        if (numberOfGuesses === 0) {
          modal.style.visibility = "visible";
          modalSolution.innerText = `The word was: ${wordToGuess}`;
          modalButton.addEventListener("click", () => {
            modal.style.visibility = "hidden";
            window.location.reload();
          });
        }
      });
    });
    setInterval(() => {
      completeWordCheck = wordDiv.every((el) => el.classList.length == 1);
      console.log(completeWordCheck);
      if (completeWordCheck === true) {
        modal.style.visibility = "visible";
        modalHeader.innerHTML = "Congratulations!";
        modalSolution.innerHTML = "You guessed the word!";
        modalButton.addEventListener("click", () => {
          modal.style.visibility = "hidden";
          window.location.reload();
        });
      }
    }, 500);
  })
  .catch((e) => console.log(e));
