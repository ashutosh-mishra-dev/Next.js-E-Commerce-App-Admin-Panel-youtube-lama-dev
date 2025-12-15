import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Bell, Home } from "lucide-react";
import ShopingCardIcon from "./ShopingCardIcon";

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-b border-gray-200 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center">
        <Image
          src={"/logo.png"}
          alt="Trend"
          width={36}
          height={36}
          className="h-6 w-6 md:h-9 md:w-9"
        />
        <p className="hidden font-medium tracking-wider md:block">TREND-AK.</p>
      </Link>
      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="h-4 w-4 text-gray-600" />
        </Link>
        <Bell className="h-4 w-4 text-gray-600" />
        <ShopingCardIcon />
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};
export default Navbar;
