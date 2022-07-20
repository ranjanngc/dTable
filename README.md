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
```JS
//HTML
<div id="app"></div>

//JavaScript
import {dTable} from './dist/index.js';

dTable.init(document.querySelector('#app'));

dTable.data = { 
    
    header: [
        { title: "Name" }, 
        { title: "Age", sortable: true }, 
        { title: "Location", sortable: true }, 
        { title: 'EMail'}, 
        { title: 'Telephone'}
    ],
    body: [
        ["Name1", 21, "Place1", 'abc@dTable.com', '011 568974'],
        ["Name2", 42, "Place2", 'abc@dTable.com', '011 568974'],
    ]
}
```
**Why a flat array for the body?** JSON is great but repeating `key` names is overhead to the network. A flat array is mapped to the header based on the index. This is a very simple data structure that gives ease of integration with the table, hence a fast and smooth table interaction.

## dTable Props
`dTable` component exposes following props :
|Sr.|Prop|Type|Description|
|---|----|----|-----------|
|1|header|IHeader|Specifies headers title and features like sortable, filterable, template, etc.|
|2|body|Array<any>|A flat array to specifies table data|
|3|containerClass|string|species CSS class for top container div|
### Sorting
To enable sorting over a column, add `sortable` flag in `Header`. Notice `sortable` flag added in the above code snippet and see the sorting column in action here [Live](https://ranjanngc.github.io/dTable/)

### Filtering
To enable filter over a column, add `filterable` flag in `Header`:
```JS
//HTML
<div id="app"></div>

//JavaScript (type=module)
import {dTable} from './dist/index.js';

dTable.init(document.querySelector('#app'));

dTable.data = { 
    
    header: [
        { title: "Name", filterable: true }, 
        { title: "Age"}, 
        { title: "Location"}, 
        { title: 'EMail'}, 
        { title: 'Telephone'}
    ],
    body: [
        ["Name1", 21, "Place1", 'abc@dTable.com', '011 568974'],
        ["Name2", 42, "Place2", 'abc@dTable.com', '011 568974'],
    ],
    containerClass: 'container'
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
```JS
dTable.data = { 
    
    header: [
        { title: "Name"}, 
        { title: "Age"}, 
        { title: "Location"}, 
        { title: 'EMail', template: '<a href="mailto:{3}">{3}</a>'}, 
        { title: 'Telephone'}
    ],
    body: [
        ["Name1", 21, "Place1", 'abc@dTable.com', '011 568974'],
        ["Name2", 42, "Place2", 'abc@dTable.com', '011 568974'],
    ]
}
```
With `'<a href="mailto:{3}">{3}</a>'}`, while rendering the cell corresponding data index i.e. {3} will be replaced with data at index position 3 in Body array.
See [Live](https://ranjanngc.github.io/dTable/), for how this translated into a table (EMail column).

## Styling
Styling is not shipped with the component. This allows adding your own styling to the table according to your's application theme. Here is how I styled dTable in [Live](https://ranjanngc.github.io/dTable/) demo page.

Note - I admit, that I am not good at CSS and will update this section very soon.
```CSS
:root{--border:#aab6c1;--header-bg:#F5F5F5;}
body{font-family: 'Roboto', sans-serif;height: 100%;}
.container{width: 95vw;height: 86vh;overflow: auto;align-items: center;}
table[data-role='dtable'] {border-collapse: separate;border-spacing: 0px;}
table[data-role='dtable'] thead {height: 2em;}
table[data-role='dtable'] thead th {border-top: .001em solid var(--border);}
table[data-role='dtable'] thead, table thead * {background-color: var(--header-bg);position: sticky;top:0px;}
table[data-role='dtable'] thead th:first-child, table tbody td:first-child {border-left: .001em solid var(--border);}
table[data-role='dtable'] thead th, table tbody td {border-bottom: .001em solid var(--border);border-right: .001em solid var(--border);}
table[data-role='dtable'] th input:active {border-color: transparent;outline-color: transparent;}
table[data-role='dtable'] th span[data-role="search"], table th span[data-role="sort"] {cursor: pointer;}
table[data-role='dtable'] th span[data-role="search"]{float: left;
background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' id='Outline' viewBox='0 0 24 24' width='1.2em' height='1.2em' style='aspect-ratio: attr(width)/attr(height);'><path d='M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z'/></svg>");
    content: '';background-repeat: no-repeat;width: 1.2em;height: 1.3em;margin-left: .3em;background-size: 1.2em 1.2em;}
table[data-role='dtable'] th span[data-role="sort"]{float: right;padding-right: .3em;}
table[data-role='dtable'] tbody td {padding: 8px;}
table[data-role='dtable'] input[data-role="d-search"] {background-color: var(--header-bg);border-color: var(--header-bg);outline: none}
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
|1  |Sorting| ✅| beta|
|2  |Filter| ✅| beta|
|3  |Template| ✅| beta|
|4  |Grouping| -| -|

## Contribution
Welcoming all vanilla JS lovers to create an amazing component