"use client";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Leave } from "@/types/leave";

export default function LeaveViewPage() {

  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);

  const [leave, setLeave] = useState<Leave | null>(null);

  const handleDelete = async () => {

    const confirmDelete = confirm(
      "Are you sure you want to delete this leave?"
    );

    if (!confirmDelete) return;

    const response = await fetch("/api/leaves", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LeaveId: leave?.LeaveId,
      }),
    });

    if (response.ok) {
      alert("Leave Deleted Successfully");
      router.push("/hr/leave");
    }
  };



  useEffect(()=>{


    const loadLeave = async()=>{


      const response = await fetch("/api/leaves");


      const data: Leave[] = await response.json();



      const foundLeave = data.find(

        (item)=>

        item.LeaveId === id

      );



      setLeave(foundLeave || null);


    };



    loadLeave();


  },[id]);






  if(!leave){

    return (

      <div className="text-center py-10 text-gray-600">

        Loading Leave...

      </div>

    );

  }






return (

<div className="space-y-6">

{/* Header */}


<div className="flex justify-between items-center">



<div>


<h1 className="text-3xl font-bold text-gray-900">

Leave Details

</h1>


<p className="text-gray-600 mt-2">

View leave request information

</p>


</div>


<div className="flex gap-3">


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



<Link

href={`/hr/leave/edit/${leave.LeaveId}`}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

Edit

</Link>




<button

onClick={handleDelete}

className="
bg-red-600
hover:bg-red-700
text-white
px-5
py-2
rounded-lg
"

>

Delete

</button>


</div>


</div>

{/* Leave Information */}



<div className="bg-white border rounded-xl shadow p-6">



<h2 className="text-xl font-semibold text-gray-900 mb-6">

Leave Information

</h2>






<div className="grid grid-cols-1 md:grid-cols-2 gap-6">


{/* Leave ID */}

<div>


<p className="text-sm text-gray-500">

Leave ID

</p>


<p className="font-semibold text-gray-900">

{leave.LeaveId}

</p>


</div>

{/* Employee ID */}

<div>


<p className="text-sm text-gray-500">

Employee ID

</p>


<p className="font-semibold text-gray-900">

{leave.EmployeeId}

</p>


</div>


{/* Employee Name */}

<div>


<p className="text-sm text-gray-500">

Employee Name

</p>


<p className="font-semibold text-gray-900">

{leave.EmployeeName}

</p>


</div>

{/* Leave Type */}

<div>


<p className="text-sm text-gray-500">

Leave Type

</p>


<p className="font-semibold text-gray-900">

{leave.LeaveType}

</p>


</div>


{/* From Date */}

<div>


<p className="text-sm text-gray-500">

From Date

</p>


<p className="font-semibold text-gray-900">

{leave.FromDate}

</p>


</div>

{/* To Date */}

<div>


<p className="text-sm text-gray-500">

To Date

</p>


<p className="font-semibold text-gray-900">

{leave.ToDate}

</p>


</div>

{/* Reason */}

<div className="md:col-span-2">


<p className="text-sm text-gray-500">

Reason

</p>


<p className="font-semibold text-gray-900">

{leave.Reason}

</p>


</div>


{/* Status */}

<div>


<p className="text-sm text-gray-500 mb-2">

Status

</p>




<span

className={


leave.Status === "Approved"

?

"bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"


:


leave.Status === "Rejected"


?


"bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"


:


"bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"


}

>
{leave.Status}
</span>
</div>
</div>
</div>

</div>

);


}