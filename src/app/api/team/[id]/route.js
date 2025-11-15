/**
 * Individual Team Member API
 * Handles updating and deleting team members
 */
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

// DELETE - Remove a team member
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

    // Verify the team member belongs to this organization
    const { data: member, error: memberError } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .eq('org_id', org.id)
      .single();

    if (memberError || !member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Delete the team member (cascade will delete course assignments)
    const { error: deleteError } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting team member:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete team member' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Team member deleted successfully'
    });

  } catch (error) {
    console.error('Error in team DELETE:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update a team member
export async function PATCH(request, { params }) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { name, email, status } = body;

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

    // Verify the team member belongs to this organization
    const { data: member, error: memberError } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .eq('org_id', org.id)
      .single();

    if (memberError || !member) {
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 }
      );
    }

    // Update the team member
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (status !== undefined) updateData.status = status;

    const { data: updatedMember, error: updateError } = await supabase
      .from('team_members')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating team member:', updateError);
      return NextResponse.json(
        { error: 'Failed to update team member' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      member: updatedMember,
      message: 'Team member updated successfully'
    });

  } catch (error) {
    console.error('Error in team PATCH:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


