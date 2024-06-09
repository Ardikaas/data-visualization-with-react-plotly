const Ted = require("../models/tedModel.js");

const TedController = {
  getAllData,
  createData,
  getTotalViewsYear,
  getTotalLikesYear,
  deleteData,
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

async function getTotalViewsYear(req, res) {
  try {
    const data = await Ted.find();
    const viewsYear = {};

    data.forEach((item) => {
      const year = item.date.split(" ")[1];
      if (!viewsYear[year]) {
        viewsYear[year] = 0;
      }
      viewsYear[year] += item.views;
    });

    const result = {
      year: Object.keys(viewsYear).map(Number),
      totalviews: Object.values(viewsYear),
    };

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: result,
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

async function getTotalLikesYear(req, res) {
  try {
    const data = await Ted.find();
    const likesYear = {};

    data.forEach((item) => {
      const year = item.date.split(" ")[1];
      if (!likesYear[year]) {
        likesYear[year] = 0;
      }
      likesYear[year] += item.likes;
    });

    const result = {
      year: Object.keys(likesYear).map(Number),
      totallikes: Object.values(likesYear),
    };

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: result,
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

async function deleteData(req, res) {
  try {
    const { title } = req.body;
    const data = await Ted.findOneAndDelete({ title });
    if (!data) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `cannot find any date with title "${title}"`,
        },
      });
    }
    res.status(200).json({
      status: {
        code: 200,
        message: "Data successfully deleted",
      },
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
