import "../images/clouds.png";
import "../images/sun.png";
import "../images/player.png";
import "../images/start.png";
import "../assets/fonts/gem.png";
import "../assets/fonts/gem.xml";

const devURL = "http://127.0.0.1:8080/build/";

export default function(game) {
    const ctx = this;

    ctx.preload = function() {
        const imgs = [
            'clouds.png',
            'sun.png',
            'player.png'
          ];
          
          // 允许跨区加载图片
          ctx.load.crossOrigin = 'anoymous';
  
          // 加载资源
          imgs.forEach((img) => {
  
            if(img.match(/\.(png|jpg)$/)) { // 加载图片
                ctx.load.image(img.replace(/\.(png|jpg)$/, ""), devURL + 'images/' + img);
            } 
          });
          
          ctx.load.spritesheet('start', devURL+'images/start.png', 305, 100);
          ctx.load.bitmapFont('gem', devURL + 'images/gem.png', devURL + 'xml/gem.xml');
          
    }

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
        sun.anchor.set(.5);
        sun.position.setTo(ga.w/2, ga.h/2);


        // 添加 云
        // TileSprite(game, x, y, width, height, key, frame)
        ctx.add.tileSprite(0, 0, ga.w, ga.h, 'clouds').autoScroll(-5, 0);


        // 添加 title
        let title = ctx.add.bitmapText(ga.w/2, ga.h/2, "gem", "Beat Winners!", 64);
        title.anchor.set(.5);
        title.position.y -= title.height*2;
        console.log(title);

        // 添加 start按钮
        let start = ctx.add.button(ga.w/2, ga.h/2, 'start', gStart, this, 1, 0);
        start.anchor.set(.5);
        start.scale.set(.5);
        start.position.y += start.height;


        // 添加 玩家
        // player = ctx.add.sprite(0, 0,'player');
        // player.anchor.set(.5);
        // player.scale.set(.1);
        // player.position.setTo(player.width/2, ga.h/2);
        // player.inputEnabled = true;        
        // player.input.enableDrag();
        // game.physics.enable(player, Phaser.Physics.ARCADE);
        // player.body.collideWorldBounds = true;
        // player.destroy();
    }

    function gStart() {
        console.log("start");
    }
}