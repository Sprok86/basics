//Polyfills:
(function () {
    'use strict';
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    };

    // Production steps of ECMA-262, Edition 5, 15.4.4.19
    // Reference: http://es5.github.io/#x15.4.4.19
    if (!Array.prototype.map) {

      Array.prototype.map = function(callback, thisArg) {

        var T, A, k;

        if (this == null) {
          throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling ToObject passing the |this| 
        //    value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get internal 
        //    method of O with the argument "length".
        // 3. Let len be ToUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If IsCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 1) {
          T = thisArg;
        }

        // 6. Let A be a new array created as if by the expression new Array(len) 
        //    where Array is the standard built-in constructor with that name and 
        //    len is the value of len.
        A = new Array(len);

        // 7. Let k be 0
        k = 0;

        // 8. Repeat, while k < len
        while (k < len) {

          var kValue, mappedValue;

          // a. Let Pk be ToString(k).
          //   This is implicit for LHS operands of the in operator
          // b. Let kPresent be the result of calling the HasProperty internal 
          //    method of O with argument Pk.
          //   This step can be combined with c
          // c. If kPresent is true, then
          if (k in O) {

            // i. Let kValue be the result of calling the Get internal 
            //    method of O with argument Pk.
            kValue = O[k];

            // ii. Let mappedValue be the result of calling the Call internal 
            //     method of callback with T as the this value and argument 
            //     list containing kValue, k, and O.
            mappedValue = callback.call(T, kValue, k, O);

            // iii. Call the DefineOwnProperty internal method of A with arguments
            // Pk, Property Descriptor
            // { Value: mappedValue,
            //   Writable: true,
            //   Enumerable: true,
            //   Configurable: true },
            // and false.

            // In browsers that support Object.defineProperty, use the following:
            // Object.defineProperty(A, k, {
            //   value: mappedValue,
            //   writable: true,
            //   enumerable: true,
            //   configurable: true
            // });

            // For best browser support, use the following:
            A[k] = mappedValue;
          }
          // d. Increase k by 1.
          k++;
        }

        // 9. return A
        return A;
      };
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.21
    // Reference: http://es5.github.io/#x15.4.4.21
    if (!Array.prototype.reduce) {
      Array.prototype.reduce = function(callback /*, initialValue*/) {
        'use strict';
        if (this == null) {
          throw new TypeError('Array.prototype.reduce called on null or undefined');
        }
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        var t = Object(this), len = t.length >>> 0, k = 0, value;
        if (arguments.length == 2) {
          value = arguments[1];
        } else {
          while (k < len && !(k in t)) {
            k++; 
          }
          if (k >= len) {
            throw new TypeError('Reduce of empty array with no initial value');
          }
          value = t[k++];
        }
        for (; k < len; k++) {
          if (k in t) {
            value = callback(value, t[k], k, t);
          }
        }
        return value;
      };
    }
})();

//Global object for basic-js-examples:
var BASICJSEXAMPLES = (function(){
    //here are private variables and methods
    var numbersArray = [0, 5, 10, 6 ,9, 99, 120, -5 , 95, -10, 0, 88];


    //here are public variables and methods
    return {
        getNumbersArray: function () {
            return numbersArray;
        },
        setNumbersArray: function (arr) {
            if (Array.isArray(arr)) {
                numbersArray = arr;
            } else {
                return console.log('please use array to set numbersArray');
            }
        }
    }

})();

//Code to work with page basic-js-examples:
(function () {
    'use strict';
    var initial = BASICJSEXAMPLES.getNumbersArray();
    //copy initial array elements to arr:
    var arr = initial.map(function(element){
        return element;
    });

    var showButtons = document.getElementsByClassName('js-show-btn');
    if (showButtons) {
        if (showButtons.length >= 1) {
            showButtons[0].addEventListener("click", function (event) {
                document.getElementById('js-initial-array').innerHTML = initial;

            });
        }
        if (showButtons.length >= 2) {
            showButtons[1].addEventListener("click", function (event) {
                document.getElementById('js-default-sort').innerHTML = arr.sort();
            });
        }
        if (showButtons.length >= 3) {
            showButtons[2].addEventListener("click", function (event) {
                document.getElementById('js-ascending-sort').innerHTML = arr.sort(function (a,b) {
                    return a - b;
                });
            });
        };
        if (showButtons.length >= 4) {
            showButtons[3].addEventListener("click", function (event) {
                document.getElementById('js-descending-sort').innerHTML = arr.sort(function (a,b) {
                    return b - a;
                });
            });
        };
        if (showButtons.length >= 5) {
        	
            showButtons[4].addEventListener("click", function (event) {
            	var initialValue = +document.getElementById('js-reduce-input').value || 0;
                document.getElementById('js-reduce').innerHTML = arr.reduce(function (prevCalculated,currentVal) {
                    return prevCalculated + currentVal;
                }, initialValue);
            });
        };
    };

    //simplest paint-area 
    //adding dots by mouse left click
    var paintSimpleArea = document.getElementById('js-simple-paint-area');
    paintSimpleArea.addEventListener("click", function(event) {
	    var dot = document.createElement('div');
	    dot.className = 'dot';
	    dot.style.left = (event.pageX - 8) + "px";
	    dot.style.top = (event.pageY - 8) + "px";
	    document.body.appendChild(dot);
  	})  
    

})()

