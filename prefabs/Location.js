// Location prefab
var locationList;

function Location(game) {
  locationList = ["the sewers", "the farmlands", "the castle", "the river", "the town square", "the vendor's stalls"];
  this.name = locationList[Math.floor(Math.random()*locationList.length)];
}

Location.prototype = Object.create(Phaser.Sprite.prototype);
Location.prototype.constructor = Location;


Location.prototype.update = function() {
}
