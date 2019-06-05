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
var height_quest;
var questList;
var questDesc;


var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("button", "img/button_new-quest.png");
		game.load.image("npcAddButton", "img/button_new-npc.png");
	},
	create: function() {
		// Define tile text
		height_npc = 130;
		height_quest = 130;
		questText = game.add.text(40, 100, "Quests:");
		npcText = game.add.text(800, 100, "NPCs:");

		nameList = ["Rex", "Corith", "Anton", "Rizzo", "Talie", "Kara", "Symon", "Zirra", "Orin", "Parrish", "Isira"];
		questList = [];

		game.stage.backgroundColor = "#ffffff"

		button = game.add.button(40, 50, 'button', actionOnAddQuest, this);
		npcAddButton = game.add.button(800, 50, 'npcAddButton', actionOnAddNPC, this);
	}
};

// Adds a quest to the list of quests
function actionOnAddQuest() {
	// update the text on the screen
	let quest = new Quest(this.game);
	questList.push(quest);

	if (quest.type == "Revenge") {
		npc = findDeadNPC();
		quest.text = "Someone is seeking revenge for the death of " + npc.name;
	} else {
			quest.text = quest.text;
	}
	addQuestText(quest);
}

// Adds a new NPC to the list of NPCs
function actionOnAddNPC() {
	let npc = new Npc(this.game, getNPCName());
	npcArray.push(npc);
	addNPCName(npc);
}

// Kills an NPC on click
function killNPC(nameText) {
	let npc = findNPC(nameText);
	if (npc.isAlive) {
		nameText.fill = "#ff0044";
		npc.isAlive = false;
		deadNPCArray.push(npc);
	} else {
		nameText.fill = "#000000";
		npc.isAlive = true;
		removeDeadNPC(nameText);
	}
}

// Finds an NPC value based on a name
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

// Adds the NPC to the list of NPC names
function addNPCName(npc) {
	npcName = game.add.text(800, height_npc, npc.name);

	npcName.font = "arial";
	npcName.fontSize = 24;
	npcName.style.wordWrap = true;
	npcName.style.wordWrapWidth = 200;

	npcName.inputEnabled = true;
	npcName.events.onInputUp.add(killNPC, this);
	if (!npc.isAlive){
		npcName.fill = "#ff0044";
	}
	height_npc = height_npc + 30;
}

// Finds the name of an NPC
function getNPCName() {
	let index = Math.floor(Math.random()*nameList.length);
	let name = nameList[index];
	nameList.splice(index, 1);
	return name;
}

// Adds the quest text to the list of quest texts
function addQuestText(quest) {
	questDesc =  game.add.text(40, height_quest, quest.text);

	//set font
	questDesc.font = "arial";
	questDesc.fontSize = 24;
	questDesc.style.wordWrap = true;
	questDesc.style.wordWrapWidth = 750;

	questDesc.inputEnabled = true;
	questDesc.events.onInputUp.add(questComplete, quest, this);

	if (quest.isComplete){
		questDesc.fill = "#39B53D";
	}
	height_quest = height_quest + 30;
}

// What happens when you click / complete a quest
function questComplete(quest, questDesc) {
	//quest.isComplete = true;
	questDesc.fill = "#39B53D";
}


// define and start states
game.state.add('Play', Play);
game.state.start('Play');
