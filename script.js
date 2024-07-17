let rate1 = document.querySelector('.rate1');
let rate2 = document.querySelector('.rate2');
let result = document.querySelector('.result');
let selects = document.querySelectorAll('.options select');
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll('.input input');
let inpt1 = inputs[0];
let inpt2 = inputs[1];

let rates = {};

let requestURL = "https://api.exchangerate-api.com/v4/latest/USD";

async function fetchRates() {
    let res = await fetch(requestURL);
    res = await res.json();
    console.log(res); 
    if (res && res.rates) {
        rates = res.rates;
        populateOptions();
    } else {
        console.error("Failed to fetch rates", res);
    }
}

function populateOptions() {
    let val = "";
    Object.keys(rates).forEach(code => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach((s) => (s.innerHTML = val));
    console.log("Options populated", val); 
}

function convertCurrency() {
    let amount1 = parseFloat(inpt1.value);
    let currency1 = sel1.value;
    let currency2 = sel2.value;

    if (isNaN(amount1) || amount1 <= 0) {
        alert("กรุณาใส่จำนวนเงินที่ถูกต้อง");
        return;
    }

    let convertedAmount = (amount1 / rates[currency1]) * rates[currency2];
    inpt2.value = convertedAmount.toFixed(2);

    rate1.innerHTML = `1 ${currency1} = ${(1 / rates[currency1]).toFixed(4)} USD`;
    rate2.innerHTML = `1 ${currency2} = ${(rates[currency2]).toFixed(4)} USD`;
}

function swapCurrencies() {
    let temp = sel1.value;
    sel1.value = sel2.value;
    sel2.value = temp;
    convertCurrency();
}

fetchRates();
