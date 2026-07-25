import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { createAdminClient } from '@/lib/supabase/adminClient';
import { logError } from '@/lib/utils/errorUtils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { user } = await requireAdmin();

  try {
    const { id } = await params;

    if (id === user.id) {
      return NextResponse.json({ success: false, error: 'לא ניתן למחוק את החשבון שלך' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.deleteUser(id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    logError('[Admin Delete User] Error:', error);
    return NextResponse.json({ success: false, error: 'משהו השתבש' }, { status: 500 });
  }
}
