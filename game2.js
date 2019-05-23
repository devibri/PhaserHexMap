// Manages the main game state

// List of terrain types taken from: http://www.welshpiper.com/hex-based-campaign-design-part-1/
// List of encounter types taken from: https://www.welshpiper.com/hex-based-campaign-design-part-2/

var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var npcArray = [];
var questText;

var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("button", "img/button_generate.png");
	},
	create: function() {
		// Define tile text
		questText = game.add.text(40, 100, "");
		questText.font = "arial";
		questText.fontSize = 24;
		questText.style.wordWrap = true;
		questText.style.wordWrapWidth = 1000;

		//npcArray.add();

		game.stage.backgroundColor = "#ffffff"

		questText.text = "[Not yet generated]";
		button = game.add.button(40, 50, 'button', actionOnGenerate, this);
	}
};



function actionOnGenerate() {
	// update the text on the screen
	var quest = new Quest(this.game);
	questText.text = quest.questText;
}

// define and start states
game.state.add('Play', Play);
game.state.start('Play');
