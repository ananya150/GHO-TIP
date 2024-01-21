import Header from "@/components/Header"

export default function Docs() {
  return (
    <div className="h-screen w-screen bg-[#14141B]">
      <Header navbar={true} />
      {/* <div className="h-full rounded-3xl bg-[#393148]  mx-8 mb-8 mt-2"> */}
        <div className="py-3 px-12 mt-4">
          <span className="text-[120px] text-[#DAD1EF] font-sat font-black ">DOCS</span>
        </div>
        <div className="w-full flex justify-center text-[25px] text-white mt-20">
            Integrate GHO-TIP in your wallet or application with a simple SDK.
        </div>
        <div className="w-full flex justify-center text-[25px] text-white mt-16">
            Coming Soon!
        </div>
      {/* </div> */}
    </div>
  )
}
