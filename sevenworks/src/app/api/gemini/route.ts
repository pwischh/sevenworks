import { NextRequest, NextResponse } from "next/server";

// API key is now only accessible server-side
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_IMAGE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent';
const GEMINI_TEXT_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function POST(req: NextRequest) {
  try {
    const { type, prompt } = await req.json();
    
    // Choose the appropriate API endpoint based on request type
    const apiUrl = type === 'image' 
      ? `${GEMINI_IMAGE_API_URL}?key=${GEMINI_API_KEY}`
      : `${GEMINI_TEXT_API_URL}?key=${GEMINI_API_KEY}`;
    
    const requestBody = type === 'image' 
      ? {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['Image'] }
        }
      : {
          contents: [{ 
            parts: [{ 
              text: type === 'resume' 
                ? `You are a professional resume advisor. Provide concise advice on improving this resume content: ${prompt}` 
                : prompt 
            }] 
          }]
        };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    
    const data = await response.json();
    
    // Return the response from Gemini to the client
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in Gemini API route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}