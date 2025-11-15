/**
 * Organization Plan API
 * Get current plan details and usage statistics
 */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { getPlanDetails } from '@/lib/plans';

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

    // Get team member count
    const { count: memberCount, error: countError } = await supabase
      .from('team_members')
      .select('*', { count: 'exact', head: true })
      .eq('org_id', org.id)
      .eq('status', 'active');

    if (countError) {
      console.error('Error counting team members:', countError);
      return NextResponse.json(
        { error: 'Failed to get team member count' },
        { status: 500 }
      );
    }

    // Get plan details
    const planDetails = getPlanDetails(org.plan_type);

    return NextResponse.json({
      organization: org,
      plan: planDetails,
      usage: {
        teamMembers: memberCount || 0,
        teamMemberLimit: planDetails.staffLimit
      }
    });

  } catch (error) {
    console.error('Error in organization plan GET:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


