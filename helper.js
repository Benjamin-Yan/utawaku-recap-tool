/* getTime([0, 10, 0, 30, 0, 70])
    return: `[ [0, 10, 0, 30, 0, 70], [0, 15, 0, 35, 0, 75] ]`
*/
var totalSeconds = 0;
var allTimex = [], allTimey = [];

function getTime(list) {
    for (var i = 0; i < list.length; i++) {
        if(list[i] === 0) {
            allTimex.push(0);
            allTimey.push(0);
        } else {
            const timeParts = list[i].split(':').map(str => parseInt(str, 10));
            const [hours, minutes, seconds] = timeParts.length === 3 ? timeParts : [0, ...timeParts];
            totalSeconds = hours * 3600 + minutes * 60 + seconds;

            allTimex.push(totalSeconds);
            allTimey.push(totalSeconds + 270);
        }
    }
    return [allTimex, allTimey];
}

