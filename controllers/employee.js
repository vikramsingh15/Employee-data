const Employee = require('../models/employee');
const { cloudinary } = require('../cloudinary');

module.exports = {
  newEmployee(req, res, next) {
    return res.render('employee/new.ejs');
  },

  async employeeIndex(req, res, next) {
    const employees = await Employee.find({});
    res.render('employee/index.ejs', { employees });
  },

  async employeeCreate(req, res, next) {
    if (req.file) {
      const { secure_url, public_id } = req.file;
      req.body.image = { secure_url, public_id };
    }

    const { skills } = req.body;

    req.body.skills = skills ? skills.split(',') : [];

    const employee = await Employee.create(req.body);

    res.redirect(`/employee/${employee._id}`);
  },

  async employeeEdit(req, res, next) {
    const employee = await Employee.findById(req.params.id);
    return res.render('employee/edit.ejs', { employee });
  },

  async employeeUpdate(req, res, next) {
    const employee = await Employee.findById(req.params.id);
    if (req.file) {
      if (employee.image.public_id) {
        await cloudinary.v2.uploader.destroy(employee.image.public_id);
      }

      const { secure_url, public_id } = req.file;
      employee.image = { secure_url, public_id };
    }
    const { name, age, location, status, bio, email, phone, skills } = req.body;

    employee.skills = skills ? skills.split(',') : [];

    employee.name = name;
    employee.age = age;
    employee.location = location;
    employee.status = status;
    employee.bio = bio;
    employee.email = email;
    employee.phone = phone;

    await employee.save();
    res.redirect(`/employee/${employee._id}`);
  },

  async employeeDelete(req, res, next) {
    const employee = await Employee.findById(req.params.id);
    if (employee.image.public_id) {
      await cloudinary.v2.uploader.destroy(employee.image.public_id);
    }

    await employee.remove();
    res.redirect('/employee');
  },

  async showEmployee(req, res, next) {
    const employee = await Employee.findById(req.params.id);

    res.render('employee/show.ejs', { employee });
  }
};
