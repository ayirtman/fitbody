import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <EmptyState
        title="404 - This rep doesn't exist"
        body="The page you're after moved, or never made it into the program. The muscle map will get you back on track."
        cta={{ href: "/muscles", label: "Open the muscle map" }}
      />
      <p className="mt-6 text-center text-sm text-muted">
        or head{" "}
        <Link href="/" className="text-gold hover:text-gold-light">
          home
        </Link>
      </p>
    </div>
  );
}
