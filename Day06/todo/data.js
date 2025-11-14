const todo = [
  {
    id: "aaa-bbb-ccc-111",
    title: "title is here",
    description: "none",
    status: "pending",
    dueDate: "2025-11-14",
    createdAt: "11-14 12:00 KOR",
    updatedAt: "11-14 12:00 KOR",
    subtask: [],
  },
];
const subtask = [
  {
    id: "aaa-bbb-ccc-111",
    todoId: "ddd-bbb-ccc-222",
    title: "title is here",
    status: "pending",
    createdAt: "11-14 12:00 KOR",
    updatedAt: "11-14 12:00 KOR",
  },
];

module.exports = { todo, subtask };
