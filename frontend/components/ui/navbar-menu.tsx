import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
    
      <div className="navbar-logo">
        <span className="logo-text">StakeDeck</span>
      </div>
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
      </>
  );
};

export default Navbar;




// import React from 'react';
// import Link from 'next/link';

// const Navbar = () => {
//   return (
//     <nav className="navbar flex">
//       <ul>
//         <div className='flex items-center justify-end'>
//         <li>
//           <Link href="#">
//             Deposit
//           </Link>
//         </li>
//         <li>
//           <Link href="#">
//             Withdraw
//           </Link>
//         </li>
//         <li>
//           <Link href="#">
//             Lucky Draw
//           </Link>
          
//         </li>
//         </div>
//         <li>
//           <Link href="#">
//         Connect Wallet
//           </Link>
//         </li>
//         <li>
//           <Link href="#">
//             Buy Crypto
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;