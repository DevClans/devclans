// pages/api/check-membership.ts

import { NextRequest, NextResponse } from 'next/server';
import checkServerMembership from '../middleware/checkServerMembership/route';

export async function GET(req: NextRequest, res: NextResponse) {
  const userDiscordId = 'siddhantfr#0000'; // Replace with the actual Discord user ID you want to check
  const result = await checkServerMembership(req, res, userDiscordId);

  // Log the result or send it as a response
  console.log('Result:', result.body);

  // Send a response based on the result
  if (result.status === 200) {
    return new NextResponse(JSON.stringify({ result: 'User is a member of the required Discord server and has the specified Discord ID' }), { headers: { 'Content-Type': 'application/json' } });
  } else {
    return new NextResponse(JSON.stringify({ result: 'User is not a member of the required Discord server or does not have the specified Discord ID' }), { headers: { 'Content-Type': 'application/json' } });
  }
}
