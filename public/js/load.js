import {circlePoints} from './points.js';
import _ from './utils.js';

export default function(game){
    const ctx = this;

    const load = {
        circles: [],    // 每一圈的进度数
        graphics: {},   // 画板
        loadingFrames: []   // 动画帧集合
    }

    // 每帧进度条
    const LoadingFrame = function(start, end, config){
        this.start = start;     // 起点 
        this.end = end;     // 终点
        this.config = config;   // 进度条配置 -> 高(height)、宽(width)、颜色(color)、透明度(alpha)
    }

    ctx.preload = function(){

        let l = this.add.group();
        let g = this.add.graphics(0, 0, l);      // 画板
        
        // 默认进度条配置
        let defaultFrameConfig = {
            width: 4,
            height: 30,
            color: 0xffffff,
            alpha: 1
        }

        // 每圈进度配置 -> 圆点、外圈半径、内圈半径、条数、初角度、逆时针或者顺时针
        let circles = [
			{
				origin: {x: game.width/2, y: game.height/2},
				outR: defaultFrameConfig.height * 4,
				inR: defaultFrameConfig.height * 3,
				lines: 72,
				start: -Math.PI/2,
				d: 1
			},
			{
				origin: {x: game.width/2, y: game.height/2},
				outR: defaultFrameConfig.height * 2.8,
				inR: defaultFrameConfig.height * 1.6,
				lines: 48,
				start: -Math.PI/2,
				d: 0
			},
			{
				origin: {x: game.width/2, y: game.height/2},
				outR: defaultFrameConfig.height * 1.4,
				inR: defaultFrameConfig.height * 0.2,
				lines: 24,
				start: -Math.PI/2,
				d: 1
			}
        ]

        // 外圈点、内圈点
        let outC = circles.map((circle) => circlePoints(
            circle.origin,
            circle.outR,
            circle.start,
            circle.lines,
            circle.d
        ))
        let inC = circles.map((circle) => circlePoints(
            circle.origin,
            circle.inR,
            circle.start,
            circle.lines,
            circle.d
        ))

        console.log(_);
    }

}