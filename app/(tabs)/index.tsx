import { NotesModal } from "@/components/NotesModal";
import { QuoteCard } from "@/components/QuoteCard";
import { useNotes } from "@/context/NotesContext";
import { useQuote } from "@/hooks/useQoute";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";

import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar as RNStatusBar,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { quote, loading, error, refresh: fetchQuote } = useQuote();
  const { notes, deleteNote } = useNotes();
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedNoteId, setExpandedNoteId] = useState<number | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.indexContainer}>
      <RNStatusBar backgroundColor="#1e1e1e" barStyle="light-content" />

      <View style={styles.ImageContainer}>
      <Image source={require("../../assets/images/Book.png")}
        style={styles.ImageStyle}/>
        <Text style={styles.ImageText1}>Ready to focus? Start your <Text style={styles.ImageText2}>Pomodoro</Text> and take <Text style={styles.ImageText2}>notes</Text> as you go!</Text>
      </View>

      {/* for Lining */}
      <View style={styles.line1} />

      {/* quotes */}
      <View>
        <Text style={styles.quotesText1}>Quotes <Text style={styles.quotesText2}>(random quotes for every 5mins)</Text></Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1e1e1e" />
      ) : (
        <QuoteCard quote={quote} />
      )}
      </View>

      {/* for Lining */}
      <View style={styles.line1} />

      {/* Notes */}
      <View style={styles.notesMainContainer}>
        {/* layer 1 */}
              <View style={styles.ImageContainer}>
      <Image source={require("../../assets/images/notes.png")}
        style={styles.ImageStyle}/>
      </View>
        <View style={styles.noteContent2}>
          <Text style={styles.titleNote1}>your Notes <Text style={styles.titleNote2}>(lists of your notes)</Text></Text>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.iconButton2}
          >
            <Ionicons name="add" size={30} color="white" />
          </Pressable>
        </View>

        {/* layer 2 */}
        {notes.map((item) => (
          <View key={item.id} style={styles.notesMainChildContainer}>
            <TouchableOpacity
              onPress={() =>
                setExpandedNoteId((prev) => (prev === item.id ? null : item.id))
              }
            >
              <View style={styles.noteContent1}>
                {/* title and actions */}
                <View style={styles.textContainer}>
                  <Text style={styles.noteTitle1}>Title:</Text>
                  <Text style={styles.noteTitle2}>{item.title}</Text>
                </View>

                {/* Arrow Icon */}
                <Ionicons
                  name={
                    expandedNoteId === item.id ? "chevron-up" : "chevron-down"
                  }
                  size={20}
                  color="black"
                  style={{ marginRight: 10 }}
                />

                {/* Delete button */}
                <Pressable
                  style={styles.iconButton1}
                  onPress={() => deleteNote(item.id)}
                >
                  <Ionicons name="trash" size={20} color="white" />
                </Pressable>
              </View>
            </TouchableOpacity>
            
            {/* expanded content */}
            {expandedNoteId === item.id && (<>
            <View style={styles.line2} />
              <View style={styles.notesContent}>
                <Text style={styles.noteTitle1}>Notes:</Text>
                <Text>{item.content}</Text>
              </View>
            </>)}
          </View>
        ))}
      </View>

      <NotesModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  indexContainer: {
    padding: 10,
  },

  /* qoutes */
  quotesText1: {
    fontWeight: "bold",
    color: "#727D73",
    fontStyle: "italic",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  quotesText2: {
    color: "#727D73",
    fontStyle: "italic",
    fontSize: 10,
  },

  /* lining */
  line1: {
    borderBottomColor: '#ccc', 
    borderBottomWidth: 2,      
    marginVertical: 10,        
  },
  line2: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,      
    marginVertical: 10,        
  },

  /* Image */
  ImageContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  ImageStyle: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    borderRadius: 10,
  },
  ImageText2: {
    color: '#4E71FF',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ImageText1: {
    textAlign: 'center',
    color: '#73946B',
    fontSize: 15,
    fontWeight: 'bold'
  },

  /* note contents */
  notesMainContainer: {
    marginTop: 10,
    // borderWidth: 1,
    // borderStyle: "solid",
  },
  notesMainChildContainer: {
    backgroundColor: "#B0DB9C",
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    marginTop: 10,
    elevation: 5
  },
  titleNote1: {
    fontWeight: "bold",
    color: "#C1DBB3",
    fontStyle: "italic",
    fontSize: 20,
  },
  titleNote2: {
    color: "#C1DBB3",
    fontStyle: "italic",
    fontSize: 10,
  },
  noteContent1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteContent2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
  },
  textContainer: {
    flex: 1, // para mag-expand at mag-wrap ng text
    marginRight: 10,
  },
  noteTitle1: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#222222",
  },
  noteTitle2: {
    fontSize: 16,
    flexWrap: "wrap",
    fontWeight: "bold",
    color: "white",
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  iconButton1: {
    backgroundColor: "#FF6363",
    padding: 5,
    borderRadius: 4,
  },
  iconButton2: {
    backgroundColor: "#4E71FF",
    padding: 5,
    borderRadius: 20,
  },
  notesContent: {
    backgroundColor: '#FFFDF6',
    padding: 5,
    borderRadius: 5
  }
});
