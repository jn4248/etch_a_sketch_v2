

$(document).ready(function() {

  let mouseStillDown = false;  // keeps track of mousebutton position for drawing
  let eraseOn = false;         // tracks toggle state of 'erase' button


  let availableColors = ['White', 'Yellow', 'Orange', 'Pink', 'Red', 'LightBlue', 'Blue', 'LawnGreen', 'Green', 'RebeccaPurple', 'SaddleBrown', 'LightGrey','Grey', 'default'];
  console.log('color choices array is:');
  console.log(availableColors);
  createColorButtons(availableColors);


  // Create color selection buttons based on array of html named colors
  // Will dynamically create HTML buttons, but css classes must already exist manually
  function createColorButtons(colorArray) {
    colorPanel = $('#js-control-panel-left');
    for (let j = 0; j < colorArray.length; j++) {
      newColorButton = $('<button type="button"></button>');
      console.log('adding next color: ' + colorArray[j]);
      newColorButton.attr('name', colorArray[j]);
      newColorClass = 'highlighted-' + colorArray[j];
      newColorButton.addClass(newColorClass);
      newColorButton.addClass('button-color');
      if (j === 0) {
        newColorButton.addClass('button-color-selected');
      }
      colorPanel.append(newColorButton);
    }
  }

/////////////////////////////////////////////////////////////////////
// asks user for a positive integer.  Checks, and repeats prompt until:
// 1.  user enters positive integer:  returns the integer
// 2.  user clicks 'cancel' on prompt, or enters an empty string:  returns '-1'
function promptGridSize() {
  // console.log('ran promptGridSize function');
  let invalidInput = true;
  let answer = prompt('Please enter the number of rows/columns, as a positive integer:', '2');
  let gridSize = parseFloat(answer);
  while (invalidInput) {
    if ((answer === null) || (answer === "")) {
      gridSize = -1;
      invalidInput = false;
      return gridSize;
    } else if ((typeof gridSize === 'number') && (gridSize % 1 === 0) && (gridSize > 0)) {
      invalidInput = false;
      return gridSize;
    } else {
      answer = prompt('Incorrect format entered.  Please enter the number of rows/columns, as a positive integer:', '2');
      gridSize = parseFloat(answer);
    }
  }
}

/////////////////////////////////////////////////////////////////////

  // Build Grid system of tiles to draw with, using "grid display:
  // note: requires use of css variables (declared in ::root at top of master.css file)
  function createGrid() {
    //prompt user for number of rows/columns
    let gridSize = promptGridSize();
    //let gridSize = 80;   // alt way for debug instead of using promptGridSize()

    // create the drawing grid of tiles.
    // Does not create grid if user entered an empty string, or canceled the prompt
    if (gridSize > 0) {
      let grid1 = $('<div></div>').addClass('tiles-container');
      grid1.hide();
      $('#js-gridContainer').append(grid1);

      // set css variables for number of rows and columns
      document.documentElement.style.setProperty("--numRows", gridSize);
      document.documentElement.style.setProperty("--numColumns", gridSize);

      // create the grid of tiles
      let numTiles = gridSize * gridSize;
      let newTile = $('<div></div>').addClass('tile highlighted-default');
      newTile.data('color', 'default');

      for (let i = 0; i < numTiles; i++) {
          grid1.append(newTile.clone());
      }

      grid1.fadeIn(500);
      //grid1.show();
    }
  }



  // buttons to create the main drawing grid 1
  $('#js-createGridButton').on('click', function(event) {
    event.preventDefault();
    if ($(this).data('clicked') === false) {
      createGrid();
      $(this).data('clicked', 'true');
    } else {
      alert('Grid has already been displayed');
    }
  });


  // event handler for button to toggle "erase" on/off
   $('#js-eraseButton').on('click', function(event) {
     event.preventDefault();
    if (eraseOn === true) {
      eraseOn = false;
    } else {
      eraseOn = true;
    }
  });

  // event handler for button to recreate the drawing grid
  // note: removes current grid (div) and creates a new one.
  $('#js-resetGridButton').on('click', function(event) {
    event.preventDefault();
    if ($('.tiles-container').length) {
      $('.tiles-container').remove();
      createGrid();
    } else {
      alert('Cannot remove. Grid has not been created');
    }
  });

  // event handler for button to reset all grid tiles.
  // note: sets all tiles to the default color, but maintains current grid.
  $('#js-clearGridButton').on('click', function(event) {
    event.preventDefault();
    if ($('.tiles-container').length) {
      //removeTileColor(all_tiles);               // NEED TO FIX THIS
      //highlightTile(all_tiles, 'default');      // NEED TO FIX THIS
    } else {
      alert('Cannot clear canvas. Grid has not been created');
    }
  });

  // removes highlighted color class from a grid tile.
  // note: tiles only have 1 color assigned at any given time
  // note: if no color name is found, sets tile to default color.
  function removeTileColor(currentTile) {
    currentColor = currentTile.data('color');
    currentColorClass = 'highlighted-' + currentColor;
    currentTile.removeClass(currentColorClass);
  }

  // change the highlighted color of a grid Tile
  function highlightTile(currentTile, color) {
    newColorClass = 'highlighted-' + color;
    currentTile.addClass(newColorClass);
  }

  // button to set drawing color (highlights the button also)
  $('.button-color').on('click', function(event) {
    event.preventDefault();
    $('.button-color-selected').removeClass('button-color-selected');
    $(this).addClass('button-color-selected');
    // next 2 lines are test output
    newColor = $(this).attr('name');
    console.log('color button selected: ' + newColor);
  });

  // toggles "highlighted" class for a tile, to draw or erase it
  function drawOnTile(currentTile) {
    // remove any highlight classes
    removeTileColor(currentTile);
    // erase tile if erase button is activated
    if (eraseOn === true) {
      currentTile.addClass('highlighted-default');
      currentTile.data('color', 'default');
    }
    // highlight tile if erase button is not activated
    if (eraseOn === false) {
      newColor = $('.button-color-selected').attr('name');
      console.log('drawing color:' + newColor);
      currentTile.data('color', newColor);
      highlightTile(currentTile, newColor);
    }
  }

/////////////////////////////////////////////////////////////////////


// draw by either "highlighting" or "erasing" when clicking a tile
$('#js-gridContainer').on('mousedown', '.tile', function(event) {
  event.preventDefault();
  mouseStillDown = true;
  drawOnTile($(this));
});

$(document).on('mouseup', function(event) {
  event.preventDefault();
  mouseStillDown = false;
});

// option 1 - mouseenter instead of mousemove  (this one worked intially)
$('#js-gridContainer').on('mouseenter', '.tile', function(event) {
  event.preventDefault();
  if (mouseStillDown) {
    drawOnTile($(this));
  }
});

/////////////////////////////////////////////////////////////////////

});  //end of ready()


/////////////////////////////////////////////////////////////////////
// EXTRA CODE REMNANTS - tried and no longer using
/////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
/*
  // Build Grid system of tiles to draw with - Method 1
  function createGrid1() {
    //prompt user for number of rows/columns
    let gridSize = 80;

    //create grid, and a frame in which to center the grid
    // only create the grid if user did not cancel the prompt
    if (cancelGridCreation === false) {
      let grid1 = $('<div></div>').addClass('tiles-container grid1-id');
      grid1.hide();
      let gridsContainer = $('#js-gridsContainer');
      gridsContainer.append(grid1);
      let gridHeight = gridsContainer.height();
      let tileHeight = gridHeight / gridSize;
      console.log('gridHeight is: ' + gridHeight);
      console.log('tileHeight is: ' + tileHeight);
      let gridWidth = gridsContainer.width();
      let tileWidth = gridWidth / gridSize;
      console.log('gridWidth is: ' + gridWidth);
      console.log('tileWidth is: ' + tileWidth);
      $('.tile').css({'height': 'tileHeight', 'width': 'tileWidth'});

      // create the grid of tiles
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          let newTile = $('<div></div>').addClass('tile');
          if (col === 0) {
            newTile.addClass('left-tile');
          }
          grid1.append(newTile);
        }
      }

      let gridHeight = grid1.height();
      let tileHeight = gridHeight / gridSize;
      console.log('gridHeight is: ' + gridHeight);
      console.log('tileHeight is: ' + tileHeight);
      let gridWidth = grid1.width();
      let tileWidth = gridWidth / gridSize;
      console.log('gridWidth is: ' + gridWidth);
      console.log('tileWidth is: ' + tileWidth);
      // $('.tile').css({'height': 'tileHeight', 'width': 'tileWidth'});
      $('.tile').css('height', tileHeight);
      $('.tile').css('width', tileWidth);

      // grid1Frame.fadeIn(2000);
      grid1.show();
    }
  }
*/
/////////////////////////////////////////////////////////////////////

// Build Grid system of tiles to draw with - Method 2
/*
function createGrid2() {
  //create grid, and a frame in which to center the grid
  let grid2Frame = $('<div></div>').addClass('centered-content');
  grid2Frame.hide();
  let grid2 = $('<div></div').addClass('tiles-container');
  grid2Frame.append(grid2);
  $('#js-gridContainer').append(grid2Frame);
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
*/

/////////////////////////////////////////////////////////////////////

/* BUTTON ON-CLICK FUNCTION TO CALL A SEPARATE AND SECOND METHOD OF CREATING THE DRAWING GRID */
// buttons to create the main drawing grid 1
// $('#js-createGrid2Button').on('click', function() {
//   if ($(this).data('clicked') === false) {
//     createGrid2();
//     $(this).data('clicked', 'true');
//   } else {
//     alert('Grid 2 has already been displayed');
//   }
// });

/////////////////////////////////////////////////////////////////////

/* THIS WAS AN ALTERNATIVE MEANS TO HIGHLIGHT TILES */
// option 2 - mousemove instead of mouseenter
// (ttried: was equally responsive as mouseenter - still skipped with fast mouse movement)
// $('#js-gridContainer').on('mousemove', '.tile', function(event) {
//   event.preventDefault();
//   if (mouseStillDown) {
//     drawOnTile($(this));
//   }
// });

/////////////////////////////////////////////////////////////////////
