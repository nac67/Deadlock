var Filmstrip = function (bmp, numF, frW, frH, frR) {
    this.srcImage = bmp;         // a bitmap image NOT a path to an image
    this.numFrames = numF;       // the number of frames in the filmstrip
    this.frameWidth = frW;       // the width of an individual frame
    this.frameHeight = frH;      // the height of an individual frame
    this.numFramesX = frR;       // the number of frames per row in the the filmstrip

    /** draws the image's top left corner at x,y */
    this.draw = function(frame, x, y){
        frame = frame%this.numFrames;
        var drawX = frame%this.numFramesX * this.frameWidth;
        var drawY = Math.floor(frame/this.numFramesX) * this.frameHeight;
        context.drawImage(this.srcImage, drawX, drawY, this.frameWidth, this.frameHeight,x,y,this.frameWidth,this.frameHeight);
    }
}