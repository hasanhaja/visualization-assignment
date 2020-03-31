
///////GUI's helping functions

	
	////Helping function to ask the user to upload an image
	/**
	 * Auxiliary function to activate the uploading of files
	 *
	 * Activates the uploading of files.
	 * @param {number} num number to identify the element that requires a file
	 */
	function openImageInput(num) {
		if (num==2) document.getElementById("inputUserIM").click();
		else document.getElementById("inputUserC").click();	
	}	
	
	
	
	////Function for downloading the WebGL model as an image (png file)
	/**
	 * Auxiliary function to download the WebGL model as an image
	 *
	 * Saves the current WebGL model as an image (png file) asking the user for the location.
	 */
	function save() {
		drawFigure();
		var strData = canvasWgl.toDataURL("image/png");
		document.getElementById("downLink").href=strData;
		document.getElementById("downLink").click();
	}


	
	
	
	////Function to resize the page and its elements
	/**
	 * Auxiliary function to resize the GUI elements
	 *
	 * Resizes the WebGL canvas element and the fonts of the GUI elements. 
	 * - If reDraw is 1, it redraws the WebGL model
	 * @param {number} reDraw variable to control the redrawing of the WebGL model
	 */	
	function resizePage(reDraw){
		if(canvasWgl) {				
			var wid = (window.innerWidth<=3000)? window.innerWidth : 3000;	//3000 is the maximum size for security and performance		
			var heig = (window.innerHeight<=3000)? window.innerHeight : 3000;	
			var min = Math.min(wid,heig);
			var elems;
			
			//Maintain canvas's proportions
			if ((wid/min)<1.3) {
				canvasWgl.width =  wid-15;
				if ((heig/min)<1.3) {
					canvasWgl.height = heig-25;
				}
				else canvasWgl.height = 1.3*min-25;
			}
			else {
				canvasWgl.width =  1.3*min-15;
				canvasWgl.height = heig-25;
			}
			
			gl.viewport(0, 0, canvasWgl.width, canvasWgl.height);			

			//Resize font-sizes if needed
			if (wid<865) {
				elems = document.getElementsByClassName("PStext");
				for(i=0; i<elems.length; i++) {
					elems[i].style.fontSize = "60%";			
				}
				
				elems = document.getElementsByClassName("text90");
				for(i=0; i<elems.length; i++) {
					elems[i].style.fontSize = "70%";
				}

				elems = document.getElementsByClassName("text100");
				for(i=0; i<elems.length; i++) {
					elems[i].style.fontSize = "80%";
				}		
			}	
			else {
			
				elems = document.getElementsByClassName("PStext");
				for(i=0; i<elems.length; i++) {
					elems[i].style.fontSize = "80%";			
				}
				
				elems = document.getElementsByClassName("text90");
				for(i=0; i<elems.length; i++) {
					elems[i].style.fontSize = "90%";
				}	
				
				elems = document.getElementsByClassName("text100");
				for(i=0; i<elems.length; i++) {
					elems[i].style.fontSize = "100%";
				}					
			}
			
			if(reDraw==1) drawFigure();
		}
	}
		
	
		
	////Modify the colours of the default images' borders
	/**
	 * Auxiliary function to change the border of html elements
	 *
	 * Modifies the borders of html elements. It is used to change the colours of the default images' borders.
	 * @param {number} YN variable to control if any border has to be turned into red (activated)
	 * @param {string} id id of the html element 
	 * @param {string} cl class of the html element 	 
	 */	
	function changeBorder(YN,id,cl) {
	  var others = document.getElementsByClassName(cl);
      for(var i=0; i<others.length; i++) others[i].style.border = "3px solid black";
	  if (YN==1 && id) document.getElementById(id).style.border="3px solid red";
	}
	
	
	
	////Functions for controlling the visibility of the GUI options (different boxes)
	//Show or hide the parametric surfaces, superellipsoids, customised image and customised colour's boxes
	/**
	 * Auxiliary function to change the visibility of the GUI boxes
	 *
	 * Controls the visibility of the boxes displayed on the GUI options (parametric surfaces, superellipsoids,
	 * customised image and customised colour).
	 * @param {string} id id of the html element 
	 * @param {number} number variable to control which box has to be changed	 
	 */	
	function displayBox(id,number) {
		if (document.getElementById(id).checked==true) {
            if (number == 0) PageBoxes.PSbox.style.display = "block";
            else if (number == 1) PageBoxes.SEbox.style.display = "block";
            else if (number == 2) PageBoxes.UIbox.style.display = "block";
            else {
                PageBoxes.UCbox.style.display = "block";
                document.getElementById("bm").style.display = "none";
                document.getElementById("bmtext").style.display = "none";
            }
		}
		else {
			if (number==0) PageBoxes.PSbox.style.display="none";
			else if (number==1) PageBoxes.SEbox.style.display="none";
			else if (number==2) PageBoxes.UIbox.style.display="none";	
			else PageBoxes.UCbox.style.display="none";
		}	
		hContainer(); //Update the minimum height of the container element
	}
	
	
	//Show or hide the whole group of options 
	/**
	 * Auxiliary function to change the appearance of the GUI
	 *
	 * Shows or hides the whole group of options at both sides of the WebGL canvas element.
	 * @param {number} numb variable to control which side has to be changed 
	 */	
	function visibility(num) {
	  if(num==1) {
		if (document.getElementById("leftVis").checked==true) {
			document.getElementById("allLeft").style.display="block";
		}
		else document.getElementById("allLeft").style.display="none";
	  }
	  else {
		if (document.getElementById("rightVis").checked==true) {
			document.getElementById("allRight").style.display="block";
		}
		else document.getElementById("allRight").style.display="none";	  
	  }
	  hContainer(); //Update the minimum height of the container element
	}
	
	
	//Change the size of the container according to the boxes displayed
	/**
	 * Auxiliary function to control the size of the html container element
	 *
	 * Changes the size of the html container element according to the boxes displayed.
	 */
	function hContainer() {
		var lHContainer=30;
		var rHContainer=70;
		var newHContainer;
		
		if (document.getElementById("allLeft").style.display!="none") {
			lHContainer=320;
			if (PageBoxes.PSbox.style.display=="block") lHContainer+=265;
			if (PageBoxes.SEbox.style.display=="block") lHContainer+=220;
		}	
		if (document.getElementById("allRight").style.display!="none") {
			rHContainer=340;
			if (PageBoxes.UIbox.style.display=="block") rHContainer+=170;
			if (PageBoxes.UCbox.style.display=="block")
				if(document.getElementById("textureColour").style.display=="block") rHContainer+=250;
				else rHContainer+=80;
		}
		
		newHContainer = lHContainer > rHContainer? lHContainer : rHContainer;
		st=newHContainer.toString()+"px";
		document.getElementById("container").style.minHeight=st;	
	}	
	
	
	
	////Show or hide the helping text box
	/**
	 * Auxiliary function to control the visibility of the helping text box
	 *
	 * Shows or hides the helping text box.
	 * @param {number} YN variable to control if the text box has to be shown or hidden
	 */	
	function displayHelp(YN) {	
		//Close button
		if (YN==0) document.getElementById("helpText").style.display="none";
		//Help button
		else if (document.getElementById("helpText").style.display=="block") document.getElementById("helpText").style.display="none";
			else document.getElementById("helpText").style.display="block";
	}
	
	
	
	