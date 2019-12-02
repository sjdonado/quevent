import React, { Component } from 'react';
import { DateTimePicker} from "@material-ui/pickers";

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
        return(
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
        );
    }
}

export default CreateEvent;