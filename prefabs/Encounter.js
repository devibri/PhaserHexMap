// Encounter prefab
var tile;

function Encounter(game, hex) {
  this.tile = hex;

  encounterTypeList = ["Fort", "Ruin", "Monster Lair", "Wandering Monster", "Camp", "Way-station", "Construction Site", "Battlefield", "Isolated", "Sacred Ground", "Crossing", "Ancient Structure", "Natural Phenomenon", "Treasure", "Contested Area", "Natural Resource", "Supernatural Feature", "Gathering Place"];
  this.encounterType = encounterTypeList[Math.floor(Math.random()*encounterTypeList.length)];
  this.encounterDetails = setEncounterDetails(this.encounterType);
}

Encounter.prototype = Object.create(Phaser.Sprite.prototype);
Encounter.prototype.constructor = Encounter;


Encounter.prototype.update = function() {
}

function setEncounterDetails(type) {
  if (type == "Fort") {
    fortList = ["a noble", "a military leader", "a fighting order", "an adventurer"];
    return "You find a small, well-defended fort owned by " + fortList[Math.floor(Math.random()*fortList.length)];
  } else if (type == "Ruin") {
    if (this.tile.terrain == "Water") {
      return "You find a shipwreck."
    } else {
      ruinList = ["a tomb", "a dwelling", "a monument", "a castle"];
      return "You find the ruins of " + ruinList[Math.floor(Math.random()*ruinList.length)];
    }
  } else if (type == "Monster Lair") { // TODO: monster based on terrain
    return "some monster";
  } else if (type == "Wandering Monster") { // TODO
    return "wandering monster";
  } else if (type == "Camp") {
    var camp;
    if (this.tile.terrain == "Water") {
      camp = "a fishery";
    } else if (this.tile.terrain == "Swamp") {
      camp = "peat harvesters"
    } else if (this.tile.terrain == "Desert") {
      camp = "an oasis"
    } else if (this.tile.terrain == "Fields") {
      camp = "a cluster of farms"
    } else if (this.tile.terrain == "Forest") {
      camp = "a logging camp"
    } else if (this.tile.terrain == "Hills" || this.tile.terrain == "Mountains") {
      camp = "a mining camp"
    } else {
      camp = "an adventurers' camp"
    }
    return "You find " + camp
  } else if (type == "Way-station") {
    stationList = ["trappers", "hunters", "ranchers", "messengers"];
    return "You find a way-station for " + stationList[Math.floor(Math.random()*stationList.length)]
  } else if (type == "Construction Site") {
    constructionList = ["trappers", "hunters", "ranchers", "messengers"];
    return "You find a way-station for " + constructionList[Math.floor(Math.random()*stationList.length)]
  } else if (type == "Battlefield") {
    return "You find a battlefield strewn with the remains of a long-ago fight." //TODO add faction implementation
  } else if (type == "Isolated") {
    isolatedList = ["a hermit", "a mad hermit", "an oracle", "a retired adventurer", "an outlaw", "a homesteader"];
    return "You find a lonely dwelling belonging to " + isolatedList[Math.floor(Math.random()*isolatedList.length)]
  } else if (type == "Sacred Ground") {
    sacredList = ["a temple", "burial grounds", "consecrated ground"];
    return "You find a holy site, designated as " + sacredList[Math.floor(Math.random()*sacredList.length)]
  } else if (type == "Crossing")  { //TODO: Make terrain-specific
    crossingList = ["The road ahead is blockaded by fallen trees", "A chasm crosses the land, with only a shaky bridge between one side and the other"];
    return crossingList[Math.floor(Math.random()*crossingList.length)]
  } else { //some generic type of encounter -- should not happen as-is
    return "There are no encounters";
  }
}
