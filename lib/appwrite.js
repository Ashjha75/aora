import { Client, ID, Account, Avatars, Databases, Storage, Query } from 'react-native-appwrite';
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.ashish.aora",
    projectId: "661d1b1e0844442e6ed9",
    databaseId: "661d21ebc8a710a89025",
    userCollectionId: "661d230d20101e991822",
    videoCollectionId: "661d233a083f80f0dd2f",
    storageId: "661d264b6c76a4462313"
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;



const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export const createUser = async (password, username, email) => {
    console.log(password, username, email)
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw new Error('Failed to create new account');

        const avatarurl = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
            accountId: newAccount.$id,
            email,
            username,
            password,
            avatar: avatarurl
        });

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        if (!session) throw new Error('Failed to create session');
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getLoggedInUser = async () => {
    try {
        const user = await account.get();
        if (!user) throw new Error('Failed to get user');
        const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [Query.equal('accountId', user.$id)]);
        if (!currentUser) throw new Error('Failed to get current user');

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getNewPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt')]);
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }

}
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.orderDesc('$createdAt', Query.limit(7))]);
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }

}
export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.search('title', query)]);
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }

}
export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(config.databaseId, config.videoCollectionId, [Query.equal('users', userId), Query.orderDesc('$createdAt')]);
        return posts.documents;

    } catch (error) {
        throw new Error(error);
    }

}

export const signOut = async () => {
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = (fileId, type) => {
    let fileUrl;
    try {
        if (type === "video") {
            fileUrl = storage.getFileView(config.storageId, fileId)
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100)
        }
        else {
            throw new Error("Invalid file type");
        }
        if (!fileUrl) throw new Error('Failed to get file preview');
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }

}

export const uploadFile = async (file, type) => {
    if (!file) {
        return
    }
    const { mineType, ...rest } = file;
    // const asset = { type: mineType, ...rest };
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.filesize,
        uri: file.uri
    }
    try {
        const uploadedFile = await storage.createFile(
            config.storageId, ID.unique(), asset
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ]);
        const newPost = await databases.createDocument(config.databaseId, config.videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            users: form.userId,
            prompt: form.prompt
        });
        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}
