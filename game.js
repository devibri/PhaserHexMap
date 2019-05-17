// Manages the main game state

// List of terrain types taken from: http://www.welshpiper.com/hex-based-campaign-design-part-1/
// List of encounter types taken from: https://www.welshpiper.com/hex-based-campaign-design-part-2/

var game = new Phaser.Game(1200, 800, Phaser.AUTO);
var hexagonWidth = 80;
var hexagonHeight = 70;
var gridSizeX = 10;
var gridSizeY = 12;
var columns = [Math.ceil(gridSizeY/2),Math.floor(gridSizeY/2)];
var moveIndex;
var sectorWidth = hexagonWidth/4*3;
var sectorHeight = hexagonHeight;
var gradient = (hexagonWidth/4)/(hexagonHeight/2);
var marker;
var hexagonGroup;
var hexagonArray = [];
var hex;
var terrainArray = [];

var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.image("hexagon", "img/hexagon.png");
		game.load.image("hexagon_selected", "img/hexagon-selected.png");
		game.load.image("hexagon_generated", "img/hexagon-filled.png");
		game.load.image("hexagon_desert", "img/hexagon-desert.png");
		game.load.image("hexagon_forest", "img/hexagon-forest.png");
		game.load.image("hexagon_hills", "img/hexagon-hills.png");
		game.load.image("hexagon_mountains", "img/hexagon-mountain.png");
		game.load.image("hexagon_water", "img/hexagon-ocean.png");
		game.load.image("hexagon_fields", "img/hexagon-plains.png");
		game.load.image("hexagon_swamp", "img/hexagon-swamp.png");
		game.load.image("hexagon_town", "img/hexagon-town.png");
		game.load.image("marker", "img/marker.png");
		game.load.image("button", "img/button_generate.png");
	},
	create: function() {
		// Define tile text
		tileText = game.add.text(40, 100, "");
		tileText.font = "arial";
		tileText.fontSize = 24;
		tileText.style.wordWrap = true;
		tileText.style.wordWrapWidth = 250;

		// Define types of tiles
		terrainArray = ["Swamp", "Desert", "Fields", "Forest", "Hills", "Mountains", "Town"];

		encountersArray = ["Settlement", "Fort", "Ruin", "Monster Lair", "Wandering Monster", "Camp", "Way-station", "Construction Site", "Battlefield", "Isolated", "Sacred Ground", "Crossing", "Ancient Structure", "Natural Phenomenon", "Treasure", "Contested Area", "Natural Resource", "Supernatural Feature", "Gathering Place"]


		//
		// questArraySwamp = [
		// 	"Swarms of insects surround the party, biting at your arms and legs...",
		// 	"As you wander a small area of the swamp, you start to realize it is sinking...",
		// 	"You meet a witch in the woods named {charName} who wants you to find some ingredients...",
		// 	"Something strange and shiny is laying at the bottom of a lake you find...",
		// 	"Some say that these swamps were the site of sunken treasure. Those who have gone diving for it have never returned..."
		// ];
		//
		// questArrayDesert = [
		// 	"Sand swirls up around you in a strange way, almost as if imbued with some kind of power. It shifts into a strange living form...",
		// 	"You find ancient ruins among the sands, the remnants of some long-forgotten desert people...",
		// 	"There is a hole deep in the sands here. Perhaps it is the burrow of some giant animal? Perhaps it holds treasure...",
		// 	"The sun beats down on the party, hot and heavy. Fortunately it seems like there is an oasis just ahead...",
		// 	"You see a group of {desertCreature}s out patrolling the desert..."
		// ];
		//
		//
		// questArrayPlains = [
		// 	"The grass here grows taller than even the tallest of your heads. As you wander, you hear noises behind you..."
		// ];

		hexagonGroup = game.add.group();
		game.stage.backgroundColor = "#ffffff"
		for(var i = 0; i < gridSizeX/2; i ++){
			hexagonArray[i] = [];
			for(var j = 0; j < gridSizeY; j ++){
				if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
					var hexagonX = hexagonWidth*i*1.5+(hexagonWidth/4*3)*(j%2);
					var hexagonY = hexagonHeight*j/2;
					var hexagon = new Hexagon(this.game, 'hexagon', hexagonX, hexagonY);
					//var hexagon = game.add.sprite(hexagonX,hexagonY,"hexagon");
					hexagonGroup.add(hexagon);
					hexagonArray[i][j]=hexagon;
					var hexagonText = game.add.text(hexagonX+hexagonWidth/4+5,hexagonY+5,i+","+j);
					hexagonText.font = "arial";
					hexagonText.fontSize = 12;
					hexagonGroup.add(hexagonText);
				}
			}
		}
		hexagonGroup.y = (game.height-hexagonHeight*Math.ceil(gridSizeY/2))/2;
		if(gridSizeY%2==0){
			hexagonGroup.y-=hexagonHeight/4;
		}
		hexagonGroup.x = (game.width-Math.ceil(gridSizeX/2)*hexagonWidth-Math.floor(gridSizeX/2)*hexagonWidth/2)/2;
		if(gridSizeX%2==0){
			hexagonGroup.x-=hexagonWidth/8;
		}
		marker = game.add.sprite(0,0,"marker");
		marker.anchor.setTo(0.5);
		marker.visible=false;
		hexagonGroup.add(marker);
		moveIndex = game.input.addMoveCallback(checkHex, this);
		game.input.onDown.add(checkClickedHex, this);
	}
};


function checkHex(){
	var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
	var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
	var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
	var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
	if(candidateX%2==0){
		if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
			candidateX--;
			candidateY--;
		}
		if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
			candidateX--;
		}
	}
	else{
		if(deltaY>=hexagonHeight/2){
			if(deltaX<(hexagonWidth/2-deltaY*gradient)){
				candidateX--;
			}
		}
		else{
			if(deltaX<deltaY*gradient){
				candidateX--;
			}
			else{
				candidateY--;
			}
		}
	}
	placeMarker(candidateX,candidateY);
}


function checkClickedHex(){
	var candidateX = Math.floor((game.input.worldX-hexagonGroup.x)/sectorWidth);
	var candidateY = Math.floor((game.input.worldY-hexagonGroup.y)/sectorHeight);
	var deltaX = (game.input.worldX-hexagonGroup.x)%sectorWidth;
	var deltaY = (game.input.worldY-hexagonGroup.y)%sectorHeight;
	if(candidateX%2==0){
		if(deltaX<((hexagonWidth/4)-deltaY*gradient)){
			candidateX--;
			candidateY--;
		}
		if(deltaX<((-hexagonWidth/4)+deltaY*gradient)){
			candidateX--;
		}
	}
	else{
		if(deltaY>=hexagonHeight/2){
			if(deltaX<(hexagonWidth/2-deltaY*gradient)){
				candidateX--;
			}
		}
		else{
			if(deltaX<deltaY*gradient){
				candidateX--;
			}
			else{
				candidateY--;
			}
		}
	}
	colorHex(candidateX,candidateY);
}

function placeMarker(posX,posY){
//	marker.visible=true;
	for(var i = 0; i < gridSizeX/2; i ++){
		for(var j = 0; j < gridSizeY; j ++){
			if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
				hexagonArray[i][j].tint = 0xffffff;
			}
		}
	}
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
		marker.visible=false;
	}
	else{
		marker.x = hexagonWidth/4*3*posX+hexagonWidth/2;
		marker.y = hexagonHeight*posY;
		if(posX%2==0){
			marker.y += hexagonHeight/2;
		}
		else{
			marker.y += hexagonHeight;
		}
		var markerX = Math.floor(posX/2);
		var markerY = posY*2+posX%2;
		hexagonArray[markerX][markerY].tint = 0xff8800;
		// up
		if(markerY-2>=0){
			//hexagonArray[markerX][markerY-2].tint = 0xff0000;
		}
		// down
		if(markerY+2<gridSizeY){
			//hexagonArray[markerX][markerY+2].tint = 0xff0000;
		}
		// right
		if(markerX+markerY%2<gridSizeX/2 && (gridSizeX%2==0 || markerX<Math.floor(gridSizeX/2))){
			//up
			if(markerY-1>=0){
				//hexagonArray[markerX+markerY%2][markerY-1].tint = 0xff0000;
			}
			// down
			if(markerY+1<gridSizeY){
				//hexagonArray[markerX+markerY%2][markerY+1].tint = 0xff0000;
			}
		}
		// left
		if(markerX-1+markerY%2>=0){
			// up
			if(markerY-1>=0){
				//hexagonArray[markerX-1+markerY%2][markerY-1].tint = 0xff0000;
			}
			// down
			if(markerY+1<gridSizeY){
				//hexagonArray[markerX-1+markerY%2][markerY+1].tint = 0xff0000;
			}
		}
	}
}

function colorHex(posX,posY){
	for(var i = 0; i < gridSizeX/2; i ++){
		for(var j = 0; j < gridSizeY; j ++){
			if(gridSizeX%2==0 || i+1<gridSizeX/2 || j%2==0){
				hexagonArray[i][j].tint = 0xffffff;
				if (hexagonArray[i][j].isGenerated) {
					if (hexagonArray[i][j].terrain == "Water") {
						hexagonArray[i][j].loadTexture('hexagon_water', 0);
					} else if (hexagonArray[i][j].terrain == "Swamp") {
						hexagonArray[i][j].loadTexture('hexagon_swamp', 0);
					} else if (hexagonArray[i][j].terrain == "Desert") {
						hexagonArray[i][j].loadTexture('hexagon_desert', 0);
					} else if (hexagonArray[i][j].terrain == "Fields") {
						hexagonArray[i][j].loadTexture('hexagon_fields', 0);
					} else if (hexagonArray[i][j].terrain == "Forest") {
						hexagonArray[i][j].loadTexture('hexagon_forest', 0);
					} else if (hexagonArray[i][j].terrain == "Hills") {
						hexagonArray[i][j].loadTexture('hexagon_hills', 0);
					} else if (hexagonArray[i][j].terrain == "Mountains") {
						hexagonArray[i][j].loadTexture('hexagon_mountains', 0);
					} else if (hexagonArray[i][j].terrain == "Town") {
						hexagonArray[i][j].loadTexture('hexagon_town', 0);
					} else {
						hexagonArray[i][j].loadTexture('hexagon_generated', 0);
					}
				} else {
					hexagonArray[i][j].loadTexture('hexagon', 0);
				}
			}
		}
	}
	if(posX<0 || posY<0 || posX>=gridSizeX || posY>columns[posX%2]-1){
		marker.visible=false;
	}
	else{
		marker.x = hexagonWidth/4*3*posX+hexagonWidth/2;
		marker.y = hexagonHeight*posY;
		if(posX%2==0){
			marker.y += hexagonHeight/2;
		}
		else{
			marker.y += hexagonHeight;
		}
		var markerX = Math.floor(posX/2);
		var markerY = posY*2+posX%2;
		var selectedHex = hexagonArray[markerX][markerY];
		selectedHex.loadTexture('hexagon_selected', 0);
		hex = selectedHex;
		if (selectedHex.isGenerated) {
			tileText.text = hex.tileText;
		} else {
			tileText.text = "[Not yet generated]";
			button = game.add.button(300, 100, 'button', actionOnGenerate, this);
		}
	}
}

function actionOnGenerate() {
	hex.isGenerated = true;

	var terrain = terrainArray[Math.floor(Math.random()*terrainArray.length)];
	var encounter = encountersArray[Math.floor(Math.random()*encountersArray.length)];
	var npc = new Npc(this.game);

	// change the hex color to generated color
	if (terrain == "Water") {
		hex.loadTexture('hexagon_water', 0);
	} else if (terrain == "Swamp") {
		hex.loadTexture('hexagon_swamp', 0);
	} else if (terrain == "Desert") {
		hex.loadTexture('hexagon_desert', 0);
	} else if (terrain == "Fields") {
		hex.loadTexture('hexagon_fields', 0);
	} else if (terrain == "Forest") {
		hex.loadTexture('hexagon_forest', 0);
	} else if (terrain == "Hills") {
		hex.loadTexture('hexagon_hills', 0);
	} else if (terrain == "Mountains") {
		hex.loadTexture('hexagon_mountains', 0);
	} else if (terrain == "Town") {
		hex.loadTexture('hexagon_town', 0);
	} else {
		hex.loadTexture('hexagon_generated', 0);
	}

	// generate and set the field values
	hex.terrain = terrain;
	hex.encounters = encounter;
	hex.npcs = npc;

	// update the text on the screen
	hex.tileText = "Terrain: " + hex.terrain + "\nEncounters: " + hex.encounters + "\nNPCs: " + hex.npcs.name + " the " + hex.npcs.occupation;
	tileText.text = hex.tileText;
}

// define and start states
game.state.add('Play', Play);
game.state.start('Play');
