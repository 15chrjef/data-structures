

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket === undefined) {
    this._storage.set(index, [[k, v]]);
  } else {
    // if present, overwrite 
    if (indexOfKey(bucket, k) >= 0) {
      bucket[indexOfKey(bucket, k)][1] = v;
    } else {
      bucket.push([k, v]);
    }
  }
  
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket !== undefined && (bucket, k)) {
    var targetIndex = indexOfKey(bucket, k);
    return targetIndex !== -1 ? bucket[targetIndex][1] : undefined;
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, undefined);
};

var indexOfKey = function(bucket, k) {
  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return i;
    }
  }
  return -1;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

