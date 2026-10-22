import { whatsappUrl } from "@/data/site";
import { WhatsAppLink } from "./WhatsAppLink";

export function WhatsAppButton() {
  return (
    <WhatsAppLink
      href={whatsappUrl()}
      label="Chat with us on WhatsApp"
      className="pressable fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-[70] lg:bottom-12 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgb(37_211_102/0.6)]"
    >
      <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36A9.4 9.4 0 0 1 2.64 12C2.64 6.8 6.86 2.6 12.05 2.6a9.4 9.4 0 0 1 9.4 9.41c0 5.19-4.22 9.4-9.4 9.4m8-17.41A11.25 11.25 0 0 0 12.05.75C5.82.75.75 5.82.75 12.05c0 1.99.52 3.93 1.51 5.65L.65 23.25l5.68-1.49a11.3 11.3 0 0 0 5.71 1.46h.01c6.23 0 11.3-5.07 11.3-11.3 0-3.02-1.17-5.86-3.3-8" />
      </svg>
    </WhatsAppLink>
  );
}
