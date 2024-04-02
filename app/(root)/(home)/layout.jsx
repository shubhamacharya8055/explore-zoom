import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import React from 'react'


export const metadata = {
  title: "Coastal Zoom",
  description: "Video conference app for explore coastal",
  icons: {
    icon : "/icons/logo.svg"
  }
};

export default function HomeLayout({children}) {
  return (
    <main className='relative'>
        <Navbar />

        <div className="flex">
            <Sidebar />

            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                    <div className='w-full'>
                        {children}
                    </div>
            </section>
        </div>
    </main>
  )
}
