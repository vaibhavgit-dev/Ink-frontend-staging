'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import navbarLogo from "../assests/image/navbarLogo.png";
import { IoCloseSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [totalBooks, setTotalBooks] = useState({});
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const searchRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path) => pathname === path ? 'text-[#FFDE7C]' : 'text-white';

  // Close search popup on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchBar(false);
      }
    }
    if (showSearchBar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchBar]);

  // Fetch categories and counts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dashboard.bluone.ink/api/public/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);

        const bookCounts = {};
        const allBooksRes = await fetch("https://dashboard.bluone.ink/api/public/books");
        if (allBooksRes.ok) {
          const allBooksData = await allBooksRes.json();
          bookCounts["All Books"] = allBooksData.length || 0;
        }

        for (const category of data) {
          const booksRes = await fetch(`https://dashboard.bluone.ink/api/public/books?category=${encodeURIComponent(category.name)}`);
          if (booksRes.ok) {
            const booksData = await booksRes.json();
            bookCounts[category.name] = booksData.length || 0;
          }
        }
        setTotalBooks(bookCounts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all books
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await fetch("https://dashboard.bluone.ink/api/public/books");
        if (res.ok) {
          const data = await res.json();
          setAllBooks(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllBooks();
  }, []);

  // Search filter
  useEffect(() => {
    if (!query) return setResults([]);
    const delayDebounce = setTimeout(() => {
      setLoading(true);
      try {
        const filtered = allBooks.filter((book) => {
          const titleMatch = book.title?.toLowerCase().includes(query.toLowerCase());
          const authorMatch = book.author?.name?.toLowerCase().includes(query.toLowerCase());
          const isbnMatch =
            book.isbn13 &&
            book.isbn13.toString().replace(/-/g, "").includes(query.replace(/-/g, ""));
          return titleMatch || authorMatch || isbnMatch;
        });
        setResults(filtered.slice(0, 6));
      } catch (err) {
        console.error("Search filter error:", err);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [query, allBooks]);

  const handleBookClick = (slug) => {
    setQuery("");
    setResults([]);
    setShowSearchBar(false);
    router.push(`/books/${slug}`);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navmain w-full fixed h-[60px] z-[11111] bg-[#241b6d] flex justify-between items-center px-4 bg-no-repeat">
        {/* Mobile + Tablet Header */}
        <div className="flex items-center justify-between w-full lg:hidden">
          <a href="/">
            <Image src={navbarLogo} alt="Logo" width={60} height={40} />
          </a>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSearchBar(!showSearchBar)}
              className="text-white text-xl"
            >
              <FiSearch />
            </button>
            <button onClick={toggleMenu} className="text-white text-2xl">
              {isOpen ? <IoCloseSharp /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden mx-auto text-center lg:flex space-x-20 navbar items-center">
          <li className={`hover:text-[#FFDE7C] ${isActive('/authors')} `}>
            <a href="/"><i className="ifont">Home</i></a>
          </li>
          <li className={`hover:text-[#FFDE7C] ${isActive('/authors')} `}>
            <a href="/about-us"><i className="ifont">About</i></a>
          </li>
          
          <li
            className={`relative group hover:text-[#FFDE7C] flex items-center h-[60px] ${isActive('/books')}`}
            onMouseEnter={() => setShowSubMenu(true)}
            onMouseLeave={() => setShowSubMenu(false)}
          >
            <div className="flex items-center cursor-pointer">
              <Link href="/category" className="flex-1">
                <i className="ifont">Books</i>
              </Link>

              <FaChevronDown
                className={`ml-1 mt-2 transition-transform duration-300 ${
                  showSubMenu ? 'rotate-180' : ''
                }`}
              />
            </div>

            {showSubMenu && categories.length > 0 && (
            <ul
              className="absolute top-full left-0 w-56 bg-[#241b6d] text-white shadow-lg z-[999] rounded-b-md"
              onMouseEnter={() => setShowSubMenu(true)}
              onMouseLeave={() => setShowSubMenu(false)}
            >
              {[
                ...categories.filter((cat) => cat.name === 'Top-Sellers'),
                ...categories.filter(
                  (cat) =>
                    cat.name !== 'Top-Sellers' &&
                    Number(totalBooks?.[cat.name]) > 0
                ),
              ].map((cat) => (
                <li
                  key={cat.id}
                  className="text-sm hover:bg-[#372f87] hover:text-[#FFDE7C] px-4 py-2 text-left font-ibm cursor-pointer whitespace-nowrap"
                  onClick={() =>
                    router.push(
                      `/books?category=${encodeURIComponent(cat.name)}&page=1&limit=15`
                    )
                  }
                >
                  {cat.name}
                  {totalBooks?.[cat.name] > 0 && ` (${totalBooks[cat.name]})`}
                </li>
              ))}

              {/* Divider */}
              <li className="border-t border-[#3f3690] my-1"></li>

              {/* ✅ Catalogue download option */}
              <li className="text-sm hover:bg-[#372f87] hover:text-[#FFDE7C] px-4 py-2 text-left font-ibm whitespace-nowrap">
                <a
                  href="/catalogs/ink_catalog_cover_2026.pdf"
                  download
                  className="block w-full"
                >
                  Catalogue (PDF)
                </a>
                
              </li>
            </ul>
          )}

          </li>
          <li>
            <a href="/"><Image src={navbarLogo} alt="Logo" width={0} height={40} className="hidden lg:block" /></a>
          </li>
          <li className={`hover:text-[#FFDE7C] ${isActive('/authors')} `}>
            <a href="/authors"><i className="ifont">Authors</i></a>
          </li>
          <li className={`hover:text-[#FFDE7C] ${isActive('/resources')} `}>
            <a href="/submissions"><i className="ifont">Submissions</i ></a>
          </li>
          {/* <li className={`hover:text-[#FFDE7C] ${isActive('/resources')} `}>
            <a href="/resources"><i className="ifont">Resources</i ></a>
          </li> */}
          <li className={`hover:text-[#FFDE7C] ${isActive('/contact')} `}>
            <a href="/contact"><i className="ifont">Contact</i ></a>
          </li>
        </ul>
        <button
          onClick={() => setShowSearchBar(!showSearchBar)}
          className="hidden lg:flex text-white focus:outline-none absolute pt-2 right-60"
        >
          <FiSearch size={20} />
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#241b6d] text-white flex flex-col p-6 z-[11111]">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-2xl mb-4">
              <IoCloseSharp />
            </button>
          </div>
          <a href="/authors" className="py-2 border-b">Authors</a>
          <div className="py-2 border-b">
            <p className="flex items-center justify-between cursor-pointer" onClick={() => setShowSubMenu(!showSubMenu)}>
              Books <FaChevronDown className={`ml-2 transition-transform ${showSubMenu ? "rotate-180" : ""}`} />
            </p>
            {showSubMenu && (
              <ul className="ml-4 mt-2">
                {categories
                  .filter((cat) => cat.name !== "Top-Sellers" && totalBooks[cat.name] > 0)
                  .map((cat) => (
                    <li
                      key={cat.id}
                      className="py-1 cursor-pointer hover:text-[#FFDE7C]"
                      onClick={() => {
                        router.push(`/books?category=${encodeURIComponent(cat.name)}&page=1&limit=15`);
                        setIsOpen(false);
                      }}
                    >
                      {cat.name} ({totalBooks[cat.name]})
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <a href="/resources" className="py-2 border-b">Resources</a>
          <a href="/contact" className="py-2 border-b">Contact</a>
        </div>
      )}

      {/* Search Bar */}
      <div
        ref={searchRef}
        className={`fixed top-[60px] bg-white w-full px-4 transition-all duration-300 overflow-visible z-[999] ${
          showSearchBar ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative max-w-2xl mx-auto p-2">
          <input
            type="text"
            placeholder="Search by Title, Author or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                router.push(`/search?query=${encodeURIComponent(query)}`);
                setShowSearchBar(false);
              }
            }}
            className="w-full px-3 py-2 rounded-full border text-black focus:outline-none pr-8"
          />
          <button
            onClick={() => {
              if (query.trim()) {
                router.push(`/search?query=${encodeURIComponent(query)}`);
                setQuery("");
                setResults([]);
                setShowSearchBar(false);
              }
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600"
          >
            <FiSearch size={18} />
          </button>

          {/* Results */}
          {query && results.length > 0 && (
            <ul className="absolute top-full p-3 left-0 w-full bg-white border rounded-md shadow-md max-h-[70vh] overflow-y-auto z-[99999]">
              {results.map((book) => (
                <li
                  key={book.id}
                  onClick={() => handleBookClick(book.slug)}
                  className="flex gap-2 p-2 cursor-pointer hover:bg-gray-100"
                >
                  <div>
                    <p className="text-sm font-medium">{book.title}</p>
                    <p className="text-xs text-gray-600">{book.author?.name || "Unknown Author"}</p>
                    <p className="text-xs text-gray-400">ISBN: {book.isbn13 || "N/A"}</p>
                  </div>
                </li>
              ))}
              <li
                className="p-2 text-center cursor-pointer hover:underline border-t"
                onClick={() => {
                  router.push(`/search?query=${encodeURIComponent(query)}`);
                  setQuery("");
                  setResults([]);
                  setShowSearchBar(false);
                }}
              >
                See all results
              </li>
            </ul>
          )}
          {query && loading && (
            <div className="absolute top-full left-0 w-full bg-white p-2 text-sm text-gray-500 mt-1">
              Searching...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
