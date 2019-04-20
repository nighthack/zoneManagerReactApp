import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import styles from './Styles/SpinnerHocStyle'
import { Colors } from '../Themes/'

export default (Comp: ReactClass<*>) => {
  return ({ spinner, children, ...props }: Object) => (
      <View style={{ flex: 1 }}>
          <Comp {...props}>{children}</Comp>
          {spinner && (
              <View style={[StyleSheet.absoluteFill, styles.indicator]}>
                  <ActivityIndicator
                      size="large"
                      color={AppStyles.color.COLOR_PRIMARY}
                  />
              </View>
          )}
      </View>
  );
};
