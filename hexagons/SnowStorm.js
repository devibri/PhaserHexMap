// snowstorm prefab
function SnowStorm(game, key) {
	// generate random x,y values
	let x = game.rnd.integerInRange(0, game.width);
	let y = game.rnd.integerInRange(0, game.height);
	let rotation = game.rnd.integerInRange(0, Math.PI*2);
	this.xv = game.rnd.integerInRange(1, 3);
	this.xy = game.rnd.integerInRange(1, 3);
	// call to Phaser.Sprite
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key);

	// custom properties
	this.rotation = rotation;
	this.anchor.set(0.5);
	this.alpha = 0.75;
}

SnowStorm.prototype = Object.create(Phaser.Sprite.prototype);
SnowStorm.prototype.constructor = SnowStorm;

// override Phaser.Sprite update
SnowStorm.prototype.update = function() {
	// rotate
	this.rotation += 0.05;

	// move
	this.x += this.xv;
	this.y += this.xy;

	// check for reverse key
	if(game.input.keyboard.justPressed(Phaser.Keyboard.R)) {
		this.xv = -this.xv;
		this.yv = -this.yv;
	}
	// do bounds check
	if(this.x > game.width + this.width) {
		this.x = 0 - this.width;
	} else if (this.y > game.height + this.height) {
		this.y = 0 - this.height;
	} else if (this.x < 0 - this.width) {
		this.x = game.width + this.width;
	}
}
