import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logout from "../Buttons/Logout";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";

type TopbarProps = {};
type User = {
  id: number;
  email?: string;
  displayName?: string;
};

const Topbar: React.FC<TopbarProps> = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    setToken(token);
    if (user) {
      const parsedUser = JSON.parse(user);
      setUser(parsedUser);
    }
  }, []);

  const handleSigninModal = () => [openModal("login")];

  return (
    <>
      <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
        <div
          className={`flex w-full items-center justify-between max-w-[1200px] mx-auto`}
        >
          <Link href={"/"} className="h-[22px] flex-1">
            <Image src={"/logo-full.png"} alt="logo" height={100} width={100}/>
          </Link>

          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div>
              <a
                href="https://www.buymeacoffee.com"
                target="blank"
                rel="noreferrer"
                className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
              >
                Premium
              </a>
            </div>
            {!token ? (
              <Link href={"/auth"} onClick={handleSigninModal}>
                <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="cursor-pointer group relative">
                <img
                  src="/avatar.png "
                  alt="user profile img"
                  className="h-8 w-8 rounded-full"
                />
                <div className="absolute top-10 left-2/4 -translate-x-2/4 mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg z-40 group-hover:scale-100 scale-0 transition-all duration-300 ease-in-out">
                  <p className="text-sm">{user?.email}</p>
                </div>
              </div>
            )}
            {token && <Logout />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
