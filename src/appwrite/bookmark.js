import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

export class BookmarkService {
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createBookmark({ userId, postId }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarkCollectionId,
        ID.unique(),
        { userId, postId },
      );
    } catch (error) {
      console.log("Bookmark service :: createBookmark :: error", error);
      throw error;
    }
  }

  async deleteBookmark(documentId) {
    try {
      return await this.database.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarkCollectionId,
        documentId,
      );
    } catch (error) {
      console.log("Bookmark service :: deleteBookmark :: error", error);
      throw error;
    }
  }

  async checkBookmark(userId, postId) {
    try {
      const result = await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarkCollectionId,
        [Query.equal("userId", userId), Query.equal("postId", postId)],
      );
      return result.documents[0] || null;
    } catch (error) {
      console.log("Bookmark service :: checkBookmark :: error", error);
      throw error;
    }
  }

  async getUserBookmarks(userId, limit = 8, page = 1) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookmarkCollectionId,
        [
          Query.equal("userId", userId),
          Query.limit(limit),
          Query.offset((page - 1) * limit),
        ],
      );
    } catch (error) {
      console.log("Bookmark service :: getUserBookmarks :: error", error);
      throw error;
    }
  }
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
