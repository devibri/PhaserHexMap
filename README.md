# PhaserHexMap
Making a digital prototype of a DM assistant tool

## What is this project?
I'm working on creating a digital tool to help people run tabletop RPGs. The system generates lists of quests, NPCs, and a map, and takes input from the DM about things that happen in the world in order to generate new things.

## How do I use it?

### Tab selection
Press either "World Map" or "Quest Tracker" to select one of the tools. Refresh the page (or use the orange "Refresh") button to select the other tool.

### World Map
Click a hex in order to select it. You can press "Generate" to load in a random terrain and encounter. Encounters will sometimes vary depending on the tile's terrain. You can press "Generate" again to load in a different random set, and "Generate all" to do so for the whole map. Right now terrain tiles are placed randomly in the world.

### Quest Tracker
[Note: You might have to zoom out a bit on some browsers for this to display properly]

Click "New Quest", "New NPC", or "New Location" to generate these items, which displays in a list below the button. Click a specific quest or NPC to see their details above the kind of button. You can click the "true/false" text on quest descriptions and NPCs (is Complete, and is Alive) in order to toggle quests as complete or incomplete and NPCs as dead or alive. Completed quests will be displayed in green, and dead NPCs will be displayed in red. The NPC and Locations lists will automatically update with new information when quests mention them. 

### Customize Text
You can use the included Python files to turn newline lists into arrays for inputting into the generator. For instance, if you have a list of names, occupations, or locations you want referenced, you can 

## Attribution
This project was created in Phaser. Encounters and terrain are based off of Erin Smale's [Hex-Based Campaign Design](https://www.welshpiper.com/hex-based-campaign-design-part-2/) encounter table. Terrain icons are from [Opemmoji](https://openmoji.org/). Original hex map code based on [this tutorial](https://www.emanueleferonato.com/2015/02/12/how-to-find-adjacent-tiles-in-hexagonal-maps-all-and-every-case-explained/) on finding adjacent hexes in a hex map in Phaser. 
