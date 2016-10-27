// Enable dnd for main dialog-box
var main = document.getElementById('main');
dragModal(main);
// create new dialog box
var create_modal = document.getElementById('create-dialog-box');
create_modal.onclick = function(e) {
	var modal = document.createElement("div");
	modal.className = "modal-content";
	var span = document.createElement("span");
	span.className = "close";
	span.innerHTML = 'x';
	closeModal(span); // enable closing dialog box
	modal.appendChild(span);
	var p = document.createElement("p");
	p.innerHTML = "Some text in the Modal..";
	modal.appendChild(p);
	var parrent = document.getElementById('myModal');
	parrent.appendChild(modal);
	dragModal(modal); // enable dnd dialog box
}
// remove dialog box if user click close
function closeModal(span) {
	span.onclick = function(event) {
		var parrent = event.target.parentNode;
		parrent.remove();
	}
}
// enable dnd for dialog box
function dragModal(modal) {
	modal.onmousedown = function(e) {
		// get coord
	  	var coords = getCoords(modal);
	  	var shiftX = e.pageX - coords.left;
	  	var shiftY = e.pageY - coords.top;

	  	modal.style.position = 'absolute';
	  	document.body.appendChild(modal);
	  	moveAt(e);

	  	modal.style.zIndex = 1000; // over other elements

	  	function moveAt(e) {
	    	modal.style.left = e.pageX - shiftX + 'px';
	    	modal.style.top = e.pageY - shiftY + 'px';
	  	}
	  	// if user move mouse after click
	  	document.onmousemove = function(e) {
	    	moveAt(e);
	  	};
	  	// if user mouse up
	  	modal.onmouseup = function() {
	    	document.onmousemove = null;
	    	modal.onmouseup = null;
	  	};
	}

	modal.ondragstart = function() {
		return false;
	};
}

// get coordinates after dnd
function getCoords(elem) { 
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };

}

