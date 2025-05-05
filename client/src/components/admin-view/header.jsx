import AlignJustify from "lucide-react";
import { Button } from "../ui/button";
function AdminHeader() {
  return (
    // <div>
    //   <h1>Admin header comes here</h1>
    // </div>
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b border-1">
      <Button className="lg:hidden sm:block">
        <span className="sr-only">Toggle Menu</span>
        <AlignJustify />
      </Button>
      <div className="flex flex-1 justify-end">
        <Button>Logout</Button>
      </div>
    </header>
  );
}

export default AdminHeader;
