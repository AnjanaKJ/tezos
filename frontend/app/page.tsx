import Lamp from "@/components/ui/lamp";
import SignupForm from "@/components/example/signup-form-demo";
import DepositCard from "@/components/ui/DepositCard";
import Link from "next/link";

export default function Home() {
  return (
   <>
      <ul className="navbar-links">
        <li>
          <Link href="/">Deposit</Link>
        </li>
        <li>
          <Link href="/swap">Swap</Link>
        </li>
        <li>
          <Link href="/luckydraw">Lucky Draw</Link>
        </li>
      </ul>
      <Lamp/>
      <SignupForm/>
      <DepositCard/>
   </>
  );
}
