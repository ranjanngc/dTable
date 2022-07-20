import IHeader from './IHeader'

export default interface ITableData {
    
    header : Array<IHeader>,
    body: Array<any>,
    containerClass?: string
}