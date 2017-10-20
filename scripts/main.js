

$(document).ready(function() {

  let mouseStillDown = false;
  let eraseOn = false;

  const tileGridSize = 20;

createGrid1();
createGrid2();

/////////////////////////////////////////////////////////////////////

  // Build Grid system of tiles to draw with - Method 1
  function createGrid1() {
    //create grid, and a frame in which to center the grid
    let grid1Frame = $('<div></div>').addClass('grid-frame');
    //grid1Frame.hide();
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
    let grid1Description = $('<p> Method 1: This Tile Grid was created by adding each tile individually over two for-loops.  It is noticeably slower than Method 2 when there are more than 50 rows and columns.</p>');
    grid1Frame.prepend(grid1Description);
    // grid1Frame.fadeIn(0);
    //grid1Frame.show();
  }

  // Build Grid system of tiles to draw with - Method 2
  function createGrid2() {
    //create grid, and a frame in which to center the grid
    let grid2Frame = $('<div></div>').addClass('grid-frame');
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
    let grid2Description = $('<p> Method 2: This Tile Grid was created using a for-loop to build a template row, and then cloning the template row for each required row.  It is noticeably faster than Method 1 when there are more than 50 rows and columns.</p>');
    grid2Frame.prepend(grid2Description);
    // grid2Frame.fadeIn(0);
    grid2Frame.show();
  }

/////////////////////////////////////////////////////////////////////

  // buttons to create the main drawing grid 1
  $('#js-runGrid1Button').mousedown(function() {
    if ($(this).data('clicked') === false) {
      createGrid1();
      $(this).data('clicked', 'true');
    } else {
      alert('Grid 1 has already been displayed');
    }
  });

  // buttons to create the main drawing grid 1
  $('#js-runGrid2Button').mousedown(function() {
    if ($(this).data('clicked') === false) {
      createGrid2();
      $(this).data('clicked', 'true');
    } else {
      alert('Grid 2 has already been displayed');
    }
  });

  // button to toggle "erase" on/off
   $('#js-eraseButton').mousedown(function() {
    if (eraseOn === true) {
      eraseOn = false;
      console.log('eraseOn turned to:' + eraseOn);
    } else {
      eraseOn = true;
      console.log('eraseOn turned to:' + eraseOn);
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

  // draw by either "highlighting" or "erasing" when clicking a tile
  $('.tile').mousedown(function() {
    alert('mousedown');
    console.log('mouse DOWN ran');
    console.log('mouseStillDown began:' + mouseStillDown);
    mouseStillDown = true;
    console.log('mouseStillDown changed to: ' + mouseStillDown);
    drawOnTile($(this));
    console.log('drawOnTile function called');
  });

  $(document).mouseup(function() {
    console.log("mouse UP ran");
    console.log("mouseStillDown:" + mouseStillDown);
    mouseStillDown = false;
    console.log('mouseStillDown changed to: ' + mouseStillDown);
  });

  // option 1 - mouseenter instead of mousemove  (this one worked intially)
  // $('.tile').mouseenter(function() {
  //   if (mouseStillDown) {
  //     drawOnTile($(this));
  //   }
  // });

  // option 1 - mousemove instead of mouseenter (tried later...yet to try)
  // $('.tile').mouseenter(function() {
  //   if (mouseStillDown) {
  //     drawOnTile($(this));
  //   }
  // });



});  //end of ready()


/////////////////////////////////////////////////////////////////////
// EXTRA CODE REMNANTS - tried and no longer using
/////////////////////////////////////////////////////////////////////
