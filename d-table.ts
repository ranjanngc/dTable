const rk_table = {
    _app: null,
    _TableData: {},
    initialize: function (selector) {
      this._app = document.querySelector(selector);
      this.renderTable();
    },
    get TableData() {
      return this._TableData;
    },
  
    set TableData(value) {
      this._TableData = value;
      //console.log(this._TableData);
      this.renderTable();
    },
  
    get body() {
      return this._TableData.body;
      //this.renderTable();
    },
    set body(value) {
      this._TableData.body = value;
      this.renderTable();
    },
  
    renderHeader: function (data) {
      if (data.header) {
        let hdr = "<thead><tr>";
        data.header.forEach((header) => {
          hdr += `<th>${header.title}</th>`;
        });
        hdr += "</tr></thead>";
  
        return hdr;
      }
    },
  
    renderBody: function (data) {
      if (data.body) {
        let hdr = "<tbody>";
        data.body.forEach((data, rowIndex) => {
          hdr += "<tr>";
          data.forEach((item, colIndex) => {
            if(this.edit_row === rowIndex && this.edit_col == colIndex){
                hdr += `<td><input type="text" style="width:100%" autofocus  value="${item}" onchange="rk_table.updateData(this.value, ${rowIndex}, ${colIndex})"></td>`;
                this.edit_row = null;
                this.edit_col = null;
            }
            else{
                hdr += `<td>${item} <span style="cursor:pointer;" onclick="rk_table.setEdit(${rowIndex}, ${colIndex})" >🖉</span></td>`;
            }
                
          });
          hdr += `</tr>`;
        });
        hdr += "</tbody>";
  
        return hdr;
      }
    },
  
    renderTable: function () {
      let table = "<table>";
      table +=
        this.renderHeader(this._TableData) + this.renderBody(this._TableData);
      table += "</table>";
      this._app.innerHTML = table;
    },

    updateData: function(value, rowIndex, colIndex) {

        this._TableData.body[rowIndex][colIndex] = value
    },
    edit_row: null,
    edit_col: null,
    setEdit: function(rowIndex, colIndex){
        this.edit_row = rowIndex;
        this.edit_col = colIndex;
        this.renderTable();
    }
  };
  
  rk_table.initialize("#app");
  
  rk_table.TableData = {
    header: [{ title: "Name" }, { title: "Age" }, { title: "Location" }, {title: 'EMail'}, {title: 'Telephone'}],
    body: [
      ["Ranjan", 42, "New Delhi", 'abc@gmail.com', '+91 011 568974'],
      ["AK", 45, "New York", 'abc@gmail.com', '+91 011 568974']
    ]
  };
  
  let body = rk_table.body;
  for (i = 0; i < 1000; i++) {
    body.push(["Name" + i, 40 + i, "Loc",, 'abc@gmail.com', '+91 011 568974']);
  }
  rk_table.body = body;

  function getData(){
    console.log(body)
  }
  