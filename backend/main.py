import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, Float, Date, String
from sqlalchemy.orm import sessionmaker, declarative_base
import openai

# Set up OpenAI API key from environment
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Database configuration (adjust DATABASE_URL as needed)
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://user:password@localhost:5432/microeternity")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# SQLAlchemy model for Sales Reports
class SalesReport(Base):
    __tablename__ = "sales_reports"
    id = Column(Integer, primary_key=True, index=True)
    report_date = Column(Date)
    revenue = Column(Float)
    orders = Column(Integer)
    region = Column(String)

# Create tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Micro Eternity BI API")

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"message": "Micro Eternity BI API is running"}

@app.get("/sales_reports")
def get_sales_reports():
    session = SessionLocal()
    try:
        reports = session.query(SalesReport).all()
        results = [
            {
                "id": r.id,
                "report_date": r.report_date.isoformat(),
                "revenue": r.revenue,
                "orders": r.orders,
                "region": r.region,
            }
            for r in reports
        ]
        return {"sales_reports": results}
    finally:
        session.close()

@app.post("/chat")
def chat_with_ai(chat_request: ChatRequest):
    user_message = chat_request.message
    # Prepare a prompt instructing GPT-4 to summarize real-time sales reports
    prompt = (
        f"Using the latest sales reports data from our database, provide a concise summary "
        f"of our current sales performance. User question: '{user_message}'. "
        "Assume data format: Date, Revenue, Orders, Region."
    )
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful BI assistant."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=150,
        )
        ai_response = response.choices[0].message["content"]
        return {"response": ai_response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
