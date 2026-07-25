"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


type Category = {

  CategoryId: number;

  CategoryName: string;

  Description: string;

};



export default function CategoriesPage() {


const [categories, setCategories] = useState<Category[]>([]);

const [searchText, setSearchText] = useState("");

const [loading, setLoading] = useState(true);


const [currentPage, setCurrentPage] = useState(1);

const categoriesPerPage = 5;





useEffect(()=>{

  loadCategories();

}, []);





const loadCategories = async()=>{


try{


setLoading(true);



const response = await fetch("/api/categories");


const data:Category[] = await response.json();



setCategories(data);



}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}


};








const handleDelete = async(CategoryId:number)=>{


const confirmDelete = confirm(
"Are you sure you want to delete this category?"
);



if(!confirmDelete){

return;

}



const response = await fetch("/api/categories",{

method:"DELETE",

headers:{
"Content-Type":"application/json",
},

body:JSON.stringify({

CategoryId,

}),

});



if(response.ok){


setCategories((prev)=>

prev.filter(

(category)=>

category.CategoryId !== CategoryId

)

);


}


};







const handleClear = ()=>{


setSearchText("");

};






const filteredCategories = categories.filter((category)=>{


return (

category.CategoryName

.toLowerCase()

.includes(searchText.toLowerCase())

||

category.Description

.toLowerCase()

.includes(searchText.toLowerCase())

);


});





const lastIndex = currentPage * categoriesPerPage;


const firstIndex = lastIndex - categoriesPerPage;



const currentCategories = filteredCategories.slice(

firstIndex,

lastIndex

);






return (

<div className="space-y-6">



{/* Header */}


<div className="flex justify-between items-center">



<div>


<h1 className="text-3xl font-bold text-gray-900">

Category Management

</h1>



<p className="text-gray-600 mt-2">

Manage product categories

</p>



</div>





<Link

href="/inventory/categories/add"

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-2
rounded-lg
"

>

+ Add Category

</Link>



</div>








{/* Search */}


<div className="bg-white border rounded-xl shadow p-6">


<div className="grid grid-cols-1 md:grid-cols-3 gap-4">



<input

value={searchText}

onChange={(e)=>{

setSearchText(e.target.value);

setCurrentPage(1);

}}

placeholder="Search Category"

className="
border
border-gray-300
bg-white
text-gray-900
rounded-lg
px-4
py-2
"

/>





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
{/* Category Table */}


<div className="bg-white border rounded-xl shadow overflow-hidden">


<table className="w-full">


<thead className="bg-gray-100">


<tr className="text-gray-900">


<th className="px-4 py-3 text-left">
Category Name
</th>


<th className="px-4 py-3 text-left">
Description
</th>


<th className="px-4 py-3 text-center">
Action
</th>


</tr>


</thead>





<tbody>


{

loading ? (


<tr>

<td

colSpan={3}

className="text-center py-10 text-gray-600"

>

Loading categories...

</td>

</tr>


)


:


currentCategories.length === 0 ? (


<tr>

<td

colSpan={3}

className="text-center py-10 text-gray-600"

>

No categories found

</td>

</tr>


)


:


currentCategories.map((category)=>(


<tr

key={category.CategoryId}

className="border-t hover:bg-gray-50"

>



{/* Category Name */}


<td className="px-4 py-4 font-medium text-gray-900">


{category.CategoryName}


</td>





{/* Description */}


<td className="px-4 py-4 text-gray-700">


{category.Description}


</td>






{/* Action */}


<td className="px-4 py-4">


<div className="flex justify-center gap-2">





<Link

href={`/inventory/categories/${category.CategoryId}`}

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

href={`/inventory/categories/edit/${category.CategoryId}`}

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

onClick={()=>handleDelete(category.CategoryId)}

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

disabled={currentPage === 1}

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






<span className="px-4 py-2 text-gray-900 font-semibold">


Page {currentPage}


</span>






<button


disabled={
currentPage >=
Math.ceil(filteredCategories.length / categoriesPerPage)
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