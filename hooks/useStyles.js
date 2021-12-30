import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const useStyles = (createStyles, props) => {
  const theme = useTheme();

  if (!createStyles) return { theme };

  const styles = createStyles(theme, props);

  return { styles: StyleSheet.create(styles), theme };
};

export default useStyles;
