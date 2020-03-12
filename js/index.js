table = document.getElementById("node-table")

for(let i =0; i<15; i++){
    table_row = document.createElement("tr")
    table.appendChild(table_row)
    for(let j=0; j<20; j++){
        table_column = document.createElement("td")
        table_row.appendChild(table_column)
    }
}