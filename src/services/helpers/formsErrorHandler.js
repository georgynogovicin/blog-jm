const formsErrorHandler = (error, errorCb) => {
  const errorNames = Object.keys(error);
  const errorMessages = errorNames.reduce((acc, item) => {
    acc.push({
      type: 'server',
      name: item,
      message: error[item][0],
    });
    return acc;
  }, []);
  errorMessages.forEach(({ name, type, message }) => {
    errorCb(name, { type, message });
  });
};

export default formsErrorHandler;
