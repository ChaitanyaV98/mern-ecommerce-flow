import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";

function UserCartItemsContent({ cartItem }) {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="h-20 w-20 rounded object-cover "
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <Button variant="outline" size="icon" className="h-8 w- rounded-full">
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
