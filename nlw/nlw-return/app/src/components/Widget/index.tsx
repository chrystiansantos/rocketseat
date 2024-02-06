import { ChatTeardropDots } from 'phosphor-react-native';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet'
// import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { theme } from '../../theme';
import { styles } from './styles';
import { Options } from '../Options';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Form } from '../Form';
import { Success } from '../Success';

export type IFeedbackType = keyof typeof feedbackTypes;

const Widget = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [feedbackType, setFeedbackType] = useState<IFeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  }

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  const handleFeedbackSent = () => {
    setFeedbackSent(true)
  }

  // const 

  return (
    <>
      <TouchableOpacity style={styles.button}
        onPress={handleOpen}>
        <ChatTeardropDots
          size={32}
          color={theme.colors.text_on_brand_color}
          weight="bold" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ?
            <Success onSendAnotherFeedback={handleRestartFeedback} />
            :
            <>
              {
                feedbackType ?
                  <Form
                    feedbackType={feedbackType}
                    onFeedbackCanceled={handleRestartFeedback}
                    onFeedbackSent={handleFeedbackSent}
                  /> :
                  <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>
        }
      </BottomSheet>
    </>
  );
}
export { Widget }
// export default gestureHandlerRootHOC(Widget);