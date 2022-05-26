import { useState } from 'react'
import app from '../api/firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import logo from './logo.svg'
import './App.css'

const db = getFirestore(app);
const getCities=async(db)=> {
  const citiesCol = collection(db, 'test');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

function App() {
  const [count, setCount] = useState(0)
  const [data,setData]=useState([''])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => getCities(db).then((data)=>{
            console.log(data[0].HELLO)
            setData(data)
          }
            )}>
            count is: {data[0].HELLO || 'F'}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
