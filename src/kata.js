var kata = (function() {
  var maximumSolveCriteria = 50;
  var unsolveable = -1;
  var directions = {
    across: function(row, max) { return row; },
    up: function(row, max) { return row - 1 < 0 ? max - 1 : row - 1; },
    down: function(row, max) { return row + 1 >= max ? 0 : row + 1; }
  };

  function solveMatrix(matrix) {
    var firstColumnCost = getCostsOfFirstColumn(matrix);
    var finalCosts = getCostsOfEachColumnSequentially(firstColumnCost, matrix);
    return calculateResultFromCost(finalCosts);
  }

  function getCostsOfEachColumnSequentially(firstColumnCost, matrix) {
    var costMatrix = firstColumnCost;
    
    for (var column = 1; column < matrix[0].length && !allAreUnsolved(costMatrix); column++) {
      costMatrix = getColumnCost(matrix, column, costMatrix);
    }

    return costMatrix;
  }

  function getColumnCost(matrix, column, previousColumnCost) {
    return _.map(matrix, function(el, row) {
      return calculateNextStep(matrix, column, row, previousColumnCost);
    });
  }

  function allAreUnsolved(costs) {
    return _.all(costs, function(cost) { return cost.cost === unsolveable; });
  }

  function killPathIfAboveMaximum(cost) {
    return cost.cost > maximumSolveCriteria ? _.extend(cost, {cost: unsolveable}) : cost;
  }

  function getCostsOfFirstColumn(matrix) {
    return _.map(matrix, function (matrixRow, row) { return asCost(matrixRow[0], row); });
  }

  function asCost(cost, row) {
    return { cost: cost, path: [row] };
  }

  function calculateNextStep(originalMatrix, column, row, previousCosts) {
    var movementState = {
      previousCosts: previousCosts,
      nextStepCost: originalMatrix[row][column],
      row: row
    };

    return killPathIfAboveMaximum(getBestCost([
      moveDirection('across', movementState),
      moveDirection('down', movementState),
      moveDirection('up', movementState)
    ]));
  }

  function moveDirection(direction, movementState) {
    var previousIndex = directions[direction](movementState.row, movementState.previousCosts.length);
    var possiblePreviousCell = movementState.previousCosts[previousIndex];

    return {
      cost: possiblePreviousCell.cost + movementState.nextStepCost,
      path: addStep(possiblePreviousCell.path, movementState.row)
    };
  }

  function addStep(path, row) {
    var newPath = path.slice();
    newPath.push(row);
    return newPath;
  }

  function calculateResultFromCost(costs) {
    var minCost = getBestCost(costs);
    var completed = minCost.cost !== unsolveable;

    return {
      finishedMatrix: completed,
      totalCost: completed ? minCost.cost : 0,
      shortestPath: completed ? minCost.path : []
    };
  }

  function getBestCost(costs) {
    return _.min(costs, function (cost) { return cost.cost === unsolveable ? maximumSolveCriteria + 1 : cost.cost; });
  }

  return {
    solveMatrix: solveMatrix
  };
})();
