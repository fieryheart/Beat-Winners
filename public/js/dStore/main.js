import '../../css/dStore.css';

const main = document.querySelector('main');
const section = document.querySelector('section');
const btn = document.querySelector('#btn');
let onSubmit;

addEvent(btn, 'click', click);

console.log(btn);

function click(e) {

    console.log("add events successfully.");

    let content = ["正在提交(」・ω・)」！","正在提交(／・ω・)／！","已提交(￣▽￣)／"];
    let cI = 0;

    if(!onSubmit) {
        onSubmit = setInterval(function(){
            btn.value = content[cI++%2];
        }, 300);
        btn.style.borderColor = '#000000';
    }


    // setTimeout(function(){
    //     btn.value = content[2];
    //     window.location.href = 'http://127.0.0.1:3000';
    // }, 2000);
}


// 弹出框


// 绑定事件
function addEvent(obj, type, fn) {
    if(window.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if(window.attachEvent) {
        obj.attachEvent('on'+type, fn);
    } else {
        obj['on'+type] = fn;
    }
}