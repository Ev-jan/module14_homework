const resultNode = document.querySelector('.container-show-result');
const btnNode = document.querySelector('.btn-show-result');
const form = document.getElementById('myForm');
let num1 = null;
let num2 = null;
let myFormData;
let mySearchParams = new URLSearchParams(myFormData);
let queryString = mySearchParams.toString();

function getUserValue() {
    num1 = document.querySelector('#num1').value;
    num2 = document.querySelector('#num2').value;
    myFormData = new FormData(form);
};

function processValue(a, b) {
    if ((a < 1 || a > 10) && (b < 1 || b > 10)) {
        document.getElementById('label_1').textContent = `Page number is out of range`;
        document.getElementById('label_2').textContent = `Limit is out of range`;
        btnNode.style.display = 'none';
        document.querySelector('.container-show-result').innerHTML = ` `;
    }
    else if ((a < 1 || a > 10) && (b >= 1 && b <= 10)) {
        document.getElementById('label_1').textContent = `Page number is out of range`;
        document.getElementById('label_2').textContent = `Limit is OK`;
        btnNode.style.display = 'none';
        document.querySelector('.container-show-result').innerHTML = ` `;
    }
    else if ((b < 1 || b > 10) && (a >= 1 && a <= 10)) {
        document.getElementById('label_1').textContent = `Page number is OK`;
        document.getElementById('label_2').textContent = `Limit is out of range`;
        btnNode.style.display = 'none';
        document.querySelector('.container-show-result').innerHTML = ` `;
    }
    else {
        document.getElementById('label_1').textContent = "Page number is ok";
        document.getElementById('label_2').textContent = `Limit is OK`;
        document.querySelector('.container-show-result').innerHTML = `Click <br>  Request`;
        btnNode.style.display = 'flex';
    }
};

form.addEventListener('input', event => {
    getUserValue();
    processValue(num1, num2);
    localStorage.clear();
})

function displayResult(result) {
    let cards = ' ';
    result.forEach(item => {
        let cardBlock = `
        <div class="card">
            <img 
            src="${item.download_url}"
            class="card-image"
            />
            <p 
            style="font-size: 12px">
            ${item.author}</p>
        </div>
        `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
    const myJSON = localStorage.getItem('myJSON');
    if (myJSON) {
        displayResult(JSON.parse(myJSON));
    } else {
        const params = new URLSearchParams(myFormData).toString();
        fetch(`https://picsum.photos/v2/list?${params}`)
            .then((response) => {
                const result = response.json();
                console.log('response', result);
                return result;
            })
            .then((result) => {
                displayResult(result);
                localStorage.setItem('myJSON', JSON.stringify(result));
            })
            .catch(() => { console.log('error') });
    }
});



