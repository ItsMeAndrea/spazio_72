import React, { Component } from 'react';
import { View } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

export default class Calendar extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CalendarStrip
          calendarAnimation={{ type: 'sequence', duration: 30 }}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 1,
            borderHighlightColor: '#D5C046'
          }}
          style={{ height: 120, marginTop: 10 }}
          calendarHeaderStyle={{ color: 'white', fontSize: 20 }}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberStyle={{ color: '#D5C046' }}
          highlightDateNameStyle={{ color: '#D5C046' }}
          iconLeft={require('../images/left.png')}
          iconRight={require('../images/right.png')}
        />
      </View>
    );
  }
}
