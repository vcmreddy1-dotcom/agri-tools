# Prakash Agri Tools — Production Deployment & Operations Guide

## 1. Project Overview
**Prakash Agri Tools** is an agricultural machinery and equipment showroom catalogue established in 2009 in LB Nagar, Hyderabad, Telangana, India.

- **Primary Contact**: +91 96660 39444
- **WhatsApp Integration**: `919666039444`
- **Location**: LB Nagar, Hyderabad, Telangana, India
- **Core Technology**: Next.js 16 (App Router), TypeScript, Tailwind CSS, Prisma ORM, SQLite / PostgreSQL.

---

## 2. Environment Variables Checklist

Create a `.env` (or set environment variables in your deployment hosting dashboard):

| Variable | Description | Example / Default |
|---|---|---|
| `DATABASE_URL` | Prisma Database connection string | `file:./dev.db` (Local SQLite) or `postgresql://user:pass@host:5432/prakash_agri` |
| `JWT_SECRET` | Secret key for signing admin authentication tokens | `prakash_agri_tools_super_secure_jwt_secret_key_2026_xyz` |
| `NEXT_PUBLIC_BUSINESS_NAME` | Business display name | `Prakash Agri Tools` |
| `NEXT_PUBLIC_DISPLAY_PHONE` | Showroom telephone display | `+91 96660 39444` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`| Direct WhatsApp number (no `+` or spaces) | `919666039444` |
| `NEXT_PUBLIC_LOCATION` | Business showroom address | `LB Nagar, Hyderabad, Telangana, India` |
| `NEXT_PUBLIC_ESTABLISHED_YEAR`| Founding year | `2009` |
| `SMTP_HOST` | Transactional email SMTP host (optional) | `smtp.gmail.com` |
| `SMTP_PORT` | Transactional email SMTP port (optional) | `587` |
| `SMTP_USER` | SMTP username / email address | `enquiries@prakashagritools.com` |
| `SMTP_PASS` | SMTP application password | `your-smtp-app-password` |
| `NOTIFICATION_RECIPIENT_EMAIL`| Business recipient for enquiry notifications | `prakashagritools@gmail.com` |

---

## 3. Database Setup & Seeding

### Initial Synchronization
```bash
# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed 5 main categories, 34 subcategories, verified machinery models, and admin user
npx tsx prisma/seed.ts
```

### Admin Portal Credentials
- **Portal URL**: `/admin/login`
- **Email**: `admin@prakashagri.com`
- **Default Password**: `Admin@Prakash2026!`

---

## 4. Running the Application

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Launch
```bash
npm run build
npm run start
```

### Automated QA & Verification Suite
```bash
npx tsx scripts/verify-all.ts
```

---

## 5. Catalogue Category Structure

The platform implements all **5 Main Categories** and **34 Subcategories** matching official specifications:

1. **Agricultural Implements** (`/products/agricultural-implements`)
   - Seed Drills
   - Turbo Seeder
   - Rotavators
   - Disc Harrows
   - Disc Ploughs
   - Cultivators
   - Laser Land Levelers
   - Disc Ridgers / Bund Makers
   - Reversible Ploughs
   - Mulchers
   - Slashers
   - Paddy Weeders
   - Mini Tillers
   - Weeders

2. **Spraying Equipment** (`/products/spraying-equipment`)
   - Battery Sprayers
   - Power Sprayers
   - Solar Sprayers
   - 300L Sprayers

3. **Garden & Power Equipment** (`/products/garden-power-equipment`)
   - Brush Cutters
   - Grass Cutters
   - Chain Saws
   - Hedge Trimmers
   - Lawn Mowers
   - Earth Augers
   - Water Pumps

4. **Fodder Equipment** (`/products/fodder-equipment`)
   - Chaff Cutters

5. **Spare Parts** (`/products/spare-parts`)
   - Rotavator Blades
   - Seed Drill Parts
   - Sprayer Parts
   - Brush Cutter Parts
   - Bearings
   - Belts
   - Chains
   - Other Machinery Parts

---

## 6. Deployment Platforms

### Vercel Deployment
1. Import repository into Vercel.
2. In Vercel Project Settings > Environment Variables, supply `DATABASE_URL` (e.g. Neon, Supabase, or Prisma Postgres), `JWT_SECRET`, and `NEXT_PUBLIC_*` variables.
3. Build Command: `prisma generate && next build`
4. Deploy.

### Node.js Server / Docker / VPS
1. Run `npm install --omit=dev`.
2. Run `npx prisma db push && npx tsx prisma/seed.ts`.
3. Run `npm run build`.
4. Use PM2 or systemd to run `npm start` on port 3000 behind NGINX with HTTPS.
