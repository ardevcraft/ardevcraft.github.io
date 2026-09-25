"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconFile,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import profileData from "@/data/profile.json";
import type { Profile } from "@/lib/types";
import { localize } from "@/lib/types";
import { usePortfolio } from "./portfolio-provider";

const profile = profileData as Profile;

const socialIcons = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  phone: IconPhone,
  email: IconMail,
  resume: IconFile,
};

export function AvatarMenu() {
  const { locale } = usePortfolio();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    menuRef.current
      ?.querySelector<HTMLAnchorElement>('[role="menuitem"]')
      ?.focus();

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const resume = profile.socials.find((social) => social.type === "resume");
  const socials = profile.socials.filter((social) => social.type !== "resume");

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLAnchorElement>(
        '[role="menuitem"]',
      ) ?? [],
    );
    if (items.length === 0) return;

    event.preventDefault();
    const currentIndex = items.indexOf(
      document.activeElement as HTMLAnchorElement,
    );
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : (currentIndex +
              (event.key === "ArrowDown" ? 1 : -1) +
              items.length) %
            items.length;
    items[nextIndex].focus();
  };

  return (
    <div className="avatar-menu" ref={containerRef}>
      <button
        ref={triggerRef}
        className="site-nav__brand"
        type="button"
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="profile-avatar-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <Image
          src={profile.avatar_icon}
          alt=""
          width={38}
          height={38}
          className="site-nav__avatar"
        />
        <i aria-hidden="true" />
      </button>

      {open && (
        <div
          className="avatar-menu__panel"
          id="profile-avatar-menu"
          role="menu"
          ref={menuRef}
          onKeyDown={handleMenuKeyDown}
        >
          <div className="avatar-menu__identity">
            <strong>{profile.name}</strong>
            <span>{localize(profile.role, locale)}</span>
          </div>
          <div className="avatar-menu__items">
            {socials.map((social) => {
              const Icon = socialIcons[social.type];
              const isExternal = social.url.startsWith("http");
              return (
                <a
                  className="avatar-menu__item"
                  key={social.type}
                  href={social.url}
                  role="menuitem"
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <Icon size={17} />
                  <span>{social.label}</span>
                  {isExternal && (
                    <IconArrowUpRight
                      className="avatar-menu__external"
                      size={15}
                    />
                  )}
                </a>
              );
            })}
            {resume && (
              <a
                className="avatar-menu__item"
                href={resume.url}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <IconFile size={17} />
                <span>{resume.label}</span>
                <IconArrowUpRight className="avatar-menu__external" size={15} />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
