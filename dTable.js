var Header = {
    render: function (headers) {
        if (headers) {
            var hdr_1 = "<thead data-id='table_header' ><tr>";
            headers.forEach(function (header, index) {
                header.index = index;
                var filterElement = header.filterable ? '<span data-role="search"> </span><input data-role="d-search" type="text" autofocus style="display:none">' : '';
                hdr_1 += "<th data-index=\"".concat(index, "\" title=\"").concat(header.title, "\">").concat(filterElement, "<span>").concat(header.title, "</span> ").concat(header.sortable ? "<span data-role=\"sort\">".concat(header.sortOrder === 'ASC' ? '▲' : '▼', "</span>") : '', "</th>"); //▼
            });
            hdr_1 += "</tr></thead>";
            return hdr_1;
        }
    },
};
var Body = {
    render: function (data, header) {
        var _this = this;
        if (data) {
            var hdr_2 = "<tbody>";
            data.forEach(function (rows, rowIndex) {
                hdr_2 += "<tr style='content-visibility:auto'>";
                rows.forEach(function (item, colIndex) {
                    if (_this.edit_row === rowIndex && _this.edit_col == colIndex) {
                        hdr_2 += "<td><input type=\"text\" style=\"width:100%\" autofocus  value=\"".concat(item, "\" onchange=\"rk_table.updateData(this.value, ").concat(rowIndex, ", ").concat(colIndex, ")\"></td>");
                        _this.edit_row = null;
                        _this.edit_col = null;
                    }
                    else {
                        var template = header[colIndex].template ? Body.resolveTemplate(header[colIndex].template, rows) : item;
                        //hdr += `<td>${item} <span style="cursor:pointer;" onclick="rk_table.setEdit(${rowIndex}, ${colIndex})" >🖉</span></td>`;
                        hdr_2 += "<td>".concat(template, "</td>");
                    }
                });
                hdr_2 += "</tr>";
            });
            hdr_2 += "</tbody>";
            return hdr_2;
        }
    },
    resolveTemplate: function (template, items) {
        items.forEach(function (val, index) {
            var reg = new RegExp("\\{".concat(index, "\\}"), 'g');
            template = template.replace(reg, items[index]);
        });
        return template;
    }
};

var SortUtil = {
    sort: function (TableUtil, hdrIndex) {
        var header = TableUtil.data.Header[hdrIndex];
        if (header.sortOrder == 'ASC') {
            TableUtil.data.Body = TableUtil.data.Body.sort(function (a, b) { return a[hdrIndex] < b[hdrIndex] ? 1 : -1; });
        }
        else {
            TableUtil.data.Body = TableUtil.data.Body.sort(function (a, b) { return a[hdrIndex] > b[hdrIndex] ? 1 : -1; });
        }
        header.sortOrder = (header.sortOrder === 'ASC' ? 'DESC' : 'ASC');
        TableUtil.render(TableUtil.data, TableUtil.element);
    }
};

var SearchUtil = {
    showInput: function (header) {
        var _a;
        header.querySelectorAll('span').forEach(function (span) {
            span.style.display = 'none';
        });
        var searchInput = header.querySelector('input');
        searchInput.style.width = "100%";
        searchInput.style.height = "100%";
        searchInput.style.margin = '0px';
        searchInput.style.border = '0.13em solid transparent';
        searchInput.style.outlineColor = 'transparent';
        searchInput.placeholder = ((_a = header.getAttribute('title')) !== null && _a !== void 0 ? _a : '') + ' ..press ESC to cancel';
        searchInput.style.display = 'block';
        searchInput.focus();
    },
    hideInput: function (table, header) {
        header.querySelectorAll('span').forEach(function (span) {
            span.style.display = '';
        });
        var searchInput = header.querySelector('input');
        searchInput.style.display = 'none';
        searchInput.value = '';
        var tableElement = header.closest('table');
        table.data.Body.forEach(function (item, rowIndex) {
            tableElement.rows[rowIndex + 1].style.display = '';
        });
    },
    search: function (table, header, index) {
        var searchTerm = header.querySelector('input').value;
        var tableElement = header.closest('table');
        var reg = new RegExp(searchTerm, 'gi');
        table.data.Body.forEach(function (item, rowIndex) {
            tableElement.rows[rowIndex + 1].style.display = item[index].match(reg) ? '' : 'none';
        });
    }
};

var Table = {
    data: null,
    element: null,
    render: function (tableData, table) {
        Table.data = tableData;
        Table.element = table;
        var html = "<div class=\"".concat(tableData.containerClass, "\"><table width=\"100%\">\n                        ").concat(Header.render(tableData.Header), " \n                        ").concat(Body.render(tableData.Body, tableData.Header), "\n        </table></div>");
        table.innerHTML = html;
        var hdr = document.querySelector("thead[data-id='table_header']");
        hdr.addEventListener('click', Table.clickHandler);
        hdr.addEventListener('input', Table.inputHandler);
        hdr.addEventListener('keyup', Table.keyupHandler);
        hdr.closest('table').style.tableLayout = 'fixed';
    },
    getMeta: function (target) {
        var _a;
        var role = target.getAttribute("data-role");
        var hdrElement = target.closest('th');
        //if(hdrElement?.tagName !== "TH"){return}
        var hdrIndex = parseInt((_a = hdrElement.getAttribute('data-index')) !== null && _a !== void 0 ? _a : '-1');
        return [hdrElement, role, hdrIndex];
    },
    clickHandler: function (ev) {
        var _a = Table.getMeta(ev.target), hdrElement = _a[0], role = _a[1], hdrIndex = _a[2];
        if ((hdrElement === null || hdrElement === void 0 ? void 0 : hdrElement.tagName) !== "TH") {
            return;
        }
        switch (role) {
            case "sort":
                SortUtil.sort(Table, hdrIndex);
                break;
            case "search":
                SearchUtil.showInput(hdrElement);
                break;
        }
    },
    inputHandler: function (ev) {
        var _a = Table.getMeta(ev.target), hdrElement = _a[0]; _a[1]; var hdrIndex = _a[2];
        SearchUtil.search(Table, hdrElement, hdrIndex);
    },
    keyupHandler: function (ev) {
        if (ev.key === "Escape") {
            var hdrElement = Table.getMeta(ev.target)[0];
            SearchUtil.hideInput(Table, hdrElement);
        }
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
};

let tableBodyData = dTable.data.Body;

for(let i=0,j =50; i< j ;i ++){

    tableBodyData.push([`Name00${i}`,(i+5), `Location${500-i}`, 'abc@gmail.com', '+91 011 568974', 'action data']);
}

dTable.body = tableBodyData;
