var link_arr = document.querySelectorAll("a");

document.querySelector(".generate").addEventListener("submit",function(event){
event.preventDefault();
var ispresent = 0;
const inpval = document.querySelector(".generate input").value;
link_arr.forEach((ar_link)=>{
    if(ar_link.getAttribute('href')==inpval){
        ispresent = 1;
    }
});
if(ispresent === 1){
    alert("The Given Url is Already Shortned");
    ispresent = 0;
}else{
    ispresent = 0;
    this.submit();
}
});