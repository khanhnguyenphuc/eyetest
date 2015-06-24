
const SIZE = 2;
const SCORE = 0;
const ERRORS = 0;
const TIME = 15;
const LEVEL = 5;
const COUNT = 0;
const PADDING = 1;
const RADIUS = 10;
const OPACITY = 0.8;
const BORDER = '2px solid white';
const WIDTH = 720;

var randomHexColor = function() {
	// var rColor = Math.floor(Math.random() * 255);
	// var gColor = Math.floor(Math.random() * 255);
	// var bColor = Math.floor(Math.random() * 255);
	
	return color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
};
var ui = {
	gameover: '<div class="game-over text-center col-sm-12 col-md-12 col-lg-12">'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                    '<button class="btn btn-default share-game"><i class="fa fa-share-alt-square fa-4x text-info"></i></button>'+
                    '<button class="btn btn-default start-game"><i class="fa fa-play fa-4x text-success"></i></button>'+
                '</div>'+
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'+
                '<button class="btn btn-default achievement-game"><i class="fa fa-trophy fa-2x text-info"></i></button>'+
                '<button class="btn btn-default leaderboard-game"><i class="fa fa-area-chart fa-2x text-info"></i></button>'+
                '</div>'+
                '<div class="row">'+
                '<button class="btn btn-default rate-game"><i class="fa fa-star fa-2x text-info"></i></a></button>'+
                '</div>'+
            '</div>'
};
var self;
function EyeTest() {
	this.size = SIZE;
	this.score = SCORE;
	this.errors = ERRORS;
	this.timing = TIME;
	this.count = COUNT;
	this.timer = null;
	this.container = null;
	this.opacity = OPACITY;
};
EyeTest.prototype.init = function(container) {
	self = this;
	this.container = container;
	this.start();
	console.log(self.container.width());
};
EyeTest.prototype.start = function() {
	
	var box = $('.eyetest-contain', self.container);
	var time = $('.time-count', self.container);
	var error = $('.error-count', self.container);
	box.html("");
	error.text(self.errors);
	time.text(self.timing);
	var color = randomHexColor();
	var width = self.container.width() > WIDTH ? self.container.width() / 4 - 50 : self.container.width() - 50;
	var specialCell = Math.floor((Math.random() * self.size * self.size));
	
	for (var j = 0; j < self.size*self.size; j++) {
		var td = $('<div/>');

		td.css('float', 'left');
		td.css('width', 100/self.size + '%');
		td.css('height', 100/self.size + '%');
		td.css('border-radius', RADIUS);
		td.css('background', color);
		td.css('border', BORDER);
		if (j == specialCell) {
			td.css('opacity', self.opacity);
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
		if (this.score  == 1) {
			this.size += 1;
		} else if (this.score == 4) {
			this.size += 1;
		} else {
			this.count += 1;
			if (this.count % this.size == 0) {
				this.size += 1;
				// this.level += 2;
				this.count = 0;
				this.opacity += 0.03;
				console.log(self.opacity);
			}
		}

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

	this.size = SIZE;
	this.score = SCORE;
	this.timing = TIME;
	this.errors = ERRORS;
	this.count = COUNT;
	// this.level = LEVEL;
	this.timer = null;
	this.opacity = OPACITY;
};