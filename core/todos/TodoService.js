import { guid } from "../utils";

export default class TodoService {
  createTodo(data) {
    const now = new Date();
    return {
      id: guid(),
      comments: null,
      createdDate: now,
      isDone: false,
      isLiked: false,
      ...data,
      lastUpdatedDate: now
    };
  }
  updateTodo(change, todo) {
    const now = new Date();
    return {
      ...todo,
      ...change,
      lastUpdatedDate: now
    };
  }
}
