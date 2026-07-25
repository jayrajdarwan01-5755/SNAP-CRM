export interface Customer {
  CustomerId: number;
  CustomerCode: string;
  CustomerName: string;
  Phone: string;
  Email: string;
  Address: string;
  City: string;
  State: string;
  Country: string;
  Status: "Active" | "Inactive";
}