const canvas = document.getElementById("CANVAS");
const ctx = canvas.getContext("2d");

const [sizeSlider, xSlider, ySlider, zSlider] = [
    document.getElementById("size"),
    document.getElementById("xAngle"),
    document.getElementById("yAngle"),
    document.getElementById("zAngle")
];

ctx.translate(canvas.width/2, canvas.height/2);

let [size, xAngle, yAngle, zAngle] = [parseInt(sizeSlider.value), parseFloat(xSlider.value), parseFloat(ySlider.value), parseFloat(zSlider.value)];

sizeSlider.oninput = () => {
    size = parseInt(sizeSlider.value);
    draw(xAngle, yAngle, zAngle, size);
};

xSlider.oninput = () => {
    xAngle = parseFloat(xSlider.value);
    draw(xAngle, yAngle, zAngle, size);
};

ySlider.oninput = () => {
    yAngle = parseFloat(ySlider.value);
    draw(xAngle, yAngle, zAngle, size);
};

zSlider.oninput = () => {
    zAngle = parseFloat(zSlider.value);
    draw(xAngle, yAngle, zAngle, size);
};

const cube = [
    [-0.5, -0.5, 0.5],
    [-0.5, -0.5, -0.5],
    [0.5, -0.5, -0.5],
    [0.5, -0.5, 0.5],
    [-0.5, 0.5, 0.5],
    [-0.5, 0.5, -0.5],
    [0.5, 0.5, -0.5],
    [0.5, 0.5, 0.5]
];

const projMatrix = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
];

const sides = [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 3],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 5],
    [5, 6],
    [6, 7],
    [4, 7],
];


////////  ROTATION FUCNTIONS   //////////

const rotateX = (angle) => {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ];
};

const rotateY = (angle) => {
    return [
        [Math.cos(angle), 0, Math.sin(angle)],
        [0, 1, 0],
        [-Math.sin(angle), 0, Math.cos(angle)]
    ];
};

const rotateZ = (angle) => {
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ];
};

const vecToMatrix = (vector) => {
    return vector.map((v) => [v]); 
}

function matrixMultiply(a, b) {
    let aRows = a.length;
    let aCols = a[0].length;
    let bCols = b[0].length;
    let result = new Array(aRows); 
    for (let r = 0; r < aRows; r++) {
        const row = new Array(bCols);
        result[r] = row;
        const ar = a[r];
        for (let c = 0; c < bCols; ++c) {
            let sum = 0.;     
            for (let i = 0; i < aCols; ++i) {
                sum += ar[i] * b[i][c];
            }
            row[c] = sum;  
        }
    }
    return result;
}

function connect(a, b, projectedPoints, size) {
    ctx.beginPath();
    ctx.moveTo(projectedPoints[a][0][0]*size, projectedPoints[a][1][0]*size);
    ctx.lineTo(projectedPoints[b][0][0]*size, projectedPoints[b][1][0]*size);
    ctx.stroke();
}

function getProjectedPoints(xAngle, yAngle, zAngle) {
    const projectedPoints = []
    for (const point of cube) {
        const rotatedX = matrixMultiply(rotateX(xAngle), vecToMatrix(point));
        const rotatedY = matrixMultiply(rotateY(yAngle), rotatedX);
        const rotatedZ = matrixMultiply(rotateZ(zAngle), rotatedY);
        const projected = matrixMultiply(projMatrix, rotatedZ);

        projectedPoints.push(projected);
    }

    return projectedPoints;
}

function clear() {
    ctx.save();

    ctx.translate(-canvas.width/2, -canvas.height/2);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
}

function draw(xAngle, yAngle, zAngle, size) {
    clear();

    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;

    const projectedPoints = getProjectedPoints(xAngle, yAngle, zAngle);
    for (const connections of sides) {
        connect(connections[0], connections[1], projectedPoints, size);
    }
}

draw(xAngle, yAngle, zAngle, size);