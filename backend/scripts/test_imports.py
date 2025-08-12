#!/usr/bin/env python3
"""
Test script to verify all imports work correctly
"""

def test_imports():
    """Test all critical imports"""
    try:
        print("Testing imports...")
        
        # Test Flask imports
        from flask import Flask, Blueprint, request, jsonify
        print("✓ Flask imports OK")
        
        # Test LangChain imports
        from langchain.chat_models import init_chat_model
        from langchain_core.prompts import ChatPromptTemplate
        print("✓ LangChain imports OK")
        
        # Test Pydantic imports
        from pydantic import BaseModel, Field
        print("✓ Pydantic imports OK")
        
        # Test Marshmallow imports
        from marshmallow import Schema, fields, validate
        print("✓ Marshmallow imports OK")
        
        # Test app imports
        from app.core.config import Config
        from app.core.exceptions import APIException, ValidationError
        from app.services.llm_service import LLMService
        print("✓ App imports OK")
        
        return True
        
    except ImportError as e:
        print(f"✗ Import error: {e}")
        return False
    except Exception as e:
        print(f"✗ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = test_imports()
    if success:
        print("\n🎉 All imports successful!")
    else:
        print("\n❌ Import test failed!")