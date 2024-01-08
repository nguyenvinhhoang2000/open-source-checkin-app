export function findDirectionTooltip(data, dataArrow, record) {
  return {
    foundDirection: data.find((item) => item.direction === record),
    foundArrow: dataArrow.find((item) => item.direction === record),
  };
}
