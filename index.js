let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let count = document.getElementById("count")
let category = document.getElementById("category")
let total = document.getElementById("total")
let submit = document.getElementById("submit")
let discount = document.getElementById("discount")

let mood ='create';
let temp;

function gettotal(){
    
if(price.value!=""){
total.innerHTML = ` ${(+price.value + +taxes.value + +ads.value)- +discount.value}`
total.style.background = "green"
}
else{
    total.innerHTML="";
    total.style.background = "rgb(175, 32, 32)";
}

}



let getdata 

if(localStorage.product!=null){
    getdata=JSON.parse(localStorage.product);
}
    else{
        getdata=[];
    }



submit.onclick= function(){
let pro = {
    title:title.value.toLowerCase(),
    price :price .value,
    taxes :taxes .value,
    ads:ads.value,
    count:count.value,
    category:category.value.toLowerCase(),
    total: total.innerHTML,
discount:discount.value,

}

if(title.value!=""&&count.value<=100&&price.value!=""){
   
if(mood==='create'){
    if(pro.count >1){
        for(let i=0;i<pro.count;i++){
            getdata.push(pro); 
        }
        
        }
        else{
        getdata.push(pro);

        }
    }
else{
getdata[temp]=pro
mood='create'
count.style.display="block"
submit.innerHTML="CREATE";
}
cleardata()



}
getdata.push(pro); 
localStorage.setItem("product", JSON.stringify(getdata))

cleardata()
showdata()
}



function cleardata(){
    if(price.value !==""){
        price.value=""
        title.value=""
        count.value=""
       ads.value = ""; //empty input
       taxes.value = ""; //empty input
       discount.value = ""; //empty input
       category.value = ""; //empty input
       total.innerHTML=""
       total.style.background = "rgb(175, 32, 32)"
    
    }
  };

  function showdata(){

let table= '';
for(let i=0;i<getdata.length;i++){
table+=`

<tr>
<td>${i+1}</td>
<td>${getdata[i].title}</td>
<td>${getdata[i].price}</td>
<td>${getdata[i].taxes}</td>
<td>${getdata[i].ads}</td>
<td>${getdata[i].discount}</td>
<td>${getdata[i].total}</td>
<td>${getdata[i].category}</td>
<td><button  id="update" class="bu" onclick="update(${i})">update</button></td>
<td><button id="delete" class="bu" onclick="del(${i})">delete</button></td>
</tr>
`

}
document.getElementById("tbody").innerHTML=table;
let bntddelete =document.getElementById("deleteall")

if(getdata.length> 0){
bntddelete.innerHTML=
`<button class="cc">DELETE ALL (${getdata.length}) </button>`
bntddelete.className="cc"
}
else{
    bntddelete.innerHTML=""
    
}


  }
  
  showdata()


function del(e){
getdata.splice(e,1);
localStorage.product= JSON.stringify(getdata);
showdata();

}
function deleteall(){

    getdata.splice(0);
    localStorage.clear();
    showdata();
}


function update(e){
title.value=getdata[e].title;
price.value=getdata[e].price;
taxes.value=getdata[e].taxes;
ads.value=getdata[e].ads;
category.value=getdata[e].category;
discount.value=getdata[e].discount;
gettotal()
count.style.display="none"
submit.innerHTML="UPDATE";
mood='update'
  temp=e
scrollTo({
    top:0,
    behavior:"smooth"
    
})


}

let ser=document.getElementById("search")
let searchmood= 'title'
function search(id){
if(id==="search_by_title"){
    searchmood= 'title'
    ser.placeholder="SEARCH BY TITLE"

}
else{
   searchmood= 'category'
   ser.placeholder="SEARCH BY  CATEGORY" 
}
ser.focus()
ser.value=''
showdata()
}

function searchdata(value){
    let table= ''
    if(searchmood==='title'){

for(let i=0 ;i<getdata.length;i++){
    if(getdata[i].title.includes(value.toLowerCase())){
        table+=`

        <tr>
        <td>${i+1}</td>
        <td>${getdata[i].title}</td>
        <td>${getdata[i].price}</td>
        <td>${getdata[i].taxes}</td>
        <td>${getdata[i].ads}</td>
        <td>${getdata[i].discount}</td>
        <td>${getdata[i].total}</td>
        <td>${getdata[i].category}</td>
        <td><button  id="update" class="bu" onclick="update(${i})">update</button></td>
        <td><button id="delete" class="bu" onclick="del(${i})">delete</button></td>
        </tr>
        `
    }
}




    }
    else{

        for(let i=0 ;i<getdata.length;i++){
            if(getdata[i].category.includes(value.toLowerCase())){
                table+=`
        
                <tr>
                <td>${i+1}</td>
                <td>${getdata[i].title}</td>
                <td>${getdata[i].price}</td>
                <td>${getdata[i].taxes}</td>
                <td>${getdata[i].ads}</td>
                <td>${getdata[i].discount}</td>
                <td>${getdata[i].total}</td>
                <td>${getdata[i].category}</td>
                <td><button  id="update" class="bu" onclick="update(${i})">update</button></td>
                <td><button id="delete" class="bu" onclick="del(${i})">delete</button></td>
                </tr>
                `
            }
        }
        

    }
    document.getElementById("tbody").innerHTML=table;
}


