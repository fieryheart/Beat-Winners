
const IO = function(f){
    this._value = f
}

IO.of = (x) => new IO(() => x);

IO.prototype.map = function(f) {
    return new IO(flowRight(f, this._value))
}

export default IO;