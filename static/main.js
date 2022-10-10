// constants
batches = 100
trainingDivergenceRate = 0.05
inputDivergenceRate = 0.2
size = 500

var c = document.getElementById("original");
var ctx = c.getContext("2d");
var img = document.getElementById("img1")
ctx.drawImage(img, 0, 0, size, size);
var imgData = ctx.getImageData(0, 0, size, size)

function getData(image){
    var c = document.createElement("canvas")
    c.width = size
    c.height = size
    var ctx = c.getContext("2d");
    var img = document.getElementById(image)
    ctx.drawImage(img, 0, 0, size, size);
    var imgData = ctx.getImageData(0, 0, size, size)
    c.remove()
    return imgData.data
}
console.log(getData("original"))

function drawNoise(n){
    if (n == 1){
        var c = document.getElementById("noise1");
    } else {
        var c = document.getElementById("noise"+n)
    }
    var c = document.getElementById("noise1");
    var ctx = c.getContext("2d");
    if (n == 1){
        var img = document.getElementById("img1")
    } else {
        var img = document.getElementById("noise"+(n-1))
    }
    ctx.drawImage(img, 0, 0, size, size);
    var imgData = ctx.getImageData(0, 0, size, size);
    for (var i = 0; i < imgData.data.length; i++){
        imgData.data[i] = imgData.data[i] * (Math.random()+ inputDivergenceRate)
    }
    var newimg = new Image()
    var ctx2  = document.getElementById("noise"+n).getContext("2d")
    ctx2.drawImage(newimg, 0, 0);
    ctx2.putImageData(imgData, 0, 0) 
}

function drawFromArray(result){
    var c = document.getElementById("original");
    var ctx = c.getContext("2d");
    var img = document.getElementById("img1")
    ctx.drawImage(img, 0, 0, size, size);
    var imgData = ctx.getImageData(0, 0, size, size);
    for (var i = 0; i < imgData.data.length; i++){
        imgData.data[i] = result[i]
    }
    var newimg = new Image()
    var ctx2  = document.getElementById("generated").getContext("2d")
    ctx2.drawImage(newimg, 0, 0);
    ctx2.putImageData(imgData, 0, 0) 
}

function drawNewCanvasFromArray(arr){
    var c = document.createElement("canvas")
    c.width = size
    c.height = size
    var ctx = c.getContext("2d")
    var img = new Image()
    ctx.drawImage(img, 0, 0, size, size);
    var imgData = ctx.getImageData(0, 0, size, size);
    for (var i = 0; i < imgData.data.length; i++){
        imgData.data[i] = arr[i]
    }
    ctx.putImageData(imgData, 0, 0)
    document.body.appendChild(c)
}

function model(){
    drawNoise(1)
    drawNoise(2)
    drawNoise(3)
    drawNoise(4)
    // objetivo: for every n: noise n -> original
    // tentar random noise -> original
    outputs = getData("original")
    var W = []
    for (var i = 0; i < batches; i++){
        inputs = []
        for (var k = 0; k < outputs.length; k++){
            inputs.push(outputs[k] * (Math.random()+ trainingDivergenceRate))
        }
        drawNewCanvasFromArray(inputs)
        weights = []
        for (var j = 0; j < inputs.length; j++){
            weights.push(outputs[j]/inputs[j])
        }
        W.push(weights)
        console.log(i+1 + "/" + batches)
        //console.log(W)
    }

    weightsAvg = []
    for (var i = 0; i < outputs.length; i++){
        wAvg = 0
        for (var j = 0; j < batches; j++){
            wAvg += W[j][i]
        }
        wAvg /= batches
        weightsAvg.push(wAvg)
    }
    console.log(weightsAvg) 
    reconstructedImg = []
    /*inputs = [] 
    for (var i = 0; i < weightsAvg.length; i++){
        inputs.push(Math.random()*255)
    }*/
    inputs = getData("noise4")
    for (var i = 0; i < weightsAvg.length; i++){
        reconstructedImg.push(weightsAvg[i]*inputs[i])
    }
    drawFromArray(reconstructedImg)
}
