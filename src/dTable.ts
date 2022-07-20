import ITableData from './ITableData'
import TableRenderer, { TableRendererType } from './Table'

export default class DTable {
    
    private _tableData:ITableData;
    private _tableRenderer:TableRendererType;

    constructor(selector: string) {

        this._tableRenderer = new TableRenderer(selector)
    }

    get data() {

        return this._tableData
    }

    set data(value:ITableData) {

        this._tableData = value;
        this._tableRenderer.render(this._tableData)
    }

    set rows(value) {

        this._tableData.body = value;
        this._tableRenderer.render(this._tableData)
    }
}