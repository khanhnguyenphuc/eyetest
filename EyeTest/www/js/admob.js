
	var admobid = {};
	if( /(android)/i.test(navigator.userAgent) ) { 
		admobid = { // for Android
			banner: 'ca-app-pub-7929022213809701/7448744078',
			interstitial: 'ca-app-pub-7929022213809701/5972010874'
		};
	} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
		admobid = { // for iOS
			banner: 'ca-app-pub-7929022213809701/2555727274',
			interstitial: 'ca-app-pub-7929022213809701/4032460477'
		};
	} else {
		admobid = { // for Windows Phone
			banner: 'ca-app-pub-7929022213809701/6076100079',
			interstitial: 'ca-app-pub-7929022213809701/5509193677'
		};
	}
    
    function initAd(){
        var defaultOptions = {
            // bannerId: admobid.banner,
            // interstitialId: admobid.interstitial,
            adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: 'black', // color name, or '#RRGGBB'
            // x: integer,		// valid when set position to 0 / POS_XY
            // y: integer,		// valid when set position to 0 / POS_XY
            isTesting: true, // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        };
        AdMob.setOptions( defaultOptions );
        
        registerAdEvents();
    }
    // optional, in case respond to events or handle error
    function registerAdEvents() {
        document.addEventListener('onAdFailLoad', function(data){
            console.log(data);
        });
        document.addEventListener('onAdLoaded', function(data){});
        document.addEventListener('onAdPresent', function(data){});
        document.addEventListener('onAdLeaveApp', function(data){});
        document.addEventListener('onAdDismiss', function(data){});
    }
var createBanner = function() {
    if (AdMob)
        AdMob.createBanner( {
            adId: admobid.banner, 
            position: AdMob.AD_POSITION.BOTTOM_CENTER, 
            autoShow: true
        } );
};
var createInterstitial = function() {
    // prepare at beginning of a game level
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: false
    });
};
