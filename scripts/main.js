
$(document).ready(function() {

  let mouseStillDown = false;  /*keeps track of mousebutton position for drawing*/
  let eraseOn = false;         /*tracks toggle state of 'erase' button. erase is off to begin.*/
  let gridBackgroundColor = 'white'  /*used to set intitial grid background color in createGrid()*/
  let availableColors = ['white', 'yellow', 'orange', 'pink', 'red', 'lightblue', 'blue', 'lawngreen', 'green', 'indigo', 'saddlebrown', 'lightgrey', 'grey', 'black'];

  /*Code Executed at Page Loading - creates the 2 color button menus*/
  createColorButtons($('#js-buttonContainerLeft'), availableColors);
  createColorButtons($('#js-buttonContainerRight'), availableColors);

  /**
   * get and toggle methods for global variable eraseOn.
   */
  function getEraseOnStatus() {
    return eraseOn;
  }

  function toggleEraseOnStatus() {
    eraseOn = eraseOn ? false : true;  /* ternary operator: condition ? case-true : case-false */
  }

  /**
   *  get/set methods for global variable gridBackgroundColor and its respective color class name.
   */
  function setGridBackgroundColor(color) {
    gridBackgroundColor = color;
  }

  function getGridBackgroundColor() {
    return gridBackgroundColor;
  }

  function getGridBackgroundColorClass() {
    return 'highlighted-' + getGridBackgroundColor();
  }

  /**
   * Create a set of color selection buttons inside a panel (div).
   * note: The css color classes must already exist for the colors in the array.
   * note: Automatically sets the last color of the array as the "selected" color.
   *
   * Param: colorPanel      The HTML element in which to add the Buttons.
   * Param: colorArray      An array of named colors to include.
   */
  function createColorButtons(colorPanel, colorArray) {
    let arrayLength = colorArray.length;
    for (let j = 0; j < arrayLength; j++) {
      let newColorButton = $('<button type="button"></button>');
      newColorButton.attr('name', colorArray[j]);
      let newColorClass = 'highlighted-' + colorArray[j];
      newColorButton.addClass(newColorClass);
      newColorButton.addClass('button-color');
      if (j === arrayLength - 1) {
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
   * note: requires use of css variables (declared in ::root at top of master.css file).
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
    let newTile = $('<div data-tilecolor="none"></div>').addClass('tile');
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
  function highlightElement(currentDrawElement, newColor) {
    if (currentDrawElement.data('tilecolor') !== 'none') {
      removeColorClass(currentDrawElement);
    }
    currentDrawElement.addClass('highlighted-' + newColor);
    currentDrawElement.data('tilecolor', newColor);
  }

  /**
   * Toggles "highlighted" class for a tile, to draw (color) or erase it.
   *
   * Param: currentTile       html grid tile element to be colored (usually a div)
   */
  function drawOnTile(currentTile) {
    /*erase tile if erase button is activated:"true"*/
    if (getEraseOnStatus()) {
      removeColorClass(currentTile);
    }
    else {
      /*highlight tile if erase button is not activated: "false"*/
      let newColor = $('#js-buttonContainerLeft').find('.button-color-selected').first().attr('name');
      highlightElement(currentTile, newColor);
    }
  }

  /**
   * Event Handler for button to Turn On and Reset the main drawing grid.
   */
  $('#js-onButton').on('click', function(event) {
    event.preventDefault();
    let onButton = $(this);
    /*prompt user for number of rows/columns*/
    let numRows = promptGridSize();  /*returns -1 if user cancels prompt*/
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
   * Event Handler for button to open the menu panel to select the backround color.
   * note: Does not actually change the background color.
   */
  $('#js-setDefaultColorButton').on('click', function(event) {
    event.preventDefault();
    $('#js-controlPanelRight').slideToggle(500);
  });

  /**
   * Event Handler for button to elect the backround color (un-colored tiles),
   * and close the selection menu panel.
   * note: Menu panel is opened by another event handler.
   */
  $('#js-buttonContainerRight').on('click', '.button-color', function(event) {
    event.preventDefault();
    let newBackgroundColor = $(this).attr('name');
    setGridBackgroundColor(newBackgroundColor);
    // If grid exists (at least one tile exists) update any existing tiles of default color
    let tileContainer = $('.tiles-container');
    if (tileContainer.length) {
      highlightElement(tileContainer, getGridBackgroundColor());
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
