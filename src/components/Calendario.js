import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['sp'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Mar.',
    'Abr.',
    'May.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dic.'
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado'
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'sp';

export default class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
  render() {
    return (
      <View>
        <Calendar
          monthFormat={'MMM d, yyyy'}
          minDate={Date()}
          onDayPress={this.onDayPress}
          markedDates={{ [this.state.selected]: { selected: true } }}
          theme={{
            backgroundColor: '#282828',
            calendarBackground: '#282828',
            selectedDayBackgroundColor: '#D5C046',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#D5C046',
            monthTextColor: 'white',
            indicatorColor: 'white',
            arrowColor: '#D5C046',
            dayTextColor: 'white',
            textDisabledColor: '#2d4150'
          }}
          style={{ marginBottom: 50 }}
        />
      </View>
    );
  }
}
