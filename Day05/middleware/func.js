// const logger = (req, res, next) => {
//   console.log("미들웨어 실행됨");
//   console.log(`req.url: ${req.url}`);
//   console.log(`req.method: ${req.method}`);
//   next();
// };

// const timeChecker = (req, res, next) => {
//   console.log(new Date().toLocaleTimeString());
//   next();
// };

const response = (req, res, next) => {
  res.success = (data) => {
    res.json({
      success: true,
      data,
      time: new Date().toLocaleTimeString(),
    });
  };
  next();
};

module.exports = { logger, timeChecker, response };
