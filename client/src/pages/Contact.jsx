import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import toast from "react-hot-toast";
import { isEmail } from "../helpers/regexMatcher";
import axiosInstance from "../helpers/axiosInstance";
const Contact = () => {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: "",
    })

    function handelInputChange(e){
        const {name, value} = e.target;
        console.log(name, value);
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("All fields are mandotry");
            return;
        }

        if (!isEmail(userInput.email)) {
            toast.error("Invalid email id");
            return;
        }

        try{
            const response = axiosInstance.post("/contact", { ...userInput });
            toast.promise(response, {
                loading: "Subnitting your message...",
                success: "Form submitted successfully!",
                error: "Failed to Submit the form"
            })

            const contactResponse = await response;

            if(contactResponse?.data?.success){
                setUserInput({
                    name: "",
                    email: "",
                    message: "",
                })
            }
        }catch(error){
            toast.error("Operation failed")
        }
    }

  return (
    <>
      <HomeLayout>
        <div className="min-h-[90vh] flex flex-col items-center justify-center"> 
            <form 
                noValidate
                onSubmit= { onFormSubmit }  
                className="flex flex-col items-center justify-center gap-3 p-5 sm:p-8 rounded-md text-white shadow-[0_0_10px_black] w-[90%] sm:w-[28rem] lg:w-[30rem]">

                    <h1 className="text-2xl sm:text-3xl font-semibold">
                        Contact form
                    </h1>
                    
                    <div className="flex flex-col w-full gap-1">

                        <label htmlFor="name" className="text-lg sm:text-xl font-semibold">
                            Name
                        </label>
                        <input  
                        className="bg-transparent border py-2 px-3 rounded-sm text-sm sm:text-base"
                        type="text" 
                        id="name" 
                        name="name"
                        placeholder="Enter your name..." 
                        onChange={ handelInputChange } />
                    </div>

                    <div className="flex flex-col w-full gap-1">

                        <label htmlFor="email" className="text-lg sm:text-xl font-semibold">
                            Email
                        </label>
                        <input  
                        className="bg-transparent border py-2 px-3 rounded-sm text-sm sm:text-base"
                        type="text" 
                        id="email" 
                        name="email"
                        placeholder="Enter your email..." 
                        onChange={ handelInputChange }/>
                        
                    </div>

                    <div className="flex flex-col w-full gap-1">

                        <label htmlFor="message" className="text-lg sm:text-xl font-semibold">
                            Message
                        </label>
                        <textarea  
                        className="bg-transparent border py-2 px-3 rounded-sm text-sm sm:text-base" 
                        //type="text" 
                        id="message" 
                        name="message"
                        placeholder="Enter your message..." 
                        onChange={ handelInputChange }/>
                    </div>

                    <button type="submit" className="w-full bg-yellow-600 mt-3 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-2 sm:py-3 rounded-md text-sm sm:text-base font-semibold">
                        Submit
                    </button>
            </form>
        </div>
      </HomeLayout>
    </>
  );
}

export default Contact
