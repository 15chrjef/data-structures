

// Instantiate a new graph
var Graph = function() {
  this.collection = {};
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.collection[node] = [];
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.collection.hasOwnProperty(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(nodeToDelete) {

  var self = this;
  // for every edge belonging to nodeToDelete, remove nodeToDelete from the outbound edge
  this.collection[nodeToDelete].forEach(function(otherNode) {
    self.collection[otherNode] = self.collection[otherNode].filter(function(node) {
      return node !== nodeToDelete;
    }) 
  });

  delete this.collection[nodeToDelete];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  return this.collection[fromNode].indexOf(toNode) >= 0;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.collection[fromNode].push(toNode);
  this.collection[toNode].push(fromNode);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  this.collection[fromNode] = this.collection[fromNode].filter(function(node) { 
    return node !== toNode;
  });

  this.collection[toNode] = this.collection[toNode].filter(function(node) {
    return node !== fromNode;
  });
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  Object.keys(this.collection).forEach(cb);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


