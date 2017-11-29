var expect    = require("chai").expect;
var jsmatrix = require("../src/jsmatrix");

describe("Matrix", function() {
  describe("test zero", function() {
      it('should return true if value is smaller than 0.000000000000001', function(){
        expect(jsmatrix.isZero(0.000000000000002)).to.equal(false);
        expect(jsmatrix.isZero(0.0000000000000005)).to.equal(true);     
      });
  });
    
  describe("columnVectors()", function(){
      it('should return column vectors which are not zero only', function() {
        var m = new jsmatrix.Matrix(10, 10);
        m.set(0, 1, 10);
          m.set(3, 2, 5);
          m.set(1, 2, 1);
          var columnVectors = m.columnVectors();
          expect(columnVectors[1].get(0)).to.equal(10);
          expect(columnVectors[2].get(1)).to.equal(1);
          expect(columnVectors[2].get(3)).to.equal(5);
          expect(columnVectors[0]).to.equal(undefined);
          expect(columnVectors[3]).to.equal(undefined);
          expect(columnVectors[4]).to.equal(undefined);
          expect(columnVectors[5]).to.equal(undefined);
          expect(columnVectors[6]).to.equal(undefined);
          expect(columnVectors[7]).to.equal(undefined);
          expect(columnVectors[8]).to.equal(undefined);
          expect(columnVectors[9]).to.equal(undefined);
      });
  });
    
  describe("makeCopy()", function() {
     it('should return an exact copy of itself', function() {
         var m = new jsmatrix.Matrix(10, 10);
         m.set(0, 1, 10);
         m.set(3, 2, 5);
         m.set(1, 2, 1);
         var m2 = m.makeCopy();
         for(var rowIndex = 0; rowIndex < m.rowCount; ++rowIndex) {
             for(var columnIndex = 0; columnIndex < m.columnCount; ++columnIndex) {
                 expect(m.get(rowIndex, columnIndex)).to.equal(m2.get(rowIndex, columnIndex));
             }
         }
     }) ;
  });
    
  describe('transpose()', function() {
     it('should return the transpose of the original matrix', function() {
         var m = new jsmatrix.Matrix(10, 10);
         m.set(0, 1, 10);
         m.set(3, 2, 5);
         m.set(1, 2, 1);
         var m2 = m.transpose();
         for(var rowIndex = 0; rowIndex < m.rowCount; ++rowIndex) {
             for(var columnIndex = 0; columnIndex < m.columnCount; ++columnIndex) {
                 expect(m.get(rowIndex, columnIndex)).to.equal(m2.get(columnIndex, rowIndex));
             }
         }
     });
  });
    
  describe('multiply()', function() {
      it('should return the multiplication result of two matrices', function(){
          var m1 = new jsmatrix.Matrix(2, 2);
          m1.set(0, 0, 1);
          m1.set(0, 1, 1);
          m1.set(1, 0, 0);
          m1.set(1, 1, 1);
          var m2 = new jsmatrix.Matrix(2, 2);
          m2.set(0, 0, 0);
          m2.set(0, 1, -1);
          m2.set(1, 0, 1);
          m2.set(1, 1, 0);

          var m3 = new jsmatrix.Matrix(2, 2);
          m3.set(0, 0, 1);
          m3.set(0, 1, -1);
          m3.set(1, 0, 1);
          m3.set(1, 1, 0);

          var m4 = m1.multiply(m2);

          for(var rowIndex =0; rowIndex < 2; ++rowIndex) {
              for(var columnIndex = 0; columnIndex < 2; ++columnIndex) {
                expect(m3.get(rowIndex, columnIndex)).to.equal(m4.get(rowIndex, columnIndex));        
              }
          }
      });
     
      
  });
    
  describe('multiplyVector()', function() {
     it('should return a vector with rowCount as its length', function(){
         var m1 = new jsmatrix.Matrix(2, 2);
         m1.set(0, 0, 1);
         m1.set(0, 1, 1);
         m1.set(1, 0, 0);
         m1.set(1, 1, 1);
         var v1 = new jsmatrix.Vector(2);
         v1.set(1, 1);
         var v2 = m1.multiplyVector(v1);
         expect(v2.get(0)).to.equal(1);
         expect(v2.get(1)).to.equal(1);
     }) ;
  });
    
  describe('isSymmetric()', function() {
     it('should return true if the matrix is symmetric', function() {
         var m1 = new jsmatrix.Matrix(2, 2);
         m1.set(1, 1, 1);
         expect(m1.isSymmetric()).to.equal(true);
     }) ;
  });


});