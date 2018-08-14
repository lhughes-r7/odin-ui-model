import { createReducer } from "./utils";
import NESTED_TABLE_ACTION from '/actions/nestedTable';

const initialState = 0;

export default createReducer(initialState, {
  [NESTED_TABLE_ACTION](state) {
    return {
      state
    };
  }
});
