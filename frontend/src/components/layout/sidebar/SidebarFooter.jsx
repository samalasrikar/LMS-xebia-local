import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { footerItems } from "./menuItems";

export default function SidebarFooter() {
  return (
    <div className="mt-auto pt-4">
      <Separator className="mb-4" />

      <div className="space-y-2">
        {footerItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-purple-700"
                }`
              }
            >
              <Icon size={20} />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      <Separator className="my-4" />

      <div className="flex items-center gap-3 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer">
        <Avatar>
          <AvatarFallback className="bg-purple-700 text-white">
            A
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            Admin
          </span>

          <span className="text-xs text-gray-500">
            admin@xebia.com
          </span>
        </div>
      </div>
    </div>
  );
}