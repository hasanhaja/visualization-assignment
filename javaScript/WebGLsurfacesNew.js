//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers. 
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v 
 */
function defineSurface1(um, ux, vm, vx) {

    var N = State.N;

    var VertexPosition = [];
    var VertexNormal = [];

    var VertexPositionData = [];
    var VertexNormalData = [];
  
    var surf = new Plane(um, ux, vm, vx, N);
    var glData = new GLSData(surf);
    SurfaceObj.data = glData;
    VertexPosition = glData.getVertices();
    VertexNormal = glData.getNormals();
    var k = 0;
  
    for (let i = 0; i < (N - 1) * (N - 1) * 6; i++) {
        VertexPositionData[k] = VertexPosition[i][0];
        VertexPositionData[k + 1] = VertexPosition[i][1];
        VertexPositionData[k + 2] = VertexPosition[i][2];
        VertexNormalData[k] = VertexNormal[i][0];
        VertexNormalData[k + 1] = VertexNormal[i][1];
        VertexNormalData[k + 2] = VertexNormal[i][2];
        k += 3;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexPositionData), gl.STATIC_DRAW);
    gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VertexNormalData), gl.STATIC_DRAW);
    gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(wGL.vertexNormalAttribute);

}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers. 
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v 
 * @param {number} r radius value
 */
function defineSurface2(um, ux, vm, vx, r) {

}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers. 
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v 
 * @param {number} r radius value
 */
function defineSurface3(um, ux, vm, vx, r) {

}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers. 
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v 
 */
function defineSurface4(um, ux, vm, vx) {

}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers. 
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v 
 * @param {number} c catenoid parameter
 */
function defineSurface5(um, ux, vm, vx, c) {

}




//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers. 
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v 
 * @param {number} r1 outer radius
 * @param {number} r2 inner radius
 */	
function defineSurface6(um, ux, vm, vx, r1, r2) {
    
}

