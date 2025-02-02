export const distanceBtw = (Xaxis, Yaxis) => {
  return Math.round(Math.sqrt(Xaxis * Xaxis + Yaxis * Yaxis), 2);
};

export const distanceBetween = (X1, Y1, X2, Y2) => {
  const dx = X1 - X2;
  const dy = Y1 - Y2;
  return Math.sqrt(dx * dx + dy * dy);
};
