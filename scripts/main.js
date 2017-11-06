

$(document).ready(function() {

  let mouseStillDown = false;  // keeps track of mousebutton position for drawing
  let eraseOn = false;         // tracks toggle state of 'erase' button. erase is off to begin.
  var defaultTileColor = 'red';  // set intial color of tiles on grid (canvas color)

  let availableColors = ['white', 'yellow', 'orange', 'pink', 'red', 'lightblue', 'blue', 'lawngreen', 'green', 'rebeccapurple', 'saddlebrown', 'lightgrey','grey', 'black'];
  // console.log('color choices array is:');
  // console.log(availableColors);




  // Executed code at html screen load time
  createColorButtons($('#js-control-panel-left'), availableColors);  // calls method to create the color buttons
  //createColorButtons($('#js-control-panel-right'), availableColors);  // calls method to create the color buttons



  // get set and toggle methods for variable 'eraseOn'
  function getEraseOnStatus() {
    return eraseOn;
  }
  function toggleEraseOnStatus() {
    if (eraseOn === true) {
      eraseOn = false;
    } else {
      eraseOn = true;
    }
  }

  // get and set methods for variable defaultTileColor and the respective background color class name
  function setDefaultTileColor(color) {
    defaultTileColor = color;
  }
  function getDefaultTileColor() {
    return defaultTileColor;
  }
  function getDefaultTileColorClass() {
    return 'hightlighted-' + getDefaultTileColor();
  }



  // Create color selection buttons based on array of html named colors
  // Will dynamically create HTML buttons, but css classes must already exist manually
  // note: sets first button to be selected initially
  function createColorButtons(colorPanel, colorArray) {
    for (let j = 0; j < colorArray.length; j++) {
      let newColorButton = $('<button type="button"></button>');
      newColorButton.attr('name', colorArray[j]);
      let newColorClass = 'highlighted-' + colorArray[j];
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
    let answer = prompt('Please enter the number of rows/columns, as a positive integer:', '4');
    let gridSize = parseFloat(answer);
    while (invalidInput) {
      if ((answer === null) || (answer === "")) {
        gridSize = -1;
        invalidInput = false;
        return gridSize;
      } else if ((typeof gridSize === 'number') && (gridSize % 1 === 0) && (gridSize > 0)) {  // parseFloat can return "NAN"
        invalidInput = false;
        return gridSize;
      } else {
        answer = prompt('Incorrect format entered.  Please enter the number of rows/columns, as a positive integer:', '4');
        gridSize = parseFloat(answer);
      }
    }
}

  /////////////////////////////////////////////////////////////////////

  // Build Grid system of tiles to draw with, using "grid display:
  // note: requires use of css variables (declared in ::root at top of master.css file)
  function createGrid() {
    //prompt user for number of rows/columns
    // let gridSize = promptGridSize();
    let gridSize = 3;   // alt way for debug instead of using promptGridSize()

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
      // intializes color class and data-color by global variable defaultTileColor
      let numTiles = gridSize * gridSize;
      let newTile = $('<div></div>').addClass('tile');
      console.log('creating grid - default class: ' + getDefaultTileColorClass());
      console.log('creating grid - default color: ' + getDefaultTileColor());

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
      //    HERE: I need to add to the newTile element:
      //          1.  color class:            "hightlighted-red"    (or: 'hightlighted-' + defaultTileColor)
      //          2.  data-color attribute:   "red"                 (or: defaultTileColor)
      //
      // PROBLEM: if I pass the global variable in for defaultTileColor, it works.
      //          Neither of the following 2 alternative methods worked:
      //          1. defining new variable XX=getDefaultTileColor() and then passing "newTile.data('color', XX)"
      //          2. passing getDefaultTileColor() in "newTile.data('color', xxx)"
      //          Also trided same substitution with adding the class.  neither methods worked as argument/parameter for "newTile.addClass(xxx)"
      //          However, the getDefaultTileColor() and getDefaultTileColorClass() methods work, because they print out to console above just fine.
      //          Find out how to pass them as arguments/variables...or why it's not working.
      //
      //          WORKS:  data-color: passing the defaultTileColor variable directly (check...I think this works both if defined above as 'var' or 'let')
      //                  class:      padding as the actual class string:   'hightlighted-red' .... but how do I make it into a variable?
      //
      //          Similar problem happening from the drawOnTile method...when I select a color to use and then try to click the tile,
      //                  it shows the correct color selected (in console out), but says it's trying to add an "undefined" color.

/*
      // IE: method 1  -  Does NOT work
      let tileColorClass = getDefaultTileColorClass();
      newTile.addClass(tileColorClass); //getDefaultTileColorClass());
      let tileColorName = getDefaultTileColor();
      newTile.data('color', tileColorName); //getDefaultTileColor());

      // IE: method 2  -  Does NOT work
      newTile.addClass(getDefaultTileColorClass());
      newTile.data('color', getDefaultTileColor());
*/

      // IE: method 3  -  works
      newTile.addClass('highlighted-red');
      newTile.data('color', defaultTileColor);


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
    toggleEraseOnStatus();
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
    // only run the code if there exists at least one tile (ie: if the grid exists)
    if ($('.tile').length) {
      console.log('clear - found at least one tile');
      // if tiles exist, check if each one is already of default color, if not set to default color
      $('.tile').each(function() {
        let currentTile = $(this);
        console.log('checking tile: ' + currentTile);
        if (currentTile.hasClass(getDefaultTileColorClass()) !== true) {
          console.log('found non-default color tile');
          highlightTile(currentTile, getDefaultTileColor());
        }
      });
    } else {
      alert('Cannot clear canvas. Drawing grid has not been created');
    }
  });

  /////////////////////////////////////////////////////////////////////

  // event handler for button to select the default backround color
  // note: this handler opens the div panel for choosing the default color.
  //        Event Handler for the buttons on that menu close the panel after selection.
  $('#js-setDefaultColorButton').on('click', function(event) {
    console.log('ran setDefaultColorButton');
    event.preventDefault();
    $('#js-control-panel-right').slideToggle(800);
  });

  // event handler to select the default background color.
  // note: containing panel is opened by another event handler (above)
  // note: first changes any existing default tiles to the new default color, and
  //       then updates the global defaulTileColor variable (in case 'reset' is run..etc)
  $('#js-control-panel-right').on('click', 'button-color', function(event) {
    console.log('ran DefaultColorButton secondary button listner code');
    event.preventDefault();
    let newDefaultColor = $(this).data('color');
    console.log('color button selected: ' + newDefaultColor);
    // If grid exists (at least one tile exists) update any existing tiles of default color
    if ($('.tile').length) {
      console.log('clear - found at least one tile');
      $('.tile').each(function() {
        let currentTile = $(this);
        console.log('checking tile: ' + currentTile);
        if (currentTile.hasClass(getDefaultTileColorClass()) === false) {
          console.log('found non-default color tile');
          highlightTile(currentTile, getDefaultTileColor());
        }
      });
    }
    // update the defaultTileColor variable and close the default color selection panel
    setDefaultTileColor(newDefaultColor);
    $('#js-control-panel-right').slideToggle(800);
  });


  // removes highlighted color class from a grid tile.
  // note: tiles are initiated with color property of "Default" in createGrid()
  // note:  tiles only have 1 color assigned at any given time
  //
  function removeTileColor(currentTile) {
    let currentColor = currentTile.data('color');
    console.log('removeTileColor - removing data-color: ' + currentColor);
    let currentColorClass = 'highlighted-' + currentColor;
    console.log('removeTileColor - removing color class: ' + currentColorClass);
    currentTile.removeClass(currentColorClass);
  }

  // change the highlighted color of a grid Tile
  // note: Removes current color class, adds new color class, and then updates data-color property
  function highlightTile(currentTile, newColor) {
    removeTileColor(currentTile);
    let newColorClass = 'highlighted-' + newColor;
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
    let newColor = $(this).attr('name');
    console.log('color button selected: ' + newColor);
  });


  // toggles "highlighted" class for a tile, to draw or erase it
  function drawOnTile(currentTile) {
    console.log('ran drawOnTile');
    // erase tile if erase button is activated "true"
    if (getEraseOnStatus()) {
      console.log('erasing');
      highlightTile(currentTile, getDefaultTileColor());
    }
    // highlight tile if erase button is not activated "fale"
    else {
      let newColor = $('#js-control-panel-left').find('.button-color-selected').first().attr('name');
      // let newColor = $('.button-color-selected').attr('name');
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
