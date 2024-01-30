const form = document.getElementById('timeForm');
const inputs = document.getElementById('startTime');
const timeList = document.getElementById('timeList');
var start = [], end = [];

form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    const inputValue = inputs.value;
    if (inputValue.trim() === '') {return;}

    const csvArray = (String(inputValue)).split(',');

    var timelist = [];
    for (let i = 0; i < csvArray.length; i++) {
        const newItem = document.createElement('li');
        newItem.textContent = csvArray[i];
        timeList.appendChild(newItem);
        timelist.push(0, csvArray[i]);
    }
    [start, end] = getTime(timelist);

    inputs.value = '';
});

