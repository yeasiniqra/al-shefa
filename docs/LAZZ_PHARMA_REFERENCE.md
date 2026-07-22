# Lazz Pharma → Al-Shefa Reference Map

> **Purpose.** Lazz Pharma is the proven reference implementation; Al-Shefa is its
> modern rebuild. This document is the shared map between them. When a feature is
> requested for Al-Shefa, we first locate it here in Lazz Pharma, understand how it
> works, then **adapt** it to Al-Shefa's stack — never copy verbatim.
>
> Keep this file in the Al-Shefa repo (`docs/`) and attach it at the start of a
> feature session so the reference context is always available.

Reference repo studied: `github.com/yeasiniqra/NextJsLazzPharmaRunning`
(commit `4e30caf`). Al-Shefa target: this project.

---

## 1. The two projects at a glance

| | **Lazz Pharma (reference)** | **Al-Shefa (target)** |
|---|---|---|
| Origin | Create React App **ported** to Next.js | Greenfield, modern |
| Next.js | 15 (single catch-all route) | 16 (App Router, file-system routing) |
| React | 18 | 19 |
| Routing | `react-router-dom` v5 via a shim (`src/shims/react-router-dom.jsx`) | Native App Router segments |
| State | React Context + `useReducer` (auth/cart/app/address/checkout) | **zustand** (`store/*-store.js`) |
| Styling | CSS Modules + global CSS (`src/css/*`, Bootstrap) | Plain global CSS + tokens (`app/globals.css`) |
| Slider | `@splidejs/react-splide` (React wrapper) | `@splidejs/splide` (vanilla, mounted in an effect — React-19 safe) |
| Data | `window.appData` positional arrays + synchronous `DataService` selectors | Mock data shaped like the API + planned server `fetch` |
| Icons | `react-icons` | `lucide-react` |

**Takeaway:** Lazz is a large, battle-tested feature set (398 files) wrapped in
legacy plumbing. We harvest its **logic, UX, and business rules** and re-express
them in Al-Shefa's cleaner idioms.

---

## 2. Core principle — adapt, don't copy

Every port runs through the same four translations. Internalise these; they cover
~90% of the mechanical work:

1. **Routing.** `react-router` → App Router. `Link`/`NavLink` → `next/link` +
   `usePathname()` for active state. `useHistory()` → `useRouter()`. `useParams()`
   / `useLocation()` → `next/navigation`. `<Redirect>` → `redirect()` or a
   `next.config` redirect. A Lazz `<Route path>` becomes an Al-Shefa route folder
   (`/product/details/:id` → `app/product/details/[id]/page.js`).
2. **State.** A Context provider → a zustand store. Reducer action branches →
   store actions. Manual `localStorage.setItem` → zustand `persist` middleware.
   Al-Shefa already has `auth-store`, `cart-store`, `wishlist-store` scaffolded —
   extend those rather than adding new patterns.
3. **Styling.** `*.module.css` class contracts → plain CSS classes in
   `globals.css` (or a co-located `.css`), using Al-Shefa's design tokens
   (`--brand-green`, `--color-*`, `--radius-*`). Drop Bootstrap.
4. **Data.** `window.appData` + synchronous `DataService` selectors → a Server
   Component `fetch` (with `revalidate`) or a zustand store hydrated on load.
   Reuse the *selector shape*, not the global-array hack.

Two library specifics worth remembering:
- **Splide:** Lazz uses the `@splidejs/react-splide` `<Splide>/<SplideSlide>`
  components. Al-Shefa is on **vanilla `@splidejs/splide`** (React 19 compat).
  The adaptation is a thin client wrapper that mounts Splide in `useEffect` on
  server-rendered markup (see the existing `CategorySliderDesktop.jsx` for the
  pattern). Splide **option objects port over unchanged** — only the mounting
  differs.
- **Images:** keep the `imageURL()` resolver idea; point it at
  `CONFIG.IMAGE_URL`; optionally wrap in `next/image`.

---

## 3. Feature catalog (where it lives in Lazz → how to adapt)

| Feature | Lazz location | Adaptation path for Al-Shefa |
|---|---|---|
| **Banner slider** | `components/Banner/Banner.jsx` + `BannerTemplate.jsx`, `utilities/Slider.jsx`, `shared/image.util.js` | Reusable `<Slider>` (vanilla Splide) + `Banner` that viewport-filters images. **See §4 worked example.** |
| **Reusable Splide wrapper** | `components/utilities/Slider.jsx` | New `components/ui/Slider.jsx` mounting vanilla Splide from `{options, data, Template}`. |
| **Category mega-menu (desktop)** | `Header/Navbar/Categories/*` (presentational) | **Already built** in Al-Shefa (`CategoryNav` + `CategorySliderDesktop` hover flyout). Feed from a categories store. |
| **Mobile category grid** | `Home/MobileCatagory/MobileCatagory.jsx` (8–10 tiles by width) | **Already built** (`CategoryGridMobile`). Prefer CSS breakpoints over `window.innerWidth`. |
| **Mobile nav drawer / hamburger** | `Header/MobileLayer/Hamburger` + `Navbar/MobileNav` (slide-in `right:0↔100vw`) | zustand `useUiStore` toggle + a slide-in drawer. Lists page links (Home, Offers, Blog…). |
| **Header (multi-layer)** | `Header/Header.jsx` → TopLayer (contact) / SecondLayer (logo+search+CTA) / Navbar | Al-Shefa `Header` already mirrors TopBar/MainHeader; keep splitting this way. |
| **Sticky hide-on-scroll** | `Header.jsx` rAF lerp that hides the contact bar past its height | Small client hook, or plain `position: sticky` if the lerp isn't needed. |
| **Search + autocomplete** | `Header/SecondLayer/Search`, `SearchPortal/*` (debounced 300ms, top-5 + "View All") | Client `SearchBar`: debounced fetch, inline dropdown, `/search?query=` via `useSearchParams`. Not a real portal. |
| **Account dropdown** | `Header/.../User/Menu/*` (Profile card + Navigator rows + Notification) | zustand-toggled dropdown sourced from `auth-store`. |
| **Product card** | `Shared/ProductCard/*` (ProductCard, Action, Price, DiscountTag, ProductImage, Description, StockOutAlert) | Port as presentational components; move add-to-cart into a `useAddToCart` hook over `cart-store`. **See §5.** |
| **Product listing (category/subcategory/search)** | `Products/CategoryProduct`, `SubCategoryProduct`, `SearchAllProduct` | Server Component fetch of `GET_PRODUCTS_BY_CATEGORY`; `ProductCard` grid; pagination via `?page=`. |
| **Product detail** | `pages/ProductDetails.jsx` + `Products/ProductDetails/ProductDetailsContent.jsx` (2-col, single image, tabs, reviews) | Server Component + `generateMetadata`; reuse `Action`; reviews stay client (localStorage-buffered pending reviews). |
| **Cart / mini-cart** | `store/CartContextProvider.jsx`, `components/Cart/*` (MiniCart pill ↔ ContentCart panel) | Extend `cart-store` (add/remove/qty/clear/totals); MiniCart + panel components. |
| **Checkout** | `components/Checkout/*` + `Checkout/store/*` | `useCheckoutStore`; step flow in §6. |
| **Auth (login/signup/OTP/reset)** | `components/Auth/*`, `store/AuthContextProviderV2.jsx` (modal-driven, `form` switch) | Extend `auth-store` with `form` + `signupData`; keep `userCamelCase` mapper; header token `datacontent`. |
| **Prescription upload** | `Checkout/Prescriptions`, `PrescriptionSection` | File upload → `POST_PRESCRIPTION`; store returned ids. |
| **Notice ticker** | `Home/Noticebar/Noticebar.jsx` (`react-fast-marquee`) | Marquee of notices; add `react-fast-marquee` or a CSS keyframe marquee. |
| **Promo galleries** | `Home/CategoryDisplay/DisplayRow/Gallery/*` (INLINE / SLIDER / VERTICAL by `.type`) | Branch component on gallery type; SLIDER uses the `<Slider>` wrapper. |
| **Wishlist** | **Not in Lazz** | Al-Shefa already has `wishlist-store` — greenfield, design fresh. |

**Home page section order (Lazz `pages/Home.jsx`):** Banner → Features (trust
boxes) → Noticebar → MobileCategory grid → per-category product rows (Splide, with
optional promo gallery) → PrescriptionSection → SeoFaqSection → Testimonials →
Showcase gallery.

---

## 4. Worked example — the Banner slider

This is the reference you named. Here is exactly how Lazz builds it and the
Al-Shefa adaptation, so "add the banner slider from Lazz Pharma" is a known path.

**How Lazz does it**

The reusable slider (`components/utilities/Slider.jsx`) is a thin wrapper:

```jsx
<Splide options={options}>
  {data.map((item, i) => (
    <SplideSlide key={item.id || i}><Template item={item} /></SplideSlide>
  ))}
</Splide>
```

`Banner.jsx` supplies the data, options, and a per-slide `Template`:

```jsx
const options = { rewind:true, type:"loop", autoplay:true, rewindSpeed:1000,
                  speed:500, pauseOnHover:false, width:"100%", fixedHeight:true };
const filteredBanners = filterImagesByViewPort(getBanners());
<Slider Template={BannerTemplate} options={options} data={filteredBanners} />
```

The **responsive image switch** (`shared/image.util.js`) is the key behaviour you
called out: each banner carries a `viewport` tag (`large` / `medium` / `small`),
and `filterImagesByViewPort` reads `window.innerWidth` and returns only the
matching set, with graceful fallback (`small → medium → large`):

- `≥ 764px` → LARGE banners
- `400–763px` → MEDIUM (falls back to LARGE)
- `< 400px` → SMALL (falls back to MEDIUM → LARGE)

Each slide (`BannerTemplate.jsx`) is an eager, high-priority `<img>` (via
`imageURL(item.image, IMAGE_OF.BANNER, IMAGE_SIZE.ORIGINAL)`) wrapped in a link:
internal `<Link>` for normal links, `<a href>` for `tel:` links, bare span if no
link. Banner object shape: `{ id, image, viewport, link, altrText, Text }`.

**Al-Shefa adaptation plan**

1. Add `components/ui/Slider.jsx` — a client component that mounts **vanilla
   Splide** on server-rendered `.splide` markup in `useEffect` (same technique as
   `CategorySliderDesktop.jsx`), taking `{ options, data, renderItem }`. Splide
   `options` from Lazz port over unchanged.
2. Add `components/home/Banner/Banner.jsx` (client) that resolves banners and
   renders `<Slider>` with the loop/autoplay options above.
3. Responsive switch: keep the viewport-tag idea. Preferred Al-Shefa approach is
   CSS (render both, hide by breakpoint — SSR-safe, no hydration mismatch); if you
   want the exact Lazz behaviour, port `filterImagesByViewPort` into a
   `useViewportImages` hook that runs after mount (guard against SSR).
4. Images via an Al-Shefa `imageURL()` helper reading `CONFIG.IMAGE_URL`; links via
   `next/link`; `tel:` via `<a>`.
5. Data from a `banners` source (mock now, shaped `{ id, image, viewport, link,
   alt }`, server `fetch` later) — matching how `navCategories.js` is shaped for
   the future API.

---

## 5. Product card anatomy (high-reuse)

Lazz `Shared/ProductCard` is the most reused unit. Structure:
`ProductCard` wraps `ProductImage` + `Description` + `Price` in a `<Link>` to the
detail page, with `Action` (add-to-cart) **outside** the link, plus a fly-to-cart
animation ref.

- **Price** — `discount === 0` → `৳{mrp}`; else `৳{(mrp − discount)}` with a
  struck-through `<del>৳{mrp}</del>`. Note Lazz `discount` is an **absolute BDT
  amount**, not a percentage.
- **DiscountTag** — hidden when amount is 0; else "Save {percentage}%" badge.
- **ProductImage** — `imageURL(url, IMAGE_OF.PRODUCT, size)` with a
  `default-medicine.png` fallback, lazy-loaded.
- **Description** — title = `name + strength + type`, truncated by breakpoint;
  generic-name subline.
- **Action** — quantity overlay; add → `cart.singleProductAdd(product, qty)`;
  `Stk === 0` → stock-out request modal (`StockOutAlert`, phone-validated). The
  **same `Action` is reused on the detail page**.

Al-Shefa mapping: presentational subcomponents port near-verbatim; move the
add-to-cart calls onto `cart-store` behind a `useAddToCart(product)` hook so the
card and the detail page share one path. Al-Shefa's `cart-store` item shape
(`{ id, productId, name, image, price, qty }`) is cleaner than Lazz's
`Nm/MRP/discount/quantity` — keep Al-Shefa's names and map at the API boundary.

---

## 6. Checkout step flow (reference order)

From `components/Checkout/*` + `Checkout/store/*`. On mount: bounce if cart empty →
refresh prices (`GetCurrentInfo`) → warn on price drift. Then:

Products (review/edit lines) → Coupon (`COUPON_CHECK`) → Payment/cashback
(`GET_CASHBACK_OFFERS`, spend credit) → Address (receiver + Division→District→Area
via AutoComplete) → Prescriptions (upload) → Payment options (PayNow /
CashOnDelivery / 20% advance, district-gated) → Place order (`CREATE_ORDER`; OTP
for anonymous users) → OTP verify (`GET_OTP` / `VERIFY_OTP`, 60s resend) →
online-payment gateway (`PAYMENT_ATTEMPT`) → clear cart + context.

`payable = TotalAmount − coupon.amount + shippingCharge − cashback/credit`.

Adapt: a `useCheckoutStore` mirroring the slices (coupon, shipping, paymentOption,
prescriptions, otpVerification) + async actions; steps as App Router
components/segments under `app/checkout/`.

---

## 7. Conventions to carry across

- **API config.** Lazz: `Service/config-service.js` (dev/prod by `NODE_ENV`).
  Al-Shefa: `lib/config.js` already reads `NEXT_PUBLIC_API_BASE_URL` /
  `NEXT_PUBLIC_IMAGE_URL` — the right pattern; just fill `.env`.
- **Image URL.** `imageURL(name, imageOf, size)` →
  `{IMAGE_URL}/Content/ImageData/{imageOf}/{size}/{name}`.
  `IMAGE_OF = {Banner, Product, Slider, Gallery, Offer}`,
  `IMAGE_SIZE = {Small, Icons, Orginal}` (note the API's `Orginal` spelling).
- **Auth token.** Sent as request header **`datacontent`**; user JSON persisted in
  `localStorage.USER`. Map API PascalCase → camelCase (`userCamelCase`).
- **Product endpoints.** detail `ProductArea/ProductContent/ByProduct/{id}`,
  category SEO `ProductArea/CategoryProductPrivot/ByCategoryText?permalink=`,
  by-category `GET_PRODUCTS_BY_CATEGORY`, search `GET_ALL_SEARCHED_PRODUCT`,
  order `ProductOrderArea/ProductOrder/Add`. (Full list: Lazz `src/lib/endpoints.js`.)
- **Splide option sets** (port unchanged): banner/showcase = loop + autoplay;
  product rows = `perPage:5, autoWidth:true, gap:'10px', pagination:false,
  breakpoints:{480:{perPage:3}}`.
- **Product field mapper.** Lazz `searchItemsConvertObject` maps API → internal
  shape at every boundary; Al-Shefa should keep one equivalent mapper in `lib/`.

---

## 8. Al-Shefa today (what we build on)

- `store/auth-store.js`, `store/cart-store.js`, `store/wishlist-store.js` — zustand,
  each with API-wiring notes and API-friendly item shapes.
- `lib/config.js` — env-driven config.
- `components/layout/Header/*` — TopBar, MainHeader, Logo, SearchBar, HeaderActions.
- `components/layout/CategoryNav/*` — desktop Splide slider + recursive hover
  flyout mega-menu, mobile grid. (Splide is vanilla `@splidejs/splide`.)
- `components/ui/CategoryIcon.jsx` — icon-name-or-image resolver.
- `data/categories.js`, `data/navCategories.js` — mock data shaped like the future
  API (`{ id, name, permalink, iconImage, children }`).
- `hooks/useOutsideClick.js`.

---

## 9. The workflow

For every Al-Shefa feature request that mentions Lazz Pharma:

1. **Locate** the feature in Lazz Pharma (use §3, then read the files).
2. **Understand** it — UI, logic, API calls, responsiveness, animation, state.
3. **Adapt** it to Al-Shefa via the four translations in §2 (routing, state,
   styling, data), following Al-Shefa's folder structure, naming, and tokens.
4. **Don't copy verbatim** — refactor into Al-Shefa idioms. If the feature isn't
   in Lazz, build it in the same design philosophy and quality.

Whenever "Lazz Pharma" is mentioned, treat it as an instruction to use this
codebase as the reference source.
