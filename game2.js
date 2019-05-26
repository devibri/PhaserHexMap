// Manages the main game state

// List of terrain types taken from: http://www.welshpiper.com/hex-based-campaign-design-part-1/
// List of encounter types taken from: https://www.welshpiper.com/hex-based-campaign-design-part-2/

var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var npcArray = [];
var deadNPCArray = [];
var questText;
var npcText;
var height;
var npcName;
var nameList;


var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("button", "img/button_generate.png");
	},
	create: function() {
		/* *** MAKE YOUR OWN CAMPAIGN ***
		* Use this section to modify the values below to customize your own campaign
		*/
		nameList = ["Rex", "Corith", "Anton", "Rizzo", "Talie", "Kara", "Symon", "Zirra", "Orin", "Parrish", "Isira"];

		// Define tile text
		height = 130;
		questText = game.add.text(40, 100, "");
		npcText = game.add.text(500, 100, "NPCs:");

		questText.font = "arial";
		questText.fontSize = 24;
		questText.style.wordWrap = true;
		questText.style.wordWrapWidth = 450;
		npcText.font = "arial";
		npcText.fontSize = 24;
		npcText.style.wordWrap = true;
		npcText.style.wordWrapWidth = 1000;

		// Pre-seed the world with some random NPCs
		for (var i = 0; i < 4; i++) {
			npcArray[i] = new Npc(this.game, getNPCName());
		}

		game.stage.backgroundColor = "#ffffff"

		questText.text = "[Not yet generated]";

		// Add all NPCs to list of NPCs displayed; make names clickable
		for (var i = 0; i < npcArray.length; i++) {
			npc = npcArray[i];
			addNPCName(npc);
		}

		button = game.add.button(40, 50, 'button', actionOnGenerate, this);
	}
};

function actionOnGenerate() {
	// update the text on the screen
	var quest = new Quest(this.game);
	if (quest.questType == "Revenge") {
		npc = findDeadNPC();
		questText.text = "Someone is seeking revenge for the death of " + npc.name + " the " + npc.occupation;
	} else {
			questText.text = quest.questText;
	}
}

function killNPC(nameText) {
	if (npc.isAlive) {
		nameText.fill = "#ff0044";
		npc = findNPC(nameText);
		npc.isAlive = false;
		deadNPCArray.push(npc);
	} else {
		nameText.fill = "#000000";
		npc.isAlive = true;
		removeDeadNPC(nameText);
	}
}

function findNPC(name) {
	for (var i = 0; i < npcArray.length; i++) {
		if (name.text == npcArray[i].name) {
			return npcArray[i];
		}
	}
}

// Removes an NPC's name from the dead NPC list when setting them back to alive
function removeDeadNPC(name) {
	for (var i = 0; i < deadNPCArray.length; i++) {
		if (name.text == deadNPCArray[i].name) {
			deadNPCArray.splice(i, 1);
		}
	}
}

// Returns a random dead NPC
function findDeadNPC() {
	if (deadNPCArray.length > 0) {
		let index = Math.floor(Math.random()*deadNPCArray.length)
		let npc = deadNPCArray[index];
		deadNPCArray.splice(index, 1);
		return npc;
	} else { // Make a new NPC to add to the world who is dead
		let npc = new Npc(this.game, getNPCName());
		npc.isAlive = false;
		npcArray.push(npc);
		addNPCName(npc);
		return npc;
	}
}

function addNPCName(npc) {
	npcName = game.add.text(500, height, npc.name + " the " + npc.occupation);
	npcName.inputEnabled = true;
	npcName.events.onInputUp.add(killNPC, this);
	if (!npc.isAlive){
		npcName.fill = "#ff0044";
	}
	height = height + 30;
}

function getNPCName() {
	let index = Math.floor(Math.random()*nameList.length);
	let name = nameList[index];
	nameList.splice(index, 1);
	return name;
}

// define and start states
game.state.add('Play', Play);
game.state.start('Play');
