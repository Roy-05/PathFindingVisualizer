// Update later to create table size based on window size
const NUM_OF_ROWS = 15,
  NUM_OF_COLUMNS = 20;

// Object to stort ids of start node, end node, walls etc.
let nodes = {
  "start-node": [],
  "end-node": [],
  "wall-nodes": []
};

let isDrawingWalls = false;

const table = document.getElementById("node-table");

// Dynamically create a table
for (let i = 0; i < 15; i++) {
  table_row = document.createElement("tr");
  table_row.id = `row-${i}`;
  table.appendChild(table_row);
  for (let j = 0; j < 20; j++) {
    table_column = document.createElement("td");
    table_column.id = `row-${i}-col-${j}`;
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
  if (nodes["start-node"].length === 0) {
    nodes["start-node"].push(cell.id);
    cell.classList.add("is-start-node");
  } else if (nodes["end-node"].length === 0) {
    nodes["end-node"].push(cell.id);
    cell.classList.add("is-end-node");
  } else {
    nodes["wall-nodes"].push(cell.id);
    cell.classList.add("is-wall-node");
  }
}

// Remove a cell from the nodes object and set the className to empty
function deselect_and_remove_cell(cell) {
  const nodeTypes = Object.keys(nodes);
  nodeTypes.forEach(nodeType => {
    if (nodes[nodeType].includes(cell.id)) {
      i = nodes[nodeType].indexOf(cell.id);
      nodes[nodeType].splice(i, 1);
      cell.className = "";
    }
  });
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
          nodes["start-node"].length !== 0 &&
          nodes["end-node"].length !== 0 &&
          !nodes["start-node"].includes(cell.id) &&
          !nodes["end-node"].includes(cell.id)
        ) {
          nodes["wall-nodes"].push(cell.id);
          cell.classList.add("is-wall-node");
        }
      });
    });
  });
}
