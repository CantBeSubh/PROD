import {gql} from "@apollo/client";

//Habit
const getHabitsQ = gql`
  {
      habits{
          id
          name
          up
          down
      }
  }
`
const addHabitM=gql`
mutation($name:String!,$uid:ID!){
  addHabit(name:$name,uid:$uid){
    name
  }
}
`
const delHabitM=gql`
  mutation($id:ID){
    delHabit(id:$id){
      name
    }
  }
`
const updateHabitM=gql`
mutation($id:ID!,$name:String,$up:Int,$down:Int){
  updateHabit(id:$id,name:$name,up:$up,down:$down){
    name
  }
}
`
//.Todo
const getTodosQ=gql`
{
  todos{
    name
    id
    check
  }
}
`
const addTodoM=gql`
mutation($uid:ID!,$name:String!){
  addTodo(name:$name,uid:$uid){
    name
    id
    check
  }
}
`
const delTodoM=gql`
mutation($id:ID!){
  delTodo(id:$id){
    name
  }
}
`
const updateTodoM=gql`
mutation($id:ID!,$name:String,$check:Boolean){
  updateTodo(id: $id,name: $name,check: $check){
    name
  }
}
`

export {
    getHabitsQ,
    addHabitM,
    delHabitM,
    updateHabitM,
    getTodosQ,
    addTodoM,
    delTodoM,
    updateTodoM
}
