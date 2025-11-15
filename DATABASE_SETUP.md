# Database Setup Guide

This guide will help you set up the Supabase database for SafeStart.

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project in your Supabase dashboard

## Step 1: Get Your Environment Variables

From your Supabase project dashboard:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use as `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root (copy from `.env.example`):

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Step 3: Run the Database Schema

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Click **New query**
4. Copy the contents of `supabase-schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the schema

This will create:
- `organizations` table
- `team_members` table
- `course_assignments` table
- Necessary indexes
- Row Level Security (RLS) policies
- Triggers for automatic timestamp updates
- A helpful view for querying team members with courses

## Step 4: Verify Setup

After running the schema, verify in your Supabase dashboard:

1. Go to **Table Editor** - you should see 3 tables
2. Go to **Database** → **Policies** - you should see RLS policies enabled

## Database Schema Overview

### Organizations Table
Stores organization/company information and their subscription plan.

- `id` - Unique organization ID
- `clerk_user_id` - Links to Clerk authentication
- `organization_name` - Company name
- `plan_type` - Current plan (free, starter, pro, business)
- `stripe_customer_id` - For payment processing
- `stripe_subscription_id` - For subscription management

### Team Members Table
Stores staff members within each organization.

- `id` - Unique member ID
- `org_id` - References organization
- `name` - Staff member name
- `email` - Staff member email
- `status` - active, inactive, or invited

### Course Assignments Table
Tracks which courses are assigned to team members and their progress.

- `id` - Unique assignment ID
- `member_id` - References team member
- `course_id` - The course ID (1-14)
- `progress` - Percentage complete (0-100)
- `completed_at` - Timestamp when completed

## Plan Limits

The application enforces the following limits:

| Plan     | Price/month | Staff Limit | Courses Available |
|----------|-------------|-------------|-------------------|
| Free     | £0          | 2           | 2 (IDs 1-2)      |
| Starter  | £39         | 10          | All courses      |
| Pro      | £99         | 50          | All courses      |
| Business | £199        | Unlimited   | All courses      |

These limits are enforced in the application code (see `src/lib/plans.js`).


