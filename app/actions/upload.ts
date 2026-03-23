'use server';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, getPublicUrl } from '@/lib/r2';
import { nanoid } from 'nanoid';

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) throw new Error('No file provided');

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Generate unique key
    const extension = file.name.split('.').pop() || 'png';
    const key = `events/${nanoid(10)}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || '',
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    return { 
      success: true, 
      url: getPublicUrl(key) 
    };
  } catch (error) {
    console.error('Upload Error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
