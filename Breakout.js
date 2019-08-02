var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d")
var healthTotal = 0
var ballX = canvas.width/2
var ballY = canvas.height-30
var ballDirectionX = -6
var ballDirectionY = -6
var ballRadius = 10
var paddleHeight = 12
var paddleWidth = 100
var paddleX = (canvas.width-paddleWidth) / 2
var rightPressed = false
var leftPressed = false
var brickRowCount = 3
var brickColumnCount = 4
var brickWidth = 90
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 120
var brickOffsetLeft = 250
var score = 0
var lives = 20
var level = 1
var bricks = []
for (var c = 0; c < brickColumnCount; c++){
    bricks[c] = []
    for (var r = 0; r < brickRowCount; r++){
        if(r == 0){
        bricks[c][r] = { x: 0, y: 0, status: 1, health: 1}
        }
        else if (r == 1){
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 2}
        }
        else if (r == 2){
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 3}
        }
        else if (r == 3){
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 4}
        }
        else if (r == 4){
            bricks[c][r] = { x: 0, y: 0, status: 1, health: 5}
        }
        var b = bricks[c][r]
        healthTotal += b.health
    }
}

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)

function mouseMoveHandler(e){
   var relativeX = e.clientX - canvas.offsetLeft;
   if (relativeX > paddleWidth/2 && relativeX < canvas.width - paddleWidth/2){
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
    ctx.fillText("Lives: " + lives, 800, 20)
    ctx.fillStyle = "green"
    ctx.fillText("Level: " + level, 400, 20)
}

function average(array){
    var total = 0
    for (let i = 0; i < array.length; i++) {
        total += array[i]
    }
    return total / array.length

}

function collisionDetection(){
    for (var c = 0; c < brickColumnCount; c++){
        for (var r = 0; r < brickRowCount; r++){
            var b = bricks[c][r]
            if(b.status ==1){
            if (ballX > b.x && ballX < b.x +brickWidth && ballY > b.y && ballY < b.y + brickHeight){
                ballDirectionY = -ballDirectionY
                b.health -= 1
                healthTotal -=1
                if (b.health == 0){
                    b.status = 0
                    score += 1
                    console.log (ballDirectionX)
                    console.log (ballDirectionY)
                }
                if (healthTotal == 0){
                    alert ("LEVEL UP!")
                    levelUp()
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
                ballDirectionX = 5;
                ballDirectionY = -5;
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
                    ctx.fillStyle = "#F86D07"}
                if (b.health == 2){
                    ctx.fillStyle = "#FA9245"}
                if (b.health == 1){
                    ctx.fillStyle = "#FBB683"}
                    }
            else if (r == 3){
                if(b.health == 4){
                    ctx.fillStyle = "#C41020"}
                if (b.health == 3){
                    ctx.fillStyle = "#D34C58"}
                if (b.health == 2){
                    ctx.fillStyle = "#E28890"}
                if (b.health == 1){
                    ctx.fillStyle = "#E28890"}
                        }
            else if (r == 4){
                if (b.health == 5){
                    ctx.fillStyle = "#C734D5"}
                if (b.health == 4){
                    ctx.fillStyle = "#D567E0"}
                if (b.health == 3){
                    ctx.fillStyle = "#DC80E5"}
                if (b.health == 2){
                    ctx.fillStyle = "#E39AEA"}
                if (b.health == 1){
                    ctx.fillStyle = "#EAB3EF"}
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
    ctx.fillStyle = "black"
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

function levelUp(){
    level +=1
    brickColumnCount +=1
    brickRowCount += 1
    brickOffsetLeft -= 50
    ballDirectionX -= 1
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
            else if (r == 3){
                bricks[c][r] = { x: 0, y: 0, status: 1, health: 4}
            }
            else if (r == 4){
                bricks[c][r] = { x: 0, y: 0, status: 1, health: 5}
            }
        var b = bricks[c][r]
        healthTotal += b.health
        }
    }
    draw()
}

