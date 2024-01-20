import Header from "@/components/Header"
import Share from "@/components/create/Share"

export default function SharePage({ params }: { params: { slug: string } }) {
  return (
    <div className="h-screen flex flex-col w-screen bg-[#14141B]">
      <Header navbar={false} />
      <div className="h-full rounded-3xl bg-[#393148]  mx-8 mb-8 mt-2">
        <div className="py-3 px-12">
          <span className="text-[120px] text-[#DAD1EF] font-sat font-black ">Share</span>
        </div>
        <div className="">
          <Share address={params.slug} />
        </div>
      </div>
    </div>
  )
}
