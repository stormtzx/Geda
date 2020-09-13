var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "unipa",
  database: "gestioneAffitti",
});

function crea_tableUtenteCliente() {
  var sql =
    "CREATE TABLE IF NOT EXISTS utenteCliente(nomeC VARCHAR(50) not null, cognomeC VARCHAR(50) not null, emailC VARCHAR(50) not null, passwordC VARCHAR (20) not null, PRIMARY KEY(emailC))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table UTENTE-CLIENTE creata");
  });
}

function crea_tableUtenteProprietario() {
  var sql =
    "CREATE TABLE IF NOT EXISTS utenteProprietario(nomeP VARCHAR(50) not null, cognomeP VARCHAR(50) not null, emailP VARCHAR(50) not null, passwordP VARCHAR (20) not null, PRIMARY KEY(emailP))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table UTENTE-PROPRIETARIO creata");
  });
}

function crea_tableCasa() {
  var sql =
    "CREATE TABLE IF NOT EXISTS casa(id_casa INT AUTO_INCREMENT, nome_casa VARCHAR(50) NOT NULL, indirizzo VARCHAR(100) not null, citta VARCHAR(100) not null, proprietario VARCHAR(50) references utenteProprietario(emailP), beb boolean, casa_vacanza boolean, numero_camere int, numero_bagno int, perimetro_casa float not null, tariffa_giornaliera float not null, ammontare_tasse float not null, capienza_max int not null, fasciatoio boolean, segnalatori_fumo boolean, servizi_disabili boolean, animali_ammessi boolean, cucina boolean, prima_data date not null, ultima_data date not null, PRIMARY KEY(id_casa))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table CASA creata");
  });
}

function crea_tablePrenotazione() {
  var sql =
    "CREATE TABLE IF NOT EXISTS prenotazione(id_prenotazione int auto_increment, ref_casa int references casa(id_casa), ref_proprietario VARCHAR(50) references utenteProprietario(emailP), ref_nome_casa VARCHAR(50) references casa(nome_casa), nome_cliente varchar(50) references utenteCliente(nomeC), cognome_cliente varchar(50) references utenteCliente(cognomeC), email_cliente VARCHAR(50) references utenteCliente(emailC), numero_ospiti_adulti int not null, numero_ospiti_bambini int, data_emissione date not null, check_in date not null, check_out date not null, animali boolean not null, disabilita boolean not null, viaggio_lavoro boolean not null, prezzo float not null, tasse float not null, prezzo_totale float not null, data_rendiconto date, primary key(id_prenotazione))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table PRENOTAZIONE creata");
  });
}

function crea_tableData() {
  var sql =
    "CREATE TABLE IF NOT EXISTS data(id_data int auto_increment, data_soggiorno date not null, ref_casa_o int references casa(id_casa), ref_prenotazione int references prenotazione(id_prenotazione), disponibilita boolean, primary key (id_data))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table DATA creata");
  });
}

function crea_tableRencensione() {
  var sql =
    "CREATE TABLE IF NOT EXISTS recensione(id_recensione int auto_increment, ref_casa_r int references casa(id_casa), ref_nome_casa_r VARCHAR(50) references casa(nome_casa), ref_prenotazione_r int references prenotazione(id_prenotazione), nome_recensore varchar(50) references utenteCliente(nomeC), cognome_recensore varchar(50) references utenteCliente(cognomeC), email_recensore VARCHAR(50) references utenteCliente(emailC), email_proprietario VARCHAR(50) references utenteProprietario(emailP), stelle int(5) not null, commento TEXT, data_rece date not null, primary key(id_recensione))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table RECENSIONE creata");
  });
}

function crea_tableFoto() {
  var sql =
    "CREATE TABLE IF NOT EXISTS foto(id_casa int auto_increment, ref_casa_via VARCHAR(50) references casa(indirizzo), ref_casa_citta VARCHAR(50) references casa(citta), image varchar(255) NOT NULL, PRIMARY KEY (id_casa))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table FOTO creata");
  });
}

module.exports = {
  crea_tableUtenteCliente,
  crea_tableUtenteProprietario,
  crea_tableCasa,
  crea_tablePrenotazione,
  crea_tableData,
  crea_tableRencensione,
  crea_tableFoto,
};
