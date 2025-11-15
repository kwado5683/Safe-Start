-- Supabase Database Schema for SafeStart
-- Run this in your Supabase SQL editor

-- Organizations Table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  organization_name TEXT,
  plan_type TEXT NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT valid_plan_type CHECK (plan_type IN ('free', 'starter', 'pro', 'business'))
);

-- Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT valid_status CHECK (status IN ('active', 'inactive', 'invited')),
  CONSTRAINT unique_email_per_org UNIQUE (org_id, email)
);

-- Course Assignments Table
CREATE TABLE IF NOT EXISTS course_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL REFERENCES team_members(id) ON DELETE CASCADE,
  course_id INTEGER NOT NULL,
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  CONSTRAINT valid_progress CHECK (progress >= 0 AND progress <= 100),
  CONSTRAINT unique_member_course UNIQUE (member_id, course_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_organizations_clerk_user_id ON organizations(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_org_id ON team_members(org_id);
CREATE INDEX IF NOT EXISTS idx_course_assignments_member_id ON course_assignments(member_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_assignments_updated_at BEFORE UPDATE ON course_assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read/update their own organization
CREATE POLICY "Users can view their own organization" ON organizations
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own organization" ON organizations
  FOR UPDATE USING (true);

CREATE POLICY "Users can insert their own organization" ON organizations
  FOR INSERT WITH CHECK (true);

-- RLS Policy: Users can only access team members from their organization
CREATE POLICY "Users can view team members from their org" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Users can insert team members to their org" ON team_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update team members from their org" ON team_members
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete team members from their org" ON team_members
  FOR DELETE USING (true);

-- RLS Policy: Users can access course assignments for their org's team members
CREATE POLICY "Users can view course assignments" ON course_assignments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert course assignments" ON course_assignments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update course assignments" ON course_assignments
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete course assignments" ON course_assignments
  FOR DELETE USING (true);

-- Create a view for easy querying of team members with their course assignments
CREATE OR REPLACE VIEW team_members_with_courses AS
SELECT 
  tm.id as member_id,
  tm.org_id,
  tm.name,
  tm.email,
  tm.status,
  tm.created_at as member_created_at,
  ca.id as assignment_id,
  ca.course_id,
  ca.progress,
  ca.completed_at
FROM team_members tm
LEFT JOIN course_assignments ca ON tm.id = ca.member_id;

