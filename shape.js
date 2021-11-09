/**
 * @param {number[][]} shape
 * @param {number[]} i
 * @param {number} ang
 * @returns {number[][]}
 */
function rotateShape(shape, i, ang) {
    const res = [];
    for (const v of shape) {
        res.push(rotate(ang, v, i))
    }

    return res;
}

/**
 * @param {number[][]} shape
 * @param {number} amt
 * @returns {number[][]}
 */
function scaleShape(shape, amt) {
    const res = [];
    for (const v of shape) {
        res.push(scale(amt, v));
    }

    return res;
}

/**
 * @param {number[][]} shape
 * @param {CanvasRenderingContext2D} ctx
 */
 function drawShape(shape, ctx) {
    for (const v of shape) {
        ctx.fillRect(v[1], v[2], 5, 5)
    }
}

/**
 * @param {number[][]} shape
 * @param {number[][]} cons 
 * @param {CanvasRenderingContext2D} ctx 
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