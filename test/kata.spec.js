describe('lowest.cost.kata', function() {
  var subject;

  beforeEach(function() {
    subject = kata;
  });

  it('will let us know whether or not it finishes the matrix', function() {
    var result = subject.solveMatrix([[1]]);
    expect(result.finishedMatrix).toEqual(true);
  });

  it('returns the total cost', function() {
    var result = subject.solveMatrix([[1]]);
    expect(result.totalCost).toEqual(1);
  });

  it('also returns an array with the path it took', function() {
    var result = subject.solveMatrix([[1]]);
    expect(result.shortestPath).toEqual([1]);
  });
});