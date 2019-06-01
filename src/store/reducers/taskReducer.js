const initState = {}

const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TASK_SUCCESS':
      console.log('CREATE_TASK_SUCCESS');
      return state;
    case 'CREATE_TASK_ERROR':
      console.log('CREATE_TASK_ERROR');
      return state;

    case 'UPDATE_TASK_SUCCESS':
      console.log('UPDATE_TASK_SUCCESS');
      return state;

    case 'UPDATE_TASK_ERROR':
      console.log('UPDATE_TASK_ERROR');
      return state;

    case 'SET_FILTER':
      if (action.payload)
      console.log('SET_FILTER By '+action.payload.name);
        else
        console.log('SET_FILTER_SHOW_ALL_TASK');

      return state;
    case 'DELETE_TASK_SUCCESS':
      console.log('DELETE_TASK_SUCCESS');
      return state;

    case 'DELETE_TASK_ERROR':
      console.log('DELETE_TASK_ERROR');
      return state;

    default:
      return state;
  }
};

export default taskReducer;
