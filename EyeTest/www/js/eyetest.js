
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
	// var color = (Math.random()*0xFFFFFF<<0).toString(16);
	// if (color.length < 6) {
	// 	color = color + '0'*(6-color.length);
	// }
	// return '#'+color;
	return color = 'rgb(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
};
var ui = {
	gameover: '<div class="game-over text-center col-sm-12 col-md-12 col-lg-12">'+
                '<div class="start-game col-sm-12 col-md-12 col-lg-12">'+
                    '<button class="btn btn-default start-game"><i class="fa fa-play fa-4x text-success"></i></button>'+
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
};
EyeTest.prototype.start = function() {
	
	var box = $('.eyetest-contain', self.container);
	box.html("");
	var color = randomHexColor();
	var width = self.container.width() > WIDTH ? self.container.width() / 2 - 50 : self.container.width() - 50;
	var specialCell = {
		col: Math.floor((Math.random() * self.size)),
		row: Math.floor((Math.random() * self.size))
	};
	for (var i = 0; i < self.size; i++) {
		var tr = $('<div/>');
		// tr.addClass('container');
		tr.css('clear', 'both');
		tr.css('display', 'inline-block');
		tr.css('height', width/self.size);
		for (var j = 0; j < self.size; j++) {
			var td = $('<div/>');

			td.css('float', 'left');
			td.css('width', width/self.size);
			td.css('height', width/self.size);
			td.css('border-radius', RADIUS);
			td.css('background', color);
			td.css('border', BORDER);
			if (i == specialCell.row && j == specialCell.col) {
				td.css('opacity', OPACITY);
				td.click(function(e) {
			        self.confirm(true);
			    });
				td[0].addEventListener("touchstart", function(e) {
			        self.confirm(true);
			    }, false);
			} else {
				td.click(function(e) {
			        self.confirm(false);
			    });
				td[0].addEventListener("touchstart", function(e) {
			        self.confirm(false);
			    }, false);
			}
			tr.append(td);
		}
		box.append(tr);
	}
	clearInterval(self.timer);
	self.timing = TIME;
	if (self.score != 0)
		self.timer = setInterval(self.update, 1000);
};
EyeTest.prototype.confirm = function(answer) {

	if (answer) {
		// next game
		var score = $('.score', this.container);
		this.score += 1;
		$('div', score).html(this.score);
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
			}
		}

		this.start(this.container);
	} else {

		var box = $('.eyetest-contain', this.container);
		// degree time 2 seconds
		// if time equal 0 then endgame
		this.errors += 1;
		$('.errors div', this.container).text(self.errors);
		if (this.timing > 2) {
			this.timing -= 2;
			$('.count-down', self.container).text(self.timing);
		}
		else {
			// end game
			this.stop();
		}

	}
};
EyeTest.prototype.update = function() {
	
	if (self.timing <= 0)
		self.stop();
	self.timing -= 1;
	// console.log(this.timing);
	$('.count-down', self.container).text(self.timing);
};
EyeTest.prototype.stop = function() {
	var box = $('.eyetest-contain', this.container);
	box.html(ui.gameover);
	$('.start-game', box).click(function(e) {
			        self.start();
			    });
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