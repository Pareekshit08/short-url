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

function copyToClipboard(id) {
  let copyText = document.getElementById(id);

  // Use the Clipboard API
  navigator.clipboard.writeText(copyText.value).then(function() {
    alert("Copied the text: " + copyText.value);
  }).catch(function(err) {
    console.error("Could not copy text: ", err);
  });
}

document.querySelector(".modal_form").addEventListener("submit",async function(event){
event.preventDefault();
    const link = document.querySelector(".modal_form .link").value;
    const customName = document.querySelector(".modal_form .Cust_name").value;
    console.log(link);
    console.log(customName);

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();
    
  // Define the type of request, URL, and if it should be async
  xhr.open("POST", "/url/check/custom", true);
  
  // Set request header for sending JSON data
  xhr.setRequestHeader("Content-Type", "application/json");

  // Define the callback function for when the request is complete
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) { // Check if request is complete
      if (xhr.status === 200) { // Check if the status is OK
        // Display success message
        document.getElementById("success-message").style.display = "block";
        document.querySelector(".modal_form .link").value = "";
        document.querySelector(".modal_form .Cust_name").value="";
      } else {
        // Handle error if any (you can also show a message here)
        console.error("Error:", xhr.responseText);
      }
    }
  };

  // Send the request with the data
  var data = JSON.stringify({
    link: link,
    Cust_name: customName
  });
  xhr.send(data);
});