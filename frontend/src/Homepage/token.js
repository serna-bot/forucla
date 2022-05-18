export const getToken = async () => {
  if (tokenExpired()) {
    const refreshToken = sessionStorage.getItem('refreshToken');
    const token = await gettingTokenFromServer(refreshToken);
    sessionStorage.setItem('accessToken', token.accessToken);
    sessionStorage.setItem('expirationDate', newExpirationDate());
    return token.accessToken;
  } else {
    console.log('token not expired');
    return sessionStorage.getItem('accessToken');
  }
};

const newExpirationDate = () => {
  var expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  return expiration;
};

const tokenExpired = () => {
  const now = Date.now();
  const expirationDate = sessionStorage.getItem('expirationDate');
  const expDate = new Date(expirationDate);

  if (now > expDate.getTime()) {
    return true;
  }
  return false;
};
const gettingTokenFromServer = async (refreshToken) => {
  try {
    const request = await fetch('login/getValidToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
    const token = await request.json();
    return token;
  } catch (error) {
    throw new Error("Can't get new token", error.message);
  }
};
