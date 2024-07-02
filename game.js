var colours = ["green", "red", "yellow", "blue"]; 
var sounds = ["sounds/green.mp3", "sounds/red.mp3", "sounds/yellow.mp3", "sounds/blue.mp3"];
var level = 1; 
var sequence = [];
var player = [];
var started = false;
var index =0; 

$(document).keydown(function() 
{
    if(started==false)
    { 
        generate();
        started=true;
    }
}); 

function generate()
{
    $("#level-title").text("Level " + level);
    level++;
    var random = Math.floor(Math.random()*4);
    sequence.push(colours[random]);
    var a = new Audio(sounds[random]);
    a.play();
    var b = "#" + colours[random];
    $(b).fadeOut(125).fadeIn(150);

    player.length=0;
    index=0;
}

$(".btn").click(function()
{
    var button_clicked_colour = $(this).attr("id");

    //click animation
    $("#"+button_clicked_colour).addClass("pressed");
    setTimeout(function(){
    $("#"+button_clicked_colour).removeClass("pressed");},100);

    //play audio
    let x = new Audio("sounds/" + button_clicked_colour + ".mp3") 
    x.play();

    player.push(button_clicked_colour);
   
    if(player.length > sequence.length)
    gameOver();
    else
    {
        if(player[index]!=sequence[index])
        {
            started = false;
            gameOver();
        }
        else
        index++;
    }

    if(player.length == sequence.length)
    {
        if(started)
        setTimeout(function(){generate();},700);
    }

});

function gameOver()
{
    $("#level-title").text("Game Over! Press any key to restart.");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},250);
    
    let x = new Audio("sounds/wrong.mp3");
    x.play();
    
    sequence.length=0;
    player.length=0;
    level=1;
    index=0;
    started=false;
}

// For the Instructions Tab : 
$("#openInstructions").click(function()
{
    $("#tab").addClass("opentab");
});

$("#closeInstructions").click(function()
{
      $("#tab").removeClass("opentab");
});
