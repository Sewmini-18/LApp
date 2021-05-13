import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, username, nic, password) {
    return axios.post(API_URL + "signup", {
      name,
      username,
      nic,
      password,
    });
  }

  confirmAccount(token) {
    return axios
      .get(API_URL + `confirm-account?token=${token}`)
      .then((response) => {
        return response.data;
      });
  }

  resetPassword(username) {
    return axios
      .post(API_URL + `reset-password`, {
        username,
      })
      .then((response) => {
        return response.data;
      });
  }

  resetPasswordVerify(username, token, password) {
    return axios
      .post(API_URL + `reset-password-verify`, {
        username,
        token,
        password,
      })
      .then((response) => {
        return response.data;
      });
  }

  update(username, name, nic, phone) {
    const currentUser = this.getCurrentUser();
    const userId = currentUser.id;

    return axios.put("http://localhost:8080/api/auth/" + userId, {
      username,
      name,
      nic,
      phone,
    });
  }

  updateTheme(theme) {
    const currentUser = this.getCurrentUser();
    const userId = currentUser.id;

    return axios.put("http://localhost:8080/api/auth/color/" + userId, {
      theme,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
