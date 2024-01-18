import Header from "@/components/Header"
import { ConnectKitButton } from "connectkit"

export default function Home() {
  return (
    <div className="h-screen flex flex-col w-screen bg-[#14141B]">
      <Header navbar={false} />
      <div className="h-full rounded-3xl bg-[#393148]  mx-8 mb-8 mt-2">
        <div className="py-3 px-12">
          <span className="text-[120px] text-[#DAD1EF] font-sat font-black ">Create</span>
        </div>
      </div>
    </div>
  )
}
