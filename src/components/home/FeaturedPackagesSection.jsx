import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { packageApi } from "../../services/api.js";
import { packages as localPackages } from "../../data/packages.js";
import PackageCard from "../packages/PackageCard.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";

export default function FeaturedPackagesSection() {
  const [items, setItems] = useState(localPackages.slice(0, 4));
  useEffect(() => {
    packageApi
      .list()
      .then((data) => setItems(data.slice(0, 4)))
      .catch(() => setItems(localPackages.slice(0, 4)));
  }, []);
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Top packages"
            title="Featured website packages"
          />
          <Link
            to="/shop"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
