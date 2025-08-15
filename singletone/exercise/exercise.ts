type SessionOptions = {
  timeout: number;
};

class SesstionManager {
  private sesstionOptions: SessionOptions = { timeout: 300 };
  private static instance: SesstionManager;
  private sessions: Map<string, string> = new Map();

  private constructor() {}

  static getInstance() {
    if (!SesstionManager.instance) {
      SesstionManager.instance = new SesstionManager();
    }
    return SesstionManager.instance;
  }

  createSession(id: string, session: string) {
    this.sessions.set(id, session);
  }
  getSession(id: string) {
    return this.sessions.get(id);
  }
  public endSession(id: string) {
    this.sessions.delete(id);
  }
}

const SM1 = SesstionManager.getInstance();
const SM2 = SesstionManager.getInstance();

SM1.createSession("1", "session1");
SM2.createSession("2", "session2");
SM1.createSession("3", "session3");

SM1.getSession("2");
SM2.getSession("1");
