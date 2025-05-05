import { Outlet } from "react-router-dom";
import AdminHeader from "./header";
import AdminSidebar from "./sidebar";

function AdminLayout() {
  return (
    <div className="min-h-screen w-full flex">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex flex-1 bg-muted/50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
