// NPC prefab

// Names taken from https://donjon.bin.sh/fantasy/name/
// Occupations taken from https://www.dandwiki.com/wiki/MSRD:Occupations

var nameList;

function Npc(game) {
	nameList = ["Bertio","Vyncent Gylley","Beorhtio","Dene","Wealde","Balde","Geoffrey","Ander Ferray","Johny","Aererth","Helmund","Landa","Edward Ilif","Reyny","Johny Masav","Hulfa","Ceolfre","Gilip Awews","Gyles Kelley","Phileon","Jane","Wynna","Alil Ginte","Auciet Rynge","Eomen","Wrthese","Balda","Alyn","Esad","Atrix","Enged","Alyn","Joane","Hilda","Jane Mynge","Ride Nysalt","Kathon","Belia","Thilda","Sunna"];
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
