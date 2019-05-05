// debug ENFORCEMENT
'use strict';

var game = new Phaser.Game(1140, 800, Phaser.AUTO);

var hexagonWidth = 70;
var hexagonHeight = 80;
var gridSizeX = 17;
var gridSizeY = 7;
var columns = [Math.ceil(gridSizeX/2),Math.floor(gridSizeX/2)];
var moveIndex;
var sectorWidth = hexagonWidth;
var sectorHeight = hexagonHeight/4*3;
var gradient = (hexagonHeight/4)/(hexagonWidth/2);
var marker;
var hexagonGroup;
var hexagonArray = [];
var hexX;
var hexY;
var tileText;
var button;

var Play = function(game) {

};

Play.prototype = {
	preload: function() {
		game.load.image("hexagon", "img/hexagon.png");
		game.load.image("hexagon_selected", "img/hexagon-selected.png");
		game.load.image("hexagon_generated", "img/hexagon-filled.png");
		game.load.image("marker", "img/marker.png");
		game.load.image("button", "img/button_generate.png");
	},
	create: function() {
		tileText = game.add.text(40, 100, "Terrain: [unknown]\nQuests: [unknown]\nLocations: [unknown]");
		tileText.font = "arial";
		tileText.fontSize = 24;

		hexagonGroup = game.add.group();
		game.stage.backgroundColor = "#ffffff"
		for(var i = 0; i < gridSizeY/2; i ++){
			hexagonArray[i] = [];
			for(var j = 0; j < gridSizeX; j ++){
				if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
					var hexagonX = hexagonWidth*j/2;
					var hexagonY = hexagonHeight*i*1.5+(hexagonHeight/4*3)*(j%2);
					let hexagon = new Hexagon(this.game, 'hexagon', hexagonX, hexagonY);
					game.add.existing(hexagon);
					//var hexagon = game.add.sprite(hexagonX,hexagonY,"hexagon");
					hexagonGroup.add(hexagon);
					hexagonArray[i][j] = hexagon;
					var hexagonText = game.add.text(hexagonX+hexagonWidth/3+5,hexagonY+15,i+","+j);
					hexagonText.font = "arial";
					hexagonText.fontSize = 12;
					hexagonGroup.add(hexagonText);
				}
			}
		}
		hexagonGroup.x = (game.width-hexagonWidth*Math.ceil(gridSizeX/2))/2;
		if(gridSizeX%2==0){
			hexagonGroup.x-=hexagonWidth/4;
		}
		hexagonGroup.y = (game.height-Math.ceil(gridSizeY/2)*hexagonHeight-Math.floor(gridSizeY/2)*hexagonHeight/2)/2;
		if(gridSizeY%2==0){
			hexagonGroup.y-=hexagonHeight/8;
		}
		marker = game.add.sprite(0,0,"marker");
		marker.anchor.setTo(0.5);
		marker.visible=false;
		hexagonGroup.add(marker);
		// on hover
		moveIndex = game.input.addMoveCallback(this.hoverHex, this);
		// on click
		game.input.onDown.add(this.selectHex, this);
	},

	update: function() {

	},

	hoverHex() {
		this.checkHex();
		this.tintHex(hexX, hexY);
	},

	selectHex() {
		this.checkHex();
		this.colorHex(hexX, hexY);
		this.displayHexText(hexX, hexY);
	},

	// determines which hex user is interacting with
	checkHex() {
		var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
		var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
		var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
		var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
		if(candidateY%2==0){
			if(deltaY<((hexagonHeight/4)-deltaX*gradient)){
				candidateX--;
				candidateY--;
			}
			if(deltaY<((-hexagonHeight/4)+deltaX*gradient)){
				candidateY--;
			}
		}
		else{
			if(deltaX>=hexagonWidth/2){
				if(deltaY<(hexagonHeight/2-deltaX*gradient)){
					candidateY--;
				}
			}
			else{
				if(deltaY<deltaX*gradient){
					candidateY--;
				}
				else{
					candidateX--;
				}
			}
		}
		hexX = candidateX;
		hexY = candidateY;
	},

	// changes the color of the hex on hover
	tintHex(posX,posY){
		// clear the other hexes
		for(var i = 0; i < gridSizeY/2; i ++){
			for(var j = 0; j < gridSizeX; j ++){
				if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
					hexagonArray[i][j].tint = 0xffffff;
				}
			}
		}
		// change the hovered hex color
		var markerX = posX*2+posY%2;
		var markerY = Math.floor(posY/2);
		hexagonArray[markerY][markerX].tint = 0xff8800;
	},

	// change hex color on click
	colorHex(posX,posY){
		// Clear the current selected hex color
		for(var i = 0; i < gridSizeY/2; i ++){
			for(var j = 0; j < gridSizeX; j ++){
				if(gridSizeY%2==0 || i+1<gridSizeY/2 || j%2==0){
					if (hexagonArray[i][j].isGenerated) {
						hexagonArray[i][j].loadTexture('hexagon_generated', 0);
					} else {
						hexagonArray[i][j].loadTexture('hexagon', 0);
					}
				}
			}
		}

		// change the hex color
		var markerX = posX*2+posY%2;
		var markerY = Math.floor(posY/2);
		hexagonArray[markerY][markerX].loadTexture('hexagon_selected', 0);
	},

	// Show the text of the currently selected hex
	displayHexText() {
		// TODO: Clear the current text
		tileText.text = "";

		// Place current selected tile's text
		if (this.generated) {
			tileText.text = "Terrain: " + this.terrain + "\nQuests: " + this.quests + "\nLocations: " + this.locations;
		} else {

			// button = game.add.button(40, 400, 'button', this.actionOnGenerate, this);
		}
	},

	// on clicking the generate button
	actionOnGenerate() {
		this.generated = true;

		// change the hex color to generated color
		this.loadTexture('hexagon_generated', 0);

		// generate and set the field values
		this.terrain = "forest";
		this.quests = "no quests here";
		this.locations = "a cave, a stream";

		// update the text on the screen
		this.tileText.text = "Terrain: " + this.terrain + "\nQuests: " + this.quests + "\nLocations: " + this.locations;
	}
};


// define and start states
game.state.add('Play', Play);
game.state.start('Play');
