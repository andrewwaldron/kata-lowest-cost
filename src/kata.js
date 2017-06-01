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
    return calculateResultFromCost(finalCosts, getNumberColumns(matrix));
  }

  function getCostsOfEachColumnSequentially(firstColumnCost, matrix) {
    var costMatrix = firstColumnCost;

    for (var column = 1; column < getNumberColumns(matrix) && !allAreUnsolved(costMatrix); column++) {
      costMatrix = getColumnCost(matrix, column, costMatrix);
    }

    return costMatrix;
  }

  function getNumberColumns(matrix) {
    return matrix[0].length;
  }

  function getColumnCost(matrix, column, previousColumnCost) {
    return _.map(matrix, function(el, row) {
      return calculateNextStep(matrix, column, row, previousColumnCost);
    });
  }

  function allAreUnsolved(costs) {
    return _.all(costs, function(cost) { return cost.cost === unsolveable; });
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
      column: column,
      row: row
    };

    return carryPreviousForwardIfAboveMaximum(getBestCostForLongestPath([
      moveDirection('across', movementState),
      moveDirection('down', movementState),
      moveDirection('up', movementState)
    ]));
  }

  function carryPreviousForwardIfAboveMaximum(cost) {
    return cost.cost > maximumSolveCriteria ? cost.previous : cost;
  }

  function moveDirection(direction, movementState) {
    var previousIndex = directions[direction](movementState.row, movementState.previousCosts.length);
    var possiblePreviousCell = movementState.previousCosts[previousIndex];

    if (representsMaximizedPath(possiblePreviousCell, movementState)) {
       return {
        cost: maximumSolveCriteria + 1,
        path: [],
        previous: possiblePreviousCell
      };
    }

    return {
      cost: possiblePreviousCell.cost + movementState.nextStepCost,
      path: addStep(possiblePreviousCell.path, movementState.row),
      previous: possiblePreviousCell
    };
  }

  function representsMaximizedPath(cost, movementState) {
    return cost.path.length !== movementState.column;
  }

  function addStep(path, row) {
    var newPath = path.slice();
    newPath.push(row);
    return newPath;
  }

  function calculateResultFromCost(costs, columnCount) {
    var minCost = getBestCostForLongestPath(costs);

    return {
      finishedMatrix: minCost.path.length === columnCount,
      totalCost: minCost.cost,
      shortestPath: makeIndexesOneBased(minCost.path)
    };
  }

  function makeIndexesOneBased(path) {
    return _.map(path, function (row) { return row + 1; });
  }

  function getBestCostForLongestPath(costs) {
    var longestPath = _.max(_.map(costs, function(cost) { return cost.path.length; }));
    return _.min(costs, function (cost) { return cost.path.length !== longestPath ? maximumSolveCriteria + 1 : cost.cost; });
  }

  return {
    solveMatrix: solveMatrix
  };
})();
