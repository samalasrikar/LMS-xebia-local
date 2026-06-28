import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

import { Input } from "../ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import adminProfileIcon from "../../assets/admin_profile_icon.svg";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur">

      {/* Left */}

      <div className="flex items-center gap-4">

        <button className="md:hidden">
          <Menu size={22} />
        </button>

        <div>
          <p className="text-xs text-slate-500">
            Home / Dashboard
          </p>

          <h1 className="text-xl font-semibold text-slate-900">
            Dashboard
          </h1>
        </div>

      </div>

      {/* Search */}

      <div className="hidden w-full max-w-md lg:block">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <Input
            placeholder="Search courses, modules..."
            className="pl-10"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <button className="relative rounded-full p-2 hover:bg-slate-100">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <button className="flex items-center gap-2 rounded-full hover:bg-slate-100 p-1 pr-2">

              <Avatar className="h-9 w-9">
                <AvatarImage src={adminProfileIcon} alt="Admin" />
                <AvatarFallback className="bg-purple-700 text-white">
                  A
                </AvatarFallback>
              </Avatar>

              <ChevronDown size={16} />

            </button>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-600">
              Logout
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </header>
  );
}