class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
   
    question.hide();

    background("yellow")

    textSize(25);
    stroke("BLUE")
    text("Resultado del Cuestionario", 350,50);

    Contestant.getPlayerInfo();

    if(allContestants !== undefined){
      
    fill("Blue");
    textSize(20);
    text("**NOTA: ¡El consursante que respondió correctamente, está resaltado en color verde",50,230);
    
    }
    
    for(var plr in allContestants){
  
    var correctAns = "2";
    
    if(correctAns  === allContestants[plr].answer){
      console.log(allContestants);
      textSize(15);
      fill("green");
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,280) 
       }else{
      fill("red");
      text(allContestants[plr].name + ": " + allContestants[plr].answer, 120,300)
    }
  
    }
 
  }

}

