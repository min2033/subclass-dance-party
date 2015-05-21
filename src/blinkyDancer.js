var BlinkyDancer = function(top, left, timeBetweenSteps){

  //var blinkyDancer = makeDancer(top, left, timeBetweenSteps);

  Dancer.call(this);

  Dancer.prototype.step.call(this,timeBetweenSteps,this);

  Dancer.prototype.setPosition.call(this,top,left);

  this.bound = this;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  this.timeBetweenSteps = timeBetweenSteps;

};

BlinkyDancer.prototype = Object.create(Dancer.prototype);

BlinkyDancer.prototype.oldStep = function(time){
  Dancer.prototype.step(time,this);
};

BlinkyDancer.prototype.step = function(){
    // call the old version of step at the beginning of any call to this new version of step
    this.oldStep(this.timeBetweenSteps);
    // toggle() is a jQuery method to show/hide the <span> tag.
    // See http://api.jquery.com/category/effects/ for this and
    // other effects you can use on a jQuery-wrapped html tag.
    this.$node.toggleClass('dancing');
};
