import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class UsersService {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createUserProfile({
    userId,
    name,
    username = "",
    bio = "",
    profileComplete = false,
  }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        ID.unique(),
        { userId, name, username, bio, profileComplete },
      );
    } catch (error) {
      console.log("Appwrite service :: createUserProfile :: error", error);
      throw error;
    }
  }

  async getUserProfile(userId) {
    try {
      const result = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        [Query.equal("userId", userId)],
      );
      return result.documents[0] || null;
    } catch (error) {
      console.log("Appwrite service :: getUserProfile :: error", error);
      throw error;
    }
  }

  async updateUserProfile(documentId, { username, bio, profileComplete }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        documentId,
        { username, bio, profileComplete },
      );
    } catch (error) {
      console.log("Appwrite service :: updateUserProfile :: error", error);
      throw error;
    }
  }

  async getUsersByIds(userIds) {
    try {
      const result = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        [Query.equal("userId", userIds)],
      );
      return result;
    } catch (error) {
      console.log("Appwrite service :: getUsersByIds :: error", error);
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const result = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        [Query.equal("username", username)],
      );
      return result.documents[0] || null;
    } catch (error) {
      console.log("Appwrite service :: getUserByUsername :: error", error);
      throw error;
    }
  }
}

const usersService = new UsersService();

export default usersService;
