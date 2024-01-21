"use client";

import { useEffect, useState } from "react";
import { Drawer } from "vaul";
import { clsx } from "clsx";
import { Separator } from "@/components/ui/separator";
import { Wallet, BookUser, Landmark, Link2 } from "lucide-react";

export function ClaimDrawer({
    children,
  }: {
    children: React.ReactNode
  }) {
  const [snap, setSnap] = useState<number | string | null>("300px");
//   const [open, setOpen] = useState(false);

    useEffect(() => {}, [snap])

  return (
    <Drawer.Root
      snapPoints={["300px", "400px"]}
      activeSnapPoint={snap}
      onClose={() => {setSnap("300px")}}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content className="fixed flex flex-col bg-white border border-gray-200  rounded-[34px] bottom-[5%] left-[38%] right-[38%] h-full  mx-[-1px]">
          <div
            className={clsx("flex flex-col max-w-md mx-auto w-full p-8", {
              "overflow-y-auto": snap === 1,
              "overflow-hidden": snap !== 1,
            })}
          >
            {
                snap === "300px" &&
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <span className="text-[20px] font-sat font-medium">Options</span>
                        {/* <div onClick={() => {setOpen(false)}} className="rounded-full w-[25px] h-[25px] bg-[#f7f8f9] flex justify-center items-center cursor-pointer">
                            <span className="text-[18px] font-sat font-semibold text-[#999999]">x</span>
                        </div> */}
                        <div/>
                    </div>
                    <Separator className="mt-7 bg-gray-100" />
                    <div className="mt-6 flex flex-col space-y-4">
                        <div onClick={() => {setSnap("400px")}} className="w-full bg-[#F7F8F9] cursor-pointer text-black text-[17px] font-sat font-medium rounded-2xl py-3 hover:bg-[#F7F8F9] flex justify-start items-center px-3 ">
                            <Wallet className="text-black w-5 h-5 mr-4" />
                            Connected Wallet
                        </div>
                        <div className="w-full bg-[#F7F8F9] cursor-pointer text-black text-[17px] font-sat font-medium rounded-2xl py-3 hover:bg-[#F7F8F9] flex justify-start items-center px-3 ">
                            <BookUser className="text-black w-5 h-5 mr-4" />
                            Ethereum Address
                        </div>
                        <div className="w-full cursor-not-allowed bg-[#FEF1F0] text-black text-[17px] font-sat font-medium rounded-2xl py-3 hover:bg-[#FEF1F0] flex justify-between items-center px-3 ">
                            <div className="flex items-center">
                                <Landmark className="text-black w-5 h-5 mr-4" />
                                Withdraw to Bank
                            </div>
                        </div>
                    </div>
                </div>

            }
            {
                snap === "400px" &&
                <div className="flex flex-col">
                        <Link2 className="text-gray-400 w-11 h-11" />
                        <div className="mt-2">
                            <span className="text-[24px] font-medium">Select Chain</span>
                        </div>
                        <div className="mt-2">
                            <span className="text-[17px] text-gray-400 font-medium">Choose the chain you want your assets on.</span>
                        </div>
                    <Separator className="mt-5 bg-gray-100" />
                    <div className="mt-6 flex flex-col space-y-4">
                        <div onClick={() => {setSnap("400px")}} className="w-full bg-[#F7F8F9] cursor-pointer text-black text-[17px] font-sat font-medium rounded-2xl py-3 hover:bg-[#F7F8F9] flex justify-start items-center px-3 ">
                            <Wallet className="text-black w-5 h-5 mr-4" />
                            Ethereum Sepolia
                        </div>
                        <div className="w-full bg-[#F7F8F9] cursor-pointer text-black text-[17px] font-sat font-medium rounded-2xl py-3 hover:bg-[#F7F8F9] flex justify-start items-center px-3 ">
                            <BookUser className="text-black w-5 h-5 mr-4" />
                            Arbitrum Sepolia
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2 mt-8">
                        <Drawer.Close className="w-1/2 ">
                            <div onClick={() => {setSnap("300px")}} className="w-full cursor-pointer bg-[#f0f2f4] rounded-2xl flex justify-center px-2 py-2">
                                <span className="text-[18px] font-medium ">Cancel</span>
                            </div>
                        </Drawer.Close>
                        <div className="w-1/2 bg-[#4eaffe] cursor-pointer rounded-2xl flex justify-center px-2 py-2">
                            <span className="text-[18px] text-white font-medium">Confirm</span>
                        </div>
                    </div>
                </div>
            }
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
