# Wishes — Design System
> Fonte da verdade para geração de código e handoff de design.
> Versão 1.0 · Dark Mode first · Switzer + Manrope

---

## 1. Cores

### 1.1 Paleta Base (Green Scale)

| Token | Hex | Descrição |
|---|---|---|
| `green-950` | `#051A0A` | Verde quase preto |
| `green-900` | `#071F0D` | Verde profundo |
| `green-850` | `#080A0B` | Background principal da UI |
| `green-800` | `#0A2410` | Surface nível 1 |
| `green-750` | `#0D2D14` | Surface nível 2 |
| `green-700` | `#112E17` | Surface elevada |
| `green-600` | `#121514` | Card background |
| `green-550` | `#181C1B` | Card elevado / hover state |
| `green-500` | `#1A1D1C` | Borda de card |
| `green-450` | `#1A1E1D` | Divider interno |
| `green-400` | `#232826` | Borda default |
| `green-300` | `#2E7A38` | Borda forte / focus |
| `green-200` | `#5E6361` | Texto terciário / placeholder |
| `green-100` | `#8E9391` | Texto secundário |
| `green-50`  | `#C8F5D5` | Mint / highlight suave |
| `green-accent` | `#03892F` | Accent primário |
| `green-accent-light` | `#1ED760` | Accent vibrante (UI atual) |
| `green-accent-hover` | `#15E36A` | Hover do accent vibrante |
| `green-accent-muted` | `rgba(30,215,96,0.10)` | Background de badge/tag |

### 1.2 Paleta de Cinza (Neutral Scale)

| Token | Hex | Descrição |
|---|---|---|
| `gray-950` | `#080A0B` | Quase preto (espelha bg principal) |
| `gray-900` | `#111314` | Alternativa de surface escura |
| `gray-800` | `#1A1D1C` | Bordas em contexto neutro |
| `gray-700` | `#232826` | Bordas default neutras |
| `gray-600` | `#3D4150` | Texto desabilitado |
| `gray-500` | `#5E6361` | Placeholder / metadata apagada |
| `gray-400` | `#8E9391` | Texto secundário neutro |
| `gray-300` | `#B8C4BC` | Texto de suporte |
| `gray-200` | `#D4DDD6` | Bordas em light mode |
| `gray-100` | `#EEF2EF` | Surface em light mode |
| `gray-50`  | `#F5FAF6` | Background em light mode |
| `gray-0`   | `#FFFFFF` | Branco puro |

### 1.3 Tokens Semânticos — Dark Mode

#### Texto
| Token | Valor | Uso |
|---|---|---|
| `text-primary` | `#F0F5F1` | Títulos, body principal |
| `text-secondary` | `#8E9391` | Subtítulos, metadata |
| `text-muted` | `#5E6361` | Placeholder, labels apagados |
| `text-disabled` | `#3D4150` | Estado desabilitado |
| `text-on-accent` | `#080A0B` | Texto sobre botão accent |
| `text-accent` | `#1ED760` | Links, valores destacados, preços |
| `text-destructive` | `#FF453A` | Ações destrutivas |

#### Superfícies
| Token | Valor | Uso |
|---|---|---|
| `surface-page` | `#080A0B` | Fundo geral da aplicação |
| `surface-subtle` | `#0A0D0B` | Fundo alternativo / zebra |
| `surface-card` | `#121514` | Cards nível 1 |
| `surface-card-hover` | `#181C1B` | Cards em hover |
| `surface-elevated` | `#1A1D1C` | Dropdowns, tooltips, modais |
| `surface-overlay` | `rgba(8,10,11,0.85)` | Backdrop de modais e bottom sheets |
| `surface-accent-muted` | `rgba(30,215,96,0.05)` | Row hover, seleção suave |

#### Ações
| Token | Valor | Uso |
|---|---|---|
| `action-primary` | `#1ED760` | Botão primário |
| `action-primary-hover` | `#15E36A` | Hover do botão primário |
| `action-primary-text` | `#080A0B` | Texto sobre botão primário |
| `action-secondary` | `#121514` | Botão secundário (ghost escuro) |
| `action-secondary-border` | `#232826` | Borda do botão secundário |
| `action-secondary-text` | `#F0F5F1` | Texto do botão secundário |
| `action-ghost-text` | `#F0F5F1` | Texto de ação ghost |
| `action-destructive-text` | `#FF453A` | Texto de ação destrutiva |

#### Bordas
| Token | Valor | Uso |
|---|---|---|
| `border-subtle` | `#1A1D1C` | Bordas de card, separadores suaves |
| `border-default` | `#232826` | Bordas de input, separadores visíveis |
| `border-strong` | `#2E7A38` | Input focused, elemento selecionado |
| `border-focus` | `#1ED760` | Focus ring de inputs |
| `border-destructive` | `#FF453A` | Input com erro |

#### Status
| Token | Valor | Uso |
|---|---|---|
| `status-success` | `#1ED760` | Confirmação, comprado, ok |
| `status-success-muted` | `rgba(30,215,96,0.10)` | Background de badge de sucesso |
| `status-warning` | `#F5A623` | Alerta, atenção |
| `status-warning-muted` | `rgba(245,166,35,0.10)` | Background de badge de alerta |
| `status-error` | `#FF453A` | Erro, destrutivo |
| `status-error-muted` | `rgba(255,69,58,0.10)` | Background de badge de erro |
| `status-info` | `#8E9391` | Informação neutra |
| `status-loading` | `#1ED760` | Indicador de loading / pulse |

### 1.4 Tokens Semânticos — Light Mode

| Token | Valor | Uso |
|---|---|---|
| `surface-page` | `#F5FAF6` | Fundo geral |
| `surface-card` | `#FFFFFF` | Cards |
| `surface-elevated` | `#EEF2EF` | Dropdowns, modais |
| `surface-overlay` | `rgba(5,26,10,0.40)` | Backdrop |
| `text-primary` | `#0A1F0E` | Body principal |
| `text-secondary` | `#3D6B47` | Metadata |
| `text-muted` | `#7A9E82` | Placeholder |
| `border-subtle` | `#D4EDD9` | Bordas suaves |
| `border-default` | `#B0D9B9` | Bordas de input |
| `border-focus` | `#03892F` | Input focused |
| `action-primary` | `#03892F` | Botão primário |
| `action-primary-hover` | `#026E26` | Hover botão primário |

---

## 2. Tipografia

### 2.1 Famílias

| Token | Fonte | Uso | CDN |
|---|---|---|---|
| `font-display` | Switzer | Logo, wordmark, títulos de tela | Fontshare |
| `font-body` | Manrope | Body, labels, metadata, inputs | Google Fonts |

```css
/* Import */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');
/* Switzer via Fontshare */
@import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap');
```

### 2.2 Escala de Tamanhos

| Token | Valor | Uso na UI |
|---|---|---|
| `text-xs` | `11px` | Labels da bottom nav |
| `text-sm` | `13px` | Metadata, loja, dias salvos, datas |
| `text-base` | `15–16px` | Body, nomes de produto, inputs |
| `text-lg` | `18px` | Preços em destaque |
| `text-xl` | `20px` | Contadores de perfil |
| `text-2xl` | `22–24px` | Títulos de tela (header) |
| `text-3xl` | `28–32px` | Valores financeiros, hero numbers |

### 2.3 Pesos

| Token | Valor | Uso |
|---|---|---|
| `font-normal` | `400` | Body, metadata, placeholders |
| `font-medium` | `500` | Títulos de tela, nomes de produto |
| `font-semibold` | `600` | Preços, botões, contadores |
| `font-bold` | `700` | Hero numbers, wordmark |

### 2.4 Line Height e Letter Spacing

| Token | Valor | Uso |
|---|---|---|
| `leading-tight` | `1.2` | Títulos grandes, hero |
| `leading-snug` | `1.35` | Títulos de tela |
| `leading-normal` | `1.5` | Body text |
| `leading-relaxed` | `1.6` | Textos de insight / descrição |
| `tracking-tight` | `-0.02em` | Títulos, preços |
| `tracking-wider` | `0.08em` | Labels uppercase (ITENS, ALERTAS) |

---

## 3. Espaçamentos

Grid base de **8px**.

| Token | Valor | Uso |
|---|---|---|
| `space-1` | `4px` | Gap mínimo, interno de badge |
| `space-2` | `8px` | Gap entre ícone e texto |
| `space-3` | `12px` | Padding de tag/pill |
| `space-4` | `16px` | Padding interno de card pequeno |
| `space-5` | `20px` | Padding de card padrão |
| `space-6` | `24px` | Padding de tela (horizontal) |
| `space-7` | `28px` | Gap entre seções |
| `space-8` | `32px` | Padding de card grande |
| `space-10` | `40px` | Espaço entre grupos |
| `space-12` | `48px` | Seção hero |
| `space-16` | `64px` | Espaçamento macro |

---

## 4. Bordas e Sombras

### 4.1 Border Radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | `6px` | Tags, pills, badges |
| `radius-md` | `12px` | Inputs, botões |
| `radius-lg` | `16px` | Cards padrão |
| `radius-xl` | `24px` | Cards grandes, imagens |
| `radius-2xl` | `32px` | Cards de destaque, imagem de detalhe |
| `radius-full` | `9999px` | Botões pill, inputs pill, avatares |

### 4.2 Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `0px 2px 8px rgba(0,0,0,0.3)` | Cards padrão |
| `shadow-md` | `0px 2px 12px rgba(0,0,0,0.5)` | Cards elevados |
| `shadow-lg` | `0px 8px 32px rgba(0,0,0,0.7)` | Modais, bottom sheets |
| `shadow-accent` | `0px 4px 16px rgba(30,215,96,0.20)` | Glow do botão primário |
| `shadow-icon` | `0px 2px 8px rgba(0,0,0,0.4)` | Ícones flutuantes |

---

## 5. Componentes

### 5.1 Botões

#### Primary
```
background:  action-primary (#1ED760)
color:       action-primary-text (#080A0B)
font:        Manrope, font-semibold, text-base
padding:     space-4 vertical · full width
radius:      radius-full
hover:       action-primary-hover (#15E36A)
shadow:      shadow-accent
transition:  colors 150ms ease
```

#### Secondary (Ghost escuro)
```
background:  transparent
border:      1px solid border-default (#232826)
color:       action-secondary-text (#F0F5F1)
font:        Manrope, font-normal, text-base
padding:     space-4 vertical · full width
radius:      radius-full
hover:       background surface-card (#121514)
transition:  colors 150ms ease
```

#### Destructive
```
background:  transparent
border:      1px solid border-default (#232826)
color:       action-destructive-text (#FF453A)
font:        Manrope, font-normal, text-base
padding:     space-4 vertical · full width
radius:      radius-full
hover:       background surface-card (#121514)
```

#### Disabled
```
background:  surface-card (#121514)
color:       text-muted (#5E6361)
border:      1px solid border-subtle (#1A1D1C)
opacity:     0.5
cursor:      not-allowed
```

#### Icon Button (circular)
```
size:        44x44px
background:  surface-card (#121514)
border:      1px solid border-default (#232826)
radius:      radius-full
icon-color:  text-secondary (#8E9391)
hover:       icon-color text-accent (#1ED760)
transition:  colors 150ms ease
shadow:      shadow-sm
```

---

### 5.2 Cards

#### Card Padrão (produto)
```
background:  surface-card (#121514)
border:      1px solid border-subtle (#1A1D1C)
radius:      radius-2xl (30px / rounded-3xl)
padding:     space-5 (20px)
gap:         space-4 (16px) entre seções
hover:       border border-default (#232826)
shadow:      shadow-sm
transition:  border-color 150ms ease
cursor:      pointer

Estrutura interna:
  [Topo]   foto 64x64px (radius-xl) + info em coluna
  [Divisor] 1px bg border-subtle
  [Base]   preço + data à esquerda · botão Ver à direita
```

#### Card de Insight
```
background:  surface-card (#121514)
border:      1px solid border-subtle (#1A1D1C)
radius:      radius-2xl (32px)
padding:     space-8 (32px)
gap:         space-2 entre linhas

Estrutura interna:
  Label secundário → Valor grande → Divisor → Texto explicativo
```

#### Card de Perfil
```
background:  surface-card (#121514)
border:      1px solid border-subtle (#1A1D1C)
radius:      radius-2xl (32px)
padding:     space-8 (32px)
align:       center
overflow:    hidden (para o accent muted no topo)

Detalhe: faixa sutil de accent-muted no topo (h-24, opacity 50%)
```

#### Card Loading (skeleton)
```
Mesma estrutura do card padrão
Foto: bg surface-elevated + ícone image text-muted
Texto: placeholder em animate-pulse bg surface-elevated
Status text: text-accent animate-pulse "Processando dados..."
```

---

### 5.3 Inputs

#### Input Padrão
```
background:   surface-card (#121514)
border:       1px solid border-default (#232826)
radius:       radius-full
padding:      14px vertical · 20px horizontal
font:         Manrope, font-normal, text-base
color:        text-primary
placeholder:  text-muted (#5E6361)
focus:        border border-focus (#1ED760)
transition:   border-color 150ms ease
outline:      none
```

#### Input com Ícone à Esquerda
```
Mesmo que Input Padrão +
padding-left: 48px (para acomodar ícone)
ícone:        posição absolute left-5, centralizado vertical
ícone-color:  text-muted (#5E6361)
```

---

### 5.4 Tags e Badges

#### Tag de Etiqueta (user label)
```
background:   surface-elevated (#181C1B)
border:       1px solid border-default (#232826)
color:        text-secondary (#8E9391)
font:         Manrope, font-normal, text-xs (11–12px)
padding:      4px 12px
radius:       radius-full
display:      inline-block
```

#### Badge de Status (accent)
```
background:   status-success-muted (rgba(30,215,96,0.10))
color:        status-success (#1ED760)
font:         Manrope, font-normal, text-sm
padding:      4px 12px
radius:       radius-full
```

#### Badge Store (sobre imagem)
```
background:   rgba(8,10,11,0.80)
backdrop-filter: blur(12px)
border:       1px solid rgba(255,255,255,0.10)
color:        text-primary
font:         Manrope, font-normal, text-xs
padding:      8px 16px
radius:       radius-full
```

---

### 5.5 Navegação (Bottom Nav)

```
height:       96px (h-24)
background:   surface-page (#080A0B)
border-top:   1px solid surface-card (#121514)
padding:      8px top · 24px bottom · 24px horizontal
position:     absolute bottom-0, full width
z-index:      20

Item inativo:
  icon-color:  text-disabled (#5E6361)
  label-color: text-disabled (#5E6361)
  hover:       text-primary (#F0F5F1)

Item ativo:
  icon-color:  status-success (#1ED760)
  label-color: status-success (#1ED760)

Label: text-xs (11px), Manrope font-normal
Ícone: 24x24px, stroke-width 1.5
Gap:   6px entre ícone e label
```

---

### 5.6 Header de Tela

```
height:       96px (h-24)
padding:      24px top · 24px horizontal
background:   surface-page (#080A0B)
z-index:      10
align:        items-center justify-between
border:       nenhum

Título:       Switzer ou Manrope, font-medium, text-2xl
              color text-primary
Ação direita: Icon Button circular (ver 5.1)
```

---

### 5.7 Divider

```
height:   1px
color:    border-subtle (#1A1E1D)
margin:   space-0 (sem margin horizontal, full width do container)
```

---

### 5.8 Avatar

```
size:         96x96px
border:       2px solid status-success (#1ED760)
padding:      4px
radius:       radius-full
inner-bg:     surface-elevated (#232826)
overflow:     hidden
```

---

## 6. Imagens de Produto

```
aspect-ratio: square (1:1) no card de detalhe
size-card:    64x64px
radius-card:  radius-xl (16px) — rounded-2xl
radius-detail: radius-2xl (32px)
object-fit:   cover
bg-fallback:  surface-elevated (#181C1B)
opacity:      90% (detalhe) · 100% (card)
```

---

## 7. Animações e Transições

| Token | Valor | Uso |
|---|---|---|
| `transition-colors` | `150ms ease` | Hover de botões, bordas, ícones |
| `transition-opacity` | `150ms ease` | Estados disabled, overlays |
| `animate-pulse` | Tailwind default | Skeleton loading |
| `transition-transform` | `200ms ease` | Abertura de modais |

---

## 8. Layout e Breakpoints

```
Mobile first · 375px como base de design
Max-width card: 375px
Padding horizontal tela: space-6 (24px)
Padding vertical tela: space-6 (24px)
Safe area bottom: space-6 (24px) sobre bottom nav
```

---

## 9. Referências Rápidas para IA

Quando gerar código para este projeto, use sempre:

```
- Dark background: #080A0B
- Card: #121514 com borda #1A1D1C
- Input: #121514 com borda #232826, focus #1ED760
- Botão primário: bg #1ED760 text #080A0B rounded-full
- Botão destrutivo: border #232826 text #FF453A rounded-full
- Accent text/icon: #1ED760
- Texto primário: #F0F5F1
- Texto secundário: #8E9391
- Placeholder: #5E6361
- Font body: Manrope
- Font display: Switzer
- Border radius padrão: rounded-3xl em cards, rounded-full em botões e inputs
- Bottom nav height: h-24 com pb-6
- Header height: h-24 com pt-6
```
