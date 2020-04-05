// JavaScript source code

/**
 * This acts like an abstract class or an interface for the specific surfaces.
 */
class Surf {
  constructor(u1, u2, v1, v2, n) {
    this.u1 = u1;
    this.u2 = u2;
    this.v1 = v1;
    this.v2 = v2;
    this.n = n;
  }
  Eval(u, v) {}
  Normal(u, v) {}
  DeriveU(u, v) {}
  DeriveV(u, v) {}
  ComputePoints(n) {
    var stepu = (this.u2 - this.u1) / (n - 1);
    var stepv = (this.v2 - this.v1) / (n - 1);
    // evaluate
    var valu;
    var valv;
    var v = new Array(n * n);
    var count = 0;
    for (let i = 0; i < n; i++) {
      valu = this.u1 + i * stepu;
      for (let j = 0; j < n; j++) {
        valv = this.v1 + j * stepv;
        v[count] = this.Eval(valu, valv);
        count++;
      }
    }
    return v;
  }

  ComputeNormals(n) {
    var stepu = (this.u2 - this.u1) / (n - 1);
    var stepv = (this.v2 - this.v1) / (n - 1);
    // evaluate
    var valu;
    var valv;
    var v = new Array(n * n);
    var count = 0;
    for (let i = 0; i < n; i++) {
      valu = this.u1 + i * stepu;
      for (let j = 0; j < n; j++) {
        valv = this.v1 + j * stepv;
        v[count] = this.Normal(valu, valv);
        count++;
      }
    }
    return v;
  }

  ComputeDerivativesU(n) {
    var stepu = (this.u2 - this.u1) / (n - 1);
    var stepv = (this.v2 - this.v1) / (n - 1);
    // evaluate
    var valu;
    var valv;
    var v = new Array(n * n);
    var count = 0;
    for (let i = 0; i < n; i++) {
      valu = this.u1 + i * stepu;
      for (let j = 0; j < n; j++) {
        valv = this.v1 + j * stepv;
        v[count] = this.DeriveU(valu, valv);
        count++;
      }
    }
    return v;
  }

  ComputeDerivativesV(n) {
    var stepu = (this.u2 - this.u1) / (n - 1);
    var stepv = (this.v2 - this.v1) / (n - 1);
    // evaluate
    var valu;
    var valv;
    var v = new Array(n * n);
    var count = 0;
    for (let i = 0; i < n; i++) {
      valu = this.u1 + i * stepu;
      for (let j = 0; j < n; j++) {
        valv = this.v1 + j * stepv;
        v[count] = this.DeriveV(valu, valv);
        count++;
      }
    }
    return v;
  }

  ComputeFaceInfo(n) {
    var nFaces = (n - 1) * (n - 1) * 2;
    var face = new Array(nFaces);
    for (i = 0; i < nFaces; i++) {
      face[i] = new Array(3);
    }
    var k = 0;
    var count1 = 0;

    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - 1; j++) {
        face[k][0] = count1;
        face[k][1] = count1 + n;
        face[k][2] = count1 + n + 1;

        face[k + 1][0] = count1 + n + 1;
        face[k + 1][1] = count1 + 1;
        face[k + 1][2] = count1;
        count1++;
        k += 2;
      }
      count1++;
    }
    return face;
  }

  ComputeIndices(n) {
    var k = 0;
    var count1 = 0;
    var indices = [];
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        indices[k] = count1;
        indices[k + 1] = count1 + n;
        indices[k + 2] = count1 + n + 1;

        indices[k + 3] = count1 + n + 1;
        indices[k + 4] = count1 + 1;
        indices[k + 5] = count1;
        count1++;
        k += 6;
      }
      count1++;
    }
    return indices;
  }
}

/**
 * @param {number} id
 * @member {vec3} func should be a 3D vec with the
 * 0th index holding the f(u, v)
 * 1st index holding the df/du
 * 2nd index holding the df/dv
 * without the k value.
 */
class FunctionSelector {
  constructor(id) {
    this.method = this.select(id);
  }

  /**
   * @returns An array of all the function sets. Each elements contains [f(u,v), dfdu, dfdv].
   */
  getFunctions() {
    /**
     * k*sin(u)
     * k*sin(v)
     * k*cos(u)
     * k*cos(v)
     * k*u*sin(v)
     * k*u*cos(v)
     */

    const f0 = (u, v) => Math.sin(u);
    const f1 = (u, v) => Math.sin(v);
    const f2 = (u, v) => Math.cos(u);
    const f3 = (u, v) => Math.cos(v);
    const f4 = (u, v) => u * Math.sin(v);
    const f5 = (u, v) => u * Math.cos(v);

    const df0du = (u, v) => Math.cos(u);
    const df1du = (u, v) => 0.0;
    const df2du = (u, v) => -1.0 * Math.sin(u);
    const df3du = (u, v) => 0.0;
    const df4du = (u, v) => Math.sin(v);
    const df5du = (u, v) => Math.cos(v);

    const df0dv = (u, v) => 0.0;
    const df1dv = (u, v) => Math.cos(v);
    const df2dv = (u, v) => 0.0;
    const df3dv = (u, v) => -1.0 * Math.sin(v);
    const df4dv = (u, v) => u * Math.cos(v);
    const df5dv = (u, v) => -1.0 * u * Math.sin(v);

    const funcs0 = [f0, df0du, df0dv];
    const funcs1 = [f1, df1du, df1dv];
    const funcs2 = [f2, df2du, df2dv];
    const funcs3 = [f3, df3du, df3dv];
    const funcs4 = [f4, df4du, df4dv];
    const funcs5 = [f5, df5du, df5dv];

    const functions = [funcs0, funcs1, funcs2, funcs3, funcs4, funcs5];

    return functions;
  }

  /**
   * Todo: Check if the array indexing is out of bounds.
   * @param {number} id
   */
  select(id) {
    return this.getFunctions()[id];
  }
}

/**
 * Todo: Handle error for when n1 and n2 ranges are out of bound.
 */
class SuperellipsoidSurface extends Surf {
  constructor(u1, u2, v1, v2, k, n1, n2, n) {
    super(u1, u2, v1, v2, n);
    this.k = k;
    this.n1 = n1;
    this.n2 = n2;
  }

  /**
   * Multiply by k
   * @param {*} u
   * @param {*} v
   */
  Eval(u, v) {
    var vec = vec3.create();
    vec[0] = this.k * Math.pow(Math.cos(u), n1) * Math.pow(Math.cos(v), n2);
    vec[1] = this.k * Math.pow(Math.cos(u), n1) * Math.pow(Math.sin(v), n2);
    vec[2] = this.k * Math.pow(Math.sin(u), n1);
    return vec;
  }

  DeriveU(u, v) {
    var vec = vec3.create();
    vec[0] =
      -1.0 *
      this.k *
      Math.pow(Math.cos(v), n2) *
      n1 *
      Math.pow(Math.cos(u), n1 - 1) *
      Math.sin(u);
    vec[1] =
      -1.0 *
      this.k *
      Math.pow(Math.sin(v), n2) *
      n1 *
      Math.pow(Math.cos(u), n1 - 1) *
      Math.sin(u);
    vec[2] = this.k * n1 * Math.pow(Math.sin(u), n1 - 1) * Math.cos(u);
    return vec;
  }

  DeriveV(u, v) {
    var vec = vec3.create();
    vec[0] =
      -1.0 *
      this.k *
      Math.pow(Math.cos(u), n1) *
      n2 *
      Math.pow(Math.cos(v), n2 - 1) *
      Math.sin(v);
    vec[1] =
      this.k *
      Math.pow(Math.cos(u), n1) *
      n2 *
      Math.pow(Math.sin(v), n2 - 1) *
      Math.cos(v);
    vec[2] = 0.0;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

/**
 * This the surface class that can construct a parametric surface based on the selected function.
 */
class ParametricSurface extends Surf {
  constructor(u1, u2, v1, v2, xK, yK, zK, xID, yID, zID, n) {
    super(u1, u2, v1, v2, n);

    this.xK = xK;
    this.yK = yK;
    this.zK = zK;

    this.x = new FunctionSelector(xID).method;
    this.y = new FunctionSelector(yID).method;
    this.z = new FunctionSelector(zID).method;
  }

  /**
   * Multiply by k
   * @param {*} u
   * @param {*} v
   */
  Eval(u, v) {
    var vec = vec3.create();
    vec[0] = this.xK * this.x[0](u, v);
    vec[1] = this.yK * this.y[0](u, v);
    vec[2] = this.zK * this.z[0](u, v);
    return vec;
  }

  DeriveU(u, v) {
    var vec = vec3.create();
    vec[0] = this.xK * this.x[1](u, v);
    vec[1] = this.yK * this.y[1](u, v);
    vec[2] = this.zK * this.z[1](u, v);
    return vec;
  }

  DeriveV(u, v) {
    var vec = vec3.create();
    vec[0] = this.xK * this.x[2](u, v);
    vec[1] = this.yK * this.y[2](u, v);
    vec[2] = this.zK * this.z[2](u, v);
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class Plane extends Surf {
  constructor(u1, u2, v1, v2, n) {
    super(u1, u2, v1, v2, n);
  }

  Eval(u, v) {
    var vec = vec3.create();
    vec[0] = u;
    vec[1] = v;
    vec[2] = 0.0;
    return vec;
  }

  DeriveU(u, v) {
    var vec = vec3.create();
    vec[0] = 1;
    vec[1] = 0;
    vec[2] = 0;
    return vec;
  }

  DeriveV(u, v) {
    var vec = vec3.create();
    vec[0] = 0;
    vec[1] = 1;
    vec[2] = 0;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class Sphere extends Surf {
  constructor(u1, u2, v1, v2, r, n) {
    super(u1, u2, v1, v2, n);
    this.r = r;
  }

  Eval(u, v) {
    const vec = vec3.create();
    vec[0] = this.r * Math.cos(u) * Math.cos(v);
    vec[1] = this.r * Math.cos(u) * Math.sin(v);
    vec[2] = this.r * Math.sin(u);
    return vec;
  }

  DeriveU(u, v) {
    const vec = vec3.create();
    vec[0] = -1.0 * this.r * Math.sin(u) * Math.cos(v);
    vec[1] = -1.0 * this.r * Math.sin(u) * Math.sin(v);
    vec[2] = this.r * Math.cos(u);
    return vec;
  }

  DeriveV(u, v) {
    const vec = vec3.create();
    vec[0] = -1.0 * this.r * Math.cos(u) * Math.sin(v);
    vec[1] = this.r * Math.cos(u) * Math.cos(v);
    vec[2] = 0.0;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class Cone extends Surf {
  constructor(u1, u2, v1, v2, n) {
    super(u1, u2, v1, v2, n);
  }

  Eval(u, v) {
    const vec = vec3.create();
    vec[0] = u * Math.cos(v);
    vec[1] = u * Math.sin(v);
    vec[2] = u;
    return vec;
  }

  DeriveU(u, v) {
    const vec = vec3.create();
    vec[0] = Math.cos(v);
    vec[1] = Math.sin(v);
    vec[2] = 1.0;
    return vec;
  }

  DeriveV(u, v) {
    const vec = vec3.create();
    vec[0] = -1.0 * u * Math.sin(v);
    vec[1] = u * Math.cos(v);
    vec[2] = 0.0;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class Catenoid extends Surf {
  constructor(u1, u2, v1, v2, c, n) {
    super(u1, u2, v1, v2, n);
    this.c = c;
  }

  Eval(u, v) {
    const vec = vec3.create();
    vec[0] = this.c * Math.cosh(v / this.c) * Math.cos(u);
    vec[1] = this.c * Math.cosh(v / this.c) * Math.sin(u);
    vec[2] = v;
    return vec;
  }

  DeriveU(u, v) {
    const vec = vec3.create();
    vec[0] = -1.0 * this.c * Math.cosh(v / this.c) * Math.sin(u);
    vec[1] = this.c * Math.cosh(v / this.c) * Math.cos(u);
    vec[2] = 0.0;
    return vec;
  }

  DeriveV(u, v) {
    const vec = vec3.create();
    vec[0] = Math.cos(u) * Math.sinh(v / this.c);
    vec[1] = Math.sin(u) * Math.sinh(v / this.c);
    vec[2] = 1.0;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class Cylinder extends Surf {
  constructor(u1, u2, v1, v2, r, n) {
    super(u1, u2, v1, v2, n);
    this.r = r;
  }

  /**
   *
   * @param {number} u is the x value
   * @param {number} v is the y value
   * @returns 3D vector of the evaluated points
   */
  Eval(u, v) {
    const vec = vec3.create();
    vec[0] = this.r * Math.sin(u);
    vec[1] = this.r * Math.cos(u);
    vec[2] = v;
    return vec;
  }

  /**
   *
   * @param {number} u
   * @param {number} v
   * @returns Partial derivative with respect to U
   */
  DeriveU(u, v) {
    const vec = vec3.create();
    vec[0] = this.r * Math.cos(u);
    vec[1] = -1.0 * this.r * Math.sin(u);
    vec[2] = 0.0;
    return vec;
  }

  /**
   *
   * @param {number} u
   * @param {number} v
   * @returns Partial derivative with respect to V
   */
  DeriveV(u, v) {
    const vec = vec3.create();
    vec[0] = 0.0;
    vec[1] = 0.0;
    vec[2] = 1.0;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class Torus extends Surf {
  constructor(u1, u2, v1, v2, r1, r2, n) {
    super(u1, u2, v1, v2, n);
    this.r1 = r1;
    this.r2 = r2;
  }

  Eval(u, v) {
    const vec = vec3.create();
    const temp = this.r1 + this.r2 * Math.sin(v);
    vec[0] = temp * Math.sin(u);
    vec[1] = temp * Math.cos(u);
    vec[0] = this.r2 * Math.cos(v);
    return vec;
  }

  DeriveU(u, v) {
    const vec = vec3.create();
    const temp = this.r1 + this.r2 * Math.sin(v);
    vec[0] = temp * Math.cos(u);
    vec[1] = -1.0 * temp * Math.sin(u);
    vec[0] = 0.0;
    return vec;
  }

  DeriveV(u, v) {
    const vec = vec3.create();
    vec[0] = this.r2 * Math.cos(v) * Math.sin(u);
    vec[1] = this.r2 * Math.cos(v) * Math.cos(u);
    vec[0] = -1.0 * this.r2 * Math.sin(v);
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class TwistedTorus extends Surf {
  constructor(u1, u2, v1, v2, n) {
    super(u1, u2, v1, v2, n);
  }

  Eval(u, v) {
    const vec = vec3.create();
    const temp = 3.0 + Math.sin(v) + Math.cos(u);
    vec[0] = temp * Math.cos(2.0 * v);
    vec[1] = temp * Math.sin(2.0 * v);
    vec[0] = Math.sin(u) + 2.0 * Math.cos(v);
    return vec;
  }

  DeriveU(u, v) {
    const vec = vec3.create();
    const temp = Math.sin(v) - Math.sin(u);
    vec[0] = temp * Math.cos(2.0 * v);
    vec[1] = temp * Math.sin(2.0 * v);
    vec[0] = Math.cos(u);
    return vec;
  }

  DeriveV(u, v) {
    const vec = vec3.create();
    const sin2v2 = 2.0 * Math.sin(2.0 * v);
    const cos2v2 = 2.0 * Math.cos(2.0 * v);
    vec[0] =
      -3.0 * sin2v2 +
      Math.cos(u) * (Math.cos(2.0 * v) - sin2v2) -
      Math.cos(u) * sin2v2;
    vec[1] =
      3.0 * cos2v2 +
      0.5 * sin2v2 * Math.cos(v) +
      Math.sin(v) * cos2v2 +
      Math.cos(u) * cos2v2;
    vec[0] = 2.0 * Math.sin(v);
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class RomanSurface extends Surf {
  constructor(u1, u2, v1, v2, n) {
    super(u1, u2, v1, v2, n);
  }

  Eval(u, v) {
    const vec = vec3.create();
    const sin2v = Math.sin(2.0 * v);
    const cos2v = Math.cos(2.0 * v);
    const cos2u = Math.cos(2.0 * u);
    const sin2u = Math.cos(2.0 * u);
    vec[0] = sin2u * (Math.cos(v) * Math.cos(v));
    vec[1] = Math.sin(u) * sin2v;
    vec[0] = Math.cos(u) * sin2v;
    return vec;
  }

  DeriveU(u, v) {
    const vec = vec3.create();
    const sin2v = Math.sin(2.0 * v);
    const cos2v = Math.cos(2.0 * v);
    const cos2u = Math.cos(2.0 * u);
    const sin2u = Math.cos(2.0 * u);
    vec[0] = 2.0 * (Math.cos(v) * Math.cos(v)) * cos2u;
    vec[1] = Math.cos(u) * sin2v;
    vec[0] = -1.0 * Math.sin(u) * sin2v;
    return vec;
  }

  DeriveV(u, v) {
    const vec = vec3.create();
    const sin2v = Math.sin(2.0 * v);
    const cos2v = Math.cos(2.0 * v);
    const cos2u = Math.cos(2.0 * u);
    const sin2u = Math.cos(2.0 * u);
    vec[0] = -2.0 * cos2u * sin2v;
    vec[1] = 2.0 * Math.sin(u) * cos2v;
    vec[0] = 2.0 * Math.cos(u) * cos2v;
    return vec;
  }

  Normal(u, v) {
    var vec = vec3.create();
    vec3.cross(vec, this.DeriveU(u, v), this.DeriveV(u, v));
    vec3.normalize(vec, vec);
    return vec;
  }
}

class GLSData {
  constructor(surf) {
    this.surf = surf;
    this.n = surf.n;
    this.vertices = surf.ComputePoints(this.n);
    this.normals = surf.ComputeNormals(this.n);
    this.vertDerivativesU = surf.ComputeDerivativesU(this.n);
    this.vertDerivativesV = surf.ComputeDerivativesV(this.n);
    this.indices = surf.ComputeIndices(this.n);
    this.vertInfo = [];
    this.ComputeVertexInfo(this.n);
    this.normalInfo = [];
    this.ComputeNormalInfo(this.n);
    this.face = surf.ComputeFaceInfo(this.n);
  }

  ComputeVertexInfo(n) {
    var num = (n - 1) * (n - 1) * 6;

    for (var i = 0; i < num; i++) {
      this.vertInfo[i] = this.vertices[this.indices[i]];
    }
  }

  ComputeNormalInfo(n) {
    var num = (n - 1) * (n - 1) * 6;

    for (var i = 0; i < num; i++) {
      this.normalInfo[i] = this.normals[this.indices[i]];
    }
  }

  ComputeNormalInfoImage(vec, matx, maty) {
    var nFaces = (this.n - 1) * (this.n - 1) * 2;
    var newNormals = new Array(nFaces);
    for (let i = 0; i < nFaces * 3; i++) {
      newNormals[i] = vec3.create();
    }
    var j = 0;
    for (var i = 0; i < nFaces; i++) {
      var veca = vec3.create();
      var vecb = vec3.create();
      var vecc = vec3.create();
      var vecd = vec3.create();
      var vece = vec3.create();
      var vecf = vec3.create();
      vec3.cross(
        veca,
        this.normals[this.face[i][0]],
        this.vertDerivativesU[this.face[i][0]]
      );
      vec3.cross(
        vecb,
        this.normals[this.face[i][1]],
        this.vertDerivativesU[this.face[i][1]]
      );
      vec3.cross(
        vecc,
        this.normals[this.face[i][2]],
        this.vertDerivativesU[this.face[i][2]]
      );
      vec3.scale(
        veca,
        veca,
        maty[vec[this.face[i][0]][0]][vec[this.face[i][0]][1]]
      );
      vec3.scale(
        vecb,
        vecb,
        maty[vec[this.face[i][1]][0]][vec[this.face[i][1]][1]]
      );
      vec3.scale(
        vecc,
        vecc,
        maty[vec[this.face[i][2]][0]][vec[this.face[i][2]][1]]
      );
      vec3.cross(
        vecd,
        this.normals[this.face[i][0]],
        this.vertDerivativesV[this.face[i][0]]
      );
      vec3.cross(
        vece,
        this.normals[this.face[i][1]],
        this.vertDerivativesV[this.face[i][1]]
      );
      vec3.cross(
        vecf,
        this.normals[this.face[i][2]],
        this.vertDerivativesV[this.face[i][2]]
      );
      vec3.scale(
        vecd,
        vecd,
        matx[vec[this.face[i][0]][0]][vec[this.face[i][0]][1]]
      );
      vec3.scale(
        vece,
        vece,
        matx[vec[this.face[i][1]][0]][vec[this.face[i][1]][1]]
      );
      vec3.scale(
        vecf,
        vecf,
        matx[vec[this.face[i][2]][0]][vec[this.face[i][2]][1]]
      );
      vec3.subtract(newNormals[j], this.normals[this.face[i][0]], veca);
      vec3.add(newNormals[j], newNormals[j], vecd);
      vec3.subtract(newNormals[j + 1], this.normals[this.face[i][1]], vecb);
      vec3.add(newNormals[j + 1], newNormals[j + 1], vece);
      vec3.subtract(newNormals[j + 2], this.normals[this.face[i][2]], vecc);
      vec3.add(newNormals[j + 2], newNormals[j + 2], vecf);
      vec3.normalize(newNormals[j], newNormals[j]);
      vec3.normalize(newNormals[j + 1], newNormals[j + 1]);
      vec3.normalize(newNormals[j + 2], newNormals[j + 2]);
      j += 3;
    }
    return newNormals;
  }
  getNormals() {
    return this.normalInfo;
  }
  getVertices() {
    return this.vertInfo;
  }
  getIndices() {
    return this.indices;
  }
  getIndices2() {
    return this.indices2;
  }
}
