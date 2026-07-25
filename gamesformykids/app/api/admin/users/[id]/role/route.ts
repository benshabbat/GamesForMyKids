import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/requireAdmin';
import { logError } from '@/lib/utils/errorUtils';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  // Outside the try/catch: unauthorized()/forbidden() throw a special
  // Next.js control-flow error that must propagate, not be swallowed as a 500.
  const { supabase, user } = await requireAdmin();

  try {
    const { id } = await params;

    if (id === user.id) {
      return NextResponse.json({ success: false, error: 'לא ניתן לשנות הרשאה לחשבון שלך' }, { status: 400 });
    }

    const body = await request.json();
    const role = body?.role;
    if (role !== 'user' && role !== 'admin') {
      return NextResponse.json({ success: false, error: 'תפקיד לא תקין' }, { status: 400 });
    }

    const { error } = await supabase.from('profiles').update({ role }).eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    logError('[Admin Set Role] Error:', error);
    return NextResponse.json({ success: false, error: 'משהו השתבש' }, { status: 500 });
  }
}
