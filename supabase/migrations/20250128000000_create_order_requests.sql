-- Order requests table for ESteam order request form
create table if not exists public.order_requests (
  id uuid primary key default gen_random_uuid(),
  customer_type text not null check (customer_type in ('new', 'existing')),
  items text[] not null,
  tshirt_colors text[],
  product_options text,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  preferred_contact_method text[] not null,
  questions_comments text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Optional: enable RLS and allow anon insert (if using anon key for form submission)
alter table public.order_requests enable row level security;

create policy "Allow anonymous insert for order requests"
  on public.order_requests for insert
  to anon
  with check (true);

-- Allow authenticated or service role to read
create policy "Allow read for authenticated"
  on public.order_requests for select
  to authenticated
  using (true);

create policy "Allow service role full access"
  on public.order_requests for all
  to service_role
  using (true)
  with check (true);
