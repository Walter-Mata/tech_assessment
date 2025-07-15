import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// JSON configuration
const screenConfig = {
  Title: 'Tech assessment',
  Subtitle: 'Walter Bernard E. Mata',
  Fields: [
    {
      Type: 'Label',
      Text: 'Person name',
    },
    {
      ID: 'person-name',
      Type: 'TextInput',
      Placeholder: 'John Smith',
    },
    {
      ID: 'hello-button',
      Type: 'Button',
      Title: 'Say hi',
      AlertMessage: 'Hello ${person-name}!',
    },
  ],
};

interface Field {
  ID?: string;
  Type: string;
  Text?: string;
  Placeholder?: string;
  Title?: string;
  AlertMessage?: string;
}

export default function App() {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const updateFieldValue = (id: string, value: string) => {
    setFieldValues(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const parseAlertMessage = (message: string): string => {
    let parsedMessage = message;

    parsedMessage = Object.values(fieldValues)
      .map(value => value)
      .join(', ');

    return parsedMessage;
  };

  const handleButtonPress = (alertMessage: string) => {
    const parsedMessage = parseAlertMessage(alertMessage);

    return Alert.alert('Hello', parsedMessage);
  };

  const renderField = (field: Field, index: number) => {
    switch (field.Type) {
      case 'Label':
        return (
          <Text key={index} style={styles.heading}>
            {field.Text}
          </Text>
        );

      case 'TextInput':
        return (
          <TextInput
            key={index}
            style={styles.textInput}
            placeholder={field.Placeholder}
            value={fieldValues[field.ID || ''] || ''}
            onChangeText={text => field.ID && updateFieldValue(field.ID, text)}
            placeholderTextColor="#999"
          />
        );

      case 'Button':
        return (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              field.AlertMessage && handleButtonPress(field.AlertMessage)
            }
          >
            <Text style={styles.buttonText}>{field.Title}</Text>
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{screenConfig.Title}</Text>
          <Text style={styles.subtitle}>{screenConfig.Subtitle}</Text>
        </View>

        <View style={styles.fieldsContainer}>
          {screenConfig.Fields.map((field, index) => renderField(field, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  fieldsContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
