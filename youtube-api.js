function viewer() {
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '350',
            width: '425',
            videoId: vidId, //'BNdtdkObSP0',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
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
}

