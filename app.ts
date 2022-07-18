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
        ["Ranjan", 42, "Delhi", 'abc@gmail.com', '+91 011 568974'],
        ["AK", 45, "New York", 'abc@gmail.com', '+91 011 568974']
    ]
}

let tableBodyData = dTable.data.Body;

for(let i=0; i< 100 ;i ++){

    tableBodyData.push(["Name"+ i, 4+i, "New Delhi", 'abc@gmail.com', '+91 011 568974'])
}

dTable.body = tableBodyData