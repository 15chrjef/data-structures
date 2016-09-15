var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newNode = new Node(value);
    if (list.tail === null) {
      list.tail = newNode;
      list.head = newNode;
    } else {
      newNode.previous = list.tail;
      list.tail.next = newNode;
      list.tail = newNode;
    }

  };

  list.addToHead = function(value) {
    var newNode = new Node(value);
    if (list.head !== null) {
      list.head.previous = newNode;
      newNode.next = list.head;
      list.head = newNode;
    }
    else {
      list.tail = newNode;
      list.head = newNode;
    }
  };

  list.removeTail = function() {
    if (list.tail) {
      var oldTail = list.tail;
      list.tail = oldTail.previous;
      list.tail.next = null;
      return oldTail.value;
    }
  };
  

  list.removeHead = function() {
    if (list.head) {
      var oldHead = list.head;
      list.head = oldHead.next;
      return oldHead.value;
    }
  };

  list.contains = function(target) {
    var node = list.head;
    while (node !== null) {
      if (node.value === target) {
        return true;
      }
      node = node.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.previous = null;
  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
