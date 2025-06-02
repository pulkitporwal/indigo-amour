"use client";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/newletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data);
      // Check if the response is successful
      if (response.ok) {
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear the email input after successful submission
      } else {
        // If the response is not successful, display the error message
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <section className="newsletter-section bg-[#e1e1e1] p-6 pt-8 shadow-md text-center">
      <h2 className="text-2xl text-[#1a1a1a] font-bold mb-4">
        Stay Informed, Stay Ahead!
      </h2>
      <p className="text-[#1a1a1a] mb-6">
        Subscribe to our newsletter for the latest updates, tips, and insights
        directly to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 w-full text-[#1a1a1a] md:w-1/2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111827] mb-4"
        />
        <button
          type="submit"
          className="bg-[#111827] text-white px-6 py-3 rounded-lg hover:bg-[#111827] transition-colors"
        >
          Subscribe Now
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      <p className="text-gray-500 mt-4 text-sm">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </section>
  );
};

export default Newsletter;
