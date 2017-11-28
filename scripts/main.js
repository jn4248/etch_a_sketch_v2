
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
   * Increase value for alpha data attribute by 0.1
   *
   * Param: currentTile     tile element (div)
   */
  function increaseAlpha(currentTile) {
    let currentAlpha = currentTile.data('alpha');
    console.log('increasing alpha');
    console.log('alpha data type is of type: ' + typeof currentAlpha);
    console.log('value is: ' + currentAlpha);
    if (currentAlpha < 100) {
      console.log('alpha was less than 100');
      let newAlpha = currentAlpha + 10;
      currentTile.data('alpha', newAlpha);
    }
    console.log('end of increase');
  }

  /**
   * Decrease value for alpha data attribute by 0.1
   *
   * Param: currentTile     tile element (div)
   */
  function decreaseAlpha(currentTile) {
    let currentAlpha = currentTile.data('alpha');
    console.log('increasing alpha');
    console.log('alpha data type is of type: ' + typeof currentAlpha);
    console.log('value is: ' + currentAlpha);
    if (currentAlpha > 0) {
      console.log('alpha was greater than 0');
      let newAlpha = currentAlpha - 10;
      currentTile.data('alpha', newAlpha);
    }
    console.log('end of decrease');
  }

  /**
   * Get the opacity class name for an element, based on its alpha data attributes.
   *
   * Param:   currentTile       Element whis is colored (usualy div)
   *
   * Returns:   Opacity CSS Class Name (String)
   */
  function getOpacityClass(currentTile) {
    return 'opacity-' + currentTile.data('alpha');
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
   *
   * Param: gridSize            Number of rows/columns in the grid (Number)
   * Param: backgroundColor     Color of the container background (named Color)
   */
  function createGrid(gridSize, backgroundColor) {
    // create grid element and set default background color for canvas
    let grid1 = $('<div></div>').addClass('tiles-container');
    grid1.hide();
    grid1.addClass(getGridBackgroundColorClass());
    $('#js-gridContainer').append(grid1);
    /*set css variables for number of rows and columns*/
    document.documentElement.style.setProperty("--numRows", gridSize);
    document.documentElement.style.setProperty("--numColumns", gridSize);
    /*create the grid of tiles*/
    let numTiles = gridSize * gridSize;
    let newTile = $('<div data-tilecolor="white" data-alpha="0"></div>').addClass('tile');
    for (let i = 0; i < numTiles; i++) {
      grid1.append(newTile.clone(true));  /*'true' clones data AND eventHandlers*/
    }
    grid1.fadeIn(1000);
  }

  /**
   * Removes highlighted color class from a drawing element.
   * note: Tiles are initialized with data-tilecolor attribute of "none" in createGrid().
   * note: Drawing elements can only have 1 color assigned at any given time.
   *
   * Param: currentDrawElement    html element carrying a color class (usually a div)
   */
  function removeColorClass(currentDrawElement) {
    let currentColor = currentDrawElement.data('tilecolor');
    if (currentColor !== 'none') {
      let currentColorClass = 'highlighted-' + currentColor;
      currentDrawElement.removeClass(currentColorClass);
      /*re-initialize data-tilecolor to 'none'*/
      currentDrawElement.data('tilecolor', 'none');
    }
  }

  /**
   * Removes highlighted color class from a drawing element.
   * note: Tiles are initialized with data-tilecolor attribute of "none" in createGrid().
   * note: Drawing elements can only have 1 color assigned at any given time.
   *
   * Param: currentDrawElement    html element to be colored (usually a div)
   * Param: newColorClass         color to apply to element (String)
   */
  function addColorClass(currentDrawElement, newColor) {
    if (currentDrawElement.data('tilecolor') !== 'none') {
      removeColorClass(currentDrawElement);
    }
    currentDrawElement.addClass('highlighted-' + newColor);
    currentDrawElement.data('tilecolor', newColor);
  }

  function updateOpacityClass(currentDrawElement, alpha) {

  }

  /**
   * Toggles "highlighted" class for a tile, to draw (color) or erase it.
   *
   * Param: currentTile       html grid tile element to be colored (usually a div)
   */
  function drawOnTile(currentTile) {
    /*case for 'erase' and/or 'alpha' buttons are 'on': remove color/shades*/
    if (getEraseOnStatus()) {
      if (getAlphaOnStatus()) {
        decreaseAlpha(currentTile);
      } else {
        removeColorClass(currentTile);
      }
    } else {
      /*case for erase and/or alpha buttons are 'off': add color/shades*/
      if (getAlphaOnStatus()) {
        increaseAlpha(currentTile);
      }
      else {
        let newColor = $('#js-buttonContainerLeft').find('.button-color-selected').first().attr('name');
        addColorClass(currentTile, newColor);
      }
    }
  }
// PROBLEM: IN ALPHA CASE, (BOTH IN/DE), COLOR NEEDS TO BE CHANGED FIRST TIME, BUT NOT IN REPEATED TIMES...
//           OR, COULD ADD COLOR CLASS EVERYTIME ALPHA CHANGED, BUT IS UNNECESSARY. MIGHT BE EASIER/QUICKER
//           THAN ACTUALLY CHECKING TO SEE IF IT'S THE FIRST TIME OR NOT.
//          ALSO: NOT ACTUALLY ADDING THE OPACITY CLASSES. NEED ADD/REMOVE CLASSES? SHOULD BE DONE IN INCREASE/DECREASE?
//          ALSO: CHECK THE REMOVE/ADD OF COLOR CLASS (METHODS).


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
      createGrid(numRows, getGridBackgroundColor());
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
  * Event Handler for button to reset all grid tiles show background color.
  * note: Maintains current grid and grid size.
  */
  $('#js-clearGridButton').on('click', function(event) {
    event.preventDefault();
    /*only run the code if the grid exists*/
    if ($('.tiles-container').length) {
      $('.tile').each(function() {
        let currentTile = $(this);
        if (currentTile.data('tilecolor') !== 'none') {
          removeColorClass(currentTile);
        }
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
  $('#js-setDefaultColorButton').on('click', function(event) {
    event.preventDefault();
    $('#js-controlPanelRight').slideToggle(500);
  });

  /**
   * Event Handler for button to select the backround color (un-colored tiles),
   * and close the selection menu panel.
   * note: Menu panel is opened by another event handler.
   */
  $('#js-buttonContainerRight').on('click', '.button-color', function(event) {
    event.preventDefault();
    let newBackgroundColor = $(this).attr('name');
    // If grid exists (at least one tile exists) update any existing tiles of default color
    let tileContainer = $('.tiles-container');
    if (tileContainer.length) {
      addColorClass(tileContainer, newBackgroundColor);
    }
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
    $('.button-color-selected').removeClass('button-color-selected');
    $(this).addClass('button-color-selected');
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
