import DashboardLayout from "@/components/layout/DashboardLayout";
import { LoadingProvider } from "@/context/LoadingContext";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </LoadingProvider>
  );
}