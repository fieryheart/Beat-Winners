import "../images/clouds.png";
import "../images/sun.png";
import "../images/player.png";

const devURL = "http://127.0.0.1:8080/build/images/";

export default function(game) {
    const ctx = this;


    ctx.preload = function() {


        const rsrc = [
          'clouds.png',
          'sun.png',
          'player.png'
        ];

        // 允许跨区加载图片
        ctx.load.crossOrigin = 'anoymous';

        // 加载资源
        rsrc.forEach((s) => {

          if(s.match(/\.(png|jpg)$/)) { // 加载图片
              ctx.load.image(s.replace(/\.(png|jpg)$/, ""), devURL + s);
          }


        })


    }

    // 创建元素
    ctx.create = function() {

        // 游戏属性
        const ga = {
            w: game.width,
            h: game.height,
            bgColor: Phaser.Color.getColor(255, 255, 255)
        };

        // 画布背景颜色
        ctx.stage.backgroundColor = ga.bgColor;

        console.log('%cWelcome to the menu of States!','background:#fff;color:#0000ff');


        // 添加 太阳
        let sun = ctx.add.sprite(0, 0, 'sun');
        sun.anchor.setTo(0.5, 0.5);
        sun.position.setTo(ga.w/2, ga.h/2);


        // 添加 云
        // TileSprite(game, x, y, width, height, key, frame)
        ctx.add.tileSprite(0, 0, ga.w, ga.h, 'clouds').autoScroll(-5, 0);


        // 添加 玩家
        let player = ctx.add.sprite(0, 0,'player');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(.1, .1);
        player.position.setTo(player.width/2, ga.h/2);


    }
}
