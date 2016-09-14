var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var someInstance = Object.create(queueMethods);

  someInstance.front = 0;
  someInstance.end = 0;
  someInstance.storage = {};

  return someInstance;
};

var queueMethods = {
  enqueue: function(value) {
    this.storage[this.end] = value;
    this.end += 1;
  },
  dequeue: function() {
    if (this.size() > 0) {
      var tmp = this.storage[this.front];
      delete this.storage[this.front];
      this.front += 1;
      return tmp;
    }
  },
  size: function() {
    return this.end - this.front;
  }
};


