#!/usr/bin/env python3
"""
Test script to verify Google API connectivity
"""
import os
from dotenv import load_dotenv

load_dotenv()

def test_google_api():
    """Test Google API key and connectivity"""
    try:
        import google.generativeai as genai
        
        api_key = os.environ.get("GOOGLE_API_KEY")
        if not api_key:
            print("✗ GOOGLE_API_KEY not found in environment")
            return False
            
        print(f"✓ API Key found: {api_key[:10]}...{api_key[-4:]}")
        
        # Configure the API
        genai.configure(api_key=api_key)
        
        # Test with a simple model
        model = genai.GenerativeModel('gemini-2.0-flash')
        print("✓ Model initialized successfully")
        
        # Test a simple generation
        response = model.generate_content("Hello, world!")
        print("✓ API call successful")
        print(f"Response: {response.text[:100]}...")
        
        return True
        
    except Exception as e:
        print(f"✗ Google API error: {e}")
        return False

if __name__ == "__main__":
    print("Testing Google API connectivity...")
    print("=" * 50)
    
    success = test_google_api()
    if success:
        print("\n🎉 Google API test successful!")
    else:
        print("\n❌ Google API test failed!")