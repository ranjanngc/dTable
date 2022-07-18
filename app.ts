import {dTable} from './dist/index.js';

dTable.init(document.querySelector('#app'));

dTable.data = { 

    Header: [
        { title: "Name" }, 
        { title: "Age", sortable: true }, 
        { title: "Location", sortable: true }, 
        { title: 'EMail'}, 
        { title: 'Telephone'}
    ],
    Body: [
        ["Name001", 42, "Location390", 'abc@gmail.com', '+91 011 568974'],
        ["Name002", 42, "Location390", 'abc@gmail.com', '+91 011 568974'],
    ]
}

let tableBodyData = dTable.data.Body;

for(let i=0; i< 100 ;i ++){

    tableBodyData.push([`Name00${i}`,(i+5), `Location${500-i}`, 'abc@gmail.com', '+91 011 568974']);
}

dTable.body = tableBodyData