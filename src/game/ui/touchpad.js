import { container } from "../store/canvas";
import { eventEmmiter } from "../util/eventBinding";
import { EventMaping } from "../util/eventBinding";

export const touchPads = () => {
  const arrowPad = document.createElement('div');
  const upArrowPad = document.createElement('div');
  const downArrowPad = document.createElement('div');
  const leftArrowPad = document.createElement('div');
  const rightArrowPad = document.createElement('div');
  const actionPad = document.createElement('div');
  const potionPad = document.createElement('div');
  const switchPad = document.createElement('div');
  const attackPad = document.createElement('div');


  upArrowPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.UP_KEY, true)
  })
  downArrowPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.DOWN_KEY, true)
  })
  leftArrowPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.LEFT_KEY, true)
  })
  rightArrowPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.RIGHT_KEY, true)
  })
  attackPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.SPACE_KEY)
  })
  switchPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.SWITCH_WEAPON)
  })
  potionPad.addEventListener('touchstart', () => {
    eventEmmiter.emit(EventMaping.USE_POTION)
  })


  upArrowPad.addEventListener('touchend', () => {
    eventEmmiter.emit(EventMaping.UP_KEY, false)
  })
  downArrowPad.addEventListener('touchend', () => {
    eventEmmiter.emit(EventMaping.DOWN_KEY, false)
  })
  leftArrowPad.addEventListener('touchend', () => {
    eventEmmiter.emit(EventMaping.LEFT_KEY, false)
  })
  rightArrowPad.addEventListener('touchend', () => {
    eventEmmiter.emit(EventMaping.RIGHT_KEY, false)
  })

  arrowPad.className = 'arrowContiner'
  actionPad.className = 'actionContiner'
  upArrowPad.className = 'padStyle up'
  downArrowPad.className = 'padStyle down'
  leftArrowPad.className = 'padStyle left'
  rightArrowPad.className = 'padStyle right'
  potionPad.className = 'padStyle potion'
  switchPad.className = 'padStyle switch'
  attackPad.className = 'padStyle attack'


  container.appendChild(arrowPad);
  container.appendChild(actionPad);
  arrowPad.appendChild(upArrowPad)
  arrowPad.appendChild(downArrowPad)
  arrowPad.appendChild(leftArrowPad)
  arrowPad.appendChild(rightArrowPad)
  actionPad.appendChild(potionPad)
  actionPad.appendChild(switchPad)
  actionPad.appendChild(attackPad)
}
