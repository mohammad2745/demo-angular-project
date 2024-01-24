const sql = require('./db');

class PersonContact {
  constructor(email, message) {
    this.email = email;
    this.message = message;
  }

  static createPersonContact(formData, result) {
    const query = 'INSERT INTO person_contact SET ?';

    sql.query(query, formData, (err, res) => {
      if (err) {
        console.log('err--', err);
        return result(err, null);
      } else {
        result(null, { formData });
      }
    });
  }

  static getPersonContact(result) {
    const query = 'SELECT * FROM person_contact';

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static getPersonContactById(personId, result) {
    const query = `SELECT * FROM person_contact WHERE id = ${personId}`;

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  static updatePersonContact(personId, formData, result) {
    const updateMail = formData.email;
    const updateMessage = formData.message;

    const updateQuery = `UPDATE person_contact SET message = ?, email = ? WHERE id = ${personId}`;

    sql.query(updateQuery, [updateMessage, updateMail], (err, res) => {
      if (err) {
        console.log('err--', err);
        return result(err, null);
      } else {
        result(null, {message: 'Update successful'});
      }
    });
  }

  static deletePersonContact(personId, result) {
    const deleteQuery = `DELETE FROM person_contact WHERE id = ${personId}`;

    sql.query(deleteQuery, (err, res) => {
      if (err) {
        console.log('err--', err);
        return result(err, null);
      } else {
        result(null, {message: 'Delete successful'});
      }
    });
  }
}

module.exports = PersonContact;
