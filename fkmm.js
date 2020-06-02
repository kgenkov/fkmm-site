function expandMenu(evt) {
    tag = evt.currentTarget.tagName;
    console.log (tag);
    if (tag == "A") {
        arrow = evt.currentTarget.parentNode.getElementsByTagName("arrow")[0];
    } else if (tag == "DIV") {
        var arrow = evt.currentTarget.getElementsByTagName("arrow")[0];
    } else if (tag == "ARROW") {
        var arrow = evt.currentTarget;
    } else {return};
    target = arrow.parentNode.parentNode.getElementsByTagName("ul")[0];
    if (target.className.indexOf("w3-hide") == -1) {
        target.className += " w3-hide";
        arrow.className = arrow.className.replace("fa fa-caret-down", "fa fa-caret-right");
        arrow.innerHTML = "►";
    } else { 
        target.className = target.className.replace(" w3-hide", "");
        arrow.className = arrow.className.replace("fa fa-caret-right", "fa fa-caret-down");
        arrow.innerHTML = "▼";
    }
    evt.stopPropagation();
    return;
}

function load(path, pushHistory) {
    if(!path) path="home";
    if(!pushHistory) pushHistory=true;
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
        scroll = path.split("#")[1];
        if (scroll != undefined) {
            location.hash = scroll;
        }
      }
      if (this.status == 404) {
        elmnt.innerHTML = "<h2 class='w3-panel w3-card w3-border w3-leftbar w3-border-red w3-pale-yellow w3-center w3-padding-16'>Страницата не е намерена!</h2>";
        document.getElementById("lastModified").innerHTML="";
        document.getElementById("title").innerHTML="";
      }
    }
    }
    if (pushHistory==true){
        window.scrollTo(0, 0); // Scroll to top only if a new page is loaded
        history.pushState({'path':path}, document.title + ": " +  document.getElementById("title").innerText , path);
    }
    xhttp.open("GET", path.split("#")[0]+".html", true);
    xhttp.send();      
    w3_close();
    /* Exit the function: */
    return;
}

window.onpopstate = function(e) {
    path = getPageFromURL ();
    load (path,false);
    return;
};

function getPageFromURL () {
    page = window.location.pathname;
    if (page == "/" || page == "") page = "home";
    return page;
}

function loadMainContent() {
    page = getPageFromURL ();
    load(page);
    return;
}

function w3_open() {
    document.getElementById("menu").style.display = "block";
}
function w3_close() {
    document.getElementById("menu").style.display = "none";
}
    
