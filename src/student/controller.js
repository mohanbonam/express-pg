const pool = require('../../db');
const queriers =  require('./queries');

const getStudents = (req, res) => {
    pool.query(queriers.getStudents, (error,  results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
    console.log('getting students');
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queriers.getStudentById, [id], (error,  results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
    console.log('getting student by id', id);
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    // check email exist
    pool.query(queriers.checkEmailExists, [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send('Email already exits.');
            console.log(results.rows.length);
            return;
        } 

        // add student to db
        pool.query(queriers.addStudent, [name, email, age, dob], (error, results) => {
            console.log('duplicate');
            if (error) throw error;
            res.status(201).send("Student Created Succesfully");
            console.log('Studet Created Succesfully'); 
        });
    });
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queriers.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send('Student does not exists in db');
            return;
        }

        pool.query(queriers.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student removed succesfully")
        });
    });
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    pool.query(queriers.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send('Student does not exists in db');
            return;
        }

        pool.query(queriers.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Student updated succesfully"); 
        });
    });

}



module.exports =  {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
};