
var currentLocDemographicData;
var demographicDatas ;





function createCommonFooter1(){

	$('#content').append('<div id="footer"><div class="tagListContainer"></div></div>');

	//console.log(_perPageDataJSON[1].locationDetail[0]);
	demographicDatas = _perPageDataJSON[1].locationDetail;
	//console.log(demographicDatas[0].demographicData);
	// create footer element

	for(var i=0; i<_tagList.length; i++){
		$('#footer').append('<div class="tagTitleBox" id="tagTitleBox'+i+'" data-tag-id="'+i+'"><span class="tagTitleBoxInner">'+_tagList[i].tagName+'</span></div>');

		$('#tagTitleBox'+i).click(function(){
			
			_pastTab = _currentTab;
			_currentTab = $(this).data('tag-id');
			_currentFilterObject ={'id':_currentTab};

		    updateSelectedFilter();

		    updateFooter();

		});

		for(var j=0; j< demographicDatas[_currentLocationNumb].demographicData[i].demographicData.length + 2; j++){
			$('#tagTitleBox'+i).append('<div class="tagDemographicGraphs" id="tagDemographicGraphs'+j+'"><div class="tagDemographicGraphsBack"></div><div class="tagDemographicGraphsFront"></div></div>');

		}

	}

	updateFooter();
	animateFooter();
}



// -- update footer color according to current tag choice

function updateFooter(){
	
	var myOpacity;
	


	for(var i=0; i<_tagList.length; i++){
		
		if(i === _currentTab || _currentTab === ""){
			myOpacity = 1;
		}else{
			myOpacity = 0.2;
		}
		$('#tagTitleBox'+i).find('.tagTitleBoxInner').css({'background-color':'rgba('+_baseDataJSON.tagList[i].tagColor.r+','+_baseDataJSON.tagList[i].tagColor.g+','+_baseDataJSON.tagList[i].tagColor.b+','+myOpacity+')'});

		$('#tagTitleBox'+i).find('.tagDemographicGraphsFront').css({'background-color':'rgba('+_baseDataJSON.tagList[i].tagColor.r+','+_baseDataJSON.tagList[i].tagColor.g+','+_baseDataJSON.tagList[i].tagColor.b+','+myOpacity+')'});
	}
}



function animateFooter(){

	for(var i=0; i<_tagList.length; i++){
		$('#tagTitleBox'+i).animate({'left':$(window).width() * 4/21 * i + $(window).width() * 1/21, 'top':($(window).height() * 0.4 + 300)+'px'});
		$('#tagTitleBox'+i).find('.tagTitleBoxInner').animate({'width':$(window).width() * 1/7});

		for(var j=0; j< demographicDatas[_currentLocationNumb].demographicData[i].demographicData.length + 2; j++){
			$('#tagTitleBox'+i).find('#tagDemographicGraphs'+j).animate({'top':(j * 40 + 50)+'px', 'width':$(window).width() * 1/7 +'px'});
			
			// -- populate bar graph
			if(j< demographicDatas[_currentLocationNumb].demographicData[i].demographicData.length){
				// -- ages
				$('#tagTitleBox'+i).find('#tagDemographicGraphs'+j).find('.tagDemographicGraphsFront').animate({'width':$(window).width() * 1/7 * demographicDatas[_currentLocationNumb].demographicData[i].demographicData[j].overall +'px'});
			}else if(j === demographicDatas[_currentLocationNumb].demographicData[i].demographicData.length){
				// -- Male
				$('#tagTitleBox'+i).find('#tagDemographicGraphs'+j).find('.tagDemographicGraphsFront').animate({'width':$(window).width() * 1/7 * demographicDatas[_currentLocationNumb].demographicData[i].demographicData[0].male +'px'});
			}else{
				// -- Female
				$('#tagTitleBox'+i).find('#tagDemographicGraphs'+j).find('.tagDemographicGraphsFront').animate({'width':$(window).width() * 1/7 * demographicDatas[_currentLocationNumb].demographicData[i].demographicData[0].female +'px'});
			}

			$('#tagTitleBox'+i).find('#tagDemographicGraphs'+j).find('.tagDemographicGraphsBack').animate({'width':$(window).width() * 1/7 +'px'});
		}
	}
}