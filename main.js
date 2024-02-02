const form = document.getElementById('timeForm');
const inputs = document.getElementById('startTime');
const timeList = document.getElementById('timeList');
const loadExample = document.getElementById('loadExample');
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

loadExample.addEventListener('click', function() {
    inputs.value = "0:40,5:26,9:45,14:03,19:00";
    form.submit();
    startTimer(1); // sleep one second
    urlIn.value = "https://www.youtube.com/watch?v=wM6gy5VZ6NI";
    goButton.click();
});

