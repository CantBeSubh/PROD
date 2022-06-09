import {gql} from "@apollo/client";

const getHabits = gql`
  {
      habits{
          id
          name
          up
          down
      }
  }
`
const addBookMutation=gql`
mutation($name:String!,$genre:String!,$authorId:ID!){
  addBook(name:$name,genre:$genre,authorId:$authorId){
    name
    id
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
    getHabits
}