'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

function readRequiredText(formData: FormData, field: string, label: string) {
  const value = formData.get(field);
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} is required.`);
  }
  return value.trim();
}

function readOptionalText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export async function createNote(formData: FormData) {
  const user = await loggedInProtectedPage();
  const title = readRequiredText(formData, 'title', 'Title');
  const semester = readRequiredText(formData, 'semester', 'Semester');
  const subjcode = readRequiredText(formData, 'subjcode', 'Subject code');
  const crsenumb = readRequiredText(formData, 'crsenumb', 'Course number');
  const section = readOptionalText(formData, 'section');
  const instructor = readOptionalText(formData, 'instructor');
  const textContent = readOptionalText(formData, 'textContent');
  const imageUrl = readOptionalText(formData, 'imageUrl');
  const image = formData.get('image');

  let imageData: Uint8Array<ArrayBuffer> | null = null;
  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith('image/')) {
      throw new Error('The uploaded file must be an image.');
    }
    if (image.size > 5 * 1024 * 1024) {
      throw new Error('The image must be 5 MB or smaller.');
    }
    imageData = Buffer.from(await image.arrayBuffer());
  }

  if (!textContent && !imageUrl && !imageData) {
    throw new Error('Enter note text or provide an image.');
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { id: true },
  });
  if (!dbUser) {
    redirect('/auth/signin');
  }

  await prisma.noteData.create({
    data: {
      title,
      userId: dbUser.id,
      semester,
      subjcode,
      crsenumb,
      section,
      instructor,
      textContent,
      imageUrl,
      imageData,
    },
  });

  revalidatePath('/yournote');
  revalidatePath('/notes');
  redirect('/yournote');
}
