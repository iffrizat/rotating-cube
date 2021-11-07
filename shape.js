/**
 * Rotates the given shape in the given plane by the given amount of radians
 * @param {number[][]} shape array of multivectors
 * @param {number[]} i plane
 * @param {number} ang angle 
 * @returns {number[]} array of multivectors
 */
function rotateShape(shape, i, ang) {
    const res = [];
    for (const v of shape) {
        res.push(rotate(ang, v, i))
    }

    return res;
}

/**
 * Scales the given shape by the given amount
 * @param {*} shape array of multivectors
 * @param {*} amt amount
 * @returns array of multivectors
 */
function scaleShape(shape, amt) {
    const res = [];
    for (const v of shape) {
        res.push(scale(amt, v));
    }

    return res;
}

/**
 * Draws a filled rectangle at each vector of the given shape
 * @param {number[][]} shape array of multivectors
 * @param {CanvasRenderingContext2D} ctx drawing context
 */
 function drawShape(shape, ctx) {
    for (const v of shape) {
        ctx.fillRect(v[1], v[2], 5, 5)
    }
}

/**
 * Connects vectors on shape accroding to the connection table
 * @param {number[][]} shape array of multivectors
 * @param {number[][]} cons connection table
 * @param {CanvasRenderingContext2D} ctx drawing context
 */
function connectShape(shape, cons, ctx) {
    for (const con of cons) {
        const [v1, v2] = con;
        ctx.beginPath();
        ctx.moveTo(shape[v1][1], shape[v1][2]);
        ctx.lineTo(shape[v2][1], shape[v2][2]);
        ctx.stroke();
    }
}