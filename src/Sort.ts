import ITableData from './ITableData'

export const SortUtil = {

    sort: (TableUtil, hdrIndex: number ) => {

        const header = TableUtil._tableData.header[hdrIndex];

        if(header.sortOrder =='ASC'){
            TableUtil._tableData.body = TableUtil._tableData.body.sort((a, b) => a[hdrIndex] < b[hdrIndex] ? 1 : -1)
        }
        else {
            TableUtil._tableData.body = TableUtil._tableData.body.sort((a, b) => a[hdrIndex] > b[hdrIndex] ? 1 : -1)
        }
       
        header.sortOrder = (header.sortOrder === 'ASC' ? 'DESC' : 'ASC')
        TableUtil.render(TableUtil._tableData);
    }
}