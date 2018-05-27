export default class TodosListMongoDAO {
  constructor(mongoClient, mongoURI) {
    this.mongoClient = mongoClient;
    this.mongoURI = mongoURI;
  }

  async connect() {
    const connection = await this.mongoClient.connect(this.mongoURI);
    return {
      collection: connection.db("todos").collection("todos"),
      connection
    };
  }

  async getAll() {
    const { connection, collection } = await this.connect();

    try {
      return collection.find().toArray();
    } finally {
      connection.close();
    }
  }

  async create(todoItem) {
    const { connection, collection } = await this.connect();

    try {
      return collection.insertOne(todoItem);
    } finally {
      connection.close();
    }
  }

  async update(todoItem) {
    const { connection, collection } = await this.connect();

    try {
      return collection.replaceOne({ id: todoItem.id }, todoItem);
    } finally {
      connection.close();
    }
  }

  remove(todoItem) {
    return this.removeById(todoItem.id);
  }

  async getById(id) {
    const { connection, collection } = await this.connect();

    try {
      return collection.findOne({ id });
    } finally {
      connection.close();
    }
  }

  async removeById(id) {
    const { connection, collection } = await this.connect();

    let deletedCount = 0;

    try {
      const result = await collection.deleteOne({
        id
      });
      deletedCount = result.deletedCount;
    } finally {
      connection.close();
    }

    return deletedCount;
  }
}
