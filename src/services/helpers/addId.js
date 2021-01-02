const addId = () => {
  let currentId = 1000;

  return (tickets) => {
    return tickets.map((ticket) => {
      currentId += 1;
      return {
        ...ticket,
        id: currentId,
      };
    });
  };
};

export default addId;
