import {Header, Body} from './Render'
import ITableData from './ITableData'

export const Table = {
    data: null as unknown as ITableData,
    element: null as unknown as HTMLTableElement,
    render: function(tableData: ITableData, table: HTMLTableElement) {
        
        Table.data = tableData;
        Table.element = table;

        const html = `<table border>
                        ${Header.render(tableData.Header)} 
                        ${Body.render(tableData.Body)}
        </table>`;

        table.innerHTML = html;

        
        let hdr = document.querySelector("thead[data-id='table_header']");
        hdr.addEventListener('click', Table.sort)
    },
    sort: (ev) =>{

        const hdrElement = (ev.target as HTMLSpanElement).parentElement;
        if(hdrElement.tagName !== "TH"){return}

        const hdrIndex = hdrElement.getAttribute('data-index');

        const header = Table.data.Header[hdrIndex];

        if(header.sortOrder == 'ASC'){
            Table.data.Body = Table.data.Body.sort((a, b) => a[hdrIndex] < b[hdrIndex] ? 1 : -1)
        }
        else {
            Table.data.Body = Table.data.Body.sort((a, b) => a[hdrIndex] > b[hdrIndex] ? 1 : -1)
        }
       
        header.sortOrder = (header.sortOrder === 'ASC' ? 'DESC' : 'ASC')
        Table.render(Table.data, Table.element);
    }
} 