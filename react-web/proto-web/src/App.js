import logo from './logo.svg';
import './App.css';
import Song from './Song';
import React, {useEffect, useState} from "react";


function openTextFile(){
  var input = document.createElement("input");
  input.type = "file";
  input.accept = "text/plain";

  input.onchange = function (event){
    processFile(event.target.files[0]);
  };
  input.click();
}

function processFile(file){
  var reader = new FileReader();
  reader.readAsText(file,"UTF-8");

  reader.onload = function(){
    console.log(reader.result);
  };
}

const App = () => {



  // var data1 = "C:\Users\sd\GitProjects\Capstone-project-2020-Fall\data\data_version_2.json";
  // const JSONdata1 = JSON.parse(data1);
  // console.log(JSONdata1);
  // let myRequest = new Request("C:\Users\sd\GitProjects\Capstone-project-2020-Fall\data\data_version_2.json")

  // fetch("C:\Users\sd\GitProjects\Capstone-project-2020-Fall\data\data_version_2.json")
  //   .then(function(resp){
  //     return resp.json();
  //   })
  //   .then(function(data){
  //     console.log(data.tags);
  //   })

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('성탄절');

  // useEffect(() => {
  //   getSongs();
  // }, []); // [query]);

  // const getSongs = async () => {
  //   const response = await fetch(
  //     // ??? 
  //   );
  //   const data = await response.json();
  //   setSongs(data.hits);
  //   console.log(data.hits);
  // };

  const updateSearch = e => {
      setSearch(e.target.value);
      console.log(search);
  }

  // const getSearch = e => {
  //   e.preventDefault();
  //   setQuery(search);
  // }


  return (
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">음악 추천</button>
      </form>
      <button onclick="openTextFile()">Open</button>
      <div id="output">File Contents Area</div>
      {/* {songs.map(song =>(
        <Song />
      ))}; */}
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello World!</h1>
//     </div>
//   );
// }

export default App;
