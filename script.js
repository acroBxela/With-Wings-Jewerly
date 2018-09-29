window.onresize = check;
var navWidth;
var menuActive = false;

function check() {
    if (getNavWidth() > 570 && menuActive) {
        showLinks();

    }
}

function getNavWidth() {
    var navBar = document.getElementById("navBar");
    return navBar.offsetWidth;
}

function showLinks() {
    menuActive = !menuActive;

    var links = document.getElementById("links");
    if (menuActive)
        links.classList.add('shown');
    else
        links.classList.remove('shown');
}


/* Tree of life select code */
var opened = false;
var list = "<div id='options'><div style='color:gold' onclick='select(this,0)'>Gold</div><div style='color:silver' onclick='select(this,1)'>Silver</div><div onclick='select(this,2)' style='color:#e5e4e2'>Platnium</div></div>";

function toggle() {
    opened = !opened;
    if (opened) {
        document.getElementById('options').style.display = 'block';
        document.getElementById('i').classList.add('opened');
        document.getElementById('i').classList.remove('closed');
    } else {
        document.getElementById('options').style.display = 'none';
        document.getElementById('i').classList.add('closed');
        document.getElementById('i').classList.remove('opened');
    }
}

function select(a, color) {
    var colors = ['gold', 'silver', '#e5e4e2']
    document.getElementById('i').innerHTML = a.innerHTML + '<i class="fa fa-sort-desc" aria-hidden="true"></i>' + list;

    document.getElementById('i').style.color = colors[color];
}
/* End of code */