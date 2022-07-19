import ITableData from './ITableData'

export const SortUtil = {

    sort: (TableUtil, hdrIndex: number ) => {

        const header = TableUtil.data.Header[hdrIndex];

        if(header.sortOrder == 'ASC'){
            TableUtil.data.Body = TableUtil.data.Body.sort((a, b) => a[hdrIndex] < b[hdrIndex] ? 1 : -1)
        }
        else {
            TableUtil.data.Body = TableUtil.data.Body.sort((a, b) => a[hdrIndex] > b[hdrIndex] ? 1 : -1)
        }
       
        header.sortOrder = (header.sortOrder === 'ASC' ? 'DESC' : 'ASC')
        TableUtil.render(TableUtil.data, TableUtil.element);
    }
}