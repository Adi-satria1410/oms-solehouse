---
name: Warm Editorial Shoemaker
colors:
  surface: '#fef9f2'
  surface-dim: '#ded9d3'
  surface-bright: '#fef9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ec'
  surface-container: '#f2ede6'
  surface-container-high: '#ece7e1'
  surface-container-highest: '#e7e2db'
  on-surface: '#1d1b17'
  on-surface-variant: '#4e4541'
  inverse-surface: '#32302c'
  inverse-on-surface: '#f5f0e9'
  outline: '#807570'
  outline-variant: '#d1c4be'
  surface-tint: '#685c57'
  primary: '#19120e'
  on-primary: '#ffffff'
  primary-container: '#2f2622'
  on-primary-container: '#9a8c87'
  inverse-primary: '#d3c3bd'
  secondary: '#934a22'
  on-secondary: '#ffffff'
  secondary-container: '#fc9f6f'
  on-secondary-container: '#76340c'
  tertiary: '#0f1506'
  on-tertiary: '#ffffff'
  tertiary-container: '#232a18'
  on-tertiary-container: '#8a927a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f0dfd9'
  primary-fixed-dim: '#d3c3bd'
  on-primary-fixed: '#221a16'
  on-primary-fixed-variant: '#4f4540'
  secondary-fixed: '#ffdbcb'
  secondary-fixed-dim: '#ffb692'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#75340b'
  tertiary-fixed: '#dee6ca'
  tertiary-fixed-dim: '#c1caaf'
  on-tertiary-fixed: '#171e0d'
  on-tertiary-fixed-variant: '#424935'
  background: '#fef9f2'
  on-background: '#1d1b17'
  surface-variant: '#e7e2db'
  bg-base: '#F6F1EA'
  bg-surface: '#FFFFFF'
  bg-sand: '#E8DDCF'
  bg-taupe: '#B9AB9A'
  border-subtle: '#E3D8CA'
  ink-primary: '#2F2622'
  ink-secondary: '#6B5E55'
  ink-muted: '#9A8D83'
  accent-hover: '#9A5430'
  badge-olive: '#5E6650'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

# DESIGN.md — SOLEHOUSE (Shoe Order Management System)

> Design system untuk web OMS sepatu: storefront (customer) + admin dashboard (OMS).
> Referensi: tampilan menswear minimalis beige/taupe dengan heading serif.
> Perubahan: layout split-hero, grid kategori lebih besar, warna lebih hangat dengan aksen terracotta, tambahan komponen khusus sepatu (size selector, stok per ukuran) dan layar OMS.

---

## 1. Brand & Mood
- **Nama:** SOLEHOUSE
- **Kepribadian:** hangat, premium, tenang, rapi, terpercaya
- **Kata kunci visual:** warm neutral, editorial, banyak ruang kosong, foto produk besar, tipografi serif elegan
- **Tone copy:** singkat, percaya diri, tidak berlebihan. Contoh: "Langkah Tepat Setiap Hari."
- **Bahasa UI:** Indonesia (default)

## 2. Color Palette
- `bg-base`: #F6F1EA (ivory hangat)
- `bg-surface`: #FFFFFF (putih kartu/kontainer)
- `bg-sand`: #E8DDCF (section sand/hero block)
- `bg-taupe`: #B9AB9A (border sekunder, divider)
- `ink-primary`: #2F2622 (espresso pekat untuk teks & tombol primer)
- `ink-secondary`: #6B5E55
- `ink-muted`: #9A8D83
- `accent`: #B5653A (terracotta untuk CTA sekunder & Sale)
- `accent-hover`: #9A5430
- `olive`: #5E6650 (badge New)

## 3. Typography
- Display/Headings: Playfair Display (serif elegan)
- Body/UI/Labels: Inter (sans-serif netral & terbaca jelas)

## 4. Components & Styling
- Radius: card 16px, tombol pill (999px), size chips 10px
- Shadow: 0 2px 8px rgba(47,38,34,0.06), hover 0 12px 32px rgba(47,38,34,0.12)
- Border: 1px #E3D8CA
