import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './Style'

//Bottom Sheet imports
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRef, useCallback  } from "react";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function bottomSheet({children, snapPointsMin, snapPointsMax, refBottomSheet = null}) {
    
    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);

  return (
<>
      <BottomSheet
        ref={refBottomSheet}
        onChange={handleSheetChanges}
        snapPoints={[snapPointsMin, snapPointsMax]}
      >
        <BottomSheetView style={[style.contentContainer, {maxHeight: "100%"}]}>
          {children}
        </BottomSheetView>
      </BottomSheet>

    </>
  )
}

