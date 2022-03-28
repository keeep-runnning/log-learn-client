const USERNAME_KEY = "[mockData]currentUsername";

export function saveLoggedInUsername(user) {
  sessionStorage.setItem(USERNAME_KEY, user.username);
}

export function deleteLoggedInUsername() {
  sessionStorage.removeItem(USERNAME_KEY);
}

export function getLoggedInUsername() {
  return sessionStorage.getItem(USERNAME_KEY);
}

export function serializePost(post) {
  return ({...post, author: post.author.username});
}
