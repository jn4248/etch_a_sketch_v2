

$(document).ready(function() {

  let mouseStillDown = false;  // keeps track of mousebutton position for drawing
  let eraseOn = false;         // tracks toggle state of 'erase' button. erase is off to begin.
  let initialBackgroundColor = 'white'  // used to set intitial grid background color in createGrid()

  let availableColors = ['white', 'yellow', 'orange', 'pink', 'red', 'lightblue', 'blue', 'lawngreen', 'green', 'rebeccapurple', 'saddlebrown', 'lightgrey','grey', 'black'];


  // Executed code at html screen load time
  createColorButtons($('#js-control-panel-left'), availableColors);  // calls method to create the color buttons
  createColorButtons($('#js-control-panel-right'), availableColors);  // calls method to create the color buttons



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

/*
  // get and set methods for variable defaultTileColor and the respective background color class name
  function setDefaultTileColor(color) {
    defaultTileColor = color;
  }
  function getDefaultTileColor() {
    return defaultTileColor;
  }
  function getDefaultTileColorClass() {
    return 'highlighted-' + getDefaultTileColor();
  }
*/



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
    let invalidInput = true;
    let answer = prompt('Please enter the number of rows/columns, as a positive integer:', '16');
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
    //let gridSize = promptGridSize();  // returns -1 if user cancels prompt
    let gridSize = 4;   // alt way for debug instead of using promptGridSize()

    // create the drawing grid of tiles.
    // Does not create grid if user entered an empty string, or canceled the prompt
    if (gridSize > 0) {
      // create grid element and set default background color for canvas
      let grid1 = $('<div data-tilecolor=' + initialBackgroundColor + '></div>');
      initialBackgroundColorClass = 'highlighted-' + initialBackgroundColor;
      grid1.addClass('tiles-container');
      grid1.addClass(initialBackgroundColorClass);
      grid1.hide();
      $('#js-gridContainer').append(grid1);
      // set css variables for number of rows and columns
      document.documentElement.style.setProperty("--numRows", gridSize);
      document.documentElement.style.setProperty("--numColumns", gridSize);
      // create the grid of tiles
      let numTiles = gridSize * gridSize;
      let newTile = $('<div data-tilecolor="none"></div>').addClass('tile');
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
        // initialize first grid with no data-tilecolor 'none'. can be set to current background-color if used to reset the current grid
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
    // toggle hightlight of button
    if (getEraseOnStatus()) {
      $(this).addClass('button-control-selected');
    } else {
      $(this).removeClass('button-control-selected')
    }
  });

  // event handler for button to recreate the drawing grid
  // note: removes current grid (div) and creates a new one.
  $('#js-resetGridButton').on('click', function(event) {
    event.preventDefault();
    if ($('tiles-container').length) {
      $('tiles-container').remove();
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
    // only run the code if the grid exists
    if ($('.tiles-container').length) {
      console.log('clear - grid exists');
      // if tiles exist, check if each one is already of default color, if not set to default color
      $('.tile').each(function() {
        let currentTile = $(this);
        console.log('checking tile: ' + currentTile);
        if (currentTile.data('tilecolor') !== 'none') {
          console.log('found colored tile');
          removeColorClass(currentTile);
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
    $('#js-control-panel-right').slideToggle(500);
  });

  // event handler to select the default background color.
  // note: containing panel is opened by another event handler (above)
  // note: first changes any existing default tiles to the new default color, and
  //       then updates the global defaulTileColor variable (in case 'reset' is run..etc)
  $('#js-control-panel-right').on('click', '.button-color', function(event) {
    console.log('ran setDefaultColorButton secondary code - line 189');
    event.preventDefault();
    let newBackgroundColor = $(this).attr('name');
    console.log('color button selected: ' + newBackgroundColor);
    // If grid exists (at least one tile exists) update any existing tiles of default color
    if ($('.tiles-container').length) {
      console.log('clear - grid exists');
      // x = get class list for container-grid
      // remove 'tiles-container' from this array
      // whatever is left is the highlight class
      // remove the hightlihgt class (this could easily break if i add more classes)
      console.log('setting new background highlight as: ' + newBackgroundColor);
      highlightDrawElement($('.tiles-container'), newBackgroundColor);
    }
    // close the default color selection panel
    $('#js-control-panel-right').slideToggle(500);
  });


  // removes highlighted color class from a drawing element that uses specific color classes.
  // note: tiles are initiated with data-tilecolor attribute of "none" in createGrid()
  // note:  drawing elements only have 1 color assigned at any given time
  // note: can only be called on a tile that has a highlighted class attached,
  //       or else will fail (eg: can not remove class "highlighted-none" because doesn not exist)
  //note: color classes are of format: 'highlighted-' + color
  function removeColorClass(currentDrawElement) {
    let currentColor = currentDrawElement.data('tilecolor');
    console.log('removeColorClass - removing data-tilecolor: ' + currentColor);
    let currentColorClass = 'highlighted-' + currentColor;
    console.log('removeColorClass - removing color class: ' + currentColorClass);
    currentDrawElement.removeClass(currentColorClass);
    // re-initialize data-tilecolor to 'none'
    currentDrawElement.data('tilecolor', 'none');
  }

  // change the highlighted color of a grid Tile
  // note: Removes current color class, adds new color class, and then updates data-tilecolor property
  function highlightDrawElement(currentDrawElement, newColor) {
    if (currentDrawElement.data('tilecolor') !== 'none') {
      removeColorClass(currentDrawElement);
    }
    currentDrawElement.addClass('highlighted-' + newColor);
    console.log('highlightDrawElement - adding color class: ' + 'highlighted-' + newColor);
    currentDrawElement.data('tilecolor', newColor);
    console.log('highlightDrawElement - adding data-tilecolor: ' + newColor);
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
    // erase tile if erase button is activated:"true"
    if (getEraseOnStatus()) {
      console.log('erasing');
      removeColorClass(currentTile);
    }
    // highlight tile if erase button is not activated: "false"
    else {
      let newColor = $('#js-control-panel-left').find('.button-color-selected').first().attr('name');
      console.log('drawing color:' + newColor);
      highlightDrawElement(currentTile, newColor);
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
