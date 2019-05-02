// debug ENFORCEMENT
'use strict';

var game = new Phaser.Game(600, 800, Phaser.AUTO);

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
//
// var MainMenu = function(game) {};
// MainMenu.prototype = {
// 	preload: function() {
// 		// preload assets
// 		// game.load.path = 'assets/img/';
// 		// game.load.image('sky', 'sky.png');
// 	  //   game.load.image('ground', 'platform.png');
// 	  //   game.load.image('star', 'star.png');
// 	  //   game.load.image('diamond', 'diamond.png');
// 	  //   game.load.image('snowflake', 'snowflake.png');
// 		// 	game.load.image('hexagon', 'hexagon.png');
// 	  //   game.load.spritesheet('dude', 'dude.png', 32, 48);
// 	  //   game.load.spritesheet('baddie', 'baddie.png', 32, 32);
// 	  //   game.load.path = 'assets/audio/';
// 	  //   game.load.audio('pop', ['pop01.mp3']);
// 	},
// 	create: function() {
// 		game.stage.backgroundColor = "#0044AA";
// 		game.add.text(10,10, 'Star Catch Game', style);
// 		game.add.text(10,50, 'Use Arrow Keys to Move', style);
// 		game.add.text(10,90, 'Press [Space] to Start', style);
// 	},
// 	update: function() {
// 		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
// 			game.state.start('Play');
// 		}
// 	}
// };

var Play = function(game) {
	this.diamond = null;
	this.score = null;
};
Play.prototype = {
	preload: function() {
		game.load.path = 'assets/img/';
		game.load.image('hexagon', 'hexagon.png');

	},
	create: function() {
		this.score = 0;
		// spin up physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    // add sky
	    game.add.sprite(0, 0, 'sky');

	    //  create platforms group
	    platforms = game.add.group();
	    platforms.enableBody = true;
	    var ground = platforms.create(0, game.world.height - 64, 'ground');
	    ground.scale.setTo(2, 2);
	    ground.body.immovable = true;

	    //  create ledges
	    var ledge = platforms.create(450, 350, 'ground');
	    ledge.body.immovable = true;

	    ledge = platforms.create(-250, 250, 'ground');
	    ledge.body.immovable = true;

	    ledge = platforms.create(-150, 450, 'ground');
	    ledge.body.immovable = true;

	    ledge = platforms.create(350, 550, 'ground');
	    ledge.body.immovable = true;

	    // The player and its settings
	    player = game.add.sprite(32, game.world.height - 150, 'dude');
	    game.physics.arcade.enable(player);
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    //  add player animations
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    //baddies
	    enemy1 = game.add.sprite(300,0,'baddie');
	    enemy2 = game.add.sprite(375,0,'baddie');
	    game.physics.arcade.enable(enemy1);
	    game.physics.arcade.enable(enemy2);
	    enemy1.body.gravity.y = 300;
	    enemy2.body.gravity.y = 300;
	    enemy1.animations.add('left', [0,1], 10, true);
	    enemy2.animations.add('right', [2,3], 10, true);

	    // diamond
	    this.diamond = game.add.sprite(400, 250, 'diamond');
	    game.physics.arcade.enable(this.diamond);

	    //  make stars in a group
	    stars = game.add.group();
	    stars.enableBody = true;
	    for (var i = 0; i < 12; i++) {
	        //  Create a star inside of the 'stars' group
	        var star = stars.create(i * 50, 0, 'star');
	        star.body.gravity.y = 300;
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }

	    // create snow flurries
	    for(let i=0; i<100; i++) {
	    	let flake = new Hexagon(game, 'hexagon');
	    	game.add.existing(flake);
	    }

	    // add audio
	    this.pop = game.add.audio('pop');

	    //  display score
	    scoreText = game.add.text(16, 16, 'Score: 0', style);

	    //  enable cursor controls
	    cursors = game.input.keyboard.createCursorKeys();
	},
	update: function() {
		// run game loop
		//  Collide the player and the stars with the platforms
	    var hitPlatform = game.physics.arcade.collide(player, platforms);
	    game.physics.arcade.collide(stars, platforms);
	    game.physics.arcade.collide(enemy1, platforms);
	    game.physics.arcade.collide(enemy2, platforms);
	    game.physics.arcade.collide(enemy1, player, this.enemyCollide, null, this);
	    game.physics.arcade.collide(enemy2, player, this.enemyCollide, null, this);

	    //  star and diamond collection
	    game.physics.arcade.overlap(player, stars, this.collectStar, null, this);
	    game.physics.arcade.overlap(player, this.diamond, this.collectDiamond, null, this);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    // baddie movement
	    enemy1.animations.play('left');
	    enemy2.animations.play('right');

	    if (cursors.left.isDown){
	        //  Move to the left
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown) {
	        //  Move to the right
	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }
	    else{
	        //  Stand still
	        player.animations.stop();
			player.frame = 4;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && player.body.touching.down && hitPlatform){
	        player.body.velocity.y = -350;
	    }
	},
	collectStar(player, star) {
		// Removes the star from the screen
	    star.kill();

	    // play audio
	    this.pop.play('', 0, 1, false);

	    //  Add and update the score
	    this.score += 10;
	    scoreText.text = 'Score: ' + this.score;

	    // check if we collected the last star in the group
	    if(stars.total == 0) {
	    	game.state.start('GameOver', true, false, this.score);
	    }
	},
	collectDiamond(player, diamond) {
		// remove diamond
		diamond.kill();

		this.score += 50;
		scoreText.text = 'Score: ' + this.score;
	},
	enemyCollide() {
		this.score -= 25;
		game.state.start('GameOver', true, false, this.score);
	}
};

var GameOver = function(game) {};
GameOver.prototype = {
	init: function(score) {
		this.score = score;
	},
	create: function() {
		game.stage.backgroundColor = "#0044AA";
		game.add.text(10,10, 'Game Over', style);
		game.add.text(10,50, 'Final Score: ' + this.score, style);
		game.add.text(10,90, 'Press [Space] to Retry', style);
	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};

// define and start states
game.state.add('MainMenu', MainMenu);
game.state.add('Play', Play);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');
