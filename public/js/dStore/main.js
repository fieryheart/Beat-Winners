import '../../css/dStore.css';
import 'whatwg-fetch';
import $ from 'jquery';
import '../../images/d/d1.png';
import '../../images/d/d2.png';
import '../../images/d/d3.png';
import '../../images/d/d4.png';

/*

    1. input内容到屏幕预览使用订阅/发布模式

    输入框的配置项

    {
        target:,    // input节点
        name:,      // name
        value:,     // 值
        max:,       // 最大值
        min:,       // 最小值
        events:,    // 事件
    }

    2. 后台数据
    --- 输入数据限制
    --- 弹幕动效名称 (0 -> default) Map

*/

const toString = Object.prototype.toString;

const URL = 'http:127.0.0.1:3000/';
const devURL = 'http://127.0.0.1:8080/build/';

const inputs = new Map(Array.from($('input[type="text"]')).map((input) => [input.name, input]));
const submit = $('#submit');
const preview = $('#preview');


let onSubmit;
let submitContent = ["正在提交(」・ω・)」！","正在提交(／・ω・)／！","已提交(￣▽￣)／"];

// 检测input值
let checkValueFn = {};

let inputType = new Map([
    ['nickname', 'String'],
    ['content', 'String'],
    ['position', 'Number'],
    ['time', 'Number'],
    ['alive', 'Number'],
    ['fontSize', 'Number'],
    ['animation', 'String']
])

let inputName = new Map([
    ['nickname', '昵称'],
    ['content', '弹幕内容'],
    ['position', '出现位置'],
    ['time', '出现时间'],
    ['alive', '存活时间'],
    ['fontSize', '字体大小'],
    ['animation', '动画']
])

// 测试数据
let testInputLimit = [
    {
        name: 'nickname',
        min: 1,
        max: 10
    },
    {
        name: 'content',
        min: 1,
        max: 20
    },
    {
        name: 'position',
        min: 1,
        max: 540
    },
    {
        name: 'time',
        min: 1,
        max: 50
    },
    {
        name: 'alive',
        min: 1,
        max: 10
    },
    {
        name: 'fontSize',
        min: 1,
        max: 20
    }
];
let testImg = [
    'd1.png',
    'd2.png',
    'd3.png'
]

const fail = function(error) {
    throw new Error(error);
}

const isType = function(type) {
    return function(obj) {
        return toString.call(obj) === `[object ${type}]`
    }
}
const is = new Map([
    ['isString', isType('String')],
    ['isNumber', isType('Number')]
])

// 输入的弹幕特效
let danmakuAnimation = "";


$(document).ready(function(){

    let itemImgs = testImg;
    let ul;
    for(let i = 0; i < itemImgs.length; i++) {
        if(i%3 === 0){
            ul = $(`<ul class="flex space-around"></ul>`);
            submit.before(ul);
        }        
        ul.append(`<li class="item"></li>`);
    }

    let lastSelected = $('.item').eq(0);

    // 弹幕动效演示图片加入背景
    $('.item').each(function(i) {
        if(itemImgs[i]) {

            let imgURL = `url(${devURL}images/${itemImgs[i]})`;
            $(this).css('background-image', imgURL).data('animation', itemImgs[i].replace(/\.(png|jpg|gif)$/, ''))

            // 每个item绑定点击事件
            $(this).bind('click', function() {

                lastSelected.css('border-color', '#ffffff')
                $(this).css('border-color', '#ff0000')
                lastSelected = $(this);
                danmakuAnimation = $(this).data('animation');
                console.log(danmakuAnimation);

                // preview动作
                
            })

        } else {

            fail(`The images[${i}] is not defined`);

        }
    })
})

// 定义输入框内容的检测方法 (先检测数据类型，然后检测数据max/min)
const checkFn = function(data) {
    let name = data.name;
    let max = data.max;
    let min = data.min;
    return function(val) {

        if(inputType.has(name)){
            let type = inputType.get(name);

            if(type === 'String') { // 字符串类型
                return val.length >= min && val.length <= max;
            } else if(type === 'Number'){   // 数字类型
                return Number(val) >= min && Number(val) <= max;
            } else {
                fail(`${type} is not right.`);
            }

        } else {
            fail('There is not the name in inputs');
        }
    }
}

// 得到input的max/min
// ... fetch
const checkValueMap = new Map(testInputLimit.map((val, i) => {
    return [val.name, checkFn(val)];
}))



// 提交弹幕
submit.bind('click', function (e) {
    let cI = 0;

    if(!onSubmit) {
        // 提交按钮内容动画
        // onSubmit = setInterval(function(){
        //     submit.prop('value', submitContent[cI++%2]);
        // }, 300);


        $(this).css('border-color', '#000000');

        let input;  // 输入框
        let name;   // 输入框名字
        let value;  // 输入数据
        let error = false;

        // 获取弹幕内容        
        // checkValueMap.forEach((check, key) => {
        //     input = inputs.get(key);
        //     name = input.name;
        //     value = input.value;
        //     if( !check(value) ) {
        //        error = inputAgain(name);
        //     }
        // })

        if(!error) {
            
            let data = [];
            inputs.forEach(function(input) {
                data.push({
                    "name": input.name,
                    "value": input.value
                })
            });

            // 选择弹幕动画
            $('.item').each(function(){
                if($(this).data('selected')) {
                    data.push({
                        "name": "animation",
                        "value": $(this).data('animation')
                    })
                    
                }
            });


            // 发送弹幕
            fetch('postDanmaku', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(data)
            }).then(function(res){

                
            }).then(function(val){
                
                // if(val.status === 'success') {

                //     // 页面跳转
                //     // setTimeout(function(){
                //     //     btn.value = content[2];
                //     //     window.location.href = 'http://127.0.0.1:3000';
                //     // }, 0);

                // } else {

                // }

            })
        }
        /*
        if(Object.prototype.toString.call(data) === "[object Array]"){
            
            data.forEach((d) => {
                inputAgain(d[0]);
                showConfirm(d);
            }) 

        } else if (Object.prototype.toString.call(data) === "[object Object]") {
            // 发送弹幕
            fetch('postDanmaku', {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify(data)
            }).then(function(res){
                console.log(res);
            })
        } else {
            throw new Error('You haven\'t input the right danmaku.')
        }
        */

    }


})


// 输入框获取焦点
$('input[type="text"]').bind("focus", function() {
    $(this).val("").css('color', '#000000');
});

// 提交按钮焦点取消
submit.bind("blur", function(){
    $(this).css('border-color', '#ffffff');
});


// 根据输入内容更新preview
$('input[type="text"]').bind("keyup", function (e) {
    // 使用canvas展现预览弹幕效果
    // ...
    console.log("updatePreview");
});


// 清空input的value
function inputAgain(name) {

    let target = $(inputs.get(name));

    target.css('color', '#FF0000');
    target.val(`${inputName.get(name)}不符合要求`);
    submit.css('border-color', '#ffffff');

    return true;
}


// 取出像素中的数字
function filterPX(val){
    return Number(val.replace('px',''));
}







// 绑定事件
function addEvent(target, type, fn) {
    if(window.addEventListener) {
        target.addEventListener(type, fn, false);
    } else if (window.attachEvent) {
        target.attachEvent('on'+type, fn);
    } else {
        target['on'+type] = fn;
    }
}

// 取消事件
function removeEvent(target, type, fn) {
    if(window.removeEventListener) {
        target.removeEventListener(type, fn, false);
    } else if (window.detachEvent) {
        target.detachEvent('on'+type, fn);
    } else {
        target["on"+type] = null;
    }
}

// 取消事件冒泡
function stopDefaultAndBubble(event) {

    let e = arguments.callee.caller.arguments[0] || event;

    if (e && e.stopPropagation && e.preventDefault) {
        e.stopPropagation();
        e.preventDefault();
    } else if(window.event) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }

    return false;
}

// 绑定一次事件
function addOnceEvent(obj, type, fn) {
    let callback = function() {
        fn();
        removeEvent(obj, type, callback);  
    }
    addEvent(obj, type, callback); 
}
