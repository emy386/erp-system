-- 1. جدول الحسابات وعلاقتها بالصلاحيات (profiles)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  phone text,
  role text CHECK (role IN ('owner', 'manager', 'staff')),
  permissions jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- تمكين تعديل الجدول لجميع الحسابات الموثقة
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read of profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow insert of profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- 2. جدول المنتجات
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  code text,
  "materialsCost" numeric DEFAULT 0,
  "workshopFee" numeric DEFAULT 0,
  "packagingCost" numeric DEFAULT 0,
  "marketingCost" numeric DEFAULT 0,
  "extraCost" numeric DEFAULT 0,
  "totalCost" numeric DEFAULT 0,
  "sellingPrice" numeric DEFAULT 0,
  "expectedProfit" numeric DEFAULT 0,
  variants jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- 3. جدول الطلبات
CREATE TABLE IF NOT EXISTS public.orders (
  id text PRIMARY KEY,
  "customerName" text,
  "customerPhone" text,
  "customerPhone2" text,
  governorate text,
  address text,
  total numeric DEFAULT 0,
  "shippingPaid" boolean DEFAULT false,
  "shippingAmount" numeric DEFAULT 50,
  status text DEFAULT 'new',
  "isUrgent" boolean DEFAULT false,
  notes text,
  source text,
  "creationDate" text,
  "deadlineDate" text,
  "lastUpdateDate" text,
  items jsonb DEFAULT '[]'::jsonb,
  "productionStatus" text,
  "deliveryDuration" text,
  "screenshot" text,
  "sentConfirmationMessage" boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

-- 4. جدول المعاملات المالية
CREATE TABLE IF NOT EXISTS public.transactions (
  id text PRIMARY KEY,
  date text,
  type text,
  amount numeric DEFAULT 0,
  category text,
  description text,
  "orderId" text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);

-- 5. جدول مستخدمي النظام المحليين
CREATE TABLE IF NOT EXISTS public.users (
  id text PRIMARY KEY,
  name text,
  phone text,
  role text,
  permissions jsonb DEFAULT '[]'::jsonb,
  "staffRoles" jsonb DEFAULT '[]'::jsonb,
  "variableTasks" jsonb DEFAULT '[]'::jsonb,
  email text,
  password text,
  "jobTitle" text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to users" ON public.users FOR ALL USING (true) WITH CHECK (true);

-- 6. جدول الصنايعية / العمالة
CREATE TABLE IF NOT EXISTS public.workers (
  id text PRIMARY KEY,
  name text NOT NULL,
  "totalFinishedItems" numeric DEFAULT 0,
  "totalOwed" numeric DEFAULT 0,
  "totalPaid" numeric DEFAULT 0,
  "remainingBalance" numeric DEFAULT 0,
  payments jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to workers" ON public.workers FOR ALL USING (true) WITH CHECK (true);

-- 7. جدول وارد الإنتاج
CREATE TABLE IF NOT EXISTS public.production_intakes (
  id text PRIMARY KEY,
  date text,
  "workerId" text,
  "workerName" text,
  "productId" text,
  "productName" text,
  quantity numeric DEFAULT 0,
  "costPerUnit" numeric DEFAULT 0,
  "totalCost" numeric DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.production_intakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to production_intakes" ON public.production_intakes FOR ALL USING (true) WITH CHECK (true);

-- 8. جدول حركات المخزون
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id text PRIMARY KEY,
  date text,
  "productId" text,
  "productName" text,
  "variantId" text,
  "variantDesc" text,
  type text,
  quantity numeric DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to inventory_movements" ON public.inventory_movements FOR ALL USING (true) WITH CHECK (true);

-- 9. جدول المصاريف العامة
CREATE TABLE IF NOT EXISTS public.general_expenses (
  id text PRIMARY KEY,
  date text,
  category text,
  amount numeric DEFAULT 0,
  description text,
  "paidTo" text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.general_expenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow full access to general_expenses" ON public.general_expenses FOR ALL USING (true) WITH CHECK (true);
