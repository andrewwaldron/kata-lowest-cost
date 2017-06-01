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
    expectPath(solve(testMatrix), [1]);
  });

  it('can handle a matrix with more than one row', function() {
    var testMatrix = [[2], [1]];
    expectPath(solve(testMatrix), [2]);
  });

  it('can step across the matrix in a straight line', function() {
    var testMatrix = [
      [2, 2],
      [1, 1]
    ];

    expectPath(solve(testMatrix), [2, 2]);
  });

  it('can move down the matrix with wrapping', function() {
    var testMatrix = [
      [1, 2],
      [2, 1]
    ];

    expectPath(solve(testMatrix), [1, 2]);
  });

  it('can move down the matrix', function() {
    var testMatrix = [
      [1, 2, 2],
      [2, 1, 2],
      [2, 2, 1],
      [1, 2, 2]
    ];

    expectPath(solve(testMatrix), [1, 2, 3]);
  });

  it('can find a really complicated path', function() {
    var testMatrix = [
      [12, 2, 23, 20],
      [2, 10, 2, 11],
      [2, 3, 34, 10],
      [1, 5, 10, 1]
    ];

    expectPath(solve(testMatrix), [4, 1, 4, 4]);
  });

  it('does ok with a non-square matrix', function() {
    var testMatrix = [
      [12, 2, 23, 20],
      [2, 10, 2, 11],
      [1, 5, 10, 1]
    ];

    expectPath(solve(testMatrix), [3, 1, 2, 3]);
  });

  it('will go ahead and let us know when it reaches 50', function() {
    var testMatrix = getUnsolveableMatrix();
    expectSolved(solve(testMatrix), false);
  });

  it('will give whatever best AND LONGEST path it could for the unsolved', function() {
    var testMatrix = getUnsolveableMatrix();
    expectPath(solve(testMatrix), [4, 1]);
  });

  it('will also set the total cost to 50 for something unsolveable', function() {
    var testMatrix = getUnsolveableMatrix();
    expectCost(solve(testMatrix), 50);
  });

  it('solves the first actual kata problem provided', function() {
    var testMatrix = getActualKataTestDataOne();

    expectCost(solve(testMatrix), 16);
    expectPath(solve(testMatrix), [1, 2, 3, 4, 4, 5]);
    expectSolved(solve(testMatrix), true);
  });

  it('solves the second actual kata problem provided', function() {
    var testMatrix = getActualKataTestDataTwo();

    expectCost(solve(testMatrix), 11);
    expectSolved(solve(testMatrix), true);

    // NOTE: this path is identical in value to the one provided. Not going to change
    //       a perfectly valid algorithm to match a test case that isn't necessarily the
    //       only best case. Therefore the test case has been altered
    expectPath(solve(testMatrix), [1, 2, 1, 5, 5, 5]);
  });

  it('solves the final actual kata problem provided', function() {
    var testMatrix = getActualKataTestDataThree();

    expectSolved(solve(testMatrix), false);
    expectCost(solve(testMatrix), 48);
    expectPath(solve(testMatrix), [1, 1, 1]);
  });

  function getActualKataTestDataOne() {
    return [
      [3, 4, 1, 2, 8, 6],
      [6, 1, 8, 2, 7, 4],
      [5, 9, 3, 9, 9, 5],
      [8, 4, 1, 3, 2, 6],
      [3, 7, 2, 8, 6, 4]
    ];
  }

  function getActualKataTestDataTwo() {
    return [
      [3, 4, 1, 2, 8, 6],
      [6, 1, 8, 2, 7, 4],
      [5, 9, 3, 9, 9, 5],
      [8, 4, 1, 3, 2, 6],
      [3, 7, 2, 1, 2, 3]
    ];
  }

  function getActualKataTestDataThree() {
    return [
      [19, 10, 19, 10, 19],
      [21, 23, 20, 19, 12],
      [20, 12, 20, 11, 10]
    ];
  }

  function getUnsolveableMatrix() {
    return [
      [11, 40, 1, 1],
      [11, 40, 1, 1],
      [11, 42, 1, 1],
      [10, 43, 1, 1]
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