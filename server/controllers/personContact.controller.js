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
  console.log("flasjdfkljsad");
  try {
    PersonContact.getPersonContact((err, data) => {
      // console.log("Data ", data);
      res.render('pages/index', {data})
      // if (err) {
      //   res.status(500).send({
      //     message: err.message || "Some error occurred while getting all persons message.",
      //   });
      // } else {
      //   res.status(200).send({
      //     message: 'Get data successful',
      //     data: data
      //   });
      // }
    });
  } catch (err) {
    // res.status(400).send({
    //   message: err.stack || "Something went wrong getting all data"
    // });
  }
};

exports.view = async (req, res) => {
  console.log("viewing...");
  const id = req.params.id;
  try {
    PersonContact.getPersonContactById(id, (err, data) => {
      res.render('pages/update', { person: data[0] });
      // if (err) {
      //   res.status(500).send({
      //     message: err.message || "Some error occurred while getting the person message.",
      //   });
      // } else {
      //   res.status(200).send({
      //     message: 'Get data successful',
      //     data: data
      //   });
      // }
    });
  } catch (err) {
    // res.status(400).send({
    //   message: err.stack || "Something went wrong getting data by id"
    // });
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
      res.redirect('/admin');
      // if (err) {
      //   res.status(500).send({
      //     message: err.message || "Some error occurred while updating the person contact.",
      //   });
      // } else {
      //   res.status(200).send({
      //     message: 'Update successful',
      //     data: data,
      //   });
      // }
    });
  } catch (err) {
    // res.status(400).send({
    //   message: err.stack || "Something went wrong updating data",
    // });
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
    PersonContact.deletePersonContact(id, (deleteErr, deleteData) => {
      res.redirect('/admin')
      // if (deleteErr) {
      //   res.status(500).send({
      //     message: deleteErr.message || "Some error occurred while deleting the person message.",
      //   });
      // } else {
      //   res.status(200).send({
      //     message: 'Data delete successful',
      //     data: deleteData
      //   });
      // }
    });
    // PersonContact.getPersonContactById(id, (err, data) => {
    //   if (err) {
    //     res.status(500).send({
    //       message: err.message || "Error checking for the existence of the record.",
    //     });
    //   } else {
    //     if (!data || data.length === 0) {
    //       res.status(404).send({
    //         message: `No record found.`,
    //       });
    //     } else {
    //       // Proceed with deletion
    //       PersonContact.deletePersonContact(id, (deleteErr, deleteData) => {
    //         res.redirect('/admin')
    //         if (deleteErr) {
    //           res.status(500).send({
    //             message: deleteErr.message || "Some error occurred while deleting the person message.",
    //           });
    //         } else {
    //           res.status(200).send({
    //             message: 'Data delete successful',
    //             data: deleteData
    //           });
    //         }
    //       });
    //     }
    //   }
    // });
  } catch (err) {
    // res.status(400).send({
    //   message: err.stack || "Something went wrong deleting data"
    // });
  }
};