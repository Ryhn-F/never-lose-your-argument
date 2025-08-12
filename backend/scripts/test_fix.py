#!/usr/bin/env python3
"""
Test script to verify the fixes for 503 and 500 errors
"""
import os
import sys
sys.path.append('.')

from app.services.llm_service import LLMService
from app.core.config import Config

def test_config():
    """Test configuration loading"""
    try:
        config = Config()
        print(f"✓ Config loaded successfully")
        print(f"  - LLM Model: {config.LLM_MODEL}")
        print(f"  - LLM Provider: {config.LLM_PROVIDER}")
        print(f"  - Google API Key: {'Set' if config.GOOGLE_API_KEY else 'Not set'}")
        return True
    except Exception as e:
        print(f"✗ Config error: {e}")
        return False

def test_llm_service():
    """Test LLM service initialization"""
    try:
        service = LLMService()
        print(f"✓ LLM Service initialized")
        
        # Test health check
        is_healthy = service.health_check()
        print(f"{'✓' if is_healthy else '✗'} Health check: {'Healthy' if is_healthy else 'Unhealthy'}")
        
        return is_healthy
    except Exception as e:
        print(f"✗ LLM Service error: {e}")
        return False

def test_analysis():
    """Test text analysis"""
    try:
        service = LLMService()
        result = service.analyze_text("This is a simple test.")
        print(f"✓ Analysis completed")
        print(f"  - Sentiment: {result.sentiment}")
        print(f"  - Language: {result.language}")
        print(f"  - Processing time: {result.processing_time:.2f}s")
        print(f"  - Model used: {result.model_used}")
        return True
    except Exception as e:
        print(f"✗ Analysis error: {e}")
        return False

if __name__ == "__main__":
    print("Testing fixes for 503 and 500 errors...")
    print("=" * 50)
    
    # Test configuration
    config_ok = test_config()
    print()
    
    # Test LLM service
    if config_ok:
        service_ok = test_llm_service()
        print()
        
        # Test analysis
        if service_ok:
            analysis_ok = test_analysis()
            print()
            
            if analysis_ok:
                print("🎉 All tests passed! The application should work correctly now.")
            else:
                print("❌ Analysis test failed. Check the LLM configuration.")
        else:
            print("❌ LLM service test failed. Check the API key and model configuration.")
    else:
        print("❌ Configuration test failed. Check your .env file.")