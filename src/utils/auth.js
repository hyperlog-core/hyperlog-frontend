export function isUserAuthenticated() {
  if(localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

export function loginUser(token) {
  localStorage.setItem("token", token);
}

export function logoutUser() {
  return new Promise((resolve, reject) => {
    if(localStorage.removeItem("token"))
      resolve("Logged Out");
    else
      reject("Some error occurred");
  })
}
