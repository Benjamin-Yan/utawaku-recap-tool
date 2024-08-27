// Define
let vidId, tmperr;
let time, startTime, executionTime, endTime;

const urlRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;
const titleRegex = /【([^【】]+)】/g;

// Youtube api
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// Main functions
function loadVideo(url) {
    vidId = ( url.match(urlRegex) )[1];

    fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${vidId}&format=json`)
        .then(r => r.json())
        .then(data => {
            tmperr = data.title;
            tmperr = tmperr.replace(titleRegex, '');
            allInput[1].value = tmperr;
        })
        .catch(error => {
            console.log("取得title發生錯誤: "+error);
        });

    allInput[0].readOnly = true;
    allInput[1].readOnly = true;
    allInput[1].value = `Id = ${vidId}`; // temp placeholder until title loaded
    allButton[0].disabled = true;
    allButton[1].disabled = false;
    allButton[2].disabled = true;
    allButton[4].disabled = true;
    
    changeLiColor(1);
    executionTime = 0; // initial
    startTime = performance.now();
    player = new YT.Player('player', {
        videoId: vidId, // eg: 'BNdtdkObSP0'
        playerVars: { 'rel': 0, 'controls': 0, 'disablekb': 1, 'start': start[1], 'end': end[1]},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    time = player.getDuration();
    event.target.playVideo();
}

let idx = 2;
let isPlayerPaused = false;
function onPlayerStateChange(event) {
    if (idx === start.length && event.data == YT.PlayerState.ENDED) {
        endTime = performance.now();
        executionTime += Math.floor( (endTime - startTime) / 1000 ); // 轉成秒
        const ratio = parseFloat( ((time-executionTime) / time * 100 ).toFixed(2));
        
        const formattedtime = formatTime(time);
        const formattedexet = formatTime(executionTime);

        document.getElementById('info').innerHTML = `影片長度: ${formattedtime};&nbsp;實際聆聽時長: ${formattedexet}<br/>共省下了 ${ratio}% 的時間`;
        changeLiColor(idx);
        allButton[1].disabled = true;
        return;
    }
    if (event.data == YT.PlayerState.ENDED) {
        changeLiColor(idx);
        player.loadVideoById({
            videoId: vidId,
            startSeconds: start[idx],
            endSeconds: end[idx++]
        });
    }
    
    if (event.data == YT.PlayerState.PAUSED) {
        endTime = performance.now(); // temp stop
        executionTime += Math.floor( (endTime - startTime) / 1000 );
        isPlayerPaused = true;
    }
    if (isPlayerPaused && event.data == YT.PlayerState.PLAYING) {
        startTime = performance.now(); // restart
        isPlayerPaused = false;
    }
}

function setNext() {
    const tmptme = end[idx-1]-1;
    player.seekTo(tmptme);
}

// Button trigger
allButton[1].addEventListener('click', function() {
    setNext();
});

allButton[2].addEventListener('click', function() {
    const url = allInput[1].value;
    if (url.trim() === '') {alert("請先輸入網址!");return;}
    if (start.length === 0) {alert("請先輸入時間!");return;}
    document.getElementById("player").style.width = '100%';
    loadVideo(url);
});

