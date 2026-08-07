"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Opportunity } from "@/types/opportunity";


export default function OpportunitiesPage() {


const [opportunities,setOpportunities] = useState<Opportunity[]>([]);

const [searchText,setSearchText] = useState("");

const [selectedStage,setSelectedStage] = useState("");

const [loading,setLoading] = useState(true);


const [currentPage,setCurrentPage] = useState(1);

const opportunitiesPerPage = 5;





useEffect(()=>{

 loadOpportunities();

},[]);





const loadOpportunities = async()=>{


try{


setLoading(true);


const response = await fetch("/api/opportunities");


const data:Opportunity[] = await response.json();


setOpportunities(data);


}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};









const handleDelete = async(
 OpportunityId:number
)=>{


const confirmDelete = confirm(
"Are you sure you want to delete this opportunity?"
);



if(!confirmDelete){

return;

}




const response = await fetch(
"/api/opportunities",
{

method:"DELETE",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify({

OpportunityId,

}),


});





if(response.ok){


setOpportunities((prev)=>

prev.filter(

(opportunity)=>

opportunity.OpportunityId !== OpportunityId

)

);


}



};


const handleClear = ()=>{


setSearchText("");

setSelectedStage("");

setCurrentPage(1);


};







const filteredOpportunities = opportunities.filter(
(opportunity)=>{


const searchMatch =

opportunity.OpportunityName
.toLowerCase()
.includes(searchText.toLowerCase())

||

opportunity.Customer
.toLowerCase()
.includes(searchText.toLowerCase());




const stageMatch =

selectedStage === ""

||

opportunity.Stage === selectedStage;




return searchMatch && stageMatch;


}

);






const lastIndex =
currentPage * opportunitiesPerPage;


const firstIndex =
lastIndex - opportunitiesPerPage;



const currentOpportunities =
filteredOpportunities.slice(
firstIndex,
lastIndex
);

return (

<div className="space-y-6">


{/* Header */}

<div className="flex justify-between items-center">


<div>

<h1 className="text-3xl font-bold text-theme">
Opportunity Management
</h1>


<p className="text-gray-600 mt-2">
Manage sales opportunities
</p>


</div>




<Link

href="/sales/opportunities/add"

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

+ Add Opportunity

</Link>


</div>





{/* Search Section */}


<div className="card-theme border border-theme rounded-xl shadow p-6">


<div className="grid grid-cols-1 md:grid-cols-4 gap-4">



<input

value={searchText}

onChange={(e)=>{

setSearchText(e.target.value);

setCurrentPage(1);

}}

placeholder="Search Opportunity"

className="
border
border-theme
bg-theme
text-theme
rounded-lg
px-4
py-2
"

/>





<select

value={selectedStage}

onChange={(e)=>{

setSelectedStage(e.target.value);

setCurrentPage(1);

}}

className="
border
border-theme
bg-theme
text-theme
rounded-lg
px-4
py-2
"

>


<option value="">
All Stages
</option>


<option value="Prospecting">
Prospecting
</option>


<option value="Proposal">
Proposal
</option>


<option value="Negotiation">
Negotiation
</option>


<option value="Won">
Won
</option>


<option value="Lost">
Lost
</option>


</select>





<button

className="
bg-green-600
hover:bg-green-700
text-white
rounded-lg
"

>

Search

</button>





<button

onClick={handleClear}

className="
bg-gray-600
hover:bg-gray-700
text-white
rounded-lg
"

>

Clear

</button>


</div>


</div>







{/* Opportunity Table */}



<div className="card-theme border border-theme rounded-xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-theme border-b border-theme">


<tr className="text-theme">


<th className="px-3 py-3 text-left">
Opportunity
</th>


<th className="px-3 py-3 text-left">
Customer
</th>


<th className="px-3 py-3 text-left">
Amount
</th>


<th className="px-3 py-3 text-left">
Stage
</th>


<th className="px-3 py-3 text-left">
Probability
</th>


<th className="px-3 py-3 text-left">
Close Date
</th>


<th className="px-3 py-3 text-center">
Action
</th>


</tr>


</thead>





<tbody>


{

loading ?


<tr>

<td
colSpan={7}
className="text-center py-10 text-muted"
>

Loading opportunities...

</td>

</tr>



:

currentOpportunities.length === 0 ?



<tr>

<td
colSpan={7}
className="text-center py-10 text-muted"
>

No opportunities found

</td>

</tr>



:


currentOpportunities.map((opportunity)=>(


<tr

key={opportunity.OpportunityId}

className="
border-t
border-theme
table-row-theme
hover:bg-theme
transition-colors
"

>


<td className="px-3 py-4 font-medium text-theme">

{opportunity.OpportunityName}

</td>




<td className="px-3 py-4 text-muted">

{opportunity.Customer}

</td>




<td className="px-3 py-4 text-muted">

₹
{new Intl.NumberFormat("en-IN")
.format(opportunity.Amount)}

</td>




<td className="px-3 py-4">


<span

className={

opportunity.Stage === "Won"

?

"bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"

:

opportunity.Stage === "Lost"

?

"bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"

:

"bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"

}

>

{opportunity.Stage}

</span>


</td>





<td className="px-3 py-4 text-muted">

{opportunity.Probability}

</td>





<td className="px-3 py-4 text-muted">

{opportunity.CloseDate}

</td>





<td className="px-3 py-4">


<div className="flex justify-center gap-2 whitespace-nowrap">



<Link

href={`/sales/opportunities/${opportunity.OpportunityId}`}

className="
bg-green-600
text-white
px-3
py-1
rounded
text-sm
"

>

View

</Link>





<Link

href={`/sales/opportunities/edit/${opportunity.OpportunityId}`}

className="
bg-blue-600
text-white
px-3
py-1
rounded
text-sm
"

>

Edit

</Link>





<button

onClick={()=>handleDelete(opportunity.OpportunityId)}

className="
bg-red-600
text-white
px-3
py-1
rounded
text-sm
"

>

Delete

</button>




</div>


</td>



</tr>


))


}


</tbody>


</table>


</div>








{/* Pagination */}


<div className="flex justify-center gap-3 mt-5">


<button

disabled={currentPage===1}

onClick={()=>setCurrentPage(currentPage-1)}

className="
bg-gray-600
disabled:bg-gray-300
text-white
px-4
py-2
rounded-lg
"

>

Previous

</button>





<span className="px-4 py-2 text-theme font-semibold">

Page {currentPage}

</span>





<button

disabled={
currentPage >=
Math.ceil(
filteredOpportunities.length /
opportunitiesPerPage
)
}

onClick={()=>setCurrentPage(currentPage+1)}

className="
bg-blue-600
disabled:bg-gray-300
text-white
px-4
py-2
rounded-lg
"

>

Next

</button>



</div>




</div>

);

}