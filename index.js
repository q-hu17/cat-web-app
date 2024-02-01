import express from "express";
import bodyParser from "body-parser";

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

let postArray = [];

// home page
app.get("/", (req, res) => {
    res.render("index.ejs", {postArray: postArray});
})

// create a post
app.post("/submit", (req, res) => {
    const username = req.body["username"];
    const email = req.body["email"];
    const name = req.body["catname"];
    const breed = req.body["catbreed"];
    const sex = req.body["catsex"];
    const age = req.body["catage"];
    const desc = req.body["description"];

    const post = {
        username: username,
        email: email,
        name: name,
        breed: breed,
        sex: sex,
        age: age,
        desc: desc
    };

    if (post.username!="") {
        postArray.push(post);
    }

    console.log(post);

    res.render("index.ejs", 
    {
        postArray: postArray
    });
});
// edit a post
app.get("/edit/:id", (req, res) => {
    // retrieve a post content using its post id
    const postId = req.params.id;
    const postArrayIndex = postId - 1;
    const post = postArray[postArrayIndex];

    res.render("edit.ejs", {post: post, index: postId});
});

// post an edit
app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const postArrayIndex = postId - 1;
    console.log('Editing post with ID:', postArrayIndex);

    const username = req.body["username"];
    const email = req.body["email"];
    const name = req.body["catname"];
    const breed = req.body["catbreed"];
    const sex = req.body["catsex"];
    const age = req.body["catage"];
    const desc = req.body["description"];

    const post = {
        username: username,
        email: email,
        name: name,
        breed: breed,
        sex: sex,
        age: age,
        desc: desc
    };

    postArray[postArrayIndex] = post;

    res.redirect("/");
})

// delete a post
app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    const postArrayIndex = postId - 1;

    //postArray = postArray.filter(post => post !== postArray[postArrayIndex]);
    postArray.splice(postArrayIndex, 1);
    res.redirect("/");
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});