var thumbsContainer = null;
var thumbsArrowLeft = null;
var thumbsArrowRight = null;
var scrollTimerID = null;
var scrollDirection = null;
var toSubtract = 450;
var thumbWidth = 80;

var index = 0; // start @ first feature

var pic = Array();

function init()
{
  if(!thumbsContainer) 
  { 
    thumbsContainer = document.getElementById("thumbsContainer"); 
    thumbsArrowLeft = document.getElementById("arrow_left"); 
    thumbsArrowRight = document.getElementById("arrow_right"); 
  }
}

function scroll()
{
  init();
  if(scrollDirection == "right")
  {
    thumbsContainer.scrollLeft += 5;
  } else{
    thumbsContainer.scrollLeft -= 5;
  }
  checkArrows();
  scrollTimerID = setTimeout("scroll()", 10);
}

function checkArrows()
{
  thumbsArrowLeft.style.visibility = (thumbsContainer.scrollLeft > 0) ? "visible" : "hidden";
  thumbsArrowRight.style.visibility = (thumbsContainer.scrollLeft < thumbsContainer.scrollWidth - thumbsContainer.clientWidth) ? "visible" : "hidden";
}

function scrollStart(direction)
{
  scrollDirection = direction;
  scrollTimerID = setTimeout("scroll()", 10);
}

function scrollStop()
{
  clearTimeout(scrollTimerID);
}

function parentOffset(obj) {
  var x = obj.offsetLeft;
  while (obj = obj.offsetParent) { x += obj.offsetLeft; }
  return x
} 
// Moves the Thumbs if one is selected outside of the container
function moveThumbs()
{
  var thumbLocation = parentOffset(document.getElementById("thumb_"+imgID)) - toSubtract;
  var maxScrollWidth = thumbsContainer.offsetWidth + thumbsContainer.scrollLeft - thumbWidth;
  if(thumbLocation > maxScrollWidth) { thumbsContainer.scrollLeft = thumbLocation - thumbsContainer.offsetWidth + (thumbWidth +(thumbWidth/2)); }
  if(thumbLocation < thumbsContainer.scrollLeft) { thumbsContainer.scrollLeft = thumbLocation - (thumbWidth/2); }
  checkArrows();
  //debug("<br />thumbLocation=" + thumbLocation + "<br />maxScrollWidth=" + maxScrollWidth + "<br />"+document.getElementById("thumb_"+imgID).offsetWidth);
}

function showTheImage(image, imgid)
{
  init();
  document.getElementById("thumb_"+imgID).className = "";
  curImage = image;
  imgID = imgid;  
  document.getElementById("thumb_"+imgID).className = "cur";
  moveThumbs();
}

function debug(str) {
  var text = "";
  text += "Scrollwidth = " +thumbsContainer.scrollWidth + "<br>";
  //document.getElementById("thumb_"+curImage).offsetLeft
  text += "thumbsContainer.offsetWidth = " +thumbsContainer.offsetWidth + "<br>";
  text += "SrcollLeft = " + thumbsContainer.scrollLeft + "<br>";
  text += str + "<br>";
  
  document.getElementById("debug").innerHTML = text;
}

function toggle_army(army) {
	if ( army == "gdf" ) {
		document.getElementById('content-gdf').style.display = '';
		document.getElementById('content-strogg').style.display = 'none';
	} else {
		document.getElementById('content-gdf').style.display = 'none';
		document.getElementById('content-strogg').style.display = '';
	}
}
