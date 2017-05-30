var kata = (function() {
  function solveMatrix(originalMatrix) {
    var costMatrix = [];

    for (var row = 0; row < originalMatrix.length; row++) {
      costMatrix.push({
        cost: originalMatrix[row][0],
        path: [row]
      });
    }

    for (var column = 1; column < originalMatrix[0].length; column++) {
      for (var row = 0; row < originalMatrix.length; row++) {
        costMatrix = calculateNextStep(originalMatrix, column, row, costMatrix);        
      }
    }

    return calculateResultFromCost(costMatrix);
  }

  function calculateNextStep(originalMatrix, column, row, costMatrix) {
    var moveAcross = {
      cost: costMatrix[row].cost + originalMatrix[row][column - 1],
      path: addStep(costMatrix[row].path, row)
    };


    var costClone = costMatrix.slice();
    costClone.splice(row, 1, moveAcross);
    return costClone;
  }

  function addStep(path, row) {
    var newPath = path.slice();
    newPath.push(row);
    return newPath;
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
