/**
 * Задание 4

Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.
 */

const resultNode = document.querySelector('.container-show-result');
const btnNode = document.querySelector('.btn-show-result');
let userInput = document.querySelectorAll('.input');
let userValues = [];

userInput.forEach(item => {
    item.addEventListener('input', event => {
        getUserValue();
        processUserValues();
    })
})

function processUserValues(a = userValues) {
    if (a.some((value) => { return value < 100 || value > 300; })) {
        document.querySelector('.container-show-result').innerHTML = `One of the numbers is out of range from 100 to 300. <br> Enter a valid number`;
        btnNode.style.display = 'none';
    }
    else {
        document.querySelector('.container-show-result').innerHTML = `Press Get`;
        btnNode.style.display = 'flex';
    }
};

function getUserValue() {
    userValues = [+userInput[0].value, +userInput[1].value];
    return userValues;
};

function displayResult(data) {
    let url = URL.createObjectURL(data);
    let image = `
    <img 
    src="${url}";
    class="image"/>`;
    resultNode.innerHTML = image;
}

btnNode.addEventListener('click', () => {
    fetch(`https://picsum.photos/${userValues[0]}/${userValues[1]}`)
        .then((response) => {
            const result = response.blob();
            return result;
        })
        .then((data) => {
            displayResult(data);
        })
        .catch(() => { console.log('error') });
});