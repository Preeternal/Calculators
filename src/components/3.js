import React, { Component } from 'react';
import Calendar from 'react-native-calendar';

export default class CalendarTest extends Component {
render() {
      return (
<Calendar
  currentMonth={'2015-08-01'}
  // Optional date to set the currently displayed month after initialization
  //customStyle={{day: {fontSize: 15, textAlign: 'center'}}} // Customize any pre-defined styles
  dayHeadings={['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']}
  // Default: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  //eventDates={['2015-07-01']}
  // Optional array of moment() parseable dates that will show an event indicator
  //events={[{date:'2015-07-01', ..}]}
  // Optional array of event objects with a date property and custom styles for the event indicator
  monthNames={['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
  'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']}
  // Defaults to english names of months
  nextButtonText={'Next'} //Text for next button. Default: 'Next'
  onDateSelect={(date) => this.onDateSelect(date)} // Callback after date selection
  onSwipeNext={this.onSwipeNext} // Callback for forward swipe event
  onSwipePrev={this.onSwipePrev} // Callback for back swipe event
  onTouchNext={this.onTouchNext} // Callback for next touch event
  onTouchPrev={this.onTouchPrev} // Callback for prev touch event
  prevButtonText={'Prev'} // Text for previous button. Default: 'Prev'
  //scrollEnabled={true}              // False disables swiping. Default: False
  //selectedDate={'2015-08-15'}       // Day to be selected
  //showControls={true}               // False hides prev/next buttons. Default: False
//  showEventIndicators={true}        // False hides event indicators. Default:False
  //startDate={'2015-08-01'}          // The first month that will display. Default: current month
  //titleFormat={'MMMM YYYY'}         // Format for displaying current month. Default: 'MMMM YYYY'
  //today={'2016-16-05'}              // Defaults to today
  weekStart={1} // Day on which week starts 0 - Sunday, 1 - Monday, 2 - Tuesday, etc, Default: 1
/>
            );
}
}
