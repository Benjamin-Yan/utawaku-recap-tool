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
        playerVars: { 'rel': 0, 'start': start[1], 'end': end[1]},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
});

function onPlayerReady(event) {
    event.target.playVideo();
}

var idx = 2;
function onPlayerStateChange(event) {
    if (idx === start.length) return;
    if (event.data == YT.PlayerState.ENDED) {
        player.loadVideoById({
            videoId: vidId,
            startSeconds: start[idx],
            endSeconds: end[idx++]
        });
    }
}

