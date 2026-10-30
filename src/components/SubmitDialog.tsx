"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";

const inputClass = "w-full rounded-lg border border-line bg-page px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent";

export default function SubmitDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="submit-title"
      className="fixed inset-0 m-auto h-fit w-[calc(100%-2rem)] max-w-md rounded-2xl border border-line bg-card p-6 text-fg shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="mb-1 flex items-center justify-between">
        <h2 id="submit-title" className="text-lg font-bold">{t.submitTitle}</h2>
        <button type="button" aria-label={t.close} onClick={onClose} className="grid place-items-center w-8 h-8 rounded-full text-muted hover:bg-fg/5 hover:text-fg">
          <X className="w-4 h-4" />
        </button>
      </div>
      <p className="mb-5 text-sm text-muted">{t.submitNote}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          toast.success(t.submitDone);
          onClose();
        }}
        className="space-y-3"
      >
        <input name="effect" aria-label={t.submitName} placeholder={t.submitName} required className={inputClass} />
        <input name="link" aria-label={t.submitLink} placeholder={t.submitLink} type="url" className={inputClass} />
        <input name="author" aria-label={t.submitAuthor} placeholder={t.submitAuthor} className={inputClass} />
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-line py-2.5 text-sm hover:bg-fg/5">
            {t.cancel}
          </button>
          <button type="submit" className="flex-1 rounded-lg bg-fg py-2.5 text-sm font-medium text-page hover:opacity-90">
            {t.send}
          </button>
        </div>
      </form>
    </dialog>
  );
}
