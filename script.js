let scriptsData = [];

fetch("scripts.xlsx")
.then(response => response.arrayBuffer())
.then(data => {

```
const workbook = XLSX.read(data);

const sheet = workbook.Sheets[workbook.SheetNames[0]];

scriptsData = XLSX.utils.sheet_to_json(sheet);

loadCategories();
```

});

function loadCategories(){

```
const select = document.getElementById("categorySelect");

select.innerHTML = "<option value=''>-- Select Script --</option>";

scriptsData.forEach(row => {

    let option = document.createElement("option");

    option.value = row.Category;

    option.textContent = row.Category;

    select.appendChild(option);

});

select.addEventListener("change", showScript);
```

}

function showScript(){

```
const selected = document.getElementById("categorySelect").value;

const container = document.getElementById("scriptContainer");

const script = scriptsData.find(x => x.Category === selected);

if(!script){
    container.innerHTML = "";
    return;
}

let lines = script.Script.split(/\r?\n/);

let html = `
    <div style="
        background:#ffffff;
        border:1px solid #d9d9d9;
        border-radius:8px;
        padding:15px;
        margin-top:10px;
        font-family:Arial, sans-serif;
    ">
`;

lines.forEach((line,index)=>{

    let clean = line.replace(/^\*\s*/,"").trim();

    if(clean !== ""){

        html += `
            <div style="
                display:flex;
                gap:10px;
                margin-bottom:8px;
                line-height:1.5;
            ">
                <span style="
                    font-weight:bold;
                    min-width:25px;
                ">
                    ${index + 1}.
                </span>
                <span>${clean}</span>
            </div>
        `;
    }

});

html += `
    <button onclick="copyScript()" style="
        margin-top:10px;
        padding:8px 16px;
        cursor:pointer;
    ">
        Copy Script
    </button>
    </div>
`;

container.innerHTML = html;
```

}

function copyScript(){

```
const items = document.querySelectorAll("#scriptContainer div div span:last-child");

let text = "";

items.forEach(item => {

    text += item.innerText + "\n";

});

navigator.clipboard.writeText(text);

alert("Copied to clipboard");
```

}
