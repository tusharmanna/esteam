# Supabase setup

## Order requests table

To persist the ESteam order request form, create the `order_requests` table in your Supabase project:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Run the SQL from `migrations/20250128000000_create_order_requests.sql`.

Or, if you use the Supabase CLI:

```bash
supabase db push
```

After the migration, the form on the main page will save submissions to the `order_requests` table.
