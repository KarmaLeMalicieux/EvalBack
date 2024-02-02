import Post from "../model/postModel";
import Sub from "../model/subredditsModel";


const addPost = async (req, res) => {

  const postMessage = req.body.message
  const { subId , userId } = req.params

  try {
    const sub = await Sub.findById(subId);
    console.log(sub)
    if (!sub) {
      return res
        .status(404)
        .json({ message: "No subs found." });
    }else {
      const newPost = new Post ({
        author: userId,
        message: postMessage,
      })

      await newPost.save();

      console.log(newPost)
      sub.post.push(newPost);

      await sub.save();

      res.json({sub, message: "New post saved." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { addPost }