/** @type {HTMLCanvasElement} */
const gameover = document.querySelector(`#overtitle`);
const canvas = document.querySelector(`#canvas1`);

const ctx = canvas.getContext(`2d`);

const canvasWidth = (canvas.width = 1000);
const canvasHeight = (canvas.height = 625);

let offset = {
  positionX: -540,
  positionY: -460,
  intialX: -540,
  intialY: -460,
};
const playerProperty = {
  velocity: 6,
};

const map = {
  collisionBoundary: HomeVillageCollisionarray,
  enemyLocation: HomeVillageEnemyArray,
  enemyLocationArray: [],
};

const keys = {
  PresssedW: false,
  PresssedA: false,
  PresssedS: false,
  PresssedD: false,
  PresssedSpace: false,
};

const player = new PlayerSpirit(
  `./assets/Actor/Characters/Princess/SpriteSheet.png`,
  `./assets/Items/Weapons/Sword2/Sprite.png`
);

spawnEnemy(map.enemyLocation, map.enemyLocationArray, offset);
const WorldMap = new Game(canvasWidth, canvasHeight);

const animation = () => {
  requestAnimationFrame(animation);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const Array = {
    collisionBoundaryArray: [],
    prev: [],
    next: [],
  };

  switch (WorldMap.location[WorldMap.currentIndex]) {
    case `MainHouse`:
      map.collisionBoundary = MainHousearray;
      map.enemyLocation = MainHouseEnemyarray;
      break;
    case `HomeVillage`:
      map.collisionBoundary = HomeVillageCollisionarray;
      map.enemyLocation = HomeVillageEnemyArray;
      break;
    case `Route2`:
      map.collisionBoundary = Route2Collisionarray;
      map.enemyLocation = MainHouseEnemyarray;
  }

  map.collisionBoundary.forEach((axisY, i) => {
    axisY.forEach((axisX, j) => {
      switch (axisX) {
        case 1:
          Array.collisionBoundaryArray.push(
            new CollisionBlock(
              j * CollisionBlock.pixel + offset.positionX,
              i * CollisionBlock.pixel + offset.positionY
            )
          );
          break;
        case 2:
          Array.prev.push(
            new CollisionBlock(
              j * CollisionBlock.pixel + offset.positionX,
              i * CollisionBlock.pixel + offset.positionY
            )
          );
          break;
        case 3:
          Array.next.push(
            new CollisionBlock(
              j * CollisionBlock.pixel + offset.positionX,
              i * CollisionBlock.pixel + offset.positionY
            )
          );
          break;
      }
    });
  });

  WorldMap.draw(offset);

  Array.collisionBoundaryArray.forEach((item) => item.draw());
  Array.prev.forEach((item) => {
    if (
      CollisionDetection(player, {
        positionX: item.positionX,
        positionY: item.positionY,
      })
    ) {
      offset = WorldMap.offset;
      WorldMap.prevLocation();
    }
  });
  Array.next.forEach((item) => {
    if (
      CollisionDetection(player, {
        positionX: item.positionX,
        positionY: item.positionY,
      })
    ) {
      offset = WorldMap.offset;
      WorldMap.nextLocation();
    }
  });

  map.enemyLocationArray.map((enemy, index) => {
    if (enemy.alive === false) map.enemyLocationArray.splice(index, 1);
    enemy.positionX = offset.positionX + enemy.offsetX;
    enemy.positionY = offset.positionY + enemy.offsetY;
    enemy.draw();
    player.dmgTaken(enemy.attack(), enemy.angleofApproch, offset);
    enemy.movement();
  });

  player.drawWeapon();
  player.draw();
  player.health();

  if (keys.PresssedW) {
    let collisionDetected = false;
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY + playerProperty.velocity,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY += playerProperty.velocity;
    }
  }
  if (keys.PresssedA) {
    let collisionDetected = false;
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX + playerProperty.velocity,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX += playerProperty.velocity;
    }
  }
  if (keys.PresssedS) {
    let collisionDetected = false;
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY - playerProperty.velocity,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY -= playerProperty.velocity;
    }
  }
  if (keys.PresssedD) {
    let collisionDetected = false;
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX - playerProperty.velocity,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX -= playerProperty.velocity;
    }
  }
  if (!player.alive) {
    let x = 100;
    gameover.style.display = 'block';
    setInterval(() => {
      canvas.style.filter = `saturate(${x}%) blur(5px) opacity(80%)`;
      x--;
    }, 50);

    setTimeout(() => {
      window.location.reload();
    }, 3000);
    map.enemyLocationArray = [];
    cancelAnimationFrame(animation);
  }
};
animation();

window.addEventListener(`keypress`, function (e) {
  switch (e.key) {
    case `w`:
      keys.PresssedW = true;
      player.moving = true;
      player.direction = 1;
      break;
    case `a`:
      keys.PresssedA = true;
      player.moving = true;
      player.direction = 2;
      break;
    case `s`:
      keys.PresssedS = true;
      player.moving = true;
      player.direction = 0;
      break;
    case `d`:
      keys.PresssedD = true;
      player.moving = true;
      player.direction = 3;
      break;
    case ` `:
      keys.PresssedSpace = true;
      player.attackAnimation = true;
      break;
  }
});

window.addEventListener(`keyup`, function (e) {
  switch (e.key) {
    case `w`:
      keys.PresssedW = false;
      player.moving = false;
      player.frame = 0;

      break;
    case `a`:
      keys.PresssedA = false;
      player.moving = false;
      player.frame = 0;

      break;
    case `s`:
      keys.PresssedS = false;
      player.moving = false;
      player.frame = 0;

      break;
    case `d`:
      keys.PresssedD = false;
      player.moving = false;
      player.frame = 0;
      break;
    case ` `:
      keys.PresssedSpace = false;
      player.attackAnimation = false;
      player.frame = 0;
      break;
  }
});
