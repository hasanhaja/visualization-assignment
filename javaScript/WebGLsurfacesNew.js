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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for the parametric surface: Cylinder
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
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //Cyclinder constructor(u1, u2, v1, v2, r, n)
  const surf = new Cylinder(um, ux, vm, vx, r, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Sphere
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
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //Cyclinder constructor(u1, u2, v1, v2, r, n)
  const surf = new Sphere(um, ux, vm, vx, r, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Cone
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
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //Cone constructor(u1, u2, v1, v2, n)
  const surf = new Cone(um, ux, vm, vx, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Catenoid
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
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //Catenoid constructor(u1, u2, v1, v2, c, n)
  const surf = new Catenoid(um, ux, vm, vx, c, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Torus
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
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //Torus constructor(u1, u2, v1, v2, r1, r2, n)
  const surf = new Torus(um, ux, vm, vx, r1, r2, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Twisted torus
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers.
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v
 */

function defineSurface7(um, ux, vm, vx) {
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //TwistedTorus constructor(u1, u2, v1, v2, n)
  const surf = new TwistedTorus(um, ux, vm, vx, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Roman's surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers.
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v
 */

function defineSurface8(um, ux, vm, vx) {
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //RomanSurface constructor(u1, u2, v1, v2, n)
  const surf = new RomanSurface(um, ux, vm, vx, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Parametric surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers.
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v
 * @param {number} xID
 * @param {number} yID
 * @param {number} zID
 */
function defineParametricSurface(um, ux, vm, vx, xK, yK, zK, xID, yID, zID) {
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //ParametricSurface constructor(u1, u2, v1, v2, k, xID, yID, zID, n)
  const surf = new ParametricSurface(
    um,
    ux,
    vm,
    vx,
    xK,
    yK,
    zK,
    xID,
    yID,
    zID,
    N
  );
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}

//////////Functions to create parametric surfaces or superellipsoids

//// Function to calculate the position and normal buffers for a specific parametric surface: Superellipsoid surface
/**
 * Generation of parametric surfaces
 *
 * Generates the positions and normal vectors of a parametric surface and assigns the values to the corresponding WebGL buffers.
 * @param {number} um minimum value of parameter u
 * @param {number} ux maximum value of parameter u
 * @param {number} vm minimum value of parameter v
 * @param {number} vx maximum value of parameter v
 */
function defineSuperellipsoidSurface(um, ux, vm, vx, factor, n1, n2) {
  const N = State.N;

  let VertexPosition = [];
  let VertexNormal = [];

  let VertexPositionData = [];
  let VertexNormalData = [];

  //SuperellipsoidSurface constructor(u1, u2, v1, v2, k, n1, n2, n)
  const surf = new SuperellipsoidSurface(um, ux, vm, vx, factor, n1, n2, N);
  const glData = new GLSData(surf);
  SurfaceObj.data = glData;
  VertexPosition = glData.getVertices();
  VertexNormal = glData.getNormals();
  let k = 0;

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
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexPositionData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexPositionAttribute);

  gl.bindBuffer(gl.ARRAY_BUFFER, wGL.VertexNormalBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(VertexNormalData),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(wGL.vertexNormalAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(wGL.vertexNormalAttribute);
}
