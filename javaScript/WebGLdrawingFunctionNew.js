
 
	////// Drawing function //////

	/**
	 * Drawing function
	 *
	 * Draws the WebGL model It checks the rendering mode (points, lines, surface or surface+lines) and the type of 
	 * surface (open, half-closed or closed) and draws the correct elements.
	 */
function drawFigure() {
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
 //       gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wGL.VertexIndexBuffer);
  //  gl.uniform1i(wGL.uniformFlag, 0);
    if (State.rendering == 0) { //// Points
            gl.uniform1i(wGL.uniformFlag, 0);
            gl.drawArrays(gl.TRIANGLES, 0, wGL.VPBufferNumberOfItems);
        } else if (State.rendering == 1) {
             gl.uniform1i(wGL.uniformFlag, 0);
             gl.drawArrays(gl.TRIANGLES, 0, wGL.VPBufferNumberOfItems);
             gl.uniform1i(wGL.uniformFlag, 1);
             gl.drawArrays(gl.LINES, 0, wGL.VPBufferNumberOfItems); 
        }
	}





