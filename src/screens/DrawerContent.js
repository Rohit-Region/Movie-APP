import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from "react-native-calendar-picker";

const DrawerContent = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [genres, setGenres] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2Y1NjUwYzE3Y2Y5ODMyMTgxNWNjMWEyZTliYjlkYiIsInN1YiI6IjY2MjM4NTkyMDdmYWEyMDE4Nzk4OWRlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YOelbmnAaqqdM8eHwyecSmv4w72PaJ3GWR_-oaTJCw4'
          }
        });
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleStartDateChange = (date) => {
    const dateObject1 = new Date(date);
    const formattedDate1 = dateObject1.toISOString().split('T')[0];
    setStartDate(formattedDate1);
    setShowStartDatePicker(false);
  };

  const handleEndDateChange = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    setEndDate(formattedDate);
    setShowEndDatePicker(false);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  const handleSliderComplete = () => {
    if (isSearchClicked) {
      navigation.navigate('Home', { sliderValue });
    }
  };

  const handleSearchClick = () => {
    setIsSearchClicked(true);
    navigation.navigate('Home', { startDate, endDate });
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedGenres = chunkArray(genres, 3);

  return (
    <ScrollView>
      <Text style={{ paddingHorizontal: 8, fontSize: 20, color: 'black', fontWeight: '500' }}>Sort & Filter </Text>
      <Text style={{ paddingHorizontal: 10, fontSize: 17 }}>Release Dates</Text>

      <View style={styles.inputContainer}>
        <Text style={{ paddingHorizontal: 10, }}>from</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          placeholder="Start Date"
          onChangeText={text => setStartDate(text)}
        />
        <Icon name="calendar-o" size={30} style={styles.starIcon} onPress={showStartDatePickerModal} />
      </View>
      {showStartDatePicker && (
        <CalendarPicker
          onDateChange={handleStartDateChange}
        />
      )}

      <View style={styles.inputContainer}>
        <Text style={{ paddingHorizontal: 10, }}>to</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          placeholder="End Date"
          onChangeText={text => setEndDate(text)}
        />
        <Icon name="calendar-o" size={30} style={styles.starIcon} onPress={showEndDatePickerModal} />
      </View>
      {showEndDatePicker && (
        <CalendarPicker
          onDateChange={handleEndDateChange}
        />
      )}

      <Text style={{ paddingHorizontal: 10, fontSize: 17 }}>Genres</Text>
      {chunkedGenres.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map(genre => (
            <TouchableOpacity
              key={genre.id}
              onPress={() => {
                navigation.navigate('Home', { genreId: genre.id });
              }}
              style={styles.buttona}
            >
              <Text style={styles.buttonTexta}>{String(genre.name)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <Text style={{ paddingHorizontal: 10, fontSize: 17 }}>Language</Text>
      <DropDownPicker
        items={[
          { label: 'English', value: 'English' },
          { label: 'Spanish', value: 'Spanish' },
          { label: 'French', value: 'French' },
        ]}
        defaultValue={selectedLanguage}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropDown}
        onChangeItem={item => setSelectedLanguage(item.value)}
      />

      <Text style={{ paddingHorizontal: 10, fontSize: 17 }}>User Score {sliderValue.toFixed(1)} </Text>

      <Slider
        style={{ width: 250, height: 40, marginTop: -10 }}
        minimumValue={0}
        maximumValue={10}
        step={0.1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={handleSliderChange}
        onSlidingComplete={handleSliderComplete}
      />

      <Button title="Search" onPress={handleSearchClick} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  buttona: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  buttonTexta: {
    textAlign: 'center',
    color: '#000000',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 5,
    padding: 5,
    width: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    height: 40,
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: 'gray',
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropDown: {
    backgroundColor: '#fafafa',
  },
});

export default DrawerContent;
