import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class LikeService {
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async addLike({ userId, postId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLikeCollectionId,
        ID.unique(),
        { userId, postId },
      );
    } catch (error) {
      console.log("Like service :: addLike :: error", error);
      throw error;
    }
  }

  async removeLike(documentId) {
    try {
      return await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteLikeCollectionId,
        documentId,
      );
    } catch (error) {
      console.log("Like service :: removeLike :: error", error);
      throw error;
    }
  }

  async checkLike(userId, postId) {
    try {
      const result = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteLikeCollectionId,
        [Query.equal("userId", userId), Query.equal("postId", postId)],
      );
      return result.documents[0] || null;
    } catch (error) {
      console.log("Like service :: checkLike :: error", error);
      throw error;
    }
  }
}

const likeService = new LikeService();
export default likeService;
