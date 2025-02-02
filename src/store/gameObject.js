const GameObjectArray = new Array();

export const OverWrightGameObjectArray = (arr) => {
  GameObjectArray.splice(0, GameObjectArray.length, ...arr);
}

export const PushGameObjectArray = (item) => {
  GameObjectArray.push(item)
}

export const ReadGameObjectArray = () => GameObjectArray;
