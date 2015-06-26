
const GRID = 2;
const SCORE = 0;
const ERRORS = 0;
const TIME = 15;
const LEVEL = 1;
const COUNT = 0;
const PADDING = 1;
const RADIUS = 10;
const OPACITY = 0.78;
const BORDER = '2px solid white';
const WIDTH = 720;
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

function EyeTest() {
	this.score = SCORE;
	this.errors = ERRORS;
	this.timing = TIME;
	this.game_timer = null;
	this.container = null;
	this.level = LEVEL;
	this.isFinished = false;
};
EyeTest.prototype.init = function(container) {
	self = this;
	this.container = container;
	this.start();
};
EyeTest.prototype.start = function() {
	
	var box = $('.eyetest-contain', self.container);
	var time = $('.time-count', self.container);
	var error = $('.error-count', self.container);
	var color = randomColor(self.level);
	var width = window.innerWidth > WIDTH ? window.innerWidth/4 - window.innerWidth/10 : window.innerWidth - window.innerWidth/5;
	console.log(window.innerWidth);
	var grid = colorTestLevelGrid(self.level);
	var specialCell = Math.floor((Math.random() * grid * grid));

	this.isFinished = false;
	box.width(width);
	box.height(width);
	box.css('visibility', '');
	box.html("");
	error.text(self.errors);
	time.text(self.timing);
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
		box.append(td);
	}
	clearInterval(self.game_timer);
	if (self.score != 0)
		self.game_timer = setInterval(self.update, 1000);
};
EyeTest.prototype.confirm = function(answer) {

	if (answer) {
		// next game
		var score = $('.score-count', this.container);
		this.score += 1;
		self.timing = TIME;
		score.html(this.score);
		this.level++;
		playSound('beep', 'media/beep.mp3');
		this.start();
	} else {
		playSound('error', 'media/error.mp3');
		if (this.score != 0) {

			var box = $('.eyetest-contain', this.container);
			// degree time 3 seconds
			// if time equal 0 then endgame
			this.errors += 1;
			$('.error-count', this.container).text(self.errors);
			if (this.timing > 3) {
				this.timing -= 3;
				$('.time-count', self.container).text(self.timing);
			}
			else {
				// end game
				this.stop();
			}
		}
	}
};
EyeTest.prototype.update = function() {
	
	if (self.timing <= 0)
		self.stop();
	self.timing -= 1;
	$('.time-count', self.container).text(self.timing);
};
EyeTest.prototype.stop = function() {
	var box = $('.eyetest-contain', this.container);
	var highScore = localStorage.getItem("PK-EyeTest-HighScore") ? localStorage.getItem("PK-EyeTest-HighScore") : 0;
    
    this.isFinished = true;
	if (typeof(Storage) != "undefined") {
        // Store
        localStorage.setItem("PK-EyeTest-HighScore", highScore);
    }

    if (highScore < this.score) {
        highScore = this.score;
        submitScore();
    }
    submitAchivement();
	if (this.score < SLEVEL1)
		playSound('gameover', 'media/gameover.mp3');
	else if (this.score < SLEVEL2) {
		playSound('owesome', 'media/awesome.mp3');
	} else {
		playSound('genius', 'media/genius.mp3');
	}
	$('.time-count', this.container).text(0);
	box.css('visibility', 'hidden');
	$('.game-over').show(1500);
	clearInterval(self.game_timer);
	this.reset();
};
EyeTest.prototype.reset = function() {
	this.score = SCORE;
	this.errors = ERRORS;
	this.timing = TIME;
	this.game_timer = null;
	this.level = LEVEL;
};