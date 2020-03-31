# Visualization Assignment

This is the assignment for the Visualization module for the course CSTE: CMV at Cranfield University.

The current features of the application is:

- Display port to display a surface mesh
- Save image as

Pending features (**TODO**):

- Features required by the assignment

# Uncertainties with the base project

## Notes of the JS files

### WebGLcontext-shadersNew.js

- Main function `createGLContext(canvas)`
  - Has an empty catch block. Probably not good.
- `setupShaders()` configures the WebGL shaders
  - It also stores the positions of the WebGL attributes
  - Currently, it looks like the color attribute is commented out (`line 80`).

### WebGLbuffersNew.js

- `setupBuffers(mode)` creates and calculates WebGL buffers. _What are these used for though?_

### WebGLsurfacesNew.js

- Holds the functions to create parametric surfaces or superellipsoids.
- I think this will be the function triggered when the corresponding button is pressed.
  **TODO: Check if this function is triggered in the HTML file.**
- `defineSurface2()` is blank but it is supposed to be used to calculate the position and normal buffers for the specific parameteric surfaces.
- _How is `defineSurface3()` or `defineSurface4()` or `defineSurface5()` or `defineSurface6()` different to the previous one?_

### WebGLdrawingFunctionNew.js

- `drawFigure()` draws the WebGL model.
- It checks the rendering mode and type of surface and draws the correct elements.
- _Where is this `State` object coming from?_
- It has one property called rendering. _Is this from WebGL or defined globally elsewhere?_ **It might be a WebGL context thing.**

### WebGLeventHandlersNew.js

- Just a bunch of event listeners (i.e. key presses, or context-sensitivity), with model view navigation functions (i.e. zoom).

### WebGLchangingFunctionsNew.js

### GUIhelpingFunctionsNew.js

### WebGLObjectNew.js

### lena.js

# Usage

Currently, open the `.html` in the browser.

Alternatively, use **TODO: Something that spins up a quick server. Perhaps a nodejs thing.**

# Maintenance

This project is not planned to be supported past the submission on the 06 Apr 2020.
