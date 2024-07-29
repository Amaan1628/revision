import axios from "axios";
import { useState } from 'react';
import './App.css';

function App() {
  const API = "https://v2.jokeapi.dev/joke/";
  const container = ["Programming","Miscellaneous","Dark","Pun","Spooky","Christmas"]

  const [joke,setJoke] = useState("");
  const [flags,setFlags] = useState("");
  const [categories,setcategories] = useState("");
  
  function handleFlag(event) {
    setFlags(event.target.value)
  }

  function handleCategories (event) {
    setcategories(event.target.value)
  }

  function clear () {
    setcategories("")
  }
  
  async function getjoke() {
    try{
      if (flags && categories) {
        const res = await axios.get(API +`${categories}?blacklistFlags=${flags}&type=single`);
        const result = res.data.joke
        console.log(`if statement (BOTHH)`)
        setJoke(result)
      }
      else if (flags) {
        const res = await axios.get(API +`Any?blacklistFlags=${flags}&type=single`);
        const result = res.data.joke
        console.log("else if statement (FLAG)")
        setJoke(result)
      } else if (categories) {
        const res = await axios.get(API +`${categories}?type=single`);
        const result = res.data.joke
        console.log( categories + "else if statement (CATEGORIES)")
        setJoke(result)
      } else {
      const res = await axios.get(API +`Any?type=single`);
      const result = res.data.joke
      console.log(`else statement`);
      setJoke(result)
      }
    } 
    catch (error){
      console.log(error);
    }
  }

  return (
    <div className=" flex flex-col items-center bg-[#FFDFD6] h-screen">
      <h1 className="text-[#694F8E] font-extrabold font-mono text-[50px] italic underline decoration-wavy underline-offset-4">Joke Generator</h1>
      
      <div className="pt-14 flex flex-col ">
        <label className="font-extrabold font-mono text-xl underline-offset-4 text-[#B692C2]">Blacklist topics :</label>
        <select className="bg-[#E3A5C7] px-4 py-2 rounded-lg focus:outline-none text-white " 
        id="dropdown" value={flags} onChange={handleFlag}>
        <option value="">None</option>
          <option value="nsfw">NSFW</option>
          <option value="religious">Religious</option>
          <option value="political">Political</option>
          <option value="racist">Racist</option>
          <option value="sexist">Sexist</option>
          <option value="explicit">Explicit</option>
        </select>
        {/* <p>Selected Value: {flags}</p> */}
      </div>

      <div className="pt-14 flex flex-col ">
        <label className="font-extrabold font-mono text-xl underline-offset-4 text-[#B692C2]"> Select a joke category : </label>
           {container.map( (cat) => (
            <div className="flex flex-row gap-2 justify-start">
              
              <input key={cat} type="radio" name="categories" value={cat} onChange={handleCategories}
              className=""></input>
              <label className="text-lg font-semibold text-[#E3A5C7] p-2 font-mono">{cat}</label>
              
            </div>
           ) ) }
           <button className="bg-[#E3A5C7] w-20 rounded-lg" onChange={clear}>Clear</button>
      </div>

      <button 
      className="bg-[#694F8E] py-3 m-4 w-[200px] text-white rounded-lg text-xl font-semibold"
      onClick={getjoke}>
        GET JOKE
        </button>

      <div className='w-3/4 h-auto p-3 text-xl font-mono bg-[#B692C2] rounded-xl'> {joke} </div>

    </div>
  );
}

export default App;