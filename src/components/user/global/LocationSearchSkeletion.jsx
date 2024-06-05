import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LocationSearchSkeletion = () => {
    return (
        <section className="w-full h-60 !rounded-md">
            <div className="flex flex-col gap-3 h-full p-2 ">
                <Skeleton className="h-16 rounded-md" />
                <Skeleton className="h-16 rounded-md" />
                <Skeleton className="h-16 rounded-md" />
            </div>
        </section>
    )
}

export default LocationSearchSkeletion