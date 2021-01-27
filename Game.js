class Game {
  constructor(){

  }
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();

    textSize(20);
    text("Game Start: ", 140, 100);

    Player.getPlayerInfo();

    var displayPosition = 120;

    if(allPlayers !== undefined){
      for(var plr in allPlayers){
        displayPosition+= 30;
        textSize(15);
        text(allPlayers[plr].name+ ": " +allPlayers[plr].distance, 120, displayPosition);

        if(plr === "player"+player.index){
          fill("red");
        }else{
          fill("black");
        }
      }
    }

    if(keyDown (UP_ARROW) && player.index !== null){
      player.distance+= 20;
      player.update();
    }
  }
}
