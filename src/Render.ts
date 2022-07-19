import IHeader from './IHeader'

export const Header = {

    render: (headers: Array<IHeader>)=>{

        if (headers) {

            let hdr = "<thead data-id='table_header' ><tr>";
            headers.forEach((header, index) => {

                header.index = index
                let filterElement = header.filterable ? '<span data-role="search"> </span><input data-role="d-search" type="text" autofocus style="display:none">':'';
                hdr += `<th data-index="${index}" title="${header.title}">${filterElement}<span>${header.title}</span> ${header.sortable? `<span data-role="sort">${header.sortOrder=== 'ASC'?'▲':'▼'}</span>`: ''}</th>`; //▼
                
            });

            hdr += "</tr></thead>";
      
            return hdr;
        }
    },
}

export const Body = {

    render: function(data: Array<any>, header: Array<any>){

        if (data) {
            let hdr = "<tbody>";
            data.forEach((rows, rowIndex) => {
                hdr += "<tr style='content-visibility:auto'>";
                rows.forEach((item, colIndex) => {
                    if(this.edit_row === rowIndex && this.edit_col == colIndex){
                       
                        hdr += `<td><input type="text" style="width:100%" autofocus  value="${item}" onchange="rk_table.updateData(this.value, ${rowIndex}, ${colIndex})"></td>`;
                        this.edit_row = null;
                        this.edit_col = null;
                    }
                    else{

                        const template = header[colIndex].template ? Body.resolveTemplate(header[colIndex].template, rows):  item
                        //hdr += `<td>${item} <span style="cursor:pointer;" onclick="rk_table.setEdit(${rowIndex}, ${colIndex})" >🖉</span></td>`;
                        hdr += `<td>${template}</td>`;
                    }
                        
                });
                hdr += `</tr>`;
            });
            hdr += "</tbody>";
      
            return hdr;
          }
    },
    resolveTemplate: (template:string, items: Array<any>) => {
        let templateHtml = '';
        
        items.forEach((val, index) => {
            const reg = new RegExp(`\\{${index}\\}`, 'g')
            template = template.replace(reg, items[index], );
        })
        
        return template;
    }
}