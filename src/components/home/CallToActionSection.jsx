import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <section className="px-5 pb-24 pt-5 sm:px-8">
      <div className="glass-strong mx-auto max-w-7xl rounded-3xl border border-blue-400/20 p-10 text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Ready to build something extraordinary?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-slate-400">
          Chat with our team or grab a package and we'll start building today.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link className="btn-primary" data-testid="cta-shop" to="/shop">
            Browse packages{" "}
            <ArrowRight className="ml-2 h-4 w-4 text-blue-400" />
          </Link>
          <Link className="btn-ghost" data-testid="cta-contact" to="/contact">
            Talk to us <MessageCircle className="ml-2 h-4 w-4 text-blue-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
