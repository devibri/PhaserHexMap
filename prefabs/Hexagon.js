// Hexagon prefab

var button;
var tileText;

//hexagon prefab
function Hexagon(game, key, x, y) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.terrain = "[unknown]";
	this.tileText = "";
	this.key = key;
	this.isGenerated = false;
	this.encounter = "";
	
}

Hexagon.prototype = Object.create(Phaser.Sprite.prototype);
Hexagon.prototype.constructor = Hexagon;

// override Phaser.Sprite update
Hexagon.prototype.update = function() {

}
