import psycopg2

db_connection = psycopg2.connect("postgres://posifi:posifiposifi@posifi-db.c5jlfkn2l4jz.sa-east-1.rds.amazonaws.com/posifi")


def create_tables():
    cursor = db_connection.cursor()
    cursor.execute(
        """
        CREATE TABLE piece(
            piece_id serial PRIMARY KEY,
            location_name TEXT,
            description TEXT,
            audio_url TEXT,
            image_url TEXT
        );
        """
    )
    db_connection.commit()
    cursor.close()


def add_piece(piece_dict):
    cursor = db_connection.cursor()
    cursor.execute(
        """
        INSERT INTO piece (location_name, description, audio_url, image_url) VALUES(%s, %s, %s, %s);
        """,
        (
            piece_dict['location_name'],
            piece_dict['description'],
            piece_dict['audio_url'],
            piece_dict['image_url']
        )
    )
    db_connection.commit()
    cursor.close()


def delete_piece(piece_id):
    cursor = db_connection.cursor()
    cursor.execute(
        """
        DELETE FROM piece WHERE piece_id=%s;
        """,
        (piece_id,)
    )
    db_connection.commit()
    cursor.close()


def edit_piece(piece_id, piece_dict):
    cursor = db_connection.cursor()
    cursor.execute(
        """
        UPDATE piece SET location_name=%s, description=%s, audio_url=%s, image_url=%s
        WHERE piece_id = %s;
        """,
        (
            piece_dict['location_name'],
            piece_dict['description'],
            piece_dict['audio_url'],
            piece_dict['image_url'],
            piece_id
        )
    )
    db_connection.commit()
    cursor.close()


def get_all_pieces():
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM piece;")
    all_pieces = cursor.fetchall()
    pieces = []
    for raw_piece in all_pieces:
        pieces.append(serialize_piece(raw_piece))

    return pieces


def get_piece(piece_id):
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM piece WHERE piece_id = %s;", (piece_id,))
    raw_piece = cursor.fetchone()

    return serialize_piece(raw_piece)


def serialize_piece(raw_piece):
    return {
        "piece_id": raw_piece[0],
        "location_name": raw_piece[1],
        "description": raw_piece[2],
        "audio_url": raw_piece[3],
        "image_url": raw_piece[4]
    }
