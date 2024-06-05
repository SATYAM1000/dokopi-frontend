import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LocationSearchSkeletion = () => {
    return (
        <section className="w-full h-60 !rounded-xl">
            <div className="flex flex-col gap-5 h-full">
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
                <Skeleton className="h-16 rounded-xl" />
            </div>
        </section>
    )
}

export default LocationSearchSkeletion