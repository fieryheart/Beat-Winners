import '../css/style.css';
import  {displayScale} from './screen.js';
import States from './states.js';

// 测试
const dev = 1;

// 游戏对象配置项
const game = new Map();
if(dev) {
    game.set("height", 540);
    game.set("width", game.get("height") * displayScale.get("dev"));
}

// 游戏实例
const app = new Phaser.Game(game.get("width"), game.get("height"), Phaser.AUTO, 'app');

// 场景实例
const states = new States();

// 添加场景
app.state.add('test', states.test);
app.state.add('load', states.load);
app.state.add('menu', states.menu);
app.state.add('play', states.play);

// 进入场景
// app.state.start('test');
// app.state.start('load');
// app.state.start('menu');
app.state.start('play');

console.log('%cinit!','background:#fff;color:#0000ff');
