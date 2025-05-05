import { Fragment } from "react";
import { ChartNoAxesCombined } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "@/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col mt-4 gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              setOpen ? setOpen(false) : null;
              navigate(menuItem.path);
            }}
            className="flex items-center gap-2 rounded-md px-3 py-2  cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <menuItem.icon className="w-5 h-5" />
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
};

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                <span className="text-2xl font-bold">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ChartNoAxesCombined />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <MenuItems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
