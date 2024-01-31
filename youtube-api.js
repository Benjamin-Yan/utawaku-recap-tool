const goButton = document.getElementById('goBut');
const urlIn = document.getElementById('urlInput');
var vidId;
var startTime, executionTime;

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

goButton.addEventListener('click', function (event) {
    event.preventDefault();

    const url = urlIn.value;
    if (url.trim() === '') {return;}

    const urlSplit = url.split('=');
    vidId = urlSplit[urlSplit.length - 1];
    urlIn.value = '';
    
    startTime = performance.now();
    player = new YT.Player('player', {
        videoId: vidId, // eg: 'BNdtdkObSP0'
        playerVars: { 'rel': 0, 'start': start[1], 'end': end[1]},
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
function onPlayerStateChange(event) {
    if (idx === start.length) {
        const endTime = performance.now();
        executionTime = (endTime - startTime) / 1000; // 轉成秒
        const ratio = (time-executionTime) / time * 100;

        const formattedtime = formatTime(time);
        const formattedexet = formatTime(executionTime);

        document.getElementById('info').innerHTML = `影片長度: ${formattedtime}&nbsp;實際聆聽時長: ${formattedexet}<br/>共省下了 ${ratio}% 的時間`;
        return;
    }
    if (event.data == YT.PlayerState.ENDED) {
        player.loadVideoById({
            videoId: vidId,
            startSeconds: start[idx],
            endSeconds: end[idx++]
        });
    }
}

