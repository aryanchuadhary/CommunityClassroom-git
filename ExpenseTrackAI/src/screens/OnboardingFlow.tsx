import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface OnboardingProps {
  navigation: any;
}

const OnboardingFlow: React.FC<OnboardingProps> = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [formData, setFormData] = useState({
    country: '',
    currency: '',
    gender: '',
    profession: '',
    hearAbout: '',
    triedOthers: '',
    dateOfBirth: '',
    goals: '',
  });

  const countries = [
    { code: 'IN', name: 'India', currency: '₹', flag: '🇮🇳' },
    { code: 'US', name: 'United States', currency: '$', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', currency: '£', flag: '🇬🇧' },
    { code: 'EU', name: 'European Union', currency: '€', flag: '🇪🇺' },
  ];

  const genders = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const professions = ['Student', 'Employee', 'Freelancer', 'Business Owner', 'Retired', 'Other'];
  const hearAboutOptions = ['Social Media', 'Friend/Family', 'Google Search', 'App Store', 'Advertisement', 'Other'];
  const goals = ['Savings', 'Budgeting', 'Tax optimization', 'All of the above'];

  const nextScreen = () => {
    if (currentScreen < 12) {
      setCurrentScreen(currentScreen + 1);
    } else {
      navigation.navigate('MainApp');
    }
  };

  const skipToApp = () => {
    navigation.navigate('MainApp');
  };

  const renderScreen1 = () => (
    <View style={styles.screenContainer}>
      <Animatable.View animation="fadeInUp" style={styles.animationContainer}>
        <Text style={styles.receiptAnimation}>📄</Text>
        <Text style={styles.scanAnimation}>📱 → 🔍</Text>
      </Animatable.View>
      
      <Text style={styles.title}>Choose Your Country</Text>
      <Text style={styles.subtitle}>This will set your default currency</Text>
      
      <FlatList
        data={countries}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.countryItem,
              formData.country === item.code && styles.selectedItem
            ]}
            onPress={() => setFormData({...formData, country: item.code, currency: item.currency})}
          >
            <Text style={styles.flag}>{item.flag}</Text>
            <Text style={styles.countryName}>{item.name}</Text>
            <Text style={styles.currency}>{item.currency}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.code}
      />
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen2 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Choose Your Gender</Text>
      <Text style={styles.subtitle}>Help us personalize your experience</Text>
      
      {genders.map((gender) => (
        <TouchableOpacity
          key={gender}
          style={[
            styles.optionButton,
            formData.gender === gender && styles.selectedOption
          ]}
          onPress={() => setFormData({...formData, gender})}
        >
          <Text style={styles.optionText}>{gender}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen3 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>What Do You Do For a Living?</Text>
      <Text style={styles.subtitle}>This helps us provide better insights</Text>
      
      {professions.map((profession) => (
        <TouchableOpacity
          key={profession}
          style={[
            styles.optionButton,
            formData.profession === profession && styles.selectedOption
          ]}
          onPress={() => setFormData({...formData, profession})}
        >
          <Text style={styles.optionText}>{profession}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen4 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Where Did You Hear About This?</Text>
      <Text style={styles.subtitle}>Help us understand our reach</Text>
      
      {hearAboutOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            formData.hearAbout === option && styles.selectedOption
          ]}
          onPress={() => setFormData({...formData, hearAbout: option})}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen5 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Tried Other Expense Apps?</Text>
      <Text style={styles.subtitle}>We'd love to know your experience</Text>
      
      <TouchableOpacity
        style={[
          styles.yesNoButton,
          formData.triedOthers === 'Yes' && styles.selectedOption
        ]}
        onPress={() => setFormData({...formData, triedOthers: 'Yes'})}
      >
        <Text style={styles.optionText}>Yes</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.yesNoButton,
          formData.triedOthers === 'No' && styles.selectedOption
        ]}
        onPress={() => setFormData({...formData, triedOthers: 'No'})}
      >
        <Text style={styles.optionText}>No</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen6 = () => (
    <View style={styles.screenContainer}>
      <Animatable.View animation="zoomIn" style={styles.graphContainer}>
        <Text style={styles.graphTitle}>📈 Long-term Results</Text>
        <View style={styles.comparisonGraph}>
          <View style={styles.graphBar}>
            <Text style={styles.barLabel}>Other Apps</Text>
            <View style={[styles.bar, { height: 60, backgroundColor: '#ff6b6b' }]} />
            <Text style={styles.barValue}>60%</Text>
          </View>
          <View style={styles.graphBar}>
            <Text style={styles.barLabel}>ExpenseTrack AI</Text>
            <View style={[styles.bar, { height: 120, backgroundColor: '#4ecdc4' }]} />
            <Text style={styles.barValue}>95%</Text>
          </View>
        </View>
      </Animatable.View>
      
      <Text style={styles.title}>ExpenseTrack AI Creates Long-term Results</Text>
      <Text style={styles.subtitle}>95% of users achieve their financial goals with AI assistance</Text>
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Amazing!</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen7 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Date of Birth</Text>
      <Text style={styles.subtitle}>Help us provide age-appropriate financial advice</Text>
      
      <TextInput
        style={styles.dateInput}
        placeholder="DD/MM/YYYY"
        value={formData.dateOfBirth}
        onChangeText={(text) => setFormData({...formData, dateOfBirth: text})}
      />
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen8 = () => (
    <View style={styles.screenContainer}>
      <Animatable.View animation="slideInUp" style={styles.graphContainer}>
        <Text style={styles.graphTitle}>🤖 AI vs Manual Tracking</Text>
        <View style={styles.comparisonGraph}>
          <View style={styles.graphBar}>
            <Text style={styles.barLabel}>Manual</Text>
            <View style={[styles.bar, { height: 50, backgroundColor: '#ff9999' }]} />
            <Text style={styles.barValue}>1x</Text>
          </View>
          <View style={styles.graphBar}>
            <Text style={styles.barLabel}>AI Powered</Text>
            <View style={[styles.bar, { height: 100, backgroundColor: '#66d9ef' }]} />
            <Text style={styles.barValue}>2x Better</Text>
          </View>
        </View>
      </Animatable.View>
      
      <Text style={styles.title}>Track Expenses 2x Better with AI</Text>
      <Text style={styles.subtitle}>vs Manual Entry</Text>
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>I'm Convinced!</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen9 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>What Would You Like to Achieve?</Text>
      <Text style={styles.subtitle}>Choose your primary financial goal</Text>
      
      {goals.map((goal) => (
        <TouchableOpacity
          key={goal}
          style={[
            styles.optionButton,
            formData.goals === goal && styles.selectedOption
          ]}
          onPress={() => setFormData({...formData, goals: goal})}
        >
          <Text style={styles.optionText}>{goal}</Text>
        </TouchableOpacity>
      ))}
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen10 = () => (
    <View style={styles.screenContainer}>
      <Animatable.View animation="bounceIn" style={styles.thankYouContainer}>
        <Text style={styles.thankYouEmoji}>🙏</Text>
        <Text style={styles.title}>Thanks for Trusting Us!</Text>
        <Text style={styles.subtitle}>We're excited to help you achieve your financial goals</Text>
      </Animatable.View>
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen11 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>What Our Users Say</Text>
      
      <ScrollView style={styles.testimonialsContainer}>
        <View style={styles.testimonial}>
          <Text style={styles.testimonialText}>
            "ExpenseTrack AI helped me save $2000 in 6 months! The AI categorization is spot on."
          </Text>
          <Text style={styles.testimonialAuthor}>- Sarah M., Marketing Manager</Text>
        </View>
        
        <View style={styles.testimonial}>
          <Text style={styles.testimonialText}>
            "Best expense app I've used. The receipt scanning is incredible and saves me hours."
          </Text>
          <Text style={styles.testimonialAuthor}>- James K., Freelancer</Text>
        </View>
        
        <View style={styles.testimonial}>
          <Text style={styles.testimonialText}>
            "Tax optimization features helped me get $500 more in my refund!"
          </Text>
          <Text style={styles.testimonialAuthor}>- Priya R., Software Engineer</Text>
        </View>
      </ScrollView>
      
      <TouchableOpacity style={styles.ctaButton} onPress={nextScreen}>
        <Text style={styles.ctaText}>Join Them</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen12 = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Ready to Start?</Text>
      <Text style={styles.subtitle}>Create an account or explore with demo data</Text>
      
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.skipButton} onPress={skipToApp}>
        <Text style={styles.skipText}>Skip - Explore with Demo Data</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1: return renderScreen1();
      case 2: return renderScreen2();
      case 3: return renderScreen3();
      case 4: return renderScreen4();
      case 5: return renderScreen5();
      case 6: return renderScreen6();
      case 7: return renderScreen7();
      case 8: return renderScreen8();
      case 9: return renderScreen9();
      case 10: return renderScreen10();
      case 11: return renderScreen11();
      case 12: return renderScreen12();
      default: return renderScreen1();
    }
  };

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(currentScreen / 12) * 100}%` }]} />
        </View>
        <Text style={styles.stepText}>{currentScreen} of 12</Text>
      </View>
      
      {renderCurrentScreen()}
      
      {currentScreen > 1 && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => setCurrentScreen(currentScreen - 1)}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  stepText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  animationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  receiptAnimation: {
    fontSize: 80,
    marginBottom: 10,
  },
  scanAnimation: {
    fontSize: 24,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  flag: {
    fontSize: 24,
    marginRight: 15,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  optionButton: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  optionText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  yesNoButton: {
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  graphContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  graphTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  comparisonGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: 150,
  },
  graphBar: {
    alignItems: 'center',
  },
  barLabel: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  bar: {
    width: 60,
    borderRadius: 5,
  },
  barValue: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  thankYouContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  thankYouEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  testimonialsContainer: {
    maxHeight: 300,
  },
  testimonial: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    lineHeight: 22,
  },
  testimonialAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    marginTop: 30,
  },
  ctaText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
  },
  signUpText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  signInText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    marginVertical: 10,
  },
  skipText: {
    color: '#666',
    textAlign: 'center',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    padding: 10,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OnboardingFlow;