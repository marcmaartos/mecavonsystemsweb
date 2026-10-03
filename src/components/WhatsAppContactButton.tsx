import { WHATSAPP_HREF } from "@/config";
import { ContactButton } from "./ContactButton";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Botón principal de WhatsApp con el mensaje predefinido de contacto. */
export function WhatsAppContactButton({ className = "" }: { className?: string }) {
  return (
    <ContactButton href={WHATSAPP_HREF} icon={<WhatsAppIcon className="h-6 w-6" />} external className={className}>
      Escríbenos por WhatsApp
    </ContactButton>
  );
}
