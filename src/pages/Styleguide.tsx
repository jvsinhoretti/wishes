import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

export default function Styleguide() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-surface-page text-text-primary p-6 md:p-12 font-body transition-colors">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header & Toggle */}
        <header className="flex items-center justify-between border-b border-border-default pb-6">
          <div>
            <h1 className="font-display text-3xl font-bold">Design System</h1>
            <p className="text-text-secondary mt-2">Wishes App Styleguide</p>
          </div>
          <Button onClick={() => setIsDark(!isDark)} variant="secondary" className="rounded-full">
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </header>

        {/* Cores */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-medium border-b border-border-subtle pb-2">Paleta de Cores (Semantic)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <ColorSwatch name="Page" className="bg-surface-page border border-border-default text-text-primary" />
            <ColorSwatch name="Card" className="bg-surface-card border border-border-subtle text-text-primary" />
            <ColorSwatch name="Elevated" className="bg-surface-elevated text-text-primary" />
            <ColorSwatch name="Accent" className="bg-action-primary text-action-primary-text" />
            <ColorSwatch name="Success" className="bg-status-success text-text-on-accent" />
            <ColorSwatch name="Error" className="bg-status-error text-white" />
          </div>
          <h3 className="font-display text-xl font-medium mt-6">Textos</h3>
          <div className="flex flex-col gap-2">
            <p className="text-text-primary text-xl">Text Primary</p>
            <p className="text-text-secondary text-xl">Text Secondary</p>
            <p className="text-text-muted text-xl">Text Muted</p>
            <p className="text-text-disabled text-xl">Text Disabled</p>
            <p className="text-text-accent text-xl">Text Accent</p>
          </div>
        </section>

        {/* Tipografia */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-medium border-b border-border-subtle pb-2">Tipografia</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-display text-text-secondary mb-2">Display (Switzer)</h3>
                <p className="font-display text-3xl font-bold">Heading 1 - Bold 32px</p>
                <p className="font-display text-2xl font-medium">Heading 2 - Medium 24px</p>
                <p className="font-display text-xl font-medium">Heading 3 - Medium 20px</p>
              </div>
              <div>
                <h3 className="text-text-secondary mb-2">Body (Manrope)</h3>
                <p className="font-body text-lg font-semibold">Body Large - Semibold 18px</p>
                <p className="font-body text-base font-normal">Body Normal - Regular 16px</p>
                <p className="font-body text-sm font-normal">Body Small - Regular 14px</p>
                <p className="font-body text-xs font-normal">Body XS - Regular 12px</p>
              </div>
            </div>
          </div>
        </section>

        {/* Espaçamentos */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-medium border-b border-border-subtle pb-2">Espaçamentos</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <SpaceBlock size="space-1 (4px)" className="w-1 h-1" />
            <SpaceBlock size="space-2 (8px)" className="w-2 h-2" />
            <SpaceBlock size="space-3 (12px)" className="w-3 h-3" />
            <SpaceBlock size="space-4 (16px)" className="w-4 h-4" />
            <SpaceBlock size="space-5 (20px)" className="w-5 h-5" />
            <SpaceBlock size="space-6 (24px)" className="w-6 h-6" />
            <SpaceBlock size="space-8 (32px)" className="w-8 h-8" />
            <SpaceBlock size="space-12 (48px)" className="w-12 h-12" />
          </div>
        </section>

        {/* Bordas e Sombras */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-medium border-b border-border-subtle pb-2">Bordas e Sombras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-surface-card p-6 border border-border-subtle rounded-sm shadow-sm">
              <p>radius-sm & shadow-sm</p>
            </div>
            <div className="bg-surface-card p-6 border border-border-default rounded-md shadow-md">
              <p>radius-md & shadow-md</p>
            </div>
            <div className="bg-surface-elevated p-6 border border-border-default rounded-lg shadow-lg">
              <p>radius-lg & shadow-lg</p>
            </div>
            <div className="bg-surface-elevated p-6 border border-border-focus rounded-xl shadow-accent">
              <p>radius-xl & shadow-accent</p>
            </div>
          </div>
        </section>

        {/* Componentes */}
        <section className="space-y-12">
          <h2 className="font-display text-2xl font-medium border-b border-border-subtle pb-2">Componentes</h2>
          
          {/* Botões */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">1. Botões</h3>
            <div className="flex flex-wrap gap-6 items-center">
              <Button className="rounded-full px-6 shadow-accent">Primary</Button>
              <Button variant="secondary" className="rounded-full px-6 border border-border-default bg-transparent text-text-primary hover:bg-surface-card hover:text-text-primary">Secondary</Button>
              <Button variant="destructive" className="rounded-full px-6 border border-border-default bg-transparent text-status-error hover:bg-surface-card">Destructive</Button>
              <Button disabled className="rounded-full px-6 opacity-50 bg-surface-card text-text-muted border border-border-subtle hover:bg-surface-card">Disabled</Button>
              <Button disabled className="rounded-full px-6 opacity-50"><div className="animate-spin w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full" /> Loading</Button>
              <Button size="icon" className="rounded-full w-11 h-11 bg-surface-card border border-border-default text-text-secondary hover:text-text-accent shadow-sm"><Search size={20} /></Button>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">2. Inputs</h3>
            <div className="max-w-md space-y-4">
              <Input placeholder="Input padrão..." className="rounded-full py-4 border-border-default bg-surface-card text-text-primary placeholder:text-text-muted focus-visible:border-border-focus" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <Input placeholder="Input com ícone..." className="rounded-full pl-12 py-4 border-border-default bg-surface-card text-text-primary placeholder:text-text-muted focus-visible:border-border-focus" />
              </div>
              <Input disabled placeholder="Input disabled" className="rounded-full py-4 opacity-50" />
            </div>
          </div>

          {/* Badges/Tags */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">3. Tags e Badges</h3>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-surface-elevated border border-border-default text-text-secondary px-3 py-1 font-normal">Tag de Etiqueta</Badge>
              <Badge className="bg-status-success-muted text-status-success px-3 py-1 font-normal border-none hover:bg-status-success-muted">Badge de Status</Badge>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">4. Cards</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-surface-card border-border-subtle rounded-2xl shadow-sm hover:border-border-default transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-16 h-16 bg-surface-elevated rounded-xl shrink-0" />
                  <div>
                    <CardTitle className="text-base font-medium">Card Padrão (Produto)</CardTitle>
                    <p className="text-text-muted text-sm mt-1">Status: OK</p>
                  </div>
                </CardHeader>
                <Separator className="bg-border-subtle" />
                <CardContent className="pt-6 flex justify-between items-center">
                  <div className="font-semibold text-lg">R$ 150,00</div>
                  <Button variant="secondary" className="rounded-full h-8 px-4 text-xs bg-transparent border-border-default text-text-primary">Ver</Button>
                </CardContent>
              </Card>

              <Card className="bg-surface-card border-border-subtle rounded-[32px] p-8 space-y-2">
                <p className="text-text-secondary text-sm">Insight Secundário</p>
                <p className="font-display text-3xl font-bold">1.432</p>
                <Separator className="bg-border-subtle my-2" />
                <p className="text-text-muted text-sm mt-4">Crescimento de 12% desde ontem.</p>
              </Card>
            </div>
          </div>

          {/* Avatar & Extras */}
          <div className="space-y-4">
            <h3 className="font-display text-xl">5. Avatar</h3>
            <div className="flex gap-4 items-center">
              <Avatar className="w-24 h-24 border-2 border-status-success p-1 bg-surface-elevated">
                <AvatarFallback className="bg-surface-elevated text-text-secondary">A</AvatarFallback>
              </Avatar>
              <Avatar className="w-16 h-16 border border-border-default bg-surface-elevated">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 rounded-lg ${className} flex items-center justify-center font-medium text-sm shadow-sm`}>
        {name}
      </div>
      <p className="text-xs text-text-secondary text-center font-mono">{name}</p>
    </div>
  );
}

function SpaceBlock({ size, className }: { size: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`bg-action-primary rounded-sm opacity-80 ${className}`} />
      <span className="text-xs text-text-muted">{size}</span>
    </div>
  );
}
