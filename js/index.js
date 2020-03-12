// Update later to create table size based on window size
const NUM_OF_ROWS = 15,
  NUM_OF_COLUMNS = 20;

table = document.getElementById("node-table");

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
      console.log(cell.id);
    });
  });
});
