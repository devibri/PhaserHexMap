// Location prefab

function Location(game) {
  this.name = locationList[Math.floor(Math.random()*locationList.length)];
  locationList = ["the sewers", "the farmlands", "a castle", "the river", "the town square", "the vendor's stalls"];
}

Location.prototype = Object.create(Phaser.Sprite.prototype);
Location.prototype.constructor = Location;


Location.prototype.update = function() {
}
