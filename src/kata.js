var kata = (function() {
  function solveMatrix(originalMatrix) {
    var costMatrix = [];

    var column = 0;

    for (var row = 0; row < originalMatrix.length; row++) {
      costMatrix.push({
        cost: originalMatrix[row][column],
        path: [row]
      });
    }

    return calculateResultFromCost(costMatrix);
  }

  function calculateResultFromCost(costs) {
    var minCost = _.min(costs, function (cost) { return cost.cost; });
    return {
      finishedMatrix: true,
      totalCost: minCost.cost,
      shortestPath: minCost.path
    };
  }

  return {
    solveMatrix: solveMatrix
  };
})();
