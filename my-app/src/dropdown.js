import React from "react";
import handleSubmit from "./App"
import handleSubmit_val from "./App"


function Dropdown({ inputValue_1, setInputValue_1,inputValue_2, setInputValue_2 }) {
  return (
    <div className="dropdown">
      {/* Input field for number */}
      <input
        type="number"
        value={inputValue_1}
        onChange={(e) => setInputValue_1(e.target.value)}
        placeholder="Enter input"
      />

      {/* Button for submitting value */}
      <button onClick={() => {handleSubmit();handleSubmit_val();}}>SUBMIT VALUE</button>

      {/* Input field for text */}
      <input
        type="text"
        value={inputValue_2}
        onChange={(e) => setInputValue_2(e.target.value)}
        placeholder="Enter input"
      />

      {/* Button for submitting description */}
      <button onClick={() => handleSubmit()}>SUBMIT DESCRIPTION</button>
    </div>
  );
}

export default Dropdown;
