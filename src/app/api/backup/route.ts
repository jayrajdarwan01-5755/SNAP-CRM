import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";


// GET

export async function GET(){

try{


const {data,error}=await supabaseServer
.from("backups")
.select("*")
.order("id",{ascending:false})
.limit(1)
.single();



if(error){

return NextResponse.json(
{
success:false,
message:"Backup not found"
},
{
status:404
}
)

}



return NextResponse.json(
{
success:true,
data
}
)


}
catch(error){

return NextResponse.json(
{
success:false
},
{
status:500
}
)

}

}



// CREATE BACKUP

export async function POST(request:Request){


try{


const body=await request.json();



if(body.action==="create"){


const {data,error}=await supabaseServer
.from("backups")
.insert({

backupname:"SNAP_CRM_Backup",

lastbackup:new Date(),

status:"Completed"

})
.select()
.single();



if(error) throw error;



return NextResponse.json({

success:true,

message:"Backup Created Successfully",

data

})


}




if(body.action==="restore"){



const {data,error}=await supabaseServer
.from("backups")
.insert({

backupname:"SNAP_CRM_Backup",

lastbackup:new Date(),

status:"Restored"

})
.select()
.single();



if(error) throw error;



return NextResponse.json({

success:true,

message:"Backup Restored Successfully",

data

})


}



return NextResponse.json({
success:false,
message:"Invalid Action"
})


}
catch(error){


return NextResponse.json(
{
success:false,
message:"Backup Failed"
},
{
status:500
}
)

}


}