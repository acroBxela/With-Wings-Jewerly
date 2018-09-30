//////General Code for all the categories here////////
//////////////////////////////////////////////////////
function changeToSelectedCategory(string, clicked) {

    // Removing underline from the catgerory div which is currently underlined, to the div which was just clicked
    var categories = document.getElementsByClassName('bar');
    for (let i = 0; i < categories.length; i++)
        categories[i].classList.remove('activeS');
    clicked.getElementsByClassName('bar')[0].classList.add('activeS');


    // Clearing the shopWindow so that the associated html can be inserted
    var shopWindow = document.getElementById('shopWindow');
    shopWindow.innerHTML = "";



    // Each category code has HTML, the actual code is not shown, but a copy of it is, this is because when interacting
    // with the page the code is modified, so by giving a copy of the code, when a user comes back to the category, a
    // fresh slate of the code can be shown
    var copyOfCategory = document.getElementById(string).cloneNode(true);
    copyOfCategory.id += 'Copy';
    copyOfCategory.classList.remove('hidden');
    shopWindow.appendChild(copyOfCategory);

    currentlyOn = copyOfCategory.id;
    // Run custom code depending on which window is to be displayed
    if (string == 'tol') {
        setSelect();
        currentlyOn = null;
    }
    if (string == 'rStones') {
        setSpacers('rStonesCopy');
        all('rStonesCopy');
        
    }
    if (string == 'stones') {
        setSpacers('stonesCopy');
        all('stonesCopy');
    }
    if (string == 'earrings') {
        setSpacers('earringsCopy');
        all('earringsCopy');
    }
}

var resizeTimer;
var currentlyOn;

window.onresize = function() {
    document.getElementById(currentlyOn).style.opacity = '0';
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        setSpacers(currentlyOn);
        all(currentlyOn);
    }, 250);

};

///////////////////////////////////////End of General Code///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////// Tree of Life Code ////////
////////////////////////////////
var lists = ["<div id='options'><div style='color:gold' onclick=select(this,'gold',0)>Gold</div><div style='color:silver' onclick=select(this,'silver',0)>Silver</div><div onclick=select(this,'#e5e4e2',0) style='color:#e5e4e2'>Platnium</div></div>",
    "<div id='options'> <div style='color:red' onclick=select(this,'red',1)>Granite</div><div style='color:silver' onclick=select(this,'silver',1)>Stone 2</div> <div onclick=select(this,'blue',1) style='color:#e5e4e2'>Stone 3</div> </div>"
];

function toggle(select) {
    var options = select.getElementsByTagName('div')[0];
    var opened = options.style.display == 'none';

    if (opened) {
        options.style.display = 'block';
        select.classList.add('opened');
        select.classList.remove('closed');
    } else {
        options.style.display = 'none';
        select.classList.add('closed');
        select.classList.remove('opened');
    }

}

function select(a, color, index) {
    console.log(color);
    var select = a.parentNode.parentNode;
    var options = a.parentNode;
    var colors = ['gold', 'silver', '#e5e4e2'];
    select.style.width = "";
    var widthOfA = a.getBoundingClientRect().width;
    options.style.width = "";
    select.innerHTML = a.innerHTML + ' <i class="fas fa-sort-down"></i>' + lists[index];
    setSelectWidth(widthOfA, select);
    select.style.color = color;


}

function setSelectWidth(a, select, options) {


    var captureWidth = a; //a.getBoundingClientRect().width ? a.getBoundingClientRect().width : document.getElementById('options').getBoundingClientRect().width;
    var width = select.getBoundingClientRect().width;

    var options = select.getElementsByTagName('div')[0];
    /* Strange thing. You can pass options, but it wont change the element of your chain any functions off of it.
       but select will. The only difference I see is the select was declared in the previous function as: a.parentNode.parentNode
       while options was declared: a.parentNode

     */
    if (captureWidth > width) {
        select.style.width = Math.ceil(captureWidth + 4) + 'px';
        options.style.width = Math.ceil(captureWidth + 4) + 'px';

    } else if (captureWidth <= width) {
        options.style.width = Math.ceil(width) + 'px';
        select.style.width = Math.ceil(width) + 'px';
        //select.style.width =  width + 4 + 'px';
    }

    console.log('captureWidth is ' + captureWidth);
    console.log('width is ' + width);
}

function setSelect() {

    var spans = document.getElementsByClassName('closed');
    console.log(spans);
    for (let i = 0; i < spans.length; i++) {
        var option = spans[i].getElementsByTagName('div')[0];
        option.style.width = "";
        option.style.display = 'block';
        setSelectWidth(option.getBoundingClientRect().width, spans[i], option);
        option.style.display = 'none';
    }



}
//////////////////////End of Tree of Life Code////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

//////////////////Show Case Code///////////////////////
/////////////////////////////////////////////////////////
function all(category) {
    var width = window.innerWidth * .20;
    var circle = document.getElementById(category).getElementsByClassName('circle');
    for (let i = 0; i < circle.length; i++) {
        circle[i].style.width = width + 'px';
        circle[i].style.height = width + 'px';
        circle[i].style['margin-left'] = (i * width / 2) + 'px';
    }
    var middle = (window.innerWidth / 2) - ((circle.length - 1) * width / 2) + (width / 2);
    console.log(window.innerWidth / 2);
    document.getElementById(category).getElementsByClassName('displayHolder')[0].style['margin-left'] = middle + 'px';
    document.getElementById(category).getElementsByClassName('displayHolder')[0].style.width = ((circle.length + 1) * (width / 2)) + 'px';
    document.getElementById(category).getElementsByClassName('displayHolder')[0].style.height = width + 'px';

    setHover(category);
}

function setHover(category) {
    var circle = document.getElementById(category).getElementsByClassName('circle');
    for (let i = 0; i < circle.length; i++) {

        circle[i].onmouseover = function() {
            var active = document.getElementById(category).getElementsByClassName('activeCircle')[0];
            if (this !== active) {
                this.style['margin-top'] = "-5%";
                this.style['z-index'] = '5';
                active.style['margin-top'] = "0%";
                active.style['z-index'] = active.getAttribute('data-layer');
                document.getElementById(category).getElementsByClassName('showCaseItemName')[0].innerHTML = this.dataset.name
            }
        };
        circle[i].onmouseleave = function() {
            var active = document.getElementById(category).getElementsByClassName('activeCircle')[0];
            this.style['margin-top'] = "0%";
            this.style['z-index'] = this.getAttribute('data-layer');
            document.getElementById(category).getElementsByClassName('activeCircle')[0].style['margin-top'] = "-5%";;
            document.getElementById(category).getElementsByClassName('showCaseItemName')[0].innerHTML = active.dataset.name;
        };

        circle[i].onclick = function() {
            var store = this.style['margin-left'];
            var active = document.getElementById(category).getElementsByClassName('activeCircle')[0];
            active.classList.remove('activeCircle');
            this.classList.add('activeCircle');
            this.style['margin-left'] = active.style['margin-left'];
            active.style['margin-left'] = store;



            setTimeout(function(a, b) {


                var clickedCircle = document.getElementById(category).getElementsByClassName(a.classList)[0];
                var currentlyActiveCircle = document.getElementById(category).getElementsByClassName(b.classList[0])[0];

                clickedCircle.style['z-index'] = b.getAttribute('data-layer');
                currentlyActiveCircle.style['z-index'] = a.getAttribute('data-layer');

                var store = clickedCircle.dataset.layer;
                clickedCircle.dataset.layer = b.getAttribute('data-layer');
                currentlyActiveCircle.dataset.layer = store;

                var storeId = a.classList.slice();
                clickedCircle.classList = b.classList;
                currentlyActiveCircle.classList = storeId;
            }, 350, this, active);
        };
    }
}
/////////////////////////////////////////End of Show Case Code////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////Raeki Stones Code////////////////////////
/////////////////////////////////////////////////////////////
window.onload = setSelect();

function setSpacers(category) {

    //Create a spacer, spacer creates a margin in front of the div floats
    //to center the containers
    var spacer = document.createElement("div");
    spacer.className = 'spacer';

    //Create a rowDivider, a div with a clear float
    var rowDivider = document.createElement("div");
    rowDivider.className = 'rowDivider';


    var allBoxes = document.getElementById(category).getElementsByClassName('shopBox');
    var items = [];
    for (let i = 0; i < allBoxes.length; i++) {
        items[i] = allBoxes[i].cloneNode(true);
        items[i].className = 'shopBox';
    }

    var width = allBoxes[0].getBoundingClientRect().width;
    var margin = Math.floor(document.documentElement.clientWidth * .02);
    var widthWithMargin = width + margin;
    var inARow = Math.floor(document.documentElement.clientWidth / widthWithMargin);
    var totalWidth;
    if (inARow >= items.length)
        totalWidth = items.length * widthWithMargin - margin;
    else
        totalWidth = inARow * widthWithMargin - margin;
    var spacerWidth = (document.documentElement.clientWidth - totalWidth) / 2;
    spacer.style.width = spacerWidth + 'px';
    var swindow = document.getElementById(category).getElementsByClassName('itemsHolder')[0];
    swindow.innerHTML = "";

    var inRow = 0;
    for (let i = 0; i < items.length; i++) {
        items[i].style['margin-left'] = margin + 'px';
        if (inRow == inARow) {
            swindow.appendChild(rowDivider.cloneNode(true));
            inRow = 0;
        }

        if (inRow == 0) {
            swindow.appendChild(spacer.cloneNode(true));
            items[i].classList.add('first');
        }
        swindow.appendChild(items[i]);
        inRow++;


    }
    document.getElementById(category).style.opacity = '1';
    console.log(spacerWidth);
}
//////////////////End Of Raeki Stones Code////////////////////////
/////////////////////////////////////////////////////////////////


//////////////////////Shop View Code//////////////////////////
//////////////////////////////////////////////////////////////

function sizeImg(parent) {

    var img = new Image();
    img.src = parent.getElementsByClassName('imageInfo')[0].getAttribute('data-src');
    img.onload = function(){
        console.log("width is ", this.width);
        console.log("heghit is " ,this.height)
        var a = parent.getElementsByClassName('itemPicture')[0];
        var aWidth = a.getBoundingClientRect().width;
        var aH = a.getBoundingClientRect().height;
        console.log(aH);
        console.log(aWidth);
        var maxWidth = aWidth; // Max width for the image
        var maxHeight = aH; // Max height for the image
        var ratio = 0; // Used for aspect ratio
        var width = this.width // Current image width
        var height = this.height; // Current image height

        // Check if the current width is larger than the max
        if (width > maxWidth) {
            ratio = maxWidth / width; // get ratio for scaling image

            height = height * ratio;
            width = width * ratio;
        }


        if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            width = width * ratio;
            height = height * ratio;
        }
        console.log("wait, what did this actually run");
        this.height = height * .97;
        this.width = width * .97;

        this.style['margin-top'] = (aH-this.height) / 2 + "px";
        a.append(this);
    }

}

function openShop(item)
{
    var a = item.getElementsByClassName('detailedItemView')[0];
    a.style.display = 'block';
    sizeImg(a);
}
function closeItemView(a,event)
{
    a.parentNode.style.display = 'none';
    event.stopPropagation();
}
