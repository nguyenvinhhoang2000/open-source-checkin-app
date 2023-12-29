const getDateOfNow = () => {
  const newDate = new Date();

  const date = `${newDate.getDate()}-${
    newDate.getMonth() + 1
  }-${newDate.getFullYear()}`;

  return date;
};

export { getDateOfNow };
