-- ==============================================================================
-- PRAKASH AGRI TOOLS — ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE POSTGRESQL
-- ==============================================================================

BEGIN;

-- 1. Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to allow safe idempotency
DROP POLICY IF EXISTS "Allow public read access to categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admin full access to categories" ON public.categories;

DROP POLICY IF EXISTS "Allow public read access to products" ON public.products;
DROP POLICY IF EXISTS "Allow admin full access to products" ON public.products;

DROP POLICY IF EXISTS "Allow public read access to product media" ON public.product_media;
DROP POLICY IF EXISTS "Allow admin full access to product media" ON public.product_media;

DROP POLICY IF EXISTS "Allow public to insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow admin to manage enquiries" ON public.enquiries;

DROP POLICY IF EXISTS "Allow admin full access to admin users" ON public.admin_users;

-- ------------------------------------------------------------------------------
-- 3. CATEGORIES POLICIES
-- ------------------------------------------------------------------------------
-- Public can read all active catalog categories
CREATE POLICY "Allow public read access to categories"
  ON public.categories
  FOR SELECT
  USING (true);

-- Authenticated admins can manage categories (create, edit, delete)
CREATE POLICY "Allow admin full access to categories"
  ON public.categories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 4. PRODUCTS POLICIES
-- ------------------------------------------------------------------------------
-- Public can view published agricultural machinery and spare parts
CREATE POLICY "Allow public read access to products"
  ON public.products
  FOR SELECT
  USING (published = true);

-- Authenticated admins can view and manage all products (including drafts)
CREATE POLICY "Allow admin full access to products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. PRODUCT MEDIA POLICIES
-- ------------------------------------------------------------------------------
-- Public can view machinery photos and media items
CREATE POLICY "Allow public read access to product media"
  ON public.product_media
  FOR SELECT
  USING (true);

-- Authenticated admins can upload, re-order, and delete product media
CREATE POLICY "Allow admin full access to product media"
  ON public.product_media
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 6. ENQUIRIES POLICIES
-- ------------------------------------------------------------------------------
-- Public visitors can submit contact forms and machinery price enquiries
CREATE POLICY "Allow public to insert enquiries"
  ON public.enquiries
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin staff can view and manage incoming customer enquiries
CREATE POLICY "Allow admin to manage enquiries"
  ON public.enquiries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 7. ADMIN USERS POLICIES
-- ------------------------------------------------------------------------------
-- Strictly locked: No public access. Only authenticated admin staff can access.
CREATE POLICY "Allow admin full access to admin users"
  ON public.admin_users
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 8. GRANT LEAST-PRIVILEGE PERMISSIONS TO SUPABASE ROLES
-- ------------------------------------------------------------------------------
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Public / Anonymous website visitors
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.product_media TO anon;
GRANT INSERT ON public.enquiries TO anon;

-- Authenticated admin users
GRANT ALL ON public.categories TO authenticated;
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.product_media TO authenticated;
GRANT ALL ON public.enquiries TO authenticated;
GRANT ALL ON public.admin_users TO authenticated;

COMMIT;
