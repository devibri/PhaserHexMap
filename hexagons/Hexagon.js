//hexagon prefab
function Hexagon(game, key, x, y) {
	// generate random x,y values
		Phaser.Sprite.call(this, game, x, y, key);
}

Hexagon.prototype = Object.create(Phaser.Sprite.prototype);
Hexagon.prototype.constructor = Hexagon;

// override Phaser.Sprite update
Hexagon.prototype.update = function() {

}
