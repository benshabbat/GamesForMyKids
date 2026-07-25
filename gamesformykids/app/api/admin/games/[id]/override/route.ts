import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { logError } from '@/lib/utils/errorUtils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const VALID_STATUSES = ['visible', 'hidden', 'featured'];

export async function POST(request: Request, { params }: RouteParams) {
  const { supabase, user } = await requireAdmin();

  try {
    const { id } = await params;
    const body = await request.json();
    const status = body?.status;

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ success: false, error: 'סטטוס לא תקין' }, { status: 400 });
    }

    const { error } = await supabase
      .from('game_overrides')
      .upsert({ game_id: id, status, updated_by: user.id });
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    logError('[Admin Game Override] Error:', error);
    return NextResponse.json({ success: false, error: 'משהו השתבש' }, { status: 500 });
  }
}
