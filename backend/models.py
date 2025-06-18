from extensions import db

class Seat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    section = db.Column(db.String(50), nullable=False)
    row = db.Column(db.String(10), nullable=False)
    seat_number = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    is_available = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "section": self.section,
            "row": self.row,
            "seat_number": self.seat_number,
            "price": self.price,
            "is_available": self.is_available
        }
