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
      var lastColumnsCost = costMatrix.slice();

      for (var row = 0; row < originalMatrix.length; row++) {
        costMatrix[row] = calculateNextStep(originalMatrix, column, row, lastColumnsCost);        
      }
    }

    return calculateResultFromCost(costMatrix);
  }

  function calculateNextStep(originalMatrix, column, row, costMatrix) {
    var moveAcross = {
      cost: costMatrix[row].cost + originalMatrix[row][column - 1],
      path: addStep(costMatrix[row].path, row)
    };

    var moveDown = {
      cost: costMatrix[goDown(row)].cost + originalMatrix[row][column - 1],
      path: addStep(costMatrix[row].path, goDown(row))
    };

    if (moveDown.cost < moveAcross.cost) {
      return moveDown;
    } else {
      return moveAcross;
    }
  }

  function goDown(row) {
    return row - 1 < 0 ? 0 : row - 1;
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
