import IHeader from './IHeader';
import ITableData from './ITableData'
import {Table} from './Table'


export const dTable = {

    _app: null as unknown as HTMLTableElement,
    _data : {} as ITableData,

    init(app: HTMLTableElement){
        this._app = app;
    },

    get data(){

        return this._data;
    },

    set data(value:ITableData) {

        this._data = value
        Table.render(this._data, this._app);
    },

    set body(value){
        
        this._data.Body = value;
        Table.render(this._data, this._app);
    },
}