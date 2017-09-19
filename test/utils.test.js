import _ from "../public/js/utils.js";
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