let scriptsData = [];

fetch("scripts.xlsx")
.then(response => response.arrayBuffer())
.then(data => {

const workbook = XLSX.read(data);

const sheet = workbook.Sheets[workbook.SheetNames[0]];

scriptsData = XLSX.utils.sheet_to_json(sheet);

loadCategories();

});


function loadCategories(){

const select = document.getElementById("categorySelect");

select.innerHTML = "<option value=''>-- Select Script --</option>";

scriptsData.forEach(row => {

let option = document.createElement("option");

option.value = row.Category;

option.textContent = row.Category;

select.appendChild(option);

});

select.addEventListener("change", showScript);

}


function showScript(){

const selected = document.getElementById("categorySelect").value;

const container = document.getElementById("scriptContainer");

const script = scriptsData.find(x => x.Category === selected);

if(!script){
container.innerHTML="";
return;
}

/* SPLIT EXCEL CELL INTO LINES */
let lines = script.Script.split(/\n/);

let html = "<div class='scriptBox'><ul>";

lines.forEach(line=>{

let clean = line.replace("*","").trim();

if(clean !== ""){
html += "<li>"+clean+"</li>";
}

});

html += "</ul>";

html += "<button onclick='copyScript()'>Copy Script</button>";

html += "</div>";

container.innerHTML = html;

}


function copyScript(){

const items = document.querySelectorAll("#scriptContainer li");

let text = "";

items.forEach(item=>{

text += "* " + item.innerText + "\n";

});

navigator.clipboard.writeText(text);

alert("Copied to clipboard");

}