var profile_image = document.getElementById('profile_image');

profile_image.onload = function(e){
console.log(e);
};

profile_image.onerror = function(e) {
    $("#profile_image").attr("src",'/images/members/no-image.png');
    console.log('not upload image');
};

