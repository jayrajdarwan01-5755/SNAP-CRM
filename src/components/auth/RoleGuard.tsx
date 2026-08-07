"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface RoleGuardProps {
  allowedRoles: string[];
  children: ReactNode;
}

export default function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    if (!allowedRoles.includes(user.role)) {
      router.replace("/dashboard");
    }
  }, [user, allowedRoles, router]);

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <div className="p-6 text-red-600 font-semibold">Access Denied</div>;
  }

  return <>{children}</>;
}