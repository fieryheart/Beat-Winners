
export default {
    curry: function(fn, thisArgs) {
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
    },

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

    map: function(f, x) {
        return x.map(f);
    }
}