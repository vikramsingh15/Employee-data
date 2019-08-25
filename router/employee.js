const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware');
const {
  employeeIndex,
  employeeCreate,
  employeeUpdate,
  employeeDelete,
  newEmployee,
  showEmployee,
  employeeEdit
} = require('../controllers/employee');
const { upload } = require('../cloudinary');

//@Route    GET '/employee/:id/edit'
//@desc     edit employee by id
//@access   Public

router.get('/:id/edit', employeeEdit);

//@Route    GET '/employee'
//@desc     show all employee
//@access   Public

router.get('/', asyncErrorHandler(employeeIndex));

//@Route    POST '/employee'
//@desc     create new  employee
//@access   Public

router.post('/', upload.single('image'), asyncErrorHandler(employeeCreate));

//@Route    GET '/employee/n'
//@desc     add new employee
//@access   Public

router.get('/create', newEmployee);

//@Route    PUT '/employee/:id'
//@desc     update  employee by id
//@access   Public

router.put('/:id', upload.single('image'), asyncErrorHandler(employeeUpdate));

//@Route    DELETE '/employee/:id'
//@desc     delete  employee by id
//@access   Public

router.delete('/:id', asyncErrorHandler(employeeDelete));

//@Route    GET '/employee/:id'
//@desc     show details of employee
//@access   Public

router.get('/:id', asyncErrorHandler(showEmployee));

module.exports = router;
