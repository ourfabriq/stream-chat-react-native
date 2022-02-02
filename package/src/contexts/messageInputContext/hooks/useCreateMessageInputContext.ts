import { useMemo } from 'react';

import type { MessageInputContextValue } from '../MessageInputContext';

import type { ThreadContextValue } from '../../threadContext/ThreadContext';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../../types/types';

export const useCreateMessageInputContext = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
>({
  additionalTextInputProps,
  appendText,
  asyncIds,
  asyncUploads,
  AttachButton,
  autoCompleteSuggestionsLimit,
  clearEditingState,
  clearQuotedMessageState,
  closeAttachmentPicker,
  CommandsButton,
  compressImageQuality,
  doDocUploadRequest,
  doImageUploadRequest,
  editing,
  editMessage,
  FileUploadPreview,
  fileUploads,
  giphyActive,
  hasCommands,
  hasFilePicker,
  hasImagePicker,
  ImageUploadPreview,
  imageUploads,
  initialValue,
  Input,
  inputBoxRef,
  InputButtons,
  isValidMessage,
  maxMessageLength,
  maxNumberOfFiles,
  mentionAllAppUsersEnabled,
  mentionAllAppUsersQuery,
  mentionedUsers,
  metadata,
  MoreOptionsButton,
  numberOfLines,
  numberOfUploads,
  onChange,
  onChangeText,
  onSelectItem,
  openAttachmentPicker,
  openCommandsPicker,
  openFilePicker,
  openMentionsPicker,
  pickFile,
  quotedMessage,
  removeFile,
  removeImage,
  resetInput,
  selectedPicker,
  SendButton,
  sendImageAsync,
  sending,
  sendMessage,
  sendMessageAsync,
  sendThreadMessageInChannel,
  setAsyncIds,
  setAsyncUploads,
  setFileUploads,
  setGiphyActive,
  setImageUploads,
  setInputBoxRef,
  setInputRef,
  setMentionedUsers,
  setMetadata,
  setNumberOfUploads,
  setQuotedMessageState,
  setSendThreadMessageInChannel,
  setShowMoreOptions,
  setText,
  setTextInputFocused,
  showMoreOptions,
  ShowThreadMessageInChannelButton,
  text,
  textInputFocused,
  thread,
  toggleAttachmentPicker,
  triggerSettings,
  updateMessage,
  uploadFile,
  uploadImage,
  uploadNewFile,
  uploadNewImage,
  UploadProgressIndicator,
  uploadsEnabled,
}: MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us> &
  Pick<ThreadContextValue<At, Ch, Co, Ev, Me, Re, Us>, 'thread'>) => {
  const editingExists = !!editing;
  const fileUploadsValue = fileUploads.map(({ state }) => state).join();
  const imageUploadsValue = imageUploads.map(({ state }) => state).join();
  const mentionedUsersLength = mentionedUsers.length;
  const quotedMessageId = quotedMessage
    ? typeof quotedMessage === 'boolean'
      ? ''
      : quotedMessage.id
    : '';
  const threadId = thread?.id;

  const messageInputContext: MessageInputContextValue<At, Ch, Co, Ev, Me, Re, Us> = useMemo(
    () => ({
      additionalTextInputProps,
      appendText,
      asyncIds,
      asyncUploads,
      AttachButton,
      autoCompleteSuggestionsLimit,
      clearEditingState,
      clearQuotedMessageState,
      closeAttachmentPicker,
      CommandsButton,
      compressImageQuality,
      doDocUploadRequest,
      doImageUploadRequest,
      editing,
      editMessage,
      FileUploadPreview,
      fileUploads,
      giphyActive,
      hasCommands,
      hasFilePicker,
      hasImagePicker,
      ImageUploadPreview,
      imageUploads,
      initialValue,
      Input,
      inputBoxRef,
      InputButtons,
      isValidMessage,
      maxMessageLength,
      maxNumberOfFiles,
      mentionAllAppUsersEnabled,
      mentionAllAppUsersQuery,
      mentionedUsers,
      metadata,
      MoreOptionsButton,
      numberOfLines,
      numberOfUploads,
      onChange,
      onChangeText,
      onSelectItem,
      openAttachmentPicker,
      openCommandsPicker,
      openFilePicker,
      openMentionsPicker,
      pickFile,
      quotedMessage,
      removeFile,
      removeImage,
      resetInput,
      selectedPicker,
      SendButton,
      sendImageAsync,
      sending,
      sendMessage,
      sendMessageAsync,
      sendThreadMessageInChannel,
      setAsyncIds,
      setAsyncUploads,
      setFileUploads,
      setGiphyActive,
      setImageUploads,
      setInputBoxRef,
      setInputRef,
      setMentionedUsers,
      setMetadata,
      setNumberOfUploads,
      setQuotedMessageState,
      setSendThreadMessageInChannel,
      setShowMoreOptions,
      setText,
      setTextInputFocused,
      showMoreOptions,
      ShowThreadMessageInChannelButton,
      text,
      textInputFocused,
      toggleAttachmentPicker,
      triggerSettings,
      updateMessage,
      uploadFile,
      uploadImage,
      uploadNewFile,
      uploadNewImage,
      UploadProgressIndicator,
      uploadsEnabled,
    }),
    [
      editingExists,
      fileUploadsValue,
      giphyActive,
      imageUploadsValue,
      maxMessageLength,
      mentionedUsersLength,
      quotedMessageId,
      selectedPicker,
      sendThreadMessageInChannel,
      showMoreOptions,
      text,
      textInputFocused,
      threadId,
      uploadsEnabled,
    ],
  );

  return messageInputContext;
};
