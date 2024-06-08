const Ted = require("../models/tedModel.js");

const TedController = {
  getAllData,
  createData,
};

async function getAllData(req, res) {
  try {
    const data = await Ted.find();
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 500,
        message: error,
      },
    });
  }
}

async function createData(req, res) {
  try {
    const { title } = req.body;
    const isTitle = await Ted.findOne({ title });

    if (isTitle) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Title already exist",
        },
      });
    }

    const data = await Ted.create(req.body);
    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: data,
    });
  } catch (error) {
    res.status(304).json({
      status: {
        code: 304,
        message: error,
      },
    });
  }
}

module.exports = TedController;
