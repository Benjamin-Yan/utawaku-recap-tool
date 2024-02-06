const goButton = document.getElementById('goBut');
const urlIn = document.getElementById('urlInput');
const submitButton = document.getElementById('submitButton');
const nextBtn = document.getElementById('nextBtn');
var vidId, tmperr;
var startTime, executionTime, endTime;

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

goButton.addEventListener('click', function (event) {
    event.preventDefault();

    const url = urlIn.value;
    if (url.trim() === '') {return;}
    if (start.length === 0) {alert("請先輸入時間!");}

    const urlRegex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;
    vidId = ( url.match(urlRegex) )[1];

    fetch(`https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${vidId}&format=json`)
        .then(res => res.json())
        .then(data => {
            tmperr = data.title;
            const titleRegex = /【([^【】]+)】/g;
            tmperr = tmperr.replace(titleRegex, '');
            setTxt();
        })
        .catch(error => {
            console.log("取得title發生錯誤");
            tmperr = "發生錯誤";
        });

    inputs.readOnly = true; // block time input
    urlIn.value = `Id = ${vidId}`;
    urlIn.readOnly = true; // block url input
    goButton.disabled = true;
    submitButton.disabled = true;
    loadExample.disabled = true;
    nextBtn.disabled = false;
    
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
});

var time;
function onPlayerReady(event) {
    time = player.getDuration();
    event.target.playVideo();
}

var idx = 2;
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
        nextBtn.disabled = true;
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

function setTxt() {
    if (tmperr !== "發生錯誤") {urlIn.value = tmperr;}
}

