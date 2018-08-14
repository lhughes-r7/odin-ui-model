import typeToReducer from 'type-to-reducer';

// const dispatchPromise = (action, promise) => {
//   return async (dispatch) => {
//     dispatch({
//       type: `${action}_PENDING`
//     });
//
//     try {
//       const response = await promise;
//
//       dispatch({
//         type: `${action}_FULFILLED`,
//         payload: response.data
//       });
//     } catch (error) {
//       dispatch({
//         type: `${action}_REJECTED`,
//         payload: error
//       });
//     }
//   };
// };

const defaultReducers = {
  fulfilled: (state, payload) => {
    return payload;
  },
  rejected: () => {
    return null;
  }
};

const promiseReducer = (action, initialData = null, reducers = defaultReducers) => {
  return typeToReducer({
    [action]: {
      PENDING: (state) => {
        return {
          state,
          pending: true,
          error: null
        };
      },
      REJECTED: (state, action) => {
        return {
          pending: false,
          error: action.payload,
          data: reducers.rejected(state.data, action.payload)
        };
      },
      FULFILLED: (state, action) => {
        return {
          pending: false,
          error: null,
          data: reducers.fulfilled(state.data, action.payload)
        };
      }
    }
  }, {
    pending: false,
    data: initialData,
    error: null
  });
};

const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
};

export {
  createReducer
};

export default promiseReducer;


