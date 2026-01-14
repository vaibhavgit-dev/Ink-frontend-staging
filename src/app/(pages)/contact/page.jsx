"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet";
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

function contact() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => {
      if (typeof Tally !== "undefined") {
        Tally.loadEmbeds();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
                href="https://www.bluone.ink/contact"
              />
            </Helmet>
          </HelmetProvider>

          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

              {/* LEFT SIDE */}
              <div className="lg:col-span-2">
                <div className="pb-[100px] max-w-screen-md">

                  <h2 className="font-medium pt-2 pb-6 lg:pt-[20px] lg:pb-[20px]">
                    Contact Us
                  </h2>

                  <div className="mb-8">
                    <i>
                      <p className="font-ibm font-normal text-black">
                        The sheer delight of reading, reflecting,
                        contemplating, of sharing human experience and
                        knowledge, insight and enlightenment, timelessly,
                        agelessly — this is the incomparable magic of the
                        written word <br />
                        that Ink aims to bring to the world.
                      </p>
                    </i>
                  </div>
                  <div className="flex pb-[30px]">
                    <div className="w-[50%]">
                      <p className="leading-5">
                        A-76, Sector 136 <br />
                        Noida, Uttar Pradesh <br />
                        201 305 <br />
                        <a
                          href="https://maps.app.goo.gl/ACkMv7MEujUqnHiG7"
                          target="_blank"
                        >
                          <span className="text-[#007DD7] font-ibm">
                            Location
                          </span>
                        </a>
                      </p>
                    </div>
                    <div className="w-[50%]">
                      <p className="pb-[0px]">editors@bluone.ink</p>
                      <p>+91 89292-00199</p>
                    </div>
                  </div>

                  {/* ICON BASED SOCIAL LINKS */}
                  <ul className="flex gap-6 mb-[60px]">
                    <li>
                      <a
                        href="https://in.linkedin.com/company/bluoneink"
                        target="_blank"
                        className="text-xl hover:text-[#007DD7]"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedinIn />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/bluone.ink/"
                        target="_blank"
                        className="text-xl hover:text-[#007DD7]"
                        aria-label="Instagram"
                      >
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/channel/UC2hOgss9-N9Yx5c3DuyIU0Q"
                        target="_blank"
                        className="text-xl hover:text-[#007DD7]"
                        aria-label="YouTube"
                      >
                        <FaYoutube />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://x.com/BluOneInk"
                        target="_blank"
                        className="text-xl hover:text-[#007DD7]"
                        aria-label="X"
                      >
                        <FaXTwitter />
                      </a>
                    </li>
                  </ul>

                  {/* TALLY FORM */}
                  <div className="bg-[#FFF2E5] w-full max-w-[500px] h-full mb-[60px]">
                    <div className="w-full flex justify-center mx-auto p-6">
                      <iframe
                        data-tally-src="https://tally.so/embed/mVMWzM?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                        loading="lazy"
                        width="100%"
                        height="200"
                        title="Ink in your Inbox"
                      ></iframe>
                    </div>
                  </div>

                  <i>
                    <p className="paragh font-ibm leading-loose">
                      Ink is a part of a multinational ecosystem of
                      conscious businesses under the parent company,{" "}
                      <a
                        href="https://bluone.in/"
                        target="_blank"
                        className="link"
                      >
                        BluOne
                      </a>
                      . We believe in excellence and exist to help create
                      a positive impact in the world.
                    </p>
                  </i>

                </div>
              </div>

              {/* RIGHT SIDE – STICKY */}
              <div className="space-y-10 lg:sticky lg:top-28 mt-2 self-start">
                <h3 className="font-medium text-xl mt-20">
                  Company & Regional Contacts
                </h3>

                {[
                  {
                    region: "North India",
                    name: "Narender Singh",
                    PO: "Senior Executive, Sales",
                    email: "narender.singh@bluone.ink",
                    phone: "+91 98181 10264",
                  },
                  {
                    region: "South India",
                    name: "Dayanand MG",
                    PO: "Senior Executive, Sales",
                    email: "dayananda@bluone.ink",
                    phone: "+91 70199 38796",
                  },
                  {
                    region: "East & West",
                    name: "Veer Sumiet",
                    PO: "Sales Manager",
                    email: "veer@bluone.ink",
                    phone: "+91 95941 61555",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-5 rounded-lg"
                  >
                    <h4 className="font-semibold mb-2">
                      {item.region}
                    </h4>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-sm">{item.PO}</p>
                    <p className="text-sm">{item.email}</p>
                    <p className="text-sm">{item.phone}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default contact;
