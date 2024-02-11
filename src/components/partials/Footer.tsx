import Image from "next/image";
import Link from "next/link";

type FooterProps = {};

export default function Footer({}: FooterProps) {
  // TODO: text-gray go to config
  // TODO: i dont get this fucking border color
  return (
    <footer className="mb-8">
      <div className="container">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
            {/* <Image
              src="/images/favicon.ico"
              className="h-8 rounded-lg"
              alt="Tief Logo"
            /> */}
            {/* <span className="text-2xl font-semibold dark:text-white">Tief</span> */}
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0 dark:text-gray-300">
            <li>
              <Link href="#" className="hover:underline me-4 md:me-6">
                Rules
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-600 sm:text-center dark:text-gray-300">
          © 2023{" "}
          <a href="/" className="hover:underline">
            Labify™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
