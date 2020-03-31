var LenaJS = {};

LenaJS.getImage = function(img) {

    var c = document.createElement('canvas');
    c.width = img.width;
    c.height = img.height;

    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    return ctx.getImageData(0, 0, img.width, img.height);
}

LenaJS.printCanvas = function(selector, idata) {

    selector.width = idata.width;
    selector.height = idata.height;

    var ctx = selector.getContext('2d');
    ctx.putImageData(idata, 0, 0);

}

LenaJS.filterImage = function(selector, filter, image) {

    var args = [this.getImage(image)];

  return this.printCanvas(selector, filter.apply(null, args))
}

LenaJS.redrawCanvas = function(selector, filter) {

    var ctx = selector.getContext('2d');

    ctx = [ctx.getImageData(0, 0, selector.width, selector.height)];

    return this.printCanvas(selector, filter.apply(null, ctx));
}

LenaJS.prewittHorizontal = function (pixels) {
    var divider = 3;

    var operator = [1 / divider, 1 / divider, 1 / divider,
        0, 0, 0,
    -1 / divider, -1 / divider, -1 / divider];

    return LenaJS.convolution(pixels, operator);
}

LenaJS.prewittVertical = function (pixels) {
    var divider = 3;

    var operator = [-1 / divider, 0, 1 / divider,
    -1 / divider, 0, 1 / divider,
    -1 / divider, 0, 1 / divider];

    return LenaJS.convolution(pixels, operator);
}

LenaJS.convolution = function (pixels, weights) {
    var side = Math.round(Math.sqrt(weights.length)),
        halfSide = Math.floor(side / 2),
        src = pixels.data,
        canvasWidth = pixels.width,
        canvasHeight = pixels.height,
        temporaryCanvas = document.createElement('canvas'),
        temporaryCtx = temporaryCanvas.getContext('2d'),
        outputData = temporaryCtx.createImageData(canvasWidth, canvasHeight);

    for (var y = 0; y < canvasHeight; y++) {

        for (var x = 0; x < canvasWidth; x++) {

            var dstOff = (y * canvasWidth + x) * 4,
                sumReds = 0,
                sumGreens = 0,
                sumBlues = 0;

            for (var kernelY = 0; kernelY < side; kernelY++) {
                for (var kernelX = 0; kernelX < side; kernelX++) {

                    var currentKernelY = y + kernelY - halfSide,
                        currentKernelX = x + kernelX - halfSide;

                    if (currentKernelY >= 0 &&
                        currentKernelY < canvasHeight &&
                        currentKernelX >= 0 &&
                        currentKernelX < canvasWidth) {

                        var offset = (currentKernelY * canvasWidth + currentKernelX) * 4,
                            weight = weights[kernelY * side + kernelX];

                        sumReds += src[offset] * weight;
                        sumGreens += src[offset + 1] * weight;
                        sumBlues += src[offset + 2] * weight;
                    }
                }
            }

            outputData.data[dstOff] = sumReds;
            outputData.data[dstOff + 1] = sumGreens;
            outputData.data[dstOff + 2] = sumBlues;
            outputData.data[dstOff + 3] = 255;
        }
    }
    return outputData;
}
