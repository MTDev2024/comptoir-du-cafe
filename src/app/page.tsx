import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-5 py-16 text-center">
      <p className="text-caption text-foreground-muted tracking-widest uppercase">
        Depuis 1896
      </p>
      <h1 className="text-h1 font-heading text-foreground">{siteConfig.name}</h1>
      <p className="text-body text-foreground-muted max-w-prose">
        {siteConfig.description}
      </p>
    </main>
  );
}
