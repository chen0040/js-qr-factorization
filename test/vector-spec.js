var expect = require('chai').expect;
var jsmatrix = require('../src/jsmatrix');

describe('Sparse Vector', function(){
   describe('copy() and makeCopy()', function(){
     it('should make copy of the original vector', function(){
        var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
        var vector2 = vector1.makeCopy();
        expect(vector2.get(0)).to.equal(0);
        expect(vector2.get(1)).to.equal(3);
        expect(vector2.get(2)).to.equal(0);
        expect(vector2.get(3)).to.equal(0);
        expect(vector2.get(4)).to.equal(0);
        expect(vector2.get(5)).to.equal(2);
        expect(vector2.get(7)).to.equal(4);
        expect(vector2.get(8)).to.equal(0);
        expect(vector2.get(9)).to.equal(0);
     });  
   });
   describe('set() and get()', function(){
      it('should return 0 when set a value smaller than 0.000000000000001 at an index', function(){
         var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
         vector1.set(1, 0.000000000000002);
         vector1.set(5, 0.0000000000000001);
         expect(vector1.get(1)).to.equal(0.000000000000002);
         expect(vector1.get(5)).to.equal(0);
      });
   });
    
   describe('indexWithMinValue()', function(){
       it('should return the (index, value) of the entry which has the min value', function(){
          var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
          expect(vector1.indexWithMinValue().value).to.equal(0);
          expect(vector1.indexWithMinValue().index).to.equal(0);
       });
   });
    
    describe('dotProduct()', function(){
       it('should return a salar which is |v1||v2|cos(theta) for vector hat(v1) and hat(v2)', function(){
            var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7:4});
           var vector2 = new jsmatrix.Vector(10, {1: 2, 5: 1});
           expect(vector1.dotProduct(vector2)).to.equal(8);
       }); 
    });
    
    describe('scaleBy()', function(){
       it('should return a scaled vector of the original vector', function(){
           var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
           var vector2 = vector1.scaleBy(2);
            expect(vector2.get(0)).to.equal(0);
            expect(vector2.get(1)).to.equal(6);
            expect(vector2.get(2)).to.equal(0);
            expect(vector2.get(3)).to.equal(0);
            expect(vector2.get(4)).to.equal(0);
            expect(vector2.get(5)).to.equal(4);
            expect(vector2.get(7)).to.equal(8);
            expect(vector2.get(8)).to.equal(0);
            expect(vector2.get(9)).to.equal(0);
       }) ;
    });
    
    describe('projectAlong()', function(){
       it('should return a vector along the second vector which is the project of the first vector on the second vector', function(){
           var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
           var vector2 = new jsmatrix.Vector(10, {1: 2, 5: 2});
           var vector3 = vector1.projectAlong(vector2);
           var length1 = vector1.length();
           var length2 = vector2.length(); 
           var scalar = vector1.dotProduct(vector2) / (length2 * length2);
           expect(vector3.get(0)).to.equal(0);
            expect(Math.abs(vector3.get(1) - 2 * scalar)).to.below(0.00000000001);
            expect(vector3.get(2)).to.equal(0);
            expect(vector3.get(3)).to.equal(0);
            expect(vector3.get(4)).to.equal(0);
            expect(Math.abs(vector3.get(5) - 2 * scalar)).to.below(0.00000000001);
            expect(vector3.get(8)).to.equal(0);
            expect(vector3.get(9)).to.equal(0);
       }) 
    });
    
    describe('minus()', function() {
        it('should return a vector who is the difference between the first and second vector', function(){
            var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
            var vector2 = new jsmatrix.Vector(10, {1: 2, 5: 2});
            var vector3 = vector1.minus(vector2);
            expect(vector3.get(0)).to.equal(0);
            expect(vector3.get(1)).to.equal(1);
            expect(vector3.get(2)).to.equal(0);
            expect(vector3.get(3)).to.equal(0);
            expect(vector3.get(4)).to.equal(0);
            expect(vector3.get(5)).to.equal(0);
            expect(vector3.get(7)).to.equal(4);
            expect(vector3.get(8)).to.equal(0);
            expect(vector3.get(9)).to.equal(0);            
        });

    });
    
    describe('projectOrthogonal()', function(){
       it('should return a vector which is perpendicular to all other vectors', function(){
           var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
           var vector2 = new jsmatrix.Vector(10, {0: 1, 2: 2, 5: 2});
           var vector3 = vector1.projectOrthogonal([vector2]);
           expect(Math.abs(vector3.dotProduct(vector2))).to.below(0.00000000000001);
           var sigma = {};
           var vector4 = vector1.projectOrthogonal([vector2, vector3], sigma);
           expect(Math.abs(vector4.dotProduct(vector2))).to.below(0.0000000000001);
           expect(Math.abs(vector4.dotProduct(vector3))).to.below(0.0000000000001);
       });
    });
    
    describe('orthogonalize()', function() {
       it('should return a set of orthogonal vectors for which the first vector is the same as the input', function() {
           var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7: 4});
           var vector2 = new jsmatrix.Vector(10, {0: 1, 2: 2, 5: 2});
           var vector3 = new jsmatrix.Vector(10, {0: 2, 5: 1, 6: 2});
           var result = jsmatrix.orthogonalize([vector1, vector2, vector3]);
           expect(result.length).to.equal(3);
           expect(result[0].isEqualTo(vector1)).to.equal(true);
           for(var i=0; i < result.length; ++i){
               for(var j=0; j < result.length; ++j) {
                   if(i == j) continue;
                   expect(result[i].dotProduct(result[j])).to.below(0.0000000000001);
               }
           }
       });
    });
    
    describe('norm()', function(){
       it('should return norm of various levels', function(){
           var vector1 = new jsmatrix.Vector(10, {1: 3, 5: 2, 7:4});
           expect(vector1.norm(2)).to.equal(vector1.length());
           expect(vector1.norm(1)).to.equal(9);
           console.log(vector1.norm(3));
       }) ;
    });
});