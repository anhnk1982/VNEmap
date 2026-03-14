const map = L.map('map').setView([16,108],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'Map'
}).addTo(map);

let provincesData = [];

fetch("data/provinces.json")
.then(res=>res.json())
.then(data=>{
provincesData=data;

renderList(data);
addMarkers(data);
});

function renderList(data){

const container=document.getElementById("provinceList");

container.innerHTML="";

data.forEach(p=>{

const div=document.createElement("div");

div.className="col-md-4 province";

div.innerHTML=`
<div class="card p-3">
<h5>${p.name}</h5>
<p>Sáp nhập từ: ${p.merged_from.join(", ")}</p>
</div>
`;

container.appendChild(div);

});

}

function addMarkers(data){

data.forEach(p=>{

L.marker(p.coordinates)
.addTo(map)
.bindPopup(`
<b>${p.name}</b><br>
Sáp nhập từ: ${p.merged_from.join(", ")}
`);

});

}

document.getElementById("search")
.addEventListener("input",function(){

const value=this.value.toLowerCase();

const filtered=provincesData.filter(p=>
p.name.toLowerCase().includes(value)
);

renderList(filtered);

});