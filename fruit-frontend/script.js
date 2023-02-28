require('dotenv').config();
const APIkey = process.env.APIKEY;
const fruitForm = document.querySelector('#inputSection form');
const fruitList = document.querySelector('#fruitSection ul');
const fruitNutrition = document.querySelector('#nutritionSection p');
const fruitIMG = document.querySelector('#fruitIMGSection img');
let calorieCount = 0

fruitForm.addEventListener('submit', extractFruit);

function extractFruit(e) {
    e.preventDefault();
    let fruitInput = e.target.fruitInput.value;
    if(fruitInput){
        fetchFruitData(fruitInput)
        fetchFruitDataIMG(fruitInput)
    }
    e.target.reset();
}

function addFruit(fruit) {
    //create list item and img to go with it
    const li = document.createElement('li');
    
    //assign text to list item
    li.textContent = fruit['name'];

    //add abliity to remove on click
    li.addEventListener('click', () => {
        li.remove();
        fruitNutrition.textContent = `Calorie count: ${calorieCount -= fruit.nutritions.calories}`;
    }, {once: true})

    //append list item to the HTML list and img
    fruitList.appendChild(li);

    //update calorie count with each item
    fruitNutrition.textContent = `Calorie count: ${calorieCount += fruit.nutritions.calories}`;
}
async function fetchFruitData(fruit){
    try {
        const resp = await fetch(`https://fruit-api-8axf.onrender.com/fruits/${fruit}`)
        if(resp.ok) {
            const data = await resp.json()
            addFruit(data)
        } else throw `Error: http status code = ${resp.status}`
    } catch {
        (e) => console.log(e)
    }
}

function addFruitIMG(fruit){
    fruitIMG.src = `${fruit.hits[0].previewURL}`
    fruitIMGSection.appendChild(fruitIMG);
}

async function fetchFruitDataIMG(fruit){
    try {
        const resp = await fetch(`https://pixabay.com/api/?q=fruits+${fruit}&key=${APIkey}`)
        if(resp.ok) {
            const data = await resp.json()
            addFruitIMG(data)
        } else throw `Error: http status code = ${resp.status}`
    } catch {
        (e) => console.log(e)
    }
}
