import { useState, type FormEvent } from "react";
const key = import.meta.env["VITE_WEB3FORMS_ACCESS_KEY"]?.trim();
export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!key) return;
    const form = event.currentTarget; const data = new FormData(form);
    data.append("access_key", key); data.append("subject", "OpeNpaTh website contact"); data.append("from_name", "OpeNpaTh Website");
    setState("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      form.reset(); setState("success");
    } catch { setState("error"); }
  };
  const field = "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary";
  return <section id="contact" className="scroll-mt-20 border-t border-border"><div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2"><div><p className="text-sm font-medium text-primary">GET IN TOUCH</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">Questions about OpeNpaTh?</h2><p className="mt-4 max-w-md text-muted-foreground">Tell us what you are building or ask for help. Please do not send tokens, passwords or connection.md files.</p><p className="mt-6 text-sm text-muted-foreground">For bugs and feature requests, <a href="https://github.com/bipul-unexpected/OpeNpaTh/issues" className="text-primary underline">open a GitHub issue</a>.</p></div><form onSubmit={send} className="space-y-5 rounded-xl border border-border bg-card p-6"><div><label htmlFor="contact-name" className="text-sm font-medium">Name</label><input className={field} id="contact-name" name="name" autoComplete="name" required maxLength={100} /></div><div><label htmlFor="contact-email" className="text-sm font-medium">Email</label><input className={field} id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} /></div><div><label htmlFor="contact-message" className="text-sm font-medium">Message</label><textarea className={field} id="contact-message" name="message" rows={5} required maxLength={5000} /></div><div className="hidden" aria-hidden="true"><label htmlFor="botcheck">Leave this field blank</label><input id="botcheck" type="checkbox" name="botcheck" tabIndex={-1} /></div><button type="submit" disabled={!key || state === "sending"} className="min-h-11 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">{state === "sending" ? "Sending…" : "Send message"}</button><p role="status" aria-live="polite" className="text-sm text-muted-foreground">{!key ? "Contact form is not configured yet. Please use GitHub issues instead." : state === "success" ? "Your message was sent." : state === "error" ? "Message could not be sent. Please try again or open a GitHub issue." : "Your message is sent to the site owner through Web3Forms."}</p></form></div></section>;
}
