import ITableData from './ITableData'
import TableRenderer, { TableRendererType } from './Table'

const _proxyData = {
    tableData: {} as ITableData,
    tableRenderer: {} as TableRendererType,
    rows: []
}

const _proxyHandler = {
    set(target, prop, value){

        if( prop !== 'rows'){
            Reflect.set(target, prop, value)
        }

        if(prop === 'tableData' || prop === 'rows'){
            target.tableRenderer.render(target.tableData);
        }

        return true;
    }
}
export default class DTable {
    
    //private _tableData:ITableData;
    //private _tableRenderer:TableRendererType;
    private data; 

    constructor(selector: string) {
        this.data = new Proxy(_proxyData, _proxyHandler);
        // this._tableRenderer = new TableRenderer(selector)
        this.data.tableRenderer = new TableRenderer(selector);
    }

    // get data() {

    //     return this._tableData
    // }

    // set data(value:ITableData) {

    //     this._tableData = value;
    //     this._tableRenderer.render(this._tableData)
    // }

    // set rows(value) {

    //     this._tableData.body = value;
    //     this._tableRenderer.render(this._tableData)
    // }
}