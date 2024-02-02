import Post from "../model/postModel";
import Sub from "../model/subredditsModel";


const addSub = async (req, res) => {
  const { title } = req.body;
  const AuthorId = req.user.id
  console.log(req.user)

  try {
    const existingSub = await Sub.findOne({
      title,
      author: AuthorId,
    });
    console.log("Id du User créateur: ", AuthorId);

    if (existingSub) {
      return res
        .status(400)
        .json({ message: "Subreddit already exist" });
    }

    const newSub = new Sub({
      title,
      author: AuthorId,
    });

    await newSub.save();

    res.status(201).json(newSub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allSubs = async (req, res) => {
  try {
    const Subs = await Sub.find().populate("post");
    res.json(Subs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSub = async (req, res) => {
  const userDeleting = req.user

  try {
  const subID = await Sub.findOne({ _id: req.params.id });
  if (userDeleting.id == subID.author) {
    const del = await Sub.deleteOne({ _id: req.params.id})
    console.log(del,'object deleted')
    const posts = await Post.find( {author:userDeleting.id} )
    console.log(posts)
    const delPost = await Post.deleteMany({author: userDeleting.id})  
    res.json({message: "This sub successfully deleted"})
  }
  else { console.error({ message:`The user who is trying to delete ${userDeleting.id} 
    is not the owner of the sub who is ${subID.author} `})
  }
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const showSub = async (req, res) => {
  try {
    const sub = await Sub.findById(req.params.id).populate("Post");
    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export {
  addSub,
  allSubs,
  deleteSub,
  showSub,
}