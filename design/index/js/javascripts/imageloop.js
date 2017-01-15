function Animator()
{
  // Specify default properties. These can be overridden
  // by <script> elements in the HTML document
  this.running = false;
  this.targetId = 'target';  
  this.startDelay = 1000;
  this.endDelay = 1000;
  this.speed = 4;
  this.currentIndex = 0;
  this.previousIndex = 0;
  this.imageSrcs = null;
  this.images = null;
  this.times = null;
  this.useCallback = null;
  this.initCallback = null;
  this.imageLoadedCallback = null;
  this.startStopCallback = null;
  this.runId = null;
  this.numToLoad = null;
 } // End of Animator constructor


Animator.prototype.init = function(){
  this.numToLoad = this.imageSrcs.length;
  
  // Load the images
  this.images = new Array(this.imageSrcs.length);
  var img;
  
  function addImageLoadedCallback(func, idx)
  {
    return (function() {
      func(idx);
    });
  }
  
  for (var i = 0; i < this.imageSrcs.length; i++) {
    img = new Image();
    this.images[i] = img;
    if(this.imageLoadedCallback != null)
    {
      img.onload = addImageLoadedCallback(this.imageLoadedCallback,i);
	  }
    img.src = this.imageSrcs[i];

    if(this.initCallback!=null) {
      this.initCallback(i);
    }
  }
}

Animator.prototype.startRunning = function(){
  this.running = true;
  this.exitLoop();
  this.enterLoop(0);
  if(this.startStopCallback !=null) {
    this.startStopCallback();
  }
}

Animator.prototype.stopRunning = function(){
  this.running = false;
  this.exitLoop();
  if(this.startStopCallback !=null) {
    this.startStopCallback();
  }
}

Animator.prototype.gotoIndex = function(index){
  if( index >= this.imageSrcs.length){
    index = 0;
  }
  else if( index < 0){
    index = this.imageSrcs.length;
  }
  this.exitLoop();
  this.use(index);
}

//private functions

Animator.prototype.exitLoop = function(){
  if(this.runId != null) {
    window.clearTimeout(this.runId);
    this.runId = null;
  }
}

Animator.prototype.enterLoop = function(delay){
  var temp = this;
  this.runId = window.setTimeout(function(){temp.loopIteration()},delay);
}

Animator.prototype.getNextIndexAndDelay = function(){
  // This math is here because as the delay increases,
  // the perception of amount of change decreases.
  var percent = (10.1 - this.speed)/10.0
  percent = (-(Math.log(1-(percent*.86))))*.5
  var sleep = percent * 1500;
  var idx = this.currentIndex + 1;
  if(idx == this.imageSrcs.length) {
    idx = 0;
    if(this.startDelay != 0){sleep = this.startDelay;}
  }
  if(idx == (this.imageSrcs.length-1)) {
    if(this.endDelay != 0){sleep = this.endDelay;}
 }
  return [idx,sleep];
}

Animator.prototype.loopIteration = function(){
  var next = this.getNextIndexAndDelay();
  this.use(next[0]);
  if( this.running ) {
    this.enterLoop(next[1]);
  }
}

Animator.prototype.use = function(index) {
  this.previousIndex = this.currentIndex;
  this.currentIndex = index;
  var targetObj = $(this.targetId);
  var img = this.images[index];
  targetObj.src = img.src; 
  if(this.useCallback!=null) { 
    this.useCallback(index,img.complete); 
  } 
}
