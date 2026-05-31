import conf from '../conf/conf'
import { Client, ID, Databases, Storage, Query } from 'appwrite'
import { AuthService } from './auth';

export class DatabaseService {
    client = new Client()
    database;
    storage;

    constructor() {
         this.client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
         this.database = new Databases(this.client);
         this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId, username}) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    username
                }
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            throw error;
        }
    }

    async getPosts(queries = []) {
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('status', 'active'), Query.orderDesc("$createdAt"), ...queries],
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            throw error
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
             console.log('Appwrite service :: createPost :: error', error)
            return false;
        }
    }

    getFilePreview(fileId) {
         const result = this.storage.getFileView(
            conf.appwriteBucketId,
            fileId
         )
    return result
    }
}

const databaseService = new DatabaseService()
export default databaseService