const express = require('express');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const Employee = require('../models/employee');

const routes = express.Router();

const responseMsg = (status, message) => { return { status, message } };

routes.use(expressJwt.expressjwt({ secret: process.env.TOKEN_KEY, algorithms: ['HS256'] }));

routes.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json(responseMsg('false', 'Invalid bearer auth token'));
    } else {
        next(err);
    }
});

// GET: /api/emp/employees, code 200
// User can get all employee
routes.get('/employees', async (req, res) => {
    try{ 
        const employees = await Employee.find();
        
        return res.status(200).json(employees);
    } catch(err) {
        return res.status(500).send(err);
    }
});

// POST: /api/emp/employees, code 201
// User can create new employee
routes.post('/employees', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        return res.status(201).json(employee);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// GET: /api/emp/employees/{eid}, code 200
// User can get employee details by employee id
routes.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        return res.status(200).json(employee);
    } catch (err) {
        return res.status(500).json(responseMsg('false', "Invalid Employee ID"));
    }
});

// PUT: /api/emp/employees/{eid}, code 200
// User can update employee details
routes.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        return res.status(200).json(employee);
    } catch (err) {
        return res.status(500).json(responseMsg('false', "Invalid Employee ID"));
    }
});

// DELETE: /api/emp/employees?eid=xxx, code 204
// User can delete employee by employee id
routes.delete('/employees', async (req, res) => {
    try {
        const eid = req.query.eid;
        if(!eid || !mongoose.isValidObjectId(eid)){
            return res.status(500).json(responseMsg('false', 'Invalid employee ID'));
        } 

        const employee = await Employee.findByIdAndDelete(eid);
    
        if (!employee) {
            return res.status(500).json(responseMsg('false', 'Employee not found'));
        }

        return res.status(200).json(responseMsg('true', "Employee successfully deleted"));
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
})

module.exports = routes;