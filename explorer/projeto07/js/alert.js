export const Alert = {
  alertError: document.querySelector('#error'),
  open() {
    Alert.alertError.classList.add('open');
    Alert.alertError.classList.remove('close');
    setTimeout(() => {
      Alert.close();
    }, 4000);
  },
  close() {
    Alert.alertError.classList.remove('open');
    Alert.alertError.classList.add('close');
  }
}