import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ChevronDown,
  Search,
  Share2,
  Heart,
  MapPin,
  Sofa,
  Droplet,
  Bath,
  ShieldCheck,
  Building2,
  Drumstick,
  DoorOpen,
  Home as HomeIcon,
  Car,
  Wifi,
  Phone,
  Refrigerator,
  Bed,
  Archive,
  Lock,
  Snowflake,
  PawPrint,
  Camera,
  Users,
  Sparkles,
  ArrowUpDown,
  Flame,
  Grid3x3,
  Flag,
  Utensils,
  Tv,
  Microwave,
  WashingMachine,
  Sun,
  Dumbbell,
  Waves,
  Trees,
  Baby,
  Zap,
  Star,
  ThumbsUp,
  X,
  LayoutDashboard,
  CreditCard,
  Building,
  UserCheck,
  LogOut,
  Copy,
  Mail,
  MessageCircle,
  Send,
  Check,
} from "lucide-react";

import img1 from "@/assets/property-1.jpg";
import img2 from "@/assets/property-2.jpg";
import img3 from "@/assets/property-3.jpg";
import img4 from "@/assets/property-4.jpg";
import img5 from "@/assets/property-5.jpg";
import agent from "@/assets/agent.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: PropertyPage,
});

const BRAND = "oklch(0.68 0.19 40)";
const BRAND_SOFT = "oklch(0.96 0.04 40)";

/* ---------- Reusable dropdown ---------- */
function Dropdown({
  trigger,
  children,
  align = "right",
}: {
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((v) => !v)} className="flex items-center">
        {trigger}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className={`absolute z-50 mt-2 min-w-[200px] rounded-md border border-border bg-background shadow-lg ${
              align === "right" ? "right-0" : "left-0"
            }`}
          >
            {children(() => setOpen(false))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Modal ---------- */
// Track how many modals are currently open so body scroll lock is reference-counted.
// This prevents one modal's cleanup from prematurely restoring scroll while another
// is still open, and guarantees scroll is always restored even after HMR updates.
let __openModalCount = 0;

function Modal({
  open,
  onClose,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  useEffect(() => {
    if (!open) return;

    __openModalCount += 1;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      __openModalCount = Math.max(0, __openModalCount - 1);
      if (__openModalCount === 0) {
        document.body.style.overflow = "";
      }
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-6xl",
  };
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto rounded-lg bg-background p-5 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ---------- Toast ---------- */
function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const show = (m: string) => {
    setMsg(m);
    setTimeout(() => setMsg(null), 2500);
  };
  const node = msg ? (
    <div className="fixed bottom-6 left-1/2 z-[200] -translate-x-1/2 rounded-md bg-foreground px-4 py-2 text-sm text-background shadow-lg flex items-center gap-2">
      <Check className="h-4 w-4" /> {msg}
    </div>
  ) : null;
  return { show, node };
}

/* ---------- Header ---------- */
function Header({ onPostProperty }: { onPostProperty: () => void }) {
  const tenantOptions = ["Search Property", "Saved Searches", "Shortlisted", "Recent Activity"];
  const ownerOptions = ["Post Property", "My Properties", "Responses", "Premium Plans"];
  const profileOptions = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Subscription", icon: CreditCard },
    { label: "My Properties", icon: Building },
    { label: "My Leads", icon: UserCheck },
    { label: "Logout", icon: LogOut },
  ];

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <button onClick={() => window.location.reload()} aria-label="Reload home" className="flex items-center">
          <img src={logo} alt="PropertyFish" className="h-8 sm:h-10 w-auto" />
        </button>
        <nav className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
          <Dropdown
            trigger={
              <span className="hidden sm:flex h-9 items-center gap-2 rounded-md border border-border bg-background px-3">
                <ChevronDown className="h-4 w-4" />
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a4d] text-xs font-semibold text-white">
                  A
                </span>
              </span>
            }
          >
            {(close) => (
              <div className="py-2">
                <div className="border-b border-border px-3 py-2">
                  <div className="text-sm font-semibold">Akash Sharma</div>
                  <div className="text-xs text-muted-foreground">akash@example.com</div>
                </div>
                {profileOptions.map((o) => (
                  <button
                    key={o.label}
                    onClick={close}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <o.icon className="h-4 w-4 text-muted-foreground" /> {o.label}
                  </button>
                ))}
              </div>
            )}
          </Dropdown>

          <button
            onClick={onPostProperty}
            style={{ backgroundColor: BRAND }}
            className="rounded-md px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white"
          >
            Post Property{" "}
            <span className="ml-1 rounded bg-white/20 px-1.5 py-0.5 text-[10px] sm:text-xs">FREE</span>
          </button>

          <Dropdown
            trigger={
              <span className="hidden md:flex items-center gap-1 text-foreground">
                For Tenants <ChevronDown className="h-4 w-4" />
              </span>
            }
          >
            {(close) => (
              <div className="py-2">
                {tenantOptions.map((o) => (
                  <button
                    key={o}
                    onClick={close}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </Dropdown>

          <Dropdown
            trigger={
              <span className="hidden md:flex items-center gap-1 text-foreground">
                For Owners <ChevronDown className="h-4 w-4" />
              </span>
            }
          >
            {(close) => (
              <div className="py-2">
                {ownerOptions.map((o) => (
                  <button
                    key={o}
                    onClick={close}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </Dropdown>
        </nav>
      </div>
    </header>
  );
}

/* ---------- Search bar ---------- */
function SearchBar() {
  const [type, setType] = useState("Buy");
  const [query, setQuery] = useState("");
  const [showSug, setShowSug] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const types = ["Buy", "Rent", "Sell", "Lease"];
  const locations = [
    "Ghaziabad", "Gurgaon", "Greater Noida", "New Delhi", "Noida", "Mumbai",
    "Bangalore", "Bengaluru South", "Hyderabad", "Hinjewadi Pune", "Chennai",
    "Pune", "Kolkata", "Jaipur", "Ahmedabad", "Lucknow", "Chandigarh",
    "Dwarka, New Delhi", "Whitefield, Bangalore", "Andheri, Mumbai",
  ];
  const q = query.trim().toLowerCase();
  const filtered = q
    ? locations.filter((l) => l.toLowerCase().includes(q)).slice(0, 6)
    : locations.slice(0, 6);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (searchRef.current && target && !searchRef.current.contains(target)) {
        setShowSug(false);
        setActiveSuggestion(-1);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      setShowSug(false);
      setActiveSuggestion(-1);
      // eslint-disable-next-line no-console
      console.log("Search:", { type, query });
    } else {
      inputRef.current?.focus();
      setShowSug(true);
    }
  };

  const handleSelectSuggestion = useCallback((location: string) => {
    setQuery(location);
    setShowSug(false);
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  }, []);

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 pt-4 sm:pt-6">
      <div
        ref={searchRef}
        className="relative flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 sm:max-w-[640px]"
      >
        <Dropdown
          align="left"
          trigger={
            <span className="flex h-11 w-full sm:w-28 items-center justify-between rounded-md sm:rounded-r-none border border-border bg-background px-3 text-sm">
              {type} <ChevronDown className="h-4 w-4" />
            </span>
          }
        >
          {(close) => (
            <div className="py-1 w-28">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setType(t);
                    close();
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </Dropdown>
        <div className="relative flex h-11 flex-1 items-center gap-2 border border-border sm:border-l-0 bg-background px-3 rounded-md sm:rounded-none">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSug(true);
              setActiveSuggestion(-1);
            }}
            onFocus={() => setShowSug(true)}
            onClick={() => setShowSug(true)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setShowSug(true);
                setActiveSuggestion((prev) =>
                  filtered.length === 0 ? -1 : (prev + 1) % filtered.length,
                );
                return;
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveSuggestion((prev) =>
                  filtered.length === 0 ? -1 : prev <= 0 ? filtered.length - 1 : prev - 1,
                );
                return;
              }
              if (e.key === "Enter") {
                if (showSug && activeSuggestion >= 0 && filtered[activeSuggestion]) {
                  e.preventDefault();
                  handleSelectSuggestion(filtered[activeSuggestion]);
                  return;
                }
                handleSearch();
              }
              if (e.key === "Escape") {
                setShowSug(false);
                setActiveSuggestion(-1);
              }
            }}
            placeholder="Search city, locality, project..."
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                setQuery("");
                setShowSug(true);
                setActiveSuggestion(-1);
                inputRef.current?.focus();
              }}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        {showSug && filtered.length > 0 ? (
          <div className="absolute left-0 right-0 sm:left-28 top-[calc(100%+4px)] z-50 max-h-72 overflow-y-auto rounded-md border border-border bg-background shadow-lg">
            {!q ? (
              <div className="border-b border-border px-3 py-2 text-xs font-medium text-muted-foreground">
                Popular cities
              </div>
            ) : null}
            {filtered.map((l, i) => (
              <button
                key={l}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectSuggestion(l);
                }}
                onMouseEnter={() => setActiveSuggestion(i)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                  activeSuggestion === i ? "bg-muted" : ""
                }`}
              >
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                <span>{l}</span>
              </button>
            ))}
          </div>
        ) : null}
        <button
          onClick={handleSearch}
          style={{ backgroundColor: BRAND }}
          className="flex h-11 items-center justify-center gap-2 rounded-md sm:rounded-l-none px-5 text-sm font-medium text-white"
        >
          <Search className="h-4 w-4" /> Search
        </button>
      </div>
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="mx-auto mt-4 sm:mt-6 flex max-w-[1280px] flex-col sm:flex-row items-start sm:justify-between gap-1 px-4 sm:px-6">
      <div className="text-xs sm:text-sm text-muted-foreground">
        Home / New Delhi / South West Delhi / Dwarka /{" "}
        <span style={{ color: BRAND }}>MorGuru Ji Builders And Developers 1</span>
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground">Last updated: May 22, 2023</div>
    </div>
  );
}

function TitleBlock({
  onShare,
  onWishlist,
}: {
  onShare: () => void;
  onWishlist: () => void;
}) {
  return (
    <div className="mx-auto mt-2 flex max-w-[1280px] flex-col sm:flex-row items-start sm:justify-between gap-3 px-4 sm:px-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">
          Guru Ji Builders And Developers 1
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Marketed by <span className="underline">GURU JI BUILDERS</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Dwarka Mor, South West Delhi, New Delhi</p>
      </div>
      <div className="text-left sm:text-right">
        <div className="text-xl sm:text-2xl font-semibold">
          ₹15,000<span className="text-base font-normal">/ month</span>
        </div>
        <div
          className="mt-3 flex items-center gap-4 text-sm sm:justify-end"
          style={{ color: BRAND }}
        >
          <button onClick={onShare} className="flex items-center gap-1 hover:underline">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button onClick={onWishlist} className="flex items-center gap-1 hover:underline">
            <Heart className="h-4 w-4" /> Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Gallery ---------- */
/* ---------- Gallery ---------- */
function Gallery({ onShowAll }: { onShowAll: () => void }) {
    return (
        <div className="mx-auto mt-4 grid max-w-[1280px] grid-cols-2 sm:grid-cols-3 gap-2 px-4 sm:px-6">
            <div className="col-span-2 sm:col-span-1 sm:row-span-2 overflow-hidden rounded-lg">
                <img src={img1} alt="Main" className="h-48 sm:h-full w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" onClick={onShowAll} />
            </div>
            {[img2, img3, img4].map((src, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                    <img
                        src={src} alt={`Property ${i + 2}`}
                        className="h-32 sm:h-44 w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={onShowAll}
                    />
                </div>
            ))}
            <div className="relative overflow-hidden rounded-lg">
                <img src={img5} alt="" className="h-32 sm:h-44 w-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300" onClick={onShowAll} />
                <button
                    onClick={onShowAll}
                    className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center gap-1.5 rounded-md bg-black/80 px-3 py-1.5 text-xs font-medium text-white whitespace-nowrap hover:bg-black transition-colors"
                >
                    <Grid3x3 className="h-3.5 w-3.5" /> Show all photos
                </button>
            </div>
        </div>
    );
}

function StatsCards() {
  const stats = [
    { title: "1, 2, 3, 4 BHK Apartments", subtitle: "Configurations" },
    { title: "Ready to Move", subtitle: "Possession Status" },
    { title: "₹4.16 K/sq.ft", subtitle: "Avg. Price" },
    { title: "450.00 sq.ft. - 1300.00 sq.ft.", subtitle: "(Builtup Area) Sizes" },
  ];
  return (
    <div className="mx-auto mt-6 grid max-w-[1280px] grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6">
      {stats.map((s) => (
        <div key={s.title} className="rounded-lg border border-border px-4 py-4 text-center">
          <div className="text-sm font-semibold text-foreground">{s.title}</div>
          <div className="mt-1 text-xs" style={{ color: BRAND }}>
            {s.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
}

type SectionRefs = Record<string, React.RefObject<HTMLDivElement | null>>;

function Tabs({ refs }: { refs: SectionRefs }) {
  const tabs: { label: string; key: keyof typeof refs }[] = [
    { label: "Overview", key: "overview" },
    { label: "Furnishing", key: "furnishing" },
    { label: "Locality", key: "locality" },
    { label: "Amenities", key: "amenities" },
    { label: "Rating and Reviews", key: "reviews" },
  ];
  const [active, setActive] = useState("overview");
  const handleClick = (key: string) => {
    setActive(key);
    refs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="mx-auto mt-8 max-w-[1280px] border-b border-border px-4 sm:px-6 sticky top-0 bg-background z-10">
      <div className="flex gap-6 sm:gap-12 text-sm overflow-x-auto">
        {tabs.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              onClick={() => handleClick(t.key)}
              style={isActive ? { borderColor: BRAND, color: BRAND } : {}}
              className={`pb-3 whitespace-nowrap border-b-2 ${
                isActive ? "font-medium" : "border-transparent text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LocationCard({ onViewMap }: { onViewMap: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-start gap-3">
        <div
          style={{ backgroundColor: BRAND_SOFT }}
          className="flex h-12 w-12 items-center justify-center rounded-full"
        >
          <MapPin className="h-5 w-5" style={{ color: BRAND }} />
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Property Location</div>
          <div className="text-base font-medium">Uttam nagar west, Bindapur, New Delhi</div>
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-border p-3">
        <div className="text-sm text-muted-foreground">Around this property</div>
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex min-w-[180px] items-center gap-2 rounded-md border border-border px-3 py-2"
            >
              <div
                style={{ backgroundColor: BRAND_SOFT }}
                className="flex h-8 w-8 items-center justify-center rounded-full"
              >
                <Utensils className="h-4 w-4" style={{ color: BRAND }} />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">Food and Drinks</div>
                <div className="text-sm font-medium">Prisha Parantha Junction</div>
              </div>
              <div
                style={{ backgroundColor: BRAND_SOFT, color: BRAND }}
                className="rounded px-2 py-0.5 text-xs"
              >
                700m
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-3 text-center">
        <button onClick={onViewMap} className="text-sm hover:underline" style={{ color: BRAND }}>
          View more on maps
        </button>
      </div>
    </div>
  );
}

function OverviewSection() {
  const [expanded, setExpanded] = useState(false);
  const items = [
    { icon: Sofa, label: "Semi Furnished" },
    { icon: DoorOpen, label: "1 Balcony" },
    { icon: Droplet, label: "Corporation Water Supply" },
    { icon: HomeIcon, label: "2 Rooms" },
    { icon: Bath, label: "2 Bathroom" },
    { icon: Car, label: "Free Parking" },
    { icon: ShieldCheck, label: "Gated Society" },
    { icon: Wifi, label: "Wi-Fi" },
    { icon: Building2, label: "Floor 22/25" },
    { icon: Phone, label: "Intercom" },
    { icon: Drumstick, label: "Non-Veg Allowed" },
    { icon: ShieldCheck, label: "Gated Society" },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold">Overview</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3 border-b border-border pb-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-foreground">
            <item.icon className="h-4 w-4 text-muted-foreground" /> {item.label}
          </div>
        ))}
      </div>
      <h3 className="mt-6 text-lg font-semibold">Property Overview</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur. Massa velit faucibus blandit nunc vestibulum. Eu neque
        sit a tellus nisl porttitor. Purus tortor nulla felis nulla eget. Mauris nunc pretium nunc urna
        non quisque in pellentesque facilisis. Mauris arcu tellus morbi mattis massa ultrices orci
        tincidunt vel. Gravida pellentesque ullamcorper aliquet commodo mi etiam.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Accumsan volutpat nullam purus accumsan in posuere pretium libero. Faucibus fusce vestibulum
        turpis sollicitudin eu est. Congue feugiat porta suscipit lorem nunc sagittis
        {!expanded && "..."}
        {expanded && (
          <>
            {" "}
            tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae. Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla
            quis lorem ut libero malesuada feugiat. Curabitur arcu erat, accumsan id imperdiet et,
            porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. Mauris blandit
            aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.
          </>
        )}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 font-medium"
          style={{ color: BRAND }}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
}

function FurnishingSection() {
  const items = [
    { icon: Flame, label: "Geyser" },
    { icon: Archive, label: "Cupboard" },
    { icon: Refrigerator, label: "1 Fridge" },
    { icon: Bed, label: "2 Beds" },
    { icon: Tv, label: "Smart TV" },
    { icon: Microwave, label: "Microwave" },
    { icon: WashingMachine, label: "Washing Machine" },
    { icon: Sofa, label: "Sofa Set" },
    { icon: Utensils, label: "Modular Kitchen" },
    { icon: Sun, label: "Curtains" },
  ];
  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-xl font-semibold">Furnishing</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <item.icon className="h-4 w-4 text-muted-foreground" /> {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function AmenitiesSection() {
  const items = [
    { icon: Lock, label: "Lock on every door" },
    { icon: Users, label: "Club House" },
    { icon: Car, label: "Free Parking" },
    { icon: Sparkles, label: "House Keeping" },
    { icon: Snowflake, label: "2 Air Conditioner" },
    { icon: ArrowUpDown, label: "Lift" },
    { icon: PawPrint, label: "Pets Allowed" },
    { icon: Flame, label: "Gas Pipeline" },
    { icon: Camera, label: "Security Camera" },
    { icon: Dumbbell, label: "Gymnasium" },
    { icon: Waves, label: "Swimming Pool" },
    { icon: Trees, label: "Garden / Park" },
    { icon: Baby, label: "Kids Play Area" },
    { icon: Zap, label: "Power Backup" },
    { icon: ShieldCheck, label: "24x7 Security" },
  ];
  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-xl font-semibold">Amenities</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <item.icon className="h-4 w-4 text-muted-foreground" /> {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewsSection() {
  const breakdown = [
    { label: "Cleanliness", value: 4.6 },
    { label: "Location", value: 4.8 },
    { label: "Amenities", value: 4.3 },
    { label: "Value for money", value: 4.4 },
  ];
  const reviews = [
    {
      name: "Ananya Verma",
      time: "2 weeks ago",
      rating: 5,
      text: "Loved the property! Clean, well-maintained and the location is super convenient. The builder was responsive throughout the process.",
    },
    {
      name: "Rahul Mehta",
      time: "1 month ago",
      rating: 4,
      text: "Spacious rooms and great amenities. Parking is a slight issue during peak hours but overall a pleasant living experience.",
    },
    {
      name: "Priya Singh",
      time: "3 months ago",
      rating: 5,
      text: "Excellent society with friendly neighbors. The clubhouse and gym are top-notch. Highly recommended for families.",
    },
    {
      name: "Vikram Patel",
      time: "4 months ago",
      rating: 4,
      text: "Good connectivity to metro and markets. Society maintenance is well organized and staff is polite.",
    },
    {
      name: "Sneha Kapoor",
      time: "5 months ago",
      rating: 5,
      text: "Beautiful landscaping and a peaceful environment. The kids' play area is a huge plus for our family.",
    },
    {
      name: "Arjun Nair",
      time: "6 months ago",
      rating: 4,
      text: "Value for money property in this locality. Power backup and water supply have been consistent.",
    },
    {
      name: "Meera Iyer",
      time: "8 months ago",
      rating: 5,
      text: "The builder delivered on time with quality construction. Very happy with our purchase decision.",
    },
  ];
  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);
  return (
    <div className="mt-8 border-t border-border pt-6">
      <h2 className="text-xl font-semibold">Rating and Reviews</h2>
      <div className="mt-4 flex flex-col sm:flex-row gap-6 rounded-lg border border-border p-4">
        <div className="flex flex-col items-center justify-center sm:w-40">
          <div className="text-4xl font-bold" style={{ color: BRAND }}>
            4.5
          </div>
          <div className="mt-1 flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-4 w-4"
                style={{ color: BRAND, fill: i <= 4 ? BRAND : "transparent" }}
              />
            ))}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">Based on 128 reviews</div>
        </div>
        <div className="flex-1 space-y-2">
          {breakdown.map((b) => (
            <div key={b.label} className="flex items-center gap-3 text-sm">
              <div className="w-32 text-muted-foreground">{b.label}</div>
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(b.value / 5) * 100}%`, backgroundColor: BRAND }}
                />
              </div>
              <div className="w-8 text-right font-medium">{b.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {visibleReviews.map((r, i) => (
          <div key={i} className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.time}</div>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="h-3 w-3"
                    style={{ color: BRAND, fill: s <= r.rating ? BRAND : "transparent" }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <button className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" /> Helpful
              </button>
              <button>Reply</button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowAll((v) => !v)}
        className="mt-4 w-full rounded-md border py-2 text-sm font-medium"
        style={{ borderColor: BRAND, color: BRAND }}
      >
        {showAll ? "Show less" : `View all reviews (${reviews.length})`}
      </button>
    </div>
  );
}

function ContactCard({ onContact }: { onContact: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-background p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground line-through">₹16,400</span>{" "}
          <span className="text-2xl font-semibold">₹15,636</span>
        </div>
        <span className="text-sm" style={{ color: BRAND }}>
          Negotiable
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-y border-border py-3">
        <div>
          <div className="text-xs text-muted-foreground">SECURITY</div>
          <div className="text-sm font-semibold">
            ₹15,636 <span className="text-xs font-normal text-muted-foreground">one month</span>
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">BROKERAGE</div>
          <div className="text-sm font-semibold">
            ₹7,500 <span className="text-xs font-normal text-muted-foreground">15 days</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm font-medium">Contact Seller</div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={agent} alt="agent" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <div className="text-sm font-semibold">Rishabh Jain</div>
            <div className="text-xs text-muted-foreground">+91 9039....</div>
          </div>
        </div>
        <span style={{ backgroundColor: BRAND }} className="rounded px-2 py-1 text-xs text-white">
          Expert
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        <span className="text-emerald-600">● Authentic Listings</span>
        <span className="text-emerald-600">● Trusted Agent</span>
        <span className="text-emerald-600">● Verified</span>
      </div>

      <div className="mt-4 text-sm text-muted-foreground">Please share your contact</div>
      <label className="mt-3 block text-xs text-foreground">Name</label>
      <input
        defaultValue="Niranjan Sharma"
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <label className="mt-3 block text-xs text-foreground">Phone Number</label>
      <div className="mt-1 flex gap-2">
        <div className="flex w-20 items-center justify-center gap-1 rounded-md border border-border text-sm">
          +91 <ChevronDown className="h-3 w-3" />
        </div>
        <input
          placeholder="Enter phone number"
          className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <label className="mt-3 block text-xs text-foreground">Email</label>
      <input
        placeholder="Enter email"
        className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <label className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
        <input type="checkbox" className="mt-0.5" />
        <span>I agree to be contacted by property fish via whatsapp, sms etc.</span>
      </label>
      <button
        onClick={onContact}
        style={{ backgroundColor: BRAND }}
        className="mt-4 w-full rounded-md py-3 text-sm font-medium text-white hover:opacity-90"
      >
        Contact Seller
      </button>
    </div>
  );
}

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx((i) => (i + 1) % photos.length);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos.length]);
  return (
    <div className="mt-4">
      <div className="relative overflow-hidden rounded-lg bg-black">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {photos.map((p, i) => (
            <img
              key={i}
              src={p}
              alt={`Photo ${i + 1}`}
              className="h-[60vh] w-full flex-shrink-0 object-contain"
            />
          ))}
        </div>
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {idx + 1} / {photos.length}
        </div>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {photos.map((p, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="shrink-0"
            style={{
              outline: i === idx ? `2px solid ${BRAND}` : "none",
              outlineOffset: 2,
              borderRadius: 6,
            }}
          >
            <img
              src={p}
              alt={`Thumb ${i + 1}`}
              className="h-16 w-24 rounded-md object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function PostPropertyFlow({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) {
  const steps = ["Property type", "Location", "Details", "Submit"];
  const STORAGE_KEY = "postPropertyFlow:v1";

  type PersistedState = {
    step: number;
    propertyType: string;
    city: string;
    locality: string;
    price: string;
    title: string;
  };

  const defaults: PersistedState = {
    step: 0,
    propertyType: "Apartment",
    city: "New Delhi",
    locality: "Dwarka Mor",
    price: "15000",
    title: "2 BHK apartment for rent",
  };

  const loadPersisted = (): PersistedState => {
    if (typeof window === "undefined") return defaults;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      return { ...defaults, ...parsed };
    } catch {
      return defaults;
    }
  };

  // Lazy initializers — only read storage once per mount, not on every render
  const [step, setStep] = useState(() => loadPersisted().step);
  const [propertyType, setPropertyType] = useState(() => loadPersisted().propertyType);
  const [city, setCity] = useState(() => loadPersisted().city);
  const [locality, setLocality] = useState(() => loadPersisted().locality);
  const [price, setPrice] = useState(() => loadPersisted().price);
  const [title, setTitle] = useState(() => loadPersisted().title);

  // Persist progress whenever inputs/step change
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const data: PersistedState = { step, propertyType, city, locality, price, title };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [step, propertyType, city, locality, price, title]);

  // When reopening, rehydrate from storage in case another tab updated it
  useEffect(() => {
    if (!open) return;
    const fresh = loadPersisted();
    setStep(fresh.step);
    setPropertyType(fresh.propertyType);
    setCity(fresh.city);
    setLocality(fresh.locality);
    setPrice(fresh.price);
    setTitle(fresh.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSubmitFlow = () => {
    if (typeof window !== "undefined") {
      try { window.localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    }
    setStep(0);
    setPropertyType(defaults.propertyType);
    setCity(defaults.city);
    setLocality(defaults.locality);
    setPrice(defaults.price);
    setTitle(defaults.title);
    onSubmit();
  };

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="pr-8">
        <h3 className="text-lg font-semibold">Post Property</h3>
        <p className="mt-1 text-sm text-muted-foreground">Complete the steps to publish your listing.</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
        {steps.map((label, index) => {
          const active = index === step;
          const completed = index < step;

          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium"
                style={{
                  borderColor: completed || active ? BRAND : undefined,
                  backgroundColor: completed || active ? BRAND_SOFT : undefined,
                  color: completed || active ? BRAND : undefined,
                }}
              >
                {index + 1}
              </div>
              <span className={`text-sm ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-border p-4 sm:p-5">
        {step === 0 ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Property type</label>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Apartment", "Villa", "Plot", "Commercial"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPropertyType(option)}
                    className="rounded-md border px-3 py-2 text-sm transition-colors"
                    style={
                      propertyType === option
                        ? { borderColor: BRAND, backgroundColor: BRAND_SOFT, color: BRAND }
                        : undefined
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Locality</label>
              <input
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Listing title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Monthly price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
                className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-3 text-sm">
            <div className="rounded-md bg-muted px-4 py-3">
              <div className="font-medium text-foreground">Review your listing</div>
              <div className="mt-2 text-muted-foreground">Type: {propertyType}</div>
              <div className="text-muted-foreground">Location: {locality}, {city}</div>
              <div className="text-muted-foreground">Title: {title}</div>
              <div className="text-muted-foreground">Price: ₹{price || "0"}/month</div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(current - 1, 0))}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground disabled:opacity-50"
          disabled={step === 0}
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}
            style={{ backgroundColor: BRAND }}
            className="rounded-md px-5 py-2 text-sm font-medium text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmitFlow}
            style={{ backgroundColor: BRAND }}
            className="rounded-md px-5 py-2 text-sm font-medium text-white"
          >
            Submit Property
          </button>
        )}
      </div>
    </Modal>
  );
}

function PropertyPage() {
  const refs: SectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    furnishing: useRef<HTMLDivElement>(null),
    locality: useRef<HTMLDivElement>(null),
    amenities: useRef<HTMLDivElement>(null),
    reviews: useRef<HTMLDivElement>(null),
  };

  const [shareOpen, setShareOpen] = useState(false);
  const [photosOpen, setPhotosOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [postPropertyOpen, setPostPropertyOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { show, node } = useToast();

  const allPhotos = [img1, img2, img3, img4, img5, img1, img2, img3];
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background">
      <Header onPostProperty={() => setPostPropertyOpen(true)} />
      <SearchBar />
      <Breadcrumb />
      <TitleBlock
        onShare={() => setShareOpen(true)}
        onWishlist={() => {
          setWishlisted((v) => !v);
          show(wishlisted ? "Removed from wishlist" : "Added to wishlist");
        }}
      />
      <Gallery onShowAll={() => setPhotosOpen(true)} />
      <StatsCards />
      <Tabs refs={refs} />

      <div className="mx-auto mt-6 grid max-w-[1280px] grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 pb-12">
        <div className="lg:col-span-2 space-y-6">
          <div ref={refs.locality} className="scroll-mt-20">
            <LocationCard onViewMap={() => setMapOpen(true)} />
          </div>
          <div ref={refs.overview} className="scroll-mt-20">
            <OverviewSection />
          </div>
          <div ref={refs.furnishing} className="scroll-mt-20">
            <FurnishingSection />
          </div>
          <div ref={refs.amenities} className="scroll-mt-20">
            <AmenitiesSection />
          </div>
          <div ref={refs.reviews} className="scroll-mt-20">
            <ReviewsSection />
          </div>
        </div>
        <div className="lg:col-span-1">
          <ContactCard
            onContact={() => show("Contact request sent to seller!")}
          />
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Flag className="h-4 w-4" /> Report this listing
          </div>
        </div>
      </div>

      {/* Share modal */}
      <Modal open={shareOpen} onClose={() => setShareOpen(false)} size="sm">
        <h3 className="text-lg font-semibold">Share this property</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Share this listing with friends and family
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {[
            { icon: Send, label: "Facebook" },
            { icon: MessageCircle, label: "Twitter" },
            { icon: Mail, label: "Email" },
            { icon: Phone, label: "WhatsApp" },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => {
                show(`Shared via ${s.label}`);
                setShareOpen(false);
              }}
              className="flex flex-col items-center gap-1 rounded-md border border-border p-3 hover:bg-muted"
            >
              <s.icon className="h-5 w-5" style={{ color: BRAND }} />
              <span className="text-xs">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-md border border-border p-2">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent text-xs outline-none"
          />
          <button
            onClick={() => {
              navigator.clipboard?.writeText(shareUrl);
              show("Link copied!");
            }}
            style={{ backgroundColor: BRAND }}
            className="flex items-center gap-1 rounded px-3 py-1.5 text-xs text-white"
          >
            <Copy className="h-3 w-3" /> Copy
          </button>
        </div>
      </Modal>

      <PostPropertyFlow
        open={postPropertyOpen}
        onClose={() => setPostPropertyOpen(false)}
        onSubmit={() => {
          setPostPropertyOpen(false);
          show("Property submitted successfully!");
        }}
      />

      {/* Photos modal */}
      <Modal open={photosOpen} onClose={() => setPhotosOpen(false)} size="xl">
        <h3 className="text-lg font-semibold">All Photos ({allPhotos.length})</h3>
        <PhotoCarousel photos={allPhotos} />
      </Modal>

      {/* Map modal */}
      <Modal open={mapOpen} onClose={() => setMapOpen(false)} size="lg">
        <h3 className="text-lg font-semibold">Property Location</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Uttam nagar west, Bindapur, New Delhi
        </p>
        <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border border-border">
          <iframe
            title="Property location"
            src="https://www.google.com/maps?q=Uttam+Nagar+West,+New+Delhi&output=embed"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
        <a
          href="https://www.google.com/maps?q=Uttam+Nagar+West,+New+Delhi"
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: BRAND }}
          className="mt-4 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
        >
          <MapPin className="h-4 w-4" /> Open in Google Maps
        </a>
      </Modal>

      {node}
    </div>
  );
}
