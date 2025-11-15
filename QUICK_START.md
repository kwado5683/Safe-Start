# Quick Start Guide

## 🚀 Get Your Freemium Platform Running in 5 Minutes

### Step 1: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Then add your actual values:

```bash
# Clerk (you already have these)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Supabase (get these from supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

### Step 2: Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for project to be ready (~2 minutes)
4. Go to **SQL Editor** in the left menu
5. Click **New query**
6. Copy the entire contents of `supabase-schema.sql`
7. Paste and click **Run**
8. You should see "Success. No rows returned"

### Step 3: Get Supabase Credentials

1. In Supabase, go to **Settings** → **API**
2. Copy the following values to your `.env.local`:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Install Dependencies (if needed)

```bash
npm install
```

### Step 5: Start the Development Server

```bash
npm run dev
```

### Step 6: Test the User Flow

1. Visit `http://localhost:3000`
2. Scroll to the pricing section
3. Click **"Start Free"** on the Free tier
4. Sign up with any email (use Clerk test mode)
5. You'll be redirected to `/dashboard`
6. Try adding team members (max 2 on free plan)
7. Assign courses (only 2 courses available on free)
8. Try to add a 3rd member → see upgrade prompt
9. Click **"Upgrade Plan"** to see paid options

---

## 🎯 What You Can Do Now

### As a Free User:
- ✅ Sign up instantly
- ✅ Access dashboard
- ✅ Add up to 2 team members
- ✅ Assign 2 courses (General Health & Safety, Manual Handling)
- ✅ Track progress
- ✅ Manage certificates
- ✅ See upgrade prompts when hitting limits

### After Upgrading (Demo):
- ✅ Add 10, 50, or unlimited team members
- ✅ Access all 12 courses
- ✅ All the same features plus more capacity

---

## 📱 Pages You Can Visit

- `/` - Homepage with pricing
- `/dashboard` - Overview (requires sign-in)
- `/dashboard/team` - Team management
- `/dashboard/courses` - Course assignments
- `/dashboard/upgrade` - Plan comparison
- `/checkout?plan=starter` - Checkout for Starter plan

---

## 🎨 Key Features to Demo

1. **Freemium Onboarding**: Click "Start Free" → Auto sign-up → Instant dashboard access
2. **Limit Enforcement**: Try adding 3rd team member → Blocked with upgrade prompt
3. **Course Filtering**: Free users only see 2 courses in assignment modal
4. **Usage Tracking**: See real-time "2/2 team members" progress bars
5. **Upgrade Path**: Clear CTAs to upgrade when hitting limits

---

## ⚡ Troubleshooting

### "Organization not found" Error
- Make sure Supabase is configured
- Check that the SQL schema was executed successfully
- Verify environment variables are correct

### Can't Add Team Members
- Check the console for API errors
- Verify Supabase connection
- Check if you're at your plan limit (2 for free)

### Sign-In Issues
- Verify Clerk environment variables
- Check that you're using the correct Clerk instance
- Try clearing cookies and signing in again

---

## 🎉 You're All Set!

Your freemium B2B platform is ready to:
- Acquire users with a generous free tier
- Convert them to paid plans when they need more capacity
- Manage teams and training at scale

For detailed information, see `IMPLEMENTATION_SUMMARY.md`.

For database setup details, see `DATABASE_SETUP.md`.

Happy building! 🚀


