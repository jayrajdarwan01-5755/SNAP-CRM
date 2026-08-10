import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

async function getCount(table: string) {
  const { count, error } = await supabaseServer
    .from(table)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.log(`${table} Error:`, error.message);
    return 0;
  }

  return count ?? 0;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const role = searchParams.get("role");

    // ===========================
    // COMMON COUNTS
    // ===========================

    const employeeCount = await getCount("employees");
    const leadCount = await getCount("leads");
    const productCount = await getCount("products");
    const customerCount = await getCount("customers");
    const opportunityCount = await getCount("opportunities");
    const leaveCount = await getCount("leaves");
    const payrollCount = await getCount("payrolls");


let recentActivities = [];

if (role === "Admin") {
  // Admin can see all recent activities
  const { data, error } = await supabaseServer
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Admin Activities Error:", error.message);
  }

  recentActivities = data || [];

} else if (role === "Employee") {

  const employeeId = searchParams.get("employeeId");

  const { data, error } = await supabaseServer
    .from("activities")
    .select("*")
    .eq("role", "Employee")
    .eq("employeeid", employeeId)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Employee Activities Error:", error.message);
  }

  recentActivities = data || [];

} else {

  const { data, error } = await supabaseServer
    .from("activities")
    .select("*")
    .eq("role", role)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error(`${role} Activities Error:`, error.message);
  }

  recentActivities = data || [];
}

    let dashboardData: {
      cards: any[];
      activities: any[];
    };

        // ===========================
    // ADMIN
    // ===========================

    if (role === "Admin") {
      dashboardData = {
        cards: [
          {
            title: "Total Employees",
            value: employeeCount,
            module: "HR",
          },
          {
            title: "Total Leads",
            value: leadCount,
            module: "Sales",
          },
          {
            title: "Total Products",
            value: productCount,
            module: "Inventory",
          },
          {
            title: "Total Customers",
            value: customerCount,
            module: "Sales",
          },
        ],

activities: recentActivities.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  module: item.module,
  date: new Date(item.created_at).toLocaleDateString(),
})),
      };
    }

    // ===========================
    // HR
    // ===========================

    else if (role === "HR") {
      const { count: activeEmployees } = await supabaseServer
        .from("employees")
        .select("*", { count: "exact", head: true })
        .eq("status", "Active");

      const { count: pendingLeaves } = await supabaseServer
        .from("leaves")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending");

      dashboardData = {
        cards: [
          {
            title: "Total Employees",
            value: employeeCount,
            module: "HR",
          },
          {
            title: "Active Employees",
            value: activeEmployees ?? 0,
            module: "HR",
          },
          {
            title: "Pending Leaves",
            value: pendingLeaves ?? 0,
            module: "Leave",
          },
          {
            title: "Payroll Processed",
            value: payrollCount,
            module: "Payroll",
          },
        ],

      activities: recentActivities?.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  module: item.module,
  date: new Date(item.created_at).toLocaleDateString(),
})) || [],
      };
    }

        // ===========================
    // MANAGER
    // ===========================

    else if (role === "Manager") {
      dashboardData = {
        cards: [
          {
            title: "Total Leads",
            value: leadCount,
            module: "Sales",
          },
          {
            title: "Opportunities",
            value: opportunityCount,
            module: "Sales",
          },
          {
            title: "Customers",
            value: customerCount,
            module: "Sales",
          },
          {
            title: "Products",
            value: productCount,
            module: "Inventory",
          },
        ],

       activities: recentActivities?.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  module: item.module,
  date: new Date(item.created_at).toLocaleDateString(),
})) || [],
      };
    }

    // ===========================
    // EMPLOYEE
    // ===========================

    else {
      const employeeId = searchParams.get("employeeId");
      const fullName = searchParams.get("fullname");

      console.log("EMPLOYEE DASHBOARD");
      console.log("employeeId:", employeeId);
      console.log("fullname:", fullName);

      const employeeName = fullName || "Employee";

      let leaveBalance = 0;
      let payrollStatus = "Pending";

      if (employeeId) {
        // Leave Balance
        const { count: leaves } = await supabaseServer
          .from("leaves")
          .select("*", { count: "exact", head: true })
          .eq("employeeid", employeeId);

        leaveBalance = leaves ?? 0;

        // Latest Payroll
        const { data: payroll } = await supabaseServer
          .from("payrolls")
          .select("month")
          .eq("employeeid", employeeId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        payrollStatus = payroll ? "Paid" : "Pending";
      }

      dashboardData = {
        cards: [
          {
            title: "My Profile",
            value: employeeName,
            module: "Employee",
          },
          {
            title: "Leave Balance",
            value: `${leaveBalance} Records`,
            module: "Leave",
          },
          {
            title: "Attendance",
            value: "95%",
            module: "Attendance",
          },
          {
            title: "Payroll Status",
            value: payrollStatus,
            module: "Payroll",
          },
        ],

     activities: recentActivities?.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  module: item.module,
  date: new Date(item.created_at).toLocaleDateString(),
})) || [],
      };
    }

    // ===========================
    // COMMON RESPONSE
    // ===========================

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });

  } catch (error: any) {
    console.error("Dashboard API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to load dashboard data",
        error:
          process.env.NODE_ENV === "development"
            ? String(error)
            : undefined,
        stack:
          process.env.NODE_ENV === "development"
            ? error?.stack
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}