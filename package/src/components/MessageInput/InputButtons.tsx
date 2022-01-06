import React, { useState } from 'react';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
import {
  MessageInputContextValue,
  useMessageInputContext,
} from '../../contexts/messageInputContext/MessageInputContext';
import { useTheme } from '../../contexts/themeContext/ThemeContext';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../types/types';

const styles = StyleSheet.create({
  attachButtonContainer: { paddingRight: 10 },
});

export type InputButtonsProps<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
> = Partial<InputButtonsWithContextProps<At, Ch, Co, Ev, Me, Re, Us>>;

export type InputButtonsWithContextProps<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
> = Pick<
  MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us>,
  | 'AttachButton'
  | 'CommandsButton'
  | 'giphyActive'
  | 'hasCommands'
  | 'hasFilePicker'
  | 'hasImagePicker'
  | 'MoreOptionsButton'
  | 'openCommandsPicker'
  | 'selectedPicker'
  | 'setShowMoreOptions'
  | 'showMoreOptions'
  | 'text'
  | 'textInputFocused'
  | 'toggleAttachmentPicker'
  | 'uploadsEnabled'
>;

export const InputButtonsWithContext = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
>(
  props: InputButtonsWithContextProps<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const {
    AttachButton,
    CommandsButton,
    giphyActive,
    hasCommands,
    hasFilePicker,
    hasImagePicker,
    MoreOptionsButton,
    openCommandsPicker,
    setShowMoreOptions,
    showMoreOptions,
    text,
    textInputFocused,
    toggleAttachmentPicker,
    uploadsEnabled,
  } = props;

  const {
    theme: {
      messageInput: { attachButtonContainer, commandsButtonContainer },
    },
  } = useTheme();

  const [hasFocusedInput, setHasFocusedInput] = useState(false);

  if (giphyActive) {
    return null;
  }

  if (textInputFocused && !hasFocusedInput) {
    setHasFocusedInput(true);
    setShowMoreOptions(false);
  } else if (!textInputFocused && hasFocusedInput) {
    setHasFocusedInput(false);
    setShowMoreOptions(true);
  }
  
  return (
    <>
      <View style={{flex: 0}}>
        {showMoreOptions && (hasImagePicker || hasFilePicker || hasCommands) && (
          <>
            {(hasImagePicker || hasFilePicker) && uploadsEnabled !== false && (
              <View style={[hasCommands ? styles.attachButtonContainer : undefined, attachButtonContainer]}>
                <AttachButton handleOnPress={toggleAttachmentPicker} />
              </View>
            )}
            {hasCommands && !text && (
              <View style={commandsButtonContainer}>
                <CommandsButton handleOnPress={openCommandsPicker} />
              </View>
            )}
          </>
        )}
      </View>
      {!showMoreOptions && <MoreOptionsButton
        handleOnPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setShowMoreOptions(true);
        }}
      />}
    </>
  );
};
const areEqual = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
>(
  prevProps: InputButtonsWithContextProps<At, Ch, Co, Ev, Me, Re, Us>,
  nextProps: InputButtonsWithContextProps<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const {
    giphyActive: prevGiphyActive,
    hasCommands: prevHasCommands,
    hasFilePicker: prevHasFilePicker,
    hasImagePicker: prevHasImagePicker,
    selectedPicker: prevSelectedPicker,
    showMoreOptions: prevShowMoreOptions,
    text: prevText,
    textInputFocused: prevTextInputFocused,
    uploadsEnabled: prevUploadsEnabled,
  } = prevProps;

  const {
    giphyActive: nextGiphyActive,
    hasCommands: nextHasCommands,
    hasFilePicker: nextHasFilePicker,
    hasImagePicker: nextHasImagePicker,
    selectedPicker: nextSelectedPicker,
    showMoreOptions: nextShowMoreOptions,
    text: nextText,
    textInputFocused: nextTextInputFocused,
    uploadsEnabled: nextUploadsEnabled,
  } = nextProps;

  if (prevHasImagePicker !== nextHasImagePicker) {
    return false;
  }

  if (prevHasFilePicker !== nextHasFilePicker) {
    return false;
  }

  if (prevHasCommands !== nextHasCommands) {
    return false;
  }

  if (prevUploadsEnabled !== nextUploadsEnabled) {
    return false;
  }
  if (prevSelectedPicker !== nextSelectedPicker) {
    return false;
  }

  if (prevShowMoreOptions !== nextShowMoreOptions) {
    return false;
  }

  if ((!prevProps.text && nextText) || (prevText && !nextText)) {
    return false;
  }

  if (prevGiphyActive !== nextGiphyActive) {
    return false;
  }

  if (prevTextInputFocused !== nextTextInputFocused) {
    return false;
  }

  return true;
};

const MemoizedInputButtonsWithContext = React.memo(
  InputButtonsWithContext,
  areEqual,
) as typeof InputButtonsWithContext;

export const InputButtons = <
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
>(
  props: InputButtonsProps<At, Ch, Co, Ev, Me, Re, Us>,
) => {
  const {
    AttachButton,
    CommandsButton,
    giphyActive,
    hasCommands,
    hasFilePicker,
    hasImagePicker,
    MoreOptionsButton,
    openCommandsPicker,
    selectedPicker,
    setShowMoreOptions,
    showMoreOptions,
    text,
    textInputFocused,
    toggleAttachmentPicker,
    uploadsEnabled,
  } = useMessageInputContext<At, Ch, Co, Ev, Me, Re, Us>();

  return (
    <MemoizedInputButtonsWithContext
      {...{
        AttachButton,
        CommandsButton,
        giphyActive,
        hasCommands,
        hasFilePicker,
        hasImagePicker,
        MoreOptionsButton,
        openCommandsPicker,
        selectedPicker,
        setShowMoreOptions,
        showMoreOptions,
        text,
        textInputFocused,
        toggleAttachmentPicker,
        uploadsEnabled,
      }}
      {...props}
    />
  );
};
