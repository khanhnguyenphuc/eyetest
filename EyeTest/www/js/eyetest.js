
const GRID = 2;
const SCORE = 0;
const ERRORS = 0;
const TIME = 15; // seconds time
const LEVEL = 1;
const COUNT = 0;
const PADDING = 1;
const RADIUS = 10;
const OPACITY = 0.78;
const BORDER = '1px solid white';
const SLEVEL1 = 15;
const SLEVEL2 = 30;

var randomColor = function(level) {
	var colordiff=colorTestLevelColorDiff(level);
	var r=Math.floor(Math.random()*(255-colordiff));
	var g=Math.floor(Math.random()*(255-colordiff));
	var b=Math.floor(Math.random()*(255-colordiff));
	var color = {
		general: 'rgb(' + b.toString() + ',' + g.toString() + ',' + b.toString() + ')',
		differrent: 'rgb(' + (b+colordiff).toString() + ',' + (g+colordiff).toString() + ',' + (b+colordiff).toString() + ')',
	}
	return color;
};
function colorTestLevelColorDiff(level) {
	if(level<=58) {
		var col=[105,75,60,45,30,20,18,16,15,15,15,14,14,14,13,13,13,12,12,12,11,11,11,10,10,9,9,8,8,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1,1];
		return col[level-1];
	}
	return 1;
};
function colorTestLevelGrid(level) {
	if(level<2) return 2;
	if(level<4) return 3;
	if(level<8) return 4;
	if(level<13) return 5;
	if(level<22) return 6;
	if(level<32) return 7;
	if(level<36) return 8;	
	if(level<40) return 9;	
	if(level<44) return 10;	
	if(level<48) return 11;	
	return 12;
};

var self;

function getElements (container) {
	var elems = {};
	elems.$box = $('.eyetest-content', container);
	elems.$time = $('.time-count', container);
	elems.$error = $('.error-count', container);
	elems.$score = $('.score-count', container);
	elems.$gameover = $('.game-over');
	return elems;
};

function EyeTest(container) {
	self = this;
	this.elems = getElements(container);
};
EyeTest.prototype.init = function() {
	
	this.score = SCORE;
	this.errors = ERRORS;
	this.gameTime = TIME;
	this.level = LEVEL;
	this.gameover = false;
	this.gameTimeout = null;
};
EyeTest.prototype.startGame = function() {
	
	var color = randomColor(self.level);
	var width = window.innerWidth;
	var height = window.innerHeight;
	var grid = colorTestLevelGrid(self.level);
	var specialCell = Math.floor((Math.random() * grid * grid));

	if (width <= 330) {
		width =  height/2 - 20;
	} else if (width > 330 && width <= 360) {
		width =  width - width/5;
	} else if (width > 360 && width <= 630) {
		width = width - width/5;
	} else {
		width = width/3 - width/10;
	}

	this.gameover = false;
	this.elems.$box.width(width);
	this.elems.$box.height(width);
	this.elems.$box.css('visibility', '');
	this.elems.$box.html("");
	this.elems.$error.text(self.errors);
	this.elems.$time.text(self.gameTime);
	for (var j = 0; j < grid*grid; j++) {
		var td = $('<div/>');
		td.css({
			'float': 'left', 
			'borderRadius': RADIUS,
			'cursor': 'pointer',
			'border': BORDER,
			'boxSizing': 'border-box',
			'width': (100/grid).toString()+'%',
			'height': (100/grid).toString()+'%',
			'backgroundColor': color.general});
		if (j == specialCell) {
			td.css('backgroundColor', color.differrent);
			// td.click(function(e) {
		 //        self.confirm(true);
		 //    });
			td[0].addEventListener("touchstart", function(e) {
		        self.confirm(true);
		    }, false);
		} else {
			// td.click(function(e) {
		 //        self.confirm(false);
		 //    });
			td[0].addEventListener("touchstart", function(e) {
		        self.confirm(false);
		    }, false);
		}
		this.elems.$box.append(td);
	}
	clearInterval(self.gameTimeout);
	if (self.score != 0)
		self.gameTimeout = setInterval(self.update, 1000);
};
EyeTest.prototype.confirm = function(answer) {

	if (answer) {
		// next game
		this.score += 1;
		self.gameTime = TIME; // reset game time
		this.elems.$score.html(this.score);
		this.level++;
		playSound('beep', 'media/ding.MP3');
		this.startGame();
	} else {
		playSound('error', 'media/error.mp3');
		if (this.score != 0) {

			// degree time 3 seconds
			// if time equal 0 then endgame
			this.errors += 1;
			this.elems.$error.text(self.errors);
			if (this.gameTime > 3) {
				this.gameTime -= 2;
				this.elems.$time.text(self.gameTime);
			}
			else {
				// end game
				this.endGame();
			}
		}
	}
};
EyeTest.prototype.update = function() {

	if (self.gameTime <= 0)
		self.endGame();
	else {
		self.gameTime -= 1;
		self.elems.$time.text(self.gameTime);
	}
};
EyeTest.prototype.endGame = function() {
	var highScore = localStorage.getItem("PK-EyeTest-HighScore") ? localStorage.getItem("PK-EyeTest-HighScore") : 0;
    this.gameover = true;
	clearInterval(self.gameTimeout);

    if (highScore < this.score) {
        highScore = this.score;
        submitScore();
    }
	if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("PK-EyeTest-HighScore", highScore);
    }
    submitAchivement();
	if (this.score < SLEVEL1)
		playSound('gameover', 'media/gameover.mp3');
	else if (this.score < SLEVEL2) {
		playSound('owesome', 'media/awesome.mp3');
	} else {
		playSound('genius', 'media/genius.mp3');
	}
	this.elems.$time.text(0);
	this.elems.$box.css('visibility', 'hidden');
	this.elems.$gameover.show(1500);
};