import "../../images/clouds.png";
import "../../images/sun.png";
import "../../images/player.png";
import DanmakuControl from "./fetch.js";
import "../../assets/fonts/nokia.png";
import "../../assets/fonts/nokia.xml";

const devURL = "http://127.0.0.1:8080/build/";


const gameSet = {
  time: 50
}

const playSet = {
  speed: [5, 5, 5, 5]
}


export default function(game) {
    const ctx = this;
    let ga;
    let player, bullet, dGroup, clockS, clockT, time, dMap;


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



        ctx.load.bitmapFont('nokia', devURL + 'images/nokia.png', devURL + 'xml/nokia.xml');

    }

    // 创建元素
    ctx.create = function() {

        // 游戏属性
        ga = {
            w: game.width,
            h: game.height,
            bgColor: Phaser.Color.getColor(255, 255, 255)
        };

        // 画布背景颜色
        ctx.stage.backgroundColor = ga.bgColor;

        console.log('%cWelcome to the play of States!','background:#fff;color:#0000ff');

        // 添加 太阳
        let sun = ctx.add.sprite(0, 0, 'sun');
        sun.anchor.set(.5);
        sun.position.setTo(ga.w/2, ga.h/2);


        // 添加 云
        // TileSprite(game, x, y, width, height, key, frame)
        ctx.add.tileSprite(0, 0, ga.w, ga.h, 'clouds').autoScroll(-5, 0);


        // 添加 玩家
        player = ctx.add.sprite(0, 0,'player');
        player.anchor.set(.5);
        player.scale.set(.1);
        player.position.setTo(player.width/2+5, ga.h/2);
        player.inputEnabled = true;        
        player.input.enableDrag();
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        // player.destroy();
        // player.body.setSize(200,240);


        // 添加时间
        time = gameSet.time;
        clockT = ctx.add.bitmapText(ga.w/2, ga.h/2, "nokia", time.toString(), 16);
        clockT.anchor.set(.5);

        // 部署弹幕
        dMap = Array.from(Array(100),(v, k) => v = []);


        // 获取弹幕数据
        DanmakuControl.getDanmaku().then(function(res){
          return res.text();
        }).then(function(val) {

          // 计时器
          clockS = ctx.time.events;
          clockS.loop(Phaser.Timer.SECOND, updateCounter, this)
          
          let danmakus = JSON.parse(val);

          danmakus.forEach(function(d, i){
            danmakus[i].position = {
              x: d.positionX,
              y: d.positionY
            };
            danmakus[i].velocity = {
              x: d.velocityX,
              y: d.velocityY
            }
          })
          
          // 填充弹幕组
          danmakus.forEach(function(d){
            let time = d.time;
            dMap[time-1].push(d);
          })
        })

        // let danmakus = json.data;
        // danmakus.forEach(function(d){
        //     let time = d.time;            
        //     dMap[time-1].push(d);
        // })
        // console.log(dMap);


        // 弹幕
        dGroup = ctx.add.group();

        // 观察碰撞体积
        game.physics.startSystem(Phaser.Physics.ARCADE);

    }

    ctx.update = function() {

      // 键盘监控
      if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        player.y -= playSet.speed[0];
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        player.x += playSet.speed[1];
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        player.y += playSet.speed[2];
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        player.x -= playSet.speed[3];
      }
      // 玩家和弹=弹幕碰撞检测
      game.physics.arcade.collide(player, dGroup, badEnd, null, ctx);
    }


    ctx.render = function() {
      game.debug.body(player);
    }


    // 计时器事件
    function updateCounter() {
      if(time >= 1){
        clockT.setText(time.toString());
        time >= 1 && popDanmaku(time);
        time--;
      } else {
        clockT.setText(time.toString());
        happyEnd();
      }
    }

    // 将弹幕放入游戏中
    function popDanmaku(t) {
        dMap[t-1].forEach(function(d){
          let {id, content, position, velocity, collideWorldBounds, fill} = d;
          let ds = ctx.add.text(position.x, position.y, content, {"fill": fill});
          ds.anchor.set(.5);
          game.physics.enable(ds, Phaser.Physics.ARCADE);
          ds.position.x = ga.w + ds.width/2;
          // ds.body.collideWorldBounds = collideWorldBounds;
          ds.checkWorldBounds = true;
          ds.outOfBoundsKill = true;
          ds.body.velocity.set(velocity.x, 0);
          ds.body.bounce.set(1);
          dGroup.add(ds);
        })
    }

    // 通关失败
    function badEnd() {
      console.log("通关失败!");
      player.kill();
      clockS.pause();
    }

    // 通关成功
    function happyEnd() {
      dGroup.forEach(function(d) {
        console.log(d);
        d.velocity.set(0);
      })
      console.log("通关成功");
    }
}