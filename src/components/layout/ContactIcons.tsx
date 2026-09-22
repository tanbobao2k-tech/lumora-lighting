import { getSiteInfo } from "@/lib/content-store";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-5 w-5",
};

function PhoneIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M4 5c0 8.284 6.716 15 15 15l2-4-5-3-2 2a11 11 0 0 1-5-5l2-2-3-5-4 2Z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg {...ICON_PROPS} aria-hidden>
      <path d="M12 3C6.9 3 3 6.6 3 11.4c0 2.6 1.2 4.9 3.2 6.5V21l3-1.6c1 .3 2 .4 3 .4 5.1 0 9-3.6 9-8.4C21 6.6 17.1 3 12 3Z" />
      <path d="m7.5 12.8 3-3.2 2.3 2.3 3.2-3.2-3.3 4.3-2.3-2.2-3 3.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ZaloBadge() {
  return (
    <span className="flex h-5 w-5 items-center justify-center text-[10px] font-bold">Zalo</span>
  );
}

export function ContactIcons() {
  const SITE_INFO = getSiteInfo();

  const CONTACT_LINKS = [
    {
      label: "Gọi điện",
      href: `tel:${SITE_INFO.phones[0]}`,
      icon: <PhoneIcon />,
      bg: "bg-accent",
    },
    {
      label: "Nhắn Zalo",
      href: `https://zalo.me/${SITE_INFO.phones[0]}`,
      icon: <ZaloBadge />,
      bg: "bg-[#0068ff]",
    },
    {
      label: "Nhắn Messenger",
      href: SITE_INFO.messengerLink,
      icon: <MessengerIcon />,
      bg: "bg-[#0084ff]",
    },
  ];

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col gap-3 sm:bottom-8 sm:right-8">
      {CONTACT_LINKS.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith("tel:") ? undefined : "_blank"}
          rel={item.href.startsWith("tel:") ? undefined : "noreferrer"}
          aria-label={item.label}
          title={item.label}
          className={`flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 ${item.bg}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
