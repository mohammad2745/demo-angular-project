const PersonContact = require('../models/personContact.model');

exports.create = async (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.message) {
      res.status(400).send({
        message: "Both email and message are required fields.",
      });
      return;
    }

    const { email, message } = req.body;

    // Email format validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).send({
        message: "Invalid email format.",
      });
      return;
    }

    const newPersonContact = new PersonContact(email, message);

    PersonContact.createPersonContact(newPersonContact, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the person message.",
        });
      } else {
        res.status(201).send({
          message: 'Successfully created',
          data: data,
        });
      }
    });
  } catch (err) {
    res.status(400).send({
      message: err.stack || "Something went wrong creating contact",
    });
  }
};


exports.index = async (req, res) => {
  try {
    PersonContact.getPersonContact((err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Some error occurred while all fetching data.",
          // message: err.message || "Some error occurred while fetching data.",
        });
      }
      res.render('pages/index', {data})
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong fetching all contact",
      // message: err.stack || "Something went wrong fetching all contact",
    });
  }
};

exports.view = async (req, res) => {
  const id = req.params.id;
  try {
    PersonContact.getPersonContactById(id, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Some error occurred while fetching data.",
          // message: err.message || "Some error occurred while fetching data.",
        });
      }
      res.render('pages/update', { person: data[0] });
    });
  } catch (err) {
    res.status(400).send({
      message: "Something went wrong fetching contact",
      // message: err.stack || "Something went wrong fetching contact",
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    if (!req.body || !req.body.email || !req.body.message) {
      res.status(400).send({
        message: "Both email and message are required fields.",
      });
      return;
    }

    const { email, message } = req.body;

    // Email format validation using a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).send({
        message: "Invalid email format.",
      });
      return;
    }
    
    const updatedPersonContact = {
      email: email,
      message: message,
    };

    PersonContact.updatePersonContact(id, updatedPersonContact, (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Some error occurred while updating data.",
          // message: err.message || "Some error occurred while updating data.",
        });
      }
      res.redirect('/admin');
    });
  } catch (err) {
    return res.status(400).send({
      message: "Some error occurred while updating data.",
      // message: err.message || "Some error occurred while updating data.",
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "ID is required for deletion.",
    });
    return;
  }

  try {
    PersonContact.getPersonContactById(id, (err, data) => {
      if(err) {
        return res.status(500).send({
        message: "Some error occurred while deleting data.",
        // message: err.message || "Some error occurred while deleting data.",
      });
    }
      // res.redirect('/admin');
      res.render('pages/delete', { person: data[0] });
    });
  } catch (err) {
    return res.status(400).send({
      message: "Some error occurred while deleting data.",
      // message: err.message || "Some error occurred while deleting data.",
    });
  }
};

exports.deleteConfirm = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "ID is required for deletion.",
    });
    return;
  }

  try {
    PersonContact.deletePersonContact(id, (err, data) => {
      if(err) {
        return res.status(500).send({
        message: "Some error occurred while deleting data.",
      });
    }
      res.redirect('/admin');
    });
  } catch (err) {
    return res.status(400).send({
      message: "Some error occurred while deleting data.",
    });
  }
};