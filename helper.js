/* getTime([0, 10, 0, 30, 0, 70])
    return: `[ [0, 10, 0, 30, 0, 70], [0, 15, 0, 35, 0, 75] ]`
*/
function getTime(list) {
    var totalSeconds = 0;
    var allTimex = [], allTimey = [];
    for (var i = 0; i < list.length; i++) {
        if(list[i] === 0) {
            allTimex.push(0);
            allTimey.push(0);
        } else {
            const timeParts = list[i].split(':').map(str => parseInt(str, 10));
            const [hours, minutes, seconds] = timeParts.length === 3 ? timeParts : [0, ...timeParts];
            totalSeconds = hours * 3600 + minutes * 60 + seconds;

            allTimex.push(totalSeconds);
            allTimey.push(totalSeconds + 240);
        }
    }
    return [allTimex, allTimey];
}

function formatTime(secs) {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
  
    let formattedTime = '';
  
    if (hours > 0) {
      formattedTime += `${hours}小時, `;
    }
  
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes}分鐘, `;
    }
  
    formattedTime += `${seconds}秒`;
  
    return formattedTime;
}

const addiText = ' -> now playing 🎵';
function changeLiColor(index) {
    index = Math.floor(index / 2);
    var curr = liItems[index], prev = liItems[index-1];
    
    if (index < liItems.length) {
        curr.style.color = '#663399';
        curr.textContent = curr.textContent.includes(addiText) ? curr.textContent : curr.textContent + addiText;
    }

    if (index !== 0) { // change back
        prev.style.color = 'black';
        if (prev.textContent.includes(addiText)) {prev.textContent = prev.textContent.replace(/ -> now playing 🎵/g, '');}
    }
}

