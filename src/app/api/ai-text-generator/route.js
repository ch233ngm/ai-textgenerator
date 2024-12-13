import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
// import { HttpsProxyAgent } from 'https-proxy-agent';
export async function POST(request) {
    try {
        const { textPrompt } = await request.json();
        console.log(`${textPrompt} 开始生成...`);
        // const proxyUrl = 'http://127.0.0.1:7890';  // 代理地址
        // const agent = new HttpsProxyAgent(proxyUrl);
        const aiResponse = await fetch(`${process.env.API_URL}`, {
            // agent,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textPrompt: textPrompt }), // 使用 imageUrl 作为 prompt
        });
        const aiData = await aiResponse.json();
        // 构造并返回 NextResponse
        return NextResponse.json(aiData);
    } catch (error) {
        return NextResponse.json({ error: 'AI text generation failed' }, { status: 500 });
    }
}