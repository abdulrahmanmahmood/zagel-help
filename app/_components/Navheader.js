"use client";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import charit from "../../public/charity.jpg";
import gover from "../../public/Emblem_of_Saudi_Arabia_(2).svg.png";
// import logo from "../assets/logo.jpg";
// import logo2 from "../assets/logo2.jpg";
import logo2 from "../../public/baseLogo.png";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/home", current: true },
  { name: "Set New Address", href: "/setAddress", current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  ); // Access user role from Redux

  /*
  console.log(
    `User info: Role is ${role}, Token is ${token}, Email is ${email}, DisplayName is ${displayName}`
  );
  */

  // Determine which image to display based on the user's

  const profileImage = role === 1 ? gover : charit;

  return (
    <Disclosure as="nav" className="bg-[#9d9273] text-white w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex  flex-shrink-0 items-center ml-9">
                  <Image src={logo2} width={50} height={50} alt="logo2" />
                </div>

                <div className="hidden sm:ml-6 sm:block items-baseline my-auto">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          window.location.pathname === item.href
                            ? "bg-[#554b30] text-white no-underline"
                            : "text-white hover:bg-[#554b30] no-underline hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          window.location.pathname === item.href
                            ? "page"
                            : undefined
                        }
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <Menu.Button>
                    <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src={profileImage}
                        alt=""
                      /> */}
                      <Image
                        src={profileImage}
                        height={50}
                        width={50}
                        alt="Profil Image"
                      />
                    </div>
                  </Menu.Button>

                  <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Edit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          View
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-[1000] mt-2 w-48 origin-top-right rounded-md bg-[#c0bc9d] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-900 no-underline"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-[#3f4934] no-underline"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/sign-in"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-900 no-underline"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <span className="mx-2">{displayName}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
