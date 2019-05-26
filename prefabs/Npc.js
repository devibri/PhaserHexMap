// NPC prefab

var nameList;

function Npc(game, name) {
	occupationList = ["Chef","Blacksmith","Colonist","Adventurer","Sellsword","Trader","Fisherperson","Politician","Guard","Bartender","Innkeeper","Bodyguard","Spy","Soldier","Baker"]
	//NPC stats
	this.name = name;

	this.occupation = occupationList[Math.floor(Math.random()*occupationList.length)];;
	this.isAlive = true;
}

Npc.prototype = Object.create(Phaser.Sprite.prototype);
Npc.prototype.constructor = Npc;

// override Phaser.Sprite updated
Npc.prototype.update = function() {
}
