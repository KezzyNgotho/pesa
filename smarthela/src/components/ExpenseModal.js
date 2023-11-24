import React from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,

} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ExpenseModal = ({
  isVisible,
  closeModal,
  expenseDescription,
  setExpenseDescription,
  expenseAmount,
  setExpenseAmount,
  expenseCategory,
  setExpenseCategory,
  showDatePicker,
  addExpense,
  hideDatePicker,
  expenseDate,
  handleConfirmDate,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Expense</Text>
          <TextInput
            style={styles.expenseDescriptionInput}
            placeholder="Expense description"
            value={expenseDescription}
            onChangeText={(text) => setExpenseDescription(text)}
          />
          <TextInput
            style={styles.expenseAmountInput}
            keyboardType="numeric"
            placeholder="Amount"
            value={expenseAmount}
            onChangeText={(text) => setExpenseAmount(text)}
          />
          <Picker
            selectedValue={expenseCategory}
            style={styles.categoryPicker}
            onValueChange={(itemValue) => setExpenseCategory(itemValue)}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Transportation" value="Transportation" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <TouchableOpacity style={styles.datePickerText} onPress={showDatePicker}>
            <Text>Select Date</Text>
          </TouchableOpacity>

          {isVisible && (
            <DateTimePickerModal
              isVisible={isVisible}
              mode="date"
              date={expenseDate}
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />
          )}

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={closeModal}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.addButton]}
              onPress={addExpense}
            >
              <Text style={styles.modalButtonText}>Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  // Define your styles for the ExpenseModal component here
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  expenseDescriptionInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
  },
  expenseAmountInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    color: 'black',
  },
  categoryPicker: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'red',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    marginLeft: 10,
  },
};

export default ExpenseModal;
