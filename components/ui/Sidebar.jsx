"use client"

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Sidebar() {

    const pathname = usePathname()

  return (
    <aside className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1
    p-6 pt-28 text-white max-sm:hidden lg:w-[264px]
    '>

        <div className='flex flex-col flex-1 gap-6'>
            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                return (
                    <Link href={item.route} key={item.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start',
                    {
                        "bg-blue-1" : isActive
                    }
                    )}>
                        <Image src={item.imgUrl} width={24} height={24} alt={item.label} />
                        <p className='font-semibold text-lg max-lg:hidden'>{item.label}</p>
                    </Link>
                )
            })}
        </div>

    </aside>
  )
}
