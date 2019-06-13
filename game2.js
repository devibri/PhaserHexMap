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
var currentLocationList;
var npc;
var isAliveText;
var isCompleteText;
var npcTextList;
var questTextList;
var quest;


var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("button", "img/button_new-quest.png");
		game.load.image("npcAddButton", "img/button_new-npc.png");
		game.load.image("locationAddButton", "img/button_new-location.png");
	},
	create: function() {
		// Define tile text
		button_height = 160;
		height_npc = button_height + 100;
		height_quest = 250;
		height_location = button_height + 100;
		width_npc = 675;
		width_location = 975;
		detailText = game.add.text(width_npc, 40, " ");
		questDetailText = game.add.text(40, 40, " ");
		questText = game.add.text(40, 220, "Quests:");
		npcText = game.add.text(width_npc, button_height + 60, "NPCs:");
		locationText = game.add.text(width_location, button_height + 60, "Locations:");
		isAliveText = game.add.text(0, 0, " ");
		isCompleteText = game.add.text(0, 0, " ");

		nameList = ["Rex", "Corith", "Anton", "Rizzo", "Talie", "Kara", "Symon", "Zirra", "Orin", "Parrish", "Isira", "Winston", "Herra", "Kirin", "Arin", "Annea", "Mari", "Innesh", "Zachariah", "Constance", "Pierre"];
		questList = [];
		npcArray = [];
		deadNPCArray = [];
		factionList = [];
		currentLocationList = [];
		npcTextList = [];
		questTextList = [];

		game.stage.backgroundColor = "#ffffff"

		button = game.add.button(40, button_height, 'button', actionOnAddQuest, this);
		npcAddButton = game.add.button(width_npc, button_height, 'npcAddButton', actionOnAddNPC, this);
		locationAddButton = game.add.button(width_location, button_height, 'locationAddButton', actionOnAddLocation, this);
	}
};

// Adds a quest to the list of quests
function actionOnAddQuest() {
	// update the text on the screen
	let quest = new Quest(this.game);
	questList.push(quest);

	// Deals with adding quests of given types
	if (quest.type == "Exploration") {
		let location = new Location(this.game);
		location = new Location(this.game);
		let isListed = checkLocationRepeat(location);
		if (isListed == false) {
			currentLocationList.push(location);
			addLocationText(location);
		}
		let questgiver = findAliveNPC();
		quest.questGiver = questgiver;
		explorationQuestList = [questgiver.name + " wants you to go and explore " + location.name, questgiver.name + " has heard there is something valuable in " + location.name, questgiver.name + " lost a family heirloom in " + location.name, questgiver.name + " has heard strange noises coming from " + location.name];
		quest.text = explorationQuestList[Math.floor(Math.random()*explorationQuestList.length)];
	} else if (quest.type == "Faction") {
		let faction1 = new Faction(this.game);
		faction1 = new Faction(this.game);
		let faction2 = new Faction(this.game);
		quest.questGiver = faction1;
		while (faction1.name == faction2.name) { // make sure faction is not warring with itself
			faction2 = new Faction(this.game);
		}
		factionQuestList = ["The " + faction1.name + " wants to attack the " + faction2.name, "The " + faction1.name + " wants information about the " + faction2.name, "The " + faction1.name + " wants you to infiltrate the " + faction2.name, "The " + faction1.name + " wants information about the " + faction2.name, "The " + faction1.name + " believes you are informants for the " + faction2.name];
    quest.text = factionQuestList[Math.floor(Math.random()*factionQuestList.length)];
	}	else if (quest.type == "Revenge") {	// Deals with adding revenge quests
		let npc = findDeadNPC();
		let questgiver = findAliveNPC();
		quest.questGiver = questgiver;
		revengeQuestList = [questgiver.name + " wants revenge for the death of " + npc.name, questgiver.name + " is concerned because " + npc.name + " is missing", npc.name + " has been killed and " + questgiver.name + " wants your help finding out why", questgiver.name + " says they have been framed for the death of " + npc.name];
		quest.text = revengeQuestList[Math.floor(Math.random()*revengeQuestList.length)];
	} else {
			quest.text = quest.text;
	}
	addQuestText(quest);
}

function checkLocationRepeat(location) {
	if (currentLocationList.length > 0) {
		for (var i = 0; i < currentLocationList.length; i++) {
			if (currentLocationList[i].name == location.name) {
				return true;
			}
		}
	}
	return false;
}

// Adds a new NPC to the list of NPCs
function actionOnAddNPC() {
	let npc = new Npc(this.game, getNPCName());
	npcArray.push(npc);
	addNPCName(npc);
}

// When you add a new location via the button
function actionOnAddLocation() { // TODO: Fix this for when all locations listed
	let isListed = true;
	let location = new Location(this.game);
	while (isListed) {
		location = new Location(this.game);
		isListed = checkLocationRepeat(location);
	}
	currentLocationList.push(location);
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
function removeDeadNPC(npc) {
	for (var i = 0; i < deadNPCArray.length; i++) {
		if (npc.name == deadNPCArray[i].name) {
			deadNPCArray.splice(i, 1);
		}
	}
}

// chance of getting an NPC in game or a new one
function findAliveNPC() {
	if (npcArray.length > 0) {
		let index = Math.floor(Math.random()*npcArray.length)
		let npc = npcArray[index];
		if (npc.isAlive) {
			return npc;
		} else {
			let npc = new Npc(this.game, getNPCName());
			npcArray.push(npc);
			addNPCName(npc);
			return npc;
		}
	} else { // Make a new NPC to add to the world who is dead
		let npc = new Npc(this.game, getNPCName());
		npcArray.push(npc);
		addNPCName(npc);
		return npc;
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
	npcTextList.push(npcName);

	npcName.font = "arial";
	npcName.fontSize = 24;
	npcName.style.wordWrap = true;
	npcName.style.wordWrapWidth = 400;

	npcName.inputEnabled = true;
	npcName.events.onInputUp.add(displayNPCInfo, this);
	if (!npc.isAlive){
		npcName.fill = "#ff0044";
	}
	height_npc = height_npc + 30;
}

function displayNPCInfo(nameText) {
	clearSelectedNPC();
	nameText.fill = "#f4be41";
	detailText.text = " ";
	isAliveText.destroy();
	npc = findNPC(nameText);
	detailText.text = "Name: " + npc.name + " (" + npc.valence + ")\nOccupation: " + npc.occupation + "\nIs Alive: "// + npc.isAlive;
	if (npc.isAlive) {
		isAliveText = game.add.text(width_npc + 115, 110, "true");
	} else {
		isAliveText = game.add.text(width_npc + 115, 110, "false");
	}
	isAliveText.inputEnabled = true;
	isAliveText.events.onInputUp.add(setNPCLife, this);
}

function clearSelectedNPC() {
	for (var i = 0; i < npcTextList.length; i++) {
		let npc = findNPC(npcTextList[i]);
		if (npc.isAlive) {
			npcTextList[i].fill = "#000000";
		} else {
			npcTextList[i].fill = "#ff0044";
		}
	}
}

// Changes npc from alive/dead and vice versa
function setNPCLife(isAliveText) {
	if (isAliveText.text == "false") {
		isAliveText.text = "true";
		npc.isAlive = true;
		removeDeadNPC(npc);
		colorNPCName(npc);
	} else  { // if killing NPC
		isAliveText.text = "false";
		npc.isAlive = false;
		deadNPCArray.push(npc);
		colorNPCName(npc);
	}
}

// Changes the NPC's name color when alive or dead
function colorNPCName(npc) {
	let npcText = "";
	for (var i = 0; i < npcTextList.length; i++) {
		if (npcTextList[i].text == npc.name + " the " + npc.occupation) {
			npcText = npcTextList[i];
		}
	}
	if (npc.isAlive) {
		npcText.fill = "#000000";
	} else  { // if npc is dead
		npcText.fill = "#ff0044";
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
	questTextList.push(questDesc);

	//set font
	questDesc.font = "arial";
	questDesc.fontSize = 20;
	questDesc.style.wordWrap = true;
	questDesc.style.wordWrapWidth = 750;

	questDesc.inputEnabled = true;
	questDesc.events.onInputUp.add(clickQuest, this);

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

//displays the details of the quest being clicked
function clickQuest(questDesc) {
	clearSelectedQuest();
	questDesc.fill = "#f4be41";
	questDetailText.text = " ";
	isCompleteText.destroy();
	quest = findQuest(questDesc);
	questDetailText.text = "Type: " + quest.type + "\nQuest Giver: " + quest.questGiver.name + "\nIs Complete: "
	if (quest.isComplete) {
		isCompleteText = game.add.text(210, 110, "true");
	} else {
		isCompleteText = game.add.text(210, 110, "false");
	}
	isCompleteText.inputEnabled = true;
	isCompleteText.events.onInputUp.add(completeQuest, this);
}

function clearSelectedQuest() {
	for (var i = 0; i < questTextList.length; i++) {
		let quest = findQuest(questTextList[i]);
		if (!quest.isComplete) {
			questTextList[i].fill = "#000000";
		} else {
			questTextList[i].fill = "#32CD32";
		}
	}
}

// What happens when you click / complete a quest
function completeQuest(isCompleteText) {
	if (isCompleteText.text == "false") {
		isCompleteText.text = "true";
		quest.isComplete = true;
		colorQuestName(quest);
		quest.questGiver.valence = "Friendly"
	} else  { // if killing NPC
		isCompleteText.text = "false";
		quest.isComplete = false;
		colorQuestName(quest);
	}
}

function colorQuestName(quest) {
	let questText = "";
	for (var i = 0; i < questTextList.length; i++) {
		if (questTextList[i].text == quest.text) {
			questText = questTextList[i];
		}
	}
	if (quest.isComplete) {
		questText.fill = "#32CD32";
	} else  {
		questText.fill = "#000000";
	}
}

// Finds a quest based on its description
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
