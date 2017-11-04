

$(document).ready(function() {

  let mouseStillDown = false;  // keeps track of mousebutton position for drawing
  let eraseOn = false;         // tracks toggle state of 'erase' button


  let availableColors = ['White', 'Yellow', 'Orange', 'Pink', 'Red', 'LightBlue', 'Blue', 'LawnGreen', 'Green', 'RebeccaPurple', 'SaddleBrown', 'LightGrey','Grey', 'Black'];
  // console.log('color choices array is:');
  // console.log(availableColors);
  createColorButtons($('#js-control-panel-left'), availableColors);  // calls method to create the color buttons
  createColorButtons($('#js-control-panel-right'), availableColors);  // calls method to create the color buttons



  // Create color selection buttons based on array of html named colors
  // Will dynamically create HTML buttons, but css classes must already exist manually
  function createColorButtons(colorPanel, colorArray) {
    // colorPanel = $('#js-control-panel-left');
    for (let j = 0; j < colorArray.length; j++) {
      newColorButton = $('<button type="button"></button>');
      // console.log('adding next color: ' + colorArray[j]);
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
  let answer = prompt('Please enter the number of rows/columns, as a positive integer:', '16');
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
      answer = prompt('Incorrect format entered.  Please enter the number of rows/columns, as a positive integer:', '16');
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
      let newTile = $('<div></div>').addClass('tile highlighted-Default');
      newTile.data('color', 'Default');
      for (let i = 0; i < numTiles; i++) {
          grid1.append(newTile.clone(true));  // 'true' clones data and eventHandlers too, instead of sharing
      }

      grid1.fadeIn(700);
      //grid1.show();
    }
  }



  // event handler foor button to create the main drawing grid 1
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
    console.log('ran clearGridButton');
    event.preventDefault();
    if ($('.tile').length) {
      console.log('clear - found at least one tile')
      // if tiles exist, check if each one is already of default color, if not set to default color
      $('.tile').each(function() {
        currentTile = $(this);
        console.log('checking tile: ' + currentTile);
        if (currentTile.hasClass('highlighted-Default') !== true) {
          console.log('found non-default color tile');
          highlightTile(currentTile, 'Default');
        }
      });
    } else {
      alert('Cannot clear canvas. Grid has not been created');
    }
  });

/////////////////////////////////////////////////////////////////////

  // event handler for button to select the default backround color
  // note: resets color for class "highlighted-Default" and recreates the drawing grid
  $('#js-setDefaultColorButton').on('click', function(event) {
    console.log('ran setDefaultColorButton');
    event.preventDefault();
    $('#js-control-panel-right').slideToggle(800);
    }

  })

  $('#js-control-panel-right').on('click', 'button-color' function(event) {
    console.log('ran DefaultColorButton secondary button listner code');
    event.preventDefault();
    newDefaultColor = $(this).data('color');
    //
    if ($('.tile').length) {
      console.log('clear - found at least one tile')
      // if tiles exist, check if each one is already of default color, if not set to default color
      $('.tile').each(function() {
        currentTile = $(this);
        console.log('checking tile: ' + currentTile);
        if (currentTile.hasClass('highlighted-Default') !== true) {
          console.log('found non-default color tile');
          highlightTile(currentTile, 'Default');
        }
      });
    } else {
      alert('Cannot clear canvas. Grid has not been created');
    }



    if (currentTile.hasClass('highlighted-Default') !== true) {
      console.log('found non-default color tile');
      highlightTile(currentTile, 'Default');
    }

    $('#js-control-panel-right').slideToggle(800);
  })

/*
  colorPanel = $('#js-control-panel-left');
  for (let j = 0; j < colorArray.length; j++) {
    newColorButton = $('<button type="button"></button>');
    // console.log('adding next color: ' + colorArray[j]);
    newColorButton.attr('name', colorArray[j]);
    newColorClass = 'highlighted-' + colorArray[j];
    newColorButton.addClass(newColorClass);
    newColorButton.addClass('button-color');
    if (j === 0) {
      newColorButton.addClass('button-color-selected');
    }
    colorPanel.append(newColorButton);
  }
*/
/////////////////////////////////////////////////////////////////////

  // removes highlighted color class from a grid tile.
  // note: tiles are initiated with color property of "Default" in createGrid()
  // note:  tiles only have 1 color assigned at any given time
  //
  function removeTileColor(currentTile) {
    currentColor = currentTile.data('color');
    console.log('removeTileColor - removing data-color: ' + currentColor);
    currentColorClass = 'highlighted-' + currentColor;
    console.log('removeTileColor - removing color class: ' + currentColorClass);
    currentTile.removeClass(currentColorClass);
  }

  // change the highlighted color of a grid Tile
  // note: Removes current color class, adds new color class, and then updates data-color property
  function highlightTile(currentTile, newColor) {
    removeTileColor(currentTile);
    newColorClass = 'highlighted-' + newColor;
    currentTile.addClass(newColorClass);
    console.log('highlightTile - adding color class: ' + newColorClass);
    currentTile.data('color', newColor);
    console.log('highlightTile - adding data-color: ' + newColor);
  }

  // event hanndler on LEFT Control Panel for button to set drawing color
  // note: also highlights the button
  $('#js-control-panel-left').on('click','.button-color', function(event) {
    event.preventDefault();
    $('.button-color-selected').removeClass('button-color-selected');
    $(this).addClass('button-color-selected');
    // next 2 lines are test output
    newColor = $(this).attr('name');
    console.log('color button selected: ' + newColor);
  });

  // button to set Default color (highlights the button also) on RIGHT Control Panel
  $('#js-control-panel-right').on('click','.button-color', function(event) {
    event.preventDefault();
    // next 2 lines are test output
    newDefaultColor = $(this).attr('name');
  /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////
  //  note: right idea, but can i simply change the color of a css class? like change: '.highlighted-Default' -- color: purple
  //  OR: do I have to set a variable here in Javascript, default.  and say default = string = "highlighted-Default" and
  //  change the objects having that class (tiles) to change to the new class based on this new string created when the
  //  color button is pressed...need to take a break now.
  /////////////////////////////////////////////////////////////////////
    console.log('color button selected: ' + newColor);
  });

  // toggles "highlighted" class for a tile, to draw or erase it
  function drawOnTile(currentTile) {
    // erase tile if erase button is activated
    if (eraseOn === true) {
      console.log('erasing');
      highlightTile(currentTile, 'Default');
    }
    // highlight tile if erase button is not activated
    if (eraseOn === false) {
      newColor = $('.button-color-selected').attr('name');
      console.log('drawing color:' + newColor);
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
    grid2.append(rowTemplate.clone(true));
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
