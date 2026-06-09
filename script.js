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

container.innerHTML = `
    <div class="scriptBox">
        <pre style="
            white-space: pre-wrap;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
        ">${script.Script}</pre>

        <br>

        <button onclick="copyScript()">
            Copy Script
        </button>
    </div>
`;
```

}

function copyScript(){

```
const selected = document.getElementById("categorySelect").value;

const script = scriptsData.find(x => x.Category === selected);

if(!script){
    return;
}

navigator.clipboard.writeText(script.Script);

alert("Copied to clipboard");
```

}
