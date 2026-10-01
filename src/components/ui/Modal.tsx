"use client";

import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  useEffect,
  useId,
  useRef,
} from "react";

type ModalProps = Omit<ComponentPropsWithoutRef<"dialog">, "open" | "onClose"> & {
  open: boolean;
  onClose: () => void;
  heading?: string;
};

export function Modal({
  open,
  onClose,
  heading,
  className,
  children,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  // Synchronise la prop contrôlée `open` avec l'état natif du <dialog>.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Escape, bouton de fermeture et backdrop passent tous par dialog.close(),
  // qui déclenche l'événement natif "close" écouté ici — point unique d'appel à onClose().
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) {
      dialogRef.current?.close();
    }
  };

  const classes = [
    "rounded-md border border-border bg-background p-6 text-foreground backdrop:bg-espresso/50",
  ];
  if (className) classes.push(className);

  const resolvedHeadingId = heading ? headingId : undefined;

  return (
    <dialog
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={resolvedHeadingId}
      onClick={handleBackdropClick}
      className={classes.join(" ")}
      {...props}
    >
      <div className="flex items-start justify-between gap-16">
        {heading && (
          <h2 id={resolvedHeadingId} className="text-h4 font-heading text-foreground">
            {heading}
          </h2>
        )}
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => dialogRef.current?.close()}
          className="text-foreground-muted hover:text-foreground focus-visible:outline-primary shrink-0 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="mt-16">{children}</div>
    </dialog>
  );
}
