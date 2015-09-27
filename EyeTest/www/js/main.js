
function onLoad() {
    if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }
    // document.addEventListener('backbutton', onBackKeyDown, false);
}
/*Function onBackKeyDown*/
function onBackKeyDown(event) {
    // Handle the back button
    event.preventDefault();
    
}
var initApp = function() {
    doLoginGPlus();
    adbuddiz.setAndroidPublisherKey("79e8e169-47a3-4ae8-bbb3-2406e851fa82");
    // adbuddiz.setIOSPublisherKey("TEST_PUBLISHER_KEY_IOS");
    adbuddiz.cacheAds();
};
function resetLayout() {
    var container = $('.eyetest-container');
    var highScore = localStorage.getItem("PK-EyeTest-HighScore") || 0;
    $('.time-count', container).text(TIME);
    $('.high-score-count', container).text(highScore);
    $('.score-count', container).text(SCORE);
    $('.error-count', container).text(ERRORS);

}
$(function () {
    var countPlaying = 0;
    var eyetest = new EyeTest();
    eyetest.init($('.eyetest-container'));
    resetLayout();

    $('.leaderboard-game').click(function(e) {
        googleplaygame.showLeaderboard({
            leaderboardId: leaderboardId
        });
    });
    $('.achievement-game').click(function(e) {
        googleplaygame.showAchievements();
    });
    $('.share-game').click(function(e) {
        sharePhoto();
    });

    $('.rate-game').on('click', function(e) {
        // Find device platform using the plugin org.apache.cordova.device
        var devicePlatform = cordova.platformId;
        // Check which platform
        if (devicePlatform == "iOS") {
            // window.open('https://itunes.apple.com/us/app/YOUR-APP-SLUG-HERE/id000000000?mt=8&uo=4'); // or itms://
        } else if (devicePlatform == "android") {
            window.open('market://details?id=puka.eyetest.com', '_system');
        } else if (devicePlatform == "BlackBerry"){
            // window.open('http://appworld.blackberry.com/webstore/content/<applicationid>');
        }
    });
    // $('.start-game').click(function(e) {
    //                 $('.game-over').hide();
    //                 eyetest.start();
    //             });
$('.start-game')[0].addEventListener("touchstart", function(e) {

    resetLayout();
    $('.game-over').hide();
    countPlaying ++;
    eyetest.start();
}, false);
setInterval(function() {
    if (eyetest.isFinished && countPlaying % 2 == 0) {
        adbuddiz.showAd();
        eyetest.isFinished = false;
    }
}, 200);
});