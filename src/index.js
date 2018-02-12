var haruConfig = {
    "model" : "./assets/haru/haru_01.moc",
    "textures" : [
        "assets/haru/haru_01.1024/texture_00.png",
        "assets/haru/haru_01.1024/texture_01.png",
        "assets/haru/haru_01.1024/texture_02.png"
    ]
};

var motions = [
    {
        "id" : "",
        "path" : "assets/haru/motions/idle_00.json"
    },
    {
        "id" : "",
        "path" : "assets/haru/motions/idle_01.json"
    },
    {
        "id" : "",
        "path" : "assets/haru/motions/idle_02.json"
    }
];

var canvas = document.getElementById("haru");

var audio = document.getElementById("audio");

var haru = null;

var musicPlayer = new MusicPlayer(audio);

var playing = false;

function initHaru() {
    
    haru = new Haru(haruConfig, canvas, function() {
        haru.subscribe(musicPlayer);
        haru.enableLookAtMouse();
        haru.setMotion(motionMgr.next(), true);

        canvas.addEventListener('click', function() {
            haru.setMotion(motionMgr.next(), true);
            if (playing == false) {
                audio.play();
                playing = true;
            }
        });
        animate();
    });
}






var motionMgr = new MotionManager(motions, initHaru);




function animate(seconds) {
    
    if (haru != null && haru.completed) {
        haru.setArmMode(0);
        haru.update(seconds);
        haru.draw();
    }

    var requestAnimationFrame = 
        window.requestAnimationFrame || 
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;

    requestAnimationFrame(animate);

}

