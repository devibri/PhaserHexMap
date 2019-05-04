var button;
var tileText;

//hexagon prefab
function Hexagon(game, key, x, y) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.terrain = "[unknown]";
	this.tileText = "";
	this.key = key;
	this.generated = false;
}


Hexagon.prototype = Object.create(Phaser.Sprite.prototype);
Hexagon.prototype.constructor = Hexagon;

//
// Hexagon.prototype.create = function() {
// 	console.log("create function called");
// 	game.input.onDown.addOnce(actionOnClick, this);
// }

// override Phaser.Sprite update
Hexagon.prototype.update = function() {
	//game.input.onDown.addOnce(actionOnSelect, this);
	// if (game.input.activePointer.isDown) {
	//
  // }
}

// on clicking the generate button
// function actionOnSelect () {
// 	// TODO: Clear the current text
//
// 	// TODO: Clear the current selected hex color
//
// 	// change the hex color to selected color
// 	//this.key = "hexagon_selected";
// 	//this﻿.loadTexture(this.key, 0);
// 	this.loadTexture('hexagon_selected', 0);
//
// 	// Place current selected tile's text
// 	if (this.generated) {
// 		this.tileText.text = "Terrain: " + this.terrain + "\nQuests: " + this.quests + "\nLocations: " + this.locations;
// 	} else {
// 		this.tileText = game.add.text(40, 100, "Terrain: [unknown]\nQuests: [unknown]\nLocations: [unknown]");
// 		this.tileText.font = "arial";
// 		this.tileText.fontSize = 24;
// 		button = game.add.button(40, 400, 'button', actionOnGenerate, this);
// 	}
// }
//
// // on clicking the generate button
// function actionOnGenerate () {
// 	this.generated = true;
// 	console.log("generating...")
//
// 	// change the hex color to generated color
// 	this.loadTexture('hexagon_filled', 0);
//
// 	// generate and set the field values
// 	this.terrain = "forest";
// 	this.quests = "no quests here";
// 	this.locations = "a cave, a stream";
//
// 	// update the text on the screen
// 	this.tileText.text = "Terrain: " + this.terrain + "\nQuests: " + this.quests + "\nLocations: " + this.locations;
// }
