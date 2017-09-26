import {circlePoints} from './points.js';
import _ from './utils.js';
import {drawLine} from './draw.js';

export default function(game){
    const ctx = this;
    // const map = _.map;
    // const curry = _.curry;
    // const flowRight = _.flowRight;
    // const reduce = _.reduce;
    // const getKey = _.getKey;
    const {
        map,
        curry,
        flowRight,
        reduce,
        getKey,
        add,
        filterKey,
        machine
    } = _
    

    const load = {
        progress: 0,    // 每一圈的进度数
        graphics: {},   // 画板
        loadingFrames: []   // 动画帧集合
    }

    // 每帧进度条构造函数
    const LoadingFrame = function(start, end, config){
        this.start = start;     // 起点 
        this.end = end;     // 终点
        this.config = config;   // 进度条配置 -> 高(height)、宽(width)、颜色(color)、透明度(alpha)
    }

    LoadingFrame.of = function(start, end, config){
        return new LoadingFrame(start, end, config);
    }



    // 预先加载
    ctx.preload = function(){

        let l = this.add.group();
        let g = this.add.graphics(0, 0, l);      // 画板
        load.graphics = g;
        
        // 默认进度条配置
        let defaultFrameConfig = {
            width: 4,
            height: 30,
            color: 0xffffff,
            alpha: 1
        }

        // 每圈进度配置 -> 圆点origin、外圈半径r、内圈半径r、条数n、初角度start、逆时针或者顺时针d
        let circles = [
			{
				origin: {x: game.width/2, y: game.height/2},
				outR: defaultFrameConfig.height * 4,
				inR: defaultFrameConfig.height * 3,
				blocks: 72,
				start: -Math.PI/2,
				d: 1
			},
			{
				origin: {x: game.width/2, y: game.height/2},
				outR: defaultFrameConfig.height * 2.8,
				inR: defaultFrameConfig.height * 1.6,
				blocks: 48,
				start: -Math.PI/2,
				d: 0
			},
			{
				origin: {x: game.width/2, y: game.height/2},
				outR: defaultFrameConfig.height * 1.4,
				inR: defaultFrameConfig.height * 0.2,
				blocks: 24,
				start: -Math.PI/2,
				d: 1
			}
        ];

        // 得到环点坐标的函数
        // circlePoints接受函数的参数顺序是: origin | r | start | n | d
        let getOutCircle = (circle) => circlePoints(
            circle.origin,
            circle.outR,
            circle.start,
            circle.blocks,
            circle.d
        );
        let getInCircle = (circle) => circlePoints(
            circle.origin,
            circle.inR,
            circle.start,
            circle.blocks,
            circle.d
        );


        // 所有的外圈点和内圈点
        let outCirclePoints = flowRight(_.reduceDimension, map(getOutCircle))(circles);
        let inCirclePoints = flowRight(_.reduceDimension, map(getInCircle))(circles);


        let fromZero = reduce(0);               // 从零开始
        let addFromZero = fromZero(add);        // 从零开始加
        let allBlocks = flowRight(addFromZero, filterKey('blocks'))(circles);   // 获取进度总数
        
        // 有待改进
        // 函数式构造一整个动画
        let setLine = curry((start, end, config) => [start, end, config]);
        // loading所有点对象
        let pushOut = outCirclePoints.map((p) => setLine(p));
        let pushIn = inCirclePoints.map((p, i) => pushOut[i](p));
        let pushConfig = pushIn.map((f) => f(defaultFrameConfig));
        load.loadingFrames = pushConfig;
        console.log(load);

    }

    // 持续动画
    ctx.update = function(){
            
            let i = load.progress;
            drawLine(
                load.graphics, 
                load.loadingFrames[i][0],   // 起点
                load.loadingFrames[i][1],   // 终点
                load.loadingFrames[i][2]    // 线配置
            )
            load.progress++;
            if(load.progress === load.loadingFrames.length) {
                load.progress = 0;
                load.graphics.clear();
            }
    }

}