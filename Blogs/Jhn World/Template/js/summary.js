var JhnSummary = {
    displayimages: true,
    imagePosition: 'left',
    Widthimg: 110,
    Heightimg: 110,
    noThumb: 'http://jhncode.googlecode.com/svn/trunk/Blogs/Jhn%20World/Template/images/no-thumb.jpg',
    SummaryWords: 600,
    wordsNoImg: 800,
    skipper: 0,
    DisplayHome: true,
    DisplayLabel: true
};



function removeHtmlTag(strx,chop){ 
	if(strx.indexOf("<")!=-1)
	{
		var s = strx.split("<"); 
		for(var i=0;i<s.length;i++){ 
			if(s[i].indexOf(">")!=-1){ 
				s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length); 
			} 
		} 
		strx =  s.join(""); 
	}
	chop = (chop < strx.length-1) ? chop : strx.length-2; 
	while(strx.charAt(chop-1)!=' ' && strx.indexOf(' ',chop)!=-1) chop++; 
	strx = strx.substring(0,chop-1); 
	return strx+'...'; 
}

function createSummaryAndThumb(pID){
	var div = document.getElementById(pID);
	var imgtag = "";
	var img = div.getElementsByTagName("img");
	var summ = JhnSummary.wordsNoImg;
	if(img.length>=1) {	
		imgtag = '<span style="float:left; padding:0px 10px 5px 0px;"><img src="'+img[0].src+'" style="width:'+JhnSummary.Widthimg+'px;height:'+JhnSummary.Heightimg+'px"/></span>';
		summ = JhnSummary.SummaryWords;
	}
	var sumhead = "<div class='tagger-inline'>";
	var tagger = document.getElementById('tag' + pID);
	if(tagger){	    
		var taggerLink = tagger.getElementsByTagName("a");
		if(taggerLink && taggerLink.length > 0)
			sumhead += "ON ";
		for (var i = 0; i < taggerLink.length; i++) {
			 sumhead += "<a href=" + taggerLink[i].href + " rel='tag'>"+ taggerLink[i].innerText +"</a>";
			 if(i == taggerLink.length - 2)
			   sumhead += " and ";
			 else if (i != taggerLink.length - 1)
			    sumhead += ", ";
		}
	    tagger.remove();
	}
	sumhead += "</div>";
	var summary = imgtag + sumhead + "<div style='text-align: justify'>" + removeHtmlTag(div.innerHTML,summ) + '</div>';
	div.innerHTML = summary;
}
