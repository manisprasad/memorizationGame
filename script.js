
const emojiArray = ["🌟", "🍎", "🍌", "🍒", "🍕", "🚀", "🎉", "🐱", "🐶", "🌈", "🎂", "🚲", "📚", "🍦", "🌸", "👓", "👑", "🔔"];
const currentArray = [];
const numberOfItems = 6;

// Function to generate a random number between min and max (inclusive)
const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to get unique random emojis
const getRandomEmojis = () => {
    while (currentArray.length < numberOfItems) {
        const randomIndex = randomNumber(0, emojiArray.length - 1);
        const randomEmoji = emojiArray[randomIndex];

        // Check if the random emoji is not already in the currentArray
        if (!currentArray.includes(randomEmoji)) {
            currentArray.push(randomEmoji);
        }
    }
};

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let index = array.length - 1; index > 0; index--) {
        const j = Math.floor(Math.random() * (index + 1));
        [array[index], array[j]] = [array[j], array[index]];
    }
};

// Shuffle and get emojis
getRandomEmojis();
shuffleArray(currentArray);

const emojiPair = [...currentArray, ...currentArray];
const allBoxes = document.querySelectorAll(".box");
const mainGame = document.getElementsByTagName("main")[0];
const moves = document.querySelector(".move");
const outOfMoves = document.querySelector(".out-of-move");
const timeTaken = document.querySelector(".timetaken");
const result = document.querySelector(".result");
const moveTaken = document.querySelector(".movetaken");
const resBtn = document.querySelector(".res-btn");

// Assign emojis to boxes
allBoxes.forEach((eachBox, ele) => {
    eachBox.innerText = emojiPair[ele];
});

//hinding the emoji after t second
let isClickProcessing = true;
setTimeout(()=>{
    allBoxes.forEach((eachBox)=>{
        eachBox.style.fontSize = "0rem";
        isClickProcessing = false;
    })
},4000)

document.addEventListener("DOMContentLoaded", function () {
    let angle = 0;
    let lastIndex = -1;
    let firstClick = "";
    let secondClick = "";
    let matchedIndexes = [];
    let startTime = 0;
    let firstTimeClick = 0;
    // let updatetime = 0;
    let endtime = 0;
    let move = 25;
 

    const handleBoxClick = (box, index) => {
        if (firstTimeClick == 0) {
            startTime = new Date();
            firstTimeClick = 2;
        }
        if (move<=0) {
            mainGame.style.filter = "blur(18px)";
            moveTaken.style.display = "none";
            timeTaken.style.display = "none";
            outOfMoves.style.display = "block";
            result.style.display = "flex";

        }

        if (isClickProcessing || matchedIndexes.includes(index)) {
            return;
        }
        console.log(move);
       isClickProcessing = true;

        if (firstClick !== "") {
            secondClick = box.innerText;
            if (firstClick === secondClick) {
                handleMatchedBoxes(box, index);
                move--;
                moves.innerText = `Moves left: ${move}`
            } else {
                handleMismatchedBoxes(box, index);
                move--;
                moves.innerText = `Moves left: ${move}`

            }
        } else {
            handleFirstClick(box, index);
            move--;
            moves.innerText = `Moves left: ${move}`

        }
    };

    const handleMatchedBoxes = (box, index) => {
        box.style.fontSize = "4rem";
        box.style.transform = "rotateY(180deg)";
        matchedIndexes.push(index);
        matchedIndexes.push(lastIndex);
        firstClick = "";
        isClickProcessing = false;

        if (matchedIndexes.length === allBoxes.length) {
          setTimeout(()=>{
            mainGame.style.filter = "blur(26px)";
            result.style.display = "flex";
            timeTaken.style.display = "block";
            moveTaken.style.display = "block";
            outOfMoves.style.display = "none";
            endtime = new Date();
            timeTaken.innerText = `Total Time : ${(endtime-startTime)/1000}s`;
            moveTaken.innerText = `Total move: ${25-move}`;
          },600)
            console.log("You won");
        }
    };

    const handleMismatchedBoxes = (box, index) => {
        box.style.fontSize = "4rem";
        box.style.transform = "rotateY(180deg)";
        setTimeout(() => {
            box.style.fontSize = "0rem";
            box.style.transform = "rotateY(0deg)";
            allBoxes[lastIndex].style.fontSize = "0rem";
            allBoxes[lastIndex].style.transform = "rotateY(0deg)";
            isClickProcessing = false;
        }, 400);
        firstClick = "";
    };

    const handleFirstClick = (box, index) => {
        firstClick = box.innerText;
        lastIndex = index;
        box.style.transform = `rotateY(${angle + 180}deg)`;
        box.style.fontSize = "4rem";
        isClickProcessing = false;
    };

    // Add click event listener to each box
    allBoxes.forEach((box, index) => {
        box.addEventListener("click", () => handleBoxClick(box, index));
    });
});


resBtn.addEventListener("click", () => {
    getRandomEmojis();
    shuffleArray(currentArray);

    // Update the inner text of each box with the shuffled emojis
    allBoxes.forEach((eachBox, ele) => {
        eachBox.innerText = emojiPair[ele];
    });

    // Reset any game state variables
    isClickProcessing = true;

    // Set a timeout to clear the boxes after a delay (4 seconds in this case)
    setTimeout(() => {
        allBoxes.forEach((eachBox) => {
            eachBox.style.fontSize = "0rem";
        });

        // Reset isClickProcessing after clearing the boxes
        isClickProcessing = false;

        // Simulate a click on the first box after resetting the game
        handleBoxClick(allBoxes[0], 0);
    }, 4000);
});
