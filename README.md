# etch_a_sketch

This is an in-browser sketchpad, somewhat like an etch-a-sketch, managed by javaScript and jQuery.  This is a project to focus mainly on using jQuery, following instructions from The Odin Project.

In short there is a square display screen (grid) of fixed dimensions.  Within this display, the user can select the number rows/columns of tiles.  These tiles are transparent initially, allowing the background color to come through as a blank canvas.  Drawing then is achieved by clicking the mouse on a tile to change its color, and then dragging across additional tiles until a mouse-up event.    


In this first version, several extra buttons were added for features:

1. 'On/Reset' - Creates the grid of tiles that can be colored, and returns all tiles to the current 'background' color on 'Reset.' 'On' and 'Reset' both invoke the initial creation of the grid, and thus offer the user the opportunity to select/re-select the grid size, or number of tiles in each row.  
2. 'Off' - Turns off the drawing grid.  The current color is maintained after selecting 'Off' in the event that the machine is turned on again.
3. 'Clear' - Resets all of the tiles to be the background color (actually makes all tiles transparent)
4. 'Erase' - Toggles erase on and off.  When on, the drawing color is overridden to be the current background color.
5. 'Change Canvas Color' - Toggles open a second color menu, to select the default background (empty/erase) color for the grid.  This does not reset the canvas, but simply changes the underlying background color.  This selection is maintained through 'reset,' 'clear,' and 'off', in fact until the page is actually reloaded.


Factors accepted in this version, that could be changed in a later version:

1. Several global variables have been allowed: eraseOn, mouseStillDown, gridBackgroundColor, and availableColors.  As well, the entire javaScript code is encapsulated in a single $(document).ready() function, as it is only meant to be a single page, and it was decided to not focus on isolation strategies until later versions or projects (also was not yet covered in The Odin Project curriculum).

2. jQuerey has been used in many places where the same result could be achieved using only javaScript. This is intended, for this is a project to practice jQuery.  The instructions required the grid and tiles be dynamically created using javascript/jQuery, instead of html.

3. Two css variables were used to keep track of the number of rows and columns in the grid, using "display: grid" property in css for the container.  Certainly there are other ways to do this, and this is probably not well supported in older browsers.  However, it just seemed like a nifty way to do it here, and so it has been done.  

4. When drawing, fast mouse movement results in skipping a lot of tiles, and inconsistent results.  This is exacerbated when the tiles are chosen to be very small (large value for gridSize).  

5. In general, no attempt has been made to make the page compatible to the various browsers and versions.  Testing was done only on the latest version of Chrome and Firefox.  Issues will be found on other browsers, and on older browsers, and may not work at all.

5. The suggested grid size was a static 960px, and it was chosen to make the size an even 1000px.  This brought the total size of the machine screen to about 1280px wide, which will often cause it to be larger than the visible screen upon initial page loading, depending on screen resolution (ie: user probably needs to zoom out in order to see the entire app).

6. CSS sizing of px was used, which results in non-responsive sizing, but went along with the idea that instructions asked for a static screen size of 960px.

7. Named colors were primarily used, for easy reference, and to be able to concatenate the color string stored in the html element data-tilecolor to form the color classes, which were used to color the tiles (background color).




Additions not yet made:

1. Drop-down or fade-in instruction panel (not really necessary, as is a simple draw pad)

2. Optional instruction to add alpha coloring, adding/removing opacity with additional, repeat drawings on the same tile.

3. Keep the cursor from highlighting text/items on the website when drawing 'outside' the boundaries of the drawing grid.

4. Smooth the drawing mechanism (mouse capture) so that there is less skipping of tiles during fast mouse movement (especially with a large number of rows/columns).
