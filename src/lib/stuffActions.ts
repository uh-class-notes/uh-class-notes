'use server';

import { Condition, Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';

function readStuffValues(formData: FormData) {
  const name = formData.get('name');
  const quantityValue = formData.get('quantity');
  const conditionValue = formData.get('condition');
  const condition = Object.values(Condition).find(
    (value) => value === conditionValue,
  );
  const quantity =
    typeof quantityValue === 'string' ? Number(quantityValue) : Number.NaN;

  if (typeof name !== 'string' || !name.trim() || name.trim().length > 120) {
    throw new Error('Enter a name between 1 and 120 characters.');
  }
  if (!Number.isSafeInteger(quantity) || quantity < 1) {
    throw new Error('Quantity must be a positive whole number.');
  }
  if (!condition) {
    throw new Error('Choose a valid condition.');
  }

  return { name: name.trim(), quantity, condition };
}

function readId(formData: FormData) {
  const value = formData.get('id');
  const id = typeof value === 'string' ? Number(value) : Number.NaN;
  if (!Number.isSafeInteger(id) || id < 1) {
    throw new Error('A valid item ID is required.');
  }
  return id;
}

function refreshStuffPages() {
  revalidatePath('/');
  revalidatePath('/list');
  revalidatePath('/admin');
}

export async function createStuff(formData: FormData) {
  const user = await loggedInProtectedPage();
  const values = readStuffValues(formData);

  await prisma.stuff.create({
    data: { ...values, owner: user.email },
  });
  refreshStuffPages();
  redirect('/list');
}

export async function updateStuff(formData: FormData) {
  const user = await loggedInProtectedPage();
  const id = readId(formData);
  const existing = await prisma.stuff.findUnique({ where: { id } });

  if (!existing) {
    throw new Error('The requested item does not exist.');
  }
  if (existing.owner !== user.email && user.role !== Role.ADMIN) {
    redirect('/not-authorized');
  }

  await prisma.stuff.update({
    where: { id },
    data: readStuffValues(formData),
  });
  refreshStuffPages();
  redirect(user.role === Role.ADMIN ? '/admin' : '/list');
}

export async function deleteStuff(formData: FormData) {
  const user = await loggedInProtectedPage();
  const id = readId(formData);
  const existing = await prisma.stuff.findUnique({ where: { id } });

  if (!existing) {
    throw new Error('The requested item does not exist.');
  }
  if (existing.owner !== user.email && user.role !== Role.ADMIN) {
    redirect('/not-authorized');
  }

  await prisma.stuff.delete({ where: { id } });
  refreshStuffPages();
  redirect(user.role === Role.ADMIN ? '/admin' : '/list');
}
