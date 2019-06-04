// Encounter prefab

function Quest(game) {
  this.npcs = []; //array of all NPCs associated with this quest
  questTypeList = ["Faction", "Exploration", "Revenge"];
  this.questGiver = null; // The NPC giving the quest
  this.isComplete = false;

  this.type = questTypeList[Math.floor(Math.random()*questTypeList.length)];
  this.text = setQuestText(this.type);
}

Quest.prototype = Object.create(Phaser.Sprite.prototype);
Quest.prototype.constructor = Quest;


Quest.prototype.update = function() {
}

function setQuestText(type) {
  if (type == "Faction") {
    factionQuestList = ["faction quest"];
    return factionQuestList[Math.floor(Math.random()*factionQuestList.length)];
  } else if (type == "Exploration") {
    explorationQuestList = ["exploration quest"];
    return explorationQuestList[Math.floor(Math.random()*explorationQuestList.length)];
  } else if (type == "Revenge") {
    revengeQuestList = ["revenge quest"];
    return revengeQuestList[Math.floor(Math.random()*revengeQuestList.length)];
  } else { //some generic type of quest -- should not happen
    return "There are no new quests available.";
  }
}
