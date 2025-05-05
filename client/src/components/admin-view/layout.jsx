import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";
import { useState } from "react";

function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen w-full flex">
      <AdminSidebar open={open} setOpen={setOpen} />
      <div className="flex flex-1 flex-col">
        <AdminHeader setOpen={setOpen} />

        <main className="flex flex-1 bg-muted/50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
