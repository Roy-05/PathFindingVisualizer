// Update later to create table size based on window size
const NUM_OF_ROWS = 15,
  NUM_OF_COLUMNS = 20;

let START_NODE_ROW, START_NODE_COL, END_NODE_ROW, END_NODE_COL;

let grid = [],
  wall_nodes = [];

let isDrawingWalls = false;

const table = document.getElementById("nodes-graph");

// Dynamically create a table
for (let i = 0; i < 15; i++) {
  table_row = document.createElement("tr");
  table_row.id = `${i}`;
  table.appendChild(table_row);
  for (let j = 0; j < 20; j++) {
    table_column = document.createElement("td");
    table_column.id = `${i}-${j}`;
    table_row.appendChild(table_column);
  }
}

// Add event-listeners to identify which cell is being clicked
table.childNodes.forEach(row => {
  row.childNodes.forEach(cell => {
    cell.addEventListener("click", () => {
      if (cell.classList.length !== 0) {
        deselect_and_remove_cell(cell);
      } else {
        select_and_add_cell(cell);
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
function select_and_add_cell(cell) {
  if (START_NODE_ROW === undefined && START_NODE_COL === undefined) {
    START_NODE_ROW = cell.id.split("-")[0];
    START_NODE_COL = cell.id.split("-")[1];
    cell.classList.add("is-start-node");
  } else if (END_NODE_ROW === undefined && END_NODE_COL === undefined) {
    END_NODE_ROW = cell.id.split("-")[0];
    END_NODE_COL = cell.id.split("-")[1];
    cell.classList.add("is-end-node");
  } else {
    wall_nodes.push(cell.id);
    cell.classList.add("is-wall-node");
  }
}

// Remove a cell from the nodes object and set the className to empty
function deselect_and_remove_cell(cell) {
  if (wall_nodes.includes(cell.id)) {
    i = wall_nodes.indexOf(cell.id);
    wall_nodes.splice(i, 1);
    cell.className = "";
  } else if (cell.id === `${START_NODE_ROW}-${START_NODE_COL}`) {
    START_NODE_ROW = undefined;
    START_NODE_COL = undefined;
    cell.className = "";
  } else {
    END_NODE_ROW = undefined;
    END_NODE_COL = undefined;
    cell.className = "";
  }

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
          wall_nodes.push(cell.id);
          cell.classList.add("is-wall-node");
        }
      });
    });
  });
}

function create_nodes_graph() {
  for (let row = 0; row < NUM_OF_ROWS; row++) {
    let currentRow = [];
    for (let col = 0; col < NUM_OF_COLUMNS; col++) {
      currentRow.push(add_base_node(row, col));
    }
    grid.push(currentRow);
  }

  console.log(grid);
}

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
