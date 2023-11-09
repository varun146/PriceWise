"use client";

import { scrapedAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

const isValidLink = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.in") ||
      hostname.includes("amazon")
    ) {
      return true;
    }
  } catch (err) {
    return false;
  }
};

const Searchbar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValid = isValidLink(searchPrompt);
    if (!isValid) return alert("Please enter a valid link");

    try {
      setIsLoading(true);

      //Scrape the product page
      const product = await scrapedAndStoreProduct(searchPrompt);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      action=""
      className="flex flex-wrap gap-4 mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        onChange={(e) => setSearchPrompt(e.target.value)}
      />

      <button
        type="submit"
        disabled={searchPrompt === ""}
        className="searchbar-btn"
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
