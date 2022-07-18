# dTable
A lightweight vanilla JavaScript reactive table component.

[Live](https://ranjanngc.github.io/dTable/)

## Idealogy
We have many HTML table components out there then why a new component again? 
The idea is to make a pure JavaScript component that has no dependencies, is super lightweight and allows:

* Sorting
* Filtering
* Grouping
* Column Template
* styling

## Uses
```
//HTML
<div id="app"></div>

//JavaScript
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
        ["Name1", 21, "Place1", 'abc@dTable.com', '011 568974'],
        ["Name2", 42, "Place2", 'abc@dTable.com', '011 568974'],
    ]
}
```

## Build
```
yarn install
yarn build
```

## Run
Use Live Server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension to load index.html

## Feature Status
|Sr.|Feature|Status|Remarks|
|---|-------|------|-------|
|1  |Sorting| Partial Implementation| In Progress|
|2  |Filter| -| -|
|3  |Grouping| -| -|
|4  |Template| -| -|
|5  |Styling| -| -|

## Contribution
Welcoming all vanilla JS lovers to create an amazing component