import Ship from "../assets/ship.png";
import "../styles/game.css";
import { useEffect, useRef, useState } from "react";
import GameScore from "./GameScore";
import Aliens from "./GameAliens.js";
import Invader1 from "../assets/aliens/invader1.png";
import Invader2 from "../assets/aliens/invader2.png";
import Invader3 from "../assets/aliens/invader3.png";
import Invader4 from "../assets/aliens/invader4.png";
import Invader5 from "../assets/aliens/invader5.png";
import { Grid } from "semantic-ui-react";

const TIMER_INTERVAL = 100;
let bulletId = 0;
let allFairedBullets = [];
let allEnemies = [];
let canFire = true;

const GameScreen = ({ props }) => {
  const [numberOfLives, setNumberOfLives] = useState(3);
  const [index, setIndex] = useState();
  const [rowNum, setRowNum] = useState(4);
  const [gameScore, setGameScore] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [topMargin, setTopMargin] = useState(3);
  const [invaders, setInvaders] = useState([]);

  useEffect(() => {
    initialzeKeyBindings();
    initAllEnemies();
  }, []);

  const initialzeKeyBindings = () => {
    document.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        moveLeft();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveRight();
      }
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === " ") {
        e.preventDefault();
        if (canFire) {
          createBullet();
        } else {
          return;
        }
      }
    });
  };

  // ---------------------------Enemies-------------------------------------------
  const createEnemy = (idNumber) => {
    let enemy = document.createElement("img");

    enemy.setAttribute("class", "invader");
    enemy.id = `enemy-${idNumber}`;
    return enemy;
  };

  const initAllEnemies = () => {
    for (let i = 0; i < 55; i++) {
      //let enemy = createEnemy(i);
      if (i < 11) {
        // enemy.src = Invader1;
        allEnemies.push(<img src={Invader1} className="invader" key={i} />);
      } else if (i < 22) {
        allEnemies.push(<img src={Invader2} className="invader" key={i} />);
      } else if (i < 33) {
        allEnemies.push(<img src={Invader3} className="invader" key={i} />);
      } else if (i < 44) {
        allEnemies.push(<img src={Invader4} className="invader" key={i} />);
      } else if (i < 55) {
        allEnemies.push(<img src={Invader5} className="invader" key={i} />);
      }

      // allEnemies.push(enemy);
    }

    setInvaders(allEnemies);
  };

  // const initInvadersArray = () => {

  // setInvaders(div);
  // };

  let margin = 50;
  let paddingLeft = 25;
  let paddingRight = 0;

  const createBullet = () => {
    const bullet = document.createElement("div");
    bullet.id = `bullet-${bulletId}`;
    const defender = document.getElementById("defender");

    // position of bullet based on defender
    const rec = defender.getBoundingClientRect();
    bullet.style.top = `${rec.top}px`;
    bullet.style.left = `${rec.left}px`;

    bullet.setAttribute("class", "bullet");
    document.getElementById("gameContainer").insertBefore(bullet, defender);

    bulletId++;
    allFairedBullets.push(bullet);
    canFire = false;
  };

  function gameEngine() {
    // move bullet
    moveBullets();
    // move enemies
    invadersMovement();
    // check colision
    // set result based on destroyed enemies
    // check destruction of rows of enemies and replace them
  }
  // ------------------------------------------------------Bullets -----------------------------------------------------------------------------
  function moveBullets() {
    allFairedBullets.forEach((bullet) => {
      moveBullet(bullet);
      removeBulletsIfEndIsReached(bullet);
    });
  }

  function moveBullet(bullet) {
    let newPosition = bullet.getBoundingClientRect().y;
    bullet.style.top = `${(newPosition -= 10)}px`;
  }

  function removeBulletsIfEndIsReached(bullet) {
    if (bullet.getBoundingClientRect().y < 15) {
      bullet.remove();
      allFairedBullets.shift();
      canFire = true;
    }
  }

  const invadersMovement = () => {
    invaders.forEach((enemy) => {
      // let newPosition = enemy.getBoundingClientRect().x;
      // enemy.style.left = `${(newPosition += 10)}px`;
      // console.log(enemy);
      //console.log(invaders);
    });
  };

  // ----------------------------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------------------Enemies------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------------------------------------------

  const fire = () => {
    // document.querySelectorAll(".bullet").forEach((element1) => {
    //   let bullet = element1.getBoundingClientRect();
    //   const rect1 = element1.getBoundingClientRect();
    //   element1.style.top = `${(bullet.y -= 10)}px`;
    //   if (bullet.y < 10) {
    //     element1.remove();
    //   }
    //   document.querySelectorAll(".invader").forEach((element2, index) => {
    //     const rect2 = element2.getBoundingClientRect();
    //     let overlap = !(
    //       rect1.right < rect2.left ||
    //       rect1.left > rect2.right ||
    //       rect1.bottom < rect2.top ||
    //       rect1.top > rect2.bottom
    //     );
    //     if (overlap) {
    //       // OVDJE U SUSTINI AKO POSTOJI PREKLAPANJE KORISTIM INDEX KOJI DOBIJEM
    //       //U OKVIRU QUERY SELECTORA DA IZBACIM IZ NIZA VRIJEDNOST SA KLJUCEM KOJI JE
    //       //IDENTICAN INDEX
    //       //PROBLEM JE STO MI SE MJESAJU INTERVALI I SVE SE RASPADA STALNO
    //       // POKUSAO SAM SA RAZNORAZNIM RIJESENJIMA TIPA CLEAR INTERVAL, RAZNORAZNA PREBACIVANJ
    //       //ALI NISTA NIJE USPIJELO
    //       element1.remove();
    //       element2.remove();
    //       //setInvaders([...invaders.filter((invader) => invader.key != index)]);
    //     }
    //   });
    // });
  };

  function moveEnemies() {
    let enemiesContainer = document.getElementById("all-enemies-container");
    let leftStyle = enemiesContainer.style.left || 0;
    let leftValue = leftStyle
      ? parseInt(leftStyle.slice(0, leftStyle.length - 2))
      : leftStyle;
    enemiesContainer.style.left = `${(leftValue += 10)}px`;
    console.log("right:", enemiesContainer.getBoundingClientRect().right);
    console.log("left: ", enemiesContainer.getBoundingClientRect().left);
    console.log("rec: ", enemiesContainer.getBoundingClientRect());
  }

  function test() {
    moveEnemies();
  }

  const destroyEnemy = (enemy) => {
    let newInvaders = invaders.slice();

    console.log(newInvaders[4]);
    newInvaders[4] = (
      <img
        key={4}
        style={{
          display: "none",
        }}
      />
    );

    return setInvaders(newInvaders);
  };

  const game = setInterval(() => {}, TIMER_INTERVAL);

  const paddingSetter = () => {
    // if (paddingRight === 35) {
    //   document.getElementById(
    //     "aliens"
    //   ).style.paddingLeft = `${(paddingRight += 1)}%`;
    //   paddingLeft = 35;
    //   clearInterval(game);
    //   document.getElementById("aliens").style.marginTop = `${topMargin}%`;
    //   setSpeed(speed - 5);
    //   setTopMargin(topMargin + 0.9);
    // } else {
    //   document.getElementById(
    //     "aliens"
    //   ).style.paddingLeft = `${(paddingRight += 1)}%`;
    // }
  };

  function moveLeft() {
    if (margin > 2)
      document.getElementById(
        "defender"
      ).style.marginLeft = `${(margin -= 1)}%`;
  }

  function moveRight() {
    if (margin < 95)
      document.getElementById(
        "defender"
      ).style.marginLeft = `${(margin += 1)}%`;
  }

  setInterval(() => {
    gameEngine();
  }, TIMER_INTERVAL);

  return (
    <div className="gameContainer" id="gameContainer">
      <GameScore />
      <div className="aliensContainer" id="aliensContainer">
        <Grid id={"all-enemies-container"}>
          <Grid.Row columns={11}>
            {invaders.map((invader, index) => {
              if (invader.key < 11) {
                return (
                  <Grid.Column column={invader.key}>{invader}</Grid.Column>
                );
              }

              //return invader;
            })}
          </Grid.Row>
          <Grid.Row columns={11}>
            {invaders.map((invader, index) => {
              if (invader.key > 10 && invader.key < 22) {
                return (
                  <Grid.Column columns={invader.key}>{invader}</Grid.Column>
                );
              }

              //return invader;
            })}
          </Grid.Row>
          <Grid.Row columns={11}>
            {invaders.map((invader, index) => {
              if (invader.key > 21 && invader.key < 33) {
                return <Grid.Column>{invader}</Grid.Column>;
              }

              //return invader;
            })}
          </Grid.Row>
          <Grid.Row columns={11}>
            {invaders.map((invader, index) => {
              if (invader.key > 32 && invader.key < 44) {
                return <Grid.Column>{invader}</Grid.Column>;
              }

              //return invader;
            })}
          </Grid.Row>
          <Grid.Row columns={11}>
            {invaders.map((invader, index) => {
              if (invader.key > 43 && invader.key < 55) {
                return (
                  <Grid.Column column={invader.key}>{invader}</Grid.Column>
                );
              }

              //return invader;
            })}
          </Grid.Row>
        </Grid>
      </div>
      <button onClick={test}>Test</button>
      <img
        id="defender"
        src={Ship}
        alt="Space Ship"
        style={{
          height: "5%",
          alignContent: "center",
          marginLeft: `${margin}%`,
          position: "absolute",
          bottom: "10%",
        }}
      />
      <div
        style={{
          borderColor: "grey",
          width: "90%",
          marginBottom: "0",
          height: "10%",
          bottom: "0",
          position: "fixed",
        }}
      >
        <img
          src={Ship}
          style={{
            height: "50%",
            alignContent: "center",
            marginLeft: "5%",
            display: "inline-flex",
            marginTop: "0px",
          }}
        />
        <p
          style={{
            color: "green",
            display: "inline-flex",
            fontSize: "10px",
            marginLeft: "1%",
            marginTop: "0px",
          }}
        >
          {numberOfLives}
        </p>
        <p
          style={{
            textAlign: "center",
            display: "inline-flex",
            marginLeft: "25%",
            fontSize: "12px",
            marginTop: "0px",
            color: "green",
          }}
        >
          Move with arrows keys, fire with the space bar
        </p>
      </div>
    </div>
  );
};

export default GameScreen;
