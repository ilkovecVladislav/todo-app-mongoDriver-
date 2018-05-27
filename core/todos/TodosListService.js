export default class TodosListService {
  constructor(todosListDAO, todoService) {
    this.todosListDAO = todosListDAO;
    this.todoService = todoService;
  }

  createTodoItem(data) {
    const todo = this.todoService.createTodo(data);
    return this.todosListDAO.create(todo);
  }

  async updateTodoItem(todoId, change) {
    const todo = await this.todosListDAO.getById(todoId);
    const updatedTodo = this.todoService.updateTodo(change, todo);
    return this.todosListDAO.update(updatedTodo);
  }

  removeTodoItem(todoId) {
    return this.todosListDAO.removeById(todoId);
  }

  addItemComment(todoId, commentText) {
    return this.updateTodoItem(todoId, {
      comment: commentText
    });
  }

  toggleItemLike(todoId, isLiked) {
    return this.updateTodoItem(todoId, {
      isLiked
    });
  }

  toggleItemCompleted(todoId, isDone) {
    return this.updateTodoItem(todoId, {
      isDone
    });
  }
}
