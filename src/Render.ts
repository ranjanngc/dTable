import IHeader from './IHeader'

export const Header = {

    render: (headers: Array<IHeader>)=>{

        if (headers) {

            let hdr = "<thead data-id='table_header'><tr>";
            headers.forEach((header, index) => {

                header.index = index
                hdr += `<th data-index="${index}">${header.title} ${header.sortable? `<span style="cursor:pointer">${header.sortOrder=== 'ASC'?'▲':'▼'}</span>`: ''}</th>`; //▼
                
            });

            hdr += "</tr></thead>";
      
            return hdr;
        }
    },
}

export const Body = {

    render: function(data: Array<any>){

        if (data) {
            let hdr = "<tbody>";
            data.forEach((rows, rowIndex) => {
                hdr += "<tr>";
                rows.forEach((item, colIndex) => {
                    if(this.edit_row === rowIndex && this.edit_col == colIndex){
                        hdr += `<td><input type="text" style="width:100%" autofocus  value="${item}" onchange="rk_table.updateData(this.value, ${rowIndex}, ${colIndex})"></td>`;
                        this.edit_row = null;
                        this.edit_col = null;
                    }
                    else{
                        //hdr += `<td>${item} <span style="cursor:pointer;" onclick="rk_table.setEdit(${rowIndex}, ${colIndex})" >🖉</span></td>`;
                        hdr += `<td>${item}</td>`;
                    }
                        
                });
                hdr += `</tr>`;
            });
            hdr += "</tbody>";
      
            return hdr;
          }
    }
}