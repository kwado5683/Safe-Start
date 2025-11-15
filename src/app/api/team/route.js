/**
 * Team Members API
 * Handles listing and adding team members with plan limit enforcement
 */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { canAddTeamMember, getStaffLimit } from '@/lib/plans';

// GET - List all team members for the organization
export async function GET(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (orgError || !org) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Get all team members with their course assignments
    const { data: members, error: membersError } = await supabase
      .from('team_members')
      .select(`
        *,
        course_assignments (
          id,
          course_id,
          progress,
          completed_at
        )
      `)
      .eq('org_id', org.id)
      .order('created_at', { ascending: false });

    if (membersError) {
      console.error('Error fetching team members:', membersError);
      return NextResponse.json(
        { error: 'Failed to fetch team members' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      members: members || [],
      organization: org
    });

  } catch (error) {
    console.error('Error in team GET:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Add a new team member
export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Get organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (orgError || !org) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    // Count current active team members
    const { count: currentCount, error: countError } = await supabase
      .from('team_members')
      .select('*', { count: 'exact', head: true })
      .eq('org_id', org.id)
      .eq('status', 'active');

    if (countError) {
      console.error('Error counting team members:', countError);
      return NextResponse.json(
        { error: 'Failed to check team member limit' },
        { status: 500 }
      );
    }

    // Check if can add more members based on plan
    if (!canAddTeamMember(currentCount, org.plan_type)) {
      const limit = getStaffLimit(org.plan_type);
      return NextResponse.json(
        { 
          error: 'Team member limit reached',
          message: `Your ${org.plan_type} plan allows up to ${limit} team members. Please upgrade your plan to add more.`,
          currentCount,
          limit
        },
        { status: 403 }
      );
    }

    // Check if email already exists in this organization
    const { data: existingMember } = await supabase
      .from('team_members')
      .select('*')
      .eq('org_id', org.id)
      .eq('email', email)
      .single();

    if (existingMember) {
      return NextResponse.json(
        { error: 'A team member with this email already exists' },
        { status: 409 }
      );
    }

    // Add team member
    const { data: newMember, error: createError } = await supabase
      .from('team_members')
      .insert({
        org_id: org.id,
        name,
        email,
        status: 'active'
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating team member:', createError);
      return NextResponse.json(
        { error: 'Failed to add team member', details: createError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      member: newMember,
      message: 'Team member added successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in team POST:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


