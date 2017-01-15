
var xDebug = true;

function xName(e) {
  if (!e) return e;
  else if (e.id && e.id != "") return e.id;
  else if (e.nodeName && e.nodeName != "") return e.nodeName;
  else if (e.tagName && e.tagName != "") return e.tagName;
  else return e;
}

function xParentChain(e,delim) {
  var lim=100, s = "", d = delim || "\n";
  while(e) {
    s += xName(e) + d;
    e = xParent(e);
    if (!lim--) break;
  }
  return s;
}

/* xGetElementsByClassName()
Returns an array of elements which are
descendants of parentEle and have tagName and clsName.
If parentEle is null or not present, document will be used.
if tagName is null or not present, "*" will be used.
*/
  
function xGetElementsByClassName(clsName, parentEle, tagName) {
  var elements = null;
  var found = new Array();
  var re = new RegExp('\\b'+clsName+'\\b');
  if (!parentEle) parentEle = document;
  if (!tagName) tagName = '*';
  if (parentEle.getElementsByTagName) {elements = parentEle.getElementsByTagName(tagName);}
  else if (document.all) {elements = document.all.tags(tagName);}
  if (elements) {
    for (var i = 0; i < elements.length; ++i) {
      if (elements[i].className.search(re) != -1) {
        found[found.length] = elements[i];
      }
    }
  }
  return found;
}

function xHasPoint(ele, iLeft, iTop, iClpT, iClpR, iClpB, iClpL) {
  if (iClpT==null){iClpT=iClpR=iClpB=iClpL=0;}
  else if (iClpR==null){iClpR=iClpB=iClpL=iClpT;}
  else if (iClpB==null){iClpL=iClpR; iClpB=iClpT;}
  var thisX = xPageX(ele), thisY = xPageY(ele);
  return (iLeft >= thisX + iClpL && iLeft <= thisX + xWidth(ele) - iClpR &&
  iTop >=thisY + iClpT && iTop <= thisY + xHeight(ele) - iClpB );
}
 /*
function xHasPoint(ele, iLeft, iTop, iClpT, iClpR, iClpB, iClpL) {
  if (arguments.length==3){iClpT=iClpR=iClpB=iClpL=0;}
  else if (arguments.length==4){iClpR=iClpB=iClpL=iClpT;}
  else if (arguments.length==5){iClpL=iClpR; iClpB=iClpT;}
  var thisX = xPageX(ele), thisY = xPageY(ele);
  return (iLeft >= thisX + iClpL && iLeft <= thisX + xWidth(ele) - iClpR &&
  iTop >=thisY + iClpT && iTop <= thisY + xHeight(ele) - iClpB );
}
*/

// end x_util.js
