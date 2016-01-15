


function checkLocationNumberFromID(arr1, id){
	var n;
	var i=0;
	

	while(i<arr1.length){

		if(parseInt(arr1[i].locationID) === id){
			n = i;
			i = arr1.length;
		}else{
			i++;
		}
	}

	return n;
}



function checkTagNumberFromID(arr1, id){
	var n;
	var i=0;
	

	while(i<arr1.length){

		if(parseInt(arr1[i].tagID) === id){
			n = i;
			i = arr1.length;
		}else{
			i++;
		}
	}

	return n;
}