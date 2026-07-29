import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";


// GET ALL USERS / GET SINGLE USER

export async function GET(request: Request) {

  try {

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");


    if(id){

      const { data, error } = await supabaseServer
        .from("users")
        .select("*")
        .eq("userid", id)
        .single();


      if(error || !data){

        return NextResponse.json(
          {
            message:"User not found"
          },
          {
            status:404
          }
        );

      }


      return NextResponse.json(data);

    }



    const { data, error } = await supabaseServer
      .from("users")
      .select("*")
      .order("userid");


    if(error){

      throw error;

    }


    return NextResponse.json(data);



  }
  catch(error){

    return NextResponse.json(
      {
        message:"Server error"
      },
      {
        status:500
      }
    );

  }

}





// ADD USER

export async function POST(request:Request){

try{


const body = await request.json();


const {data,error}=await supabaseServer
.from("users")
.insert({

username: body.username,
password: body.password,
fullname: body.fullname,
role: body.role,
status: body.status ?? true

})
.select()
.single();



if(error){

throw error;

}



return NextResponse.json(data);



}
catch(error){

return NextResponse.json(
{
message:"User create failed"
},
{
status:500
}
);


}

}





// UPDATE USER

export async function PUT(request:Request){

try{


const body = await request.json();


const {error}=await supabaseServer
.from("users")
.update({

username:body.username,
password:body.password,
fullname:body.fullname,
role:body.role,
status:body.status

})
.eq("userid",body.userid);



if(error){

throw error;

}



return NextResponse.json(
{
message:"User updated successfully"
}
);



}
catch(error){

return NextResponse.json(
{
message:"User update failed"
},
{
status:500
}
);

}


}







// DELETE USER

export async function DELETE(request:Request){

try{


const body = await request.json();


const {error}=await supabaseServer
.from("users")
.delete()
.eq("userid",body.userid);



if(error){

throw error;

}



return NextResponse.json(
{
message:"User deleted successfully"
}
);



}
catch(error){

return NextResponse.json(
{
message:"User delete failed"
},
{
status:500
}
);

}


}