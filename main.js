const form = document.getElementById('timeForm');
const inputs = document.getElementById('startTime');
const timeList = document.getElementById('timeList');
var start = [], end = [], liItems = [];
var timelist = []; // allow continue typing until playback

form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    const inputValue = inputs.value;
    if (inputValue.trim() === '') {return;}

    const regex = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/g;
    const csvArray = inputValue.match(regex);

    for (let i = 0; i < csvArray.length; i++) {
        const newItem = document.createElement('li');
        newItem.textContent = csvArray[i];
        timeList.appendChild(newItem);
        timelist.push(0, csvArray[i]);
    }
    [start, end] = getTime(timelist);
    liItems = document.querySelectorAll('li'); // 此時才取得到 li 元素

    inputs.value = '';
});

