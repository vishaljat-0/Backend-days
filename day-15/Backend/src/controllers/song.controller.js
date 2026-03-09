const ImageKit = require("@imagekit/nodejs").default;
const upload = require("../middleware/upload.middleware");
const nodeid3 = require("node-id3");
const songmodel = require("../models/song.model");

const { uploadfile } = require("../services/storage.service");

const uploadsong = async (req, res) => {
  const songbuffer = req.file.buffer;
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
  });
  return res.status(201).json({ message: "Song uploaded successfully", song });
};
module.exports = { uploadsong };
