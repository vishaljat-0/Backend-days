const ImageKit = require("@imagekit/nodejs").default;
const upload = require("../middleware/upload.middleware");
const nodeid3 = require("node-id3");
const songmodel = require("../models/song.model");

const { uploadfile } = require("../services/storage.service");

const uploadsong = async (req, res) => {
  const songbuffer = req.file.buffer;
 const { mood } = req.body;
   const tags = nodeid3.read(songbuffer);
  console.log(tags);

  const [songfile, posterfile] = await Promise.all([
    uploadfile({
      buffer: songbuffer,
      fileName: tags.title + ".mp3",
      folder: "/cohort-2/moodify/songs",
    }),
    uploadfile({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpeg",
      folder: "/cohort-2/moodify/posters",
    }),

  ]);

  const song = await songmodel.create({
    title: tags.title,
    url: songfile.url,
    posterUrl: posterfile.url,
    type: tags.type,
    mood: mood,
  });
  return res.status(201).json({ message: "Song uploaded successfully", song });
};



const getsongs = async (req, res) => {
  // normalize query mood instead of destructuring from string
  const mood = req.query.mood?.toLowerCase().trim();
  console.log("getsongs called with mood=", mood);
const songs = await songmodel.findOne({
    mood,
});
return res.status(200).json({message:"songs fetched successfully",songs})




};
module.exports = { uploadsong,getsongs };
