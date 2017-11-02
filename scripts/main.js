

$(document).ready(function() {

  let mouseStillDown = false;
  let eraseOn = false;


/////////////////////////////////////////////////////////////////////
// asks user for a positive integer.  Checks, and repeats prompt until:
// 1.  user enters positive integer:  returns the integer
// 2.  user clicks 'cancel' on prompt, or enters an empty string:  returns '-1'
function promptGridSize() {
  // console.log('ran promptGridSize function');
  let invalidInput = true;
  let answer = prompt('Please enter the number of rows/columns, as a positive integer:', '10');
  let gridSize = parseFloat(answer);
  // console.log('size entered: ' + gridSize);
  while (invalidInput) {
    if ((answer === null) || (answer === "")) {
      gridSize = -1;
      invalidInput = false;
      // console.log('prompt - canceled');
      return gridSize;
    } else if ((typeof gridSize === 'number') && (gridSize % 1 === 0) && (gridSize > 0)) {
      invalidInput = false;
      // console.log('prompt - good answer: ' + gridSize);
      return gridSize;
    } else {
      // console.log('prompt - BAD answer: ' + gridSize);
      answer = prompt('Incorrect format entered.  Please enter the number of rows/columns, as a positive integer:', '10');
      gridSize = parseFloat(answer);
      // console.log('new size entered: ' + gridSize);
    }
  }
}

/////////////////////////////////////////////////////////////////////

  // Build Grid system of tiles to draw with - Method 1
  function createGrid() {
    //prompt user for number of rows/columns
    let gridSize = promptGridSize();
    //let gridSize = 80;

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
      let newTile = $('<div></div>').addClass('tile');
      for (let i = 0; i < numTiles; i++) {
          grid1.append(newTile.clone());
      }

      grid1.fadeIn(100);
      //grid1.show();
    }
  }


  /////////////////////////////////////////////////////////////////////
/*
    // Build Grid system of tiles to draw with - Method 1
    function createGrid1() {
      //prompt user for number of rows/columns
      let cancelGridCreation = false;
      let waitingForQualifyingAnswer = true;
      let answer = prompt('Please enter the number of rows/columns, as a positive integer:', '10');
      let gridSize = parseFloat(answer, 10);
      console.log('size entered: ' + gridSize);
      while (waitingForQualifyingAnswer === true) {
        if (answer == null || answer == "") {
          cancelGridCreation = true;
          console.log('prompt - canceled');
          waitingForQualifyingAnswer = false;
        } else if (typeof gridSize === 'number' && gridSize % 1 === 0 && gridSize > 0) {
          waitingForQualifyingAnswer = false;
          console.log('prompt - good answer: ' + gridSize);
        } else {
          console.log('prompt - BAD answer: ' + gridSize);
          answer = prompt('Incorrect format entered.  Please enter the number of rows/columns, as a positive integer:', '16');
          gridSize = parseFloat(answer, 10);
          console.log('new size entered: ' + gridSize);
        }
      }

      //create grid, and a frame in which to center the grid
      // only create the grid if user did not cancel the prompt
      if (cancelGridCreation === false) {
        let grid1 = $('<div></div>').addClass('tiles-container grid1-id');
        grid1.hide();
        let gridsContainer = $('#js-gridsContainer');
        gridsContainer.append(grid1);
        // let gridHeight = gridsContainer.height();
        // let tileHeight = gridHeight / gridSize;
        // console.log('gridHeight is: ' + gridHeight);
        // console.log('tileHeight is: ' + tileHeight);
        // let gridWidth = gridsContainer.width();
        // let tileWidth = gridWidth / gridSize;
        // console.log('gridWidth is: ' + gridWidth);
        // console.log('tileWidth is: ' + tileWidth);
        // $('.tile').css({'height': 'tileHeight', 'width': 'tileWidth'});

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

/////////////////////////////////////////////////////////////////////

// note - no object available, for grids, to call fadeIn() on....PROBLEM

  // buttons to create the main drawing grid 1
  $('#js-runGridButton').on('click', function() {
    if ($(this).data('clicked') === false) {
      createGrid();
      $(this).data('clicked', 'true');
    } else {
      alert('Grid has already been displayed');
    }
  });

  // buttons to create the main drawing grid 1
  // $('#js-runGrid2Button').on('click', function() {
  //   if ($(this).data('clicked') === false) {
  //     createGrid2();
  //     $(this).data('clicked', 'true');
  //   } else {
  //     alert('Grid 2 has already been displayed');
  //   }
  // });

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

// option 2 - mousemove instead of mouseenter
// (ttried: was equally responsive as mouseenter - still skipped with fast mouse movement)
// $('#js-gridContainer').on('mousemove', '.tile', function(event) {
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
