import React, { Component } from 'react';
import { DateTimePicker} from "@material-ui/pickers";
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Typography,
    Box,
    InputAdornment,
  } from '@material-ui/core';
  import {
    Formik, Form, Field,
  } from 'formik';
  import * as Yup from 'yup';
  
  import LockIcon from '@material-ui/icons/Lock';
  import EmailIcon from '@material-ui/icons/Email';
  
  import styles from '../Login/Form/Form.module.scss';
  
  const initialValues = {
    name: 'LOREM IPSUM',
  
  };
  
  const validationSchema = () => Yup.object().shape({
    name: Yup.string()
      .required('This field is required'),
  });
  
  /*const LoginForm = () => (
    <Box className={styles.wrapper}>
      <Typography component="h1">
          Add Event
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          console.log(values);
        }}
      >
        {({
          errors,
          touched,
        }) => (
          <Form
            className={styles.form}
            noValidate
          >
            <Field
              type="input"
              as={TextField}
              placeholder="Name"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Event Name"
              name="name"
              InputProps={{
                'aria-label': 'Event Name',
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Field
              as={TextField}
              placeholder="Password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={touched.password && !!errors.password}
              helperText={errors.password}
              name="password"
              label="Password"
              type="password"
              id="password"
              InputProps={{
                'aria-label': 'password',
                endAdornment: (
                  <InputAdornment position="end">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.button}
            >
            Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#lol" variant="body2">
                Forgot your password?
                </Link>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );*/

  const EventForm = () =>(
    <Box className={styles.wrapper}>
      <Typography component="h1">
        New Event
      </Typography>
      <Formik
      initialValues={initialValues}
      validationSchema = {validationSchema}
      onSubmit={(values, {setSubmitting}) =>{
        setSubmitting(true);
        console.log(values);
      }}
    >
      {({ errors , touched }) =>(
        <Form className={styles.form} noValidate>
          <Field
            /*type="input"*/
            as={TextField}
            placeholder="Name"
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Event Name"
            name="name"
            InputProps={{
              'aria-label': 'Event Name',
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <Field
            /*type="input"*/
            as={TextField}
            placeholder="Description"
            variant="outlined"
            margin="normal"
            required
            id="description"
            label="Event's description"
            name="description"
            InputProps={{
              'aria-label': "Event's description",
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />
          <Field
            /*type="input"*/
            as={DateTimePicker}
            placeholder="Start Date"
            variant="outlined"
            margin="normal"
            required
            id="startDate"
            label="Start Date"
            name="startDate"
            InputProps={{
              'aria-label': "Event's start date",
            }}
          />
          <Field
            /*type="input"*/
            as={DateTimePicker}
            placeholder="End Date"
            variant="outlined"
            margin="normal"
            required
            id="endDate"
            label="End Date"
            name="endDate"
            InputProps={{
              'aria-label': "Event's end date",
            }}
          />
          <Button
              type="submit"
              fullWidth
              variant="contained"
              className={styles.button}
            >
            Add Event
            </Button>
        </Form>
      )}
    </Formik>
    </Box>
  );

class CreateEvent extends Component{
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: '',
            startDate: new Date(),
            endDate: new Date(),
            attendees: [],
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const event = {
            name: this.state.name,
            description: this.state.description,
            attendees: this.state.attendees,
        };
    }
    onChangeAttendees = (e) =>{
        this.setState({
            attendees: e.target.value
        });
    }
    onChangeDescription = (e) =>{
        this.setState({
            description: e.target.value
        });
    }
    onChangeEndDate = (date) =>{
        this.setState({
            endDate: date
        });
    }
    onChangeStartDate = (date) =>{
        this.setState({
            startDate: date
        })
    }
    onChangeName = (e) =>{
        this.setState({
            name: e.target.value
        })
    }

    render(){
        /*return(
            <div>
                <h3>Add New Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Event Name</label>
                        <input type="text"
                            required
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                    </div>
                    <div>
                        <label>Event Description</label>
                        <input type="text"
                            required
                            value={this.state.descripton}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div>
                        <label>Event's date</label>
                        <div>
                            <DateTimePicker
                                variant="inline"
                                label="Start"
                                value={this.state.startDate}
                                onChange={this.onChangeStartDate}
                            />
                        </div>
                        <div>
                            <DateTimePicker
                                variant="inline"
                                label="End"
                                value={this.state.endDate}
                                onChange={this.onChangeEndDate}
                            />
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    <div>
                        <input type="submit" value="Add Event" />
                    </div>
                </form>
            </div>
        );*/
        return EventForm();
    }
}

export default CreateEvent;