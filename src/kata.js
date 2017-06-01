var kata = (function() {
  var directions = { across: goAcross, up: goUp, down: goDown };

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
    var movementState = {
      previousCosts: previousCosts,
      nextStepCost: originalMatrix[row][column],
      row: row
    };

    return getBestCost([
      moveDirection('across', movementState),
      moveDirection('down', movementState),
      moveDirection('up', movementState)
    ]);
  }

  function moveDirection(direction, movementState) {
    var previousIndex = directions[direction](movementState.row, movementState.previousCosts.length);
    var possiblePreviousCell = movementState.previousCosts[previousIndex];

    return {
      cost: possiblePreviousCell.cost + movementState.nextStepCost,
      path: addStep(possiblePreviousCell.path, movementState.row)
    };
  }

  function goAcross(row, numberOfRows) {
    return row;
  }

  function goUp(row, numberOfRows) {
    return row - 1 < 0 ? numberOfRows - 1 : row - 1;
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
    var minCost = getBestCost(costs);

    return {
      finishedMatrix: true,
      totalCost: minCost.cost,
      shortestPath: minCost.path
    };
  }

  function getBestCost(costs) {
    return _.min(costs, function (cost) { return cost.cost; });
  }

  return {
    solveMatrix: solveMatrix
  };
})();
