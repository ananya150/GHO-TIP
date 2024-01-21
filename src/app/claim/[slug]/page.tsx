import Header from "@/components/Header"
import { AccountService } from "@/services/wallet/service";
import { db } from "@/utils/db";
import Claim from "@/components/claim/Claim";
import Claimed from "@/components/claim/Claimed";

export default async function ClaimPage({ params }: { params: { slug: string } }) {

  const hashLink = params.slug;
  const account = await AccountService.init(hashLink);
  const data: any = await db.get(account.address);


  return (
    <div className="h-screen flex flex-col w-screen bg-[#14141B]">
      <Header navbar={false} />
      <div className="h-full rounded-3xl bg-[#393148]  mx-8 mb-8 mt-2">
        <div className="py-3 px-12">
          <span className="text-[120px] text-[#DAD1EF] font-sat font-black ">Claim</span>
        </div>
        <div className="">
          {
              data.isClaimed? 
              <Claimed data={data} hash={hashLink} />
                :
              <Claim data={data} hash={hashLink} />
          }
        </div>
      </div>
    </div>
  )
}
