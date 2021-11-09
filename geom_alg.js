const E = [1, 0, 0, 0, 0, 0, 0, 0];
const X = [0, 1, 0, 0, 0, 0, 0, 0];
const Y = [0, 0, 1, 0, 0, 0, 0, 0];
const Z = [0, 0, 0, 1, 0, 0, 0, 0];
const XY = [0, 0, 0, 0, 1, 0, 0, 0];
const XZ = [0, 0, 0, 0, 0, 1, 0, 0];
const YZ = [0, 0, 0, 0, 0, 0, 1, 0];
const XYZ = [0, 0, 0, 0, 0, 0, 0, 1];

const NE = [-1, 0, 0, 0, 0, 0, 0, 0];
const NX = [0, -1, 0, 0, 0, 0, 0, 0];
const NY = [0, 0, -1, 0, 0, 0, 0, 0];
const NZ = [0, 0, 0, -1, 0, 0, 0, 0];
const NXY = [0, 0, 0, 0, -1, 0, 0, 0];
const NXZ = [0, 0, 0, 0, 0, -1, 0, 0];
const NYZ = [0, 0, 0, 0, 0, 0, -1, 0];
const NXYZ = [0, 0, 0, 0, 0, 0, 0, -1];

const MULT_TABLE = [
  [E, X, Y, Z, XY, XZ, YZ, XYZ],
  [X, E, XY, XZ, Y, Z, XYZ, YZ],
  [Y, NXY, E, YZ, NX, NXYZ, Z, NZ],
  [Z, NXZ, NYZ, E, XYZ, NX, NY, XY],
  [XY, NY, X, XYZ, NE, NYZ, XZ, NZ],
  [XZ, NZ, NXYZ, X, YZ, NE, NXY, Y],
  [YZ, XYZ, NZ, Y, NXZ, XY, NE, NX],
  [XYZ, YZ, NXZ, XY, NZ, Y, NX, NE],
];

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @returns {number[]} 
 */
function vector(x, y, z) {
  return [0, x, y, z, 0, 0, 0, 0];
}

/**
 * @param {number} s
 * @returns {number[]}
 */
function scalar(s) {
  return [s, 0, 0, 0, 0, 0, 0, 0];
}

/**
 * @param {number[]} u
 * @param {number[]} v
 * @returns {number[]}
 */
function add(u, v) {
  const res = vector(0, 0, 0);

  for (let i = 0; i < 8; i++) {
    res[i] = u[i] + v[i];
  }
  return res;
}

/**
 * @param {number} amt
 * @param {number[]} v
 * @returns {number[]}
 */
function scale(amt, v) {
  const res = vector(0, 0, 0);

  for (let i = 0; i < 8; i++) {
    res[i] = amt * v[i];
  }

  return res;
}

/**
 * @param {number[]} u
 * @param {number[]} v
 * @returns {number[]}
 */
function mult(u, v) {
  let res = vector(0, 0, 0);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      res = add(res, scale(u[i] * v[j], MULT_TABLE[i][j]));
    }
  }

  return res;
}

/**
 * @param {number} ang
 * @param {number[]} v
 * @param {number[]} i 
 * @returns {number[]} 
 */
function rotate(ang, v, i) {
  let res = [...v];
  const left = add(scalar(Math.cos(ang / 2)), scale(Math.sin(ang / 2), i));
  const right = add(scalar(Math.cos(ang / 2)), scale(-Math.sin(ang / 2), i));

  res = mult(left, res);
  res = mult(res, right);

  return res;
}

/**
 * @param {number[]} v
 * @returns {number}
 */
function magnitude(v) {
  let sum = 0;
  for (const m of v) {
    sum += m * m;
  }

  return Math.sqrt(sum);
}

/**
 * @param {number[]} v 
 * @returns {number[]} 
 */
function normalize(v) {
  return scale(1 / magnitude(v), v);
}

/**
 * @param {number[]} v 
 * @returns {number[]} 
 */
function findRotPlane(v) {
  return [v[7], v[6], -v[5], v[4], v[3], -v[2], v[1], v[0]];
}