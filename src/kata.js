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

  function calculateNextStep(originalMatrix, column, row, previousCosts) {
    var nextStepCost = originalMatrix[row][column];

    var fromAcross = moveAcross(previousCosts, nextStepCost, row);
    var fromDown = moveDown(previousCosts, nextStepCost, row);

    if (fromDown.cost < fromAcross.cost) {
      return fromDown;
    } else {
      return fromAcross;
    }
  }

  function moveDown(previousCosts, nextStepCost, currentCellRow) {
    var downRowIndex = goDown(currentCellRow, previousCosts.length);
    var cellDownAndLeft = previousCosts[downRowIndex];

    return {
      cost: cellDownAndLeft.cost + nextStepCost,
      path: addStep(cellDownAndLeft.path, currentCellRow)
    };
  }

  function moveAcross(previousCosts, nextStepCost, currentCellRow) {
    var cellDirectlyLeft = previousCosts[currentCellRow];
    return {
      cost: cellDirectlyLeft.cost + nextStepCost,
      path: addStep(cellDirectlyLeft.path, currentCellRow)
    };
  }

  function goDown(row, numberOfRows) {
    return row + 1 >= numberOfRows ? 0 : row + 1;
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
