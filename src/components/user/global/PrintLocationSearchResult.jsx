import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
const PrintLocationSearchResult = ({ datas }) => {
    const { result, success } = datas

    if (!success) {
        return <span className='text-red-600 text-xs'>No result found</span>
    }
    return (
        <ScrollArea className="h-60 py-2 w-full rounded-md border text-black">
            {
                result && result.length > 0 && result.map((data) => (
                    <div key={data.place_id + data.lon}>
                        <p className="text-xs font-medium px-2 max-lg:px-3 max-lg:text-sm cursor-pointer" data-latitude={data.lat} data-longitude={data.lon}>{data.display_name}</p>
                        <Separator className='my-2 bg-black ' />
                    </div>
                ))
            }
        </ScrollArea>
    )
}

export default PrintLocationSearchResult