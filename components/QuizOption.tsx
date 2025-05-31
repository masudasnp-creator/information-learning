import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';
import { Check, X } from 'lucide-react-native';

type QuizOptionProps = {
  text: string;
  index: number;
  selected: boolean;
  correct: boolean | null;
  onSelect: () => void;
  disabled: boolean;
};

const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  index,
  selected,
  correct,
  onSelect,
  disabled,
}) => {
  const letters = ['A', 'B', 'C', 'D'];
  
  const getBackgroundColor = () => {
    if (correct === null) {
      return selected ? 'rgba(74, 144, 226, 0.1)' : Colors.card;
    }
    if (correct === true) {
      return 'rgba(102, 187, 106, 0.1)';
    }
    if (correct === false && selected) {
      return 'rgba(255, 107, 107, 0.1)';
    }
    return Colors.card;
  };
  
  const getBorderColor = () => {
    if (correct === null) {
      return selected ? Colors.primary : Colors.border;
    }
    if (correct === true) {
      return Colors.success;
    }
    if (correct === false && selected) {
      return Colors.error;
    }
    return Colors.border;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
      onPress={onSelect}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[
            styles.letter,
            {
              backgroundColor: selected ? getBorderColor() : 'rgba(0, 0, 0, 0.05)',
            },
          ]}
        >
          <Text
            style={[
              styles.letterText,
              { color: selected ? Colors.white : Colors.textLight },
            ]}
          >
            {letters[index]}
          </Text>
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
      
      {correct !== null && (
        <View
          style={[
            styles.resultIcon,
            {
              backgroundColor:
                correct === true ? Colors.success : selected ? Colors.error : 'transparent',
            },
          ]}
        >
          {correct === true ? (
            <Check size={16} color={Colors.white} />
          ) : selected ? (
            <X size={16} color={Colors.white} />
          ) : null}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  letter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  letterText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  resultIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizOption;