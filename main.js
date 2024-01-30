const form = document.getElementById('myForm');
const inputs = document.getElementById('startTime');
const myList = document.getElementById('myList');
var start = [], end = [];

const urlForm = document.getElementById('urlForm');
const urlIn = document.getElementById('urlInput');
var vidId;

// Attach a submit event listener to the form
form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value from the input field
    const mfstartValue = inputs.value;
    const startAsString = String(mfstartValue);
    const csvArray = startAsString.split(',');

    var timelist = [];
    for (let i = 0; i < csvArray.length; i++) {
        const newItem = document.createElement('li');
        newItem.textContent = csvArray[i];
        myList.appendChild(newItem);
        //showTime(csvArray[i]);
        timelist.push(0, csvArray[i]);
    }
    [start, end] = getTime(timelist);

    // Clear the input field after submission
    inputs.value = '';
});

urlForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const url = urlIn.value;
    const urlSplit = url.split('=');
    vidId = urlSplit[urlSplit.length - 1];
    viewer();
});

