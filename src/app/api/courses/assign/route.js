/**
 * Course Assignment API
 * Assigns courses to team members with plan-based filtering
 */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import { isCourseAvailable } from '@/lib/plans';

// POST - Assign a course to a team member
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
    const { memberId, courseId } = body;

    if (!memberId || !courseId) {
      return NextResponse.json(
        { error: 'Member ID and Course ID are required' },
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

    // Check if course is available for the organization's plan
    if (!isCourseAvailable(courseId, org.plan_type)) {
      return NextResponse.json(
        { 
          error: 'Course not available',
          message: `This course is not available in your ${org.plan_type} plan. Please upgrade to access all courses.`
        },
        { status: 403 }
      );
    }

    // Verify the team member belongs to this organization
    const { data: member, error: memberError } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', memberId)
      .eq('org_id', org.id)
      .single();

    if (memberError || !member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Check if assignment already exists
    const { data: existingAssignment } = await supabase
      .from('course_assignments')
      .select('*')
      .eq('member_id', memberId)
      .eq('course_id', courseId)
      .single();

    if (existingAssignment) {
      return NextResponse.json(
        { error: 'Course already assigned to this member' },
        { status: 409 }
      );
    }

    // Create assignment
    const { data: assignment, error: assignError } = await supabase
      .from('course_assignments')
      .insert({
        member_id: memberId,
        course_id: courseId,
        progress: 0
      })
      .select()
      .single();

    if (assignError) {
      console.error('Error creating assignment:', assignError);
      return NextResponse.json(
        { error: 'Failed to assign course', details: assignError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      assignment,
      message: 'Course assigned successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in course assignment POST:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


