'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

function readId(formData: FormData, field: string) {
  const value = formData.get(field);
  const id = typeof value === 'string' ? Number(value) : Number.NaN;
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('A valid class selection is required.');
  }
  return id;
}

async function findCurrentUserId(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (!user) {
    redirect('/auth/signin');
  }
  return user.id;
}

export async function addClass(formData: FormData) {
  const currentUser = await loggedInProtectedPage();
  const classOfferingId = readId(formData, 'classOfferingId');
  const classOffering = await prisma.classOffering.findUnique({
    where: { id: classOfferingId },
  });

  if (!classOffering) {
    throw new Error('The selected class is not in the catalog.');
  }

  const userId = await findCurrentUserId(currentUser.email);
  await prisma.savedClass.upsert({
    where: { userId_classOfferingId: { userId, classOfferingId } },
    update: {},
    create: { userId, classOfferingId },
  });

  revalidatePath('/classes');
  revalidatePath('/classes/add');
  redirect('/classes');
}

export async function removeClass(formData: FormData) {
  const currentUser = await loggedInProtectedPage();
  const userId = await findCurrentUserId(currentUser.email);
  const id = readId(formData, 'id');
  const deleted = await prisma.savedClass.deleteMany({
    where: { id, userId },
  });

  if (deleted.count === 0) {
    throw new Error('The saved class was not found.');
  }

  revalidatePath('/classes');
  redirect('/classes');
}
