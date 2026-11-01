import type { SVGProps } from "react";

export function Instagram(props: SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 17, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      {...rest}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function Facebook(props: SVGProps<SVGSVGElement> & { size?: number }) {
  const { size = 17, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...rest}
    >
      <path d="M14 21v-8h2.8l.4-3.3H14V7.6c0-1 .3-1.6 1.7-1.6h1.7V3.1c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5v2.2H8V13h2.5v8H14Z" />
    </svg>
  );
}
export function ApplePay() {
  return (
    <>
      <svg
        width="12"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.1 12.3c0-2.3 1.9-3.5 2-3.6-1.1-1.6-2.7-1.8-3.3-1.8-1.4-.2-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.7-1.5 0-2.9.9-3.7 2.2-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.2 2.8 2.2 1.1-.1 1.6-.7 3-.7s1.9.7 3.1.7 2-1.1 2.7-2.1c.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.7-1-2.7-3.3ZM14.8 5.4c.6-.8 1.1-1.8 1-2.9-1 .1-2.1.7-2.8 1.5-.6.7-1.1 1.8-1 2.8 1.1.1 2.1-.6 2.8-1.4Z" />
      </svg>
      Pay
    </>
  );
}
