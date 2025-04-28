// No API keys exposed here - all secure server-side communication
// Define interfaces for request and response types
interface GeminiRequestBody {
  contents: { parts: { text: string }[] }[];
  generationConfig?: { responseModalities: string[] };
}

interface GeminiResponseData {
  candidates?: { content: { parts: { inlineData?: { data: string }, text?: string }[] } }[];
}

/**
 * Generate an event image using the Gemini API through our secure server endpoint.
 * @param {string} prompt - The description of the image to generate.
 * @returns {Promise<string>} - The URL of the generated image.
 */
export async function generateEventImage(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'image',
        prompt,
      }),
    });

    const data: GeminiResponseData = await response.json();

    const base64Image = data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Image) {
      return `data:image/png;base64,${base64Image}`;
    } else {
      throw new Error('Failed to generate image: No base64 data returned.');
    }
  } catch (error) {
    console.error('Error generating event image:', error);
    throw error;
  }
}

/**
 * Generate resume text using the Gemini API through our secure server endpoint.
 * @param {string} prompt - The description of the text to generate.
 * @returns {Promise<string>} - The generated text.
 */
export async function generateResumeText(prompt: string): Promise<string> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'resume',
        prompt,
      }),
    });

    const data = await response.json();
    const geminiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (geminiText) {
      return geminiText;
    } else {
      throw new Error('No response from Gemini API.');
    }
  } catch (error) {
    console.error('Error generating resume text:', error);
    throw error;
  }
}
