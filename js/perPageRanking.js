
var barWidth = 200;

var reorganizedLocationList;


/*
z-index manager

Box Back 10000
Box Front 20000
Box Labels 30000

*/

function perPageRanking(){
	
	// Create Main and Footer Div for Contents

	$('#content').append('<div id="main"><div class="rankingBoxContainer"></div></div>');

	// rearrange
	reorganizeLocation();

	for(var i=0; i<_locationCounts; i++){

		// Create Ranking Boxes
		$('.rankingBoxContainer').append('<div id="rankingBox'+String(i)+'" class="rankingBox" data-box-id="'+i+'" data-location-id="'+ parseInt(reorganizedLocationList[i].locationID)+'"><div class="rankingBoxBack"></div><div class="rankingBoxFront" style="height:0px; margin-top:'+String($(window).height() * 0.4 + 100)+'px"></div><div class="rankingLocationName"></div><div class="rankingLocationNumber">'+(i+1)+'</div><div class="rankingLocationScore">4.6</div></div>');
		
		

		// Add click functions
		$('#rankingBox'+String(i)).click(function(){
			updateSelectedLocation($(this).data('location-id'));

		});
	}


	// Adjusting Ranking Scores
	animateRankingScore();

	// adjust color for tab
	animateColor();

	// adjust size
	adjustSizePerPage();

	// initialize scroll event
	initEventListener();
}


function animateColor(){
	$('.rankingBox .rankingBoxFront').css({'background-color':'rgba('+_baseDataJSON.tagList[_currentTab].tagColor.r+','+_baseDataJSON.tagList[_currentTab].tagColor.g+','+_baseDataJSON.tagList[_currentTab].tagColor.b+',1)'});
}

// -- Resize Functions REQUIRED;
// -- Resize Functions ;
function adjustSizePerPage(){

	animateBarSize(400);

}

function animateBarSize(speed){

	$('[CLASS="rankingBoxContainer"]').css({'width':(_locationCounts) * barWidth + 'px'});

	for(var i=0; i<_locationCounts; i++){

		// -- Adjusting Ranking Box Size

		// Assign different attributes depending if selected or not.
		var heightBack, heightFront, width, marginTopBack, marginTopFront, marginLeft, zIndex, bgColor;
		
		if(parseInt(reorganizedLocationList[i].locationID) === _currentLocationID){
			heightBack = ($(window).height() * 0.4 + 120)+'px';
			heightFront = (0.2*_perPageDataJSON[0].rankings[_currentTab].ranking[i].tagScore * $(window).height() * 0.4 + 120)+'px';
			width = (barWidth + 20) + 'px';
			marginTopBack = '90px';
			marginTopFront = (0.2*(5-_perPageDataJSON[0].rankings[_currentTab].ranking[i].tagScore) * $(window).height() * 0.4 + 90)+'px';
			marginLeft = '-10px';
			zIndex = 20000 + i;
			bgColor = 'rgba(255,255,255,.7)';

		}else{
			heightBack = ($(window).height() * 0.4 + 100)+'px';
			heightFront = (0.2*_perPageDataJSON[0].rankings[_currentTab].ranking[i].tagScore * $(window).height() * 0.4 + 100)+'px';
			width = barWidth + 'px';
			marginTopBack = '100px';
			marginLeft = '0px';
			marginTopFront = (0.2*(5-_perPageDataJSON[0].rankings[_currentTab].ranking[i].tagScore) * $(window).height() * 0.4 + 100)+'px';
			zIndex = 10000 + i;
			bgColor = 'rgba(0,0,0,0.1)';
		}

		// Animate
		$('#rankingBox'+String(i)).find('.rankingBoxBack').animate({
			'height': heightBack,
			'width': width, 
			'margin-top': marginTopBack,
			'margin-left': marginLeft
		}, speed);
		$('#rankingBox'+String(i)).find('.rankingBoxFront').animate({
			'height': heightFront,
			'width': width,
			'margin-top': marginTopFront,
			'margin-left': marginLeft
		}, speed);
		

		
		// Adjusting Location Name

		$('#rankingBox'+String(i)).find('.rankingLocationName').html(reorganizedLocationList[i].locationName);
		//$('#rankingBox'+String(i)).find('.rankingLocationName').html($('#rankingBox'+String(i)).data('location-id') );


		
		//$('#rankingBox'+String(i)).find('.rankingScore').html(_perPageDataJSON[0].rankings[_currentTab].ranking[i].tagScore);

		// z-index Manager
		$('#rankingBox'+String(i)+ ' .rankingBoxBack').css({'background-color' : bgColor});
		$('#rankingBox'+String(i)+ ' .rankingBoxBack, #rankingBox'+String(i)+ ' .rankingBoxFront').css({'z-index' : zIndex});
		$('.rankingLocationName, .rankingLocationNumber, .rankingLocationScore').css({'z-index': (30000 + i) });
	}


	// -- check if the slide is outside of the page or not.
	var myPos = _currentLocationNumb * barWidth + $('.rankingBoxContainer').offset().left;
	if(myPos < 0 ||  myPos > $(window).width() - barWidth){
		animteSlideToAdjust(myPos, _currentLocationNumb * barWidth);
	}

}

function animteSlideToAdjust(myPos, p){
	var targetPos = ($(window).width()/2 - p);
	if(targetPos < -1 * ($('.rankingBoxContainer').width() - $(window).width()) ) {
      	targetPos =  -1 * ($('.rankingBoxContainer').width() - $(window).width());
	}else if(targetPos > 0){
      	targetPos = 0;
    }

	$('.rankingBoxContainer').stop().animate({'left': targetPos+'px'},400);
}

function animateRankingScore(){

	for(var i=0; i<_locationCounts; i++){
	
		var start, goal;
		if(_pastTab === ""){
				start = 0;
			}else{
				start = parseFloat(_perPageDataJSON[0].rankings[_pastTab].ranking[i].tagScore);
			}

		$('#rankingBox'+String(i)).find('.rankingLocationScore').countTo({
							from: start,
							to: parseFloat(_perPageDataJSON[0].rankings[_currentTab].ranking[i].tagScore),
							decimals: 1,
							speed: 200,
							refreshInterval: 3
						});
	}

}


// -- Resize Functions;
// -- Resize Functions;


// -- Scroll Functions;
// -- Scroll Functions;

function initEventListener(){


	var mouseWheel = true;
	var targetPos = $('.rankingBoxContainer').offset().left;

	$('.rankingBoxContainer').mousewheel(function (event) {

      	targetPos += event.deltaY * 4;
      	if(targetPos <  -1 * ($('.rankingBoxContainer').width() - $(window).width())){
      		targetPos =  -1 * ($('.rankingBoxContainer').width() - $(window).width());
      	}
      	if(targetPos > 0){
      		targetPos =  0;
      	}

         $('.rankingBoxContainer').stop().animate({
	            'left': targetPos+'px'
	        }, 2 * Math.abs(event.deltaY));
    	
    	event.preventDefault();

 	});


}

// -- Scroll Functions;
// -- Scroll Functions;

// -- Create Ranking Location Array Functions;
// -- Create Ranking Location Array Functions;
function reorganizeLocation(){

	//console.log(reorganizedLocationList);
	reorganizedLocationList = [];

	var counter = 0;
	for(var i=0; i<_locationCounts; i++){
		var j=0;
		while(j<_locationCounts){
			if(_perPageDataJSON[0].rankings[_currentTab].ranking[i].locationID === _locationList[j].locationID){
				reorganizedLocationList.push(_locationList[j]);
				j = _locationCounts;
			}else{
				j++;
			}
			
			
		}
	}
	//console.log(reorganizedLocationList);
	for(var i=0; i<_locationCounts; i++){

		$('#rankingBox'+String(i)).data('location-id', parseInt(reorganizedLocationList[i].locationID));
	}
		

}
// -- Create Ranking Location Array Functions;
// -- Create Ranking Location Array Functions;




// -- REQUIRED FUNCTIONS
// -- REQUIRED FUNCTIONS

function updateSelectedLocation(n){
	
	_currentLocationID = n;
	_currentLocationNumb = checkLocationNumberFromID(_locationList, n);

	animateFooter();

	// -- change the barsizes
	animateBarSize(100);
	// may requiring to slide bars
}

function updateSelectedFilter(){

	// reconfigure 
	reorganizeLocation();

	animateRankingScore();
	animateColor();
	animateBarSize(400);

}

