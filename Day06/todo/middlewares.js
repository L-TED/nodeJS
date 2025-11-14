const joi = require("joi");

const todoSchema = joi.object({
  id: joi.string(),
  title: joi.string().required(), // required() => undefined 허용 X
  description: joi.string(),
  status: joi.string().valid("pending", "in-progress", "done"),
  dueDate: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .allow(null),
  // => new Date().toISOString().split("T")[] / joi.date().required();
  createdAt: new Date().toLocaleTimeString(),
  updatedAt: new Date().toLocaleTimeString(),
});
const todoPutSchema = joi.object({
  id: joi.string(),
  title: joi.string().optional().required(), // required() => undefined 허용 X
  description: joi.string().optional(),
  status: joi.string().optional().valid("pending", "in-progress", "done"),
  dueDate: joi
    .string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .allow(null),
  // => new Date().toISOString().split("T")[] / joi.date().required();
  createdAt: new Date().toLocaleTimeString(),
  updatedAt: new Date().toLocaleTimeString(),
});

const subtaskSchema = joi.object({
  id: joi.string(),
  todoId: joi.string(),
  title: joi.string(),
  status: joi.string().valid("pending", "in-progress", "done"),
  createdAt: new Date().toLocaleTimeString(),
  updatedAt: new Date().toLocaleTimeString(),
});
const subtaskPutSchema = joi.object({
  id: joi.string(),
  todoId: joi.string().optional(),
  title: joi.string().optional(),
  status: joi.string().optional().valid("pending", "in-progress", "done"),
  createdAt: new Date().toLocaleTimeString(),
  updatedAt: new Date().toLocaleTimeString(),
});

const response = (req, res, next) => {
  res.success = (data) => {
    res.json({
      success: true,
      data,
      time: new Date().toLocaleTimeString(),
    });
  };
  res.error = () => {
    res.json({
      success: false,
      message: "Something went wrong",
      time: new Date().toLocaleTimeString(),
    });
  };
  next();
};

const checkTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) return res.status(404).json(`Something went wrong(todo)`);
  next();
};

const checkSub = (req, res, next) => {
  const { error } = subtaskSchema.validate(req.body);
  if (error) return res.status(404).json(`Something went wrong(subtask)`);
  next();
};

module.exports = { response, checkTodo, checkSub };
