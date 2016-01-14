// JavaScript Document

var _baseDataJSON, _perPageDataJSON;
var _regionCounts, _locationCounts;

var _currentRegion = "", _currentLocation = "", _currentCategory = "", _pastTab = "", _currentFilterObject = {};

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

		loadDataJSON('json/ranking.json');
		
		init();
	}


	function loadDataJSON(url){

		/*$.ajax({
		  type: 'GET',
		  url: url,
		  dataType: 'json',
		  success: function(json){
			loadedBaseJSON(json);
		  }
		  
		});*/
		$.get(url, function(data){
			var json = $.parseJSON(data);
			loadedDataJSON(data);
		});

	}

	function loadedDataJSON(json){

		_perPageDataJSON = json;


		/*
		*
		*
		*/
		_currentTab = parseInt(_tagList[Math.floor(Math.random()*_tagList.length)].tagID);
		_currentFilterObject.id = _currentTab;
		_currentLocation = parseInt(_locationList[Math.floor(Math.random()*_locationList.length)].locationID);
		_currentFilterObject.location = _currentLocation ;
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
		
		console.log( _baseDataJSON.clientData.clientLogoImage);
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