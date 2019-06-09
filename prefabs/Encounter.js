// Encounter prefab
var tile;
var townNameList;

function Encounter(game, hex) {
  this.tile = hex;
  townNameList = ["Spindletree", "Bricksaw", "Lookout Way", "Kirith", "Asander", "Geodyne", "Valley Ridge", "Banden"];
  encounterTypeList = ["Fort", "Ruin", "Camp", "Way-station", "Construction Site", "Battlefield", "Isolated", "Sacred Ground", "Crossing", "Ancient Structure", "Natural Phenomenon", "Treasure", "Contested Area", "Natural Resource", "Gathering Place"];
  // "Monster Lair", "Wandering Monster",
  if (hex.terrain != "Town") {
    this.encounterType = encounterTypeList[Math.floor(Math.random()*encounterTypeList.length)];
    this.encounterDetails = setEncounterDetails(this.encounterType, this.tile);
  } else {
    let name = townNameList[Math.floor(Math.random()*townNameList.length)];
    this.encounterType = "Urban"
    this.encounterDetails = "You are in the town of " + name;
  }
}

Encounter.prototype = Object.create(Phaser.Sprite.prototype);
Encounter.prototype.constructor = Encounter;


Encounter.prototype.update = function() {
}

function setEncounterDetails(type, tile) {
  if (type == "Fort") {
    fortList = ["a noble", "a military leader", "a fighting order", "an adventurer"];
    return "You find a small, well-defended fort owned by " + fortList[Math.floor(Math.random()*fortList.length)];
  } else if (type == "Ruin") {
    ruinList = ["a tomb", "a dwelling", "a monument", "a castle"];
    return "You find the ruins of " + ruinList[Math.floor(Math.random()*ruinList.length)];
  }
  // else if (type == "Monster Lair") { // TODO: monster based on terrain
  //   return "some monster";
  // } else if (type == "Wandering Monster") { // TODO
  //   return "wandering monster";
  // }
  else if (type == "Camp") {
    var camp;
    if (tile.terrain == "Swamp") {
      camp = "peat harvesters"
    } else if (tile.terrain == "Desert") {
      camp = "an oasis"
    } else if (tile.terrain == "Fields") {
      camp = "a cluster of farms"
    } else if (tile.terrain == "Forest") {
      camp = "a logging camp"
    } else if (tile.terrain == "Hills" || tile.terrain == "Mountains") {
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
    return "You find a way-station for " + constructionList[Math.floor(Math.random()*constructionList.length)]
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
  } else if (type == "Ancient Structure") {
    structureList = ["tomb", "statue", "shrine"];
    return "You find an ancient " + structureList[Math.floor(Math.random()*structureList.length)]
  } else if (type == "Natural Phenomenon") {
    phenomList = ["poisonous", "flooded", "unstable", "diseased"];
    return "The land here is " + phenomList[Math.floor(Math.random()*phenomList.length)]
  } else if (type == "Treasure") {
    return "There is rumored to be treasure here"
  } else if (type == "Contested Area") {
    contestedList = ["valuable resources", "abundant food", "strategic location", "religious significance"];
    return "Several factions are fighting here because of the land's " + contestedList[Math.floor(Math.random()*contestedList.length)]
  } else if (type == "Natural Resource") {
    contestedList = ["rare herbs", "rare gems", "gold"];
    return "You find a valuable source of " + contestedList[Math.floor(Math.random()*contestedList.length)]
  } else if (type == "Gathering Place") {
    gatheringList = ["various tribal leaders", "free traders", "pilgrims"];
    return "There is a gathering place here for " + gatheringList[Math.floor(Math.random()*gatheringList.length)]
  } else { //some generic type of encounter -- should not happen as-is
    return "There are no encounters";
  }
}
