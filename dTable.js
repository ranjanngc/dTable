var Header = {
    render: function (headers) {
        if (headers) {
            var hdr_1 = "<thead data-id='table_header'><tr>";
            headers.forEach(function (header, index) {
                header.index = index;
                hdr_1 += "<th data-index=\"".concat(index, "\">").concat(header.title, " ").concat(header.sortable ? "<span style=\"cursor:pointer\">".concat(header.sortOrder === 'ASC' ? '▲' : '▼', "</span>") : '', "</th>"); //▼
            });
            hdr_1 += "</tr></thead>";
            return hdr_1;
        }
    },
};
var Body = {
    render: function (data) {
        var _this = this;
        if (data) {
            var hdr_2 = "<tbody>";
            data.forEach(function (rows, rowIndex) {
                hdr_2 += "<tr>";
                rows.forEach(function (item, colIndex) {
                    if (_this.edit_row === rowIndex && _this.edit_col == colIndex) {
                        hdr_2 += "<td><input type=\"text\" style=\"width:100%\" autofocus  value=\"".concat(item, "\" onchange=\"rk_table.updateData(this.value, ").concat(rowIndex, ", ").concat(colIndex, ")\"></td>");
                        _this.edit_row = null;
                        _this.edit_col = null;
                    }
                    else {
                        //hdr += `<td>${item} <span style="cursor:pointer;" onclick="rk_table.setEdit(${rowIndex}, ${colIndex})" >🖉</span></td>`;
                        hdr_2 += "<td>".concat(item, "</td>");
                    }
                });
                hdr_2 += "</tr>";
            });
            hdr_2 += "</tbody>";
            return hdr_2;
        }
    }
};

var Table = {
    data: null,
    element: null,
    render: function (tableData, table) {
        Table.data = tableData;
        Table.element = table;
        var html = "<table border>\n                        ".concat(Header.render(tableData.Header), " \n                        ").concat(Body.render(tableData.Body), "\n        </table>");
        table.innerHTML = html;
        var hdr = document.querySelector("thead[data-id='table_header']");
        hdr.addEventListener('click', Table.sort);
    },
    sort: function (ev) {
        var hdrElement = ev.target.parentElement;
        if (hdrElement.tagName !== "TH") {
            return;
        }
        var hdrIndex = hdrElement.getAttribute('data-index');
        var header = Table.data.Header[hdrIndex];
        if (header.sortOrder == 'ASC') {
            Table.data.Body = Table.data.Body.sort(function (a, b) { return a[hdrIndex] < b[hdrIndex] ? 1 : -1; });
        }
        else {
            Table.data.Body = Table.data.Body.sort(function (a, b) { return a[hdrIndex] > b[hdrIndex] ? 1 : -1; });
        }
        header.sortOrder = (header.sortOrder === 'ASC' ? 'DESC' : 'ASC');
        Table.render(Table.data, Table.element);
    }
};

var dTable = {
    _app: null,
    _data: {},
    init: function (app) {
        this._app = app;
    },
    get data() {
        return this._data;
    },
    set data(value) {
        this._data = value;
        Table.render(this._data, this._app);
    },
    set body(value) {
        this._data.Body = value;
        Table.render(this._data, this._app);
    },
};

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
};

let tableBodyData = dTable.data.Body;

for(let i=0; i< 100 ;i ++){

    tableBodyData.push([`Name00${i}`,(i+5), `Location${500-i}`, 'abc@gmail.com', '+91 011 568974']);
}

dTable.body = tableBodyData;
