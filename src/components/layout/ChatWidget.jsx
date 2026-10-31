import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="glass mb-3 w-[min(320px,calc(100vw-2rem))] rounded-3xl p-5 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">Let’s build something great</p>
              <p className="mt-1 text-sm text-slate-400">
                Our studio team is ready to help.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat panel"
              className="rounded-full p-1.5 hover:bg-white/10"
            >
              <X size={16} />
            </button>
          </div>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-violet-500 px-4 py-2.5 text-center text-sm font-semibold"
          >
            Send us a message
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b1229]/95 px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur-xl hover:bg-violet-600"
      >
        <MessageCircle size={16} />
        {open ? "Close" : "Chat with us"}
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </button>
    </div>
  );
}
