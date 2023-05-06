const mongoose = require("mongoose");
const cors = require("cors");

const albumSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
  
      imageURL: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("album", albumSchema);
  