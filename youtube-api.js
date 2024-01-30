var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

goButton.addEventListener('click', function (event) {
    event.preventDefault();

    const url = urlIn.value;
    const urlSplit = url.split('=');
    vidId = urlSplit[urlSplit.length - 1];
    
    player = new YT.Player('player', {
        height: '350',
        width: '425',
        videoId: vidId, //'BNdtdkObSP0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
});

function onPlayerReady(event) {
    // 為確保瀏覽器上可以自動播放，要把影片調成靜音.mute().play
    event.target.playVideo();
}

var i = 0;
function onPlayerStateChange(event) {
    if (i === start.length) return;
    if (event.data == YT.PlayerState.ENDED) {
        player.loadVideoById({
            videoId: vidId,
            startSeconds: start[i],
            endSeconds: end[i++]
        });
    }
}

