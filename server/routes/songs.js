const router = require("express").Router();
const song = require("../models/song");
const cors = require("cors");
router.use(cors({ origin: "*" }));
router.get("/getAll", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    
  };

  const data = await song.find();
  if (data) {
    res.status(200).send({ success: true, song: data });
  } else {
    res.status(200).send({ success: false, msg: "No Data Found" });
  }
});

router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await song.findOne(filter);

  if (data) {
    res.status(200).send({ success: true, songs: data });
  } else {
    res.status(200).send({ success: false, msg: "No Data Found" });
  }
});

router.post("/save", async (req, res) => {
  const newSong = song({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songUrl: req.body.songUrl,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });
  try {
    const savedSong = await newSong.save();
    res.status(200).send({ song: savedSong });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.put("/update/:id", async (req, res) => {
  const filter = { _id: req.params.id };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    res.status(200).send({success:true, songs: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const result = await song.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted",data:result });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

router.get("/getFavouritesSongs", async (req, res) => {
  const query = req.query.songId;
  res.send(query);
});




    module.exports = router;
