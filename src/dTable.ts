import ITableData from './ITableData'
import TableRenderer, { TableRendererType } from './Table'

const _proxyData = {
    data: {} as ITableData,
    renderEngine: {} as TableRendererType,
    rows: [],
}

const _proxyHandler = {
    set(target, prop, value){

        if( prop !== 'rows'){
            Reflect.set(target, prop, value)
        }

        if(prop === 'data' || prop === 'rows'){
            target.renderEngine.render(target.data);
        }

        return true;
    }
}
export default class DTable {
    
    private props; 

    constructor(selector: string) {

        this.props = new Proxy(_proxyData, _proxyHandler);
        this.props.renderEngine = new TableRenderer(selector);
    }
}