import '../css/style.css';
import  {displayScale} from './screen.js';
import States from './states.js';

// 测试
const test = 1;

// 游戏对象配置项
const game = new Map();
if(test) {
    game.set("width", 480);
    game.set("height", game.get("width") / displayScale.get("test") );
}

// 游戏实例
const app = new Phaser.Game(game.get("width"), game.get("height"), Phaser.AUTO, 'app');

// 场景实例
const states = new States();

// 添加场景
app.state.add('load', states.load);

app.state.start('load');

console.log("very good");