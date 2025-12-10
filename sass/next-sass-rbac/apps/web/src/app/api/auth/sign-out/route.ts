import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {

  (await cookies()).delete('token')

  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/auth/sign-in'

  return NextResponse.redirect(redirectURL)
}