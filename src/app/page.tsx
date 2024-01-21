import Header from "@/components/Header"

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[#14141B]">
      <Header navbar={true} />
      {/* <div className="h-full rounded-3xl bg-[#393148]  mx-8 mb-8 mt-2"> */}
        <div className="py-3 px-12 mt-4">
          <span className="text-[120px] text-[#DAD1EF] font-sat font-black ">SEND MONEY AS LINKS</span>
        </div>
        <div className="mt-28 w-full px-12 flex justify-between items-center">
          <div className="w-1/3 flex flex-col items-center  bg-[#393148] mx-8 rounded-3xl py-8">
            <div className="text-white font-sans text-[28px]">
              What
            </div>
            <div className="text-[15px] text-[#A8A1BA] mt-8 px-8">
              Gho-tip is an application to tip anyone with GHO stablecoins with just a link without requiring receiver's address.
              <br />
              <br />
              User's can easily create an customized link and tip with any asset while still mainting exposure to it (thanks to how GHO works).
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center  bg-[#393148] mx-8 rounded-3xl py-8">
            <div className="text-white font-sans text-[28px]">
              Why
            </div>
            <div className="text-[15px] text-[#A8A1BA] mt-8 px-8">
              Addresses are messy and does not contrubite to a good user experience. Sending money should be as easy as sending a link.
              <br />
              <br />
              Tipping industry is huge and we see a great potential in GHO-TIP to tip people in online and offline mode.
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center  bg-[#393148] mx-8 rounded-3xl py-8">
            <div className="text-white font-sans text-[28px]">
              How
            </div>
            <div className="text-[15px] text-[#A8A1BA] mt-8 px-8">
              GHO-TIP takes adavntage of design of GHO token and account abstraction to send money as link in fully decentralized way. 
              <br />
              <br />
              It also uses Chainlink CCIP token to claim tokens at any destination blockchains and Connect kit for a better UI and UX.
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  )
}
