
/////////Initial WebGL configuration


	/**
	 * Creation of the WebGL context
	 *
	 * Creates the WebGL context.
	 * @param {canvas} canvas canvas element for which the WebGL context has to be created
	 * @returns {context} context the WebGL context
	 */	
	function createGLContext(canvas) {
	  var names = ["webgl", "experimental-webgl"];
	  var context = null;
	  for (var i=0; i < names.length; i++) {
		try {
		  context = canvas.getContext(names[i]);
		} catch(e) {}
		if (context) {
		  break;
		}
	  }

	  if (!context) {
		alert("Failed to create WebGL context!");
	  }
	  return context;
	}




	/**
	 * Configuration of the WebGL shaders
	 *
	 * Loads the WebGL shaders, creates the WebGL program and links everything. 
	 * It also stores the position of the WebGL attributes and uniforms and enable the attributes.
	 */	
	function setupShaders() {
      var vertexShader = loadShaderFromDOM("shader-vs");
	  var fragmentShader = loadShaderFromDOM("shader-fs");
	  
	  var shaderProgram = gl.createProgram();
	  gl.attachShader(shaderProgram, vertexShader);
	  gl.attachShader(shaderProgram, fragmentShader);
	  gl.linkProgram(shaderProgram);

	  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS) && !gl.isContextLost()) {
	    var infoLog = gl.getProgramInfoLog(program);
		alert("Error linking program:\n" + infoLog);
	  }

	  gl.useProgram(shaderProgram);
	 
      wGL.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
      wGL.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
      wGL.vertexColourAttribute = gl.getAttribLocation(shaderProgram, "aVertexColour");
      wGL.vertexHValueAttribute = gl.getAttribLocation(shaderProgram, "aVertexHValue");	  

	  wGL.uniformMVMatrix = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	  wGL.uniformProjMatrix = gl.getUniformLocation(shaderProgram, "uPMatrix");
      wGL.uniformNormalMatrix = gl.getUniformLocation(shaderProgram, "uNMatrix");
      wGL.uniformFlag = gl.getUniformLocation(shaderProgram, "uFlag");
      wGL.uniformFlag2 = gl.getUniformLocation(shaderProgram, "uFlag2");
      wGL.bumpMap = gl.getUniformLocation(shaderProgram, "bFlag");
      wGL.uniformDispConstant = gl.getUniformLocation(shaderProgram, "uDispConstant");
        wGL.uniformDispMax = gl.getUniformLocation(shaderProgram, "uDispMax");
        wGL.uniformMonochColour = gl.getUniformLocation(shaderProgram, "uMonochColour");

        wGL.uniformMonochColour2 = gl.getUniformLocation(shaderProgram, "uMonochColour2");	


      gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(wGL.vertexColourAttribute, 4, gl.FLOAT, false, 0, 0);
      gl.vertexAttribPointer(wGL.vertexHValueAttribute, 1, gl.FLOAT, false, 0, 0);
   
      gl.enableVertexAttribArray(wGL.vertexPositionAttribute);
        gl.enableVertexAttribArray(wGL.vertexNormalAttribute); 
     //   gl.enableVertexAttribArray(wGL.vertexColourAttribute); 

        var lpos0 = gl.getUniformLocation(shaderProgram, "Lights[0].Position");
        var lpos1 = gl.getUniformLocation(shaderProgram, "Lights[1].Position");
        var lpos2 = gl.getUniformLocation(shaderProgram, "Lights[2].Position");
        var lpos3 = gl.getUniformLocation(shaderProgram, "Lights[3].Position");
        var la0 = gl.getUniformLocation(shaderProgram, "Lights[0].La");
        var la1 = gl.getUniformLocation(shaderProgram, "Lights[1].La");
        var la2 = gl.getUniformLocation(shaderProgram, "Lights[2].La");
        var la3 = gl.getUniformLocation(shaderProgram, "Lights[3].La");
        var ld0 = gl.getUniformLocation(shaderProgram, "Lights[0].Ld");
        var ld1 = gl.getUniformLocation(shaderProgram, "Lights[1].Ld");
        var ld2 = gl.getUniformLocation(shaderProgram, "Lights[2].Ld");
        var ld3 = gl.getUniformLocation(shaderProgram, "Lights[3].Ld");
        var ls0 = gl.getUniformLocation(shaderProgram, "Lights[0].Ls");
        var ls1 = gl.getUniformLocation(shaderProgram, "Lights[1].Ls");
        var ls2 = gl.getUniformLocation(shaderProgram, "Lights[2].Ls");
        var ls3 = gl.getUniformLocation(shaderProgram, "Lights[3].Ls");
        var ma0 = gl.getUniformLocation(shaderProgram, "Material[0].Ka");
        var ma1 = gl.getUniformLocation(shaderProgram, "Material[1].Ka");
        var ma2 = gl.getUniformLocation(shaderProgram, "Material[2].Ka");
        var ma3 = gl.getUniformLocation(shaderProgram, "Material[3].Ka");
        var md0 = gl.getUniformLocation(shaderProgram, "Material[0].Kd");
        var md1 = gl.getUniformLocation(shaderProgram, "Material[1].Kd");
        var md2 = gl.getUniformLocation(shaderProgram, "Material[2].Kd");
        var md3 = gl.getUniformLocation(shaderProgram, "Material[3].Kd");
        var ms0 = gl.getUniformLocation(shaderProgram, "Material[0].Ks");
        var ms1 = gl.getUniformLocation(shaderProgram, "Material[1].Ks");
        var ms2 = gl.getUniformLocation(shaderProgram, "Material[2].Ks");
        var ms3 = gl.getUniformLocation(shaderProgram, "Material[3].Ks");
        var msh0 = gl.getUniformLocation(shaderProgram, "Material[0].Shininess");
        var msh1 = gl.getUniformLocation(shaderProgram, "Material[1].Shininess");
        var msh2 = gl.getUniformLocation(shaderProgram, "Material[2].Shininess");
        var msh3 = gl.getUniformLocation(shaderProgram, "Material[3].Shininess");

   

        gl.uniform4fv(lpos0, [-50.0, 20.0, 50.0, 1.0]);
        gl.uniform4fv(lpos1, [50.0, 20.0, 50.0, 1.0]);
        gl.uniform4fv(lpos2, [50.0, 20.0, -50.0, 1.0]);
        gl.uniform4fv(lpos3, [-50.0, -20.0, -50.0, 1.0]);

        gl.uniform3fv(la0, [0.2, 0.2, 0.2]);
        gl.uniform3fv(la1, [0.2, 0.2, 0.2]);
        gl.uniform3fv(la2, [0.2, 0.2, 0.2]);
        gl.uniform3fv(la3, [0.2, 0.2, 0.2]);

        gl.uniform3fv(ld0, [0.7, 0.6, 0.3]);
        gl.uniform3fv(ld1, [0.7, 0.6, 0.3]);
        gl.uniform3fv(ld2, [0.7, 0.6, 0.3]);
        gl.uniform3fv(ld3, [0.7, 0.6, 0.3]);


        gl.uniform3fv(ls0, [1.0, 1.0, 1.0]);
        gl.uniform3fv(ls1, [1.0, 1.0, 1.0]);
        gl.uniform3fv(ls2, [1.0, 1.0, 1.0]);
        gl.uniform3fv(ls3, [1.0, 1.0, 1.0]);

        gl.uniform3fv(md0, [0.78, 0.57, 0.11]);
        gl.uniform3fv(md1, [0.78, 0.57, 0.11]);
        gl.uniform3fv(md2, [0.78, 0.57, 0.11]);
        gl.uniform3fv(md3, [0.78, 0.57, 0.11]);

        gl.uniform3fv(ms0, [0.99, 0.94, 0.81]);
        gl.uniform3fv(ms1, [0.99, 0.94, 0.81]);
        gl.uniform3fv(ms2, [0.99, 0.94, 0.81]);
        gl.uniform3fv(ms3, [0.99, 0.94, 0.81]);

        gl.uniform3fv(ma0, [0.33, 0.22, 0.03]);
        gl.uniform3fv(ma1, [0.33, 0.22, 0.03]);
        gl.uniform3fv(ma2, [0.33, 0.22, 0.03]);
        gl.uniform3fv(ma3, [0.33, 0.22, 0.03]);

        gl.uniform1f(msh0, 28.0);
        gl.uniform1f(msh1, 28.0);
        gl.uniform1f(msh2, 28.0);
        gl.uniform1f(msh3, 28.0);
     

     



       
    //  gl.enableVertexAttribArray(wGL.vertexColourAttribute); 
    //  gl.enableVertexAttribArray(wGL.vertexHValueAttribute);	
	}

	/**
	 * Auxiliary function for the loading of the WebGL shaders
	 *
	 * Takes the WebGL shaders from the scripts in the html file and compiles them.
	 * @param {string} id id of the WebGL shaders stored in the html file
	 * @returns the WebGL shaders compiled
	 */
	function loadShaderFromDOM(id) {
	  var shaderScript = document.getElementById(id);
	  
	  // If we don't find an element with the specified id
	  // we do an early exit 
	  if (!shaderScript) {
		return null;
	  }
	  
	  // Loop through the children for the found DOM element and
	  // build up the shader source code as a string
	  var shaderSource = "";
	  var currentChild = shaderScript.firstChild;
	  while (currentChild) {
		if (currentChild.nodeType == 3) { // 3 corresponds to TEXT_NODE
		  shaderSource += currentChild.textContent;
		}
		currentChild = currentChild.nextSibling;
	  }
	 
	  var shader;
	  if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	  } else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	  } else {
		return null;
	  }
	 
	  gl.shaderSource(shader, shaderSource);
	  gl.compileShader(shader);
	 
	  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost()) {
		var infoLog = gl.getShaderInfoLog(shader);
		alert("Error compiling shader:\n" + infoLog);
		return null;
	  } 
	  return shader;
	}