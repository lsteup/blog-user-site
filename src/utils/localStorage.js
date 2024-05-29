export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};

export const addFilterToLocalStorage = (filter) => {
  localStorage.setItem("filter", filter);
};

export const removeFilterFromLocalStorage = () => {
  localStorage.removeItem("filter");
};

export const getFilterFromLocalStorage = () => {
  return localStorage.getItem("filter") || "all";
};
