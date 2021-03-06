module.exports = {
  first: function (array, n) {
    if (n === undefined) {
      return array[0];  // return an element if n isn't specified
    }
    else{
      return array.slice(0, n); // return an array if n is specified (even if one element)
    }
  },

  max: function (array) {
   if (!array || array.length === 0 ) {
     return -Infinity;
   }

    return array.reduce( function(prev, curr) {
      return (prev < curr) ? curr : prev;  // return greater of two numbers
    } );
  },

  min: function (array) {
    if (!array || array.length === 0 ) {
      return Infinity;
    }

    return array.reduce( function(prev, curr) {
      return (prev < curr) ? prev : curr;  // return lesser of two numbers
    } );
  },

  intersection: function () { // this function takes a variable # of parameters

    var args = [].slice.call(arguments);   // get arguments as array
      // http://javascript.info/tutorial/arguments

    // intersection with multiple arrays operates similarly to an accumulator.
    // the first array is the preliminary result, and each additional array
    // reduces the number of elements in the array.  this makes 'reduce' in
    // the array methods a great candidate for this.
    return args.reduce(
      function(array1, array2) {

        // this line filters out values in the first array that aren't in
        // the second array.  the 'some' function returns true if the given
        // function evaluates to true for at least one value in the array.
        return array1.filter( function(val, idx, arr) {
          return (array2.some(function(curr, idx , arr) {return curr === val;}));
        } );
      }
    );
  },

  difference: function() {
    var args = [].slice.call(arguments);   // get arguments as array
      // http://javascript.info/tutorial/arguments

    // difference is similar to intersection, except in this case elements 
    // are removed from the result array if they appear in later arrays.
    return args.reduce(
      function(array1, array2) {

        // the filter criteria is the opposite of the intersection function.
        // 'every' returns true if the given function evaluates to true for
        // every element of the given array - in this case, we want each
        // element in the first array that we are keeping to be not equal
        // to any element in the second array.
        return array1.filter( function(val, idx, arr) {
          return (array2.every(function(curr,idx,arr) {return curr !== val;}));
        } );
      }
    );
  },

  uniq: function() {
    var args = [].slice.call(arguments);   // get arguments as array
      // http://javascript.info/tutorial/arguments

    // flattening array because we want to consolidate all parameters
    // (in case more than one array is provided).  This is necessary because
    // args to array provides at least a doubly nested array; this step
    // also only flattens the array by one level.  (which is important
    // if arrays are objects in the parameters)
    var flatArray = args.reduce(
      function(array1, array2) {
        return array1.concat(array2);
      }
    );

    // the first occurance will match indexOf; future occurrances won't.
    return flatArray.filter(function(curr,idx,arr) {
      return (idx === arr.indexOf(curr));
    });
  },

  contains: function(array, target) {
    var args = [].slice.call(arguments);   // get arguments as array

    return args.every( 
      function(current, index, array) {
        if (index === 0) return true; // args[0] is the array

        // check that each parameter past 0 is in array[0], the search array
        return array[0].some( function(val, idx, arr) {
            return (val === current);
          }
        );
      }

    );
  }
};