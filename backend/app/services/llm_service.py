import time
from typing import List
from langchain_core.prompts import ChatPromptTemplate
from langchain.chat_models import init_chat_model
from pydantic import BaseModel, Field
from app.core.config import Config
from app.core.exceptions import APIException


class FallacyItem(BaseModel):
    """Pydantic model for fallacy items"""

    text: str = Field(
        description="The exact part of the text that contains the logical fallacy"
    )
    type: str = Field(description="The type of the logical fallacy, only type, and in english")
    explanation: str = Field(
        description="Explanation of why the identified text contains a logical fallacy in english"
    )


class Classification(BaseModel):
    """Pydantic model for text classification results"""

    sentiment: str = Field(description="The sentiment of the text")
    strong: int = Field(description="How strong is the statement on a scale of 1-10")
    contains_fallacies: bool = Field(
        description="Whether the text contains any logical fallacies"
    )
    fallacies: List[FallacyItem] = Field(
        description="List of all logical fallacies found in the text"
    )
    aggressiveness: int = Field(
        description="How aggressive the text is on a scale from 1 to 10"
    )
    language: str = Field(description="The language the text is written in")
    processing_time: float = Field(default=0.0, description="Processing time in seconds")
    model_used: str = Field(default="", description="Model used for analysis")


class LLMService:
    """Service for LLM operations"""

    def __init__(self):
        self.config = Config()
        self._llm = None
        self._structured_llm = None
        self._prompt_template = None

    @property
    def llm(self):
        """Lazy load LLM instance"""
        if self._llm is None:
            try:
                self._llm = init_chat_model(
                    self.config.LLM_MODEL, model_provider=self.config.LLM_PROVIDER
                )
            except Exception as e:
                raise APIException(f"Failed to initialize LLM: {str(e)}")
        return self._llm

    @property
    def structured_llm(self):
        """Get structured LLM with output schema"""
        if self._structured_llm is None:
            self._structured_llm = self.llm.with_structured_output(Classification)
        return self._structured_llm

    @property
    def prompt_template(self):
        """Get prompt template"""
        if self._prompt_template is None:
            self._prompt_template = ChatPromptTemplate.from_template(
                """
Analyze the following paragraph and identify ALL logical fallacies present.

Tasks:
1. Identify all logical fallacies in the paragraph
2. For each fallacy, specify the exact part of the text containing the fallacy
3. Provide the type of fallacy and an explanation for each fallacy

IMPORTANT: If any logical fallacy is found, ensure the field contains_fallacies=True
If no logical fallacy is found, return an empty list of fallacies and contains_fallacies=False

Paragraph:
{input}
                """
            )
        return self._prompt_template

    def analyze_text(self, input_text: str) -> Classification:
        """
        Analyze text for logical fallacies and other properties

        Args:
            input_text: Text to analyze

        Returns:
            Classification: Analysis results

        Raises:
            APIException: If analysis fails
        """
        try:
            start_time = time.time()

            # Create prompt
            prompt = self.prompt_template.invoke({"input": input_text})

            # Get response from LLM
            response = self.structured_llm.invoke(prompt)

            # Calculate processing time
            processing_time = time.time() - start_time

            # Add processing metadata
            response.processing_time = processing_time
            response.model_used = self.config.LLM_MODEL

            return response

        except Exception as e:
            raise APIException(f"Text analysis failed: {str(e)}")

    def health_check(self) -> bool:
        """
        Check if LLM service is healthy

        Returns:
            bool: True if healthy, False otherwise
        """
        try:
            # Simple test with minimal text
            test_response = self.analyze_text("Hello world")
            return test_response is not None
        except Exception as e:
            print(f"Health check failed: {str(e)}")
            return False
