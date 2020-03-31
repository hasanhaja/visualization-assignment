
////////Create and calculate WebGL buffers

	/**
	 * Configuration of the WebGL buffers
	 *
	 * Configures the WebGL buffers.
	 * - If mode is 0, it creates, calculates and fills the WebGL buffers
	 * - If mode is not 0, calculates and fills the WebGL buffers
	 * @param {number} mode variable to control the mode of the call (used for recoveries and changes of mesh size) 
	 */	
	function setupBuffers(mode) {		
		var N = State.N;
		
		////Properties for Position, Normal and Colour buffers
		wGL.VPBufferItemSize = 3;
        wGL.VPBufferNumberOfItems = (N - 1) * (N - 1) * 6;
		
		wGL.VNBufferItemSize = 3;
        wGL.VNBufferNumberOfItems = (N - 1) * (N - 1) * 6;

        wGL.VHBufferItemSize = 1;
        wGL.VHBufferNumberOfItems = (N - 1) * (N - 1) * 6;

        wGL.VIBufferItemSize = 1;
        wGL.VIBufferNumberOfItems = (N - 1) * (N - 1) * 6;



        wGL.VCBufferItemSize = 4;
        wGL.VCBufferNumberOfItems = (N - 1) * (N - 1) * 6;
        if (mode == 0) {
            // create the buffers
            wGL.VertexPositionBuffer = gl.createBuffer();
            wGL.VertexNormalBuffer = gl.createBuffer();
            wGL.VertexColourBuffer = gl.createBuffer();
            wGL.VertexHValuesBuffer = gl.createBuffer();
            wGL.VertexIndexBuffer = gl.createBuffer();
        }
}
	
	
	
	
	