import {Header, Body} from './Render'
import ITableData from './ITableData'
import { SortUtil } from './Sort'
import { SearchUtil } from './SearchUtil'

export interface TableRendererType{

    render(tableData: ITableData):void
}

export default class TableRenderer implements TableRendererType {

    _tableData: ITableData;
    _element: HTMLTableElement;

    constructor(selector:string){
        
        this._element = document.querySelector(selector)
    }

    render = (tableData: ITableData) => {

        this._tableData =    tableData;

        const html = `<div class="${tableData.containerClass}"><table data-role="dtable" width="100%">
                        ${Header.render(tableData.header)} 
                        ${Body.render(tableData.body, tableData.header)}
        </table></div>`;

        this._element.innerHTML = html;

        let hdr = this._element.querySelector("thead");
        hdr.addEventListener('click', this._clickHandler)
        hdr.addEventListener('input', this._inputHandler)
        hdr.addEventListener('keyup', this._keyupHandler)

        hdr.closest('table').style.tableLayout = 'fixed'
    }

    _clickHandler = (ev) => {

        const [hdrElement, role, hdrIndex] = this._getMeta(ev.target)

        if(hdrElement?.tagName !== "TH"){return}

        switch(role){

            case "sort":
                SortUtil.sort(this,  hdrIndex as number);
                break;

            case "search":
                SearchUtil.showInput(hdrElement)
                break;

            default:
                break;
        }
    }
    _inputHandler = (ev:Event) => {

        const [hdrElement, _, hdrIndex] = this._getMeta(ev.target as HTMLElement)
        SearchUtil.search(this, hdrElement, hdrIndex)
    }
    _keyupHandler = (ev) => {

        if(ev.key === "Escape") {

            const [hdrElement] = this._getMeta(ev.target)
            SearchUtil.hideInput(this, hdrElement)
        }
    }
    _getMeta = (target: HTMLElement): [header: HTMLElement, role:string, index:number] => {

        const role = (target as HTMLSpanElement).getAttribute("data-role")
        const hdrElement = (target as HTMLSpanElement).closest('th')
        
        const hdrIndex = parseInt(hdrElement.getAttribute('data-index') ?? '-1')

        return [hdrElement, role, hdrIndex]
    }
}