

var HashTable = function() {
  this._limit = 8;
  this._count = 0;
  this._storage = LimitedArray(this._limit);
  this._maxLoadFactor = 0.75;
  this._minLoadFactor = 0.25;
};

HashTable.prototype.reHash = function(newLimit) {
  this._limit = newLimit;
  var oldStorage = this._storage;
  this._storage = LimitedArray(newLimit);
  var self = this;
  this._count = 0;
  oldStorage.each(function(bucket) {
    if (bucket !== undefined) {
      bucket.forEach(function(tuple) {
        self.doInsert(tuple[0], tuple[1]);
      });
    }
  });
};

HashTable.prototype.resize = function() {
  if (this._maxLoadFactor < (this._count / this._limit)) {
    this.reHash(this._limit * 2);
  }
  else if (this._limit > 8 && this._minLoadFactor > (this._count / this._limit)) {
    this.reHash(Math.floor(this._limit / 2));
  }
};

HashTable.prototype.doInsert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket === undefined) {
    this._storage.set(index, [[k, v]]);
    this._count += 1;
  } else {
    // if present, overwrite 
    if (indexOfKey(bucket, k) >= 0) {
      bucket[indexOfKey(bucket, k)][1] = v;
    } else {
      bucket.push([k, v]);
      this._count += 1;
    }
  }
};

HashTable.prototype.insert = function(k, v) {
  this.doInsert(k,v);
  this.resize();
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
  var bucket = this._storage.get(index);
  if (bucket !== undefined && indexOfKey(bucket, k) >=0) {
    this._count -= 1;
    var newBucket = bucket.filter(function(tuple) {
      return tuple[0] !== k;
    });
    this._storage.set(index, newBucket);
    this.resize();
  }
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

