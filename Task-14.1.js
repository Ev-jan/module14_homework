/*Задание 1

Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать XML 
в JS-объект и выводить его в консоль.*/

//Создаем экземпляр класса DOMParser, который позволит на парсить XML
const parser  = new DOMParser();
const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`

// Этап 2. Получение данных

const xmlDom = parser.parseFromString(xmlString, 'text/xml');
// Получение всех DOM-нод
const students = xmlDom.querySelectorAll('student');
let result = [];
let object = {list: result}

students.forEach(node => {
  let student = {
    name: `${node.querySelector("first").textContent} ${node.querySelector('second').textContent}`,
    age: node.querySelector('age').textContent,
    profession: node.querySelector("prof").textContent,
    lang: node.querySelector("name").getAttribute("lang")
  }
   result.push(student); 

})
console.log(object)