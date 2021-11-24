import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const useStyles = (createStyles) => {
  const theme = useTheme();

  if (!createStyles) return { theme };

  const styles = createStyles(theme);

  return { styles: StyleSheet.create(styles), theme };
};

export default useStyles;
