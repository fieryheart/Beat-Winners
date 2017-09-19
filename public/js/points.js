import _ from './utils.js';

const Coordinate2D = function(x, y){
    this.x = x;
    this.y = y;
}

// r: 半径
// n: 半径个数
// origin: 圆点坐标
// start: 初角度
// d: 顺时针或者逆时针
export 	const circlePoints = _.curry(function(origin, r, start, n, d){
	let sin, cos, x, y, coors = [];
	if(d === 1){ // 顺时针
		for(let i = 0; i < n; i++) {
			sin = Math.sin(start + 2*Math.PI/n*i);
			cos = Math.cos(start + 2*Math.PI/n*i);
			x = origin.x + r*cos;
			y = origin.y + r*sin;
			coors.push( new Coordinate2D(x, y) );
		}

	}else if(d === 0){ // 逆时针
		for(let i = 0; i < n; i++) {
			sin = Math.sin(start - 2*Math.PI/n*i);
			cos = Math.cos(start - 2*Math.PI/n*i);
			x = origin.x + r*cos;
			y = origin.y + r*sin;
			coors.push( new Coordinate2D(x, y) );
		}
	}else{
		coors = null;
	}
	return coors;
})