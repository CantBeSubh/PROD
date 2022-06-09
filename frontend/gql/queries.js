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
mutation($name:String!,$up:Number,$down:Number,$uid:ID!){
  addBook(name:$name,up:$up,down:$down,uid:$uid){
    name
    up
    down
  }
}
`

const getBookQuery = gql`
  query GetBook($id: ID){
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export {
    getHabitsQ,
    addHabitM
}


// const addHabit=(habit)=>{
//     setHabits([habit, ...habits])
//   }

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