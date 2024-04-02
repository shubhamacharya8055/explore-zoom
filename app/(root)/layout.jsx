import StreamVideoProvider from "@/providers/StreamClientProvider";


export const metadata = {
  title: "Coastal Zoom",
  description: "Video conference app for explore coastal",
  icons: {
    icon : "/icons/logo.svg"
  }
};

export default function RootLayout({children}) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}
