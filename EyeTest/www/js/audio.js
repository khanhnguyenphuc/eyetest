var listMedia = {};
function playSound(type, src) {
    // Media player
    if (listMedia[type]) {
    	listMedia[type].play(listMedia[type].stop());
    } else {
    	var mp3URL = getURL(src);
    	listMedia[type] = new Media(mp3URL);
    	listMedia[type].play(listMedia[type].stop());
    }
	    
}
function getURL(s) {
    if(cordova.platformId.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}