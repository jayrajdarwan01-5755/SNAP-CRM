"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/types/user";


export default function ViewUserPage() {


  const router = useRouter();

  const params = useParams();


  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);




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



      setUser(data);



    }

    catch(error){


      console.log(error);


    }

    finally{


      setLoading(false);


    }


  };











  return (


    <div className="space-y-6 bg-theme text-theme min-h-screen">





      {/* Header */}



      <div className="flex justify-between items-center">


        <div>


          <h1 className="text-3xl font-bold text-theme">

            User Details

          </h1>



          <p className="text-muted mt-2">

            View user information

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









      <div className="card-theme border-theme rounded-xl shadow p-6">





      {

        loading ? (


          <div className="text-center py-10 text-muted">

            Loading user...

          </div>



        )



        : !user ? (


          <div className="text-center py-10 text-red-600">

            User not found

          </div>



        )



        : (



          <>



            <h2 className="text-xl font-semibold text-theme mb-6">

              User Information

            </h2>











            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">











              {/* Username */}


              <div>


                <p className="text-sm text-muted">

                  Username

                </p>



                <p className="font-semibold text-theme">

                  {user.username}

                </p>


              </div>









              {/* Full Name */}



              <div>


                <p className="text-sm text-muted">

                  Full Name

                </p>



                <p className="font-semibold text-theme">

                  {user.fullname}

                </p>


              </div>









              {/* Role */}



              <div>


                <p className="text-sm text-muted">

                  Role

                </p>



                <p className="font-semibold text-theme">

                  {user.role}

                </p>


              </div>












              {/* Status */}



              <div>


                <p className="text-sm text-muted">

                  Status

                </p>



                <p

                  className={

                    user.status

                    ?

                    "font-semibold text-green-600"

                    :

                    "font-semibold text-red-600"

                  }

                >

                  {user.status ? "Active" : "Inactive"}

                </p>


              </div>


            </div>


          </>


        )


      }


      </div>


    </div>


  );

}