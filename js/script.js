let container = document.querySelector(".container");

for (let i = 0; i < 16; i++)
{
    for (let j = 0; j < 16; j++)
    {
        let newDiv = document.createElement("div");
        newDiv.style.width = `${(1 / 16) * 100}%`;
        newDiv.style.height = `${(1 / 16) * 100}%`;
        newDiv.innerText = `${j+1}`; // for debugging

        newDiv.addEventListener("mouseover", () => {
            newDiv.style.backgroundColor = 'black';
        });

        container.appendChild(newDiv); 
    }
    
}