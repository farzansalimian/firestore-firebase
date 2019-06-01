import { actionTypes } from "redux-firestore";

export const filterTasks = tag => (dispatch, getState, { getFirestore }) => {
  const creatorId = getState().firebase.auth.uid;

  dispatch({
    type: actionTypes.UNSET_LISTENER,
    payload: { name: "filteredTasks" }
  });
  const firestore = getFirestore();
  firestore.setListener({
    collection: "tasks",
    storeAs: "filteredTasks",
    limit: 10,
    where: [["tagIds", "array-contains", tag.id],['creatorId', '==', creatorId]]
  });
  dispatch({ type: "SET_FILTER", payload: tag });
};

export const deleteTask = task => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore
      .collection("tasks")
      .doc(task.id)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_TASK_SUCCESS" });
      })
      .catch(error => {
        dispatch({ type: "DELETE_TASK_ERROR" }, error);
      });
};

export const createTask = task => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const creatorId = getState().firebase.auth.uid;
  firestore
      .collection("tasks")
      .add({
        ...task,
        created: new Date(),
        creatorId
      })
      .then(() => {
        dispatch({ type: "CREATE_TASK_SUCCESS" });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "CREATE_TASK_ERROR" }, err);
      });
};

export const updateTask = task => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firestore
      .collection("tasks")
      .doc(task.id)
      .update({
        ...task
      })
      .then(() => {
        dispatch({ type: "UPDATE_TASK_SUCCESS" });
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: "UPDATE_TASK_ERROR" }, err);
      });
};
