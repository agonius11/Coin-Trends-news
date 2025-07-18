"use client";

import { Linkedin, Twitter, Globe, X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import ModalPortal from "./ModalPortal";

interface AuthorModalProps {
  author: string;
  isOpen: boolean;
  onClose: () => void;
}

const authors = {
  "Antoine Marin": {
    name: "Antoine Marin",
    bio: "Crypto analyst and DeFi specialist with expertise in blockchain technology and market trends. Antoine has been working in the Fintech and Personal Finance space for over 5 years, providing insights on cryptocurrency markets and emerging blockchain technologies.",
    avatar: "/images/articles/antoine-marin.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/antoinemarin7/",
      twitter: "",
      website: "",
    },
  },
};

export default function AuthorModal({
  author,
  isOpen,
  onClose,
}: AuthorModalProps) {
  const authorData = authors[author as keyof typeof authors];

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!authorData) return null;

  return (
    <ModalPortal isOpen={isOpen}>
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{
          zIndex: 999999,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          style={{ zIndex: 999998 }}
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div
          className="relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all"
          style={{ zIndex: 999999 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Author content */}
          <div className="p-6 text-center">
            <img
              src={authorData.avatar}
              alt={authorData.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200"
            />
            <h3
              id="modal-title"
              className="text-xl font-bold text-gray-900 mb-2"
            >
              {authorData.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {authorData.bio}
            </p>

            {/* Social links */}
            <div className="flex justify-center gap-3 mb-4">
              {authorData.social.linkedin && (
                <Link
                  href={authorData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors p-2 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`${authorData.name} LinkedIn Profile`}
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              )}
              {authorData.social.twitter && (
                <Link
                  href={authorData.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 transition-colors p-2 bg-blue-50 rounded-lg hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`${authorData.name} Twitter Profile`}
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              )}
              {authorData.social.website && (
                <Link
                  href={authorData.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-700 transition-colors p-2 bg-gray-50 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`${authorData.name} Website`}
                >
                  <Globe className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
