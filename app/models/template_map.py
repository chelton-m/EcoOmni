from sqlalchemy import Column, Integer, JSON, DateTime, func

from app.db.database import Base


class TemplateMap(Base):
    __tablename__ = "template_maps"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    client_id = Column(Integer, index=True, nullable=False)
    map_data = Column(JSON, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
