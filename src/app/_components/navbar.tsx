import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="text-xl font-bold">
        <Link href="/">Pro Quiz</Link>
      </div>
      <div className="flex gap-2">
        <Link href="/signin">
          <Button variant="outline">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
} 