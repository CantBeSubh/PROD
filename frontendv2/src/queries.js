import {gql} from "@apollo/client";

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


export {
    getHabitsQ,
    addHabitM,
    delHabitM,
    updateHabitM
}


//   const upHabit=(id)=>{
//     setHabits(
//       habits.map(habit => {
//         if (habit.id === id) {
//           return {
//             ...habit,
//             up: habit.up+1
//           };
//         }
//         return habit;
//       })
//     );
//   }

//   const downHabit=(id)=>{
//     setHabits(
//       habits.map(habit => {
//         if (habit.id === id) {
//           return {
//             ...habit,
//             down: habit.down+1
//           };
//         }
//         return habit;
//       })
//     );
//   }

//   const removeHabit=(id)=> {
//     setHabits(habits.filter(habit => habit.id !== id));
//   }