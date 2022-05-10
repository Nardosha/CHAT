export default class User {
  constructor({email, name, key, id}) {
    this.email = email;
    this.name = name;
    this.key = key;
    this.id = id;
  }
  setNewName(newName) {
    this.name = newName;
  }

  setLocal() {
    try {
      localStorage.setItem("user_auth", JSON.stringify(this));
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }

  getLocal() {
    try {
      const userInfo = localStorage.getItem("auth_user");
      return JSON.parse(userInfo);
    } catch (e) {
      alert(e);
      console.log(e);
    }
  }
  clearLocal() {
    localStorage.removeItem("auth_user");
  }

  isLocalEmpty() {
    return !!this.getLocal() || false;
  }
}
