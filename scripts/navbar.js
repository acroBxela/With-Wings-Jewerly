window.onresize = check;
var navWidth;
var menuActive = false;

function check()
{
	if (getNavWidth() > 570 && menuActive)
	{
		showLinks();
		
	}
}
function getNavWidth()
{
	var navBar = document.getElementById("navBar");
	return navBar.offsetWidth;
}
	
function showLinks()
{
	menuActive = !menuActive;

	var links = document.getElementById("links");
	if (menuActive)
		links.classList.add('shown');
	else
		links.classList.remove('shown');
}


