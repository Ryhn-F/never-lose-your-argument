#!/usr/bin/env python3
"""
Test script to verify Flask routes work correctly
"""
import sys
sys.path.append('.')

from app import create_app
from app.core.config import DevelopmentConfig
import json

def test_health_endpoint():
    """Test health endpoint"""
    try:
        app = create_app(DevelopmentConfig)
        with app.test_client() as client:
            response = client.get('/api/v1/health/')
            print(f"Health endpoint status: {response.status_code}")
            
            if response.status_code in [200, 503]:
                data = response.get_json()
                print(f"Response: {json.dumps(data, indent=2)}")
                return response.status_code == 200
            else:
                print(f"Unexpected status code: {response.status_code}")
                return False
    except Exception as e:
        print(f"Health endpoint error: {e}")
        return False

def test_analysis_endpoint():
    """Test analysis endpoint"""
    try:
        app = create_app(DevelopmentConfig)
        with app.test_client() as client:
            test_data = {"text": "This is a test message."}
            response = client.post('/api/v1/analysis/', 
                                 json=test_data,
                                 content_type='application/json')
            
            print(f"Analysis endpoint status: {response.status_code}")
            
            if response.status_code in [200, 500]:
                data = response.get_json()
                print(f"Response: {json.dumps(data, indent=2)}")
                return response.status_code == 200
            else:
                print(f"Unexpected status code: {response.status_code}")
                return False
    except Exception as e:
        print(f"Analysis endpoint error: {e}")
        return False

if __name__ == "__main__":
    print("Testing Flask routes...")
    print("=" * 50)
    
    # Test health endpoint
    health_ok = test_health_endpoint()
    print()
    
    # Test analysis endpoint
    analysis_ok = test_analysis_endpoint()
    print()
    
    if health_ok and analysis_ok:
        print("🎉 All route tests passed!")
    elif health_ok:
        print("⚠️  Health endpoint works, but analysis endpoint has issues.")
    else:
        print("❌ Both endpoints have issues. Check the configuration and dependencies.")