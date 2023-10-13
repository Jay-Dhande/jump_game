score = 0;
cross = true;



audio = new Audio('/mixkit-game-level-music-689.mp3');
audiogo = new Audio('/mixkit-arcade-space-shooter-dead-notification-272.wav');

setTimeout(() => {

    // audio.play()

}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        player = document.querySelector('.player');
        player.classList.add('jump');

        setTimeout(() => {
            player.classList.remove('jump')
        }, 700);
    }
    if (e.keyCode == 39) {
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = playerX + 50 + "px";
    }
    if (e.keyCode == 37) {
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = (playerX - 50) + "px";
    }

}



setInterval(() => {
    player = document.querySelector('.player');
    gameOver = document.querySelector('.gameOver');
    obstacle1 = document.querySelector('.obstacle1');

    dx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));
    console.log("player" ,dx , dy) ; 
    ox = parseInt(window.getComputedStyle(obstacle1, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle1, null).getPropertyValue('top'));
    console.log("obs" ,ox ,oy);
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    console.log(offsetX, offsetY)
    if (offsetX < 50 && offsetY < 45) {
        console.log("collision" ,offsetX, offsetY)
        gameOver.innerHTML = "Game Over - Reload to Play Again"
        obstacle1.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);

    }

    else if (offsetX < 75 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle1, null).getPropertyValue('animation-duration'));
            if(aniDur>1.8+'s'){
            newDur = aniDur - 0.1;
            }
            obstacle1.style.animationDuration = newDur + 's';

            console.log('New animation duration: ', newDur)

        }, 500);

    }

}, 10);



function updateScore(score) {

    scoreCont.innerHTML = "Your Score: " + score

}