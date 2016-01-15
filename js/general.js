// JavaScript Document

var _baseDataJSON, _perPageDataJSON = [];
var _regionCounts, _locationCounts;

var _currentRegionID = "", _currentRegionNumb = "", _currentLocationID = "", _currentLocationNumb = "", _currentCategory = "", _pastTab = "", _currentFilterObject = {};

var _locationList = [];
var _tagList = [];

$(document).ready(function(){
	

	function loadBaseJSON(){
		
		/*$.ajax({
		  type: 'GET',
		  url: 'http://ta-kuma.com/SIMMER/PLEY/ver1.01/json/base.json',
		  dataType: 'json',
		  success: function(json){
			loadedBaseJSON(json);
		  }
		  
		});*/
		$.get('json/base.json', function(data){
			var json = $.parseJSON(data);
			loadedBaseJSON(data);
		});
		
	}
	
	function loadedBaseJSON(json){
		
		_baseDataJSON = json;
		
		// --- location counts
		_locationCounts = 0;
		_regionCounts = _baseDataJSON.locationList.length;
		for(var i=0; i<_regionCounts; i++){
			for(var j=0; j<_baseDataJSON.locationList[i].locations.length; j++){
				_locationCounts++;
				_locationList.push(_baseDataJSON.locationList[i].locations[j]);
			}
		}

		// --- tag counts
		_tagList = _baseDataJSON.tagList;

		/*
		*
		*
		*/
		var jsonsToLoad = ['json/ranking.json', 'json/locationdetail.json'];
		/*
		*
		*
		*/
		loadDataJSON(jsonsToLoad, 0);
		
		init();
	}


	function loadDataJSON(url, n){

		/*$.ajax({
		  type: 'GET',
		  url: url,
		  dataType: 'json',
		  success: function(json){
			loadedBaseJSON(json);
		  }
		  
		});*/
		$.get(url[n], function(data){
			var json = $.parseJSON(data);
			loadedDataJSON(data, url, n);
		});

	}

	function loadedDataJSON(json, url, n){

		_perPageDataJSON.push(json);
		if(n<url.length-1){
			n++;
			loadDataJSON(url, n);
		}else{
			startPerPage();
		}
	}

	function startPerPage(){
		/*
		*
		*
		*/
		_currentTab = parseInt(_tagList[Math.floor(Math.random()*_tagList.length)].tagID);
		_currentFilterObject.id = _currentTab;
		_currentLocationNumb = Math.floor(Math.random()*_locationList.length);
		console.log(_currentTab);
		_currentLocationID = _locationList[_currentLocationNumb].locationID;
		_currentFilterObject.location = _currentLocationID ;
		/*
		*
		*
		*/


		//-- Ranking Page
		createCommonFooter1();
		perPageRanking();
	}


	function init(){

		createHeader();
		createBackground();

		adjustSize();
	}

	function createHeader(){

		//assign header user logo
		$('.userLogo').attr('src', _baseDataJSON.clientData.clientLogoImage);

	}


	function createBackground(){

		//assign background image
		$('#background').find('img').attr('src', _baseDataJSON.clientData.clientBGImage);
	}

	function adjustSize(){
		
		// Adjust Size for Footer
		animateFooter();

		// Adjust Size for Per Page Elements
		adjustSizePerPage();

	}

	var timer = false;
	$(window).resize(function() {
	    if (timer !== false) {
	        clearTimeout(timer);
	    }
	    timer = setTimeout(function() {
	        adjustSize();
	    }, 200);
	});

	loadBaseJSON();
});