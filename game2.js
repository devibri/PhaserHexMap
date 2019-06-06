// Manages the main game state

var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var npcArray;
var deadNPCArray;
var questText;
var npcText;
var height;
var npcName;
var nameList;
var height_quest;
var questList;
var questDesc;
var factionList;
var locationList;
var npc;
var isAliveText;


var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("button", "img/button_new-quest.png");
		game.load.image("npcAddButton", "img/button_new-npc.png");
		game.load.image("locationAddButton", "img/button_new-location.png");
		game.load.image("killButton", "img/button_kill.png");
	},
	create: function() {
		// Define tile text
		height_npc = 130;
		height_quest = 250;
		height_location = 130;
		width_npc = 675;
		width_location = 975;
		detailText = game.add.text(40, 40, "[Details]");
		questText = game.add.text(40, 220, "Quests:");
		npcText = game.add.text(width_npc, 100, "NPCs:");
		locationText = game.add.text(width_location, 100, "Locations:");
		isAliveText = game.add.text(0, 0, " ");

		nameList = ["Rex", "Corith", "Anton", "Rizzo", "Talie", "Kara", "Symon", "Zirra", "Orin", "Parrish", "Isira"];
		questList = [];
		npcArray = [];
		deadNPCArray = [];
		factionList = [];
		locationList = [];

		game.stage.backgroundColor = "#ffffff"

		button = game.add.button(40, 150, 'button', actionOnAddQuest, this);
		npcAddButton = game.add.button(width_npc, 50, 'npcAddButton', actionOnAddNPC, this);
		locationAddButton = game.add.button(width_location, 50, 'locationAddButton', actionOnAddLocation, this);
	}
};

// Adds a quest to the list of quests
function actionOnAddQuest() {
	// update the text on the screen
	let quest = new Quest(this.game);
	questList.push(quest);

	// Deals with adding faction quests
	if (quest.type == "Exploration") {
		let location = new Location(this.game);
	} else if (quest.type == "Faction") {
		let faction1 = new Faction(this.game);
		faction1 = new Faction(this.game);
		let faction2 = new Faction(this.game);

		while (faction1.name == faction2.name) {
			faction2 = new Faction(this.game);
		}
		quest.text = faction1.name + " wants to attack the " + faction2.name;
		console.log(quest.text);
	}	else if (quest.type == "Revenge") {	// Deals with adding revenge quests
		let npc = findDeadNPC();
		quest.text = "Someone wants revenge for the death of " + npc.name;
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

function actionOnAddLocation() {
	let location = new Location(this.game);
	location = new Location(this.game);
	locationList.push(location);
	addLocationText(location);
}

// Finds an NPC value based on a name
function findNPC(name) {
	for (var i = 0; i < npcArray.length; i++) {
		if (name.text == npcArray[i].name + " the " + npcArray[i].occupation) {
			return npcArray[i];
		}
	}
}

// Removes an NPC's name from the dead NPC list when setting them back to alive
function removeDeadNPC(name) {
	for (var i = 0; i < deadNPCArray.length; i++) {
		if (name.text == deadNPCArray[i].name + " the " + deadNPCArray[i].occupation) {
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
	npcName = game.add.text(width_npc, height_npc, npc.name + " the " + npc.occupation);

	npcName.font = "arial";
	npcName.fontSize = 24;
	npcName.style.wordWrap = true;
	npcName.style.wordWrapWidth = 400;

	npcName.inputEnabled = true;
	//npcName.events.onInputUp.add(killNPC, this);
	npcName.events.onInputUp.add(displayNPCInfo, this);
	if (!npc.isAlive){
		npcName.fill = "#ff0044";
	}
	height_npc = height_npc + 30;
}

function displayNPCInfo(nameText) {
	detailText.text = " ";
	isAliveText.destroy();
	npc = findNPC(nameText);
	detailText.text = "Name: " + npc.name + "\nOccupation: " + npc.occupation + "\nIs Alive: "// + npc.isAlive;
	if (npc.isAlive) {
		isAliveText = game.add.text(150, 110, "true");
	} else {
		isAliveText = game.add.text(150, 110, "false");
	}
	isAliveText.inputEnabled = true;
	isAliveText.events.onInputUp.add(setNPCLife, this);
}

function setNPCLife(isAliveText) {
	if (isAliveText.text == "false") {
		isAliveText.text = "true";
		npc.isAlive = true;
	} else  { //if (isAliveText.text == "true")
		isAliveText.text = "false";
		npc.isAlive = false;
	}
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
	questDesc.events.onInputUp.add(completeQuest, this);

	if (quest.isComplete){
		questDesc.fill = "#39B53D";
	}
	height_quest = height_quest + 30;
}


// Adds the quest text to the list of quest texts
function addLocationText(location) {
	locationDesc =  game.add.text(width_location, height_location, location.name);

	//set font
	locationDesc.font = "arial";
	locationDesc.fontSize = 24;
	locationDesc.style.wordWrap = true;
	locationDesc.style.wordWrapWidth = 750;

	height_location = height_location + 30;
}

// What happens when you click / complete a quest
function completeQuest(questDesc) {
	let quest = findQuest(questDesc);
	quest.isComplete = true;
	questDesc.fill = "#39B53D";
}

// Finds an NPC value based on a name
function findQuest(questDesc) {
	for (var i = 0; i < questList.length; i++) {
		if (questDesc.text == questList[i].text) {
			return questList[i];
		}
	}
}


// define and start states
game.state.add('Play', Play);
game.state.start('Play');
