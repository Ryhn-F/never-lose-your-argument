#!/usr/bin/env python3
"""
Test script to verify CORS configuration works correctly
"""
import sys
sys.path.append('.')

from app import create_app
from app.core.config import DevelopmentConfig

def test_cors_preflight():
    """Test CORS preflight requests"""
    try:
        app = create_app(DevelopmentConfig)
        with app.test_client() as client:
            # Test preflight request for analysis endpoint
            response = client.options('/api/v1/analysis/', 
                                    headers={
                                        'Origin': 'http://localhost:3000',
                                        'Access-Control-Request-Method': 'POST',
                                        'Access-Control-Request-Headers': 'Content-Type'
                                    })
            
            print(f"Analysis preflight status: {response.status_code}")
            print(f"CORS headers: {dict(response.headers)}")
            
            # Test preflight request for health endpoint
            response = client.options('/api/v1/health/', 
                                    headers={
                                        'Origin': 'http://localhost:3000',
                                        'Access-Control-Request-Method': 'GET'
                                    })
            
            print(f"Health preflight status: {response.status_code}")
            print(f"CORS headers: {dict(response.headers)}")
            
            # Test actual POST request
            response = client.post('/api/v1/analysis/', 
                                 json={"text": "test"},
                                 headers={'Origin': 'http://localhost:3000'})
            
            print(f"Analysis POST status: {response.status_code}")
            print(f"CORS headers: {dict(response.headers)}")
            
            return True
            
    except Exception as e:
        print(f"CORS test error: {e}")
        return False

if __name__ == "__main__":
    print("Testing CORS configuration...")
    print("=" * 50)
    
    success = test_cors_preflight()
    if success:
        print("\n🎉 CORS test completed!")
    else:
        print("\n❌ CORS test failed!")