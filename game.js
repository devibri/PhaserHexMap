// Manages the main game state

var game = new Phaser.Game(1140, 800, Phaser.AUTO);
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
		game.load.image("hexagon", "hexagon.png");
		game.load.image("hexagon_selected", "hexagon-selected.png");
		game.load.image("hexagon_generated", "hexagon-filled.png");
		game.load.image("hexagon_desert", "hexagon-desert.png");
		game.load.image("hexagon_forest", "hexagon-forest.png");
		game.load.image("hexagon_hills", "hexagon-hills.png");
		game.load.image("hexagon_mountains", "hexagon-mountain.png");
		game.load.image("hexagon_water", "hexagon-ocean.png");
		game.load.image("hexagon_fields", "hexagon-plains.png");
		game.load.image("hexagon_swamp", "hexagon-swamp.png");
		game.load.image("hexagon_town", "hexagon-town.png");
		game.load.image("marker", "marker.png");
		game.load.image("button", "button_generate.png");
	},
	create: function() {
		// Define tile text
		tileText = game.add.text(40, 100, "");
		tileText.font = "arial";
		tileText.fontSize = 24;

		// Define types of tiles
		terrainArray = ["Water", "Swamp", "Desert", "Fields", "Forest", "Hills", "Mountains", "Town"];


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
			tileText.text = "Terrain: " + selectedHex.terrain + "\nQuests: " + selectedHex.quests + "\nLocations: " + selectedHex.locations;
		} else {
			tileText.text = "Terrain: [unknown]\nQuests: [unknown]\nLocations: [unknown]";
			button = game.add.button(40, 400, 'button', actionOnGenerate, this);
		}
	}
}

function actionOnGenerate() {
		hex.isGenerated = true;


		var terrain = terrainArray[Math.floor(Math.random()*terrainArray.length)];


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
		hex.quests = "no quests here";
		hex.locations = "a cave, a stream";

		// update the text on the screen
		tileText.text = "Terrain: " + hex.terrain + "\nQuests: " + hex.quests + "\nLocations: " + hex.locations;
	}

// define and start states
game.state.add('Play', Play);
game.state.start('Play');
