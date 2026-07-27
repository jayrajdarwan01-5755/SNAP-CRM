import { NextResponse } from "next/server";


let backupData = {
  backupName: "SNAP_CRM_Backup",
  lastBackup: "22-Jul-2026 06:30 PM",
  status: "Completed",
};


// GET Backup Details

export async function GET() {

  try {

    return NextResponse.json(
      {
        success: true,
        data: backupData,
      },
      {
        status: 200,
      }
    );

  } catch(error){

    return NextResponse.json(
      {
        success:false,
        message:"Failed to fetch backup details",
      },
      {
        status:500,
      }
    );

  }

}



// CREATE / RESTORE BACKUP

export async function POST(request:Request){

  try{

    const body = await request.json();


    if(body.action === "create"){

      backupData = {
        ...backupData,
        lastBackup:new Date().toLocaleString("en-IN"),
        status:"Completed",
      };

    }


    if(body.action === "restore"){

      backupData = {
        ...backupData,
        status:"Restored",
      };

    }



    return NextResponse.json(
      {
        success:true,
        message:"Backup action completed successfully",
        data:backupData,
      },
      {
        status:200,
      }
    );


  }catch(error){

    return NextResponse.json(
      {
        success:false,
        message:"Backup action failed",
      },
      {
        status:500,
      }
    );

  }

}