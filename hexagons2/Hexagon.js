var button;
var tileText;

//hexagon prefab
function Hexagon(game, key, x, y) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.terrain = "[unknown]";
	this.tileText = "";
}


Hexagon.prototype = Object.create(Phaser.Sprite.prototype);
Hexagon.prototype.constructor = Hexagon;



// override Phaser.Sprite update
Hexagon.prototype.update = function() {
	if (game.input.activePointer.isDown) {
		this.tileText = game.add.text(40, 100, "Terrain: \nQuests: \nLocations: ");
		this.tileText.font = "arial";
		this.tileText.fontSize = 24;
		button = game.add.button(40, 400, 'button', actionOnClick, this);
  }
}

// on clicking the generate button
function actionOnClick () {
	// set the values of the different components of each tile
	this.terrain = "forest"
	this.quests = "no quests here"
	this.locations = "a cave, a stream"

	// put the text on the screen
	this.tileText.text = "Terrain: " + this.terrain + "\nQuests: " + this.quests + "\nLocations: " + this.locations;
}
