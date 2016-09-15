var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  // your code here
  newTree.children = [];  // fix me

  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var newTree = Tree(value);
  newTree.parent = this;
  this.children.push(newTree);
};

treeMethods.removeFromParent = function(value) {
  // break pointers
  if (this.value === value) {
    if (this.parent) {
      this.parent.children = this.parent.children.filter(function(child) {
        return child.value !== value;
      });
      this.parent = null;
    }
  } else {
    this.children.forEach(function(childTree) {
      childTree.removeFromParent(value);
    });
  } 
};

treeMethods.contains = function(target) {
  return (this.value === target) || (this.children.some(function(childTree) { 
    return childTree.contains(target);
  }));
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
