/* function includeHTML() {
  var z, i, elmnt, file, xhttp;
//  Loop through a collection of all HTML elements:
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
//    search for elements with a certain atrribute:
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
//      Make an HTTP request using the attribute value as the file name:
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
//          Remove the attribute, and call this function once more:
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
//    Exit the function:
      return;
    }
  }
} */

function load(path="home") {
      /* Make an HTTP request using the attribute value as the file name: */
      elmnt = document.getElementById("content");
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.response;
            document.getElementById("lastModified").innerHTML="Последна промяна: " + this.getResponseHeader("Last-Modified");
            document.getElementById("title").innerHTML=document.getElementById("setTitle").innerHTML;
            document.getElementById("setTitle").style.display="none";
          }
          if (this.status == 404) {
            elmnt.innerHTML = "<h2 class='w3-panel w3-card w3-border w3-leftbar w3-border-red w3-pale-yellow w3-center w3-padding-16'>Страницата не е намерена!</h2>";
            document.getElementById("lastModified").innerHTML="";
            document.getElementById("title").innerHTML="";
          }
        }
      }
      history.pushState("", document.title , '?page='+path);
      xhttp.open("GET", path+".html", true);
      xhttp.send();      
      w3_close();
      /* Exit the function: */
      return;
}

function loadMainContent() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams (queryString);
    var page = urlParams.get ('page');
    if (page == null) page = "home";
    load(page);
}

function w3_open() {
    document.getElementById("menu").style.display = "block";
}
function w3_close() {
    document.getElementById("menu").style.display = "none";
}

