var button;
var terrainText;

//hexagon prefab
function Hexagon(game, key, x, y) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.terrain = "[unknown]";
	this.terrainText = "";
}


Hexagon.prototype = Object.create(Phaser.Sprite.prototype);
Hexagon.prototype.constructor = Hexagon;



// override Phaser.Sprite update
Hexagon.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		this.tileText = game.add.text(40, 100, "Terrain: ");
		//this.terrainText = game.add.text(140, 100, this.terrain);
		this.tileText.font = "arial";
		this.tileText.fontSize = 24;
		button = game.add.button(40, 400, 'button', actionOnClick, this);
  }
}

function actionOnClick () {
	this.terrain = "forest"
	this.tileText.text = 'Terrain: ' + this.terrain;
	console.log("pressed button");
}
