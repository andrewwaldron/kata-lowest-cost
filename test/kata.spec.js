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

  it('can move down the matrix with wrapping', function() {
    var testMatrix = [
      [1, 2],
      [2, 1]
    ];

    expectPath(solve(testMatrix), [0, 1]);
  });

  it('can move down the matrix', function() {
    var testMatrix = [
      [1, 2, 2],
      [2, 1, 2],
      [2, 2, 1],
      [1, 2, 2]
    ];

    expectPath(solve(testMatrix), [0, 1, 2]);
  });

  it('can find a really complicated path', function() {
    var testMatrix = [
      [12, 2, 23, 20],
      [2, 10, 2, 11],
      [2, 3, 34, 10],
      [1, 5, 10, 1]
    ];

    expectPath(solve(testMatrix), [3, 0, 3, 3]);
  });

  it('does ok with a non-square matrix', function() {
    var testMatrix = [
      [12, 2, 23, 20],
      [2, 10, 2, 11],
      [1, 5, 10, 1]
    ];

    expectPath(solve(testMatrix), [2, 0, 1, 2]);
  });

  it('will go ahead and let us know when it reaches 50', function() {
    var testMatrix = getUnsolveableMatrix();
    expectSolved(solve(testMatrix), false);
  });

  it('will give an empty path for the unsolved', function() {
    var testMatrix = getUnsolveableMatrix();
    expectPath(solve(testMatrix), []);
  });

  it('will also set the total cost to 0 for something unsolveable', function() {
    var testMatrix = getUnsolveableMatrix();
    expectCost(solve(testMatrix), 0);
  });

  function getUnsolveableMatrix() {
    return [
      [10, 10, 40, 1],
      [10, 10, 40, 1],
      [10, 10, 40, 1],
      [10, 10, 40, 1]
    ];
  }

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