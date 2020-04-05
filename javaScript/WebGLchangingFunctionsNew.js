////// WebGL changing functions //////

//////SHAPES//////

////Change the basae shape for the WebGL model
/**
 * Change of the WebGL shape
 *
 * Changes the shape used for the WebGL model generating the new surface, updating the state of the model and
 * sometimes changing the border of the html image elements (predefined shapes) and redrawing the model.
 * @param {number} n number of the new shape
 * @param {string} id id of the html element
 * @param {string} cl class of the html element
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function changeShape(n, id, cl, mode) {
  switch (n) {
    case 0:
      defineSurface1(-15, 15, -15, 15);

      break;

    case 1:
      defineSurface2(0, 2 * Math.PI, 0, 20, 10);

      break;

    case 2:
      defineSurface3(-Math.PI / 2, Math.PI / 2, 0, 2 * Math.PI, 10);

      break;

    case 3:
      defineSurface4(0, 10, 0, 2 * Math.PI);

      break;

    case 4:
      defineSurface5(0, 2 * Math.PI, -6, 6, 4);

      break;

    case 5:
      defineSurface6(0, 2 * Math.PI, 0, 2 * Math.PI, 20, 10);

      break;

    case 6:
      defineSurface7(0, 2 * Math.PI, 0, 2 * Math.PI);

      break;

    case 7:
      defineSurface8(
        -0.5 * Math.PI,
        0.5 * Math.PI,
        -0.5 * Math.PI,
        0.5 * Math.PI
      );

      break;
  }

  if (mode == 0) {
    State.figure = n;
    changeBorder(1, id, cl);
    drawFigure();
  }
  SurfaceObj.id = n;
}

////Read the parametric surfaces equations and parameters to define the surface and draw it
/**
 * Reading of the parametric surfaces' box
 *
 * Reads the parametric surfaces' box, generates the surface according to those values and
 * calls the function to change the shape.
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function readPSbox(mode) {
  var xS = parseInt(document.getElementById("xEquation").value);
  var yS = parseInt(document.getElementById("yEquation").value);
  var zS = parseInt(document.getElementById("zEquation").value);

  var k1 = parseFloat(document.getElementById("xConstant").value);
  var k2 = parseFloat(document.getElementById("yConstant").value);
  var k3 = parseFloat(document.getElementById("zConstant").value);

  var um = parseInt(document.getElementById("umin").value) * Math.PI;
  var ux = parseInt(document.getElementById("umax").value) * Math.PI;
  var vm = parseInt(document.getElementById("vmin").value) * Math.PI;
  var vx = parseInt(document.getElementById("vmax").value) * Math.PI;

  defineParametricSurface(um, ux, vm, vx, k1, k2, k3, xS, yS, zS);

  if (mode == 0) {
    // to do, call changeShape appropriately
    drawFigure();
  }
}

////Read the parameters for the superellipsoid and draw it if it is correct
/**
 * Reading of the superellipsoids' box
 *
 * Reads the superellipsoids' box, generates the surface according to those values and
 * calls the function to change the shape.
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function readSEbox(mode) {
  var n1 = parseFloat(document.getElementById("n1").value);
  var n2 = parseFloat(document.getElementById("n2").value);

  if ((n1 && n2) || n1 == 0 || n2 == 0) {
    if (n1 <= 0 || n2 <= 0 || n1 > 5 || n2 > 5) {
      alert("Please introduce numbers between 0(not included) and 5");
      document.getElementById("n1").value = n1SE;
      document.getElementById("n2").value = n2SE;
    } else {
      n1SE = n1;
      n2SE = n2;
      defineSuperellipsoidSurface(
        -0.5 * Math.PI,
        0.5 * Math.PI,
        -1.0 * Math.PI,
        Math.PI,
        20.0,
        n1,
        n2
      );
      if (mode == 0) {
        drawFigure();
      } // to do call changeShape appropriately
    }
  } else {
    alert("Please introduce two numbers");
    document.getElementById("n1").value = n1SE;
    document.getElementById("n2").value = n2SE;
  }
}

////Use the customised image for the displacement
/**
 * Auxiliary function to use the customised image for the displacement
 *
 * Use the customised image for the displacement when it is clicked.
 * - If the image has not been previously charged, it asks the user to upload a new one
 * - If the image was previously charged, it checks if it is extracted well and calls the function to change it
 * @param {string} id id of the 2d canvas element with the customised image
 * @param {string} cl class of the 2d canvas element with the customised image
 */
function useUserImage(id, cl) {
  if (canvasUI.style.opacity == 0.4) {
    alert("Please select an image file");
    return;
  }

  if (State.valuesUserImageOK == 1) changeImage2(9, id, cl, 0);
  else {
    DrawAndExtract(0, Images.UserImage, 2);
    State.valuesUserImageOK = 1;
    changeImage2(9, id, cl, 0);
  }
}
//////RENDERING MODE//////
////Change the rendering mode
/**
 * Change of the WebGL rendering mode
 *
 * Changes the rendering mode for the WebGL mode and redraws it.
 * @param {number} n number of the new rendering mode
 */
function changeRendering(n) {
  if (n == 1) {
    gl.enable(gl.POLYGON_OFFSET_FILL); //Avoid z-fighting between surface and lines
    gl.polygonOffset(1.0, 1.0);
  } else if (State.rendering == n) gl.disable(gl.POLYGON_OFFSET_FILL);
  State.rendering = n;
  drawFigure();
}

//////MESH SIZE//////
////Change the size of the WebGL mesh (NxN) and the elements affected
/**
 * Change of the WebGL mesh size
 *
 * Changes the size of the WebGL mesh (NxN) and the elements affected.
 * @param {string} val string representing the new mesh size
 */
function changeSize(val) {
  var newN = parseInt(val);
  if (newN || newN == 0) {
    if (newN < 2) {
      alert("Please introduce a number greater than 1");
      document.getElementById("Nsize").value = State.N;
    } else {
      State.N = newN;
      setupBuffers(1); //Change all the buffers to adapt them to the new size size

      changeShape(SurfaceObj.id, 0, 0, 1);
      gl.uniform1i(wGL.uniformMonochColour, 0);
      gl.uniform1i(wGL.uniformMonochColour2, 0);
      gl.disableVertexAttribArray(wGL.vertexColourAttribute);
      gl.disableVertexAttribArray(wGL.vertexHValueAttribute);

      //Resize the canvas elements used for displacement and colouring
      resizeCanvas2D();
      drawFigure();
    }
  } else {
    alert("Please introduce a number");
    document.getElementById("Nsize").value = State.N;
  }
}

//////TRANSFORMATION MATRICES//////
////Helping functions to store (push) or take (pop) the ModelView matrix
/**
 * Auxiliary to store the ModelView matrix
 *
 * Stores (pushes) the ModelView matrix in the modelViewMatrixStack.
 */
function pushModelViewMatrix() {
  var copyToPush = mat4.clone(wGL.modelViewMatrix);
  wGL.modelViewMatrixStack.push(copyToPush);
}

/**
 * Auxiliary to extract the ModelView matrix
 *
 * Extracts (pops) the ModelView matrix from the modelViewMatrixStack.
 */
function popModelViewMatrix() {
  if (wGL.modelViewMatrixStack.length == 0) {
    throw "Error popModelViewMatrix() - Stack was empty ";
  }
  wGL.modelViewMatrix = wGL.modelViewMatrixStack.pop();
}

////Charge the default image on the canvas element used for the displacement or texture mapping images
/**
 * Auxiliary function to charge the default image on the 2d canvas elements
 *
 * Charges the default image on the canvas element used for the displacement or texture mapping images.
 * @param {number} num number to control the 2d canvas element to be used
 */
function userImageDefault(num) {
  if (num == 2) {
    contextUI.save();
    contextUI.drawImage(
      Images.UserDefault,
      0,
      0,
      canvasUI.width,
      canvasUI.height
    );
  } else {
    contextUC.save();
    contextUC.drawImage(
      Images.UserDefault,
      0,
      0,
      canvasUC.width,
      canvasUC.height
    );
  }
}

//////COLOUR//////
////Change the colour of the model
/**
 * Change of the colour of the WebGL model
 *
 * Changes the colour of the WebGL model.
 * @param {number} n number of the new colour
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function changeColour2(n, mode) {
  if (n == 3) {
    if (State.colour != 3) {
      document.getElementById("userColourBox").style.height = "350px";
      document.getElementById("textureColour").style.display = "block";
      document.getElementById("bm").style.display = "inline";
      document.getElementById("bmtext").style.display = "initial";
      hContainer(); //Update the minimum height of the container element
      if (canvasUC.style.opacity == 1) {
        //Texture mapping reopened after using it before (so there is an image)
        State.colour = 3;
        gl.uniform1i(wGL.uniformMonochColour, 1);
        gl.uniform1i(wGL.uniformMonochColour2, 1);
        gl.enableVertexAttribArray(wGL.vertexColourAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexColourBuffer);
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array(wGL.VertexColourValues),
          gl.STATIC_DRAW
        );
        gl.vertexAttribPointer(
          wGL.vertexColourAttribute,
          wGL.VCBufferItemSize,
          gl.FLOAT,
          false,
          0,
          0
        );
        drawFigure();
      }
    }

    if (mode == 1) {
      gl.uniform1i(wGL.uniformMonochColour, 1);
      gl.uniform1i(wGL.uniformMonochColour2, 1);
      gl.enableVertexAttribArray(wGL.vertexColourAttribute);
    }
  } else {
    if (
      mode != 1 &&
      document.getElementById("textureColour").style.display == "block"
    ) {
      document.getElementById("textureColour").style.display = "none";
      document.getElementById("userColourBox").style.height = "130px";
      document.getElementById("bm").style.display = "none";
      document.getElementById("bmtext").style.display = "none";
      hContainer(); //Update the minimum height of the container element
    }

    if (State.colour == 3 || mode == 1) {
      gl.uniform1i(wGL.uniformMonochColour, 0);
      gl.uniform1i(wGL.uniformMonochColour2, 0);
      gl.disableVertexAttribArray(wGL.vertexColourAttribute);
    }

    switch (n) {
      case 0:
        State.colour = 0;
        gl.vertexAttrib4f(wGL.vertexColourAttribute, 0.38, -0.2, -0.2, 1.0);
        break;
      case 1:
        State.colour = 1;
        gl.vertexAttrib4f(wGL.vertexColourAttribute, -0.1, 0.15, 0.08, 1.0);
        break;
      case 2:
        State.colour = 2;
        gl.vertexAttrib4f(wGL.vertexColourAttribute, 0.0, 0.18, 0.38, 1.0);
        break;
    }

    if (mode == 0) drawFigure();
  }
}

//////COLOUR//////
////Change the colour of the model
/**
 * Change of the colour of the WebGL model according to a colour selection
 *
 * Changes the colour of the WebGL model.
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function pickColor(mode) {
  var x = document.getElementById("myColor").value;
  var r = parseInt(
    (x.charAt(0) == "#" ? x.substring(1, 7) : x).substring(0, 2),
    16
  );
  var g = parseInt(
    (x.charAt(0) == "#" ? x.substring(1, 7) : x).substring(2, 4),
    16
  );
  var b = parseInt(
    (x.charAt(0) == "#" ? x.substring(1, 7) : x).substring(4, 6),
    16
  );
  gl.vertexAttrib4f(wGL.vertexColourAttribute, r / 255, g / 255, b / 255, 1.0);
  if (mode == 0) drawFigure();
}

////Change the customised image for texture mapping (colour)
/**
 * Change of the customised image for the colour of the WebGL model
 *
 * Changes the customised image for the colour of the WebGL model (texture mapping effect). It charges the image into the
 * auxiliary 2d canvas element and when it is loaded, it extracts its values and draws the model with the new colour.
 * @param {number} rot variable to control if the function has been called to charge the customised image rotated
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function changeUserImageColour2(rot, mode) {
  var selected_file = document.getElementById("inputUserC").files[0];

  if (!selected_file || !selected_file.type.match("image.*")) {
    alert("Please select an image file");
    return;
  }

  if (rot == 0 && mode == 0) {
    contextUC.restore();
    contextUC.save();
  }

  var url = window.URL || window.webkitURL;
  imUrl = url.createObjectURL(selected_file);

  Images.userColourOK = 0;

  var img = new Image();

  img.onload = function () {
    Images.loadingImages.splice(Images.loadingImages.indexOf(img), 1);
    Images.UserColour = img;
    canvasUC.style.opacity = 1;
    State.colour = 4;

    DrawAndExtract(0, img, 3);

    Images.userColourOK = 1;

    url.revokeObjectURL(imUrl);

    if (mode == 0) {
      gl.uniform1i(wGL.uniformMonochColour, 1);
      gl.uniform1i(wGL.uniformMonochColour2, 1);
      gl.enableVertexAttribArray(wGL.vertexColourAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexColourBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(wGL.VertexColourValues),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(
        wGL.vertexColourAttribute,
        wGL.VCBufferItemSize,
        gl.FLOAT,
        false,
        0,
        0
      );
      drawFigure();
    }
  };

  Images.loadingImages.push(img);
  img.src = imUrl;
}

////Change the customised image for the displacement
/**
 * Change of the customised image used for the displacement of the WebGL model
 *
 * Changes the customised image used for the displacement. It charges the image into the auxiliary 2d canvas element and
 * when it is loaded, it extracts its values.
 * @param {string} id id of the 2d canvas element
 * @param {string} cl class of the 2d canvas element
 * @param {number} rot variable to control if the function has been called to charge the customised image rotated
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function changeUserImage(id, cl, rot, mode) {
  var selected_file = document.getElementById("inputUserIM").files[0];

  if (!selected_file || !selected_file.type.match("image.*")) {
    contextUI.restore();
    contextUI.save();
    contextUI.clearRect(0, 0, canvasUI.width, canvasUI.height);
    contextUI.drawImage(
      Images.UserDefault,
      0,
      0,
      canvasUI.width,
      canvasUI.height
    );
    canvasUI.style.opacity = 0.4;
    if (State.image == 9) {
      //Deactivate previous one (it was being used)
      changeImage(9, id, cl, 0);
    }
    alert("Please select an image file");
    return;
  }

  if (rot == 0 && mode == 0) {
    contextUI.restore();
    contextUI.save();
  }

  var url = window.URL || window.webkitURL;
  imUrl = url.createObjectURL(selected_file);

  Images.userImageOK = 0;

  var img = new Image();

  img.onload = function () {
    Images.loadingImages.splice(Images.loadingImages.indexOf(img), 1);
    Images.UserImage = img;
    canvasUI.style.opacity = 1;

    DrawAndExtract(0, img, 2);

    State.valuesUserImageOK = 1;
    Images.userImageOK = 1;

    url.revokeObjectURL(imUrl);

    if (State.image == 9 && mode == 0) {
      //It was activated, so use the new one
      State.image = 0; //to make changeImage() charge image 9 again
      changeImage(9, id, cl, 0);
    }
  };

  Images.loadingImages.push(img);
  img.src = imUrl;
}

////Process the array of pixels for the bump mapping operation.
/**
 * Modification of the customised image used for the bump mapping of the WebGL model
 *
 * In order for the displacement mapping to work consistently at the edges of the model it is
 * necessary that the edge pixels of the image have the same value. Here opposite edges of the
 * image are given the same value computed as an average of the existing edge values.
 * @param {array} pixel array of the image
 */
function processImage(pix) {
  var ind = 4 * State.N;
  for (let i = 0; i < State.N - 2; i++) {
    pix[ind] = (pix[ind] + pix[ind + 4 * (State.N - 1)]) / 2;
    pix[ind + 1] = (pix[ind + 1] + pix[ind + 4 * (State.N - 1) + 1]) / 2;
    pix[ind + 2] = (pix[ind + 2] + pix[ind + 4 * (State.N - 1) + 2]) / 2;
    pix[ind + 4 * (State.N - 1)] = pix[ind];
    pix[ind + 4 * (State.N - 1) + 1] = pix[ind + 1];
    pix[ind + 4 * (State.N - 1) + 2] = pix[ind + 2];
    ind += 4 * State.N;
  }
  ind = 4;
  for (let j = 0; j < State.N - 2; j++) {
    pix[ind] = (pix[ind] + pix[ind + 4 * State.N * (State.N - 1)]) / 2;
    pix[ind + 1] =
      (pix[ind + 1] + pix[ind + 4 * State.N * (State.N - 1) + 1]) / 2;
    pix[ind + 2] =
      (pix[ind + 2] + pix[ind + 4 * State.N * (State.N - 1) + 2]) / 2;
    pix[ind + 4 * State.N * (State.N - 1)] = pix[ind];
    pix[ind + 4 * State.N * (State.N - 1) + 1] = pix[ind + 1];
    pix[ind + 4 * State.N * (State.N - 1) + 2] = pix[ind + 2];
    ind += 4;
  }

  pix[0] =
    (pix[0] +
      pix[4 * (State.N - 1)] +
      pix[4 * (State.N - 1) * State.N] +
      pix[4 * State.N * State.N - 4]) /
    4;
  pix[1] =
    (pix[1] +
      pix[4 * (State.N - 1) + 1] +
      pix[4 * (State.N - 1) * State.N + 1] +
      pix[4 * State.N * State.N - 4 + 1]) /
    4;
  pix[2] =
    (pix[2] +
      pix[4 * (State.N - 1) + 2] +
      pix[4 * (State.N - 1) * State.N + 2] +
      pix[4 * State.N * State.N - 4 + 2]) /
    4;

  pix[4 * (State.N - 1)] = pix[0];
  pix[4 * (State.N - 1) + 1] = pix[1];
  pix[4 * (State.N - 1) + 2] = pix[2];
  pix[4 * (State.N - 1) * State.N] = pix[0];
  pix[4 * (State.N - 1) * State.N + 1] = pix[1];
  pix[4 * (State.N - 1) * State.N + 2] = pix[2];
  pix[4 * State.N * State.N - 4] = pix[0];
  pix[4 * State.N * State.N - 4 + 1] = pix[1];
  pix[4 * State.N * State.N - 4 + 2] = pix[2];
}

////Assigns colour values to the array of pixels for the texture mapping operation.
/**
 * Use the image pixel RGB values to assign a colour to each vertex of the model
 *
 * @param {array} pixel array of the image
 */
function assignColourData(pix) {
  var index = 0;
  var ind = 0;

  for (let i = 0; i < State.N - 1; i++) {
    for (let j = 0; j < State.N - 1; j++) {
      wGL.VertexColourValues[ind] = pix[index] / 255;
      wGL.VertexColourValues[ind + 1] = pix[index + 1] / 255;
      wGL.VertexColourValues[ind + 2] = pix[index + 2] / 255;
      wGL.VertexColourValues[ind + 3] = pix[index + 3] / 255;

      wGL.VertexColourValues[ind + 4] = pix[index + 4 * State.N] / 255;
      wGL.VertexColourValues[ind + 5] = pix[index + 4 * State.N + 1] / 255;
      wGL.VertexColourValues[ind + 6] = pix[index + 4 * State.N + 2] / 255;
      wGL.VertexColourValues[ind + 7] = pix[index + 4 * State.N + 3] / 255;

      wGL.VertexColourValues[ind + 8] = pix[index + 4 * State.N + 4] / 255;
      wGL.VertexColourValues[ind + 9] = pix[index + 4 * State.N + 5] / 255;
      wGL.VertexColourValues[ind + 10] = pix[index + 4 * State.N + 6] / 255;
      wGL.VertexColourValues[ind + 11] = pix[index + 4 * State.N + 7] / 255;

      wGL.VertexColourValues[ind + 12] = pix[index + 4 * State.N + 4] / 255;
      wGL.VertexColourValues[ind + 13] = pix[index + 4 * State.N + 5] / 255;
      wGL.VertexColourValues[ind + 14] = pix[index + 4 * State.N + 6] / 255;
      wGL.VertexColourValues[ind + 15] = pix[index + 4 * State.N + 7] / 255;

      wGL.VertexColourValues[ind + 16] = pix[index + 4] / 255;
      wGL.VertexColourValues[ind + 17] = pix[index + 5] / 255;
      wGL.VertexColourValues[ind + 18] = pix[index + 6] / 255;
      wGL.VertexColourValues[ind + 19] = pix[index + 7] / 255;

      wGL.VertexColourValues[ind + 20] = pix[index] / 255;
      wGL.VertexColourValues[ind + 21] = pix[index + 1] / 255;
      wGL.VertexColourValues[ind + 22] = pix[index + 2] / 255;
      wGL.VertexColourValues[ind + 23] = pix[index + 3] / 255;

      ind += 24;
      index += 4;
    }
    index += 4;
  }
}

////Computes a displacement for each vertex of the model for the displacement mapping operation.
/**
 * Uses the RGB average of the pixel values to assign a displacement to the vertices of the model
 *
 * @param {array} pixel array of the image
 */
function computeHValues(pix) {
  processImage(pix);
  var count = 0;
  var index = 0;
  for (let i = 0; i < State.N - 1; i++) {
    for (let j = 0; j < State.N - 1; j++) {
      wGL.VertexHValues[count] =
        (pix[index] + pix[index + 1] + pix[index + 2]) / 255 / 3;
      wGL.VertexHValues[count + 1] =
        (pix[index + 4 * State.N] +
          pix[index + 4 * State.N + 1] +
          pix[index + 4 * State.N + 2]) /
        255 /
        3;
      wGL.VertexHValues[count + 2] =
        (pix[index + 4 * State.N + 4] +
          pix[index + 4 * State.N + 5] +
          pix[index + 4 * State.N + 6]) /
        255 /
        3;
      wGL.VertexHValues[count + 3] =
        (pix[index + 4 * State.N + 4] +
          pix[index + 4 * State.N + 5] +
          pix[index + 4 * State.N + 6]) /
        255 /
        3;
      wGL.VertexHValues[count + 4] =
        (pix[index + 4] + pix[index + 5] + pix[index + 6]) / 255 / 3;
      wGL.VertexHValues[count + 5] =
        (pix[index] + pix[index + 1] + pix[index + 2]) / 255 / 3;
      count += 6;
      index += 4;
    }
    index += 4;
  }
}

////Compute a greyscale for the array of pixels for the bump mapping operation.
/**
 * Modification of the customised image used for the bump mapping of the WebGL model
 *
 * We convert the image RGB values to a greyscale value by averaging the pixels
 * @param {array} pixel array of the image
 * @returns a 2D matrix of greyscale value pixels
 */
function convert(pix) {
  var mat = new Array(State.N);
  for (let i = 0; i < State.N; i++) mat[i] = new Array(State.N);

  var count = 0;
  for (let i = 0; i < State.N; i++)
    for (let j = 0; j < State.N; j++) {
      mat[i][j] =
        1.0 -
        (0.33 * pix[count] + 0.33 * pix[count + 1] + 0.33 * pix[count + 2]) /
          255;
      count += 4;
    }
  return mat;
}

////Compute the new normal vectors according to the bump mapping formula and display bump mapped model.
/**
 * Uses the prewitt operator to compute a gradient for the image in the two directions and
 * then updates the normal vectors for the vertices of the model according to the bump map equation.
 * Draws the model with the modified normal vectors
 *
 */
function bumpMap() {
  var checkBox = document.getElementById("bm");
  if (checkBox.checked == true) {
    var ctx = contextUC;
    var canv = canvasUC;
    var img = Images.UserColour;

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.drawImage(img, 0, 0, canv.width, canv.height); //Image scaled to canvasUI's size
    var imgd = ctx.getImageData(0, 0, canv.width, canv.height);
    var pixHoriz = LenaJS.prewittHorizontal(imgd);
    var pixVert = LenaJS.prewittVertical(imgd);
    var matx = convert(pixVert.data);
    var maty = convert(pixHoriz.data);
    var vec = [];
    var count = 0;
    for (let i = 0; i < State.N; i++)
      for (let j = 0; j < State.N; j++) {
        vec[count] = vec2.create();
        vec[count][0] = i;
        vec[count][1] = j;
        count++;
      }

    var surf = SurfaceObj.data;
    var VertexNormal = [];
    var VertexColourData = [];
    var VertexNormalData = [];
    VertexNormal = surf.ComputeNormalInfoImage(vec, matx, maty);

    var N = State.N;
    var k = 0;
    var k1 = 0;
    var count = 0;
    for (let i = 0; i < (N - 1) * (N - 1) * 6; i++) {
      VertexNormalData[k] = VertexNormal[i][0];
      VertexNormalData[k + 1] = VertexNormal[i][1];
      VertexNormalData[k + 2] = VertexNormal[i][2];
      VertexColourData[k1] = VertexNormal[i][0];
      VertexColourData[k1 + 1] = VertexNormal[i][1];
      VertexColourData[k1 + 2] = VertexNormal[i][2];
      VertexColourData[k1 + 3] = 1.0;
      count += 1;
      k += 3;
      k1 += 4;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(VertexNormalData),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexColourBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(VertexColourData),
      gl.STATIC_DRAW
    );
    gl.vertexAttribPointer(wGL.vertexNormalAttribute, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(wGL.vertexColourAttribute);
    gl.uniform1i(wGL.uniformMonochColour, 1);
    gl.uniform1i(wGL.uniformMonochColour2, 1);

    gl.disableVertexAttribArray(wGL.vertexHValueAttribute);
    State.YNdisplac = 1;
    State.displac = 0.0;
    gl.uniform1i(wGL.bumpMap, 1);
    gl.uniform1f(wGL.uniformDispConstant, State.displac);
    gl.uniform1f(wGL.uniformDispMax, State.dispMax);
    drawFigure();
  } else {
    var ctx = contextUC;
    var canv = canvasUC;
    var img = Images.UserColour;

    ctx.clearRect(0, 0, canv.width, canv.height);
    ctx.drawImage(img, 0, 0, canv.width, canv.height); //Image scaled to canvasUI's size
    var imgd = ctx.getImageData(0, 0, canv.width, canv.height);
    assignColourData(imgd.data);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(wGL.VertexColourValues),
      gl.STATIC_DRAW
    );
    gl.uniform1i(wGL.uniformMonochColour, 1);
    gl.uniform1i(wGL.uniformMonochColour2, 1);
    gl.uniform1i(wGL.bumpMap, 0);
    drawFigure();
  }
}

//////DISPLACEMENT AND TEXTURE MAPPING(colour)//////
////Updates the canvas element used for the images of displacement mapping or texture mapping
////and extracts the required information
/**
 * Auxiliary function to draw images into 2d canvas elements and extract its values
 *
 * Updates the canvas element used for the images of displacement mapping or texture mapping and extracts the required information.
 * @param {string} id id of the 2d canvas elements with the corresponding customised image
 * @param {image} im image element to be used
 * @param {number} Nctx number to control the 2d canvas element to be used
 */
function DrawAndExtract(id, im, Nctx) {
  var img;

  if (id != 0) {
    Images.Aux = document.getElementById(id);
    img = Images.Aux;
  } else img = im;

  var ctx;
  var canv;
  if (Nctx == 2) {
    ctx = contextUI;
    canv = canvasUI;
  } else if (Nctx == 3) {
    ctx = contextUC;
    canv = canvasUC;
  } else {
    ctx = contextAux;
    canv = canvasAux;
  }

  ctx.clearRect(0, 0, canv.width, canv.height);
  ctx.drawImage(img, 0, 0, canv.width, canv.height); //Image scaled to canvasUI's size
  var imgd = ctx.getImageData(0, 0, canv.width, canv.height);
  var pix = imgd.data;

  if (Nctx == 3) {
    assignColourData(pix);
  } else {
    computeHValues(pix);
    var auxMax = 1.0;
    for (var i = 0; i < (State.N - 1) * (State.N - 1) * 6; i++) {
      if (wGL.VertexHValues[i] < auxMax) auxMax = wGL.VertexHValues[i];
    }
    if (auxMax < 1.0 && auxMax > 0.0) State.dispMax = 1.0 - auxMax;
    else State.dispMax = 1.0;
  }
}

////Rotation of the images on the canvas element used for displacement mapping or texture mapping
/*
 * Auxiliary function to rotate the customised images in the 2d canvas elements
 *
 * Rotates the images on the 2d canvas elements used for displacement mapping of texture mapping.
 * @param {number} num number to control the 2d canvas element to be used
 * @param {number} dir number to control the direction in which the image will be rotated
 */
function rotateImage(num, dir) {
  var ctx;
  if (num == 2) ctx = contextUI;
  else ctx = contextUC;

  if (dir == 0) {
    ctx.translate(0, canvasUI.width);
    ctx.rotate(-Math.PI / 2);
  } else {
    ctx.translate(canvasUI.width, 0);
    ctx.rotate(Math.PI / 2);
  }
  gl.uniform1i(wGL.bumpMap, 0);
  if (num == 2) changeUserImage("imageCanvas", "imD", 1, 0);
  else changeUserImageColour2(1, 0);
}

////Resize the canvas elements used for the images of displacement mapping and texture mapping
/**
 * Auxiliary function to resize the 2d canvas elements
 *
 * Resizes the 2d canvas elements used for displacement mapping and texture mapping.
 */
function resizeCanvas2D() {
  canvasUI.width = State.N;
  canvasUI.height = State.N;
  canvasAux.width = State.N;
  canvasAux.height = State.N;
  if (canvasUI.style.opacity == 0.4) userImageDefault(2);
  else DrawAndExtract(0, Images.UserImage, 2);

  canvasUC.width = State.N;
  canvasUC.height = State.N;
  if (canvasUC.style.opacity == 0.4) userImageDefault(3);
  else DrawAndExtract(0, Images.UserColour, 3);
}

//////DISPLACEMENT//////
////Change the image used for the displacement
/**
 * Change of the image used for the displacement of the WebGL model
 *
 * Changes the image used for the displacement. In the normal mode:
 * - If the image is the one that was being used, the displacement is deactivated
 * - If the image is different, the height values are extracted and charged into the corresponding WebGL buffer
 * @param {number} n number of the new image
 * @param {string} id id of the html element
 * @param {string} cl class of the html element
 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size)
 */
function changeImage2(num, id, cl, mode) {
  if (num != State.image || mode == 1) {
    //Different image from the actual one

    gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexHValuesBuffer);

    switch (num) {
      case 1:
        DrawAndExtract("one", 0, 1);
        break;

      case 2:
        DrawAndExtract("two", 0, 1);
        break;

      case 3:
        DrawAndExtract("three", 0, 1);
        break;

      case 4:
        DrawAndExtract("four", 0, 1);
        break;

      case 5:
        DrawAndExtract("five", 0, 1);
        break;

      case 6:
        DrawAndExtract("six", 0, 1);
        break;

      case 7:
        DrawAndExtract("seven", 0, 1);
        break;

      case 8:
        DrawAndExtract("eight", 0, 1);
        break;
      case 9:
        DrawAndExtract("nine", 0, 1);
        break;
      case 10:
        DrawAndExtract("ten", 0, 1);
        break;
      case 11:
        DrawAndExtract("eleven", 0, 1);
        break;
      case 12:
        DrawAndExtract("twelve", 0, 1);
        break;
    }

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(wGL.VertexHValues),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(wGL.vertexHValueAttribute);
    gl.vertexAttribPointer(
      wGL.vertexHValueAttribute,
      wGL.VHBufferItemSize,
      gl.FLOAT,
      false,
      0,
      0
    );
    //Image 9 is the customised one and its information has been already extracted
    if (num == 9)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(wGL.VertexHValues),
        gl.STATIC_DRAW
      );

    if (num != 9) State.valuesUserImageOK = 0;

    if (mode == 0) {
      State.image = num;
      changeBorder(1, id, cl);
      State.YNdisplac = 1;
      State.displac = 0.3;
      gl.uniform1f(wGL.uniformDispConstant, State.displac);
      gl.uniform1f(wGL.uniformDispMax, State.dispMax);
      drawFigure();
    }
  } else {
    //Deactivate displacement
    changeBorder(0, id, cl);
    State.image = 0;
    State.YNdisplac = 0;
    State.displac = 0.0;
    gl.uniform1f(wGL.uniformDispConstant, State.displac);
    drawFigure();
  }
}

////Change the amount of displacement
/**
 * Change of the amount of displacement applied on the WebGL model
 *
 * Changes the amount of displacement applied if it is activated and redraws the WebGL model.
 * @param {number} v variable to control if the displacement has to be incremented or decremented
 */
function changeDisplacement(v) {
  if (State.YNdisplac == 1) {
    if (v == 0) State.displac += 0.05;
    else State.displac -= 0.05;

    gl.uniform1f(wGL.uniformDispConstant, State.displac);
    gl.uniform1f(wGL.uniformDispMax, State.dispMax);
    drawFigure();
  }
}
