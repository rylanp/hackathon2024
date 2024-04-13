// Get the computed style of the container element to access its color variable
var avatar_src = "'/profile/avatars/avatar1.png'";
var avatar_face_src = "/profile/faces/face1.png";
var avatar_color = "#fa70fc";
var rgb = hexToRgb(avatar_color);
var colors = ["#fa70fc", "#eb4b4b", "#4beb5e", "#4b78eb", "#d6eb4b", "#b64beb", "#eb904b"];
var faceimgs = [
    '/profile/faces/face1.png',
    '/profile/faces/face2.png',
    '/profile/faces/face3.png',
    '/profile/faces/face4.png',
    '/profile/faces/face5.png'
];
var avatarimgs = [
    '/profile/avatars/avatar1.png',
    '/profile/avatars/avatar2.png',
    '/profile/avatars/avatar3.png',
    '/profile/avatars/avatar4.png',
    '/profile/avatars/avatar5.png'
];

var color_parent = document.getElementById("colors");

for (let index = 0; index < colors.length; index++){
    var d = document.createElement("button");
    d.classList.add('avatar-option');
    d.style.backgroundColor = colors[index];
    color_parent.appendChild(d);
    d.addEventListener('click', function() {
        // Your click event handler code goes here
        var c = colors[index];
        console.log(c);
        avatar_color = c;
        rgb = hexToRgb(avatar_color);
        for (var x = 0; x < avatars.length; x++) {
            modifyImage(avatars[x]);
        }
    });
}

var character_parent = document.getElementById("character");
var avatars = [];
for (let index = 0; index < avatarimgs.length; index++){
    var d = document.createElement("button");
    d.classList.add('avatar-option');
    character_parent.appendChild(d);
    var image = document.createElement("img");
    image.classList.add('avatar-char');
    image.src = avatarimgs[index];
    d.appendChild(image);

    d.addEventListener('click', function() {
        // Your click event handler code goes here
        avatar_src = avatarimgs[index];
        setProfileImage(avatar_src, avatar_face_src);
        for (var x = 0; x < avatars.length; x++) {
            modifyImage(avatars[x]);
        }
    });
}

var face_parent = document.getElementById("face");
for (let index = 0; index < faceimgs.length; index++){
    var d = document.createElement("button");
    d.classList.add('avatar-option');
    face_parent.appendChild(d);
    var image = document.createElement("img");
    image.src = faceimgs[index];
    d.appendChild(image);

    d.addEventListener('click', function() {
        // Your click event handler code goes here
        avatar_face_src = faceimgs[index];
        setProfileImage(avatar_src, avatar_face_src);
        for (var x = 0; x < avatars.length; x++) {
            modifyImage(avatars[x]);
        }
    });
}



avatars = document.getElementsByClassName("avatar-char");

function setProfileImage(src, srcf){
    var character_parent = document.getElementById("avatar_img");
    character_parent.src = src;
    var face_parent = document.getElementById("face_img");
    face_parent.src = srcf;
}

function modifyImage(avatar) {
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
            pixels[i] = (rgb.r); // Red channel
            pixels[i + 1] = (rgb.g); // Green channel
            pixels[i + 2] = (rgb.b); // Blue channel
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
            modifyImage(avatars[i]);
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
    console.log(hex);
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



