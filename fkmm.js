function expandMenu(evt) {
  tag = evt.currentTarget.tagName;
  console.log (tag);
  if (tag == "A") {
    arrow = evt.currentTarget.parentNode.getElementsByTagName("fkmm-arrow")[0];
  } else if (tag == "DIV") {
    arrow = evt.currentTarget.getElementsByTagName("fkmm-arrow")[0];
  } else if (tag == "FKMM-ARROW") {
    arrow = evt.currentTarget;
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
  if(pushHistory == undefined) pushHistory=true;
  /* Make an HTTP request using the attribute value as the file name: */
  elmnt = document.getElementById("content");
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        elmnt.innerHTML = this.response;
        document.getElementById("lastModified").innerHTML = "Последна промяна: " + this.getResponseHeader("Last-Modified");
        document.getElementById("title").innerHTML = document.getElementById("setTitle").innerHTML;
        document.title = TITLE + ": " + document.getElementById("setTitle").innerText;
        document.getElementById("setTitle").style.display="none";
        var codes;
        codes = elmnt.getElementsByTagName("script");
        for(var j=0;j<codes.length;j++)
        {
           eval(codes[j].text);
        }
        if (pushHistory==true){
          scroll = path.split("#")[1];
          if (scroll == undefined) {
            window.scrollTo(0, 0); // Scroll to top only if a new page is loaded and there is no anchor in the url
            history.pushState({'path':path}, document.title, path);
          }
          else {
            history.replaceState ("","",path.split("#")[0]); // грозно, но иначе не работи скролът или се налага да спамя историята на браузъра
            location.hash = scroll;
          }
        }
      }
      if (this.status == 404) {
        elmnt.innerHTML = "<h2 class='w3-panel w3-card w3-border w3-leftbar w3-border-red w3-pale-yellow w3-center w3-padding-16'>Страницата не е намерена!</h2>";
        document.getElementById("lastModified").innerHTML="";
        document.getElementById("title").innerHTML="";
      }
    }
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
  page = location.pathname + location.hash;
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

/* Slideshows */
var slideIndex = 1;
function plusDivs(n, classname) {
  showDivs(slideIndex += n, classname);
}

function currentDiv(n, classname) {
  showDivs(slideIndex = n, classname);
}

function showDivs(n, classname) {
  var i;
  var x = document.getElementsByClassName(classname);
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";
}
