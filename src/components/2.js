import React, { Component } from 'react';
import Calendar from 'react-native-calendar-component';

export default class CalendarTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
    }

    handleNextButtonPress() {
        const date = new Date(this.state.date);
        date.setMonth(date.getMonth() + 1);
        this.setState({
            date
        });
    }

    handlePrevButtonPress() {
        const date = new Date(this.state.date);
        date.setFullYear(date.getFullYear() - 1);
        this.setState({
            date
        });
    }


    handleDateSelect() {
        alert(`clicked: ${this.state.date.toString()}`);
    }


    render() {
        return (
            <Calendar
                dayNames={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
                monthNames={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}
                weekFirstDay={1}
                date={this.state.date}
                onPrevButtonPress={() => this.handlePrevButtonPress()}
                onNextButtonPress={() => this.handleNextButtonPress()}
                onDateSelect={(date) => this.handleDateSelect(date)}
            />
        );
    }
}

//export default CalendarTest;
