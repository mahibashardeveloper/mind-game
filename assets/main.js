const cards = document.querySelectorAll(".inner-box-content");

let matched = 0;
let cardOne, cardTwo;
let unchecked = false;
let sound = false;

// function for sound effect ball sound

function ballSound(){
    let audio = $("#click-sound")[0];
    audio.play();
}

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !unchecked) {
        clickedCard.classList.add("flip");
        sound = true;
        ballSound()
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        unchecked = true;
        sound = true;
        ballSound()
        let cardOneImg = cardOne.querySelector(".back-image img").src,
            cardTwoImg = cardTwo.querySelector(".back-image img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched === 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return unchecked = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        unchecked = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    unchecked = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-image img");
        imgTag.src = `assets/images/gem-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
});