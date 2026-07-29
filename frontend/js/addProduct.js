const api="http://localhost:8080/products";

document
.getElementById("productForm")
.addEventListener("submit",function(e){

e.preventDefault();

const product={

name:document.getElementById("name").value,

description:document.getElementById("description").value,

price:document.getElementById("price").value,

quantity:document.getElementById("quantity").value

};

fetch(api,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(product)

})

.then(response=>response.json())

.then(data=>{

alert("Product Added");

window.location="index.html";

});

});
