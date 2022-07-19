import {Header, Body} from './Render'
import ITableData from './ITableData'
import { SortUtil } from './Sort'
import { SearchUtil } from './SearchUtil'

export const Table = {

    data:       null as unknown as ITableData,
    element:    null as unknown as HTMLTableElement,

    render: function(tableData: ITableData, table: HTMLTableElement) {
        
        Table.data =    tableData;
        Table.element = table;

        const html = `<div class="${tableData.containerClass}"><table border width="100%">
                        ${Header.render(tableData.Header)} 
                        ${Body.render(tableData.Body)}
        </table></div>`;

        table.innerHTML = html;

        
        let hdr = document.querySelector("thead[data-id='table_header']");
        hdr.addEventListener('click', Table.clickHandler)
        hdr.addEventListener('input', Table.inputHandler)
        hdr.addEventListener('keyup', Table.keyupHandler)

        hdr.closest('table').style.tableLayout = 'fixed'
    },
    getMeta:(target: HTMLElement): [header: HTMLElement, role:string, index:number] => {

        const role = (target as HTMLSpanElement).getAttribute("data-role")
        const hdrElement = (target as HTMLSpanElement).parentElement
        
        //if(hdrElement?.tagName !== "TH"){return}
        const hdrIndex = parseInt(hdrElement.getAttribute('data-index') ?? '-1')

        return [hdrElement, role, hdrIndex]
    },
    clickHandler: (ev) => {

        const [hdrElement, role, hdrIndex] = Table.getMeta(ev.target)

        if(hdrElement?.tagName !== "TH"){return}

        switch(role){

            case "sort":
                SortUtil.sort(Table,  hdrIndex as number);
                break;
            case "search":
                SearchUtil.showInput(hdrElement)
                break;
            default:
                break;
        }
    },
    inputHandler: (ev) => {

        const [hdrElement, _, hdrIndex] = Table.getMeta(ev.target)
        SearchUtil.search(Table, hdrElement, hdrIndex)
    },
    keyupHandler: (ev) => {

        if(ev.key === "Escape") {
            const [hdrElement] = Table.getMeta(ev.target)
            SearchUtil.hideInput(Table, hdrElement)
        }
    }
} 