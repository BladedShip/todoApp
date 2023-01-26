import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();

  const [taskItems, setTaskItems] = useState([]);


  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

      {/* Today's Tasks */}
      <View style={styles.tasksWrap}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <Text style={styles.noteText}>Tap on a task to remove it</Text>

        <View style={styles.items}>
          {/* Tasks go here */}
          <ScrollView showsVerticalScrollIndicator={false}>
          {
            taskItems.map((item, index) => {
              return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
              )
            })
          }
          <View style={{height:180}}></View>
          </ScrollView>
        </View>
      </View>
      {/* Write a Task */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeText}>
        <TextInput style={styles.input} placeholder={'Write any Task'} placeholderTextColor={'#fff'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d2d2d',
  },
  tasksWrap: {
    paddingTop: 60,
    paddingHorizontal: 20,

  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f2f2f2',
  },
  noteText:{
    color:'#fff',
    opacity:0.5
  },
  items: {
    marginTop: 30,
  },
  writeText: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#212121',
    borderRadius: 60,
    borderColor: '#fff',
    borderWidth: 1,
    width: 250,
    color: '#fff'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#212121',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
  },
  addText: {
    color: '#fff'
  },
});
