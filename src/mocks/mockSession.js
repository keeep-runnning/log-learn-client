const mockSession = {
  userId: null,
  saveUserId(id) {
    this.userId = id;
  },
  removeUserId() {
    this.userId = null;
  },
  getUserId() {
    return this.userId;
  }
};

export default mockSession;
