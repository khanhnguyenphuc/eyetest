function sharePhoto(cb) {
     var imageLink;
    navigator.screenshot.save(function(error,res){
        if(error){
            console.log(error);
        }else{
            //For android
            imageLink = res.filePath;
            window.plugins.socialsharing.share(null, 'The subject','file://'+imageLink, 'https://play.google.com/store/apps/details?id=puka.eyetest.com');
            
           //For iOS
           //window.plugins.socialsharing.share(null,   null,imageLink, null)
        }
        if (cb) cb();
     },'jpg',50,'ScreenShot' + (new Date()).getTime());
}