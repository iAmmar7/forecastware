import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const useStyles = (createStyles) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return [StyleSheet.create(styles), theme];
};

export default useStyles;
