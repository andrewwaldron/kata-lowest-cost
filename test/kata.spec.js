describe('lowest.cost.kata', function() {
  var subject;

  beforeEach(function() {
    subject = kata;
  });

  it('will let us know whether or not it finishes the matrix', function() {
    var testMatrix = [[1]];
    expectSolved(solve(testMatrix), true);
  });

  it('returns the total cost', function() {
    var testMatrix = [[1]];
    expectCost(solve(testMatrix), 1);
  });

  it('also returns an array with the path it took', function() {
    var testMatrix = [[1]];
    expectPath(solve(testMatrix), [0]);
  });

  it('can handle a matrix with more than one row', function() {
    var testMatrix = [[2], [1]];
    expectPath(solve(testMatrix), [1]);
  });

  it('can step across the matrix in a straight line', function() {
    var testMatrix = [
      [2, 2],
      [1, 1]
    ];

    expectPath(solve(testMatrix), [1, 1]);
  });

  it('can move down the matrix', function() {
    var testMatrix = [
      [1, 2],
      [2, 1]
    ];

    expectPath(solve(testMatrix), [0, 1]);
  });
  
  function expectSolved(result, expected) {
    expect(result.finishedMatrix).toEqual(expected);
  }

  function expectPath(result, expected) {
    expect(result.shortestPath).toEqual(expected);
  }

  function expectCost(result, expected) {
    expect(result.totalCost).toEqual(expected);
  }

  function solve(matrix) {
    return subject.solveMatrix(matrix);
  }
});