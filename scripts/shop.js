var lists = ["<div id='options'><div style='color:gold' onclick=select(this,'gold',0)>Gold</div><div style='color:silver' onclick=select(this,'silver',0)>Silver</div><div onclick=select(this,'#e5e4e2',0) style='color:#e5e4e2'>Platnium</div></div>",
          "<div id='options'> <div style='color:red' onclick=select(this,'red',1)>Granite</div><div style='color:silver' onclick=select(this,'silver',1)>Stone 2</div> <div onclick=select(this,'blue',1) style='color:#e5e4e2'>Stone 3</div> </div>"];
function toggle(select)
{
  var options = select.getElementsByTagName('div')[0];
  var opened = options.style.display == 'none';

  if (opened){
    options.style.display ='block';
    select.classList.add('opened');
    select.classList.remove('closed');
  }
  else{
    options.style.display ='none';
    select.classList.add('closed');
    select.classList.remove('opened');
  }

}

function select(a,color,index)
{
  console.log(color);
  var select = a.parentNode.parentNode;
  var options = a.parentNode;
  var colors = ['gold','silver','#e5e4e2'];
  select.style.width = "";
  var widthOfA =  a.getBoundingClientRect().width;
  options.style.width = "";
  select.innerHTML = a.innerHTML + ' <i class="fas fa-sort-down"></i>' + lists[index]; 
  setSelectWidth(widthOfA,select);
  select.style.color = color;
  
  
}

function setSelectWidth(a,select,options)
{ 
  

   var captureWidth = a; //a.getBoundingClientRect().width ? a.getBoundingClientRect().width : document.getElementById('options').getBoundingClientRect().width;
   var width = select.getBoundingClientRect().width;

   var options = select.getElementsByTagName('div')[0]; 
   /* Strange thing. You can pass options, but it wont change the element of your chain any functions off of it.
      but select will. The only difference I see is the select was declared in the previous function as: a.parentNode.parentNode
      while options was declared: a.parentNode

    */
   if (captureWidth > width)
   {
    select.style.width =  Math.ceil(captureWidth + 4) + 'px';
    options.style.width = Math.ceil(captureWidth + 4) + 'px';
  
  }
  else if (captureWidth <= width)
  {
    options.style.width = Math.ceil(width) + 'px';
    select.style.width =  Math.ceil(width) + 'px';
    //select.style.width =  width + 4 + 'px';
  }

  console.log('captureWidth is ' + captureWidth);
  console.log('width is ' + width);
}

function setSelect()
{

   var spans = document.getElementsByClassName('closed');
   console.log(spans);
   for (let i = 0 ;i < spans.length;i++)
    {
      var option = spans[i].getElementsByTagName('div')[0];
      option.style.width = ""; 
      option.style.display = 'block';
      setSelectWidth( option.getBoundingClientRect().width,spans[i],option);
      option.style.display = 'none';
    }
   

 
}

function show(string,clicked)
{
  var cats = document.getElementsByClassName('bar');
  for (let i = 0;i < cats.length;i++)
    cats[i].classList.remove('activeS');

  clicked.getElementsByClassName('bar')[0].classList.add('activeS');

  var sw = document.getElementById('shopWindow');
  shopWindow.innerHTML = "";
  var ele = document.getElementById(string).cloneNode(true);
  console.log(ele);
  ele.id += 'Copy';
  ele.classList.remove('hidden');
  shopWindow.appendChild(ele);
  if (string == 'tol')
    setSelect();
  if (string== 'rStones'){
    setSpacers();
    all();
  }
}
window.onload = setSelect();

function setSpacers()
{
  
  //Create a spacer, spacer creates a margin in front of the div floats
  //to center the containers
  var spacer = document.createElement("div");
  spacer.className = 'spacer';

  //Create a rowDivider, a div with a clear float
  var rowDivider = document.createElement("div");
  rowDivider.className = 'rowDivider';


  var allBoxes = document.getElementById('rStonesCopy').getElementsByClassName('shopBox');
  var items = [];
  for (let i = 0;i < allBoxes.length;i++){
    items[i] = allBoxes[i].cloneNode(true);
    items[i].className = 'shopBox';
  }
  /* doesnt work at width of 737 px and 476px */
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
  var swindow =  document.getElementById('itemsHolder');
  swindow.innerHTML = "";

  var inRow = 0;
  for (let i = 0; i < items.length;i++)
  {
    items[i].style['margin-left'] = margin + 'px';
    if (inRow == inARow){
      swindow.appendChild(rowDivider.cloneNode(true));
      inRow = 0;
    }
    
    if ( inRow == 0){
        swindow.appendChild(spacer.cloneNode(true));
        items[i].classList.add('first');
    }
    swindow.appendChild(items[i]);
     inRow++;
    

  }
  document.getElementById('rStonesCopy').style.opacity = '1';
  console.log(spacerWidth);
}
var resizeTimer;

window.onresize = function() {
  document.getElementById('rStonesCopy').style.opacity = '0';
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    setSpacers();
    all(); 
  }, 250);

};

/* for the showcase */
function all(){
var width = window.innerWidth * .20;
var circle = document.getElementById('rStonesCopy').getElementsByClassName('circle');
for (let i = 0;i < circle.length;i++){
  circle[i].style.width = width + 'px';
  circle[i].style.height = width + 'px';
  circle[i].style['margin-left'] = (i * width/2)  +'px';
}
var middle = (window.innerWidth/2) - ((circle.length-1)* width/2) + (width/2);
console.log(window.innerWidth/2);
document.getElementById('displayHolder').style['margin-left'] = middle + 'px';
document.getElementById('displayHolder').style.width = ((circle.length+1) * (width/2)) + 'px';
document.getElementById('displayHolder').style.height = width + 'px';

setHover();
}

function setHover()
{
  var circle = document.getElementById('rStonesCopy').getElementsByClassName('circle');
  for (let i = 0;i < circle.length;i++)
  {
    
    circle[i].onmouseover = function()
    {
      var active = document.getElementById('rStonesCopy').getElementsByClassName('activeCircle')[0];
      if (this !== active){
        this.style['margin-top'] = "-5%";
        this.style['z-index'] = '5';
        active.style['margin-top'] = "0%";
        active.style['z-index'] = active.getAttribute('data-layer');
        document.getElementById('showCaseItemname').innerHTML = this.dataset.name
      }
    };
    circle[i].onmouseleave = function()
    {
      var active = document.getElementById('rStonesCopy').getElementsByClassName('activeCircle')[0];
      this.style['margin-top'] = "0%";
      this.style['z-index'] = this.getAttribute('data-layer');
      document.getElementById('rStonesCopy').getElementsByClassName('activeCircle')[0].style['margin-top'] = "-5%";;
      document.getElementById('showCaseItemname').innerHTML = active.dataset.name;
    };

    circle[i].onclick = function()
    {
      var store = this.style['margin-left'];
      var active = document.getElementById('rStonesCopy').getElementsByClassName('activeCircle')[0];
      active.classList.remove('activeCircle');
      this.classList.add('activeCircle');
      this.style['margin-left'] = active.style['margin-left'];
      active.style['margin-left'] = store;

      

      setTimeout(function(a,b){
          
          document.getElementById(a.id).style['z-index'] = b.getAttribute('data-layer');
          document.getElementById(b.id).style['z-index'] = a.getAttribute('data-layer');

          var store = document.getElementById(a.id).dataset.layer;
          document.getElementById(a.id).dataset.layer = b.getAttribute('data-layer');
          document.getElementById(b.id).dataset.layer = store;

          var storeId = a.id;
          document.getElementById(a.id).id = b.id;
          document.getElementById(b.id).id = storeId;
      },350,this,active);
    };
  }
}

/* */