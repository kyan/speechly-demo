import React, { useEffect } from "react";
import {
  DecoderState,
  AudioSourceState,
  useSpeechContext,
  stateToString,
} from "@speechly/react-client";
import { PushToTalkButton, BigTranscript } from "@speechly/react-ui";

const Speechly = () => {
  const {
    clientState,
    microphoneState,
    segment,
    listening,
    start,
    stop,
    connect,
    attachMicrophone,
  } = useSpeechContext();

  const startListening = async () => {
    if (clientState === DecoderState.Disconnected) {
      await connect();
    }

    if (microphoneState === AudioSourceState.Stopped) {
      await attachMicrophone();
    }

    await start();
  };

  const stopListening = async () => {
    await stop();
  };

  useEffect(() => {
    if (segment) {
      // console.log(segment);
      if (segment.isFinal) {
        console.log("✅", segment);
      }
    }
  }, [segment]);

  return (
    <div>
      <BigTranscript placement="top" />
      <PushToTalkButton placement="bottom" captureKey=" " />
      <div className="status">
        State: {stateToString(clientState)}. Listening: {listening.toString()}
      </div>
      <div className="mic-button">
        <button
          onClick={connect}
          disabled={clientState !== DecoderState.Disconnected}
        >
          Connect
        </button>
        <button
          onClick={attachMicrophone}
          disabled={microphoneState !== AudioSourceState.Stopped}
        >
          Initialize mic
        </button>
        <button onClick={startListening}>Start Listening</button>
        <button onClick={stopListening}>Stop Listening</button>
      </div>
    </div>
  );
};

export default Speechly;
