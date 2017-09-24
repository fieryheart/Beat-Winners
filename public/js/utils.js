
Array.prototype.machine = function(f) {
    let l = this.length;
    let rst = [];
    
    for(let i = 0; i < l; i++){
        rst.push(f(this[i]))
    }
    return rst;
}

const curry = function(fn, thisArgs) {
    if(!Array.isArray(thisArgs)) {
        thisArgs = [];
    }
    return function() {
        let args = Array.prototype.slice.call(arguments);
        if((args.length + thisArgs.length) < fn.length){
            return curry(fn, thisArgs.concat(args));
        }
        return fn.apply(this, thisArgs.concat(args));
    }
}

const map = curry((f, x) => x.map(f));

const reduce = curry((initial, f, x) => x.reduce(f, initial));

const getKey = curry((key, obj) => obj[key])

const add = curry((x, y) => x + y);

const filterKey = curry((key, arr) => map(getKey(key))(arr));

const machine = curry((f, arr) => arr.machine(f)) 

export default {
    curry: curry,

    flowRight: function(){
        let thisArgs = Array.prototype.slice.call(arguments);
        return function(){
            let args = Array.prototype.slice.call(arguments);
            let rst;
            for(let i = thisArgs.length-1; i > -1; i--){
                if(i !== thisArgs.length-1){
                    rst = thisArgs[i](rst);
                }else {
                    rst = thisArgs[i](...args);
                }
            }
            return rst;
        }
    },
    // 数组降维
    reduceDimension: function(arr) {
        return Array.prototype.concat.apply([], arr);
    },

    map: map,

    reduce: reduce,

    getKey: getKey,

    add: add,

    filterKey: filterKey,

    machine: machine
}