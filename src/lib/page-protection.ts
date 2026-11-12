import { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import { auth } from './auth';

export async function loggedInProtectedPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/auth/signin');
  }
  return { email: session.user.email, role: session.user.role };
}

export async function adminProtectedPage() {
  const user = await loggedInProtectedPage();
  if (user.role !== Role.ADMIN) {
    redirect('/not-authorized');
  }
  return user;
}
