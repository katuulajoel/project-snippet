/**
 * Used for update state reducers
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const reducerUpdate = (data, action) => {
  const newData = data.map((item) => {
    if (item.id === action.data.id) {
      return {
        ...item,
        ...action.data,
      };
    }
    return item;
  });
  return newData;
};
