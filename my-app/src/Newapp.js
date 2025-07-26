// import React, { useEffect, useRef, useState } from 'react';
// import './Newapp.css';

// const texts = [
//   "Persnal Investment Tracker",
//   "Track Income",
//   "Record Expenditure",
//   "Record Investment",
//   "Get PE and PB of differnt Nifty Index"
// ];

// const actions = [
//   "Add Income",
//   "Add Expense",
//   "View Report",
//   "Edit Entry",
//   "Track Index",
//   "Settings"
// ];
// const Newapp = () => {

//     const [showOptions, setShowOptions] = useState(false);

//   const handleClick = () => {
//     setShowOptions(true);
//   };

//   const [textIndex, setTextIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [visibleText, setVisibleText] = useState('');
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     const currentText = texts[textIndex];
//     const isEnd = charIndex === currentText.length;
//     const isStart = charIndex === 0;

//     if (!isDeleting && !isEnd) {
//       setVisibleText(currentText.slice(0, charIndex + 1));
//       intervalRef.current = setTimeout(() => setCharIndex(prev => prev + 1), 100);
//     } else if (isDeleting && !isStart) {
//       setVisibleText(currentText.slice(0, charIndex - 1));
//       intervalRef.current = setTimeout(() => setCharIndex(prev => prev - 1), 60);
//     } else {
//       clearTimeout(intervalRef.current);
//       setTimeout(() => {
//         setIsDeleting(prev => !prev);
//         if (isDeleting) {
//           setTextIndex(prev => (prev + 1) % texts.length);
//         }
//       }, 600);
//     }

//     return () => clearTimeout(intervalRef.current);
//   }, [charIndex, isDeleting, textIndex]);

//   useEffect(() => {
//     if (!isDeleting) setCharIndex(0);
//   }, [textIndex, isDeleting]);

//   return (
//     <div className="app-container">
//         <span className="static-label" >PIT </span>
//       <div className="text-display">
//         <span className="dynamic-text">{visibleText}</span>
//         <span className="cursor">|</span>
//       </div>
//       <button className="fancy-button"  onClick={handleClick}>Start your Finance Journey</button>
//       <div>
        


//       {showOptions && (
//         <div className="option-buttons-container">
//           {actions.map((label, i) => (
//             <button
//               key={label}
//               className="option-button"
//               style={{ animationDelay: `${i * 100}ms` }}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       )}
//         <br />
//         <br />
//         <br />
//         <br />
//         <span style={{margin:"auto"}}> Some times app takes 40-50 seconds to get its first response from server </span>
//       </div>
//     </div>
//   );
// };

// export default Newapp;


import React, {useEffect, useRef, useState } from 'react';
import './Newapp.css';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FloatingAIButton from './FloatingAIButton';
const texts = [
  "Personal Investment Tracker",
  "Track Income",
  "Record Expenditure",
  "Record Investment",
  "Get PE and PB of different Nifty Index"
];

const actions = [
"Record Income",
"Record Expense",
"Make Investment",
"Finance Information",
"Investment Information",
"Track Indexs",
"save data",
"load data"
];

const mkactions = [
"S . I . P",
"Fixed Deposit",
"E . T . F"

];



const Newapp = () => {
      const [output_1, setOutput_1] = useState([]);
      const [output, setOutput] = useState([]);
      const [loading, setLoading] = useState(false);

      const [input_income, setInput_income] = useState('');
      const [input_des, setInput_des] = useState('');
    const [output_2, setOutput_2] = useState('');

      const [nosub, setNosub] = useState(true);
      const [mkbtn, setMkbtn] = useState(false);

const callCountRef = useRef(0);

            const [Hide_submitted_fields,setHide_submitted_fields]=useState(true);
            const [makethird,setMakethird] = useState(false);

  const [showOptions, setShowOptions] = useState(false);
  const [mkOptions, setMKOptions] = useState(false);

  const [makeInvestment,setMakeInvestment] = useState(false);


  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleText, setVisibleText] = useState('');
  const intervalRef = useRef(null);
  

  const [selectedAction, setSelectedAction] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  useEffect(() => {
    const currentText = texts[textIndex];
    const isEnd = charIndex === currentText.length;
    const isStart = charIndex === 0;

    if (!isDeleting && !isEnd) {
      setVisibleText(currentText.slice(0, charIndex + 1));
      intervalRef.current = setTimeout(() => setCharIndex(prev => prev + 1), 100);
    } else if (isDeleting && !isStart) {
      setVisibleText(currentText.slice(0, charIndex - 1));
      intervalRef.current = setTimeout(() => setCharIndex(prev => prev - 1), 60);
    } else {
      clearTimeout(intervalRef.current);
      setTimeout(() => {
        setIsDeleting(prev => !prev);
        if (isDeleting) {
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }, 600);
    }

    return () => clearTimeout(intervalRef.current);
  }, [charIndex, isDeleting, textIndex]);

  useEffect(() => {
    if (!isDeleting) setCharIndex(0);
  }, [textIndex, isDeleting]);

  const handleClick = (event) => {setShowOptions(true);setMKOptions(true);}
 

  const handleActionClick = (action) =>{
    setSelectedAction(action);

    
 
  } 
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
  const handleOption_child = async (event) => {
       try{
                  const fixedInput = parseInt(event.target.value, 10);

        // setMkbtn(fixedInput === 3 ? true : false);
        setNosub(true);
        // setMakeInvestment(true);
        
        // setShowOptions(true);
        console.log("mkbtn:", mkbtn);

console.log("nosub:", nosub);
console.log("Hide_submitted_fields:", Hide_submitted_fields);



        console.log(fixedInput);
        console.log(mkbtn);


        //  const fixedInput = event.target.value; // Button value ("1")
        //  setNosub(fixedInput);


        
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
        console.log(mkbtn);
        const errorArray = error.message.split("\n"); // Split the error message by spaces
     
    setOutput(errorArray);
    
        // setOutput(error);// Handle network or other errors
    }
    };

  const handleOption = async (event) => {
       try{
            setOutput(["loading"]);

        //  const fixedInput = event.target.value; // Button value ("1")
         const fixedInput = parseInt(event.target.value, 10);
        //  setNosub(fixedInput);
        setMkbtn(fixedInput === 3 ? true : false);
        setNosub(fixedInput > 2 ? false : true);
        setMakeInvestment(fixedInput === 3 ? true: false);
        setShowOptions(fixedInput === 3 ? false: true);
        console.log("mkbtn:", mkbtn);

console.log("nosub:", nosub);
console.log("Hide_submitted_fields:", Hide_submitted_fields);



        console.log(fixedInput);
        console.log(mkbtn);

        
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
        console.log(mkbtn);
        const errorArray = error.message.split("\n"); // Split the error message by spaces
     
    setOutput(errorArray);
    
        // setOutput(error);// Handle network or other errors
    }
    };


  const handleSubmit = () => {
  callCountRef.current ++;

  if (callCountRef.current === 2 && makeInvestment === false) {
    setSelectedAction(null);
    callCountRef.current = 0; 

    // 👉 Place your special logic here
  } 
  else if (callCountRef.current === 3){
        // setSelectedAction(null);
    setHide_submitted_fields(false);
    setMkbtn(true);
    setNosub(false);
    callCountRef.current = 0; 

  }



  // Always execute the standard actions
  console.log(`Action: ${selectedAction}, Input 1: ${input1}, Input 2: ${input2}`);

  setInput1('');
  setInput2('');
};






  const handleSubmit_1 = async (event) => {
  
    setLoading(true);
    const fixedInput = event.target.value;
    try {
          // setOutput_1(["processing please wait"]);
            // const fixedInput = event.target.value;


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
        finally {
      setLoading(false);
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

    const handleSubmit_val_income = (event) => {
        // setInput("");
        alert(`Dropdown submitted value: ${event}`);
      };


       const field_val = (event) => {
  setTimeout(() => {
    console.log("mkbtn:", mkbtn);

    console.log("nosub:", nosub);
    console.log("Hide_submitted_fields:", Hide_submitted_fields);


    // Toggle visibility of the dropdown
    setInput_income('');
    setInput_des('');
    setHide_submitted_fields(prev => !prev);
    // setMakethird(prev => !prev);
  }, 100); // adjust delay (in ms) as needed, e.g., 50–200ms
};

// const field_val_1 = (event) => {
//   setTimeout(() => {
//     console.log("mkbtn:", mkbtn);
  
//     console.log("nosub:", nosub);
//     console.log("Hide_submitted_fields:", Hide_submitted_fields);

// setMakethird(true);
//     // Toggle visibility of the dropdown
//     setInput_income('');
//     setInput_des('');
//     // setHide_submitted_fields(prev => !prev);
//     // setMakethird(prev => !prev);
//   }, 100); // adjust delay (in ms) as needed, e.g., 50–200ms
// };
  return (
    <div className="app-container">
      <span className="static-label">PIT </span>
      <div className="text-display">
        <span className="dynamic-text">{visibleText}</span>
        <span className="cursor">|</span>
      </div>

      {/* <button className={`fancy-button ${showOptions|mkOptions ? 'fancy-clicked' : ''}`}value="1" onClick={(event)=>{handleClick(event);handleSubmit_1(event);}}>{showOptions|mkOptions ? "Restart The Journey" : "Start Your Financial Journey"}</button> */}


      <button className={`fancy-button ${showOptions|mkOptions ? 'fancy-clicked' : ''}`}value="1" onClick={(event)=>{handleClick(event);handleSubmit_1(event);}}>{showOptions|mkOptions ? "Restart The Journey" : "Start Your Financial Journey"}</button>
        
        {loading ? (
        <>
          <div  style={{ width: '750px', height: '20px', marginBottom: '0.5rem' ,paddingBottom:"20px"}}> </div>

           
           <span style={{fontFamily:"Arial"}}> <Typography>Please wait it take around 40-50 sec to spin up the backend server</Typography></span>
           <span style={{fontFamily:"Arial"}}> <Typography>Untill then try the "Analyze stock by AI" on the bottom right </Typography></span>

          <div className="skeleton" style={{borderRadius:"2%", paddingTop:"0px", width: '750px', height: 'auto', marginBottom: '0.5rem' }}>


          <Skeleton animation="wave">
          <Skeleton variant="rectangular" width={750} height={100} animation="wave" />
          

            {/* <Skeleton animation={false} /> */}
          </Skeleton>
           <Skeleton animation="wave">
          <Skeleton variant="rectangular" width={750} height={100} animation="wave" />
          

       
          </Skeleton>
          
          </div>
        </>
      ) : (
      


      <div>
        {showOptions && !selectedAction && (
          <div className="option-buttons-container" style={{width:"70%",marginLeft:"auto",marginRight:"auto"}}>
            {actions.map((label, i) => (
              <button
                key={label}
                value={i+1}
                className="option-button"
                style={{ animationDelay: `${i * 100}ms` }}
                // onClick={() => handleActionClick(label)}
                onClick={(event)=>{handleOption(event);handleActionClick(label);}}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        
        




        {selectedAction && (
          <div className="card-overlay">
            {

             mkbtn && nosub === false  &&(

             <div className="action-card" style={{width:"40%",marginLeft:"auto",marginRight:"auto"}}>
<h3 style={{color:"blue"}}>{selectedAction}</h3>
              {/* {output.map((line, index) => <div style={{color:"black"}} key={index}> Logs:{line}</div>)} */}
              {output.map((line, index) => {
  if (line === "ERROR : Min Balance=1000") {
     // trigger your function
  }
  return (
    <div style={{ color: "black" }} key={index}>
      {line}
    </div>
  );
})}



          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          
          <div className="option-buttons-container" style={{width:"70%",marginLeft:"auto",marginRight:"auto"}}>
            {mkactions.map((label, i) => (
              <button
                key={label}
                value={i+1}
                className="option-button"
                style={{ animationDelay: `${i * 100}ms` }}
                // onClick={() => handleActionClick(label)}
                onClick={(event)=>{handleOption_child(event);handleActionClick(label);}}
              >
                {label}
                
              </button>
              
            ))}
            <button className="submit-button" value="5" onClick={(event)=>{handleOption_child(event);field_val();setSelectedAction(null);handleClick(event);setMkbtn(false);
    setNosub(true);setHide_submitted_fields(false);
}}>CLOSE</button>
          </div>


            </div>
          )}
            {

             !mkbtn && nosub === false  &&(

             <div className="action-card" style={{width:"40%",marginLeft:"auto",marginRight:"auto"}}>
<h3 style={{color:"blue"}}>{selectedAction}</h3>
              {output.map((line, index) => <div style={{color:"black"}} key={index}>{line}</div>)}

          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button className="submit-button"  onClick={(event)=>{field_val();setSelectedAction(null);
}}>CLOSE</button>
            </div>
          )}

          {  nosub && Hide_submitted_fields === true   &&(
                
                <div className="action-card" style={{width:"30%",marginLeft:"auto",marginRight:"auto"}}>
<h3 style={{color:"blue"}}>{selectedAction}</h3>
              {output.map((line, index) => <div style={{color:"black"}} key={index}>{line}</div>)}

            < input
            type="text"
            value={input_income}
            onChange={(e) => setInput_income(e.target.value)}
            placeholder="Enter Amount1"
            
            
            />
          
          {/* <button onClick={()=>{handleDropdownSubmit();handleSubmit()}}>SUBMIT VALUE</button> */}
          <button className="submit-button"  onClick={(event)=>{handleSubmit(); handleSubmit_income(input_income);handleSubmit_val_income(input_income);field_val();console.log("makethrid",makethird);}}>SUBMIT1</button>
            </div>
          )}
          
          
          {
             
            nosub && Hide_submitted_fields === false  &&(

               <div className="action-card" style={{width:"30%",marginLeft:"auto",marginRight:"auto"}}>
            <h3 style={{color:"blue"}}>{selectedAction}</h3>
              {output.map((line, index) => <div style={{color:"black"}} key={index}>{line}</div>)}
          <input
            type="text"
            value={input_des}
            onChange={(e) => setInput_des(e.target.value)}
            placeholder="Enter Description"
            />
     
          <button className="submit-button" onClick={(event)=>{ handleSubmit(); setMakethird(true); handleSubmit_income(input_des);handleSubmit_val_income(input_des);field_val();console.log("invest new",makeInvestment);console.log("mkbtn third new",makethird);}}> SUBMIT</button>
          </div>
       

          )}
           
         
          
          </div>
          
        )}
      
        

        <br /><br /><br /><br />
        <span style={{ margin: "auto" }}>
            {output_1.map((line, index) => <div key={index}>{line}</div>)}
 
          <Button variant='outlined' onClick={handleSubmit_2} value="1">Terminate</Button>
          <div>{output_2}</div>
            </span>
      </div>

)}
<FloatingAIButton />
    </div>
  );
};

export default Newapp;
