// Encounter prefab

function Quest(game) {
  this.npcs = []; //array of all NPCs associated with this quest
  questTypeList = ["Faction", "Exploration", "Revenge"];
  this.questGiver = null; // The NPC giving the quest
  this.questType = questTypeList[Math.floor(Math.random()*questTypeList.length)];
  this.questText = setQuestText(this.questType);
}

Quest.prototype = Object.create(Phaser.Sprite.prototype);
Quest.prototype.constructor = Quest;


Quest.prototype.update = function() {
}

function setQuestText(type) {
  if (type == "Faction") {
    factionQuestList = [];
    return factionQuestList[Math.floor(Math.random()*factionQuestList.length)];
  } else if (type == "Exploration") {
    explorationQuestList = [];
    return explorationQuestList[Math.floor(Math.random()*explorationQuestList.length)];
  } else if (type == "Revenge") {
    revengeQuestList = [];
    return revengeQuestList[Math.floor(Math.random()*revengeQuestList.length)];
  } else { //some generic type of quest -- should not happen
    return "There are no new quests available.";
  }
}
