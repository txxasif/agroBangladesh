import { deletePost } from "@/models/post.model";
export default async function handler(req, res) {
    const { id,postIdToDelete } = req.query;
    console.log(id, postIdToDelete);
    await deletePost(id, postIdToDelete);
}