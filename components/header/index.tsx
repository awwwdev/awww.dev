import Link from "next/link";
import { AccountDropdownMenu } from "../account-dropdown";
import Image from "next/image";
import useGetUserMe from "@/hooks/useGetUserMe";
import darsoonLogo from "@/public/static/logo/darsoon-logo.png";
import darsoonFarsiLogo from "@/public/static/logo/darsoon-logo-farsi.png";
import LocaleSwitcher from "../LocaleSwitcher";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LinkButton from "../ui/button/LinkButton";
import { En, Fa } from "../ui/multilang";
import Icon from "@/components/ui/Icon";
import Button from "../ui/button";
import { useRouter } from 'next/router';

const Header = ({ setIsSideMenuOpen,  }) => {
  return (
    <div className="">
      <MobileHeader setIsSideMenuOpen={setIsSideMenuOpen}  />
      <DesktopHeader  />
    </div>
  );
};

export default Header;

function MobileHeader({ setIsSideMenuOpen,  }) {

  const router = useRouter()
  return (
    <header
      className={`   sm:hidden  px-4  sticky top-0 z-10 h-16 flex items-center `}
    >
      <div className={` w-full max-w-page mx-auto grid `} style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        <div className="flex ">
          <HamburgerButton setIsSideMenuOpen={setIsSideMenuOpen} />
        </div>
        <Link href="/" className=" fw-900 c-accent10 text-xs sm:text-base flex justify-center items-center">
          awwww.dev
        </Link>
        <div className="flex justify-end items-center">
          {/* <LocaleSwitcher /> */}
          {/* <MobileAccountButtons /> */}
        </div>
      </div>
    </header>
  );
}

function DesktopHeader({  }) {
  return (
    <header className={`  sm:flex hidden  px-4   sticky top-0 z-10 h-16 items-center c-melow `}>
      <div className={`w-full max-w-page mx-auto flex justify-between items-center gap-0.5 `}>
       <PublicWebsiteNav />
        {/* <Search /> */}
        {/* <LocaleSwitcher /> */}
        {/* <AccountButtons /> */}
      </div>
    </header>
  );
}

function PublicWebsiteNav() {
  const { t } = useTranslation();

  return (
    <nav className="w-full font-display">
      <ul className="flex items-center gap-4  text-xs sm:text-base w-full ">
        <li className="flex items-center">
          <Link href="/" className=" fw-900  text-xs sm:text-base flex justify-center  items-center  fw-300">
        awww.dev
          </Link>
        </li>
        <li className='mis-auto'>
          <Link href="#works" className="hover:text-black">
            Works
          </Link>
        </li>
        <li>
          <Link href="#tools" className="hover:text-black">
            Tools
          </Link>
        </li>
        <li>
          <Link href="#contact" className="hover:text-black">
          Blog
          </Link>
        </li>

        <li>
          <Link href="#contact" className="hover:text-black">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}



function HamburgerButton({ setIsSideMenuOpen }) {
  return (
    <button
      className=" bf-i-ph-list before:mie-0"
      aria-label="Open Menu"
      onClick={() => setIsSideMenuOpen((state) => !state)}
    >
      <span className="sr-only">Open Menu</span>
    </button>
  );
}

// function Search() {
//   const supabase = useSupabaseClient();
//   const [term, setTerm] = useState("");
//   const [debouncedTerm, setDebouncedTerm] = useState(term);

//   useEffect(() => {
//     const timerId = setTimeout(() => {
//       setDebouncedTerm(term);
//     }, 500); // Delay of 500ms

//     return () => {
//       clearTimeout(timerId); // Clear the timeout if the term changes before the delay is over
//     };
//   }, [term]);
//   // const [results, setResults] = useState<any[] | null>(null);

//   const results = useMemo(() => {

//   const handleSearch = async () => {
//     const response = await fetch(`/api/search?term=${encodeURIComponent(debouncedTerm)}`);
//     const result = await response.json();
//     const { data, error } = result;

//     if (error) {
//       console.error(error);
//       return;
//     }
//     return data
//   };

//     if (debouncedTerm) {
//       handleSearch();
//     }
//   }, [debouncedTerm]);

//   return (
//     <>
//       <div
//         className={`flex items-center gap-2 px-2 py-1 rd-lg b-1 b-gray5 w-full sm:w-50 md:w-60
//       focus-within:outline-red
//       `}
//       >
//         <Icon name="bf-i-ph-magnifying-glass c-sand11"/>
//         <label className="flex gap-2 items-center">
//           <span className="sr-only">Search</span>
//           <div className="grid">
//             <input
//               type="text"
//               placeholder="Search tutors, topics, ..."
//               value={term}
//               onChange={(e) => setTerm(e.target.value)}
//               className="focus:outline-none bg-transparent"
//             />
//           </div>
//         </label>
//         {String(term).trim() && (
//           <button
//             onClick={() => {
//               setTerm("");
//               setResults(null);
//             }}
//             className="mis-auto"
//           >
//             <Icon name="bf-i-ph-x"/>
//           </button>
//         )}
//       </div>
//       {results && (
//         <div className=" mt-2 bg-white border border-gray-200 rounded shadow-lg">
//           {results.categories.map((category) => (
//             <Link key={category.id} href={`/classes/${category.id}`} className="block px-4 py-2 hover:bg-gray-100">
//               {category.name}
//             </Link>
//           ))}
//           {results.subcategories.map((subcategory) => (
//             <Link
//               key={subcategory.id}
//               href={`/classes/${subcategory.parentId}/${subcategory.id}`}
//               className="block px-4 py-2 hover:bg-gray-100"
//             >
//               {subcategory.name}
//             </Link>
//           ))}
//           {results.teachers.map((teacher) => {
//             const imageUrl = supabase.storage.from("teacher").getPublicUrl(`photo/${teacher.id}`);
//             return (
//               <Link key={teacher.id} href={`/tutors/${teacher.id}`} className="block px-4 py-2 hover:bg-gray-100">
//                 <div className="flex gap-4 items-center">
//                   <Image
//                     src={imageUrl.data.publicUrl}
//                     width={50}
//                     height={50}
//                     alt="avatar"
//                     className="rounded-lg bg-gray5"
//                   />
//                   <span>{teacher.name}</span>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );
// }
