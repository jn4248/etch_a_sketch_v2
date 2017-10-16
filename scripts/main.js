

$(document).ready(function() {

  let mouseStillDown = false;
  let eraseOn = false;

  const gridSize = 10;


  // Build Grid system of tiles to draw with
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let newTile = $('<div></div>').addClass('tile');
      if (col === 0) {
        newTile.addClass('left-tile');
      }
      $('.tiles-container').append(newTile);
    }
  }



  // button to toggle "erase" on/off
  $('.eraseButton').mousedown(function() {
    if (eraseOn === true) {
      eraseOn = false;
    } else {
      eraseOn = true;
    }
    console.log("erase: " + eraseOn);
  });


  function drawOnTile(currentTile) {
    // erase tile if erase button is activated
    if ((eraseOn === true) && (currentTile.hasClass('highlighted') === true)) {
      currentTile.removeClass('highlighted');
      console.log("tile erased.  eraseOn:" + eraseOn);
    }
    // highlight tile if erase button is not activated
    if ((eraseOn === false) && (currentTile.hasClass('highlighted') === false)) {
      currentTile.addClass('highlighted');
      console.log("tile Highlighted.  eraseOn:" + eraseOn);
    }
  }

  // draw by either "highlighting" or "erasing" when clicking a tile
  $('.tile').mousedown(function() {
    mouseStillDown = true;
    console.log("M-down  ---  mouseStillDown: " + mouseStillDown);
    curTile = $(this);
    drawOnTile(curTile);
  });

  $(document).mouseup(function() {
    mouseStillDown = false;
    console.log("M-UP    ---  mouseStillDown: " + mouseStillDown);
  });

  $('.tile').mouseenter(function() {
    if (mouseStillDown) {
      console.log("M-enter -- mouseStillDown: " + mouseStillDown + "   eraseOn: " + eraseOn);
      drawOnTile($(this));
    }
  });


});  //end of ready()


/////////////////////////////////////////////////////////////////////
// EXTRA CODE REMNANTS - tried and no longer using
/////////////////////////////////////////////////////////////////////

/*
$('.tile').hover(
  function() {
    if (eraseOn === false) {
      $(this).addClass('highlighted');
    } else {
      $(this).removeClass('highlighted');
    }
  }, function() {
    if (eraseOn === false) {
      $(this).addClass('highlighted');
    } else {
      $(this).removeClass('highlighted');
    }
  }
);
*/

/////////////////////////////////////////////////////////////////////
