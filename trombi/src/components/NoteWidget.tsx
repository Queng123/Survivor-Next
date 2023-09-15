import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {WidgetData} from '../utils/WidgetTypes';
import {WidgetFrame} from './WidgetFrame';
import {TextInput} from 'react-native-gesture-handler';
import {updateWidget} from '../utils/WidgetFunctions';
import {useTranslation} from 'react-i18next';

export const NoteWidget = ({data}: {data: WidgetData}): JSX.Element => {
  const {t} = useTranslation();
  const [note, setNote] = useState(data.widgetParams.note);

  const setNoteAndSave = (text: string) => {
    updateWidget(data.key, {
      widgetType: 'NoteWidget',
      widgetParams: {
        note: text,
      },
      key: data.key,
    }).then(() => {
      setNote(text);
    });
  };

  return (
    <WidgetFrame
      data={data}
      title={t('widgets.note.title')}
      backgroundColor="#996633"
      foregroundColor="black">
      <View style={styles.container}>
        <TextInput
          placeholder={t('widgets.note.placeholder')}
          style={styles.noteInput}
          multiline={true}
          onChangeText={text => setNoteAndSave(text)}>
          {note}
        </TextInput>
      </View>
    </WidgetFrame>
  );
};

export const createNoteWidget = (): WidgetData => {
  return {
    widgetType: 'NoteWidget',
    widgetParams: {
      note: '',
    },
    key: '',
  };
};

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    maxHeight: 140,
  },
  noteData: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  noteDataText: {
    fontSize: 16,
  },
  noteInput: {
    fontSize: 16,
  },
});
