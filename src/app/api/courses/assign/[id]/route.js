/**
 * Individual Course Assignment API
 * Handles deleting and updating course assignments
 */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

// DELETE - Remove a course assignment
export async function DELETE(request, { params }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

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

    // Verify the assignment belongs to this organization's team member
    const { data: assignment, error: assignError } = await supabase
      .from('course_assignments')
      .select(`
        *,
        team_members!inner (
          org_id
        )
      `)
      .eq('id', id)
      .single();

    if (assignError || !assignment || assignment.team_members.org_id !== org.id) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Delete the assignment
    const { error: deleteError } = await supabase
      .from('course_assignments')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting assignment:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete assignment' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Assignment removed successfully'
    });

  } catch (error) {
    console.error('Error in assignment DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


