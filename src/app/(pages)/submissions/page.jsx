"use client";
import React from 'react'
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";
function page() {
  return (
    <>
        <main>
            <HelmetProvider>
                <Helmet>
                <title>Contact | BluOne Ink Publishing</title>
                <meta
                    name="description"
                    content="Get in touch with us for your queries related to publishing your manuscript, interactions with our authors, orders, or a cup of tea or coffee."
                />
                <link
                    rel="canonical"
                    href="http://localhost:3000/submissions"
                />
                </Helmet>
            </HelmetProvider>

            <div className="container mx-auto px-4 py-20">
                <div className="w-full max-w-[700px] mx-auto">
                    {/* LEFT SIDE */}
                    <h2 className="font-medium pt-2 pb-6">Submissions</h2>
                    <div className="bg-[#FFF2E5] w-full h-full p-5">
                        <div className="max-w-screen-md">
                            <div className="tally-embed w-full">
                                <iframe data-tally-src="https://tally.so/embed/MeaL9M?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="869" frameborder="0" marginheight="0" marginwidth="0" title="Book Proposal Submission"></iframe>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default page