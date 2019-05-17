// NPC prefab

var nameList;

function Npc(game) {
	nameList = ["Rex", "Corith", "Anton", "Rizzo", "Talie", "Kara", "Symon", "Zirra", "Orin", "Parrish", "Isira"];
	occupationList = ["Chef","Blacksmith","Colonist","Adventurer","Sellsword","Trader","Fisherperson","Politician","Guard","Bartender","Innkeeper","Bodyguard","Spy","Soldier","Baker"]
	//NPC stats
	this.name = nameList[Math.floor(Math.random()*nameList.length)];
	this.occupation = occupationList[Math.floor(Math.random()*occupationList.length)];;
	this.isAlive = true;
}

Npc.prototype = Object.create(Phaser.Sprite.prototype);
Npc.prototype.constructor = Npc;

// override Phaser.Sprite updated
Npc.prototype.update = function() {
}
