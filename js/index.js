table = document.getElementById("node-graph")

for(let i =0; i<10; i++){
    table_row = document.createElement("tr")
    table.appendChild(table_row)
    for(let j=0; j<10; j++){
        table_column = document.createElement("td")
        table_row.appendChild(table_column)
    }
}