from flask import Flask, jsonify
from flask_cors import CORS
from extensions import db
from models import Seat
import requests
from datetime import datetime

app = Flask(__name__)


CORS(app, supports_credentials=True)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)


@app.route("/")
def home():
    return {"message": "Concert API homepage"}


@app.route("/api/seats")
def get_seats():
    seats = Seat.query.all()
    return [seat.to_dict() for seat in seats]



@app.route("/api/tm-events")
def tm_events():
    url = "https://app.ticketmaster.com/discovery/v2/events.json"
    params = {
        "apikey": "vZL9zVaxrUcA8fMoaKlVwgp1HpzrBOsn",
        "keyword": "metallica"
    }
    response = requests.get(url, params=params)
    data = response.json()

    events = []
    for event in data.get("_embedded", {}).get("events", []):
        seatmap = event.get("seatmap", {})
        venue = event.get("_embedded", {}).get("venues", [{}])[0]
        start = event.get("dates", {}).get("start", {})

        events.append({
            "id": event.get("id"),
            "name": event.get("name"),
            "image": event.get("images", [{}])[0].get("url"),
            "venue": venue.get("name"),
            "link": event.get("url"),
            "seatmap": event.get("seatmap", {}).get("staticUrl"),
            "date": start.get("dateTime") or start.get("localDate"),
        })

    return jsonify(events)




with app.app_context():
    db.create_all()

    if Seat.query.count() == 0:
        sample_seats = [
            Seat(section="Floor", row="A", seat_number=1, price=150.0),
            Seat(section="A", row="B", seat_number=5, price=120.0),
            Seat(section="B", row="C", seat_number=10, price=95.0, is_available=False),
        ]
        db.session.add_all(sample_seats)
        db.session.commit()


if __name__ == "__main__":
    app.run(debug=True)
