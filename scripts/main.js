

$(document).ready(function() {

  let mouseStillDown = false;
  let eraseOn = false;

  const tileGridSize = 60;


/////////////////////////////////////////////////////////////////////

  // Build Grid system of tiles to draw with - Method 1
  function createGrid1() {
    //create grid, and a frame in which to center the grid
    let grid1Frame = $('<div></div>').addClass('centered-content');
    grid1Frame.hide();
    let grid1 = $('<div></div').addClass('tiles-container');
    grid1Frame.append(grid1);
    $('#js-gridsContainer').append(grid1Frame);
    // create the grid of tiles
    for (let row = 0; row < tileGridSize; row++) {
      for (let col = 0; col < tileGridSize; col++) {
        let newTile = $('<div></div>').addClass('tile');
        if (col === 0) {
          newTile.addClass('left-tile');
        }
        grid1.append(newTile);
      }
    }
    // grid1Frame.fadeIn(2000);
    grid1Frame.show();
  }

  // Build Grid system of tiles to draw with - Method 2
  function createGrid2() {
    //create grid, and a frame in which to center the grid
    let grid2Frame = $('<div></div>').addClass('centered-content');
    grid2Frame.hide();
    let grid2 = $('<div></div').addClass('tiles-container');
    grid2Frame.append(grid2);
    $('#js-gridsContainer').append(grid2Frame);
    // create template row
    let rowTemplate = $('<div></div>').addClass('row-container');
    for (let i = 0; i < tileGridSize; i++) {
      let newTile = $('<div></div>').addClass('tile');
      if (i === 0) {
        newTile.addClass('left-tile');
      }
      rowTemplate.append(newTile);
    }
    // copy clones of the template row into the grid
    for (let j = 0; j < tileGridSize; j++) {
      grid2.append(rowTemplate.clone());
    }
    // grid2Frame.fadeIn(2000);
    grid2Frame.show();
  }

/////////////////////////////////////////////////////////////////////

// note - no object available, for grids, to call fadeIn() on....PROBLEM

  // buttons to create the main drawing grid 1
  $('#js-runGrid1Button').on('click', function() {
    if ($(this).data('clicked') === false) {
      createGrid1();
      $(this).data('clicked', 'true');
    } else {
      alert('Grid 1 has already been displayed');
    }
  });

  // buttons to create the main drawing grid 1
  $('#js-runGrid2Button').on('click', function() {
    if ($(this).data('clicked') === false) {
      createGrid2();
      $(this).data('clicked', 'true');
    } else {
      alert('Grid 2 has already been displayed');
    }
  });

  // button to toggle "erase" on/off
   $('#js-eraseButton').on('click', function() {
    if (eraseOn === true) {
      eraseOn = false;
    } else {
      eraseOn = true;
    }
  });

  // toggles "highlighted" class for a tile, to draw or erase it
  function drawOnTile(currentTile) {
    // erase tile if erase button is activated
    if ((eraseOn === true) && (currentTile.hasClass('highlighted') === true)) {
      currentTile.removeClass('highlighted');
    }
    // highlight tile if erase button is not activated
    if ((eraseOn === false) && (currentTile.hasClass('highlighted') === false)) {
      currentTile.addClass('highlighted');
    }
  }

/////////////////////////////////////////////////////////////////////
// redoing below BU using event propagation and preventdefault to
// stop mouseup/down PROBLEM

// draw by either "highlighting" or "erasing" when clicking a tile
$('#js-gridsContainer').on('mousedown', '.tile', function(event) {
  event.preventDefault();
  mouseStillDown = true;
  drawOnTile($(this));
});

$(document).on('mouseup', function(event) {
  event.preventDefault();
  mouseStillDown = false;
});

// option 1 - mouseenter instead of mousemove  (this one worked intially)
$('#js-gridsContainer').on('mouseenter', '.tile', function(event) {
  event.preventDefault();
  if (mouseStillDown) {
    drawOnTile($(this));
  }
});

// option 1 - mousemove instead of mouseenter (tried later...yet to try)
// $('#js-gridsContainer').on('mousemove', '.tile', function(event) {
//   event.preventDefault();
//   if (mouseStillDown) {
//     drawOnTile($(this));
//   }
// });

/////////////////////////////////////////////////////////////////////



});  //end of ready()


/////////////////////////////////////////////////////////////////////
// EXTRA CODE REMNANTS - tried and no longer using
/////////////////////////////////////////////////////////////////////
