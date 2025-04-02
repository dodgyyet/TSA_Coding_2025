import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
} from "react-native";
import { useGlobalContext } from "../context/GlobalProvider"; // Import context to get the data
import { calendar, fire } from "../constants/icons.js"; // Import the icons
import logoSmall from "../assets/images/logo-small.png";

// Get the window height to calculate the bottom boundary
const { height } = Dimensions.get("window");

const InfoPopup = ({ onClose }) => {
  const [pan] = useState(new Animated.Value(height)); // Start from the bottom of the screen
  const { streak, activitiesCompleted, bestStreak } = useGlobalContext(); // Get streak, activities, and best streak data

  // Create PanResponder to handle dragging/swiping
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (e, gestureState) => {
      return Math.abs(gestureState.dy) > 10; // Detect vertical drag
    },
    onPanResponderMove: (e, gestureState) => {
      // Only allow dragging down (gestureState.dy should be greater than 0)
      if (gestureState.dy > 0) {
        pan.setValue(gestureState.dy); // Set the pan value to the y-position (gestureState.dy)
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      const threshold = 150; // Minimum swipe distance to close
      const isDraggingDown = gestureState.dy > threshold;

      if (isDraggingDown) {
        // If swiped down sufficiently, animate to the bottom and close
        Animated.timing(pan, {
          toValue: height, // Move to the bottom of the screen
          duration: 300,
          useNativeDriver: true,
        }).start(() => onClose()); // Close the popup after the animation completes
      } else {
        // If swipe isn't far enough, animate back to the original position
        Animated.spring(pan, {
          toValue: 0, // Reset to the original position
          friction: 7,
          tension: 100,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    // Trigger the opening animation to slide up the popup from the bottom
    Animated.timing(pan, {
      toValue: 0, // Starts from the bottom and moves to the center
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []); // Empty array ensures this only runs once when the component mounts
  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: pan }] }, // Apply the sliding animation
      ]}
      {...panResponder.panHandlers} // Attach pan responder to handle gestures
    >
      {/* Drag-down indicator */}
      <View style={styles.dragIndicator} />

      {/* Display user stats like streak, best streak, and activities completed */}
      <View style={styles.statsContainer}>
        {/* Stats Title */}
        <Text style={styles.statsTitle}>Statistics</Text>

        {/* Stats Rows */}
        <View style={styles.statRow}>
          <Image source={fire} style={styles.icon} />
          <Text style={styles.statText}>Current Streak: {streak}</Text>
        </View>
        <View style={styles.statRow}>
          <Image source={calendar} style={styles.icon} />
          <Text style={styles.statText}>Best Streak: {bestStreak}</Text>
        </View>
        <View style={styles.statRow}>
          <Image source={logoSmall} style={styles.icon} />
          <Text style={styles.statText}>
            Activities Completed: {activitiesCompleted}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Takes up bottom half of the screen
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#3C3F4E",
    justifyContent: "center",
    paddingBottom: 20,
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 999, // Ensure it's on top of other elements
  },
  // Style for the drag down indicator
  dragIndicator: {
    width: 60,
    height: 4,
    backgroundColor: "#FFFFFF",
    marginBottom: 40,
    borderRadius: 3,
  },
  statsContainer: {
    marginBottom: 50,
    alignItems: "start",
  },
  statsTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20, // Space between title and stats
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15, // Space between each stat
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10, // Space between icon and text
  },
  statText: {
    fontSize: 25,
    color: "white",
  },
});

export default InfoPopup;
