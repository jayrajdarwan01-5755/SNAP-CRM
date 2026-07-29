"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {


  const router = useRouter();


  const [fullname,setFullname] = useState("");

  const [username,setUsername] = useState("");

  const [role,setRole] = useState("");

  const [password,setPassword] = useState("");

  const [confirmPassword,setConfirmPassword] = useState("");

  const [loading,setLoading] = useState(false);







  const handleRegister = async(e:React.FormEvent)=>{


    e.preventDefault();



    if(
      !fullname ||
      !username ||
      !role ||
      !password ||
      !confirmPassword
    ){

      alert("Please fill all fields");

      return;

    }




    if(password !== confirmPassword){

      alert("Password does not match");

      return;

    }




    try{


      setLoading(true);



      const response = await fetch("/api/register",{


        method:"POST",


        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify({

          fullname,
          username,
          password,
          role

        })


      });





      const result = await response.json();





      if(!response.ok){

        alert(result.message);

        return;

      }





      alert("Account created successfully");


      router.push("/login");




    }
    catch(error){


      console.log(error);

      alert("Registration failed");


    }
    finally{


      setLoading(false);


    }


  };






  return (

    <div className="min-h-screen flex">


      {/* Left Section */}


      <div className="w-1/2 flex items-center justify-center bg-white">


        <div className="w-[520px]">


          <h1 className="text-3xl font-bold text-gray-900 leading-snug mb-10">

            Smart CRM Platform
            <br/>
            Manage Your Business Effortlessly.

          </h1>






          <form
            onSubmit={handleRegister}
            className="space-y-5"
          >





            {/* Full Name */}


            <div>


              <label className="block text-sm font-semibold text-gray-800 mb-2">

                Full Name

              </label>


              <input

                value={fullname}

                onChange={(e)=>setFullname(e.target.value)}

                placeholder="Enter full name"

                className="
                w-full
                h-12
                border
                rounded-md
                px-4
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "

              />


            </div>








            {/* Username */}


            <div>


              <label className="block text-sm font-semibold text-gray-800 mb-2">

                User Name

              </label>


              <input

                value={username}

                onChange={(e)=>setUsername(e.target.value)}

                placeholder="Enter username"

                className="
                w-full
                h-12
                border
                rounded-md
                px-4
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "

              />


            </div>








            {/* Role */}


            <div>


              <label className="block text-sm font-semibold text-gray-800 mb-2">

                Role

              </label>


              <select

                value={role}

                onChange={(e)=>setRole(e.target.value)}

                className="
                w-full
                h-12
                border
                rounded-md
                px-4
                text-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "

              >

                <option value="">
                  Select Role
                </option>

                <option value="Admin">
                  Admin
                </option>

                <option value="Manager">
                  Manager
                </option>

                <option value="HR">
                  HR
                </option>

                <option value="Employee">
                  Employee
                </option>


              </select>


            </div>









            {/* Password */}


            <div>


              <label className="block text-sm font-semibold text-gray-800 mb-2">

                Password

              </label>


              <input

                type="password"

                value={password}

                onChange={(e)=>setPassword(e.target.value)}

                placeholder="Enter password"

                className="
                w-full
                h-12
                border
                rounded-md
                px-4
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "

              />


            </div>








            {/* Confirm Password */}


            <div>


              <label className="block text-sm font-semibold text-gray-800 mb-2">

                Confirm Password

              </label>


              <input

                type="password"

                value={confirmPassword}

                onChange={(e)=>setConfirmPassword(e.target.value)}

                placeholder="Confirm password"

                className="
                w-full
                h-12
                border
                rounded-md
                px-4
                text-gray-800
                placeholder-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                "

              />


            </div>









            <button

              disabled={loading}

              className="
              w-full
              h-12
              bg-blue-700
              text-white
              rounded-md
              font-semibold
              hover:bg-blue-800
              disabled:bg-gray-400
              "

            >

              {loading ? "Creating..." : "Create Account"}

            </button>



          </form>







          <div className="text-center mt-5 text-sm text-gray-500">


            Already have an account?


            <span

              onClick={()=>router.push("/login")}

              className="text-blue-600 cursor-pointer ml-1 font-semibold"

            >

              Login

            </span>


          </div>






        </div>


      </div>








      {/* Right Gradient Section */}


      <div

        className="
        w-1/2
        bg-gradient-to-br
        from-blue-50
        via-white
        to-purple-100
        "

      >


      </div>




    </div>

  );


}