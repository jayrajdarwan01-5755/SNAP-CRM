import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// ========================
// ACTIVITY LOGGER
// ========================

async function addActivity(title: string, type: string) {
  await supabaseServer.from("activities").insert([
    {
      title,
      type,
      created_at: new Date().toISOString(),
    },
  ]);
}

// ========================
// GET CUSTOMERS
// ========================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Get Single Customer
    if (id) {
      const { data, error } = await supabaseServer
        .from("customers")
        .select("*")
        .eq("id", Number(id))
        .maybeSingle();

      if (error) {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 404,
          }
        );
      }

      if (!data) {
        return NextResponse.json(
          {
            message: "Customer not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json({
        CustomerId: data.id,
        CustomerCode: data.customer_code,
        CustomerName: data.customer_name,
        Phone: data.phone,
        Email: data.email,
        Address: data.address,
        City: data.city,
        State: data.state,
        Country: data.country,
        Status: data.status,
      });
    }

    // Get All Customers
    const { data, error } = await supabaseServer
      .from("customers")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    const customers = data.map((customer) => ({
      CustomerId: customer.id,
      CustomerCode: customer.customer_code,
      CustomerName: customer.customer_name,
      Phone: customer.phone,
      Email: customer.email,
      Address: customer.address,
      City: customer.city,
      State: customer.state,
      Country: customer.country,
      Status: customer.status,
    }));

    return NextResponse.json(customers);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch customers",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

// ========================
// ADD CUSTOMER
// ========================

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("customers")
      .insert([
        {
          customer_code: body.CustomerCode,
          customer_name: body.CustomerName,
          phone: body.Phone,
          email: body.Email,
          address: body.Address,
          city: body.City,
          state: body.State,
          country: body.Country,
          status: body.Status,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    // Activity Log
    await addActivity(
      `Customer added: ${data.customer_name}`,
      "Customer"
    );

    return NextResponse.json({
      message: "Customer added successfully",
      customer: {
        CustomerId: data.id,
        CustomerCode: data.customer_code,
        CustomerName: data.customer_name,
        Phone: data.phone,
        Email: data.email,
        Address: data.address,
        City: data.city,
        State: data.state,
        Country: data.country,
        Status: data.status,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to add customer",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
// ========================
// UPDATE CUSTOMER
// ========================

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseServer
      .from("customers")
      .update({
        customer_code: body.CustomerCode,
        customer_name: body.CustomerName,
        phone: body.Phone,
        email: body.Email,
        address: body.Address,
        city: body.City,
        state: body.State,
        country: body.Country,
        status: body.Status,
      })
      .eq("id", body.CustomerId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    // ========================
    // ACTIVITY LOG
    // ========================

    await addActivity(
      `Customer updated: ${data.customer_name}`,
      "Customer"
    );

    return NextResponse.json({
      message: "Customer updated successfully",
      customer: {
        CustomerId: data.id,
        CustomerCode: data.customer_code,
        CustomerName: data.customer_name,
        Phone: data.phone,
        Email: data.email,
        Address: data.address,
        City: data.city,
        State: data.state,
        Country: data.country,
        Status: data.status,
      },
    });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Failed to update customer",
        error,
      },
      {
        status: 500,
      }
    );

  }
}


// ========================
// DELETE CUSTOMER
// ========================

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    // Get customer before delete
    const { data: oldCustomer } = await supabaseServer
      .from("customers")
      .select("customer_name")
      .eq("id", body.CustomerId)
      .maybeSingle();

    const { data, error } = await supabaseServer
      .from("customers")
      .delete()
      .eq("id", body.CustomerId)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }

    // ========================
    // ACTIVITY LOG
    // ========================

    await addActivity(
      `Customer deleted: ${oldCustomer?.customer_name ?? "Customer"}`,
      "Customer"
    );

    return NextResponse.json({
      message: "Customer deleted successfully",
      customer: {
        CustomerId: data.id,
        CustomerCode: data.customer_code,
        CustomerName: data.customer_name,
        Phone: data.phone,
        Email: data.email,
        Address: data.address,
        City: data.city,
        State: data.state,
        Country: data.country,
        Status: data.status,
      },
    });

  } catch (error) {

    return NextResponse.json(
      {
        message: "Failed to delete customer",
        error,
      },
      {
        status: 500,
      }
    );

  }
}