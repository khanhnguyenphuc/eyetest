
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
var ui = {
	gameover: '<div class="game-over text-center col-sm-12 col-md-12 col-lg-12">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                '<button class="btn share-game"><i class="fa fa-share-alt-square fa-4x text-info"></i></button>'+
                '<button class="btn start-game"><i class="fa fa-play fa-4x text-success"></i></button>'+
                '</div>'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                '<button class="btn achievement-game"><i class="fa fa-trophy fa-2x text-warning"></i></button>'+
                '<button class="btn leaderboard-game"><i class="fa fa-signal fa-2x text-danger"></i></button>'+
                '<button class="btn rate-game"><i class="fa fa-star fa-2x text-warning"></i></a></button>'+
                '</div>'+
            	'<footer class="text-center text-primary">@EyeTest By Phuc Khanh</footer>'+
            '</div>'
};
var self;
function EyeTest() {
	this.score = SCORE;
	this.errors = ERRORS;
	this.timing = TIME;
	this.timer = null;
	this.container = null;
	this.level = LEVEL;
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
	var width = self.container.width() > WIDTH ? self.container.width() / 4 - 50 : self.container.width() - 50;
	
	var grid = colorTestLevelGrid(self.level);
	var specialCell = Math.floor((Math.random() * grid * grid));

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
	clearInterval(self.timer);
	if (self.score != 0)
		self.timer = setInterval(self.update, 1000);
};
EyeTest.prototype.confirm = function(answer) {

	if (answer) {
		// next game
		var score = $('.score-count', this.container);
		this.score += 1;
		self.timing = TIME;
		score.html(this.score);
		this.level++;

		this.start();
	} else {
		if (this.score != 0) {

			var box = $('.eyetest-contain', this.container);
			// degree time 2 seconds
			// if time equal 0 then endgame
			this.errors += 1;
			$('.error-count', this.container).text(self.errors);
			if (this.timing > 2) {
				this.timing -= 2;
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
	// console.log(this.timing);
	$('.time-count', self.container).text(self.timing);
};
EyeTest.prototype.stop = function() {
	var box = $('.eyetest-contain', this.container);
	$('.time-count', this.container).text(0);
	box.html(ui.gameover);
	// $('.start-game', box).click(function(e) {
	// 		        self.start();
	// 		    });
	$('.start-game', box)[0].addEventListener("touchstart", function(e) {
			        self.start();
			    }, false);
	clearInterval(self.timer);
	this.reset();
};
EyeTest.prototype.reset = function() {
	this.score = SCORE;
	this.errors = ERRORS;
	this.timing = TIME;
	this.timer = null;
	this.container = null;
	this.level = LEVEL;
};