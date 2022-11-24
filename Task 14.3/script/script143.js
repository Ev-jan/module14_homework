
const resultNode = document.querySelector('.container-show-result');
const btnNode = document.querySelector('.btn-show-result');
function getUserValue() {
    let userValue = (document.getElementById("user-input").value);
    if (userValue < 1 || userValue > 10) {
        document.querySelector('.container-show-result').innerHTML = `${userValue} <br> is out of range. <br> Enter a valid number`;
        btnNode.style.display = 'none';
    }
    else {
        document.querySelector('.container-show-result').innerHTML = `Press Get`;
        btnNode.style.display = 'flex';
        function useRequest(URL, callback) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', URL, true);

            xhr.onload = function () {
                if (xhr.status != 200) {
                    document.querySelector('.container-show-result').innerHTML = `Response status: ${xhr.status}`;
                }
                else {
                    const result = JSON.parse(xhr.response);
                    if (callback) {
                        callback(result);
                    }
                }
            }
            xhr.onerror = function () {
                document.querySelector('.container-show-result').innerHTML = `Error! Response status: ${xhr.status}`;
            };

            xhr.send();
        };

        function displayResult(apiData) {
            let cards = ' ';
            apiData.forEach(item => {
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
            useRequest(`https://picsum.photos/v2/list/?limit=${userValue}`, displayResult);
        });
    }

}