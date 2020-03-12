// Update later to create table size based on window size
const NUM_OF_ROWS = 15,
  NUM_OF_COLUMNS = 20;

// Object to stort ids of start node, end node, walls etc.
let nodes = {
  "start-node": [],
  "end-node": [],
  "wall-nodes": []
};

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
        deselect_cell(cell.id);
        cell.className = "";
      } else {
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
    });
  });
});

function deselect_cell(id) {
  const nodeTypes = Object.keys(nodes);
  nodeTypes.forEach(nodeType => {
    if (nodes[nodeType].includes(id)) {
      i = nodes[nodeType].indexOf(id);
      nodes[nodeType].splice(i, 1);
      return true;
    }
  });

  return false;
}
