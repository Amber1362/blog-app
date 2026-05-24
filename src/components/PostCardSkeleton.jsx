import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

function PostCardSkeleton() {
    const theme = useSelector((state) => state.theme.mode)
    
    return (
        <SkeletonTheme 
            baseColor={theme === 'dark' ? '#374151' : '#e5e7eb'}
            highlightColor={theme === 'dark' ? '#4B5563' : '#f3f4f6'}
        >
            <div className='w-full bg-white dark:bg-gray-600 rounded-2xl p-4 shadow-md border border-gray-100 dark:border-gray-600'>
                <Skeleton height={192} borderRadius={12} className='mb-4' />
                <Skeleton width={150} height={20} className='mb-2' />
                <Skeleton width={100} height={14} />
            </div>
        </SkeletonTheme>
    )
}

export default PostCardSkeleton