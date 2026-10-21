"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Tractor,
  LayoutDashboard,
  Layers,
  ShoppingBag,
  Inbox,
  LogOut,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, just render children without dashboard frame
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Categories", href: "/admin/categories", icon: Layers },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#11341c] text-stone-200 shrink-0 flex flex-col justify-between border-r border-[#174826]">
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-[#1b4d2e]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-stone-200">
                <Image
                  src="/logo-icon.png"
                  alt="Prakash Agri Tools"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-black text-white text-base font-serif tracking-tight leading-none">
                  PRAKASH <span className="text-[#f58220]">AGRI</span>
                </span>
                <span className="block text-[10px] text-emerald-300 uppercase tracking-wider font-semibold mt-1">
                  Catalogue Admin
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#1f6133] text-white font-bold shadow-xs"
                      : "text-stone-300 hover:bg-[#174826]/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#d4b672]" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-300" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#1b4d2e] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-stone-300 hover:text-white hover:bg-[#174826]/70 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#d4b672]" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-stone-200/90 px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 font-medium">Showroom Location:</span>
            <span className="text-xs font-bold text-stone-800 ml-1.5">
              LB Nagar, Hyderabad
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#11341c] text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live DB Synced
            </span>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
