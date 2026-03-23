import { NextRequest, NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';

/**
 * Proxy route: /api/r2/events/image-id.png
 * Fetches the object from R2 by key and streams it back with proper headers.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ key: string[] }> }
) {
    const { key: keyParts } = await params;
    const key = keyParts.join('/');
    console.log('R2 Proxy Request:', key);

    try {
        const response = await r2Client.send(
            new GetObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME || '',
                Key: key,
            })
        );

        if (!response.Body) {
            console.error('R2 Proxy: Empty body for key', key);
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        const bytes = await response.Body.transformToByteArray();
        console.log('R2 Proxy: Sending image', key, 'bytes:', bytes.length);

        return new NextResponse(bytes, {
            headers: {
                'Content-Type': response.ContentType || 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error: any) {
        console.error('R2 Proxy error for key', key, ':', error.name, error.message);
        if (error?.name === 'NoSuchKey' || error?.$metadata?.httpStatusCode === 404) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
    }
}

