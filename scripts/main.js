
$(document).ready(function() {

  let mouseStillDown = false;  /*keeps track of mousebutton position for drawing*/
  let eraseOn = false;         /*tracks toggle state of 'erase' button. erase is off to begin.*/
  let alphaOn = false;         /*tracks toggle state of 'alpha' button. alpha coloring is off to begin*/
  let availableColors = ['white',
                          'yellow',
                          'orange',
                          'pink',
                          'red',
                          'lightblue',
                          'blue',
                          'lawngreen',
                          'green',
                          'indigo',
                          'saddlebrown',
                          'lightgrey',
                          'grey',
                          'black'];


  /*Code Executed at Page Loading - creates the 2 color button menus*/
  createColorButtons($('#js-buttonContainerLeft'), availableColors, 'black');
  createColorButtons($('#js-buttonContainerRight'), availableColors, 'white');

  /**
   * get and toggle methods for global variable eraseOn.
   */
  function getEraseOnStatus() {
    return eraseOn;
  }
  function toggleEraseOnStatus() {
    eraseOn = eraseOn ? false : true;
  }

  /**
   * get and toggle methods for global variable alphaOn.
   */
  function getAlphaOnStatus() {
    return alphaOn;
  }
  function toggleAlphaOnStatus() {
    alphaOn = alphaOn ? false : true;
  }
  /**
   * Get method for the currently selected Drawing Color.
   *
   * Returns:  named color of currently selected drawing color button   (String)
   */
  function getCurrentDrawColor() {
    let currentDrawColor = $('#js-buttonContainerLeft').find('.button-color-selected').first().attr('name')
    return currentDrawColor;
  }

  /**
   * Get method for the current background color of the drawing grid.
   *
   * Returns:  named color of drawing grid background     (String)
   */
  function getGridBackgroundColor() {
    let bgColor = $('#js-buttonContainerRight').find('.button-color-selected').first().attr('name');
    return bgColor;
  }

  /**
   * Get the current backgournd CSS color class name for the drawing grid.
   *
   * Returns:  CSS Class 'highlighted' color name
   */
  function getGridBackgroundColorClass() {
    return 'highlighted-' + getGridBackgroundColor();
  }
  /**
   * Increase value for alpha data attribute by 10 (percent)
   *
   * Param: currentTile     tile element (div)
   */
  function increaseAlpha(currentTile) {
    let currentAlpha = parseInt(currentTile.data('alpha'));
    if (currentAlpha <= 90) {
      let newAlpha = currentAlpha + 10;
      currentTile.data('alpha', newAlpha);
    }
  }

  /**
   * Decrease value for alpha data attribute by 10 (percent)
   *
   * Param: currentTile     tile element (div)
   */
  function decreaseAlpha(currentTile) {
    let currentAlpha = parseInt(currentTile.data('alpha'));
    if (currentAlpha >= 10) {
      let newAlpha = currentAlpha - 10;
      currentTile.data('alpha', newAlpha);
    }
  }

  /**
   * Get the opacity class name for an element, based on its alpha data attributes.
   *
   * Param:   currentTile       Element whis is colored (usualy div)
   * Returns:   Opacity CSS Class Name (String)
   */
  function getOpacityClass(currentTile) {
    return 'opacity-' + currentTile.data('alpha');
  }

  /**
   * Adds highlighted color class to a tile element, and updates the data-tilecolor attribute.
   * note: Tile elements should only have 1 color assigned at any given time.
   *
   * Param: currentTile    Tile element to be colored (div)
   * Param: newColorClass         color to apply to element (String)
   */
  function addColorClass(currentTile, newColor) {
    currentTile.addClass('highlighted-' + newColor);
    currentTile.data('tilecolor', newColor);
  }

  /**
  * Removes highlighted color class from a tile element.
  * note: Tile elements should only have 1 color assigned at any given time.
  * note: tilecolor data attribute is not changed inside the function.
  *
  * Param: currentTile    Tile element carrying a color class (div)
  */
  function removeColorClass(currentTile) {
    currentTile.removeClass('highlighted-' + currentTile.data('tilecolor'));
  }

  /**
   * Adds opacity class to a tile element, based on it's current alpha attribute.
   * note: Tile elements should only have 1 opacity class assigned at any given time.
   * note: alpha data attribute is not changed inside the function.
   *
   * Param: currentTile    Tile element to be colored (div)
   */
  function addOpacityClass(currentTile) {
    currentTile.addClass('opacity-' + currentTile.data('alpha'));
  }
  
  /**
  * Removes opacity class from a tile element.
  * note: Tile elements should only have 1 apacity class assigned at any given time.
  * note: alpha data attribute is not changed inside the function.
  *
  * Param: currentTile    Tile element carrying a color class (div)
  */
  function removeOpacityClass(currentTile) {
    currentTile.removeClass('opacity-' + currentTile.data('alpha'));
  }

  /**
   * Create a set of color selection buttons inside a panel (div).
   * note: The css color classes must already exist for the colors in the array.
   * note: Automatically sets the last color of the array as the "selected" color.
   *
   * Param: colorPanel          The HTML element in which to add the Buttons.
   * Param: colorArray          An array of named colors to include.
   * Param: initialSelected     Named color, to initialize as the selected
   *                            button.  Must be a member of colorArray.
   */
  function createColorButtons(colorPanel, colorArray, initialSelected) {
    let arrayLength = colorArray.length;
    for (let j = 0; j < arrayLength; j++) {
      let newColorButton = $('<button type="button"></button>');
      newColorButton.attr('name', colorArray[j]);
      let newColorClass = 'highlighted-' + colorArray[j];
      newColorButton.addClass(newColorClass);
      newColorButton.addClass('button-color');
      if (j === colorArray.indexOf(initialSelected)) {
        newColorButton.addClass('button-color-selected');
      }
      colorPanel.append(newColorButton);
    }
  }

  /**
   * Requests user for a positive integer.  Repeats prompt until user enters
   * an acceptable answer.
   *
   * Returns: 1. Positive integer
   *          2. -1  (if user clicks 'cancel' on prompt, or enters an empty string.
   */
  function promptGridSize() {
    let invalidInput = true;
    let answer = prompt('Please enter the number of rows/columns, as a positive integer (suggested: 200 or below):', '60');
    let gridSize = parseFloat(answer);
    while (invalidInput) {
      if ((answer === null) || (answer === '')) {
        gridSize = -1;
        invalidInput = false;
        return gridSize;
      } else if ((typeof gridSize === 'number') && (gridSize % 1 === 0) && (gridSize > 0)) {  /*parseFloat can return "NAN"*/
        invalidInput = false;
        return gridSize;
      } else {
        answer = prompt('Incorrect format entered.  Please enter the number of rows/columns, as a positive integer (suggested: 200 or below):', '60');
        gridSize = parseFloat(answer);
      }
    }
  }

  /**
   * Create the grid of tiles on which to draw.
   * note: Requires use of css variables (declared in ::root at top of master.css file).
   * note: Called/created in the Event Handler for the "on" button.
   * note: sets initial drawing grid background color and opacity.
   *
   * Param: gridSize            Number of rows/columns in the grid (Number)
   * Param: backgroundColor     Color of the container background (named Color)
   */
  function createGrid(gridSize) {
    // create grid element and set default background color for canvas
    let grid1 = $('<div></div>').addClass('tiles-container');
    grid1.addClass(getGridBackgroundColorClass());
    grid1.hide();
    $('#js-gridContainer').append(grid1);
    /*set css variables for number of rows and columns*/
    document.documentElement.style.setProperty("--numRows", gridSize);
    document.documentElement.style.setProperty("--numColumns", gridSize);
    /*create the grid of tiles*/
    let numTiles = gridSize * gridSize;
    let initialBGColor = getGridBackgroundColor();
    let newTile = $('<div></div>').addClass('tile');
    newTile.data('tilecolor', initialBGColor);
    newTile.data('alpha', '100');
    addColorClass(newTile, initialBGColor);
    addOpacityClass(newTile);
    for (let i = 0; i < numTiles; i++) {
      grid1.append(newTile.clone(true));  /*'true' clones data AND eventHandlers*/
    }
    grid1.fadeIn(1000);
  }

  /**
   * Toggles "highlighted" class for a tile, to draw (color) or erase it.
   * If 'alpha' button is 'off', drawing in a color instantly sets its opacity
   * to 100%.
   * If 'alpha' button is 'on', and the currently selected drawing color
   * matches the existing tile color, then it increases/decreases the opacity of
   * the current color by 10%, depending on whether 'erase' is active, up/down
   * to 100%/0%..
   * If the currently selected drawing color is different than the existing tile
   * color, then the tile color is changed, with an initial opacity of 10% if
   * 'erase' is off.
   * With 'alpha' on, erase does not affect existing tiles of a color different
   * than the currently selected drawing color.
   *
   * Param: currentTile       html grid tile element to be colored (div)
   */
  function drawOnTile(currentTile) {
    if (getEraseOnStatus()) {
      /*erase button on*/
      if (getAlphaOnStatus()) {
        /*alpha button on: (only if tile and draw colors match) maintain color, decrease opacity*/
        if (currentTile.data('tilecolor') === getCurrentDrawColor()) {
          removeOpacityClass(currentTile);
          decreaseAlpha(currentTile);
          addOpacityClass(currentTile);
        }
      } else {
        /*alpha button off: change color to background color*/
        removeColorClass(currentTile);
        addColorClass(currentTile, getGridBackgroundColor());
      }
    } else {
      /*erase button off*/
      if (getAlphaOnStatus()) {
        /*alpha button on:*/
        if (currentTile.data('tilecolor') !== getCurrentDrawColor()) {
          /*new color: change color and set opacity to 10%*/
          removeColorClass(currentTile);
          addColorClass(currentTile, getCurrentDrawColor());
          removeOpacityClass(currentTile);
          /*set the starting opacity on a tile that is changing color*/
          currentTile.data('alpha', '10');
          addOpacityClass(currentTile);
        } else {
          /*same color: increase opacity*/
          removeOpacityClass(currentTile);
          increaseAlpha(currentTile);
          addOpacityClass(currentTile);
        }
      } else {
        /*alpha button off: change color*/
        removeColorClass(currentTile);
        addColorClass(currentTile, getCurrentDrawColor());
      }
    }
  }

  /**
   * Event Handler for button to Turn On and Reset the main drawing grid.
   */
  $('#js-onButton').on('click', function(event) {
    event.preventDefault();
    let onButton = $(this);
    /*prompt user for number of rows/columns*/
    // let numRows = promptGridSize();  /*returns -1 if user cancels prompt*/
    let numRows = 16;
    /*create grid if prompt was a valid grid size.*/
    if (numRows > 0) {
      if (onButton.data('alreadyclicked') === 'true') {
        $('.tiles-container').remove();
      } else {
        onButton.data('alreadyclicked', 'true');
        onButton.addClass('button-control-highlighted');
      }
      createGrid(numRows);
    }
  });

  /**
   * Event Handler for button to Turn off the main drawing grid.
   * also removes removes higlight of the 'on' button.
   */
  $('#js-offButton').on('click', function(event) {
    event.preventDefault();
    /*remove any existing grid and un-highlight the "on" button*/
    let grid = $('.tiles-container');
    let onButton = $('#js-onButton');
    if (grid.length) {
      grid.remove();
      onButton.removeClass('button-control-highlighted');
      onButton.data('alreadyclicked', 'false');
    }
    /*if erase button is on, toggle it off, and un-highlight*/
    if (getEraseOnStatus()) {
      toggleEraseOnStatus();
      $('#js-eraseButton').removeClass('button-control-highlighted');
    }
  });

  /**
  * Event Handler for button to reset all grid tiles to the current background
  * color, and reset the opacity to 100%.
  * note: Maintains current grid and grid size.
  */
  $('#js-clearGridButton').on('click', function(event) {
    event.preventDefault();
    /*only run the code if the grid exists*/
    let currentBackgroundColor = getGridBackgroundColor();
    if ($('.tiles-container').length) {
      $('.tile').each(function() {
        let currentTile = $(this);
        if (currentTile.data('tilecolor') !== currentBackgroundColor) {
          removeColorClass(currentTile);
          addColorClass(currentTile, currentBackgroundColor);
        }
        removeOpacityClass(currentTile);
        currentTile.data('alpha', '100');
        addOpacityClass(currentTile);
      });
    }
  });

  /**
   * Event Handler for button to toggle "erase" on/off.
   * Only functions if the 'on' button is activated.
   */
  $('#js-eraseButton').on('click', function(event) {
    event.preventDefault();
    /*only toggle erase if the 'on' button is activated*/
    if ($('#js-onButton').hasClass('button-control-highlighted')) {
      toggleEraseOnStatus();
      let eraseButton = $(this);
      /*add/remove hightlight of erase button, and update button text*/
      if (getEraseOnStatus()) {
        eraseButton.addClass('button-control-highlighted');
        eraseButton.text('Erase ON');
      } else {
        eraseButton.removeClass('button-control-highlighted');
        eraseButton.text('Erase OFF');
      }
    }
  });

  /**
   * Event Handler for button to toggle "alpha" on/off.
   * Only functions if the 'on' button is activated.
   */
  $('#js-alphaButton').on('click', function(event) {
    event.preventDefault();
    /*only toggle alpha if the 'on' button is activated*/
    if ($('#js-onButton').hasClass('button-control-highlighted')) {
      toggleAlphaOnStatus();
      let alphaButton = $(this);
      /*add/remove hightlight of alpha button, and update button text*/
      if (getAlphaOnStatus()) {
        alphaButton.addClass('button-control-highlighted');
        alphaButton.text('Alpha Coloring ON');
      } else {
        alphaButton.removeClass('button-control-highlighted');
        alphaButton.text('Alpha Coloring OFF');
      }
    }
  });

  /**
   * Event Handler for button to open the menu panel to select the backround color.
   * note: Does not actually change the background color.
   */
  $('#js-setBGColorButton').on('click', function(event) {
    event.preventDefault();
    $('#js-controlPanelRight').slideToggle(500);
  });

  /**
   * Event Handler for button to select the backround color for both the tiles,
   * and the tile container (background for the alpha-coloring), and close the
   * selection menu panel.
   * note: Menu panel is opened by another event handler.
   */
  $('#js-buttonContainerRight').on('click', '.button-color', function(event) {
    event.preventDefault();
    currentColorButton = $(this);
    let currentBackgroundColor = getGridBackgroundColor();
    let newBackgroundColor = currentColorButton.attr('name');
    /*If grid exists (at least one tile exists) update any existing tiles of background color*/
    let tilesContainer = $('.tiles-container');
    if (tilesContainer.length) {
      $('.tile').each(function() {
        let currentTile = $(this);
        if (currentTile.data('tilecolor') === currentBackgroundColor) {
          removeColorClass(currentTile);
          addColorClass(currentTile, newBackgroundColor);
        }
      });
      /*also update the container background to handle the alpha-coloring bg*/
      removeColorClass(tilesContainer);
      addColorClass(tilesContainer, newBackgroundColor);
    }
    /*update the new color button to be selected*/
    $('#js-buttonContainerRight').find('.button-color-selected').removeClass('button-color-selected');
    currentColorButton.addClass('button-color-selected');
    /*close the default color selection panel*/
    $('#js-controlPanelRight').slideToggle(500);
  });

  /**
   * Event Handler for buttons to set the current drawing color (on Left Panel).
   * note: also highlights the button.
   * note: Menu panel is opened by another event handler.
   */
  $('#js-buttonContainerLeft').on('click','.button-color', function(event) {
    event.preventDefault();
    let currentColorButton = $(this);
    $('#js-buttonContainerLeft').find('.button-color-selected').removeClass('button-color-selected');
    currentColorButton.addClass('button-color-selected');
  });


  /**
   * Event Handler to capture initial mousedown, and begin drawing/erasing.
   * note: only activates if click is on a tile element.
   */
  $('#js-gridContainer').on('mousedown', '.tile', function(event) {
    event.preventDefault();
    mouseStillDown = true;        /*global variable*/
    drawOnTile($(this));
  });

  /**
   * Event Handler to capture end of mouse movement (mouseup), and end drawing/erasing.
   */
  $(document).on('mouseup', function(event) {
    event.preventDefault();
    mouseStillDown = false;        /*global variable*/
  });

  /**
   * Event Handler to capture additional mouse movement, while mouse is down,
   * and continue drawing/erasing.
   * note: Only activates if enters another tile element.
   */
  $('#js-gridContainer').on('mouseenter', '.tile', function(event) {
    event.preventDefault();
    if (mouseStillDown) {        /*global variable*/
      drawOnTile($(this));
    }
  });

});  /*end of ready()*/
