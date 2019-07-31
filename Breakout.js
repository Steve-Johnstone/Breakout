var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
var ballX = canvas.width/2
var ballY = canvas.height-30
var ballDirectionX = -4
var ballDirectionY = -4
var ballRadius = 10
var paddleHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width-paddleWidth) / 2
var rightPressed = false
var leftPressed = false
var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30
var score = 0
var lives = 3
var bricks = []
for (var c = 0; c < brickColumnCount; c++){
    bricks[c] = []
    for (var r = 0; r < brickRowCount; r++){
        if(r ==0){
        bricks[c][r] = { x: 0, y: 0, status: 1, health: 1}
        }
        else if (r ==1){
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 2}
        }
        else if (r ==2){
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 3}
        }
    }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)

function mouseMoveHandler(e){
   var relativeX = e.clientX - canvas.offsetLeft;
   if (relativeX > 0 && relativeX < canvas.width){
       paddleX = relativeX - paddleWidth/2
   }
}

function keyDownHandler(e){
    if (e.key == "Right" || e.key =="ArrowRight"){
        rightPressed = true
    }
    else if (e.key == "Left"  || e.key == "ArrowLeft"){
        leftPressed = true
    }
}

function keyUpHandler(e){
    if (e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false
    }
    else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false
    }
}

function drawGameInfo(){
    ctx.font = "16px Arial"
    ctx.fillStyle = "#0095DD"
    ctx.fillText("Score: " + score, 8, 20)
    ctx.font = "16px Arial"
    ctx.fillStyle = "red"
    ctx.fillText("Lives: " + lives, 400, 20)
}

function collisionDetection(){
    for (var c = 0; c < brickColumnCount; c++){
        for (var r = 0; r < brickRowCount; r++){
            var b = bricks[c][r]
            if(b.status ==1){
            if (ballX > b.x && ballX < b.x +brickWidth && ballY > b.y && ballY < b.y + brickHeight){
                ballDirectionY = -ballDirectionY
                b.health -= 1
                if (b.health == 0){
                    b.status = 0
                    score += 1
                }
                if (score == brickRowCount*brickColumnCount){
                    alert ("YOU WIN!")
                    document.location.reload()
                }
            }
            }
        }
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall()
    drawBricks()
    drawPaddle()
    drawGameInfo()
    collisionDetection()
    ballX += ballDirectionX
    ballY += ballDirectionY
    if (ballX + ballDirectionX > canvas.width - ballRadius || ballX + ballDirectionX < ballRadius){
        ballDirectionX = -ballDirectionX
    }
    if (ballY + ballDirectionY < ballRadius){
        ballDirectionY = -ballDirectionY
    }
    else if (ballY + ballDirectionY > canvas.height - ballRadius){
        if(ballX> paddleX && ballX < paddleX + paddleWidth){
            ballDirectionY =- ballDirectionY 
        }
        else{
            lives -=1
            if(lives < 1) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                ballX = canvas.width/2;
                ballY = canvas.height-30;
                ballDirectionX = 4;
                ballDirectionY = -4;
                paddleX = (canvas.width-paddleWidth)/2;
            }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 9
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 9
    }
}
requestAnimationFrame(draw)
}

function drawBricks(){
    for (var c = 0; c < brickColumnCount; c++){
        for (var r = 0; r < brickRowCount; r++){
            if(bricks[c][r].status ==1){
            var brickX = (c*(brickWidth+brickPadding)) + brickOffsetLeft
            var brickY = (r*(brickHeight+brickPadding)) + brickOffsetTop
            var b = bricks[c][r]
            bricks [c][r].x = brickX
            bricks [c][r].y = brickY
            ctx.beginPath()
            ctx.rect(brickX, brickY, brickWidth, brickHeight)
            if (r == 0){
                ctx.fillStyle = "#341EBE"}
            else if (r == 1){
                if (b.health == 2){
                    ctx.fillStyle = "#5A4F9F"}
                if (b.health == 1){
                    ctx.fillStyle = "#7a72b2"}
                }
            else if (r == 2){
                    if(b.health == 3){
                        ctx.fillStyle = "#C41020"}
                    if (b.health == 2){
                        ctx.fillStyle = "#D34C58"}
                    if (b.health == 1){
                        ctx.fillStyle = "#E28890"}
                    }
                }
            ctx.fill ()
            ctx.closePath()
            }
        }
    }

function drawBall(){
    ctx.beginPath()
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = "#cc0033"
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
    ctx.fillStyle = "#0A490B"
    ctx.fill()
    ctx.closePath()
}

draw()