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

  function calculateNextStep(originalMatrix, column, row, costOfPreviousColumn) {
    var costOfTheNextCell = originalMatrix[row][column];

    var cellDirectlyLeft = costOfPreviousColumn[row];
    var moveAcross = {
      cost: cellDirectlyLeft.cost + costOfTheNextCell,
      path: addStep(cellDirectlyLeft.path, row)
    };

    var downRowIndex = goDown(row, originalMatrix.length);
    var cellDownAndLeft = costOfPreviousColumn[downRowIndex];
    var moveDown = {
      cost: cellDownAndLeft.cost + costOfTheNextCell,
      path: addStep(cellDownAndLeft.path, row)
    };

    if (moveDown.cost < moveAcross.cost) {
      return moveDown;
    } else {
      return moveAcross;
    }
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
