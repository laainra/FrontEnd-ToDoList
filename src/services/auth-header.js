import Cookies from 'js-cookie';

export default function authHeader() {
  let user = Cookies.getJSON('user');

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
