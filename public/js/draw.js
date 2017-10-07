/*
  绘图函数
*/
import _ from './utils.js';

const {
    curry
} = _

export const drawLine = curry(function(graphics, st, e, w){

        graphics.lineStyle(w.width, w.color, w.alpha);
        graphics.moveTo(st.x, st.y);
        graphics.lineTo(e.x, e.y);

});
