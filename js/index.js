// Update later to create table size based on window size
const NUM_OF_ROWS = 5,
  NUM_OF_COLUMNS = 5,
  table = document.getElementById("nodes-graph");

let START_NODE_ROW, START_NODE_COL, END_NODE_ROW, END_NODE_COL;

let grid = [],
  wall_nodes = [],
  isDrawingWalls = false;

// Dynamically create a table
for (let i = 0; i < NUM_OF_ROWS; i++) {
  table_row = document.createElement("tr");
  table_row.id = `${i}`;
  let currentRow = [];
  table.appendChild(table_row);
  for (let j = 0; j < NUM_OF_COLUMNS; j++) {
    table_column = document.createElement("td");
    table_column.id = `${i}-${j}`;
    table_row.appendChild(table_column);
    currentRow.push(add_base_node(i, j));
  }
  grid.push(currentRow);
}

// Add event-listeners to identify which cell is being clicked
table.childNodes.forEach(row => {
  row.childNodes.forEach(cell => {
    cell.addEventListener("click", () => {
      row = cell.id.split("-")[0];
      col = cell.id.split("-")[1];
      if (cell.classList.length !== 0) {
        deselect_cell(cell, row, col);
      } else {
        select_and_add_cell(cell, row, col);
      }
    });
  });
});

document.addEventListener("mouseup", () => {
  isDrawingWalls = false;
});

document.addEventListener("mousedown", () => {
  isDrawingWalls = true;
  drag_and_draw_walls();
});

// Add a cell to the nodes object and add the appropiate class to it
function select_and_add_cell(cell, row, col) {
  if (START_NODE_ROW === undefined && START_NODE_COL === undefined) {
    START_NODE_ROW = row;
    START_NODE_COL = col;
    cell.classList.add("is-start-node");
    update_node(row, col, true, false, false);
  } else if (END_NODE_ROW === undefined && END_NODE_COL === undefined) {
    END_NODE_ROW = row;
    END_NODE_COL = col;
    cell.classList.add("is-end-node");
    update_node(row, col, false, true, false);
  } else {
    cell.classList.add("is-wall-node");
    update_node(row, col, false, false, true);
  }
}

/**
 * Remove a cell from the nodes object and set the className to empty
 * @param {HTMLElement} cell The cell to deselct
 * @param {int} row The row number
 * @param {int} col The column number
 */
function deselect_cell(cell, row, col) {
  if (cell.id === `${START_NODE_ROW}-${START_NODE_COL}`) {
    START_NODE_ROW = undefined;
    START_NODE_COL = undefined;
  } else {
    END_NODE_ROW = undefined;
    END_NODE_COL = undefined;
  }

  update_node(row, col, false, false, false);
  cell.className = "";
}

function drag_and_draw_walls() {
  table.childNodes.forEach(row => {
    row.childNodes.forEach(cell => {
      cell.addEventListener("mouseenter", () => {
        /**
         * Draw walls only when:
         * 1. Mousedown is firing (isdrawingWalls is true)
         * 2. start-node has been defined
         * 3. end-node has been defined
         * 4. wall to be drawn is NOT the start-node
         * 5. wall to be drawn is NOT the end-node
         */
        if (
          isDrawingWalls &&
          START_NODE_ROW !== undefined &&
          START_NODE_COL !== undefined &&
          END_NODE_ROW !== undefined &&
          END_NODE_COL !== undefined &&
          cell.id !== `${START_NODE_ROW}-${START_NODE_COL}` &&
          cell.id !== `${END_NODE_ROW}-${END_NODE_COL}`
        ) {
          cell.classList.add("is-wall-node");
          row = cell.id.split("-")[0];
          col = cell.id.split("-")[1];
          update_node(row, col, false, false, true);
        }
      });
    });
  });
}

/**
 *
 * @param {int} row The row number
 * @param {int} col The column number
 */
function add_base_node(row, col) {
  return {
    row: row,
    col: col,
    "is-start-node": row === START_NODE_ROW && col === START_NODE_COL,
    "is-end-node": row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    "is-visited": false,
    "is-wall": false,
    "previous-node": null
  };
}

/**
 *
 * @param {int} row The row number
 * @param {int} col The column number
 * @param {boolean} isStartNode Identify if it is the start node
 * @param {boolean} isEndNode Identify if it is the end node
 * @param {boolean} isWall Identify if it is the wall node
 */
function update_node(row, col, isStartNode, isEndNode, isWall) {
  node = grid[row][col];
  newNode = {
    ...node,
    "is-start-node": isStartNode,
    "is-end-node": isEndNode,
    "is-wall": isWall
  };

  grid[row][col] = newNode;
}
