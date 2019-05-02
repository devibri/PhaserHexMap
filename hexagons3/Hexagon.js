

//hexagon prefab
function Hexagon(game, key, x, y) {
	Phaser.Sprite.call(this, game, x, y, key);
}

Hexagon.prototype = Object.create(Phaser.Sprite.prototype);
Hexagon.prototype.constructor = Hexagon;

// override Phaser.Sprite update
Hexagon.prototype.update = function() {
	console.log("update");
	game.add.text(20,40,"Some terrain info");

	if(game.input.keyboard.justPressed(Phaser.Keyboard.R)) {
		var infoText = game.add.text(20,40,"Some terrain info");
		infoText.font = "arial";
		infoText.fontSize = 18;
	}
}
