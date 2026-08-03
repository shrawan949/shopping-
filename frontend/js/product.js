const api = "http://3.108.6.104:8080/products";

fetch(api)

.then(response => response.json())

.then(products => {

    let rows = "";

    products.forEach(product => {

        rows += `

<tr>

<td>${product.id}</td>

<td>${product.name}</td>

<td>${product.description}</td>

<td>${product.price}</td>

<td>${product.quantity}</td>

<td>

<button onclick="deleteProduct(${product.id})">

Delete

</button>

</td>

</tr>

`;

    });

    document.getElementById("products").innerHTML = rows;

});

function deleteProduct(id){

fetch(api+"/"+id,{

method:"DELETE"

})

.then(()=>{

location.reload();

});

}
