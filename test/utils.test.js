import _ from "../public/js/utils/utils.js";
import whatwg from 'whatwg-fetch';
const chai = require('chai');
const expect = chai.expect;

describe('flowRight', function(){
    it('add one and multiply by two', function(done){
        let addOne = function(x){
            return x+1;
        }
        let multiplyTwo = function(x){
            return x*2;
        }
        let foo = _.flowRight(multiplyTwo, addOne);
        expect(foo(1)).to.be.equal(4);
        done();
    })
});

describe("getAllBlocks", function(){
    it('get the number of animation frames', function(done){
        let circles = [
            {
                blocks: 72
            },
            {
                blocks: 48
            },
            {
                blocks: 24
            }
        ];
        let fromZero = _.reduce(0);
        let addFromZero = fromZero(_.add);
        let getBlocks = _.getKey('blocks');
        let blocks = _.flowRight(addFromZero, _.map(getBlocks))(circles);
        expect(blocks).to.be.equal(144);
        done();
    })
})

describe('getDanmeku', function(){
    it('fetch the Danmaku', function(done){

        const URL = 'http://127.0.0.1:3000';
        const fetch = whatwg.fetch;
        const Header = whatwg.Headers;

        fetch(URL + '/getDanmaku', {
            method: 'GET',
            headers: {
                "Content-Type": "text/plain"
            }
        }).then(function(res){
            expect(res).to.be.a('string');
        }, (rej) => {
            throw new Error(rej);
        })

        done();
    })
})