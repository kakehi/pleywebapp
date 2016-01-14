

function createCommonFooter1(){

	$('#content').append('<div id="footer"><div class="tagListContainer"></div></div>');



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
	}
}



function animateFooter(){
	for(var i=0; i<_tagList.length; i++){
		$('#tagTitleBox'+i).find('.tagTitleBoxInner').animate({'width':$(window).width() * 1/7, 'left':$(window).width() * 4/21 * i + $(window).width() * 1/21, 'top':($(window).height() * 0.4 + 300)+'px'});;
	}
}