import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicinces, addPatients, deletePatients, getPatientsData, updatePatients } from '../../reduex/action/Patients_action';

function Patients(props) {
    const c = useSelector(state => state.counter);
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [data, setData] = useState([]);
    const [update, setupdate] = useState(false);
    const [serach, setSerach] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
        setupdate(false);
        formik.resetForm();
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        message: yup.string().required("Please Any Message."),
        date: yup.date().required("Please Enter date.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            message: '',
            date: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                hanldeClickupdate(values);
            } else {
                handleInsert(values);
            }
        },
    });

    const { handleBlur, handleSubmit, handleChange, errors, touched, values } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'message', headerName: 'Message', width: 170 },
        { field: 'date', headerName: 'Date', width: 170 },
        {
            field: 'action',
            headerName: 'Action',
            width: 170,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const hanldeClickupdate = (values) => {
        // let localData = JSON.parse(localStorage.getItem("Patients"));

        // let Udata = localData.map((l) => {
        //     if (l.id === values.id) {
        //         return values;
        //     } else {
        //         return l;
        //     }
        // })

        dispatch(updatePatients(values));

        // localStorage.setItem("Patients", JSON.stringify(Udata));
        console.log(values);
        handleClose();
        loadData();
        formik.resetForm();
    }

    const handleEdit = (params) => {
        handleClickOpen();

        setupdate(true)

        formik.setValues(params.row);
    }

    const handleInsert = (values) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        let id = Math.floor(Math.random() * 10000);
        let data = {
            id: id,
            ...values
        }

        // if (localData === null) {
        //     localStorage.setItem("Patients", JSON.stringify([data]));
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("Patients", JSON.stringify(localData));
        // }

        dispatch(addPatients(data));

        console.log(values, localData);
        handleClose();
        formik.resetForm();
        loadData();
    }

    const handleDelete = (params) => {
        // let localData = JSON.parse(localStorage.getItem("Patients"));

        // let fData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("Patients", JSON.stringify(fData));
        dispatch(deletePatients(did));

        // console.log(params.id);
        loadData();
        handleClose();
    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        if (localData !== null) {
            setData(localData);
        }
    }

    const dispatch = useDispatch();
    const patients = useSelector(state => state.patients);

    useEffect(() => {
        // loadData();
        dispatch(getPatientsData());
    }, [])

    const handleSerach = (val) => {
        let localData = JSON.parse(localStorage.getItem("Patients"));

        const sData = localData.filter((s) => (
            s.name.toLowerCase().includes(val.toLowerCase()) ||
            s.message.toLowerCase().includes(val.toLowerCase()) ||
            s.date.toString().includes(val)
        ))
        console.log(sData);
        setSerach(sData);
    }

    const finalData = serach.length > 0 ? serach : data;

    return (
        <div>
            {
                patients.isLoading ?
                    <p>Loading...</p>
                    :
                    patients.error !== '' ?
                        <p>{patients.error}</p>
                    :
                        <div>
                            <h1>Patients  :  {c.counter}</h1>
                            <div>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Patients data add
                                </Button>
                                <TextField
                                    margin="dense"
                                    name='serach'
                                    label="Medicine Serach"
                                    type="serach"
                                    fullWidth
                                    variant="standard"
                                    onChange={(e) => handleSerach(e.target.value)}
                                />
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={patients.patients}
                                        columns={columns}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        checkboxSelection
                                    />
                                </div>
                                <Dialog
                                    open={dopen}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {"Are You Sure Delete?"}
                                    </DialogTitle>
                                    <DialogActions>
                                        <Button onClick={handleClose}>No</Button>
                                        <Button onClick={handleDelete} autoFocus>
                                            yes
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Dialog fullWidth open={open} onClose={handleClose}>
                                    <DialogTitle>Patients</DialogTitle>
                                    <Formik values={formik}>
                                        <Form onSubmit={handleSubmit}>
                                            <DialogContent>
                                                <TextField
                                                    value={values.name}
                                                    margin="dense"
                                                    name='name'
                                                    label="Patients Name"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                                <TextField
                                                    value={values.message}
                                                    margin="dense"
                                                    name='message'
                                                    label="Message"
                                                    type="text"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.message && touched.message ? <p>{errors.message}</p> : ''}
                                                <TextField
                                                    value={values.date}
                                                    margin="dense"
                                                    name='date'
                                                    type="date"
                                                    fullWidth
                                                    variant="standard"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.date && touched.date ? <p>{errors.date}</p> : ''}
                                                <DialogActions>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    {
                                                        update ?
                                                            <Button type="submit">Update</Button>
                                                            :
                                                            <Button type="submit">Submit</Button>
                                                    }
                                                </DialogActions>
                                            </DialogContent>
                                        </Form>
                                    </Formik>
                                </Dialog>
                            </div>
                        </div>
            }
        </div>
    );
}

export default Patients;