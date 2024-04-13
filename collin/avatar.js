var colors = ["#f56494", "#eb4b4b", "#4beb5e", "#4b78eb", "#d6eb4b", "#b64beb", "#eb904b"];

var main_color = sessionStorage.getItem("color");
if (main_color === null) {
    main_color = colors[1];
    sessionStorage.setItem("color", main_color);
}
var char_img = sessionStorage.getItem("char_img");
if (char_img === null) {
    char_img = "/profile/avatars/avatar1.png";
    sessionStorage.setItem("char_img", char_img);
}
var face_img = sessionStorage.getItem("face_img");
if (face_img === null) {
    face_img = "/profile/faces/face1.png";
    sessionStorage.setItem("face_img", face_img);
}
var prof_char = document.getElementById("profile_char");
var prof_face = document.getElementById("profile_face");
prof_char.src = char_img;
prof_face.src = face_img;
const avatars = document.getElementsByClassName("avatar-char");
// avatar-char, other img = face

function setProfileImage(src, srcf){
    var character_parent = document.getElementById("avatar_img");
    character_parent.src = src;
    var face_parent = document.getElementById("face_img");
    face_parent.src = srcf;
}

function modifyImage(avatar, color) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = avatar.width;
    canvas.height = avatar.height;
    ctx.drawImage(avatar, 0, 0, avatar.width, avatar.height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = imageData.data;
    for (var i = 0; i < pixels.length; i += 4) {
        // Multiply each pixel color channel by the corresponding channel of the multiply color
        if (pixels[i] != 0 && 0 != pixels[i + 1] && pixels[i + 2] != 0){
            pixels[i] = (color.r); // Red channel
            pixels[i + 1] = (color.g); // Green channel
            pixels[i + 2] = (color.b); // Blue channel
        }
    }
    ctx.putImageData(imageData, 0, 0);
    avatar.src = canvas.toDataURL();
}
var imagesLoaded = 0;
function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === avatars.length) {
        // All images are loaded, now modify them
        for (var i = 0; i < avatars.length; i++) {
            if (avatars[i].id === "profile_char"){
                modifyImage(avatars[i], hexToRgb(main_color));
            }else{
                modifyImage(avatars[i], hexToRgb(colors[i % colors.length]));
            }
        }
    }
}
for (var index = 0; index < avatars.length; index++) {
    var avatar = avatars[index];
    // Add onload event listener to each image
    avatar.onload = checkAllImagesLoaded;
    // If the image is already cached, onload might not trigger, so manually check if it's loaded
    if (avatar.complete && avatar.naturalWidth !== 0) {
        checkAllImagesLoaded();
    }
}
// Function to convert hex color to RGB
function hexToRgb(hex) {
    // Remove # symbol if present
    if (typeof hex === 'string' && hex.includes('#')) {
        // Remove # symbol if present
        hex = hex.replace('#', '');
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    } else if (typeof hex === 'string'){
        return {
            r: parseInt(hex.substring(0, 2), 16),
            g: parseInt(hex.substring(2, 4), 16),
            b: parseInt(hex.substring(4, 6), 16)
        };
    }
    return {
        r: 0,
        g: 0,
        b: 0
    };
}



