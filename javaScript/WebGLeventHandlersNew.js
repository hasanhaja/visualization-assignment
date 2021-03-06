	////// WebGL canvas element's event handlers (keyboard, mouse or touch changes and context lost) //////
	
	
	////Mouse events
	
	/**
	 * 'Mousedown' event handler
	 *
	 * Registers that the left mouse button has been pressed and the position of the cursor in that moment.
	 * @param {event} 'mousedown'event
	 */
function handleMouseDown(event) {
        event.preventDefault();
        if (event.button == 0) {
            Move.YNpressed = 1;
            Move.posX = event.clientX;
            Move.posY = event.clientY;
        } else if (event.button == 2) {    
            Move.YNpressed = 2;
            Move.posX = event.clientX;
            Move.posY = event.clientY;
        }
	}

	
	/**
	 * 'Mouseup' event handler
	 *
	 * Registers that the left mouse button has stopped being pressed.
	 * @param {event} 'mouseup'event
	 */	
function handleMouseUp(event) {
        event.preventDefault();
        if (event.button == 0) {
           Move.YNpressed = 0;
        }
        if (event.button == 2) {
           Move.YNpressed = 0;
        }
	}	



	/**
	 * 'Mousemove' event handler
	 *
	 * Rotates the WebGL model if the mouse is moved while its left button is being pressed.
	 * @param {event} 'mousemove'event
	 */	
    function handleMouseMove(event) {
        event.preventDefault();
        var deltaX = event.clientX - Move.posX;
        var deltaY = event.clientY - Move.posY;
        if (Move.YNpressed == 1) {
            wGL.alpha -= deltaX / 100;
            wGL.beta -= deltaY / 100;
        } else if (Move.YNpressed == 2) {
            wGL.movex -= deltaY/50;
            wGL.movey -= deltaX/50;
        }
        setMatrices(wGL.alpha, wGL.beta, wGL.distance, wGL.movex, wGL.movey);
	    drawFigure();
			
		Move.posX=event.clientX;
		Move.posY=event.clientY;   
	}	
    

	
	/**
	 * 'Mousewheel' event handler
	 *
	 * Zooms in or out the WebGL model with the movement of the mouse wheel.
	 * @param {event} 'mousewheel'event
	 */	
	function handleMouseWheel(event) {
		event.preventDefault();
        var delta = event.detail ? event.detail / (-3) : event.wheelDelta / (120); //Different web browsers
        if (delta < 0) {
            wGL.distance *= 1.1;
        } else if (delta > 0) {
            wGL.distance *= 0.9;
        }
        setMatrices(wGL.alpha, wGL.beta, wGL.distance, wGL.movex, wGL.movey);
		drawFigure();	
	}	
    
    
    /**
	 * Updates the model and view matrices according to the movement of the mouse
	 *
	 * 
	 * @param {number} alpha the rotation in x
     * @param {number} beta the rotation in y
     * @param {distance} the movement of the camera in the z direction
     * @param {number} movex the displacement in x
     * @param {number} movey the displacement in y
	 */	
    function setMatrices(alpha, beta, distance, movex, movey) {
        var m1 = mat4.create();
        var m2 = mat4.create();
        mat4.rotateY(m1, m1, alpha);
        mat4.rotateX(m2, m2, beta);


        var cameraPosition = vec3.clone([0, 0, distance]);
        var cameraUpDirection = vec3.clone([0, 1, 0]);
    
        var m3 = mat4.create();
        var trans = vec3.clone([-movey, movex, 0.0]);
        mat4.translate(m3, m3, trans);
        var view = mat4.create();
        mat4.lookAt(view, cameraPosition, vec3.clone([0.0, 0.0, 0.0]), cameraUpDirection);

        mat4.multiply(m2, m2, m1);
        mat4.multiply(m3, m3, m2);
        var mv = mat4.create();
        mat4.multiply(mv, view, m3);
        mat4.copy(wGL.modelViewMatrix, mv);
        pushModelViewMatrix();
        gl.uniformMatrix4fv(wGL.uniformMVMatrix, false, wGL.modelViewMatrix);
        mat3.normalFromMat4(wGL.normalMatrix, wGL.modelViewMatrix);
        gl.uniformMatrix3fv(wGL.uniformNormalMatrix, false, wGL.normalMatrix);
        popModelViewMatrix();
    }
	
	
	/**
	 * 'Touchstart' event handler
	 *
	 * Called when the touchscreen is touched, it decides how the finger's movements will affect the WebGL model from that moment on.
	 * - If there is one finger on the screen, it allows object's movement and registers the current position
	 * - If there are two fingers on the screen, it avoids object's movement and registers the distance between them (for future zoom)
	 * - If there are more than 2 fingers on the screen, it deactivates object's movement and zoom
	 * @param {event} 'touchstart'event
	 */
    function handleTouchStart(event) {
        event.preventDefault();
        var touch = event.touches[0];
        var touch2 = event.touches[1];

        if (touch2 == null) {	//Only one finger on the screen ---> allow object's movement
            Move.YNpressed = 1;
            Move.posX = touch.clientX;
            Move.posY = touch.clientY;
        }
        else if (event.touches[2] == null) {
            Move.YNpressed = 0;  //Avoid object's movement
            var distX = touch.clientX - touch2.clientX;
            var distY = touch.clientY - touch2.clientY;
            Move.distance = Math.sqrt(distX * distX + distY * distY);
        }
        else { //More than 2 fingers on the screen ---> Deactivate object's movement and zoom
            Move.YNpressed = 0;
            Move.distance = 0.0;
        }
    }


	/**
	 * 'Touchend' event handler
	 *
	 * Called when one finger leaves the touchscreen, it decides how the finger's movements will affect the WebGL model from that moment on. 
	 * - If there are no fingers left on the screen, it deactivates object's movement
	 * - If there is one finger left on the screen, it allows object's movement and registers the current position
	 * - If there are two fingers left on the screen, it registers the distance between them (for future zoom)
	 * @param {event} 'touchend'event
	 */
    function handleTouchEnd(event) {
        event.preventDefault();
        var touch = event.touches[0];
        var touch2 = event.touches[1];

        if (touch == null) Move.YNpressed = 0;
        else if (touch2 == null) {
            Move.YNpressed = 1; //Only one finger on the screen ---> allow object's movement
            Move.posX = touch.clientX;
            Move.posY = touch.clientY;
            Move.distance = 0.0;
        }
        else if (event.touches[2] == null) { //Only two finger on the screen ---> allow zoom
            var distX = touch.clientX - touch2.clientX;
            var distY = touch.clientY - touch2.clientY;
            Move.distance = Math.sqrt(distX * distX + distY * distY);
        }
    }


	/**
	 * 'Touchmove' event handler
	 *
	 * Called when a finger is moved over the touchscreen. 
	 * - If the object's movement is allowed, it rotates the WebGL model
	 * - If the object's movement is not allowed but it can be zoomed in or out, it zooms the WebGL model
 	 * @param {event} 'touchmove'event
 	 */
    function handleTouchMove(event) {
        event.preventDefault();
        var touch = event.touches[0];
        var touch2 = event.touches[1];

        if (Move.YNpressed == 1) {
            var rot = 0;
            mat4.identity(wGL.auxmodelViewMatrix);

            rot = (Math.PI / 500) * (touch.clientX - Move.posX);
            mat4.rotateY(wGL.auxmodelViewMatrix, wGL.auxmodelViewMatrix, rot);

            rot = (Math.PI / 500) * (touch.clientY - Move.posY);
            mat4.rotateX(wGL.auxmodelViewMatrix, wGL.auxmodelViewMatrix, rot);

            mat4.multiply(wGL.modelViewMatrix, wGL.auxmodelViewMatrix, wGL.modelViewMatrix);

            pushModelViewMatrix();
            mat4.identity(wGL.auxmodelViewMatrix);
            mat4.translate(wGL.auxmodelViewMatrix, wGL.auxmodelViewMatrix, wGL.translationVector);
            mat4.multiply(wGL.modelViewMatrix, wGL.auxmodelViewMatrix, wGL.modelViewMatrix);
            gl.uniformMatrix4fv(wGL.uniformMVMatrix, false, wGL.modelViewMatrix);
            mat3.normalFromMat4(wGL.normalMatrix, wGL.modelViewMatrix);
            gl.uniformMatrix3fv(wGL.uniformNormalMatrix, false, wGL.normalMatrix);
            popModelViewMatrix();

            drawFigure();
            Move.posX = touch.clientX;
            Move.posY = touch.clientY;
        }
        else if (Move.distance > 0.0) {
            var oldDist = Move.distance;
            var distX = touch.clientX - touch2.clientX;
            var distY = touch.clientY - touch2.clientY;
            Move.distance = Math.sqrt(distX * distX + distY * distY);
            State.proyection -= (Move.distance - oldDist) / oldDist;
            if (State.proyection < 0.03) State.proyection = 0.03; //Limit of proximity

            mat4.ortho(wGL.projectionMatrix, -State.proyection, State.proyection, -State.proyection, State.proyection, 0.0, 9.0);
            gl.uniformMatrix4fv(wGL.uniformProjMatrix, false, wGL.projectionMatrix);

            drawFigure();
        }
    }



    ////Keyboard events	

	/**
	 * 'Keydown' event handler
	 *
	 * Called when a key has been pressed.
	 * - If it has been the up arrow, it zooms in the WebGL model
	 * - If it has been the down arrow, it zooms out the WebGL model
	 * (- If it has been the letter L, it simulates the WebGL context lost)
	 * @param {event} 'keydown'event
	 */
    function handleKeyDown(event) {
        if (event.keyCode == 38) zoom(0); //Up arrow 
        if (event.keyCode == 40) zoom(1); //Down arrow

        //Uncomment the line below to be able to simulate Context Lost pressing letter L on the keyboard
        //if (event.keyCode == 76)  canvasWgl.loseContext(); //L 
    }

	/**
	 * Auxiliary function to zoom in out the WebGL model
	 *
	 * Zooms in out the WebGL model. 
	 * - If n is 0, it zooms in the WebGL model
	 * - If n is 1, it zooms out the WebGL model	 
	 * @param {number} n
	 */
    function zoom(n) {
        if (n == 0) State.proyection -= 0.15;
        else State.proyection += 0.15;

        if (State.proyection < 0.03) State.proyection = 0.03; //Limit of proximity

        mat4.ortho(wGL.projectionMatrix, -State.proyection, State.proyection, -State.proyection, State.proyection, 0.0, 9.0);
        gl.uniformMatrix4fv(wGL.uniformProjMatrix, false, wGL.projectionMatrix);
        drawFigure();
    }



    ////Context lost-restored events	

	/**
	 * 'Webglcontextlost' event handler
	 *
	 * Prevents the default WebGL context lost behaviour and ignores the onload events of the images being loaded.
	 * @param {event} 'webglcontextlost'event
	 */
    function handleContextLost(event) {
        event.preventDefault();

        // Ignore all pending loading images by removing their onload handler
        for (var i = 0; i < Images.loadingImages.length; i++) {
            Images.loadingImages[i].onload = undefined;
        }
        Images.loadingImages = [];
    }


	/**
	 * 'Webglcontextrestored' event handler
	 *
	 * Recovers WebGL from the loss of its context.
	 * @param {event} 'webglcontextrestored'event
	 */
    function handleContextRestored(event) {
        setupShaders();
        setupBuffers(0); //Create again the buffers

        //Set up again the WebGL options
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.enable(gl.DEPTH_TEST);
        if (State.rendering == 4) {
            gl.enable(gl.POLYGON_OFFSET_FILL);	//Avoid z-fighting between surface and lines
            gl.polygonOffset(1.0, 1.0);
        }
        gl.viewport(0, 0, canvasWgl.width, canvasWgl.height);

        //Send the Projection matrix to WebGL
        gl.uniformMatrix4fv(wGL.uniformProjMatrix, false, wGL.projectionMatrix);

        //Configure the ModelView and Normal matrices and send them to WebGL
        pushModelViewMatrix();
        mat4.identity(wGL.translationMatrix);
        mat4.translate(wGL.translationMatrix, wGL.translationMatrix, wGL.translationVector);
        mat4.multiply(wGL.modelViewMatrix, wGL.translationMatrix, wGL.modelViewMatrix);
        gl.uniformMatrix4fv(wGL.uniformMVMatrix, false, wGL.modelViewMatrix);
        mat3.normalFromMat4(wGL.normalMatrix, wGL.modelViewMatrix);
        gl.uniformMatrix3fv(wGL.uniformNormalMatrix, false, wGL.normalMatrix);
        popModelViewMatrix();

        //Recalculate the shape to fill Position and Normal buffers
        if (State.figure == 10) readPSbox(1);
        else if (State.figure == 11) {
            document.getElementById("n1").value = n1SE; //Avoid error due to changes in text fields without pressing "Draw"
            document.getElementById("n2").value = n2SE;
            readSEbox(1);
        }
        else changeShape(State.figure, 0, 0, 1);

        //If the images for the 2D canvas elements (used for the displacement and colouring)
        //were not loaded correctly because of the Context Lost, charge them again
        if (Images.userImageOK == 0) changeUserImage(0, 0, 0, 1);
        if (Images.userColourOK == 0) changeUserImageColour(0, 1);

        //Charge the height values for the displacement
        if (State.image != 0) changeImage(State.image, 0, 0, 1);

        //Send WebGL the uniforms to control the displacement
        gl.uniform1f(wGL.uniformDispConstant, State.displac);
        gl.uniform1f(wGL.uniformDispMax, State.dispMax);

        //Set up the colour to its last state
        changeColour(State.colour, 1);

        //Fill the Colour buffer it the Texture Mapping option is activated
        if (State.colour == 3) {
            gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexColourBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(wGL.VertexColourValues), gl.STATIC_DRAW);
            gl.vertexAttribPointer(wGL.vertexColourAttribute, wGL.VCBufferItemSize, gl.FLOAT, false, 0, 0);
        }

        //Connect the vertex attributes with the new buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexPositionBuffer);
        gl.vertexAttribPointer(wGL.vertexPositionAttribute, wGL.VPBufferItemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
        gl.vertexAttribPointer(wGL.vertexNormalAttribute, wGL.VNBufferItemSize, gl.FLOAT, false, 0, 0);

        drawFigure();
    }
