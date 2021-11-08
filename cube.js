const canvas = document.getElementById("CANVAS");
const ctx = canvas.getContext("2d");
const [W, H] = [canvas.width, canvas.height];

const cube = [
    vector(0.5, -0.5, -0.5),
    vector(0.5, -0.5, 0.5),
    vector(-0.5, -0.5, 0.5),
    vector(-0.5, -0.5, -0.5),
    vector(0.5, 0.5, -0.5),
    vector(0.5, 0.5, 0.5),
    vector(-0.5, 0.5, 0.5),
    vector(-0.5, 0.5, -0.5),
];

const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [3, 7],
    [2, 6],
    [1, 5]
];

function animate(shape, ctx, ang, i, cons) {
    clear();

    const newShape = rotateShape(shape, i, ang);
    connectShape(newShape, cons, ctx);
    setTimeout(animate, 100, shape, ctx, ang+0.1, i, cons);
}

function clear() {
    ctx.save();

    ctx.translate(-W/2, -H/2);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, W, H);

    ctx.restore();
}

ctx.translate(W/2, H/2);
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

const shape = scaleShape(cube, 100);

//animate(shape, ctx, 0, XY, connections); // -- simple rotation

animate(shape, ctx, 0, normalize(add(XY, XZ)), connections); // -- complex rotation

//animate(shape, ctx, 0, normalize(add(X, YZ)), connections); // -- rotation + scaling

//animate(shape, ctx, 0, normalize(findRotPlane(vector(3, -5, 3))), connections); //  -- rotation along an arbitrary axis