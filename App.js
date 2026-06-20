import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const GRADIENT_COLORS = ['#FFFFFF', '#EBD4FF'];
const ACCENT_COLOR = '#F90052';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [phone, setPhone] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showSplash) {
      return;
    }

    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    });

    fadeIn.start();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2250);

    return () => {
      clearTimeout(timer);
      fadeIn.stop();
    };
  }, [showSplash, fadeAnim]);

  if (showSplash) {
    return (
      <LinearGradient
        colors={GRADIENT_COLORS}
        style={[styles.gradientContainer, styles.splashContainer]}
      >
        <Animated.Text style={[styles.splashTitle, { opacity: fadeAnim }]}>
          BaeFr
        </Animated.Text>
        <StatusBar style="dark" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={GRADIENT_COLORS} style={styles.gradientContainer}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>BaeFr</Text>
        <Text style={styles.loginSubtitle}>Sign in with your phone number</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          placeholderTextColor="#9ca3af"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TouchableOpacity style={styles.otpButton} activeOpacity={0.8}>
          <Text style={styles.otpButtonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  splashContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: '700',
    color: ACCENT_COLOR,
    letterSpacing: 2,
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  loginTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: ACCENT_COLOR,
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  phoneInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
  },
  otpButton: {
    backgroundColor: ACCENT_COLOR,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: ACCENT_COLOR,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  otpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
