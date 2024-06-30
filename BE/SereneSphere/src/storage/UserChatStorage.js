class UserChatStorage {
    constructor() {
      if (!UserChatStorage.instance) {
        this.users = new Map();
        UserChatStorage.instance = this;
      }
      return UserChatStorage.instance;
    }
  
    getUsers() {
      return this.users;
    }
  
    setUser(userId, userModel) {
      if (this.users.has(userId)) {
        // console.log("user:", userId);
        this.users.delete(userId);
      }
      this.users.set(userId, userModel);
    }
  
    remove(userId) {
      this.users.delete(userId);
    }
  }
  
  const instance = new UserChatStorage();
  Object.freeze(instance);
  
  module.exports = instance;
  