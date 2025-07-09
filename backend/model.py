from sqlalchemy import Column, Integer, String, Date, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Transcript(Base):
    __tablename__ = "transcripts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    location = Column(String)
    created_by = Column(String)
    date = Column(Date)
    project = Column(String)
    purpose = Column(Text)
    attendees = Column(Text)

    transcript_lines = relationship(
        "TranscriptLine",
        back_populates="transcript_record",
        cascade="all, delete-orphan"
    )

class TranscriptLine(Base):
    __tablename__ = "transcript_lines"

    id = Column(Integer, primary_key=True, index=True)
    transcript_id = Column(Integer, ForeignKey("transcripts.id", ondelete="CASCADE"))
    transcript = Column(Text, nullable=False)

    transcript_record = relationship("Transcript", back_populates="transcript_lines")
