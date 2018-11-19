

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
    var educationButton = document.createElement("div");
    educationButton.appendChild(document.createTextNode("Learn the deeper meaning"));
    educationButton.id = "education";
    educationButton.onclick = openEducation;
    shopWindow.appendChild(educationButton);
    shopWindow.appendChild(copyOfCategory);
    alignEducation();
    currentlyOn = copyOfCategory.id;
    // Run custom code depending on which window is to be displayed
    if (string == 'tol') {
        setSelect();
        
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
var currentlyOn = "tolCopy";

window.onresize = function() {
    alignEducation();
    if (window.innerHeight != orginalHeight || window.innerWidth != orginalWidth){
            if (!mobileCheck()){
                orginalWidth = window.innerWidth;
                orginalHeight = window.innerHeight;
                document.getElementById(currentlyOn).style.opacity = '0';
                clearTimeout(resizeTimer);
                if (heightDependantWindow)
                {
                    if (heightDependantWindow == "education")
                    {
                        resizeEducationWindow();
                    }           
                }
                resizeTimer = setTimeout(function() {
                    setSpacers(currentlyOn);
                    all(currentlyOn);
                }, 250);
        
            }
            if (heightDependantWindow)
            {
                if (heightDependantWindow == "education")
                {
                    resizeEducationWindow();
                }           
            }
    }
};

///////////////////////////////////////End of General Code///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////// Tree of Life Code ////////
////////////////////////////////
// a[0].outerHTML.replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/\s\s+/g, ' ');
/*var lists = ["<div id='options' class='optionsForTol' ><div style='color:gold' onclick=select(this,'gold',0)>Gold</div><div style='color:silver' onclick=select(this,'silver',0)>Silver</div><div onclick=select(this,'#e5e4e2',0) style='color:#e5e4e2'>Platnium</div></div>",
    "<div id='options' class='optionsForTol' ><div style='color:red' onclick=select(this,'red',1)>Granite</div><div style='color:silver' onclick=select(this,'silver',1)>Stone 2</div> <div onclick=select(this,'blue',1) style='color:#e5e4e2'>Stone 3</div></div>"
]; */

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

    alignEducation();

}
//////////////////////End of Tree of Life Code////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

//////////////////Show Case Code///////////////////////
/////////////////////////////////////////////////////////
function all(category) {
    if (category != "tolCopy"){
    var width = window.innerWidth * .20;
    var circleDivs = document.getElementById(category).getElementsByClassName('circle');
    var circle = [0,0,0,0,0];
    for (let i = 0;i < 5;i++)
    {
        circle[i] = circleDivs[i];
    }
    var mid;
    for (let i = 0;i < circle.length;i++)
    {
        if (circle[i].getAttribute('data-layer') == '3')
            mid = i;
    }
    for (let i = 0;i < 5;i++)
        console.log(circle[i]);

    console.log("------------------------------");
    if (mid != 2)
    {
        var tmp = circle[2];
        circle[2] = circle[mid];
        circle[mid] = tmp;
    }

    if (circle[0].getAttribute('data-layer') == circle[1].getAttribute('data-layer'))
    {
        var tmp = circle[1];
        circle[1] = circle[4];
        circle[4] = tmp;
    }
    if (circle[0].getAttribute('data-layer') > circle[1].getAttribute('data-layer'))
    {
        var tmp = circle[1];
        circle[1] = circle[0];
        circle[0] = tmp;
    }
    if (circle[3].getAttribute('data-layer') < circle[4].getAttribute('data-layer'))
    {
        var tmp = circle[4];
        circle[4] = circle[3];
        circle[3] = tmp;
    }
    for (let i = 0;i < 5;i++)
        console.log(circle[i]);
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
    else
    {
        document.getElementById('tolCopy').style.opacity = "1";
    }
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
var orginalWidth;
var orginalHeight;
window.onload = function(){
    var a = document.getElementsByClassName('optionsForTol');
    lists = [a[0].outerHTML.replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/\s\s+/g, ' '),a[1].outerHTML.replace(/(\r\n\t|\n|\r\t)/gm,"").replace(/\s\s+/g, ' ')]
    orginalWidth = window.innerWidth;
    orginalHeight = window.innerHeight;
    setSelect();
}

function setSpacers(category) {

    //Create a spacer, spacer creates a margin in front of the div floats
    //to center the containers
    if (category != "tolCopy"){
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
        console.log("appeneded");
        a.appendChild(this);
    }

}

function openShop(item)
{
    var a = item.getElementsByClassName('detailedItemView')[0];
    a.style.display = 'block';
    document.body.style.overflow = "hidden";
    sizeImg(a);
}
function closeItemView(a,event)
{
    a.parentNode.style.display = 'none';
    document.body.style.overflow = "auto";
    event.stopPropagation();
}

function alignEducation()
{
    var a = document.getElementById("education");
    var width = a.getBoundingClientRect().width;
    a.style['margin-left'] = document.documentElement.clientWidth/2 - (width/2) + "px";
}  

function openEducation()
{
    var div1 = document.createElement("div");
    div1.style.width = document.documentElement.clientWidth + "px";
    div1.style.height = window.innerHeight + "px";
    div1.style.background = "rgba(0,0,0,.13)"
    div1.style.position = "fixed";
    div1.style.top = "0";
    div1.style['z-index'] = 99;
    div1.className = "textInfoBoxWrapper";

    var div = document.createElement("div");
    div.style.width = document.documentElement.clientWidth * .95 + "px";
    div.style.height = window.innerHeight * .95 + "px";
    div.style['margin-left'] = (document.documentElement.clientWidth * .05)/2 + 'px';
    div.style.background = 'white';
    div.style.position = "fixed";
    div.style.top = 0;
    div.style['margin-top'] = (window.innerHeight * .05)/2 + "px";
    div.style['z-index'] = 100;
    div.style['border-radius'] = "5px";
    div.className = "textInfoBox";

    var close = document.createElement('div');
    close.innerHTML = "&#215";
    close.classList.add("closeItemView");
    close.classList.add('closeTextInfo');
    close.style.top = "2px";
    close.style.right = "2px";
    close.onclick = function(){document.getElementById('shopWindow').removeChild(div1);
    document.getElementById('shopWindow').removeChild(div);document.getElementById('shopWindow').removeChild(close); heightDependantWindow = false;}

    heightDependantWindow = "education";

    if (currentlyOn == "tolCopy")
    {
        div.innerHTML += document.getElementById('tolInfo').innerHTML;
    }
    
    document.getElementById('shopWindow').appendChild(div1);
    document.getElementById("shopWindow").appendChild(div);
    document.getElementById('shopWindow').appendChild(close);

} 

function resizeEducationWindow()
{
    var a = document.getElementsByClassName('textInfoBox')[0];
    var b = document.getElementsByClassName('textInfoBoxWrapper')[0];

    b.style.width = document.documentElement.clientWidth + "px";
    b.style.height = window.innerHeight + "px";

    a.style.width = document.documentElement.clientWidth * .95 + "px";
    a.style.height = window.innerHeight * .95 + "px";
    a.style['margin-left'] = (document.documentElement.clientWidth * .05)/2 + 'px';

}
function mobileCheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

/* dragging event for the itemview */
var dragX = false;
var dragY = false;
var element;
function startDrag(a,e)
{
    dragX = e.touches[0].clientX;
    dragY = e.touches[0].clientY;
    element = a;
    console.log(e);
}

function endDrag()
{
    dragX = false;
    dragY = false;
    element = null;
}

var lastScrollTop;
function calculateDiff(a,e)
{
    
  a.childNodes[1].classList.remove('canScroll');

    var height = a.getBoundingClientRect().height;
    height = document.documentElement.clientHeight - e.touches[0].clientY;
    a.style.height = height + 'px';
    console.log(height);
    
}
function stopFromScroll(a,event){
   
    console.log("scrolling has started on the paragraph");;
    event.stopPropagation();
    //a.parentNode.style['overflow-y'] = 'scroll';
    a.parentNode.classList.add('canScroll');
    lastScrollTop = a.parentNode.scrollTop;
    console.log('lastScrollTop is ' + lastScrollTop);
}

function reEnableScroll(a){
    console.log('touch ended');
    //a.parentNode.style['overflow-y'] = 'none';
    a.classList.remove('canScroll');
    console.log('overflow set to none here');
}
/*                                                  */
var heightDependantWindow = false;