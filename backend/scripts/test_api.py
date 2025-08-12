#!/usr/bin/env python3
"""
Simple script to test the API manually
"""
import requests
import json

BASE_URL = "http://localhost:5000/api/v1"

def test_health():
    """Test health endpoint"""
    print("Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health/")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    print("-" * 50)

def test_analysis():
    """Test analysis endpoint"""
    print("Testing analysis endpoint...")
    
    test_text = """Jangan percaya pada apa yang dia katakan, dia kan mantan kriminal! 
    Semua yang dia ucapkan pasti bohong. Saya sudah kenal dia sejak lama, dan dia selalu menipu orang-orang di sekitarnya.
    Lebih baik kamu percaya pada saya karena saya lulusan universitas ternama."""
    
    data = {"text": test_text}
    
    try:
        response = requests.post(f"{BASE_URL}/analysis/", json=data)
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"Sentiment: {result.get('sentiment')}")
            print(f"Contains Fallacies: {result.get('contains_fallacies')}")
            print(f"Aggressiveness: {result.get('aggressiveness')}")
            print(f"Language: {result.get('language')}")
            print(f"Processing Time: {result.get('processing_time')}s")
            
            if result.get('fallacies'):
                print("\nFallacies found:")
                for i, fallacy in enumerate(result['fallacies'], 1):
                    print(f"{i}. {fallacy['type']}")
                    print(f"   Text: \"{fallacy['text']}\"")
                    print(f"   Explanation: {fallacy['explanation']}")
        else:
            print(f"Error: {response.json()}")
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API. Make sure the server is running.")
    except Exception as e:
        print(f"Error: {e}")
    
    print("-" * 50)

if __name__ == "__main__":
    print("Testing Never Lose Argument API")
    print("=" * 50)
    
    test_health()
    test_analysis()