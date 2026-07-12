"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mainNav } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { useAuth } from "@/context/AuthContext";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeaderMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    setIsOpen(false);
    router.push("/");
  }

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const elements = Array.from(
      drawer.querySelectorAll<HTMLElement>(FOCUSABLE),
    );
    const first = elements[0];
    const last = elements[elements.length - 1];

    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-sm text-text-secondary hover:bg-surface-alt hover:text-brand-navy transition-colors"
        aria-label="Abrir menú"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
          aria-hidden
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
          <div
            ref={drawerRef}
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal
            aria-label="Menú de navegación"
            className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-surface-card shadow-overlay"
          >
            <div className="flex items-center justify-between border-b border-border-soft px-5 py-4">
              <span className="font-heading text-h4 font-semibold text-brand-navy">
                {siteConfig.shortName}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-sm text-text-muted hover:text-text-primary"
                aria-label="Cerrar menú"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <nav
              className="flex-1 overflow-y-auto px-3 py-4"
              aria-label="Navegación móvil"
            >
              <ul className="space-y-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-sm px-3 py-3 text-body-md text-text-primary hover:bg-surface-alt transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {user && (
                <div className="mt-4 border-t border-border-soft pt-4 space-y-1">
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin/avisos"
                      className="block rounded-sm px-3 py-3 text-body-md text-brand-blue hover:bg-surface-alt transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Panel admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded-sm px-3 py-3 text-left text-body-md text-text-muted hover:bg-surface-alt transition-colors"
                  >
                    Salir
                  </button>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
