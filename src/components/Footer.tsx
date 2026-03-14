export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} IronMind. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-red-500">❤️</span> | Author -{" "}
            <span className="font-semibold text-foreground">Fayazahmad_Siddik</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
