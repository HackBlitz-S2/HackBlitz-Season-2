import google.generativeai as genai
from rest_framework.decorators import api_view
from rest_framework.response import Response

genai.configure(api_key="YOUR_GEMINI_API_KEY")

@api_view(['POST'])
def ai_chatbot(request):
    user_query = request.data.get('query', '')
    prompt = f"You are a financial assistant. Answer: {user_query}"
    response = genai.generate_text(prompt)
    return Response({"reply": response.text})
