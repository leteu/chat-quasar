const ID_TOKEN_KEY = "x-auth-token";

const JwtService = {
  getToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  },

  saveToken(token: string) {
    return localStorage.setItem(ID_TOKEN_KEY, token);
  },

  destroyToken() {
    return localStorage.clear();
  },

  destroyLocalData() {
    const TOKEN_ITEMS = [
      ID_TOKEN_KEY
    ];

    TOKEN_ITEMS.forEach(items => {
      return localStorage.removeItem(items);
    });
  }
}

export default JwtService;
