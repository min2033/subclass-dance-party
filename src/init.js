$(document).ready(function(){
  window.dancers = [];
  var oldpositions = [];

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
    oldpositions.push([dancer.top, dancer.left]);
  });


  var linedup = false;

  $(".lineUpButton").on("click", function(event){
    if (linedup){
      for (var i=0; i<window.dancers.length; i++){
        window.dancers[i].setPosition(oldpositions[i][0], oldpositions[i][1]);
      }
      linedup = false;
    } else {
      for (var i = 0; i < window.dancers.length; i++){
        window.dancers[i].setPosition(window.innerHeight/2,100+i*50);
      }
      linedup = true;
    }
  });

  $("body").on('mouseenter','.slowD',function(){
    $(this).fadeOut();
  });

  var colliderCheck = function(){
    // iterate each one
    for(var i=0;i<window.dancers.length;i++){
      //check for any close ones
      var node = window.dancers[i];
      //look thru other nodes
      for(var j=0;j < window.dancers.length;j++){
        var other = window.dancers[j];

        //if close
        if(other && j !== i){
          if(Math.abs(node.top - other.top) < 200 || Math.abs(node.left - other.left) < 200){
        }
        // move around
          node.setPosition(node.top-100,node.left-100);
          other.setPosition(other.top+100,other.left+100);
        }
      }
    }
  };

  setInterval(colliderCheck,500);


});

