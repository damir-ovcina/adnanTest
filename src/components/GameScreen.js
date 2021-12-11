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

const TIMER_INTERVAL = 200;
let bulletId = 0;
let allFairedBullets = [];
let canFire = true;

const GameScreen = () => {
  const [numberOfLives, setNumberOfLives] = useState(3);
  const [index, setIndex] = useState();
  const [rowNum, setRowNum] = useState(4);
  const [gameScore, setGameScore] = useState(0);
  const [speed, setSpeed] = useState(100);
  const [topMargin, setTopMargin] = useState(3);
  const [invaders, setInvaders] = useState([]);

  useEffect(() => {
    initInvadersArray();
    // movment and fiering key binding
    initialzeKeyBindings();
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

  const createEnemy = (name, id) => {
    return (
      <img
        src={name}
        className="invader"
        style={{ marginRight: "1.5%" }}
        key={id}
      />
    );
  };

  const initInvadersArray = () => {
    let div = [];
    let i = +1;
    for (let row = 0; row <= 4; row++) {
      let cols = [];
      let rows = [];
      for (let col = 0; col < 11; col++) {
        if (row === 0) {
          cols[col] = createEnemy(Invader1, i++);
        } else if (row === 1 || row === 5 || row === 9) {
          cols[col] = cols[col] = createEnemy(Invader2, i++);
        } else if (row === 2 || row === 6 || row === 10) {
          cols[col] = cols[col] = cols[col] = createEnemy(Invader2, i++);
        } else if (row === 3 || row === 7 || row === 11) {
          cols[col] = cols[col] = cols[col] = createEnemy(Invader3, i++);
        } else if (row === 4 || row === 8 || row === 12) {
          cols[col] = cols[col] = cols[col] = createEnemy(Invader4, i++);
        }

        div.push(cols[col]);
      }
    }

    setInvaders(div);
  };

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
  }, 100);

  return (
    <div className="gameContainer" id="gameContainer">
      <GameScore />
      <div
        className="aliensContainer"
        style={{ width: "100%", position: "fixed" }}
        id="aliens"
      >
        {invaders.map((invader) => {
          return invader;
        })}
      </div>
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
