export const collision = (rect1, rect2, buffer = 0) => {
  return !(
    rect2.left > rect1.right + buffer ||
    rect2.right < rect1.left - buffer ||
    rect2.top > rect1.bottom + buffer ||
    rect2.bottom < rect1.top - buffer
  );
};

export const collisionDirection = (rect1, rect2) => {
  let buffer = 0;
  const col = !(
    rect2.left > rect1.right + buffer ||
    rect2.right < rect1.left - buffer ||
    rect2.top > rect1.bottom + buffer ||
    rect2.bottom < rect1.top - buffer
  )

  if (!col) return -1;

  const deltaBottom = Math.abs(rect1.bottom - rect2.top);
  const deltaTop = Math.abs(rect1.top - rect2.bottom);
  const deltaLeft = Math.abs(rect1.left - rect2.right);
  const deltaRight = Math.abs(rect1.right - rect2.left);

  const minDelta = Math.min(deltaBottom, deltaTop, deltaLeft, deltaRight);

  if (minDelta === deltaBottom) return 0;
  if (minDelta === deltaTop) return 1;
  if (minDelta === deltaLeft) return 2;
  if (minDelta === deltaRight) return 3;

};
