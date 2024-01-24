import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return new NextResponse('Code not found', { status: 400 });
  }

  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    return new NextResponse('Server environment variables not set', { status: 500 });
  }

  // Exchange the code for a token
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    return new NextResponse('Failed to retrieve access token', { status: 500 });
  }

  // Fetch user profile
  const userProfileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userProfile = await userProfileResponse.json();

  // Redirect back to the new user page with the GitHub username as a query parameter
  const baseUrl = req.nextUrl.origin;
  const redirectUrl = `${baseUrl}/user/new?githubUsername=${encodeURIComponent(userProfile.login)}`;
  return NextResponse.redirect(redirectUrl);
}
