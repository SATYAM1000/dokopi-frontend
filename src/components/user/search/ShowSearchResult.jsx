import React from 'react'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import Link from 'next/link'

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
const ShowSearchResult = ({ Response }) => {
    const { data, success, msg } = Response
    if (!success) {
        return (
            <ScrollArea className="p-4 w-full rounded-md border text-black">
                <h4 className="text-sm font-medium leading-none">{msg}</h4>
            </ScrollArea>)
    }
    return (
        <ScrollArea className="h-72 w-full rounded-md border text-black">
            <div className="p-4">
                {data && data.map((results) => {
                    const { storeDetails } = results
                    const { storeLocation } = storeDetails
                    return <>
                        <Link href={`/stores/${results._id}`} key={results._id} className="text-sm" target='_blank'>
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium leading-none">{storeDetails.storeName}</h4>
                                <p className="text-sm text-muted-foreground">
                                    {storeLocation.storeLandmark},
                                    {storeLocation.storeCity},
                                    {storeLocation.storeState},
                                    {storeLocation.storeCountry},
                                    {storeLocation.storeZipCode}
                                </p>
                            </div>
                        </Link>
                        <Separator className="my-2" />
                    </>
                })}
            </div>
        </ScrollArea>
    )
}

export default ShowSearchResult