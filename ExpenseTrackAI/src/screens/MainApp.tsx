import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

interface Expense {
  id: string;
  amount: number;
  category: string;
  merchant: string;
  date: string;
  type: 'expense' | 'income';
}

interface PremiumGateProps {
  featureName: string;
  onClose: () => void;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ featureName, onClose }) => (
  <View style={styles.premiumOverlay}>
    <Animatable.View animation="slideInUp" style={styles.premiumModal}>
      <Text style={styles.premiumTitle}>🎯 Premium Feature</Text>
      <Text style={styles.premiumSubtitle}>
        Try all premium AI features for free for 3 days
      </Text>
      
      <View style={styles.featureList}>
        <Text style={styles.featureItem}>✨ AI Receipt Scanning</Text>
        <Text style={styles.featureItem}>🎤 Voice Expense Input</Text>
        <Text style={styles.featureItem}>🤖 AI Categorization</Text>
        <Text style={styles.featureItem}>📊 Tax Optimization</Text>
      </View>
      
      <TouchableOpacity style={styles.trialButton}>
        <Text style={styles.trialButtonText}>Start 3-Day Free Trial</Text>
      </TouchableOpacity>
      
      <View style={styles.pricingContainer}>
        <View style={styles.priceOption}>
          <Text style={styles.priceLabel}>Monthly</Text>
          <Text style={styles.priceAmount}>₹410 / $5</Text>
        </View>
        <View style={styles.priceOption}>
          <Text style={styles.priceLabel}>Yearly</Text>
          <Text style={styles.priceAmount}>₹4,346 / $53</Text>
          <Text style={styles.savingsText}>Save 20%</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Maybe Later</Text>
      </TouchableOpacity>
    </Animatable.View>
  </View>
);

const MainApp: React.FC = () => {
  const [showPremiumGate, setShowPremiumGate] = useState(false);
  const [currentFeature, setCurrentFeature] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock data for demo users
  const mockExpenses: Expense[] = [
    { id: '1', amount: 45.50, category: 'Food & Dining', merchant: 'Starbucks', date: '2024-01-15', type: 'expense' },
    { id: '2', amount: 2500.00, category: 'Income', merchant: 'Freelance Project', date: '2024-01-14', type: 'income' },
    { id: '3', amount: 89.99, category: 'Shopping', merchant: 'Amazon', date: '2024-01-13', type: 'expense' },
    { id: '4', amount: 25.00, category: 'Transportation', merchant: 'Uber', date: '2024-01-12', type: 'expense' },
    { id: '5', amount: 120.00, category: 'Utilities', merchant: 'Electric Bill', date: '2024-01-11', type: 'expense' },
  ];

  const totalExpenses = mockExpenses
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = mockExpenses
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const categoryTotals = mockExpenses
    .filter(item => item.type === 'expense')
    .reduce((acc: any, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount;
      return acc;
    }, {});

  const showPremiumFeature = (featureName: string) => {
    setCurrentFeature(featureName);
    setShowPremiumGate(true);
  };

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <View style={[styles.expenseItem, isDarkMode && styles.expenseItemDark]}>
      <View style={styles.expenseLeft}>
        <Text style={styles.expenseCategory}>{item.category}</Text>
        <Text style={styles.expenseMerchant}>{item.merchant}</Text>
        <Text style={styles.expenseDate}>{item.date}</Text>
      </View>
      <Text style={[
        styles.expenseAmount,
        item.type === 'income' ? styles.incomeAmount : styles.expenseAmountRed
      ]}>
        {item.type === 'income' ? '+' : '-'}${item.amount.toFixed(2)}
      </Text>
    </View>
  );

  const renderCategoryChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Spending by Category</Text>
      {Object.entries(categoryTotals).map(([category, amount]: [string, any]) => (
        <View key={category} style={styles.categoryRow}>
          <Text style={styles.categoryName}>{category}</Text>
          <View style={styles.categoryBarContainer}>
            <View 
              style={[
                styles.categoryBar, 
                { width: `${(amount / totalExpenses) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.categoryAmount}>${amount.toFixed(0)}</Text>
        </View>
      ))}
    </View>
  );

  const theme = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <LinearGradient
        colors={isDarkMode ? ['#1a1a1a', '#2d2d2d'] : ['#007AFF', '#0056b3']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerGreeting}>Good Morning!</Text>
            <Text style={styles.headerSubtitle}>Track your expenses with AI</Text>
          </View>
          <TouchableOpacity 
            style={styles.themeToggle}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Text style={styles.themeToggleText}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Balance Cards */}
        <View style={styles.balanceContainer}>
          <Animatable.View animation="fadeInLeft" style={[styles.balanceCard, styles.incomeCard]}>
            <Text style={styles.balanceLabel}>Total Income</Text>
            <Text style={styles.balanceAmount}>+${totalIncome.toFixed(2)}</Text>
          </Animatable.View>
          
          <Animatable.View animation="fadeInRight" style={[styles.balanceCard, styles.expenseCard]}>
            <Text style={styles.balanceLabel}>Total Expenses</Text>
            <Text style={styles.balanceAmount}>-${totalExpenses.toFixed(2)}</Text>
          </Animatable.View>
        </View>

        {/* Net Balance */}
        <Animatable.View animation="zoomIn" style={[styles.netBalanceCard, theme.card]}>
          <Text style={styles.netBalanceLabel}>Net Balance</Text>
          <Text style={[
            styles.netBalanceAmount,
            totalIncome - totalExpenses > 0 ? styles.positiveBalance : styles.negativeBalance
          ]}>
            ${(totalIncome - totalExpenses).toFixed(2)}
          </Text>
        </Animatable.View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.premiumAction]}
            onPress={() => showPremiumFeature('Receipt Scanner')}
          >
            <Text style={styles.actionIcon}>📄</Text>
            <Text style={styles.actionText}>Scan Receipt</Text>
            <Text style={styles.premiumBadge}>AI</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.premiumAction]}
            onPress={() => showPremiumFeature('Voice Input')}
          >
            <Text style={styles.actionIcon}>🎤</Text>
            <Text style={styles.actionText}>Voice Input</Text>
            <Text style={styles.premiumBadge}>AI</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionText}>Add Manual</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>💰</Text>
            <Text style={styles.actionText}>Add Income</Text>
          </TouchableOpacity>
        </View>

        {/* Chart */}
        {renderCategoryChart()}

        {/* Recent Transactions */}
        <View style={[styles.transactionsContainer, theme.card]}>
          <View style={styles.transactionsHeader}>
            <Text style={[styles.transactionsTitle, theme.text]}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={mockExpenses.slice(0, 5)}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* AI Insights */}
        <Animatable.View 
          animation="fadeInUp" 
          style={[styles.insightsCard, theme.card]}
        >
          <Text style={[styles.insightsTitle, theme.text]}>🤖 AI Insights</Text>
          <Text style={[styles.insightsText, theme.text]}>
            You've spent 23% more on dining this month. Consider setting a budget limit of $200 for better savings.
          </Text>
          <TouchableOpacity 
            style={styles.insightsButton}
            onPress={() => showPremiumFeature('AI Insights')}
          >
            <Text style={styles.insightsButtonText}>Get Premium AI Tips</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Demo Banner */}
        <View style={styles.demoBanner}>
          <Text style={styles.demoBannerText}>
            👋 You're exploring with demo data! Sign up to sync your real expenses across devices.
          </Text>
          <TouchableOpacity style={styles.signUpBannerButton}>
            <Text style={styles.signUpBannerText}>Sign Up Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Premium Gate Modal */}
      {showPremiumGate && (
        <PremiumGate 
          featureName={currentFeature}
          onClose={() => setShowPremiumGate(false)}
        />
      )}
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  card: {
    backgroundColor: 'white',
  },
  text: {
    color: '#333',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#1e1e1e',
  },
  text: {
    color: '#ffffff',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  themeToggle: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  themeToggleText: {
    fontSize: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: -10,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  balanceCard: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  incomeCard: {
    backgroundColor: '#4CAF50',
  },
  expenseCard: {
    backgroundColor: '#F44336',
  },
  balanceLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  netBalanceCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  netBalanceLabel: {
    fontSize: 16,
    color: '#666',
  },
  netBalanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  positiveBalance: {
    color: '#4CAF50',
  },
  negativeBalance: {
    color: '#F44336',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 3,
    position: 'relative',
  },
  premiumAction: {
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  premiumBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  categoryBarContainer: {
    flex: 2,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginHorizontal: 10,
  },
  categoryBar: {
    height: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 50,
    textAlign: 'right',
  },
  transactionsContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expenseItemDark: {
    borderBottomColor: '#333',
  },
  expenseLeft: {
    flex: 1,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  expenseMerchant: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  expenseDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseAmountRed: {
    color: '#F44336',
  },
  incomeAmount: {
    color: '#4CAF50',
  },
  insightsCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  insightsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  insightsButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  insightsButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  demoBanner: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  demoBannerText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 10,
    lineHeight: 18,
  },
  signUpBannerButton: {
    backgroundColor: '#FFC107',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  signUpBannerText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  // Premium Gate Styles
  premiumOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  premiumModal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 25,
    borderRadius: 20,
    width: width - 40,
    maxHeight: '80%',
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  premiumSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  trialButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  trialButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceOption: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  priceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  savingsText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 2,
  },
  closeButton: {
    padding: 15,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default MainApp;