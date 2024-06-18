const Ted = require("../models/tedModel.js");

const TedController = {
  getAllData,
  createData,
  getTotalViewsYear,
  getTotalLikesYear,
  deleteData,
  getTopFourViews,
  getMonthlyViews,
  getMonthlyLikes,
  getMonthlyVideos,
  getVideoDetail,
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

async function getMonthlyViews(req, res) {
  try {
    const { year } = req.params;

    const data = await Ted.find();
    const viewsPerMonth = Array(12).fill(0);

    data.forEach((item) => {
      const [month, itemYear] = item.date.split(" ");

      if (itemYear === year) {
        const monthIndex = new Date(`${month} 1, ${itemYear}`).getMonth();
        viewsPerMonth[monthIndex] += item.views;
      }
    });

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const result = {
      month: months,
      y: viewsPerMonth,
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

async function getMonthlyLikes(req, res) {
  try {
    const { year } = req.params;

    const data = await Ted.find();
    const likesPerMonth = Array(12).fill(0);

    data.forEach((item) => {
      const [month, itemYear] = item.date.split(" ");

      if (itemYear === year) {
        const monthIndex = new Date(`${month} 1, ${itemYear}`).getMonth();
        likesPerMonth[monthIndex] += item.likes;
      }
    });

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const result = {
      month: months,
      y: likesPerMonth,
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

async function getMonthlyVideos(req, res) {
  try {
    const { year, month } = req.params;
    const formattedMonth = new Date(`${month} 1, ${year}`).toLocaleString(
      "default",
      { month: "long" }
    );
    const data = await Ted.find();

    const filteredData = data.filter((item) => {
      const [itemMonth, itemYear] = item.date.split(" ");
      return itemMonth === formattedMonth && itemYear === year;
    });

    const values = filteredData.map((item) => item.views);
    const labels = filteredData.map((item) => item.title);
    const id = filteredData.map((item) => item.id);

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: {
        values,
        labels,
        id,
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

async function getVideoDetail(req, res) {
  try {
    const { id } = req.params;
    const data = await Ted.findById(id);
    if (!data) {
      return res.status(404).json({
        status: {
          code: 404,
          message: `Cannot find any video with id ${id}`,
        },
      });
    }

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

async function getTopFourViews(req, res) {
  try {
    const data = await Ted.find().sort({ views: -1 }).limit(4);

    function formatViews(views) {
      if (views >= 1000000000) {
        return (views / 1000000000).toFixed(1) + "b";
      } else if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + "m";
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + "k";
      } else {
        return views.toString();
      }
    }

    const formattedData = data.map((item) => ({
      ...item.toObject(),
      views: formatViews(item.views),
    }));

    res.status(200).json({
      status: {
        code: 200,
        message: "Success",
      },
      data: formattedData,
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

module.exports = TedController;
