

$(document).ready(function() {

  let numberRows = 50;
  let numberCols = 50;

  for (let row = 0; row < numberRows; row++) {
    for (let col = 0; col < numberCols; col++) {
      let newTile = $('<div></div>').addClass('tile');
      if (col === 0) {
        newTile.addClass('left-tile');
      }
      $('.tiles-container').append(newTile);
    }
  }

  var eraseOn = false;

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

  $('.eraseButton').mousedown(function() {
    if (eraseOn === true) {
      eraseOn = false;
    } else {
      eraseOn = true;
    }
  })


/*  function highlightTile(curTile) {
//    if (!curTile.hasClass('highlighted')) {
//    curTile.addClass('highlighted');
//  }
  curTile.addClass('highlighted');
}*/



////////////////////////////////////////////////////////////////////
/*
  let mouseStillDown = false;

  $('.tile').mousedown(function() {
    mouseStillDown = true;
    console.log("M-down");
    tile = $(this);
    traceTiles(tile);
  });

  $('document').mouseup(function() {
    mouseStillDown = false;
    console.log("M-UP");
  });

  function traceTiles(curTile) {
    if (!mouseStillDown) {
      return;
    }
    // action to do
    highlightTile(curTile);

    if (mouseStillDown) {
    //clearInterval();
    console.log("TT_if_MDown");
    setInterval("traceTiles", 1000);
    // ******* did console.log here, but hten ran into error...
    //         not clearing? happen before or after setInterval??
    //         try a few more console logs to pipoint where fails
    //         error logs to the console in dev_tools in browser
    }
  }
*/

/////////////////////////////////

/*// backup copy (modified above)
  function traceTiles(curTile) {
    mDown = true;
    while (mDown) {
      highlightTile(curTile);
      $(document).mouseup(function() {
        mDown = false;
      })mouseStillDown
    }
  }
*/

////////////////////////////////////////////////////////////////////

});
