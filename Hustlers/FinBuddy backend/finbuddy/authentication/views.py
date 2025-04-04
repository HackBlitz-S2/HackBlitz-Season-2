from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework import status
from .serializer import RegisterSerializer

User = get_user_model()  # Get the custom user model

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "User registered successfully",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
          # ✅ Redirect URL for frontend
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)  # Get user by email
    except User.DoesNotExist:
        return Response({'error': 'Invalid Credentials'}, status=400)

    user = authenticate(username=user.email, password=password)

    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "redirect_url": "dashboard.html"  # ✅ Redirect after login
        }, status=200)

    return Response({'error': 'Invalid Credentials'}, status=400)
