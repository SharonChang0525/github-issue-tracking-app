import * as type from "../actions/ActionTypes";

// turn issue from json to obj //
function toTask(data){
  let res = [];
  for(let i = 0; i < data.length; i++) {
    let tmpObj = {
        id: data[i].id,
        title: data[i].title,
        body: data[i].body,
        state: data[i].state,
        repo: data[i].repository.name,
        owner: data[i].repository.owner.login,
        created_at: data[i].created_at,
        issue_number: data[i].number
    };
    res.push(tmpObj);
  }
  return res;
}

const taskReducer = (state = [], action) => {
    switch(action.type) {
        case type.GET_ALL_TASK:                  
          return toTask(action.all_tasks);

        case type.EDIT_TASK:
          let idx = state.findIndex((x) => x.id === action.id);
          return state.map((item, index) => {
            if(index !== idx) {
              return item;
            }
            item.title = action.newTitle;
            item.body = action.newBody;
            item.state = action.newState;
            return {
              ...item
            }
          })
          
        default:
            return state;
    }
}

export default taskReducer;