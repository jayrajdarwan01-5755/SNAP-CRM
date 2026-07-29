"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { User } from "@/types/user";


export default function EditUserPage() {


  const router = useRouter();

  const params = useParams();



  const [username, setUsername] = useState("");

  const [fullname, setFullname] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState(true);



  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);




  useEffect(() => {

    loadUser();

  }, []);






  const loadUser = async () => {


    try {


      setLoading(true);


      const response = await fetch(
        `/api/users?id=${params.id}`
      );



      const data: User = await response.json();



      setUsername(data.username);

      setFullname(data.fullname);

      setRole(data.role);

      setStatus(data.status);



    }

    catch(error){


      console.log(error);


    }

    finally{


      setLoading(false);


    }


  };









  const handleUpdate = async () => {



    if(!username.trim()){

      alert("Username is required");

      return;

    }



    if(!fullname.trim()){

      alert("Full name is required");

      return;

    }




    if(!role){

      alert("Role is required");

      return;

    }




    try{


      setSaving(true);




      const response = await fetch("/api/users",{


        method:"PUT",


        headers:{


          "Content-Type":"application/json"


        },



        body:JSON.stringify({


          userid:Number(params.id),

          username,

          fullname,

          role,

          status


        })



      });






      if(!response.ok){

        throw new Error("Failed to update user");

      }




      alert("User Updated Successfully");


      router.push("/settings/users");



    }

    catch(error){


      console.log(error);


      alert("Failed to update user");


    }

    finally{


      setSaving(false);


    }


  };









  if(loading){


    return (

      <div className="p-6">

        Loading...

      </div>

    );


  }







  return (


    <div className="space-y-6">





      {/* Header */}



      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-gray-900">

            Edit User

          </h1>



          <p className="text-gray-600 mt-2">

            Update user information

          </p>


        </div>




        <button

          onClick={()=>router.back()}

          className="
          bg-gray-600
          hover:bg-gray-700
          text-white
          px-5
          py-2
          rounded-lg
          "

        >

          Back

        </button>



      </div>








      {/* Form */}



      <div className="bg-white border rounded-xl shadow p-6">



        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">







          {/* Username */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Username

            </label>



            <input

              type="text"

              value={username}

              onChange={(e)=>setUsername(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            />


          </div>









          {/* Full Name */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Full Name

            </label>



            <input

              type="text"

              value={fullname}

              onChange={(e)=>setFullname(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            />


          </div>









          {/* Role */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Role

            </label>



            <select

              value={role}

              onChange={(e)=>setRole(e.target.value)}

              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "

            >



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









          {/* Status */}



          <div>


            <label className="block text-sm font-semibold text-gray-900 mb-2">

              Status

            </label>




            <select


              value={status ? "true":"false"}


              onChange={(e)=>setStatus(e.target.value==="true")}



              className="
              w-full
              border
              border-gray-300
              bg-white
              text-gray-900
              rounded-lg
              px-4
              py-2
              "


            >



              <option value="true">

                Active

              </option>




              <option value="false">

                Inactive

              </option>




            </select>



          </div>






        </div>








        {/* Button */}




        <div className="flex justify-end mt-8">



          <button


            onClick={handleUpdate}


            disabled={saving}



            className="
            bg-blue-600
            hover:bg-blue-700
            disabled:bg-gray-400
            text-white
            px-6
            py-2
            rounded-lg
            "


          >


            {saving ? "Updating..." : "Update User"}

          </button>
        </div>
      </div>
    </div>


  );

}