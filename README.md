# etch_a_sketch_ver2

This is an in-browser sketchpad, somewhat like an etch-a-sketch, managed by javaScript and jQuery.  This is a project to focus mainly on using jQuery, following instructions from The Odin Project.

In short there is a square display screen (grid) of fixed dimensions.  Within this display, the user can select the number rows/columns of tiles.  These tiles are transparent initially, allowing the background color to come through as a blank canvas.  Drawing then is achieved by clicking the mouse on a tile to change its color, and then dragging across additional tiles until a mouse-up event.    

Changes / Additions added in Version 2:
--------------------------------------
Features:

1. 'Alpha Coloring' button - if on (toggles on/off), and the 'Erase' button is off, drawing occurs in the currently selected color, but with an initial opacity of 0.1. Each successive draw/pass over a tile, using the same color, increases the opacity by 10% (or by 0.1), up to a maximum opacity of 1.0.  If the currently selected color is changed, and the 'Alpha Coloring' is still on, the new color  begins with the opacity reset again to 0.1.  
If the 'Erase' button is toggled on, then the effect works in the same way, but decreasing the opacity by 10%, for any existing tiles matching the currently selected color.  With 'Erase' on, the 'Alpha Coloring' function has no effect on existing tiles of color different from the currently selected color.
Whether 'Erase' is on or off, tiles will only increase/decrease in opacity when either they are clicked, or the mouse enters the area of the tile.  That is, keeping the mouse over a tile while holding the mouse button down, has no additional or cumulative effect on opacity. The user must either repeatedly click on the tile, or move out of the tile area, and then back into the tile area, while holding down the mouse button.

Changes:

1. Instead of changing colors to rgba, and using the alpha to control the shading, css property opacity was used.  Opacity is only being applied to tile elements, and there are no child elements coupled to the tiles.  Also, this allows usage of the already-existing css 'highlighted' color classes, by simply adding 10 more 'opacity' classes in css.  Left naming in javascript as 'alpha' despite actually controlling opacity.

2. Removed size classes for dimensions on main control buttons (top), in favor of simply adding uniform padding on each control button.  More natural look, though not all the same size, and allows for variance of font size on different browsers.

3. Removed global variable gridBackgroundColor (set initial background color grid, so that it was not dependent on the order of the colors in the array availableColors).  Set the color (white) in the 'on' button event handler, with a check to use that color ONLY on the first time it is called.  Successive calls should use whichever color is currently selected in the background color menu panel.

4. Added additional color parameter to createColorButtons() to account for having different initially selected colros for each panel.  No longer need to use global variable gridBackgroundColor to handle this, and also no longer need get/set/getColorClass functions for the gridBackgroundColor variable.

5. Changed function highlightElement() to addColorClass() to be similar with existing removeColorClass(), and introduced addOpacityClass() and removeOpacityClass() functions.  Key difference is that adding a color class also takes a 'color' parameter, and  updates the data attribute 'tilecolor' for the element, whereas the alpha/opacity data attribute is updated outside of the add/remove functions for opacity.

6. removed function removeColorClass() from addColorClass() and called each separately in drawOnTile() (and other locations in code) as necessary.  

7. Changed default canvas color from background color of container, to the actual tiles. Tiles are now set with initial color and opacity attributes, and respective classes added, as defined in createGrid() function.

8. Set the underlying background color for the grid container in createGrid().  This color is autmoatically updated with changes to the currently selected background color for the drawing grid via the dropdown menu.  This color becomes the default background color when alpha-coloring is applied to tiles.  

9. Added various get/set methods, increase/decrease methods to update opacity, add/remove methods for classes.


Factors accepted in this version, that could be changed in a later version:

1. When applying alpha-coloring in a color different than what already exists, the pre-existing color is simply removed completely, instead of becoming the background color for the new alpha-coloring.  This is because the entire grid container can only be set to one background color (which is the color that shows through the tiles that have partial opacity).  To allow alpha-coloring over a pre-exising tile coloring, and have that be unique for each tile, there would have to be multiple layers to the grid...11 layers, given the current opacity gradients of 10% increments. (0, 10, ... 90, 100).  This is out of the scope of this version.

2. With a few exceptions, opted to make calls to the DOM rather than use global variables in javascript.  2 variables were tracked via html data attributes (tilecolor and opacity/alpha).  Speed could probably be improved for grids with higher number of rows/columns.






*********************************************************************

Etch-a-Sketch Version 1:
-----------------------

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
