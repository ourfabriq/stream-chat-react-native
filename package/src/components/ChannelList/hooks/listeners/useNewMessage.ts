import { useEffect } from 'react';

import { moveChannelUp } from '../../utils';

import { useChatContext } from '../../../../contexts/chatContext/ChatContext';

import type { Channel, Event } from 'stream-chat';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
  UnknownType,
} from '../../../../types/types';

type Parameters<
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
> = {
  lockChannelOrder: boolean;
  setChannels: React.Dispatch<React.SetStateAction<Channel<At, Ch, Co, Ev, Me, Re, Us>[]>>;
  onMessageNew?: (
    setChannels: React.Dispatch<React.SetStateAction<Channel<At, Ch, Co, Ev, Me, Re, Us>[]>>,
    event: Event<At, Ch, Co, Ev, Me, Re, Us>,
  ) => void;
};

export const useNewMessage = <
  At extends UnknownType = DefaultAttachmentType,
  Ch extends UnknownType = DefaultChannelType,
  Co extends string = DefaultCommandType,
  Ev extends UnknownType = DefaultEventType,
  Me extends UnknownType = DefaultMessageType,
  Re extends UnknownType = DefaultReactionType,
  Us extends UnknownType = DefaultUserType,
>({
  onMessageNew,
  lockChannelOrder,
  setChannels,
}: Parameters<At, Ch, Co, Ev, Me, Re, Us>) => {
  const { client } = useChatContext<At, Ch, Co, Ev, Me, Re, Us>();

  useEffect(() => {
    const handleEvent = (event: Event<At, Ch, Co, Ev, Me, Re, Us>) => {
      if (typeof onMessageNew === 'function') {
        onMessageNew(setChannels, event);
      } else {
        setChannels((channels) => {
          if (!lockChannelOrder && event.cid) {
            return moveChannelUp<At, Ch, Co, Ev, Me, Re, Us>({
              channels,
              cid: event.cid,
            });
          }
          return [...channels];
        });}
    };

    client.on('message.new', handleEvent);
    return () => client.off('message.new', handleEvent);
  }, []);
};
