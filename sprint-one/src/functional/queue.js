var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var front = 0;
  var end = 0;

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[end] = value;
    end += 1;
  };

  someInstance.dequeue = function() {
    if (someInstance.size() > 0) {
      var tmp = storage[front];
      front += 1;
      return tmp;
    }
  };

  someInstance.size = function() {
    return end - front;
  };

  return someInstance;
};
