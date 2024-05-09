let container = document.querySelector(".container");
let gridSizeText = document.querySelector("h3");
let slider = document.querySelector("input");
let submit = document.querySelector("button");

slider.addEventListener("input", (e) => {
    gridSizeText.innerText = `${slider.value}x${slider.value}`;
});

submit.addEventListener("pointerdown", () => {
    container.innerHTML = '';
    createGrid(slider.value);
});

function createGrid(userInput=16) {
    for (let i = 0; i < userInput; i++)
        for (let j = 0; j < userInput; j++)
        {
            let newDiv = document.createElement("div");
            newDiv.style.width = `${(1 / userInput) * 100}%`;
            newDiv.style.height = `${(1 / userInput) * 100}%`;

            newDiv.addEventListener("mouseover", () => {
                newDiv.style.backgroundColor = 'black';
            });

            container.appendChild(newDiv); 
        }

}

createGrid();
