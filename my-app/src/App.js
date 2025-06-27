import React, { useState } from 'react';
// import Dropdown from "./dropdown";
// const socket = new WebSocket('ws://localhost:5001');


// Connect to WebSocket server

// socket.onmessage = (event) => {
//     console.log(`Message from server: ${event.data}`);
//     const outputDiv = document.getElementById('output'); // Assume you have a div to display output
//     outputDiv.textContent = `${event.data}`; // Append output to the div
// };

// socket.onopen = () => {
//     console.log('Connected to WebSocket server');
// };

// socket.onclose = () => {
//     console.log('Disconnected from WebSocket server');
// };
function App() {

    // const [input, setInput] = useState('');
    const [input_income, setInput_income] = useState('');
    const [input_des, setInput_des] = useState('');
    const [input_exp, setInput_exp] = useState('');
    
    const [input_exp_des, setInput_exp_des] = useState('');
    const [input_mi_des, setInput_mi_des] = useState('');



    const [output, setOutput] = useState([]);
    // const [input_1, setInput_1] = useState('');
    // const [output_1, setOutput_1] = useState('');
    const [output_1, setOutput_1] = useState([]);
    // const [buttonText, setButtonText] = useState("SUBMIT i"); 

    // const [input_2, setInput_2] = useState('');
    const [output_2, setOutput_2] = useState('');
    // const [input_5, setInput_5] = useState('');
    // const [input_6, setInput_6] = useState('');

    // const [showDropdown, setShowDropdown] = useState(false);
    // const description = "description"; // Predefined value to compare with output

    // const handleSubmit = async () => {
    //     // Check if output !== description before proceeding
    //     if (output !== description) {
    //         // Ensure input is a valid number
    //         if (!isNaN(input) && input.trim() !== "") {
    //             try {
    //                 const response = await fetch("http://localhost:5000/send-input", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify({ input: parseInt(input, 10) }), // Send input as number
    //                 });

    //                 const data = await response.json();
    //                 setOutput(data.message); // Update the output state with server response
    //             } catch (error) {
    //                 console.error("Error:", error);
    //                 setOutput("Failed to send input."); // Handle error
    //             }
    //         } else {
    //             alert("Please enter a valid number!"); // Notify user if input is not a number
    //         }
    //     } else {
    //         alert("Input cannot be sent because output matches description.");
    //     }

    //     // Clear the input field after submission
    //     setInput("");
    // };



     

    // const handleSubmit_1 = async () => {
    //     const response = await fetch('http://localhost:5000/start-exe', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ input: parseInt(input_1, 10) }),
    //     });
    //     const data = await response.json();
    //     setOutput_1(data.message);
    // };
    // const toggleDropdown = () => {
    //     // handleOption();
    //     setShowDropdown(!showDropdown);
    //   };
    
    //   // New function for handling submission within the dropdown
    //   const handleDropdownSubmit = () => {
    //     // handleSubmit();
    //     alert(`Dropdown submitted value: ${input}`);
    //     setInput(""); // Reset the input field after submission
    //   };
      const [visibleDropdown, setVisibleDropdown] = useState(null); // Track which dropdown is open
      const [Hide_submitted_fields,setHide_submitted_fields]=useState(true);
      const [visibleDropdown_1, setVisibleDropdown_1] = useState(null); // Track which dropdown is open
       const [step, setStep] = useState(1);

       const count_step =(event)=>{
          if(step >= 3){
            setStep(1);
            toggleDropdown_1(event);
          }
          else
        setStep((prevStep) => prevStep + 1);
       }
      const toggleDropdown = (event) => {
        const id = event.target.value;
        // Toggle visibility of the dropdown
        setVisibleDropdown(visibleDropdown === id ? null : id);
        if (visibleDropdown === id) {
            setVisibleDropdown_1(null); 
          // Reset child dropdown when parent dropdown changes
          }
      };
      
        const field_val = (event) => {
      
        // Toggle visibility of the dropdown
        setHide_submitted_fields(Hide_submitted_fields === true ?false : true);
      };



      const toggleDropdown_1 = (event) => {
        const id = event.target.value;
        // Toggle visibility of the dropdown
        setVisibleDropdown_1(visibleDropdown_1 === id ? null : id);
      };
    
      // const handleSubmit_val = () => {
      //   setInput("");
      //   alert(`Dropdown submitted value: ${input}`);
      // };
      const handleSubmit_val_income = (event) => {
        // setInput("");
        alert(`Dropdown submitted value: ${event}`);
      };





    const handleSubmit_1 = async (event) => {
        try {
            const fixedInput = event.target.value;
            const response = await fetch('https://pit-9h9i.onrender.com/start-exe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: fixedInput }), // Include the input
            });
    
            const data = await response.json(); // Parse the response
    
            if (response.ok) {
                // Display the 'message' from the server (e.g., "Process started successfully")
                // setOutput_1(data.message);
                // setOutput_1(String(data.message)); 
                const message = data.message;

           // Split the message into individual lines
            const lines = message.split('\n');
            console.log(lines);
        // Join lines back if needed or use them directly
           setOutput_1(lines);
            } else {
                // Handle errors (e.g., "Process is already running")
                const message = data.error;

                // Split the message into individual lines
                 const lines = message.split('\n');
                 console.log(lines);
             // Join lines back if needed or use them directly
                setOutput_1(lines);
                // setOutput_1(data.error || "An error occurred.");

            }
        } catch (error) {
            console.error("Error:", error);

            const message="Failed to start the process.\n";
            const lines = message.split('\n');
                 console.log(lines);
             // Join lines back if needed or use them directly
                setOutput_1(lines);
            // setOutput_1("Failed to start the process.\n"); // Handle network or other errors
        }
    };
    
    const handleSubmit_income = async (event) => {
      try{
       const fixedInput = event; // Button value ("1")

       // Send the fixed value to the backend
       const response = await fetch("https://pit-9h9i.onrender.com/send-input", {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({ input: fixedInput }), // Send value as input
       });



       // const isNumber = !isNaN(input) && input.trim() !== "";
       // const response = await fetch("http://localhost:5000/send-input", {
       //     method: "POST",
       //     headers: {
       //         "Content-Type": "application/json",
       //     },
       //     body: JSON.stringify({
       //         input: isNumber ? parseInt(input, 10) : input, // Convert to number if applicable
       //     }),
       // });

       // const response = await fetch('http://localhost:5000/send-input', {
       //     method: 'POST',
       //     headers: {
       //         'Content-Type': 'application/json',
       //     },
       //     body: JSON.stringify({ input: parseInt(input, 10) }),
       // });
       const data = await response.json();
       if (response.ok) {
           // Display the 'message' from the server (e.g., "Process started successfully")
           // setOutput(data.message);

           // setOutput(String(data.message)); 
           const message = data.message;

           // Split the message into individual lines
            const lines = message.split('\n');
            console.log(lines);
        // Join lines back if needed or use them directly
           setOutput(lines);
          //  if(buttonText==="description")
          //  {

          //   setVisibleDropdown_1(null);
          //  }
       } else {
           // Handle errors (e.g., "Process is already running")
           // setOutput(data.error || "An error occurred.");
           const message = data.error;

           // Split the message into individual lines
            const lines = message.split('\n');
            console.log(lines);
        // Join lines back if needed or use them directly
           setOutput(lines);
       }
      //  setInput("");
       
   }
   catch (error) {
       console.log("Error:", error);
       const errorArray = error.message.split("\n"); // Split the error message by spaces

   setOutput(errorArray);

       // setOutput(error);// Handle network or other errors
   }
   };


    const handleOption = async (event) => {
       try{
        const fixedInput = event.target.value; // Button value ("1")

        // Send the fixed value to the backend
        const response = await fetch("https://pit-9h9i.onrender.com/send-input", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ input: fixedInput }), // Send value as input
        });



        // const isNumber = !isNaN(input) && input.trim() !== "";
        // const response = await fetch("http://localhost:5000/send-input", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         input: isNumber ? parseInt(input, 10) : input, // Convert to number if applicable
        //     }),
        // });

        // const response = await fetch('http://localhost:5000/send-input', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ input: parseInt(input, 10) }),
        // });
        const data = await response.json();
        if (response.ok) {
            // Display the 'message' from the server (e.g., "Process started successfully")
            // setOutput(data.message);

            // setOutput(String(data.message)); 
            const message = data.message;

            // Split the message into individual lines
             const lines = message.split('\n');
             console.log(lines);
         // Join lines back if needed or use them directly
            setOutput(lines);
        } else {
            // Handle errors (e.g., "Process is already running")
            // setOutput(data.error || "An error occurred.");
            const message = data.error;

            // Split the message into individual lines
             const lines = message.split('\n');
             console.log(lines);
         // Join lines back if needed or use them directly
            setOutput(lines);
        }
        // setInput("");
        
    }
    catch (error) {
        console.log("Error:", error);
        const errorArray = error.message.split("\n"); // Split the error message by spaces

    setOutput(errorArray);

        // setOutput(error);// Handle network or other errors
    }
    };




//    Give Input values
//    const handleSubmit = async () => {
//     try{
     


//      const isNumber = !isNaN(input) && input.trim() !== "";
//      const response = await fetch("http://localhost:5000/send-input", {
//          method: "POST",
//          headers: {
//              "Content-Type": "application/json",
//          },
//          body: JSON.stringify({
//              input: isNumber ? parseInt(input, 10) : input, // Convert to number if applicable
//          }),
//      });

//      // const response = await fetch('http://localhost:5000/send-input', {
//      //     method: 'POST',
//      //     headers: {
//      //         'Content-Type': 'application/json',
//      //     },
//      //     body: JSON.stringify({ input: parseInt(input, 10) }),
//      // });
//      const data = await response.json();
//      if (response.ok) {
//          // Display the 'message' from the server (e.g., "Process started successfully")
//          setOutput(data.message);
//      } else {
//          // Handle errors (e.g., "Process is already running")
//          const errorArray = data.error.message.split("\n"); // Split the error message by spaces

//     setOutput(errorArray  || ["An error occurred."]);
//         //  setOutput(data.error || "An error occurred.");
//      }
//      setInput("");
     
//  }
//  catch (error) {
//      console.error("Error:", error);
//      const errorArray = error.message.split(" "); // Split the error message by spaces

//     setOutput(errorArray);
//     //  setOutput(error); // Handle network or other errors
//  }
//  };
    





    const handleSubmit_2 = async (event) => {
       try{
           setOutput_1([]);
           const fixedInput = event.target.value;
           const response = await fetch('https://pit-9h9i.onrender.com/stop-exe', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: fixedInput }),
            });
            const data = await response.json();
            if (response.ok) {
                // Display the 'message' from the server (e.g., "Process started successfully")
                // setOutput_2(data.message);
                setOutput_2(String(data.message)); 
            } else {
                // Handle errors (e.g., "Process is already running")
                setOutput_2(data.error || "An error occurred.");
            }
        }
        catch(error)
        {
          const errorArray = error.message.split(" "); // Split the error message by spaces

    setOutput_2(errorArray);
            // setOutput_2(error);
        }
    };
    return (
        <div>
            <h1>Run C++ Program</h1>
            {/* <input
                type="number"
                value={input_1}
                onChange={(e) => setInput_1(e.target.value)}
                placeholder="Enter input"
            /> */}
            <button onClick={handleSubmit_1} value="1">Start the App</button>
            {/* <div>{output_1}</div> */}
            {output_1.map((line, index) => <div key={index}>{line}</div>)}

            
            <div id="output"></div>
            <h1>Now give the input down here</h1>
      {/* <div>{output}</div> */}
      {output.map((line, index) => <div key={index}>{line}</div>)}

    <div>
      {/* <button onClick={() => toggleDropdown(1)}>Element 1</button> */}
      <button onClick={(event)=>{toggleDropdown(event);handleOption(event);}} value="1">
        Record INCOME
      </button>

      {visibleDropdown === "1" && (
        <div className="dropdown">
          {

           Hide_submitted_fields === true  &&(

            <div>

            < input
            type="text"
            value={input_income}
            onChange={(e) => setInput_income(e.target.value)}
            placeholder="Enter input"
            
            
            />
          
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_income);handleSubmit_val_income(input_income);field_val();}}>SUBMIT i</button>
            </div>
          )}
           {

           Hide_submitted_fields === false  &&(

            <div>

          <input
            type="text"
            value={input_des}
            onChange={(e) => setInput_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_des);handleSubmit_val_income(input_des);field_val();toggleDropdown(event);}}> SUBMIT d</button>
          </div>
          )}



      
        </div>
        
      )}
    </div>
    <div>
      <button onClick={(event)=>{toggleDropdown(event);handleOption(event);}} value="2">
      Record EXPENDITURE
      </button>

      {visibleDropdown === "2" && (
        <div className="dropdown">
           {

           Hide_submitted_fields === true  &&(

            <div>
           <input
            type="text"
            value={input_exp}
            onChange={(e) => setInput_exp(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp);handleSubmit_val_income(input_exp);field_val();}}>SUBMIT e</button>
             </div>
          )}
           {

           Hide_submitted_fields === false  &&(

            <div>
          <input
            type="text"
            value={input_exp_des}
            onChange={(e) => setInput_exp_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp_des);handleSubmit_val_income(input_exp_des);field_val();toggleDropdown(event);}}> SUBMIT d</button>
          </div>
           )}
        </div>
      )}
    </div>
    <div>
      <button onClick={(event)=>{toggleDropdown(event);handleOption(event);}} value="3">
      Make Investment
      </button>
     

    

      {visibleDropdown === "3" && (
    

     




    <div className="dropdown">
            <button onClick={(event)=>{toggleDropdown_1(event);handleOption(event);}}  value="1"  aria-expanded={visibleDropdown_1 === "1"} >FD
       </button> 
    <button onClick={(event)=>{toggleDropdown_1(event);handleOption(event);}}  value="2"  aria-expanded={visibleDropdown_1 === "2"} >SIP
       </button> 
    <button onClick={(event)=>{toggleDropdown_1(event);handleOption(event);}}  value="3"  aria-expanded={visibleDropdown_1 === "3"} >ETF
       </button> 
       <button onClick={handleOption}  value="4"> Research </button>


      <button onClick={(event)=>{toggleDropdown(event);toggleDropdown_1(event);handleOption(event);}}  value="5" >back</button>
         
        </div>
      )}
      {visibleDropdown_1 === "1" && (
      <div>
      {step === 1 && (
        <div>
            
           <input
            type="text"
            value={input_exp}
            onChange={(e) => setInput_exp(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp);handleSubmit_val_income(input_exp);count_step(event);}}>SUBMIT FD</button>
          </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            value={input_exp_des}
            onChange={(e) => setInput_exp_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp_des);handleSubmit_val_income(input_exp_des);count_step(event);}}> SUBMIT dur</button>
       </div>
      )}
          {step === 3 && (
        <div>
          <input
            type="text"
            value={input_mi_des}
            onChange={(e) => setInput_mi_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_mi_des);handleSubmit_val_income(input_mi_des);count_step(event);}}> SUBMIT Mont</button>
      </div>
      )}
    </div>
    )}
    {visibleDropdown_1 === "2" && (
      <div>

           {

           Hide_submitted_fields === true  &&(

            <div>
           <input
            type="text"
            value={input_exp}
            onChange={(e) => setInput_exp(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp);handleSubmit_val_income(input_exp);field_val();}}>SUBMIT e</button>
             </div>
          )}
           {

           Hide_submitted_fields === false  &&(

            <div>
          <input
            type="text"
            value={input_exp_des}
            onChange={(e) => setInput_exp_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp_des);handleSubmit_val_income(input_exp_des);field_val();toggleDropdown_1(event);}}> SUBMIT d</button>
          </div>
           )}
          
           
    </div>
    )}
    {visibleDropdown_1 === "3" && (
      <div>
{step === 1 && (
        <div>
            
           <input
            type="text"
            value={input_exp}
            onChange={(e) => setInput_exp(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp);handleSubmit_val_income(input_exp);count_step(event);}}>SUBMIT FD</button>
          </div>
      )}
      {step === 2 && (
        <div>
          <input
            type="text"
            value={input_exp_des}
            onChange={(e) => setInput_exp_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_exp_des);handleSubmit_val_income(input_exp_des);count_step(event);}}> SUBMIT dur</button>
       </div>
      )}
          {step === 3 && (
        <div>
          <input
            type="text"
            value={input_mi_des}
            onChange={(e) => setInput_mi_des(e.target.value)}
            placeholder="Enter input"
          />
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button onClick={(event)=>{handleSubmit_income(input_mi_des);handleSubmit_val_income(input_mi_des);count_step(event);}}> SUBMIT Mont</button>
      </div>
      )}
           
    </div>
    )}
    </div>
    {/* <div>
      <button onClick={(event)=>{toggleDropdown(event);handleOption(event);}} value="1">
      Record EXPENDITURE test
      </button>

      {visibleDropdown === "1" && (
        <Dropdown
        inputValue_1={input_5}
        setInputValue_1={setInput_5}
        inputValue_2={input_6}
        setInputValue_2={setInput_6}
        // onSubmitValue={handleSubmitValue}
        // onSubmitDescription={handleSubmitDescription}
      />
      )}
    </div> */}
    
            
            {/* <button onClick={handleOption}  value="1" >Record INCOME</button>
            <button onClick={handleOption}  value="2">Record EXPENDITURE</button> */}
            {/* <button onClick={handleOption}  value="3">Make Investmen</button> */}
            <button onClick={handleOption}  value="4" >Finance Information</button>
            <button onClick={handleOption}  value="5">Investment Information</button>
            <button onClick={handleOption}  value="6">save data</button>
            <button onClick={handleOption}  value="7">load data</button>
            {/* <div>
            <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input"
            />
            <button onClick={handleSubmit} >SUBMIT VALUE</button>
            </div>
            <div>
            <input
                type="text"
                value={input_1}
                onChange={(e) => setInput_1(e.target.value)}
                placeholder="Enter input"
            />
            <button onClick={handleSubmit} >SUBMIT DESCRIPTION</button>
            </div> */}
            <h1>close the application</h1>
            
            <button onClick={handleSubmit_2} value="1">Terminate</button>
            <div>{output_2}</div>
        </div>
    );
}

export default App;
