const cardNumberInput = document.getElementById('cardNumber');

cardNumberInput.addEventListener('input', formatCardNumber);

function formatCardNumber(event) {
    let input = event.target.value.replace(/\D/g, '');
    const cardNumberRegex = /(\d{4})(?=\d)/g;
    input = input.replace(cardNumberRegex, '$1 ');

    event.target.value = input;
}


const expirationDateInput = document.getElementById('expirationDate');

expirationDateInput.addEventListener('input', formatExpirationDate);

function formatExpirationDate(event) {
    let input = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (input.length > 2) {
        const month = input.slice(0, 2);
        const year = input.slice(2);
        input = `${month}/${year}`;
    }

    event.target.value = input;
}

const cvv = document.getElementById('cvv');
cvv.addEventListener('input', formatCvv);

function formatCvv(event){
    event.target.value = event.target.value.replace(/\D/g, '');
}

const table = document.getElementById('table');
table.addEventListener('input', formatTable);

function formatTable(event){
    event.target.value = event.target.value.replace(/\D/g, '');
}

const div = document.getElementById('order-type');
const dropDown = document.querySelector('.order-type-d');
const select = document.querySelector('.order-type-dropdown');
const customFuck = document.querySelector('.custom--fuck')

customFuck.addEventListener('click', showDropDown);
function showDropDown() {
    select.classList.toggle('active');
    div.classList.toggle('oder__type-dropdown');
}

window.onclick = function (e) {
    if (!e.target.matches('.order-type-d')) {
        select.style.display = 'none';
        div.classList.remove('oder__type-dropdown');
    }
}



const tabItem = document.querySelectorAll('.order-type-dropdown p');
const value = document.querySelector('.order-type-d');

tabItem.forEach(function (element){
    element.addEventListener('click' , giveValue);
})

function giveValue(evt){
    let data = value.textContent;
    const tabTarget = evt.currentTarget;

    value.textContent = tabTarget.textContent;
    tabTarget.textContent = data;
    div.classList.remove('oder__type-dropdown');
    select.classList.remove('active');
}


const methods = document.querySelectorAll('.method');

methods.forEach(function (element){
    element.addEventListener('click' , methodActivate);
})


function methodActivate(evt){
    const current = evt.currentTarget;
    methods.forEach(function (element){
        element.children[0].style.display = 'none';
        element.classList.remove('active-method');
    })

    current.classList.add('active-method');
    current.children[0].style.display = 'block';
}