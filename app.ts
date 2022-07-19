import {dTable} from './dist/index.js';

dTable.init(document.querySelector('#app'));

dTable.data = { 

    Header: [
        { title: "Name", filterable:true }, 
        { title: "Age", sortable: true }, 
        { title: "Location", sortable: true }, 
        { title: 'EMail', template: '<a href="mailto:{3}">{3}</a>'}, 
        { title: 'Telephone'},
        { title: '', template: '<button onclick="sayHello(\'Hi {0}\')">Action</button>'}
    ],
    Body: [
        ["Name001", 42, "Location390", 'abc@gmail.com', '+91 011 568974', 'action data'],
        ["Name002", 42, "Location390", 'abc@gmail.com', '+91 011 568974', 'action data'],
    ],
    containerClass: 'container'
}

let tableBodyData = dTable.data.Body;

for(let i=0,j =50; i< j ;i ++){

    tableBodyData.push([`Name00${i}`,(i+5), `Location${500-i}`, 'abc@gmail.com', '+91 011 568974', 'action data']);
}

dTable.body = tableBodyData