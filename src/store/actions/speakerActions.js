export const createSpeaker = speaker => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const { id, ...noIdSpeaker } = speaker;
    firestore
      .collection("speakers")
      .doc(id)
      .set({
        ...noIdSpeaker,
        createdAt: new Date()
      })
      .then((res) => {
        dispatch({ type: "CREATE_SPEAKER", speaker, speakerId: id });
      })
      .catch(err => {
        dispatch({ type: "CREATE_SPEAKER_ERROR", err });
      });
  };
};

export const editSpeaker = speaker => {
  return (dispatch, getState, { getFirestore }) => {
    const { id, ...noIdSpeaker } = speaker;

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("speakers")
      .doc(speaker.id)
      .update({
        ...noIdSpeaker,
        editedAt: new Date()
      })
      .then(() => {
        dispatch({ type: "EDIT_SPEAKER", speaker });
      })
      .catch(err => {
        dispatch({ type: "EDIT_SPEAKER_ERROR", err });
      });
  };
};

export const removeSpeaker = speaker => {
  return (dispatch, getState, { getFirestore }) => {

    //  // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("speakers")
      .doc(speaker.id)
      .delete()
      .then(() => {
        dispatch({ type: "REMOVE_SPEAKER", speaker });
      })
      .catch(err => {
        dispatch({ type: "REMOVE_SPEAKER_ERROR", err });
      });
  };
};
