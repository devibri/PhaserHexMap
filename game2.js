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
		npcText = game.add.text(300, 100, "NPCs:");

		questText.font = "arial";
		questText.fontSize = 24;
		questText.style.wordWrap = true;
		questText.style.wordWrapWidth = 1000;
		npcText.font = "arial";
		npcText.fontSize = 24;
		npcText.style.wordWrap = true;
		npcText.style.wordWrapWidth = 1000;

		for (var i = 0; i < 4; i++) {
			npcArray[i] = new Npc(this.game);
		}

		game.stage.backgroundColor = "#ffffff"

		questText.text = "[Not yet generated]";

		npcArray.forEach(function(npc) {
    	npcText.text = npcText.text + "\n" + npc.name;
		});

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
