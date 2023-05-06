 const album = require("../models/album");
const router = require("express").Router();
const cors = require("cors");
router.use(cors({ origin: "*" }));


router.post("/save", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).send({success:true ,album: savedAlbum });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});


router.get("/getOne/:id", async (req, res) => {
  const filter = { _id: req.params.id };

  const data = await album.findOne(filter);
  // console.log(cursor);
  if (data) {
    res.status(200).send({ success: true, album: data });
  } else {
    res.status(200).send({ success: false, msg: "No Data Found" });
  }
});



router.get("/getAll", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };

  const data = await album.find();
  if (data) {
    // console.log(data);
    res.status(200).send({ success: true, album: data });
  } else {
    res.status(200).send({ success: false, msg: "No Data Found" });
  }
});







    router.put("/update/:id", async (req, res) => {
      const filter = { _id: req.params.id };
      const options = {
        upsert: true,
        new: true,
      };
      try {
        const result = await album.findOneAndUpdate(
          filter,
          {
            name: req.body.name,
            imageURL: req.body.imageURL,
          },
          options
        );
        res.status(200).send({success:true, album: result });
      } catch (error) {
        res.status(400).send({ success: false, msg: error });
      }
    });
    
    router.delete("/delete/:id", async (req, res) => {
      const filter = { _id: req.params.id };
    
      const result = await album.deleteOne(filter);
      if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
      } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
      }
    });

    module.exports = router;
