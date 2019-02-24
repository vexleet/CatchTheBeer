window.onload = function () {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    let beerBoxX = canvas.width - canvas.height;
    let beerBoxY = canvas.height + 40;
    let beerBoxWidth = 60;
    let beerBoxHeight = 50;
    let buttonPressed = '';
    let beers = [{
        x: Math.floor(Math.random() * canvas.width),
        y: 0
    }];
    let score = 0;
    let lives = 3;

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function addBeer() {
        beers.push({
            x: Math.floor(Math.random() * canvas.width - 40),
            y: 0,
        });
    }

    function drawBeerBox() {
        let beerBox = new Image();
        beerBox.src = 'img/beer-box.png';
        ctx.drawImage(beerBox, beerBoxX, beerBoxY, beerBoxWidth, beerBoxHeight);
    }

    function updateBeer() {
        for (let i = 0; i < beers.length; i++) {
            let b = beers[i];
            b.y++;

            if (b.y >= canvas.height) {
                beers.splice(i, 1);
                lives--;
            }
            else if (b.y === beerBoxY - beerBoxHeight
                && b.x + beerBoxWidth >= beerBoxX
                && b.x - beerBoxWidth <= beerBoxX) {
                score += 100;
                beers.splice(i, 1);
            }

        }
    }

    function drawBeer() {
        for (let i = 0; i < beers.length; i++) {
            let beer = new Image();
            beer.src = 'img/beer.png';
            let b = beers[i];
            if (b.x <= 0) {
                b.x = 0;
            }
            if (b.x + 40 >= canvas.width) {
                b.x = canvas.width;
            }

            ctx.drawImage(beer, b.x, b.y, 50, 50);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!lives) {
            alert("GAME OVER");
            document.location.reload();
        }

        drawBeer();
        drawBeerBox();
        drawLives();
        drawScore();

        if (beers[beers.length - 1].y === 60) {
            addBeer();
        }

        if (buttonPressed === 'LEFT') {
            beerBoxX -= 5;
        }
        else if (buttonPressed === 'RIGHT') {
            beerBoxX += 5;
        }

        if (beerBoxX <= 0) {
            beerBoxX = 0;
        }
        if (beerBoxX + beerBoxWidth >= canvas.width) {
            beerBoxX = canvas.width - beerBoxWidth;
        }
        if (beerBoxY >= canvas.height) {
            beerBoxY = canvas.height - beerBoxHeight;
            beerBoxX = canvas.width / 2 - beerBoxWidth / 2;
        }

        requestAnimationFrame(draw);
        updateBeer();
    }

    document.addEventListener('keyup', keyUpHandler);
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function mouseMoveHandler(e) {
        let relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            beerBoxX = relativeX - beerBoxWidth / 2;

            if (beerBoxX <= 0) {
                beerBoxX = 0;
            }
            if (beerBoxX > canvas.width - beerBoxWidth) {
                beerBoxX = canvas.width - beerBoxWidth;
            }
        }
    }

    function keyDownHandler(e) {
        if (e.keyCode === 37) {
            buttonPressed = 'LEFT';
        }
        else if (e.keyCode === 39) {
            buttonPressed = 'RIGHT';
        }
    }

    function keyUpHandler(e) {
        if (e.keyCode === 37) {
            buttonPressed = '';
        }
        else if (e.keyCode === 39) {
            buttonPressed = ''
        }
    }

    draw();
}
