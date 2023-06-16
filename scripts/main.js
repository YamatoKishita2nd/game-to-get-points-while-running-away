'use strict';

{
  let count = 20;
  let point = 0;
  let pointRate = 1;

  document.getElementById("timer").innerHTML = '残り時間：' + count;

  let countdown = function() {
    count = count - 1;
    document.getElementById("timer").innerHTML = '残り時間：' + count;
    if (count === 0) {
      clearInterval(countdownVal);
      clearInterval(updateEnemyVal);
      clearInterval(updateBallVal);
      clearInterval(updatePointVal);

      if (document.addEventListener) {
        document.removeEventListener("mousemove", mouseMove);
      } else if (document.attachEvent) {
        document.detachEvent("onmousemove", mouseMove);
      }
    }
  }
  let countdownVal = setInterval(countdown, 1000);

  let Character = function() {
    this.image = new Image();
    this.image.style.position = "fixed";
  }

  let Player = function() {
    Character.apply(this, arguments);
    this.x = 0;
    this.y = 0;
    this.image.src = "images/shinsyakaijin_run_man2.png";
  }

  let Enemy = function() {
    Character.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/company_character_black.png";
  }

  Player.prototype = new Character;
  Enemy.prototype = new Character;

  Enemy.prototype.update = function(){
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if (this.x < 0 || this.x > window.innerWidth - this.image.width) {
      this.x = this.x - this.dx;
      this.dx *= -1;
    }
    if (this.y < 0 || this.y > window.innerHeight - this.image.height) {
      this.y = this.y - this.dy;
      this.dy *= -1;
    }
    this.image.style.left = this.x + "px";
    this.image.style.top = this.y + "px";
    if ((Math.abs(player.x - this.x) < player.image.width) && (Math.abs(player.y - this.y) < player.image.height)) {
      gameover();
    }
  }

  let Ball = function() {
    this.image = new Image();
    this.image.style.position = "fixed";
    this.update = function() {
      this.x = this.x + this.dx;
      this.y = this.y + this.dy;
      if (this.x < 0 || this.x > window.innerWidth - this.image.width) {
        this.x = this.x - this.dx;
        this.dx *= -1;
      }
      if (this.y < 0 || this.y > window.innerHeight - this.image.height) {
        this.y = this.y - this.dy;
        this.dy *= -1;
      }
      this.image.style.left = this.x + "px";
      this.image.style.top = this.y + "px";
      if ((Math.abs(player.x - this.x) < player.image.width) && (Math.abs(player.y - this.y) < player.image.height)) {
        this.x = -100;
        addPoint(this.point);
      }
    }
  }

  function addPoint(p){
    point += p * pointRate;
    document.getElementById("point").innerHTML = 'ポイント：' + point;
  }

  let GoldBall = function() {
    Ball.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/gold.png";
    this.point = 3;
  }
  let SilverBall = function() {
    Ball.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/silver.png";
    this.point = 2;
  }
  let OrangeBall = function() {
    Ball.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/orange.png";
    this.point = 1;
  }
  let PurpleBall = function() {
    Ball.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/purple.png";
    this.point = -1;
  }
  let BrownBall = function() {
    Ball.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/brown.png";
    this.point = -2;
  }
  let BlackBall = function() {
    Ball.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/black.png";
    this.point = -3;
  }

  GoldBall.prototype = new Ball;
  SilverBall.prototype = new Ball;
  OrangeBall.prototype = new Ball;
  PurpleBall.prototype = new Ball;
  BrownBall.prototype = new Ball;
  BlackBall.prototype = new Ball;

  let Point = function() {
    this.image = new Image();
    this.image.style.position = "fixed";
    this.update = function() {
      this.x = this.x + this.dx;
      this.y = this.y + this.dy;
      if (this.x < 0 || this.x > window.innerWidth - this.image.width) {
        this.x = this.x - this.dx;
        this.dx *= -1;
      }
      if (this.y < 0 || this.y > window.innerHeight - this.image.height) {
        this.y = this.y - this.dy;
        this.dy *= -1;
      }
      this.image.style.left = this.x + "px";
      this.image.style.top = this.y + "px";
      if ((Math.abs(player.x - this.x) < player.image.width) && (Math.abs(player.y - this.y) < player.image.height)) {
        this.x = -100;
        changePointRate(this.pointRate);
      }
    }
  }

  function changePointRate(r) {
    pointRate = r;
  }

  let OneTimesPoint = function() {
    Point.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/point_1.png";
    this.pointRate = 1;
  }
  let TwicePoint = function() {
    Point.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/point_2.png";
    this.pointRate = 2;
  }
  let ThreeTimesPoint = function() {
    Point.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/point_3.png";
    this.pointRate = 3;
  }
  let FiveTimesPoint = function() {
    Point.apply(this, arguments);
    this.x = Math.floor(Math.random() * window.innerWidth - this.image.width);
    this.y = Math.floor(Math.random() * window.innerHeight - this.image.height);
    this.dx = Math.floor(Math.random() * 11) - 5;
    this.dy = Math.floor(Math.random() * 11) - 5;
    this.image.src = "images/point_5.png";
    this.pointRate = 5;
  }

  OneTimesPoint.prototype = new Point;
  TwicePoint.prototype = new Point;
  ThreeTimesPoint.prototype = new Point;
  FiveTimesPoint.prototype = new Point;

  let player;
  let enemy = new Array(5);
  let goldBalls = new Array(10);
  let silverBalls = new Array(10);
  let orangeBalls = new Array(10);
  let purpleBalls = new Array(10);
  let brownBalls = new Array(10);
  let blackBalls = new Array(10);
  let oneTimesPoints = new Array(2);
  let twicePoints = new Array(2);
  let threeTimesPoints = new Array(2);
  let fiveTimesPoints = new Array(2);

  player = new Player();
  document.body.appendChild(player.image);

  for (let i = 0; i < enemy.length; i++){
    enemy[i] = new Enemy();
    document.body.appendChild(enemy[i].image);
  }

  for (let i = 0; i < goldBalls.length; i++) {
    goldBalls[i] = new GoldBall();
    document.body.appendChild(goldBalls[i].image);
  }
  for (let i = 0; i < silverBalls.length; i++) {
    silverBalls[i] = new SilverBall();
    document.body.appendChild(silverBalls[i].image);
  }
  for (let i = 0; i < orangeBalls.length; i++) {
    orangeBalls[i] = new OrangeBall();
    document.body.appendChild(orangeBalls[i].image);
  }
  for (let i = 0; i < purpleBalls.length; i++) {
    purpleBalls[i] = new PurpleBall();
    document.body.appendChild(purpleBalls[i].image);
  }
  for (let i = 0; i < brownBalls.length; i++) {
    brownBalls[i] = new BrownBall();
    document.body.appendChild(brownBalls[i].image);
  }
  for (let i = 0; i < blackBalls.length; i++) {
    blackBalls[i] = new BlackBall();
    document.body.appendChild(blackBalls[i].image);
  }

  for (let i = 0; i < oneTimesPoints.length; i++) {
    oneTimesPoints[i] = new OneTimesPoint();
    document.body.appendChild(oneTimesPoints[i].image);
  }
  for (let i = 0; i < twicePoints.length; i++) {
    twicePoints[i] = new TwicePoint();
    document.body.appendChild(twicePoints[i].image);
  }
  for (let i = 0; i < threeTimesPoints.length; i++) {
    threeTimesPoints[i] = new ThreeTimesPoint();
    document.body.appendChild(threeTimesPoints[i].image);
  }
  for (let i = 0; i < fiveTimesPoints.length; i++) {
    fiveTimesPoints[i] = new FiveTimesPoint();
    document.body.appendChild(fiveTimesPoints[i].image);
  }

  let updateEnemy = function() {
    for (let i = 0; i < enemy.length; i++){
      enemy[i].update();
    }
  }
  let updateEnemyVal = setInterval(updateEnemy, 10);

  let updateBall = function() {
    for (let i = 0; i < goldBalls.length; i++){
      goldBalls[i].update();
    }
    for (let i = 0; i < silverBalls.length; i++){
      silverBalls[i].update();
    }
    for (let i = 0; i < orangeBalls.length; i++){
      orangeBalls[i].update();
    }
    for (let i = 0; i < purpleBalls.length; i++){
      purpleBalls[i].update();
    }
    for (let i = 0; i < brownBalls.length; i++){
      brownBalls[i].update();
    }
    for (let i = 0; i < blackBalls.length; i++){
      blackBalls[i].update();
    }
  }
  let updateBallVal = setInterval(updateBall, 10);
  
  let updatePoint = function() {
    for (let i = 0; i < oneTimesPoints.length; i++){
      oneTimesPoints[i].update();
    }
    for (let i = 0; i < twicePoints.length; i++){
      twicePoints[i].update();
    }
    for (let i = 0; i < threeTimesPoints.length; i++){
      threeTimesPoints[i].update();
    }
    for (let i = 0; i < fiveTimesPoints.length; i++){
      fiveTimesPoints[i].update();
    }
  }
  let updatePointVal = setInterval(updatePoint, 10);

  function mouseMove(e) {
    player.x = (e.clientX - player.image.width / 2) ;
    player.y = (e.clientY - player.image.height / 2) ;
    player.image.style.left = player.x + "px";
    player.image.style.top  = player.y + "px";
  }

  if (document.addEventListener) {
    document.addEventListener("mousemove", mouseMove);
  } else if (document.attachEvent) {
    document.attachEvent("onmousemove", mouseMove);
  }

  function gameover(){
    clearInterval(countdownVal);
    clearInterval(updateEnemyVal);
    clearInterval(updateBallVal);
    clearInterval(updatePointVal);
    speak("ゲームオーバー");

    if (document.addEventListener) {
      document.removeEventListener("mousemove", mouseMove);
    } else if (document.attachEvent) {
      document.detachEvent("onmousemove", mouseMove);
    }
  }

  function speak(sentence){
    var ssu = new SpeechSynthesisUtterance();
    ssu.volume = 1;
    ssu.rate = 1;
    ssu.pitch = 1;
    ssu.text = sentence;
    ssu.lang = 'ja-JP';
    // ssu.lang = 'en-US';
    speechSynthesis.speak(ssu);
  }
}