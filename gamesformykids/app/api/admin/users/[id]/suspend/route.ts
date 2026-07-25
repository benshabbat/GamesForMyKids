import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { createAdminClient } from '@/lib/supabase/adminClient';
import { logError } from '@/lib/utils/errorUtils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// Supabase has no literal "permanent" ban — ~100 years stands in for indefinite.
const INDEFINITE_BAN_DURATION = '876000h';

export async function POST(request: Request, { params }: RouteParams) {
  const { user } = await requireAdmin();

  try {
    const { id } = await params;

    if (id === user.id) {
      return NextResponse.json({ success: false, error: 'לא ניתן להשעות את החשבון שלך' }, { status: 400 });
    }

    const body = await request.json();
    const action = body?.action;
    if (action !== 'suspend' && action !== 'unsuspend') {
      return NextResponse.json({ success: false, error: 'פעולה לא תקינה' }, { status: 400 });
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.updateUserById(id, {
      ban_duration: action === 'suspend' ? INDEFINITE_BAN_DURATION : 'none',
    });
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    logError('[Admin Suspend User] Error:', error);
    return NextResponse.json({ success: false, error: 'משהו השתבש' }, { status: 500 });
  }
}
