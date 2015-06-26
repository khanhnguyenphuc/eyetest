var arrAchivement = ['CgkI4PqEk5ACEAIQBQ','CgkI4PqEk5ACEAIQBg', 'CgkI4PqEk5ACEAIQBw', 'CgkI4PqEk5ACEAIQCA', 'CgkI4PqEk5ACEAIQCQ', 'CgkI4PqEk5ACEAIQCw'];
var leaderboardId = 'CgkI4PqEk5ACEAIQAQ';
var successfullyLoggedIn = function (cb) {
    //successfullyLoggedIn
    if (cb) cb();
};
var failedLoggedIn = function() {
};

var doLoginGPlus = function(cb) {
    googleplaygame.auth(function() {
        successfullyLoggedIn(cb);
    }, failedLoggedIn);
};
var submitScore = function() {
    var doSubmit = function() {
        var highScore = localStorage.getItem("PK-EyeTest-HighScore") ? localStorage.getItem("PK-EyeTest-HighScore") : 0;
        var data = {
            score: highScore,
            leaderboardId: leaderboardId
        };
        googleplaygame.submitScore(data);
    };
    doLoginGPlus(doSubmit);
};
var submitAchivement = function() {
    var doSubmit = function() {
        var highScore = localStorage.getItem("PK-EyeTest-HighScore") ? localStorage.getItem("PK-EyeTest-HighScore") : 0;
        var num = Math.floor(highScore / 20);
        var data = {};
        if (highScore >=5) {
            data = {
                achievementId: arrAchivement[0],
                numSteps: highScore
            };
            googleplaygame.incrementAchievement(data);
        }
        if (num > 0) {
            for (var i = 0; i < num; i++) {
                data = {
                    achievementId: arrAchivement[i+1],
                    numSteps: highScore
                };
                googleplaygame.incrementAchievement(data);
            }
        }
    };
    doLoginGPlus(doSubmit); 
};
