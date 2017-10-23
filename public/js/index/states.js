import test from './test.js';
import load from './load.js';
import menu from './menu.js';
import play from './play.js';

function States(){}

States.prototype.test = test;
States.prototype.load = load;
States.prototype.menu = menu;
States.prototype.play = play;


export default States;