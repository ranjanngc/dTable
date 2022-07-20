# dTable
A lightweight vanilla JavaScript reactive table component.

[Live](https://ranjanngc.github.io/dTable/)

## Ideology
We have many HTML table components out there then why a new component again? 
The idea is to make a pure JavaScript component that has no dependencies, is super lightweight and allows:

* Sorting
* Filtering
* Column Template
* Grouping
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
**Why a flat array for body?** JSON is great but repeating `key` name is overhead to network. Flat array is mapped to header based on index. This is very simple data structure that gives ease of integration with table, hence a fast and smooth table interaction.

### Sorting
To enable sorting over a column, add `sortable` flag in `Header`. Notice `sortable` flag added in above code snippet and see the sorting column in action here [Live](https://ranjanngc.github.io/dTable/)

### Filtering
To enable filter over a column, add `filterable` flag in `Header`:
```
//HTML
<div id="app"></div>

//JavaScript
import {dTable} from './dist/index.js';

dTable.init(document.querySelector('#app'));

dTable.data = { 
    
    Header: [
        { title: "Name", filterable: true }, 
        { title: "Age"}, 
        { title: "Location"}, 
        { title: 'EMail'}, 
        { title: 'Telephone'}
    ],
    Body: [
        ["Name1", 21, "Place1", 'abc@dTable.com', '011 568974'],
        ["Name2", 42, "Place2", 'abc@dTable.com', '011 568974'],
    ]
}
```
See [Live](https://ranjanngc.github.io/dTable/), `Name` column can be filtered by clicking on magnifying glass icon. The icon can be changed by adding CSS rule. For example:
```CSS
table th span[data-role="search"]{
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' id='Outline' viewBox='0 0 24 24' width='1.2em' height='1.2em'><path d='M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z'/></svg>");
    background-repeat: no-repeat;
}
``` 
Note - in the place of SVG, you may use an icon.

### Template
A basic cell Template can be added. To add `template` to cell, add `template` to `Header`. Like this:
```
dTable.data = { 
    
    Header: [
        { title: "Name"}, 
        { title: "Age"}, 
        { title: "Location"}, 
        { title: 'EMail', template: '<a href="mailto:{3}">{3}</a>'}, 
        { title: 'Telephone'}
    ],
    Body: [
        ["Name1", 21, "Place1", 'abc@dTable.com', '011 568974'],
        ["Name2", 42, "Place2", 'abc@dTable.com', '011 568974'],
    ]
}
```
With `'<a href="mailto:{3}">{3}</a>'}`, while rendering the cell corresponding data index i.e. {3} will be replaced with data at index position 3 in Body array.
See [Live](https://ranjanngc.github.io/dTable/), for how this translated into a table (EMail column).
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
|1  |Sorting| ✅| beta|
|2  |Filter| ✅| beta|
|3  |Template| ✅| beta|
|4  |Grouping| -| -|

## Contribution
Welcoming all vanilla JS lovers to create an amazing component