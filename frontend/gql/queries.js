import {gql} from "@apollo/client";

//Habit
const getHabitsQ = gql`
  query GetHabits($uid:ID){
      habits(uid:$uid){
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
query GetTodos($uid:ID){
  todos(uid:$uid){
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

//User
const loginQ=gql`
query($email:String!,$password:String!){
  login(email:$email,password:$password){
    status
    id
    token
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
    updateTodoM,
    loginQ
}
