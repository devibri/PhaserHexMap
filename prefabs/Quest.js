// Quest prefab

function Quest(game) {
  this.npcs = []; //array of all NPCs associated with this quest
  questTypeList = ["Faction", "Exploration", "Revenge"];
  this.questGiver = "Someone"; // The NPC giving the quest
  this.isComplete = false;

  this.type = questTypeList[Math.floor(Math.random()*questTypeList.length)];
  this.text = " "; //setQuestText(this.type);
}

Quest.prototype = Object.create(Phaser.Sprite.prototype);
Quest.prototype.constructor = Quest;


Quest.prototype.update = function() {
}
