/**
 * Organization Initialization API
 * Creates a new organization record when a user first signs up
 */
import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user details from Clerk
    const user = await currentUser();
    
    // Check if organization already exists
    const { data: existingOrg, error: checkError } = await supabase
      .from('organizations')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (existingOrg) {
      return NextResponse.json({ 
        organization: existingOrg,
        message: 'Organization already exists'
      });
    }

    // Create new organization with free plan
    const { data: newOrg, error: createError } = await supabase
      .from('organizations')
      .insert({
        clerk_user_id: userId,
        organization_name: user.firstName 
          ? `${user.firstName}'s Organization` 
          : 'My Organization',
        plan_type: 'free'
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating organization:', createError);
      return NextResponse.json(
        { error: 'Failed to create organization', details: createError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      organization: newOrg,
      message: 'Organization created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error in organization init:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get organization for current user
    const { data: org, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error fetching organization:', error);
      return NextResponse.json(
        { error: 'Failed to fetch organization', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ organization: org });

  } catch (error) {
    console.error('Error in organization GET:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}


