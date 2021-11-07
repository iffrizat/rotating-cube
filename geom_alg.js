const E   = [1, 0, 0, 0, 0, 0, 0, 0];
const X   = [0, 1, 0, 0, 0, 0, 0, 0];
const Y   = [0, 0, 1, 0, 0, 0, 0, 0];
const Z   = [0, 0, 0, 1, 0, 0, 0, 0];
const XY  = [0, 0, 0, 0, 1, 0, 0, 0];
const XZ  = [0, 0, 0, 0, 0, 1, 0, 0];
const YZ  = [0, 0, 0, 0, 0, 0, 1, 0];
const XYZ = [0, 0, 0, 0, 0, 0, 0, 1];

const NE   = [-1, 0, 0, 0, 0, 0, 0, 0];
const NX   = [0, -1, 0, 0, 0, 0, 0, 0];
const NY   = [0, 0, -1, 0, 0, 0, 0, 0];
const NZ   = [0, 0, 0, -1, 0, 0, 0, 0];
const NXY  = [0, 0, 0, 0, -1, 0, 0, 0];
const NXZ  = [0, 0, 0, 0, 0, -1, 0, 0];
const NYZ  = [0, 0, 0, 0, 0, 0, -1, 0];
const NXYZ = [0, 0, 0, 0, 0, 0, 0, -1];

const MULT_TABLE = [ // for example: yz*xyz = MULT_TABLE[6][7] = -x
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
 * Makes an empty multivector with given x, y, z coordinates
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @returns {number[]} Multivector
 */
function vector(x, y, z) {
    return [0, x, y, z, 0, 0, 0, 0];
}

/**
 * Makes a multivector version of given scalar
 * @param {number} s scalar
 * @returns {number[]} Multivector
 */
function scalar(s) {
    return [s, 0, 0, 0, 0, 0, 0, 0];
}

/**
 * Adds two multivectors together
 * @param {number[]} u multivector1
 * @param {number[]} v multivector2
 * @returns {number[]} Multivector
 */
function add(u, v) {
    const res = vector(0, 0, 0);

    for (let i = 0; i < 8; i++) {
        res[i] = u[i] + v[i];
    }
    return res;
}

/**
 * Scales given multivector
 * @param {number} amt amount to scale by
 * @param {number[]} v multivector
 * @returns {number[]} Multivector
 */
function scale(amt, v) {
    const res = vector(0, 0, 0);

    for (let i = 0; i < 8; i++) {
        res[i] = amt * v[i];
    }

    return res;
}

/**
 * Multiplies 2 multivectors together
 * @param {number[]} u multivector1
 * @param {number[]} v multivector2
 * @returns {number[]} Multivector
 */
function mult(u, v) {
    let res = vector(0, 0, 0);

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            res = add(res, scale(u[i]*v[j], MULT_TABLE[i][j]));
        }
    }

    return res;
}

/**
 * Rotates the multivector v in the plane i, by ang degrees (radians)
 * @param {number} ang angle 
 * @param {number[]} v multivector
 * @param {number[]} i plane
 * @returns {number[]} Multivector
 */
function rotate(ang, v, i) {
    let res = [...v];
    const left = add(scalar(Math.cos(ang/2)), scale(Math.sin(ang/2), i));
    const right = add(scalar(Math.cos(ang/2)), scale(-Math.sin(ang/2), i));

    res = mult(left, res);
    res = mult(res, right);

    return res;
}

/**
 * Returns magnitute of a multivector
 * @param {number[]} v multivector 
 * @returns {number} magnitude
 */
function magnitude(v) {
    let sum = 0;
    v.forEach(element => {
        sum += element*element;   
    });

    return Math.sqrt(sum);
}

/**
 * Normalizes given multivector
 * @param {number[]} v multivector 
 * @returns {number[]} normalized multivector
 */
function normalize(v) {
    return scale(1/magnitude(v), v);
}