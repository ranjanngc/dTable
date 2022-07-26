import DTable from './dist/dTable.es';

const dTable = new DTable('#app');
//dTable.init(document.querySelector('#app'));

dTable.props.data = { 

    header: [
        { title: "Name", filterable:true }, 
        { title: "Age", sortable: true }, 
        { title: "Location", sortable: true }, 
        { title: 'EMail', template: '<a href="mailto:{3}">{3}</a>'}, 
        { title: 'Telephone'},
        { title: '', template: '<button onclick="sayHello(\'Hi {0}\')">Action</button>'}
    ],
    body: [
        ["Name001", 42, "Location390", 'abc@gmail.com', '+91 011 568974', 'action data'],
        ["Name002", 42, "Location390", 'abc@gmail.com', '+91 011 568974', 'action data'],
    ],
    containerClass: 'container'
}

let tableBodyData = dTable.props.data.body;

for(let i=0,j =100; i< j ;i ++){

    tableBodyData.push([`Name00${i}`,(i+5), `Location${500-i}`, 'abc@gmail.com', '+91 011 568974', 'action data']);
}

dTable.props.rows = tableBodyData