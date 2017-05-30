describe('lowest.cost.kata', function() {
  var subject;

  beforeEach(function() {
    subject = kata;
  });

  it('can make it through a 1x1 matrix', function() {
    var result = subject.solveMatrix([[1]]);
    expect(result.finishedMatrix).toEqual(true);
  });
});