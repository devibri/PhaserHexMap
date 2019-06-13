// Faction prefab

function Faction(game) {
  this.name = factionList[Math.floor(Math.random()*factionList.length)];;
  factionList = ["Imperial Army", "Mage's Guild", "Peasant Rebellion", "Druid's Circle", "Fighter's Guild", "Thieves Guild", "cultists"];
  this.valence = "Neutral"
}

Faction.prototype = Object.create(Phaser.Sprite.prototype);
Faction.prototype.constructor = Faction;


Faction.prototype.update = function() {
}
