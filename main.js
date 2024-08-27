// Define
const allInput = document.getElementsByTagName('input');
const allButton = document.getElementsByTagName('button');
const timeList = document.getElementById('timeList');

const regex = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;

let timelist = []; // allow continue typing until playback
let start = [], end = [], liItems = [];

// Main functions
function addTime(inputValue) {
    let csvArray = [];
    if (inputValue === '0') {csvArray = ['0:00'];}
    else {csvArray = inputValue.match(regex);}

    for (let i = 0; i < csvArray.length; i++) {
        const newItem = document.createElement('li');
        newItem.textContent = csvArray[i];
        timeList.appendChild(newItem);
        timelist.push(0, csvArray[i]);
    }
    [start, end] = getTime(timelist);
    liItems = timeList.querySelectorAll('li'); // 此時才取得到 li 元素

    allInput[0].value = '';
}

function loadExample() {
    allInput[0].value = "0:40,5:26,9:45,14:03,19:00";
    while (timeList.firstChild) {
        timeList.removeChild(timeList.firstChild); // 刪除之前填寫的 li tag if have
    }
    timelist = [];
    allButton[0].click();

    allInput[1].value = "https://www.youtube.com/watch?v=wM6gy5VZ6NI";
    allButton[2].click();
}

// Button trigger
allButton[0].addEventListener('click', function() {
    const inputValue = allInput[0].value;
    if (inputValue.trim() === '') {alert("請先輸入時間!");return;}
    addTime(inputValue);
});

allButton[3].addEventListener('click', function() {
    window.location.reload();
});

allButton[4].addEventListener('click', function() {
    loadExample();
});

