import conf from "../conf/conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle() {
    try {
      await this.account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/`,
        `${window.location.origin}/login`,
      );
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }

  async passwordRecovery({ email, url }) {
    try {
      return await this.account.createRecovery(email, url);
    } catch (error) {
      throw error;
    }
  }

  async updateRecovery({ userId, secret, password }) {
    try {
      return await this.account.updateRecovery(userId, secret, password);
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
