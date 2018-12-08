export const createArticle = article => {
  return (dispatch, getState, { getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("articles")
      .add({
        ...article,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(res => {
        firestore
          .collection("users")
          .doc(authorId)
          .update({
            articles: firestore.FieldValue.arrayUnion(res.id)
          });
        firestore
          .collection("departments")
          .doc(article.department)
          .update({
            departmentArticles: firestore.FieldValue.arrayUnion(res.id)
          });
        return;
      })
      .then(() => {
        dispatch({ type: "CREATE_ARTICLE", article });
      })
      .catch(err => {
        dispatch({ type: "CREATE_ARTICLE_ERROR", err });
      });
  };
};

export const editArticle = article => {
  return (dispatch, getState, { getFirestore }) => {
    const { id, prevDepartment, ...noIdArticle } = article;

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("articles")
      .doc(article.id)
      .update({
        ...noIdArticle,
        editedAt: new Date()
      })
      .then(() => {
        if (article.prevDepartment === noIdArticle.department) {
          return;
        } else {
          firestore
            .collection("departments")
            .doc(article.prevDepartment)
            .update({
              departmentArticles: firestore.FieldValue.arrayRemove(article.id)
            });
          firestore
            .collection("departments")
            .doc(noIdArticle.department)
            .update({
              departmentArticles: firestore.FieldValue.arrayUnion(article.id)
            });
          return;
        }
      })
      .then(() => {
        dispatch({ type: "EDIT_ARTICLE", article });
      })
      .catch(err => {
        dispatch({ type: "EDIT_ARTICLE_ERROR", err });
      });
  };
};

export const removeArticle = article => {
  return (dispatch, getState, { getFirestore }) => {
    console.log(article);

    //  // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("articles")
      .doc(article.id)
      .delete()
      .then(() => {
        firestore
          .collection("departments")
          .doc(article.department)
          .update({
            departmentArticles: firestore.FieldValue.arrayRemove(article.id)
          });
        firestore
          .collection("users")
          .doc(article.authorId)
          .update({
            articles: firestore.FieldValue.arrayRemove(article.id)
          });
        return;
      })
      .then(() => {
        dispatch({ type: "REMOVE_ARTICLE", article });
      })
      .catch(err => {
        dispatch({ type: "REMOVE_ARTICLE_ERROR", err });
      });
  };
};
