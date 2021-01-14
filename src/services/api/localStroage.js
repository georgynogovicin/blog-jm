export const setUserToLocalStorage = (data) => {
  localStorage.setItem('realWorldBlogUser', JSON.stringify(data));
};

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('realWorldBlogUser'));

  return user;
};

export const deleteUserFromLocalStorage = () => {
  localStorage.removeItem('realWorldBlogUser');
};
