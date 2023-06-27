const resolvers = {
  Query: {
    tasks: async (_, __, {dataSources}) => {
      return await dataSources.postgres.getTasks();
    },
  },
  Mutation: {
    toggleTaskStatus: async (_, {id}, {dataSources})  => {
      const task = await dataSources.postgres.toggleTaskStatus(id);
      if (!task) {
        return {
          code: 404,
          success: false,
          message: `Task not found with id ${id}`,
          task: null,
        }
      }
      task.done = !task.done;
      return {
        code: 200,
        success: true,
        message: 'Task updated',
        task,
      }
    },
    addTask: async (_, {name}, {dataSources}) => {
      const task = await dataSources.postgres.addTask(name);
      if (!task) {
        return {
          code: 500,
          success: false,
          message: 'Error adding task',
          task: null,
        }
      }
      return {
        code: 200,
        success: true,
        message: 'Task added',
        task,
      }
    }
  }
}

export default resolvers;