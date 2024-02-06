import { ArrowLeft } from 'phosphor-react-native';
import React, { useState } from 'react';
import { Image, Text, TextInput, View } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { IFeedbackType } from '../Widget';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { api } from '../../service/api';

interface IFormProps {
  feedbackType: IFeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: IFormProps) {
  const feebackTypeInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendFeeback] = useState(false);
  const [comment, setComment] = useState('')

  async function handleScrenshot() {
    try {
      const uri = await captureScreen({
        format: 'png',
        quality: 0.8
      })
      setScreenshot(uri)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleScrenshotRemove() {
    setScreenshot(null)
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }
    setIsSendFeeback(true);

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
        comment
      })
      onFeedbackSent();

    } catch (error) {
      console.log(error);
      setIsSendFeeback(false);
    }


  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image
            source={feebackTypeInfo.image}
            style={styles.image} />
          <Text style={styles.titleText}>
            {feebackTypeInfo.title}
          </Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
        value={comment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleScrenshot}
          onRemoveShot={handleScrenshotRemove}
        />
        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}

