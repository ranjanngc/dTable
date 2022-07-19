export const SearchUtil = {

    showInput: (header: HTMLElement) =>{

        header.querySelectorAll('span').forEach((span) => {
            span.style.display = 'none';
        })

        const searchInput = header.querySelector('input');
        
        searchInput.style.width = "100%"
        searchInput.style.height = "100%"
        searchInput.style.margin= '0px'
        searchInput.style.border = '0.13em solid transparent'

        searchInput.style.outlineColor = 'transparent'
        searchInput.placeholder = (header.getAttribute('title') ?? '') + ' ..press ESC to cancel';
        searchInput.style.display = 'block'
        searchInput.focus()
    },
    hideInput: (table,header: HTMLElement) =>{
        header.querySelectorAll('span').forEach((span) => {
            span.style.display = '';
        })
        const searchInput = header.querySelector('input')
        searchInput.style.display='none';
        searchInput.value =''
        const tableElement = header.closest('table')
       
        table.data.Body.forEach((item,rowIndex)=>{
            tableElement.rows[rowIndex+1].style.display = ''
        })
    },
    search: (table, header: HTMLElement, index: number) => {

        const searchTerm = header.querySelector('input').value;
        const tableElement = header.closest('table');

        const reg = new RegExp(searchTerm, 'gi')
        table.data.Body.forEach((item,rowIndex)=>{
            tableElement.rows[rowIndex+1].style.display= item[index].match(reg) ? '': 'none'
        })
    }
}