CREATE TABLE users (id integer primary key, username varchar(45) UNIQUE, password varchar(45));
CREATE TABLE studenti (id integer primary key, id_user INTEGER UNIQUE, matricola varchar(45) UNIQUE, FOREIGN KEY (id_user) REFERENCES users(id));
CREATE TABLE docenti (id integer primary key, id_user INTEGER UNIQUE, FOREIGN KEY (id_user) REFERENCES users(id));
CREATE TABLE segretari (id integer primary key, id_user INTEGER UNIQUE, FOREIGN KEY (id_user) REFERENCES users(id));

CREATE TABLE pubblicazioni (id integer primary key, id_user INTEGER,testo_pubblicazzione TEXT(255), FOREIGN KEY (id_user) REFERENCES users(id));
CREATE TABLE risorse (id integer primary key, id_docente_prenotazione INTEGER, nome_risorsa VARCHAR(45), prenotata BOOLEAN, FOREIGN KEY (id_docente_prenotazione) REFERENCES docenti(id));
CREATE TABLE corsi (id INTEGER primary key, nome_corso VARCHAR(45));
CREATE TABLE lista_corsi_docente (id INTEGER primary key, id_corso INTEGER, id_docente INTEGER, FOREIGN KEY (id_corso) REFERENCES corsi(id),FOREIGN KEY (id_docente) REFERENCES docenti(id));
CREATE TABLE lista_corsi_studente (id INTEGER primary key, id_corso INTEGER, id_studente INTEGER, studente_iscritto_esame BOOLEAN, FOREIGN KEY (id_corso) REFERENCES corsi(id),FOREIGN KEY (id_studente) REFERENCES studente(id));                    